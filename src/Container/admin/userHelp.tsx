import * as React from 'react';
import Header from "../../components/admin/header/Heades";
import Sidebar from "../../components/admin/sidebar/Sidebar";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

function createData(name: string, lastUpdated: any) {
  return { name, lastUpdated };
}

const rows = [
  createData('What is Dframe', "11/12/22"),
  createData('How can I use Dframe', "12/12/22"),
  createData('What are the benefits of Dframe', "13/12/22"),
  createData('Is my data safe with Dframe', "14/12/22"),
  createData('How does dframe work', "15/12/22"),
  createData('What is Dframe', "11/12/22"),
  createData('How can I use Dframe', "12/12/22"),
  createData('What are the benefits of Dframe', "13/12/22"),
  createData('Is my data safe with Dframe', "14/12/22"),
  createData('How does dframe work', "15/12/22"),
]

export default function UserHelp() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ display: 'flex'}} >
      <Sidebar/>
      <Box style={{background:"#f3f3f3",minHeight:"100vh"}}>
        <Header />

        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Help Questions</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Box>
                <h3>Question</h3>
                <ul>
                    <li>What is Dframe</li>
                    <li>Dframe is a project which will help user to get rewarded for their data</li>
                    <li>Any image</li>
                    <li>Any pdf</li>
                </ul>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEdit} onClose={handleCloseEdit} maxWidth="md">
        <DialogTitle>Edit Help Questions</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Box>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Question"
                    type="email"
                    fullWidth
                    variant="standard"
                    value="what is dframe"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Answer"
                    type="email"
                    fullWidth
                    variant="standard"
                    value="Dframe is way for user to get rewarded for his/her data"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Question"
                    type="email"
                    fullWidth
                    variant="standard"
                    value="what is dframe"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Answer"
                    type="email"
                    fullWidth
                    variant="standard"
                    value="Dframe is way for user to get rewarded for his/her data"
                />
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Close</Button>
        </DialogActions>
      </Dialog>
        
        <Box sx={{padding:"20px"}}>
            
        <TableContainer component={Paper}>
        <Box sx={{padding:"10px",marginLeft:"10px",fontWeight:"500",fontSize:"180%"}}>User Help Section</Box>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow >
                <TableCell sx={{fontWeight:"500",fontSize:"140%"}}>
                 Question
                </TableCell>
                <TableCell sx={{fontWeight:"500",fontSize:"140%"}}>
                 Last Updated
                </TableCell>
                <TableCell sx={{fontWeight:"500",fontSize:"140%"}}>
                 Edit
                </TableCell>
                <TableCell sx={{fontWeight:"500",fontSize:"140%"}}>
                 Delete
                </TableCell>
            </TableRow>
          </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows
              ).map((row) => (
                <TableRow key={row.name}>
                  <TableCell width={620} onClick={handleClickOpen} sx={{cursor:"pointer",paddingX:"40px",'&:hover':{fontSize:"105%"}}}>
                  {row.name}
                  </TableCell>
                  <TableCell >
                    {row.lastUpdated}
                  </TableCell>
                  <TableCell onClick={handleClickOpenEdit} sx={{cursor:"pointer"}}>
                    <EditIcon sx={{color:"#ae08c4"}}/>
                  </TableCell>
                  <TableCell >
                    <DeleteIcon sx={{color:"#db040f"}}/>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}
