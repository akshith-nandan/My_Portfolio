// --- Cursor ---
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
document.addEventListener('mousemove', e => {
cursor.style.left = e.clientX + 'px';
cursor.style.top = e.clientY + 'px';
setTimeout(() => {
ring.style.left = e.clientX + 'px';
ring.style.top = e.clientY + 'px';
}, 80);
});
document.querySelectorAll('a, button, .pill, .station-card, .skill-category').forEach(el => {
el.addEventListener('mouseenter', () => {
cursor.style.transform = 'translate(-50%,-50%) scale(2)';
ring.style.width = '60px'; ring.style.height = '60px';
});
el.addEventListener('mouseleave', () => {
cursor.style.transform = 'translate(-50%,-50%) scale(1)';
ring.style.width = '36px'; ring.style.height = '36px';
});
});

// --- Starfield ---
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let W, H, stars = [];
const STAR_COUNT = 280;

function resize() {
W = canvas.width = window.innerWidth;
H = canvas.height = window.innerHeight;
}

function initStars() {
stars = Array.from({length: STAR_COUNT}, () => ({
x: Math.random() * W,
y: Math.random() * H,
r: Math.random() * 1.4 + 0.2,
alpha: Math.random() * 0.7 + 0.2,
da: (Math.random() - 0.5) * 0.008,
speed: Math.random() * 0.03 + 0.005
}));
}

function drawStars() {
ctx.clearRect(0, 0, W, H);
stars.forEach(s => {
s.alpha += s.da;
if (s.alpha <= 0.1 || s.alpha >= 0.9) s.da *= -1;
s.y += s.speed;
if (s.y > H) { s.y = 0; s.x = Math.random() * W; }
ctx.beginPath();
ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
ctx.fill();
});
requestAnimationFrame(drawStars);
}

window.addEventListener('resize', () => { resize(); initStars(); });
resize(); initStars(); drawStars();

// --- Mouse Glow Follow ---
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

function drawMouseGlow() {
ctx.beginPath();
const g = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 180);
g.addColorStop(0, 'rgba(108,99,255,0.04)');
g.addColorStop(1, 'transparent');
ctx.fillStyle = g;
ctx.arc(mouseX, mouseY, 180, 0, Math.PI * 2);
ctx.fill();
}

// --- Scroll Reveal ---
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
entries.forEach((entry, i) => {
if (entry.isIntersecting) {
    setTimeout(() => entry.target.classList.add('visible'), i * 60);
    observer.unobserve(entry.target);
}
});
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

// --- Smooth section warp effect ---
const navLinks = document.querySelectorAll('.nav-links a, .btn');
const warp = document.getElementById('warpOverlay');
navLinks.forEach(link => {
link.addEventListener('click', function(e) {
const href = this.getAttribute('href');
if (href && href.startsWith('#')) {
    warp.style.opacity = '1';
    warp.style.background = 'radial-gradient(ellipse at center, rgba(108,99,255,0.15) 0%, transparent 70%)';
    setTimeout(() => { warp.style.opacity = '0'; }, 500);
}
});
});