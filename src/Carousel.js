import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./App.css";

export default function Carousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("left");

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === images.length ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
    );
  };
  const handleDotClick = (index) => {
    setDirection(index > currentIndex ? "right" : "left");
    setCurrentIndex(index);
  };

  const SlideVarients = {
    hiddenRight: {
      x: "100%",
      opacity: 0,
    },
    hiddenLeft: {
      x: "-100%",
      opacity: 0,
    },
    visible: {
      x: "0%",
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5,
      },
    },
  };
  const sliderVarients = {
    hover: {
      scale: 1.2,
      backgroundColor: "#ff00008e",
    },
  };
  const dotVariants = {
    initial: {
      y: 0,
    },
    animate: {
      y: -10,
      scale: 1.3,
      transition: { type: "spring", stiffness: 1000, damping: "10" },
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className="carousel">
      <AnimatePresence>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt="carousel-images"
          variants={SlideVarients}
          initial={direction === "right" ? "hidenRight" : "hiddenLeft"}
          animate="visible"
          exit="exit"
        />
      </AnimatePresence>
      <div className="slide-direction">
        <motion.div
          className="left"
          onClick={handlePrev}
          variants={sliderVarients}
          whileHover="hover"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            width="20"
            viewBox="0 96 960 960"
          >
            <path d="M400 976 0 576l400-400 56 57-343 343 343 343-56 57Z" />
          </svg>
        </motion.div>
        <motion.div
          className="right"
          onClick={handleNext}
          variants={sliderVarients}
          whileHover="hover"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            width="20"
            viewBox="0 96 960 960"
          >
            <path d="m304 974-56-57 343-343-343-343 56-57 400 400-400 400Z" />
          </svg>
        </motion.div>
      </div>

      <motion.div className="indicator">
        {images.map((_, index) => (
          <div
            key={index}
            className={`dot ${currentIndex === index ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
            initial="initial"
            animate={currentIndex === index ? "animate" : ""}
            whileHover="hover"
            variants={dotVariants}
          ></div>
        ))}
      </motion.div>
    </div>
  );
}
