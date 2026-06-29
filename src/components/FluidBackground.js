import { useEffect, useRef } from "react";

export default function FluidBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    let width, height;
    let particles = [];
    const maxParticles = 100;
    const connectionDist = 120;
    let mouse = { x: null, y: null, radius: 180 };

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.5 + 0.5;
        this.alpha = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Interaction with mouse
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.hypot(dx, dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 0.6;
            this.y -= (dy / dist) * force * 0.6;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(40, 70%, 67%, ${this.alpha})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = "hsl(40, 70%, 67%)";
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }
    }

    const initParticles = () => {
      particles = [];
      const count = Math.min(maxParticles, (width * height) / 15000);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint background glow blobs (retaining some warm background ambiance)
      const grad = ctx.createRadialGradient(width * 0.3, height * 0.3, 0, width * 0.3, height * 0.3, Math.min(width, height) * 0.4);
      grad.addColorStop(0, "hsla(14, 60%, 25%, 0.08)");
      grad.addColorStop(1, "hsla(14, 60%, 25%, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(width * 0.3, height * 0.3, Math.min(width, height) * 0.4, 0, Math.PI * 2);
      ctx.fill();

      const grad2 = ctx.createRadialGradient(width * 0.8, height * 0.7, 0, width * 0.8, height * 0.7, Math.min(width, height) * 0.5);
      grad2.addColorStop(0, "hsla(40, 50%, 20%, 0.06)");
      grad2.addColorStop(1, "hsla(40, 50%, 20%, 0)");
      ctx.fillStyle = grad2;
      ctx.beginPath();
      ctx.arc(width * 0.8, height * 0.7, Math.min(width, height) * 0.5, 0, Math.PI * 2);
      ctx.fill();

      // Update and draw particles
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `hsla(40, 70%, 67%, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.85,
        backgroundColor: "transparent",
      }}
    />
  );
}
