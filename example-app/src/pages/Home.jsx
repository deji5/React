import React from "react";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="page-content">
        <h1>Welcome to the Home Page!</h1>
        <p>This is your dashboard after login.</p>
      </div>
    </>
  );
};

export default Home;
