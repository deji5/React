import React from "react";
import Navbar from "../components/Navbar";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="page-content">
        <h1>About Us</h1>
        <p>This website demonstrates protected routes and simple navigation using React.</p>
      </div>
    </>
  );
};

export default About;
