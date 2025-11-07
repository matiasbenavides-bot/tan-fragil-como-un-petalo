const canvas = document.getElementById('petalos');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// --- Clase Pétalo ---
class Petalo {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * -canvas.height;
    this.size = Math.random() * 10 + 10;
    this.speed = Math.random() * 1 + 0.5;
    this.angle = Math.random() * Math.PI * 2;
    this.angularSpeed = Math.random() * 0.02 - 0.01;
    this.sway = Math.random() * 40 + 20; // amplitud del movimiento lateral
    this.color = `hsl(${Math.random() * 20 + 330}, 80%, ${Math.random() * 20 + 70}%)`;
  }

  update() {
    this.y += this.speed;
    this.x += Math.sin(this.angle) * 0.5;
    this.angle += this.angularSpeed;

    if (this.y > canvas.height + this.size) {
      this.reset();
      this.y = 0 - this.size;
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(Math.sin(this.angle) * 0.5);
    
    // 🌸 forma del pétalo con BezierCurve
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(
      this.size / 2, -this.size / 2,
      this.size, this.size / 2,
      0, this.size
    );
    ctx.bezierCurveTo(
      -this.size, this.size / 2,
      -this.size / 2, -this.size / 2,
      0, 0
    );
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}

// --- Crear muchos pétalos ---
const cantidad = 80;
let petalos = [];

for (let i = 0; i < cantidad; i++) {
  petalos.push(new Petalo());
}

// --- Animación principal ---
function animar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  petalos.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animar);
}

animar();
let textoY = canvas.height / 2;
let direccionTexto = 0;
let alpha = 0;

  ctx.save();
  ctx.font = "bold 48px 'Poppins'";
  ctx.fillStyle = `rgba(194, 24, 91, ${0.8 + Math.sin(alpha) * 0.2})`;
  ctx.textAlign = "center";
  ctx.fillText("Primavera en el aire", canvas.width / 2, textoY);
  ctx.restore();

 