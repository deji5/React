import React, { useState, useEffect, useRef } from "react";

const Stopwatch = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  // Convert total seconds to MM:SS
  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const remainingSeconds = secs % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  // Start counting
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    // Cleanup interval when paused/unmounted
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
    setLaps([]);
  };

  const handleLap = () => {
    if (isRunning) {
      setLaps((prev) => [...prev, seconds]);
    }
  };

  return (
    <div className="gen">
      <h2>Stopwatch</h2>
      <h1>{formatTime(seconds)}</h1>
      <div style={{ marginBottom: "15px" }}>
        <button onClick={handleStart} disabled={isRunning}>
          Start
        </button>
        <button onClick={handlePause} disabled={!isRunning}>
          Pause
        </button>
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleLap} disabled={!isRunning}>
          Lap
        </button>
      </div>

      {laps.length > 0 && (
        <div>
          <h3>Laps</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {laps.map((lapTime, index) => (
              <li key={index}>
                Lap {index + 1}: {formatTime(lapTime)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Stopwatch;
