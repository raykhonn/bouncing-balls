class Ball {
  x: number;
  y: number;
  dx: number;
  dy: number;
  radius: number;
  color: string;

  constructor(x: number, y: number, dx: number, dy: number, radius: number, color: string) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.radius = radius;
      this.color = color;
  }

  draw(ctx: CanvasRenderingContext2D) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
  }

  update(canvas: HTMLCanvasElement) {
      if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
          this.dx = -this.dx;
      }
      if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
          this.dy = -this.dy;
      }

      this.x += this.dx;
      this.y += this.dy;
  }
}

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const balls: Ball[] = [];

for (let i = 0; i < 50; i++) {
  const radius = Math.random() * 30 + 10;
  const x = Math.random() * (canvas.width - radius * 2) + radius;
  const y = Math.random() * (canvas.height - radius * 2) + radius;
  const dx = (Math.random() - 0.5) * 5;
  const dy = (Math.random() - 0.5) * 5;
  const color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;

  balls.push(new Ball(x, y, dx, dy, radius, color));
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < balls.length; i++) {
      balls[i].draw(ctx);
      balls[i].update(canvas);
  }
}

animate();