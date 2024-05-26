import { useLayoutEffect, useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import BLoodPressureChart from "../charts/BloodPressureChart";
import BloodSugarChart from "../charts/BloodSugarChart";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ShowGraph = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const getTestCounts = async (name, type, month) => {
    const response = await fetch(`http://localhost:3000/users/get-user-monthly-test-data/${name}/${type}/${month}`);
    const data = await response.json();
    if (data.status) setData(data.data);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const search = useMemo(() => searchParams.get("test"), []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const name = useMemo(() => searchParams.get("name"), []);

  useLayoutEffect(() => {
    const test = searchParams.get("test");
    const name = searchParams.get("name");
    const month = searchParams.get("month");
    getTestCounts(name, test, month).catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        padding: "70px 0px",
        color: "#4F6367",
      }}
    >
      <div style={{ height: 50, padding: "0px 50px" }}>
        <Button
          variant="text"
          startIcon={<ArrowBackIcon />}
          sx={{ color: "#4F6367", "&:hover": { backgroundColor: "transparent" } }}
          disableRipple
          disableElevation
          onClick={() => navigate("/")}
        >
          Back To Home
        </Button>
      </div>

      <div
        style={{
          width: "100%",
          height: "calc(100% - 50px)",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: 50,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontFamily: "Poppins" }}>{search.split("-").join(" ").toUpperCase()}</h1>
          <h2 style={{ fontFamily: "Poppins" }}>{name.toUpperCase()}</h2>
        </div>

        {search == "blood-pressure-level" && data.length && <BLoodPressureChart userData={data.slice(0, 4)} />}
        {search == "blood-sugar-level" && data.length && <BloodSugarChart userData={data} />}
      </div>
    </div>
  );
};

export default ShowGraph;
