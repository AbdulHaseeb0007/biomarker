import { useState } from "react";
import dayjs from "dayjs";
import Graph from "./Graph";

const bloodSugarLevel = {
  maxAbove: 250,
  minAbove: 100,

  maxOptimal: 100,
  minOptimal: 70,

  minBelow: 70,
  maxBelow: 0,
};

// const userData = [
//   {
//     result: 120,
//     date: "2024-01-14",
//   },
//   {
//     result: 50,
//     date: "2024-01-22",
//   },
//   {
//     result: 70,
//     date: "2024-01-16",
//   },
//   {
//     result: 80,
//     date: "2024-01-31",
//   },
//   {
//     result: 90,
//     date: "2024-01-29",
//   },
//   {
//     result: 100,
//     date: "2024-01-02",
//   },
//   {
//     result: 170,
//     date: "2024-05-17",
//   },
//   {
//     result: 200,
//     date: "2024-05-25",
//   },
// ];

const BloodSugarChart = ({ userData = [] }) => {
  const unit = "mg/dL";

  //   const chartWidth = 920
  const chartWidth = 700;

  const aboveRange = bloodSugarLevel.maxAbove - bloodSugarLevel.minAbove;
  const optimalRange = bloodSugarLevel.maxOptimal - bloodSugarLevel.minOptimal;
  const belowRange = bloodSugarLevel.minBelow - bloodSugarLevel.maxBelow;

  const chartHeight = aboveRange + optimalRange + belowRange;

  //   const totalDays = 31;
  const totalDays = userData.length > 5 ? userData.length : 5;

  const datePoints = Array.from({ length: totalDays }, (_, index) => index + 1).map(
    (num) => num * (Math.floor(chartWidth / totalDays) - 1)
  );

  const [barLeft, setBarLeft] = useState(0);
  const [barTop, setBarTop] = useState(0);
  const [showBars, setShowBars] = useState("hidden");

  const showGraphBars = (top, left) => {
    setShowBars("visible");
    setBarLeft(left);
    setBarTop(top);
  };

  const getPointColor = (top) => {
    if (top > 100 && top <= 250) return "#E62E2D";
    if (top >= 70 && top <= 100) return "#3D830A";
    if (top >= 0 && top < 70) return "#E62E2D";
  };

  const getStrokePoints = () => {
    const path = "" + userData.map((data, ind) => `${datePoints[ind]},${chartHeight - data.result} `);

    return path.trim();
  };

  const chartBg = `linear-gradient(to bottom, #FCD8D8 0px, #FCD8D8 ${aboveRange}px, #D1E5D0 ${aboveRange}px, #D1E5D0 ${
    aboveRange + optimalRange
  }px, #FCD8D8 ${aboveRange + optimalRange}px, #FCD8D8 250px)`;

  const sidebarBg = `linear-gradient(to bottom,red 0px,red ${aboveRange}px, green ${aboveRange}px, green ${
    aboveRange + optimalRange
  }px,red ${aboveRange + optimalRange}px,red 250px)`;

  if (!userData) return;

  return (
    <Graph width={chartWidth} height={chartHeight} background={chartBg}>
      <Graph.Sidebar width={chartWidth} height={chartHeight} background={sidebarBg} />

      <Graph.Stroke width={chartWidth} height={chartHeight} zIndex={1} points={getStrokePoints()} />

      <Graph.HorizontalBar top={barTop} zIndex={2} visibility={showBars} />
      <Graph.VerticalBar left={barLeft} zIndex={3} visibility={showBars} />

      {userData.map((data, ind) => {
        const color = getPointColor(data.result);
        const top = chartHeight - data.result;
        const left = datePoints[ind];
        const zIndex = ind + 10;
        const title = data.result + " " + unit;

        return (
          <div key={ind}>
            <Graph.DatePoint key={ind} left={datePoints[ind]} date={dayjs(data.date).format("DD")} month={dayjs(data.date).format("MMM")} />

            <Graph.Point color={color} top={top - 5} left={left - 5} zIndex={zIndex} />
            <Graph.PointToolTip
              color={color}
              top={top - 10}
              left={left - 10}
              zIndex={zIndex}
              title={title}
              handleMouseEnter={() => showGraphBars(top, left)}
            />
          </div>
        );
      })}
    </Graph>
  );
};

export default BloodSugarChart;
