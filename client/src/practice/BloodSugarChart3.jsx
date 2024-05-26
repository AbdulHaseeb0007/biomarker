import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";

const bloodSugarLevel = {
  maxAbove: 250,
  minAbove: 100,

  maxOptimal: 100,
  minOptimal: 70,

  minBelow: 70,
  maxBelow: 0,
};

const userData = [
  {
    level: 120,
  },
  {
    level: 50,
  },
  {
    level: 70,
  },
  {
    level: 80,
  },
  {
    level: 90,
  },
  {
    level: 100,
  },
  {
    level: 170,
  },
  {
    level: 200,
  },
];

const BloodSugarChart = () => {
  const unit = "mg/dL";

  const chartWidth = 920;

  const aboveRange = bloodSugarLevel.maxAbove - bloodSugarLevel.minAbove;
  const optimalRange = bloodSugarLevel.maxOptimal - bloodSugarLevel.minOptimal;
  const belowRange = bloodSugarLevel.minBelow - bloodSugarLevel.maxBelow;

  const chartHeight = aboveRange + optimalRange + belowRange;
  const totalDays = 31;

  const dateArray = Array.from(
    { length: totalDays },
    (_, index) => index + 1
  ).map((num) => num * (Math.floor(chartWidth / totalDays) - 1));

  const [barLeft, setBarLeft] = useState(0);
  const [barTop, setBarTop] = useState(0);
  const [showBars, setShowBars] = useState("hidden");

  const showGraphBars = (top, left) => {
    setShowBars("visible");
    setBarLeft(left);
    setBarTop(top);
  };

  //   const hideGraphBars = () => {
  //     console.log("our");
  //     // setShowBars("hidden");
  //     // setBarLeft(0);
  //     // setBarTop(0);
  //   };

  return (
    <div
      style={{
        position: "relative",
        width: chartWidth,
        height: chartHeight,
        border: "1px solid black",
        backgroundImage: `linear-gradient(to bottom, #ef5350 0px, #ef5350 ${aboveRange}px, #4caf50 ${aboveRange}px, #4caf50 ${
          aboveRange + optimalRange
        }px, #ef5350 ${aboveRange + optimalRange}px, #ef5350 250px)`,
      }}
    >
      {dateArray.map((point) => {
        return (
          <div
            key={point}
            style={{
              position: "absolute",
              bottom: 0,
              left: point,
              width: 2,
              height: 2,
              background: "black",
            }}
          ></div>
        );
      })}

      {userData.map((data, ind) => {
        return (
          <Tooltip key={data.level} title={data.level + " " + unit}>
            <div
              style={{
                position: "absolute",
                top: chartHeight - data.level - 15,
                left: dateArray[ind] - 15,
                width: 30,
                height: 30,
                background: "grey",
                borderRadius: "50%",
                zIndex: ind + 10,
                backgroundColor: "transparent",
              }}
              onMouseEnter={() =>
                showGraphBars(
                  chartHeight - data.level - 1.1,
                  dateArray[ind] - 1.3
                  // chartHeight - data.level,
                  // dateArray[ind]
                )
              }
              // onMouseOut={hideGraphBars()}
            ></div>
          </Tooltip>
        );
      })}

      {userData.map((data, ind) => {
        return (
          //   <Tooltip key={data.level} title={data.level + " " + unit}>
          <div
            key={data.level}
            style={{
              position: "absolute",
              top: chartHeight - data.level - 3,
              left: dateArray[ind] - 3,
              width: 6,
              height: 6,
              background: "black",
              borderRadius: "50%",
              // zIndex: ind + 10,
            }}
            //   onMouseEnter={() =>
            //     showGraphBars(
            //       chartHeight - data.level - 1.1,
            //       dateArray[ind] - 1.3
            //       // chartHeight - data.level,
            //       // dateArray[ind]
            //     )
            //   }
            // onMouseOut={hideGraphBars()}
          ></div>
          //   </Tooltip>
        );
      })}

      <div
        style={{
          width: "100%",
          height: "1px",
          position: "absolute",
          left: 0,
          top: barTop,
          border: "1px dashed #ffeb3b",
          visibility: showBars,
          zIndex: 1,
        }}
      />
      <div
        style={{
          width: "1px",
          height: "100%",
          position: "absolute",
          left: barLeft,
          top: 0,
          border: "0.3px dashed #ffeb3b",
          visibility: showBars,
          zIndex: 2,
        }}
      />
    </div>
  );
};

export default BloodSugarChart;
