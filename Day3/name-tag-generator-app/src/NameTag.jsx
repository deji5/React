import React, { useState } from 'react';
import './NameTag.css'; // Optional: Add CSS for better styling

const NameTag = () => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');

  const handleDownload = () => {
    const formattedTag = `
--- NAME TAG ---
Hello, my name is
${name.toUpperCase()}
${title}
${company}
    `.trim();

    alert(formattedTag);
  };

  return (
    <div style={styles.container}>
      <h2>Create Your Name Tag</h2>

      <input
        type="text"
        placeholder="First Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
      />

      <input
        type="text"
        placeholder="Job Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={styles.input}
      />

      <input
        type="text"
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        style={styles.input}
      />

      <div style={styles.nameTag}>
        <p>--- NAME TAG ---</p>
        <p>Hello, my name is</p>
        <h2 style={styles.name}>{name.toUpperCase()}</h2>
        <p>{title}</p>
        <p>{company}</p>
      </div>

      <button onClick={handleDownload} style={styles.button}>
        Download
      </button>
    </div>
  );
};

const styles = {
  container: {
    width: '300px',
    margin: 'auto',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    textAlign: 'center',
  },
  input: {
    display: 'block',
    margin: '10px auto',
    padding: '8px',
    width: '90%',
    fontSize: '14px',
  },
  nameTag: {
    marginTop: '20px',
    padding: '15px',
    border: '2px solid #000',
    backgroundColor: '#f0f0f0',
  },
  name: {
    fontSize: '20px',
    fontWeight: 'bold',
    margin: '10px 0',
  },
  button: {
    marginTop: '15px',
    padding: '10px 20px',
    fontSize: '14px',
    cursor: 'pointer',
  },
};

export default NameTag;
