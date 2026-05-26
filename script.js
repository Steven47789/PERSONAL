/* LOADER OPTIMIZADO */
document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  
  // Mínimo 500ms de carga
  const startTime = Date.now();
  
  window.addEventListener("load", () => {
    const elapsed = Date.now() - startTime;
    const minTime = 500;
    const delay = Math.max(0, minTime - elapsed);
    
    setTimeout(() => {
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.style.display = "none";
      }, 500);
    }, delay);
  });
});

/* TYPEWRITER LOOP */
const text = "Matemática & Programación";
const typewriter = document.getElementById("typewriter");
let charIndex = 0;
let isDeleting = false;

function typeLoop(){
  if(!isDeleting){
    typewriter.textContent = text.substring(0, charIndex + 1);
    charIndex++;
    if(charIndex === text.length){
      isDeleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
  } else {
    typewriter.textContent = text.substring(0, charIndex - 1);
    charIndex--;
    if(charIndex === 0){
      isDeleting = false;
    }
  }
  const speed = isDeleting ? 45 : 85;
  setTimeout(typeLoop, speed);
}

typeLoop();

/* PARALLAX HERO PANEL */
const heroPanel = document.getElementById("hero-panel");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  heroPanel.style.transform = `translateY(${scrollY * 0.08}px)`;
});

/* CANVAS (optimizado) */
const canvas = document.getElementById("hero-canvas");
const ctx = canvas.getContext("2d");

let width;
let height;
let stars = [];
let meteors = [];

function resizeCanvas(){
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

/* STARS */
class Star {
  constructor(){
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.radius = Math.random() * 1.8 + .4;
    this.alpha = Math.random() * .8 + .2;
    this.speedX = (Math.random() - .5) * .25;
    this.speedY = (Math.random() - .5) * .25;
  }

  update(){
    this.x += this.speedX;
    this.y += this.speedY;
    if(this.x < 0) this.x = width;
    if(this.x > width) this.x = 0;
    if(this.y < 0) this.y = height;
    if(this.y > height) this.y = 0;
  }

  draw(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${this.alpha})`;
    ctx.shadowBlur = 10;
    ctx.shadowColor = "white";
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

/* METEORS */
class Meteor {
  constructor(){
    this.reset();
  }

  reset(){
    const borde = Math.floor(Math.random() * 4);
    
    switch(borde){
      case 0:
        this.x = Math.random() * width;
        this.y = -Math.random() * 100 - 50;
        break;
      case 1:
        this.x = width + Math.random() * 100 + 50;
        this.y = Math.random() * height;
        break;
      case 2:
        this.x = Math.random() * width;
        this.y = height + Math.random() * 100 + 50;
        break;
      case 3:
        this.x = -Math.random() * 100 - 50;
        this.y = Math.random() * height;
        break;
    }
    
    this.length = Math.random() * 100 + 60;
    this.speed = Math.random() * 6 + 4;
    this.angle = Math.random() * Math.PI * 2;
    this.speedX = Math.cos(this.angle) * this.speed;
    this.speedY = Math.sin(this.angle) * this.speed;
    this.size = Math.random() * 2.5 + 1;
    this.opacity = Math.random() * .5 + .2;
  }

  update(){
    this.x += this.speedX;
    this.y += this.speedY;
    
    if(this.x < -300 || this.x > width + 300 || this.y < -300 || this.y > height + 300){
      this.reset();
    }
  }

  draw(){
    const endX = this.x - this.speedX * (this.length / this.speed);
    const endY = this.y - this.speedY * (this.length / this.speed);
    
    const gradient = ctx.createLinearGradient(this.x, this.y, endX, endY);
    gradient.addColorStop(0, `rgba(255,255,255,${this.opacity})`);
    gradient.addColorStop(0.6, `rgba(255,255,255,${this.opacity * 0.5})`);
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = this.size;
    ctx.shadowBlur = 15;
    ctx.shadowColor = "white";
    ctx.stroke();
    ctx.shadowBlur = 0;
    
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * 1.2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${this.opacity + 0.2})`;
    ctx.fill();
  }
}

function initScene(){
  stars = [];
  meteors = [];
  
  const starCount = window.innerWidth < 768 ? 250 : 400;
  for(let i = 0; i < starCount; i++){
    stars.push(new Star());
  }
  
  const meteorCount = window.innerWidth < 768 ? 10 : 15;
  for(let i = 0; i < meteorCount; i++){
    meteors.push(new Meteor());
  }
}

function handleResize(){
  resizeCanvas();
  initScene();
}

window.addEventListener("resize", handleResize);
window.addEventListener("orientationchange", () => {
  setTimeout(() => {
    handleResize();
  }, 300);
});

handleResize();

