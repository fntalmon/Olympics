import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

const CountdownTimer = ({ initialSeconds, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds * 10); // Decimas de segundo

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(intervalId);
          onTimeUp();
          return 0;
        }
        return prevTime - 1;
      });
    }, 100); // 100 ms = 0.1 s

    return () => clearInterval(intervalId); // Limpiar intervalo al desmontar
  }, [onTimeUp]);

  const formatTime = (time) => {
    const seconds = Math.floor(time / 10);
    const deciseconds = time % 10;
    return `${seconds}.${deciseconds.toString().padStart(1, '0')}`; // Mostrar un dígito decimal
  };

  return (
    <div>
      <Typography fontSize={25} fontFamily={'Oswald'} color={timeLeft<50 ? "red" : "white"}>{formatTime(timeLeft)}</Typography>
    </div>
  );
};

export default CountdownTimer;
