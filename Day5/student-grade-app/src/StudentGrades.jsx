import React, { useState } from "react";

const StudentGrades = () => {
  const students = [
    { name: "Chidi Okafor", subject: "Math", score: 75 },
    { name: "Amaka Johnson", subject: "Math", score: 45 },
    { name: "Tunde Adeyemi", subject: "Math", score: 88 },
  ];

  const [filter, setFilter] = useState("all");

  const filteredStudents = students.filter((student) => {
    if (filter === "passed") return student.score >= 50;
    if (filter === "failed") return student.score < 50;
    return true; 
  });

  const total = students.length;
  const passed = students.filter((s) => s.score >= 50).length;
  const failed = students.filter((s) => s.score < 50).length;

  return (
    <div style={{ fontFamily: "Arial", margin: "20px" }}>
      <h2>Student Grades</h2>

      <div style={{ marginBottom: "15px" }}>
        <button onClick={() => setFilter("all")}>All</button>{" "}
        <button onClick={() => setFilter("passed")}>Passed</button>{" "}
        <button onClick={() => setFilter("failed")}>Failed</button>
      </div>

      {filteredStudents.map((student, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <p>
            <strong>{student.name}</strong> — {student.subject}: {student.score}
          </p>
          <p
            style={{
              color: student.score >= 50 ? "green" : "red",
              fontWeight: "bold",
            }}
          >
            {student.score >= 50 ? "PASS" : "FAIL"}
          </p>
        </div>
      ))}

      <p>
        <strong>Total Students:</strong> {total} |{" "}
        <strong>Passed:</strong> {passed} | <strong>Failed:</strong> {failed}
      </p>
    </div>
  );
};

export default StudentGrades