function animate(){
  ctx.clearRect(0, 0, width, height);
  
  stars.forEach(star => {
    star.update();
    star.draw();
  });
  
  meteors.forEach(meteor => {
    meteor.update();
    meteor.draw();
  });
  
  requestAnimationFrame(animate);
}

animate();

/* BOTÓN VOLVER ARRIBA */
const backToTopBtn = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if(window.scrollY > 300){
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

/* SMOOTH SCROLL PARA ENLACES */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e){
    const href = this.getAttribute("href");
    if(href === "#") return;
    const target = document.querySelector(href);
    if(target){
      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

/* REVEAL */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
}, { threshold: .1 });

document.querySelectorAll("section").forEach(section => {
  section.classList.add("hidden");
  observer.observe(section);
});

/* ======================== */
/* CARGAR PROYECTOS DESDE GOOGLE SHEETS (CSV) */
/* Columnas: PROGRAMA | TIPO | TITULO | DESCRIPCION | LINK */
/* ======================== */
const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ2ukv8dnLortAFZttqjPmgv6r3FrQvJTKy415MuGwPF9It_xp_hbAayfy1UlseRSZkdiOw7BuarszN/pub?gid=0&single=true&output=csv';

async function loadProjectsFromSheets() {
  const container = document.getElementById('projects-grid');
  if (!container) return;
  
  try {
    const response = await fetch(CSV_URL);
    const csvText = await response.text();
    
    const rows = parseCSV(csvText);
    
    if (rows.length <= 1) {
      container.innerHTML = '<div class="error-projects">No se encontraron proyectos en la hoja de cálculo.</div>';
      return;
    }
    
    const headers = rows[0];
    
    const findColumnIndex = (possibleNames) => {
      for (let i = 0; i < headers.length; i++) {
        const header = headers[i].toLowerCase().trim();
        for (const name of possibleNames) {
          if (header === name || header.includes(name)) {
            return i;
          }
        }
      }
      return -1;
    };
    
    const progIdx = findColumnIndex(['programa']);
    const tipoIdx = findColumnIndex(['tipo']);
    const tituloIdx = findColumnIndex(['titulo']);
    const descIdx = findColumnIndex(['descripcion']);
    const linkIdx = findColumnIndex(['link']);
    
    let projectsHTML = '';
    
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (!row || row.length === 0) continue;
      
      const programa = row[progIdx]?.trim() || 'Sin programa';
      const tipo = row[tipoIdx]?.trim() || 'Sin tipo';
      const titulo = row[tituloIdx]?.trim() || `${programa}: ${tipo}`;
      const descripcion = row[descIdx]?.trim() || 'Sin descripción';
      const link = row[linkIdx]?.trim() || '';
      
      if (programa === 'Sin programa' && tipo === 'Sin tipo' && descripcion === 'Sin descripción' && !link) continue;
      
      const projectCard = `
        <div class="project-card">
          <div class="project-top">${escapeHTML(programa)} · ${escapeHTML(tipo)}</div>
          <h3>${escapeHTML(titulo)}</h3>
          <p>${escapeHTML(descripcion)}</p>
          ${link ? `<a href="${escapeHTML(link)}" target="_blank" class="project-link">Ver proyecto →</a>` : ''}
        </div>
      `;
      projectsHTML += projectCard;
    }
    
    if (projectsHTML === '') {
      container.innerHTML = '<div class="error-projects">No hay proyectos publicados aún.</div>';
    } else {
      container.innerHTML = projectsHTML;
    }
    
  } catch (error) {
    console.error('Error cargando proyectos:', error);
    container.innerHTML = '<div class="error-projects">No se pudieron cargar los proyectos. Intenta más tarde.</div>';
  }
}

function parseCSV(csvText) {
  let inQuote = false;
  let currentField = '';
  let row = [];
  let rows = [];
  
  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];
    
    if (char === '"') {
      if (inQuote && nextChar === '"') {
        currentField += '"';
        i++;
      } else {
        inQuote = !inQuote;
      }
    } else if (char === ',' && !inQuote) {
      row.push(currentField.trim());
      currentField = '';
    } else if ((char === '\n' || (char === '\r' && nextChar === '\n')) && !inQuote) {
      row.push(currentField.trim());
      if (row.length > 0 && !(row.length === 1 && row[0] === '')) {
        rows.push(row);
      }
      row = [];
      currentField = '';
      if (char === '\r') i++;
    } else {
      currentField += char;
    }
  }
  
  if (currentField !== '' || row.length > 0) {
    row.push(currentField.trim());
    if (row.length > 0 && !(row.length === 1 && row[0] === '')) {
      rows.push(row);
    }
  }
  
  return rows;
}

function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Ejecutar la carga de proyectos
document.addEventListener('DOMContentLoaded', () => {
  loadProjectsFromSheets();
});