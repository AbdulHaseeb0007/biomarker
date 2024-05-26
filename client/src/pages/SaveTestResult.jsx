import { useLayoutEffect, useState, useTransition } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import dayjs from "dayjs";

const SaveTestResult = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [description, setDescription] = useState(null);
  const [name, setName] = useState("");
  const [result, setResult] = useState(0);
  const [date, setDate] = useState(dayjs());

  const [pending, startTransition] = useTransition();

  const bloodSugarDesc =
    "Blood sugar level, also known as blood glucose level, refers to the concentration of glucose present in the blood. Glucose is a type of sugar that serves as the primary source of energy for cells in the body, particularly for the brain.";

  const bloodPressureDesc =
    "Blood pressure is the amount of force your blood uses to get through your arteries. When your heart pumps, it uses force to push oxygen-rich blood out to your arteries. They bring it to your body's cells and tissues. If your blood pressure is too high, it can cause health issues.";

  const saveResult = () =>
    startTransition(async () => {
      let data = {};

      data.name = name;
      data.date = dayjs(date).format("YYYY-MM-DD");
      data.test_type = searchParams.get("test");

      if (result > 250) data.result = 250;
      if (result < 0) data.result = 0;
      data.result = result;

      const response = await fetch("http://localhost:3000/users/save-result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const res = await response.json();

      if (res.status) {
        setName("");
        setResult(0);
        setDate(dayjs());
        alert("Result Saved Successfully.");
      }

      return;
    });

  useLayoutEffect(() => {
    const search = searchParams.get("test");
    if (search == "blood-pressure-level") setDescription(bloodPressureDesc);
    if (search == "blood-sugar-level") setDescription(bloodSugarDesc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        padding: "100px 0px",
        fontFamily: "Poppins",
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
          height: "calc(100% - 50px)",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "50%",
            height: 600,
            background: "#B8D9D9",
            borderRadius: 10,
            padding: "40px 0px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h1>Test Result</h1>
          </div>

          <br />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                // label="Result Date"
                sx={{ background: "white", width: "400px" }}
                value={date}
                onChange={(newValue) => setDate(newValue)}
              />
            </LocalizationProvider>
          </div>

          <br />

          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ textAlign: "center", width: "80%", fontSize: 14 }}>{description}</div>
          </div>

          <br />

          {searchParams.get("test") == "blood-sugar-level" && <BloodSugarRange />}
          {searchParams.get("test") == "blood-pressure-level" && <BloodPressureRange />}

          <br />

          <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
            <TextField
              id="outlined-basic"
              placeholder="Name"
              variant="outlined"
              sx={{ background: "white", width: 300 }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              placeholder="Result"
              variant="outlined"
              sx={{ background: "white", width: 300 }}
              type="number"
              value={result}
              onChange={(e) => setResult(e.target.value)}
            />
          </div>

          <br />

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              size="large"
              disableElevation
              disableRipple
              sx={{
                background: "#4F6367",
                "&:hover": { background: "#4F6367" },
              }}
              disabled={pending}
              onClick={saveResult}
            >
              Save Test Result
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveTestResult;

const BloodSugarRange = () => (
  <div style={{ marginLeft: "20px" }}>
    <h4>Range:</h4>
    <div style={{ fontSize: 14, color: "red" }}>Above Range: greater than 100</div>
    <div style={{ fontSize: 14, color: "green" }}>Optimal Range: 70-100</div>
    <div style={{ fontSize: 14, color: "red" }}>Below Range: less than 70</div>
  </div>
);

const BloodPressureRange = () => (
  <div style={{ marginLeft: "20px" }}>
    <h4>Range:</h4>
    <div style={{ fontSize: 14, color: "red" }}>Above Range: greater than 140</div>
    <div style={{ fontSize: 14, color: "orange" }}>Above Optimal Range: 120-140</div>
    <div style={{ fontSize: 14, color: "green" }}>Optimal Range: 110-120</div>
    <div style={{ fontSize: 14, color: "orange" }}>Below Optimal Range: 90-110</div>
    <div style={{ fontSize: 14, color: "red" }}> Below Range: less than 70</div>
  </div>
);
