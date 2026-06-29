import { useState, useEffect } from "react";
import scss from "../styles/StatusBar.module.scss";

export default function StatusBar() {
  const [time, setTime] = useState("");
  const [elapsed, setElapsed] = useState("00:00");
  const [coords, setCoords] = useState({ x: "+0.0000", y: "+0.0000" });

  useEffect(() => {
    // 1. Ticking Local Clock (IST / India Time)
    const updateTime = () => {
      const options = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const formatter = new Intl.DateTimeFormat("en-US", options);
      setTime(formatter.format(new Date()));
    };

    updateTime();
    const clockInterval = setInterval(updateTime, 1000);

    // 2. Stopwatch/Elapsed Timer
    const startTime = Date.now();
    const timerInterval = setInterval(() => {
      const diffMs = Date.now() - startTime;
      const totalSecs = Math.floor(diffMs / 1000);
      const mins = String(Math.floor(totalSecs / 60)).padStart(2, "0");
      const secs = String(totalSecs % 60).padStart(2, "0");
      setElapsed(`${mins}:${secs}`);
    }, 1000);

    // 3. Cursor Coordinate Tracker
    const handleMouseMove = (e) => {
      const rawX = ((e.clientX / window.innerWidth) * 2 - 1).toFixed(4);
      const rawY = (1 - (e.clientY / window.innerHeight) * 2).toFixed(4);
      
      const xStr = parseFloat(rawX) >= 0 ? `+${rawX}` : rawX;
      const yStr = parseFloat(rawY) >= 0 ? `+${rawY}` : rawY;

      setCoords({ x: xStr, y: yStr });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearInterval(clockInterval);
      clearInterval(timerInterval);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className={scss.statusBar}>
      <div className={scss.left}>
        <span className={scss.city}>BLR</span>
        <span className={scss.time}>{time}</span>
      </div>
      <div className={scss.center}>
        <span className={scss.timerIcon}>⊙</span>
        <span className={scss.timer}>{elapsed}</span>
      </div>
      <div className={scss.right}>
        <span className={scss.coordinate}>X {coords.x}</span>
        <span className={scss.coordinate}>Y {coords.y}</span>
      </div>
    </div>
  );
}
