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
  const chartWidth = 920;

  const aboveRange = bloodSugarLevel.maxAbove - bloodSugarLevel.minAbove;
  const optimalRange = bloodSugarLevel.maxOptimal - bloodSugarLevel.minOptimal;
  const belowRange = bloodSugarLevel.minBelow - bloodSugarLevel.maxBelow;

  const chartHeight = aboveRange + optimalRange + belowRange;
  const totalDays = 21;

  const dateArray = Array.from(
    { length: totalDays },
    (_, index) => index + 1
  ).map((num) => num * (Math.floor(chartWidth / totalDays) - 1));

  return (
    <div
      style={{
        position: "relative",
        width: chartWidth,
        // height: 200,
        height: chartHeight,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          // height: 100,
          height: aboveRange,
          background: "red",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          // top: 100,
          top: aboveRange,
          left: 0,
          width: "100%",
          // height: 30,
          height: optimalRange,
          background: "green",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          // top: 130,
          top: Math.ceil(aboveRange) + Math.ceil(optimalRange),
          left: 0,
          width: "100%",
          // height: 70,
          height: belowRange,
          background: "red",
        }}
      ></div>

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
          <div
            key={data.level}
            style={{
              position: "absolute",
              top: chartHeight - data.level - 2,
              left: dateArray[ind],
              width: 5,
              height: 5,
              background: "black",
              borderRadius: "50%",
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default BloodSugarChart;

// "linear-gradient(to bottom, red 0px, red 150px, green 150px, green 180px, yellow 180px, yellow 250px)",
