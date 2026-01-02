import React from "react";
import { motion } from "framer-motion";
import "./Loading.css";

const Loading = ({ message = "Loading...", fullScreen = false }) => {
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  const dotVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className={`loading-container ${fullScreen ? "full-screen" : ""}`}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="loading-content">
        {/* Main Spinner */}
        <div className="spinner-wrapper">
          <motion.div className="spinner-ring" variants={spinnerVariants} animate="animate">
            <div className="ring-segment"></div>
            <div className="ring-segment"></div>
            <div className="ring-segment"></div>
            <div className="ring-segment"></div>
          </motion.div>

          {/* Pulsing center circle */}
          <motion.div className="spinner-center" variants={pulseVariants} animate="animate"></motion.div>
        </div>

        {/* Animated dots */}
        <div className="loading-dots">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="loading-dot"
              variants={dotVariants}
              animate="animate"
              transition={{
                delay: index * 0.2,
                duration: 0.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Loading message */}
        <motion.p
          className="loading-message"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {message}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Loading;

