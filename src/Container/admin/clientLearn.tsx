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
import EditDialog from '../../components/admin/user/learnMore/EditLearn';
import AddLearn from '../../components/admin/user/learnMore/AddLearn';
import Button from '@mui/material/Button';
import EditClientFaq from '../../components/admin/client/faq/EditFaq';
import AddClientFAQ from '../../components/admin/client/faq/AddFAQ';
import EditClientLearn from '../../components/admin/client/learnMore/EditLearn';
import AddClientLearn from '../../components/admin/client/learnMore/AddLearn';
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

interface YourDataType {
  _id:string;
  title: string;
  text: string;
}

interface FAQType {
  _id: string;
  question: string;
  answer: string;
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

export default function UserLearn() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  // for learnmore
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);

  //for FAQ
  const [openFaqEdit, setOpenFaqEdit] = React.useState(false);
  const [openFaqAdd, setOpenFaqAdd] = React.useState(false);
  
  const [data, setData] = React.useState<YourDataType[]  >([]);
  const [faq, setFaq] = React.useState<FAQType[]>([]);
  const [oneData,setOneData] = React.useState<YourDataType>();
  const [oneData2,setOneData2] = React.useState<FAQType>();
  const navigate = useNavigate();


  //for learn more edit
  const handleClickOpenEdit = (index:number) => {
    setOneData(data[index]);
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  //for learn more add
  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };
  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  //for faq edit
  const handleClickFaqOpenEdit = (index:number) => {
    setOneData2(faq[index]);
    setOpenFaqEdit(true);
  };
  const handleCloseFaqEdit = () => {
    setOpenFaqEdit(false);
  };

  //for learn more add
  const handleClickFaqAdd = () => {
    setOpenFaqAdd(true);
  };
  const handleCloseFaqAdd = () => {
    setOpenFaqAdd(false);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

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

  const handleDeleteLearn= async (id:any) => {
  try {
      // Make an HTTP request to add the data
      const response = await axios.delete(
        `https://client-backend-402017.el.r.appspot.com/LearnMore/admin/deleteSingle/${id}`,
      );
      console.log('Data added:', response.data);
      window.location.reload();
    } catch (error) {
      console.error('Error adding data:', error);
    }
    
  }

  const handleDeleteFaq= async (id:any) => {
    try {
        // Make an HTTP request to add the data
        const response = await axios.delete(
          `https://client-backend-402017.el.r.appspot.com/F&Q/admin/deleteFaq/${id}`,
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
      .get('https://client-backend-402017.el.r.appspot.com/LearnMore/readLearnMore')
      .then((response) => {
        // Assuming the response is an array of data objects
        console.log(response.data);
        setData(response.data);
        setOneData(response.data[0]);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

      axios
      .get('https://client-backend-402017.el.r.appspot.com/F&Q/faq')
      .then((response) => {
        // Assuming the response is an array of data objects
        console.log(response.data);
        setFaq(response.data);
        setOneData2(response.data[0]);
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
        <Box>
        <Button variant="contained"  style={{ backgroundColor: 'black', color: 'white' }} sx={{marginTop:"20px", marginLeft:"20px"}} onClick={()=>handleClickOpenAdd()}>Add Learn</Button>
        </Box>
        <Box sx={{padding:"20px"}}>    
        <TableContainer component={Paper}>
        <Box sx={{padding:"10px",marginLeft:"10px",fontWeight:"500",fontSize:"180%"}}>User Learn More Section</Box>
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
                  <TableCell sx={{cursor:"pointer"}} onClick={()=>handleClickOpenEdit(index)}>
                    <EditIcon sx={{color:"#ae08c4"}}/>
                  </TableCell>
                  <TableCell >
                    <DeleteIcon sx={{color:"#db040f"}} onClick={()=>handleDeleteLearn(singleData._id)}/>
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
        <EditClientLearn open={openEdit} onClose={handleCloseEdit} oneData={oneData}/>
        <AddClientLearn open={openAdd} onClose={handleCloseAdd} />
        <hr style={{marginLeft:"1%",marginRight:"1%",width:"98%",marginTop:"30px"}} />
        <Button variant="contained"  style={{ backgroundColor: 'black', color: 'white' }} sx={{marginTop:"30px", marginLeft:"20px"}} onClick={()=>handleClickFaqAdd()}>Add FAQ</Button>
        <Box sx={{padding:"20px"}}>   
        <TableContainer component={Paper}>
        <Box sx={{padding:"10px",marginLeft:"10px",fontWeight:"500",fontSize:"180%"}}>User Faq's</Box>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow >
                <TableCell sx={{fontWeight:"500",fontSize:"140%"}}>
                 Question
                </TableCell>
                <TableCell sx={{fontWeight:"500",fontSize:"140%"}}>
                 Answer
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
                ? faq.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : faq
              ).map((row:FAQType,index:number) => (
                <TableRow key={index}>
                  <TableCell sx={{cursor:"pointer",paddingX:"40px",'&:hover':{fontSize:"105%"}}}>
                  {row.question}
                  </TableCell>
                  <TableCell >
                    {row.answer}
                  </TableCell>
                  <TableCell sx={{cursor:"pointer"}} onClick={()=>handleClickFaqOpenEdit(index)}>
                    <EditIcon sx={{color:"#ae08c4"}}/>
                  </TableCell>
                  <TableCell >
                    <DeleteIcon sx={{color:"#db040f"}} onClick={()=>handleDeleteFaq(row._id)}/>
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
                  count={faq.length}
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
        <EditClientFaq open={openFaqEdit} onClose={handleCloseFaqEdit} oneData2={oneData2}/>
        <AddClientFAQ open={openFaqAdd} onClose={handleCloseFaqAdd} />
      </Box>
    </Box>
  );
}
