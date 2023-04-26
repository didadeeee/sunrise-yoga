import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { User } from "../../Type";
import "./AccountPage.css";

type AccountPageProp = {
  user: User;
};

export default function AccountPage({ user }: AccountPageProp) {
  return (
    <>
      <Box sx={{ maxWidth: "600px", margin: "0 auto" }}>
        <TableContainer component={Paper} sx={{ margin: "20px" }}>
          <Typography variant="h5">Account Details</Typography>
          <Table sx={{ minWidth: 200 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Birthday</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                key={user.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">
                  {dayjs(user.birthday).format("DD/MM/YYYY")}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Box className="R2-Account">
            <Link to={"/users/edit"}>
              <Button>Edit Details</Button>
            </Link>
          </Box>
        </TableContainer>
      </Box>
    </>
  );
}
