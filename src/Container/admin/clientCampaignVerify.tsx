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
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DftStat from '../../components/admin/user/dashboard/SideTabs';
import { useNavigate } from 'react-router-dom';

interface AdminData {
  token: string;
  userAddress: string;
}

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

export default function ClientCampaignVerify() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const navigate = useNavigate();
  React.useEffect(() => {
    // Check if dframeAdmindata exists in localStorage
    const dframeAdmindata:any = localStorage.getItem('dframeAdmindata');
    if (!dframeAdmindata) {
      navigate('/'); // Redirect to the login page if not found
      return;
    }
    // Parse the JSON data from the localStorage string
    const adminData:AdminData = JSON.parse(dframeAdmindata);

    // Check if the token or user address is missing
    if (!adminData.token && adminData.userAddress=="0x298ab03DD8D59f04b2Fec7BcC75849bD685eea75") {
      navigate("/"); // Redirect to the login page if not found
    }
    console.log("i am writing the data",adminData)
     
  }, []);


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
        <DialogTitle>Campaign Name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Box>
                <h3>Campaign Description- here comes the description of the campaign</h3>
                <p>Campaign Info</p>
                <ul>
                    <li>Starting date-  22/1/2023</li>
                    <li>Starting date-  26/1/2023</li>
                    <li>Bis Stragegy- 32</li>
                </ul>
                <Box sx={{display:"flex"}}>
                  <p>Tags - </p>
                  <p style={{border:"2px #1aa5eb solid", padding:"4px 8px",background:"#1aa5eb",color:"white", borderRadius:"10px", marginLeft:"10px"}}>Men</p>
                  <p style={{border:"2px #1aa5eb solid", padding:"4px 8px",background:"#1aa5eb",color:"white", borderRadius:"10px", marginLeft:"10px"}}>Boys</p>
                  <p style={{border:"2px #1aa5eb solid", padding:"4px 8px",background:"#1aa5eb",color:"white", borderRadius:"10px", marginLeft:"10px"}}>Rich</p>
                  <p style={{border:"2px #1aa5eb solid", padding:"4px 8px",background:"#1aa5eb",color:"white", borderRadius:"10px", marginLeft:"10px"}}>Iphone</p>
                </Box>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEdit} onClose={handleCloseEdit} maxWidth="md">
        <DialogTitle>Verify Content</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Box>
              Here will come the content with dft per ad and other details
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Verify</Button>
          <Button onClick={handleCloseEdit} style={{color:"red"}}>Reject</Button>
          <Button onClick={handleCloseEdit}>Close</Button>
        </DialogActions>
      </Dialog>
        
        <Box sx={{padding:"20px"}}>

        <Box sx={{display:"flex"}}>
            <Box sx={{background:"white",padding:"16px",borderRadius:"8px",marginBottom:"16px", textAlign:"center",fontSize:"20px"}}>
               Campaign Stats
              <DftStat />
            </Box>
            <Box sx={{padding:"4px", marginLeft:"16px",height:"375px",width:"450px"}}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{background:"white",borderRadius:"8px",padding:"10px",textAlign:"center",fontSize:"18px",backgroundColor:"#ed5151",color:"white"}}>
                  <p>Average Active Users</p>
                  <p>233</p>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{background:"white",borderRadius:"8px",padding:"10px",textAlign:"center",fontSize:"18px",backgroundColor:"#4770f5",color:"white"}}>
                  <p>DFT current value</p>
                  <p>15 Rs</p>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{background:"white",borderRadius:"8px",padding:"10px",textAlign:"center",fontSize:"18px",backgroundColor:"#e6de02",color:"white"}}>
                  <p>Dft Distributed to Users</p>
                  <p>15231 DFT</p>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{background:"white",borderRadius:"8px",padding:"4px",textAlign:"center",fontSize:"18px",backgroundColor:"#2c9e41",color:"white"}}>
                  <p>To be distributed this month</p>
                  <p style={{marginTop:"-12px"}}>2123 DFT</p>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{background:"white",borderRadius:"8px",padding:"10px",textAlign:"center",fontSize:"18px",backgroundColor:"#d91cd2",color:"white"}}>
                  <p>Total Ads watched</p>
                  <p>2321</p>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{background:"white",borderRadius:"8px",padding:"10px",textAlign:"center",fontSize:"18px",backgroundColor:"#f09b2b",color:"white"}}>
                  <p>Today's Ads Queue</p>
                  <p>151</p>
                </Box>
              </Grid>
            </Grid>
            </Box>
          </Box>
            
        <TableContainer component={Paper}>
        <Box sx={{padding:"10px",marginLeft:"10px",fontWeight:"500",fontSize:"180%"}}>Client Campaign Verification</Box>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow >
                <TableCell sx={{fontWeight:"500",fontSize:"140%"}}>
                 Client Name
                </TableCell>
                <TableCell sx={{fontWeight:"500",fontSize:"140%"}}>
                 Campaign Date
                </TableCell>
                <TableCell sx={{fontWeight:"500",fontSize:"140%"}}>
                 Verify
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
                    <LibraryAddCheckIcon sx={{color:"#ae08c4"}}/>
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
