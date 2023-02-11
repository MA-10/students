import { Button, ButtonGroup, Table } from "reactstrap";
import { Paper, TableContainer, TablePagination } from "@material-ui/core";
import { useState } from "react";


const StudentList = ({ students, handleDelete, setIsUpdate, setStudent, setShow }) => {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (

    <Paper>
      <TableContainer sx={{ height: 600 }}>
      <Table striped hover className="mt-4">
        <thead >
          <tr>
            <th>#</th>
            <th >Student name</th>
            <th >Student email</th>
          </tr>
        </thead>
        <tbody>
          {students.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((student, index) => {
            return <tr>
              <th scope="row">{index + 1}</th>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>
                <ButtonGroup>
                  <Button size="sm" color="primary" onClick={() => {setIsUpdate(true); setStudent(student); setShow(true);}} >Edit</Button>
                  <Button size="sm" color="danger" onClick={() => handleDelete(student.id)} >Delete</Button>
                </ButtonGroup>
              </td>
            </tr>
          })}
        </tbody>
      </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={students.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default StudentList;