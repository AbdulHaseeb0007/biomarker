import { useState } from "react";
import dayjs from "dayjs";
import Graph from "./Graph";

const bloodPressureLevel = {
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

// const userData = [
//   {
//     result: 120,
//     date: "2024-05-01",
//   },
//   {
//     result: 50,
//     date: "2024-05-14",
//   },
//   {
//     result: 70,
//     date: "2024-05-15",
//   },
//   {
//     result: 130,
//     date: "2024-05-16",
//   },
//   {
//     result: 114,
//     date: "2024-05-20",
//   },
//   {
//     result: 100,
//     date: "2024-05-22",
//   },
//   {
//     result: 110,
//     date: "2024-05-23",
//   },
//   {
//     result: 170,
//     date: "2024-05-24",
//   },
//   {
//     result: 200,
//     date: "2024-05-05",
//   },
// ];

const BLoodPressureChart = ({ userData = [] }) => {
  const unit = "mm/Hg";

  // const chartWidth = 920;
  const chartWidth = 700;

  const extraAboveRange = bloodPressureLevel.extraAbove.max - bloodPressureLevel.extraAbove.min;
  const aboveRange = bloodPressureLevel.above.max - bloodPressureLevel.above.min;

  const optimalRange = bloodPressureLevel.optimal.max - bloodPressureLevel.optimal.min;

  const belowRange = bloodPressureLevel.below.min - bloodPressureLevel.below.max;
  const extraBelowRange = bloodPressureLevel.extraBelow.min - bloodPressureLevel.extraBelow.max;

  const chartHeight = extraAboveRange + aboveRange + optimalRange + belowRange + extraBelowRange;

  // const totalDays = 31;
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

  const getStrokePoints = () => {
    const path = "" + userData.map((data, ind) => `${datePoints[ind]},${chartHeight - data.result} `);

    return path.trim();
  };

  const getPointColor = (top) => {
    if (top > 140 && top <= 250) return "#E62E2D";
    if (top > 120 && top <= 140) return "#EFA41C";
    if (top >= 110 && top <= 120) return "#3D830A";
    if (top >= 90 && top < 110) return "#EFA41C";
    if (top >= 0 && top < 90) return "#E62E2D";
  };

  const chartBg =
    "linear-gradient(to bottom, #FCD8D8 0px, #FCD8D8 110px, #FCEAC6 110px, #FCEAC6 130px, #D1E5D0 130px, #D1E5D0 140px, #FCEAC6 140px, #FCEAC6 160px, #FCD8D8 160px, #FCD8D8 250px)";

  const sidebarBg =
    "linear-gradient(to bottom, red 0px, red 110px, yellow 110px, yellow 130px, green 130px, green 140px, yellow 140px, yellow 160px, red 160px, red 250px)";

  return (
    <Graph width={chartWidth} height={chartHeight} background={chartBg}>
      <Graph.Sidebar width={chartWidth} height={chartHeight} background={sidebarBg} />

      <Graph.Stroke width={chartWidth} height={chartHeight} zIndex={1} points={getStrokePoints()} />

      <Graph.HorizontalBar top={barTop} zIndex={2} visibility={showBars} />
      <Graph.VerticalBar left={barLeft} zIndex={3} visibility={showBars} />

      {userData.map((data, ind) => (
        <Graph.DatePoint key={ind} left={datePoints[ind]} date={dayjs(data.date).format("DD")} month={dayjs(data.date).format("MMM")} />
      ))}

      {userData.map((data, ind) => {
        const color = getPointColor(data.result);
        const top = chartHeight - data.result;
        const left = datePoints[ind];
        const zIndex = ind + 10;
        const title = data.result + " " + unit;

        return (
          <div key={ind}>
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

export default BLoodPressureChart;
