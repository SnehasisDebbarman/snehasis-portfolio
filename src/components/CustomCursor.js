import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let animId;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + "px";
      dot.style.top = mouseY + "px";
    };

    const onEnter = () => { ring.style.opacity = "1"; dot.style.opacity = "1"; };
    const onLeave = () => { ring.style.opacity = "0"; dot.style.opacity = "0"; };

    const onHover = () => {
      ring.style.width = "60px";
      ring.style.height = "60px";
      ring.style.borderColor = "hsla(40, 70%, 67%, 0.9)";
      dot.style.width = "4px";
      dot.style.height = "4px";
    };

    const onUnhover = () => {
      ring.style.width = "36px";
      ring.style.height = "36px";
      ring.style.borderColor = "hsla(40, 70%, 67%, 0.5)";
      dot.style.width = "8px";
      dot.style.height = "8px";
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;
      ring.style.left = ringX + "px";
      ring.style.top = ringY + "px";
      animId = requestAnimationFrame(animateRing);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);

    const hoverTargets = document.querySelectorAll("a, button, [role='button']");
    hoverTargets.forEach((el) => {
      el.addEventListener("mouseenter", onHover);
      el.addEventListener("mouseleave", onUnhover);
    });

    animateRing();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
