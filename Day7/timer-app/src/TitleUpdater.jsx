import React, { useState, useEffect } from "react";

const TitleUpdater = () => {
  const defaultTitle = " ";
  const [customTitle, setCustomTitle] = useState("");
  const maxLength = 60;

  // Update the browser tab title dynamically
  useEffect(() => {
    document.title = customTitle ? `${defaultTitle} - ${customTitle}` : defaultTitle;
  }, [customTitle]);

  // Reset to default title
  const handleReset = () => {
    setCustomTitle("");
    document.title = defaultTitle;
  };

  return (
    <div style={styles.container}>
      <h2>Document Title Updater</h2>

      <label>
        Custom Title:{" "}
        <input
          type="text"
          value={customTitle}
          onChange={(e) =>
            e.target.value.length <= maxLength && setCustomTitle(e.target.value)
          }
          placeholder="Type here..."
          style={styles.input}
        />
      </label>

      <p style={styles.preview}>
        Preview: "{customTitle ? `${defaultTitle} - ${customTitle}` : defaultTitle}"
      </p>

      <p style={styles.counter}>
        {customTitle.length}/{maxLength} characters
      </p>

      <button onClick={handleReset} style={styles.button}>
        Reset to Default
      </button>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    maxWidth: "400px",
    margin: "40px auto",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  input: {
    width: "80%",
    padding: "8px",
    marginTop: "10px",
  },
  preview: {
    fontStyle: "italic",
    marginTop: "15px",
  },
  counter: {
    fontSize: "0.9em",
    color: "gray",
    marginBottom: "10px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "8px 16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default TitleUpdater;
