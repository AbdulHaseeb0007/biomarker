import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";

const bloodSugarLevel = {
  extraAbove: {
    min: 140,
    max: 250,
  },
  above: {
    max: 140,
    min: 120,
  },
  optimal: {
    max: 120,
    min: 110,
  },
  below: {
    min: 110,
    max: 90,
  },
  extraBelow: {
    min: 90,
    // max: 60,
    max: 0,
  },
};

const getPointColor = (top) => {
  if (top > 140 && top <= 250) return "#E62E2D";
  if (top > 120 && top <= 140) return "#EFA41C";
  if (top >= 110 && top <= 120) return "#3D830A";
  if (top >= 90 && top < 110) return "#EFA41C";
  if (top >= 0 && top < 90) return "#E62E2D";
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
    level: 110,
  },
  {
    level: 170,
  },
  {
    level: 200,
  },
];

const BPChart = () => {
  const unit = "mm/Hg";

  // const chartWidth = 920;
  const chartWidth = 700;

  const extraAboveRange =
    bloodSugarLevel.extraAbove.max - bloodSugarLevel.extraAbove.min;
  const aboveRange = bloodSugarLevel.above.max - bloodSugarLevel.above.min;

  const optimalRange =
    bloodSugarLevel.optimal.max - bloodSugarLevel.optimal.min;

  const belowRange = bloodSugarLevel.below.min - bloodSugarLevel.below.max;
  const extraBelowRange =
    bloodSugarLevel.extraBelow.min - bloodSugarLevel.extraBelow.max;

  const chartHeight =
    extraAboveRange + aboveRange + optimalRange + belowRange + extraBelowRange;

  //   console.log(
  //     extraAboveRange,
  //     aboveRange,
  //     optimalRange,
  //     belowRange,
  //     extraBelowRange
  //   );

  const totalDays = 31;
  // const totalDays = userData.length;

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

  const svgPoints = () => {
    // const config = userData.reduce((acc, curr, ind) => {
    //   acc["x" + (ind + 1)] = dateArray[ind];
    //   acc["y" + (ind + 1)] = chartHeight - curr.level;
    //   return acc;
    // }, {});

    const path =
      "" +
      userData.map(
        (data, ind) => `${dateArray[ind]},${chartHeight - data.level} `
      );

    // console.log(path.trim());

    return path.trim();
  };

  // console.log(svgPoints());

  return (
    <div
      style={{
        position: "relative",
        width: chartWidth,
        height: chartHeight,
        border: "1px solid black",
        // backgroundImage: `linear-gradient(to bottom, #ef5350 0px, #ef5350 ${aboveRange}px, #4caf50 ${aboveRange}px, #4caf50 ${
        //   aboveRange + optimalRange
        // }px, #ef5350 ${aboveRange + optimalRange}px, #ef5350 250px)`,
        backgroundImage:
          "linear-gradient(to bottom, #FCD8D8 0px, #FCD8D8 110px, #FCEAC6 110px, #FCEAC6 130px, #D1E5D0 130px, #D1E5D0 140px, #FCEAC6 140px, #FCEAC6 160px, #FCD8D8 160px, #FCD8D8 250px)",
        //   "linear-gradient(to bottom, red 0px, red 150px, green 150px, green 180px, yellow 180px, yellow 250px)",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "7px",
          height: "100%",
          backgroundImage:
            "linear-gradient(to bottom, red 0px, red 110px, yellow 110px, yellow 130px, green 130px, green 140px, yellow 140px, yellow 160px, red 160px, red 250px)",
        }}
      />

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
          <Tooltip
            key={data.level}
            title={data.level + " " + unit}
            TransitionComponent={Zoom}
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, -25],
                    },
                  },
                ],
              },
            }}
          >
            <div
              style={{
                position: "absolute",
                top: chartHeight - data.level - 15,
                left: dateArray[ind] - 15,
                width: 30,
                height: 30,
                background: "grey",
                borderRadius: "50%",
                zIndex: ind + 100,
                backgroundColor: "transparent",
              }}
              onMouseEnter={() =>
                showGraphBars(
                  chartHeight - data.level,
                  dateArray[ind]
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
        const color = getPointColor(data.level);

        return (
          //   <Tooltip key={data.level} title={data.level + " " + unit}>
          <div
            key={data.level}
            style={{
              position: "absolute",
              top: chartHeight - data.level - 5,
              left: dateArray[ind] - 5,
              width: 10,
              height: 10,
              // background: "black",
              background: color,
              borderRadius: "50%",
              zIndex: ind + 10,
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

      {/* {userData.map((data, ind, arr) => {
        if (ind == arr.length - 1) return;
        return (
          <svg
            width={chartWidth}
            height={chartHeight}
            key={ind}
            style={{ position: "absolute", zIndex: ind + 1 }}
          >
            <line
              x1={dateArray[ind]}
              y1={chartHeight - data.level}
              x2={dateArray[ind + 1]}
              y2={chartHeight - arr[ind + 1].level}
              stroke="black"
            />
          </svg>
        );
      })} */}

      <svg
        width={chartWidth}
        height={chartHeight}
        style={{ position: "absolute", zIndex: 10 }}
      >
        <polyline
          points={svgPoints()}
          style={{ fill: "none", stroke: "black", strokeWidth: "1" }}
        />
      </svg>

      <div
        style={{
          width: "100%",
          height: "1px",
          position: "absolute",
          left: 0,
          top: barTop,
          border: "1px dashed #cfd8dc",
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
          border: "0.3px dashed #cfd8dc",
          visibility: showBars,
          zIndex: 2,
        }}
      />
    </div>
  );
};

export default BPChart;
{
  /* <line x1="98" y1="127" x2="199" y2="197" stroke="black" /> */
}
