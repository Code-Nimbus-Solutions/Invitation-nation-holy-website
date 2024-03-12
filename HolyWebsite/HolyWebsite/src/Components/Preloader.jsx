import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import "./Preloader.css";

const Preloader = () => {
  const handleLoad = () => {
    // Function to hide the preloader

    const hidePreloader = () => {
      document.getElementById("preloader").style.display = "none";
    };

    // Function to add animation classes with delay
    const addAnimationClasses = () => {
      setTimeout(() => {
        document.getElementById("preloader-blue").classList.add("animation");
      }, 0); // Add animation to the blue preloader after 1 second

      setTimeout(() => {
        document.getElementById("preloader-red").classList.add("animation");
      }, 500); // Add animation to the red preloader after 2 seconds

      setTimeout(() => {
        document.getElementById("preloader-purple").classList.add("animation");
      }, 1000); // Add animation to the purple preloader after 3 seconds
    };

    // Hide preloader and add animation classes with delay
    setTimeout(hidePreloader, 1000); // Hide preloader after 1 second
    setTimeout(addAnimationClasses, 1000); // Add animation classes after 2 seconds
  };

  window.addEventListener("load", handleLoad);

  return (
    <div>
      <Box
        id="preloader"
        sx={{
          width: "100vw",
          height: "100vh",
        }}
      >
        <LinearProgress className="line" />
      </Box>
      <div id="preloader-blue" className="preloader-blue"></div>
      <div id="preloader-red" className="preloader-red"></div>
      <div id="preloader-purple" className="preloader-purple"></div>
    </div>
  );
};

export default Preloader;