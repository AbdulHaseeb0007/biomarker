import { styled } from "@mui/system";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";

const Sidebar = styled("div")(({ height, background }) => ({
  position: "absolute",
  left: 0,
  top: 0,
  width: 7,
  height,
  backgroundImage: background,
}));

function PointToolTip({ title, top, left, zIndex, handleMouseEnter }) {
  return (
    <Tooltip
      title={title}
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
          top,
          left,
          width: 20,
          height: 20,
          background: "grey",
          borderRadius: "50%",
          zIndex,
          backgroundColor: "transparent",
        }}
        onMouseEnter={handleMouseEnter}
      ></div>
    </Tooltip>
  );
}

const Point = styled("div")(({ color, top, left, zIndex }) => ({
  position: "absolute",
  top,
  left,
  width: 10,
  height: 10,
  background: color,
  borderRadius: "50%",
  zIndex,
}));

// const DatePoint = styled("div")(({ left }) => ({
//   position: "absolute",
//   bottom: 0,
//   left,
//   width: 1,
//   height: 1,
//   // background: "black",
//   fontSize: 9,
// }));

function DatePoint({ left, date, month }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left,
        width: 1,
        height: 1,
        // background: "black",
        fontSize: 9,
      }}
    >
      <div
        style={{
          marginLeft: -6,
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <span>{date}</span>
        <span>{month}</span>
      </div>
    </div>
  );
}

function Stroke({ width, height, zIndex, points }) {
  return (
    <svg width={width} height={height} style={{ position: "absolute", zIndex }}>
      <polyline
        points={points}
        style={{ fill: "none", stroke: "black", strokeWidth: "1" }}
      />
    </svg>
  );
}

const VerticalBar = styled("div")(({ left, zIndex, visibility }) => ({
  width: "1px",
  height: "100%",
  position: "absolute",
  left,
  top: 0,
  border: "1px dashed #cfd8dc",
  visibility,
  zIndex,
}));

const HorizontalBar = styled("div")(({ top, zIndex, visibility }) => ({
  width: "100%",
  height: "1px",
  position: "absolute",
  left: 0,
  top,
  border: "1px dashed #cfd8dc",
  visibility,
  zIndex,
}));

const Graph = ({ width, height, background, children }) => {
  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        backgroundImage: background,
      }}
    >
      {children}
    </div>
  );
};

Graph.Sidebar = Sidebar;
Graph.PointToolTip = PointToolTip;
Graph.Point = Point;
Graph.DatePoint = DatePoint;
Graph.Stroke = Stroke;
Graph.VerticalBar = VerticalBar;
Graph.HorizontalBar = HorizontalBar;

export default Graph;
