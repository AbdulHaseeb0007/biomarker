import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";

const columns = [
  { id: "sno", label: "S.No", width: "2%" },
  { id: "biomarker", label: "Biomarker", width: "20%" },
  { id: "measurementUnit", label: "Measurement Unit", width: "15%" },
  { id: "categories", label: "Categories", width: "25%" },
  { id: "action", label: "Action", width: "10%", align: "center" },
  { id: "result", label: "Result", width: "15%", align: "center" },
];

const data = [
  {
    sno: "01",
    biomarker: "Blood Sugar Level",
    measurementUnit: "mg/dL",
    categories: "3 Bar Marker",
  },
  {
    sno: "02",
    biomarker: "Blood Pressure Level",
    measurementUnit: "mm/Hg",
    categories: "5 Bar Marker",
  },
];

const TestList = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: 50,
        padding: "100px 0px",
        color: "#4F6367",
      }}
    >
      <h1 style={{ fontFamily: "Poppins" }}>Biomarkers</h1>

      <div style={{ width: "90%" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ background: "#4F6367", color: "white" }}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column?.align ? column.align : "left"}
                    style={{
                      color: "white",
                      width: column.width,
                      borderLeft: "1px solid white",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((row, ind) => (
                <TableRow key={ind} sx={{ background: "#B8D9D9", margin: 2 }}>
                  <TableCell align="center" sx={{ borderRight: "1px solid #4F6367" }}>
                    {row.sno}
                  </TableCell>
                  <TableCell align="left" sx={{ borderRight: "1px solid #4F6367" }}>
                    {row.biomarker}
                  </TableCell>
                  <TableCell align="left" sx={{ borderRight: "1px solid #4F6367" }}>
                    {row.measurementUnit}
                  </TableCell>
                  <TableCell align="left" sx={{ borderRight: "1px solid #4F6367" }}>
                    {row.categories}
                  </TableCell>
                  <TableCell align="center" sx={{ borderRight: "1px solid #4F6367" }}>
                    <IconButton
                      size="small"
                      onClick={() => navigate("/total-test-count?test=" + row.biomarker.toLowerCase().split(" ").join("-"))}
                    >
                      <VisibilityIcon fontSize="inherit" />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      size="small"
                      disableElevation
                      disableRipple
                      sx={{
                        background: "#4F6367",
                        "&:hover": { background: "#4F6367" },
                      }}
                      onClick={() => navigate("/save-result?test=" + row.biomarker.toLowerCase().split(" ").join("-"))}
                    >
                      Test
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default TestList;
