import { useLayoutEffect, useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";

const columns = [
  { id: "sno", label: "S.No", width: "2%" },
  { id: "name", label: "Name", width: "20%" },
  { id: "total_tests", label: "Total Tests", width: "15%" },
  { id: "action", label: "Action", width: "10%", align: "center" },
];

const TotalTestCountList = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);

  const getTestCounts = async (type) => {
    const response = await fetch("http://localhost:3000/users/test-count/" + type);
    const data = await response.json();
    if (data.status) setRows(data.data);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const search = useMemo(() => searchParams.get("test"), []);

  useLayoutEffect(() => {
    const search = searchParams.get("test");
    getTestCounts(search).catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <h1 style={{ fontFamily: "Poppins" }}>{search.split("-").join(" ").toUpperCase()}</h1>

      <div style={{ width: "70%" }}>
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
              {rows.map((row, ind) => (
                <TableRow key={ind} sx={{ background: "#B8D9D9", margin: 2 }}>
                  <TableCell align="center" sx={{ borderRight: "1px solid #4F6367" }}>
                    {ind + 1}
                  </TableCell>
                  <TableCell align="left" sx={{ borderRight: "1px solid #4F6367" }}>
                    {row._id}
                  </TableCell>
                  <TableCell align="left" sx={{ borderRight: "1px solid #4F6367" }}>
                    {row.count}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton size="small" onClick={() => navigate(`/user-test-count?test=${search}&name=${row._id}`)}>
                      <VisibilityIcon fontSize="inherit" />
                    </IconButton>
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

export default TotalTestCountList;
