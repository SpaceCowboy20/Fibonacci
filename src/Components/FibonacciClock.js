import React, { useEffect, useState } from "react";
import Square from "./Square";

const fibonacci = [1, 1, 2, 3, 5];

const FibonacciClock = () => {
  const [time, setTime] = useState({ hours: 6, minutes: 30 });
  const [colors, setColors] = useState(Array(5).fill("white"));

  const updateTime = (direction) => {
    const newMinutes = time.minutes + direction * 5;
    let newHours = time.hours;
    let adjustedMinutes = newMinutes;
    if (newMinutes >= 60) {
      adjustedMinutes = newMinutes - 60;
      newHours = (newHours + 1) % 12 || 12;
      console.log("newHours" + newHours);
    } else if (newMinutes < 0) {
      adjustedMinutes = newMinutes + 60;
      newHours = (newHours - 1) % 12 || 12;
    }
    setTime({ hours: newHours, minutes: adjustedMinutes });
    assignColors(newHours, adjustedMinutes);
  };
  const assignColors = (hours, minutes) => {
    const minutesValue = Math.floor(minutes / 5);
    const hourValue = hours;

    let tempColors = Array(5).fill("white");
    function assignForSum(sum, isHour) {
      let remainingSum = sum;

      for (let i = fibonacci.length - 1; i >= 0; i--) {
        if (remainingSum >= fibonacci[i]) {
          remainingSum -= fibonacci[i];
          if (tempColors[i] !== "white") {
            tempColors[i] = "blue";
          } else {
            tempColors[i] = isHour ? "red" : "green";
          }
        }
      }
    }
    assignForSum(hourValue, true);
    assignForSum(minutesValue, false);
    setColors(tempColors);
  };

  useEffect(() => {
    assignColors(time.hours, time.minutes);
  }, [time]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2>Fibonacci Clock</h2>
      <div className="boxes">
        <div className="fibo3plus">
          <div className="fibo2plus">
            <Square size={2} color={colors[2]} />
            <div className="fibo1plus">
              <Square size={1} color={colors[0]} />
              <Square size={1} color={colors[1]} />
            </div>
          </div>
          <Square size={3} color={colors[3]} />
        </div>
        <Square size={5} color={colors[4]} />
      </div>
      <p>
        Time: {time.hours}:
        {time.minutes < 10 ? `0${time.minutes}` : time.minutes}
      </p>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <button onClick={() => updateTime(-1)}>Previous 5 minutes</button>
        <button onClick={() => updateTime(1)}>Next 5 minutes</button>
      </div>
    </div>
  );
};

export default FibonacciClock;
