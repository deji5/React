import React, { useState, useEffect } from "react";

const CountdownTimer = () => {
  const [targetDate, setTargetDate] = useState(new Date("2025-10-01T00:00:00"));
  const [timeLeft, setTimeLeft] = useState({});
  const [eventStarted, setEventStarted] = useState(false);

  // Function to calculate remaining time
  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
      setEventStarted(true);
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds };
  };

  // Update every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Clean up on unmount
  }, [targetDate]);

  // Handle user-set date
  const handleDateChange = (e) => {
    const newDate = new Date(e.target.value);
    if (newDate > new Date()) {
      setTargetDate(newDate);
      setEventStarted(false);
    } else {
      alert("Please select a future date!");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Countdown to Independence Day 🇳🇬</h2>
      <p>{targetDate.toDateString()}</p>

      {eventStarted ? (
        <h3 style={{ color: "green" }}>🎉 Event Started!</h3>
      ) : (
        <div style={styles.timeBox}>
          <span>{timeLeft.days} Days : </span>
          <span>{timeLeft.hours} Hours : </span>
          <span>{timeLeft.minutes} Minutes : </span>
          <span>{timeLeft.seconds} Seconds</span>
        </div>
      )}

      <div style={styles.inputBox}>
        <label htmlFor="dateInput">Set Custom Target Date:</label>
        <input
          id="dateInput"
          type="datetime-local"
          onChange={handleDateChange}
        />
      </div>
    </div>
  );
};

// Simple inline styles
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    width: "350px",
    margin: "30px auto",
    background: "#f9f9f9",
    fontFamily: "Arial, sans-serif",
  },
  timeBox: {
    fontSize: "20px",
    fontWeight: "bold",
    margin: "10px 0",
  },
  inputBox: {
    marginTop: "15px",
  },
};

export default CountdownTimer;
