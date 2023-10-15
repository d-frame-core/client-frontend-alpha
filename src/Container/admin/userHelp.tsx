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
import axios from 'axios';
import EditHelp from '../../components/admin/user/help/EditHelp';
import AddHelp from '../../components/admin/user/help/AddHelp';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

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

interface YourDataType {
  _id:string;
  title: string;
  text: string;
}

interface AdminData {
  token: string;
  userAddress: string;
}



export default function UserHelp() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [data,setData] = React.useState<YourDataType[]>([]);
  const [oneData,setOneData] = React.useState<YourDataType>();
  const [openAdd, setOpenAdd] = React.useState(false);
  const navigate = useNavigate();


  const handleClickOpenEdit = (index:any) => {
    setOneData(data[index])
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

   //for help add
   const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };
  const handleCloseAdd = () => {
    setOpenAdd(false);
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

  const handleDeleteHelp= async (id:any) => {
    try {
        // Make an HTTP request to add the data
        const response = await axios.delete(
          `https://client-backend-402017.el.r.appspot.com/Help/userHelp/deleteSingle/${id}`,
        );
        console.log('Data added:', response.data);
        window.location.reload();
      } catch (error) {
        console.error('Error adding data:', error);
      }
      
    }

  React.useEffect(() => {
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
    // Make the API request when the component mounts
    axios
      .get('https://client-backend-402017.el.r.appspot.com/Help/userHelp/getAllHelp')
      .then((response) => {
        // Assuming the response is an array of data objects
        console.log(response.data);
        setData(response.data);
        setOneData(response.data[0]);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

  }, []);

  return (
    <Box sx={{ display: 'flex'}} >
      <Sidebar/>
      <Box style={{background:"#f3f3f3",minHeight:"100vh"}}>
        <Header />
        
        <Box sx={{padding:"20px"}}>
        <Box>
        <Button variant="contained"  style={{ backgroundColor: 'black', color: 'white' }} sx={{marginTop:"20px", marginBottom:"20px"}} onClick={()=>handleClickOpenAdd()}>Add Learn</Button>
        </Box>
        <TableContainer component={Paper}>
        <Box sx={{padding:"10px",marginLeft:"10px",fontWeight:"500",fontSize:"180%"}}>User Help Section</Box>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow >
                <TableCell sx={{fontWeight:"500",fontSize:"140%"}}>
                 Query
                </TableCell>
                <TableCell sx={{fontWeight:"500",fontSize:"140%"}}>
                 Response
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
                ? data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : data
              ).map((singleData:YourDataType,index:number) => (
                <TableRow key={index}>
                  <TableCell sx={{cursor:"pointer",paddingX:"40px",'&:hover':{fontSize:"105%"}}}>
                  {singleData.title}
                  </TableCell>
                  <TableCell > 
                    {singleData.text}
                  </TableCell>
                  <TableCell sx={{cursor:"pointer"}} onClick={()=>handleClickOpenEdit(index)} >
                    <EditIcon sx={{color:"#ae08c4"}}/>
                  </TableCell>
                  <TableCell >
                    <DeleteIcon sx={{color:"#db040f"}} onClick={()=>handleDeleteHelp(singleData._id)}/>
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
                  count={data.length}
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
        <EditHelp open={openEdit} onClose={handleCloseEdit} oneData={oneData}/>
        <AddHelp open={openAdd} onClose={handleCloseAdd} />
      </Box>
    </Box>
  );
}
