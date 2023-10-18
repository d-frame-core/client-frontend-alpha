/** @format */

import * as React from 'react';
import Header from '../../components/admin/header/Heades';
import Sidebar from '../../components/admin/sidebar/Sidebar';
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
import { Grid } from '@mui/material';
import DftStat from '../../components/admin/user/dashboard/SideTabs';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label='first page'>
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label='previous page'>
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'>
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='last page'>
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

function createData(name: string, calories: number, fat: number) {
  return { name, calories, fat };
}

const rows = [
  createData('Cupcake', 305, 3.7),
  createData('Donut', 452, 25.0),
  createData('Eclair', 262, 16.0),
  createData('Frozen yoghurt', 159, 6.0),
  createData('Gingerbread', 356, 16.0),
  createData('Honeycomb', 408, 3.2),
  createData('Ice cream sandwich', 237, 9.0),
  createData('Jelly Bean', 375, 0.0),
  createData('KitKat', 518, 26.0),
  createData('Lollipop', 392, 0.2),
  createData('Marshmallow', 318, 0),
  createData('Nougat', 360, 19.0),
  createData('Oreo', 437, 18.0),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

interface AdContent {
  adContent: string;
  adName: string;
  assignedUsers: number;
  bidAmount: number;
  campaignName: string;
  campaignType: string;
  clientId: string;
  endDate: string;
  perDay: number;
  startDate: string;
  tags: string[];
  totalDays: number;
  type: string;
  status: string;
  users: any[]; // You can replace 'any' with a specific interface if you have one for users.
  __v: number;
  _id: string;
}

interface AdminData {
  token: string;
  userAddress: string;
}

export default function ClientInfo() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selectedRowData, setSelectedRowData] =
    React.useState<AdContent | null>(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [fetchedData, setFetchedData] = React.useState<AdContent[]>([]);
  const navigate = useNavigate();

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - fetchedData.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    // Check if dframeAdmindata exists in localStorage
    const dframeAdmindata: any = localStorage.getItem('dframeAdmindata');
    if (!dframeAdmindata) {
      navigate('/'); // Redirect to the login page if not found
      return;
    }
    // Parse the JSON data from the localStorage string
    const adminData: AdminData = JSON.parse(dframeAdmindata);

    // Check if the token or user address is missing
    if (
      !adminData.token &&
      adminData.userAddress == '0x298ab03DD8D59f04b2Fec7BcC75849bD685eea75'
    ) {
      navigate('/'); // Redirect to the login page if not found
    }
    console.log('i am writing the data', adminData);
    // Make an HTTP GET request to your API endpoint
    axios
      .get('https://client-backend-402017.el.r.appspot.com/ads/getAllads')
      .then((response) => {
        setFetchedData(response.data.reverse());
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleRowClick = (rowData: AdContent) => {
    setSelectedRowData(rowData);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handlePause = (id: any) => {
    axios
      .patch(`https://client-backend-402017.el.r.appspot.com/ads/admin/pauseAd/${id}`)
      .then((response) => {
        // Update the active field in the state
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error deactivating client:', error);
      });
  };

  const handleVerify = (id: any) => {
    axios
      .patch(`https://client-backend-402017.el.r.appspot.com/ads/admin/verifyAd/${id}`)
      .then((response) => {
        // Update the active field in the state
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error deactivating client:', error);
      });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box style={{ background: '#f3f3f3' }}>
        <Header />
        <Box sx={{ padding: '20px' }}>
          <Box sx={{ display: 'flex' }}>
            <Box
              sx={{
                background: 'white',
                padding: '16px',
                borderRadius: '8px',
                marginBottom: '16px',
                textAlign: 'center',
                fontSize: '20px',
              }}>
              Dframe Client Stats
              <DftStat />
            </Box>
            <Box
              sx={{
                padding: '4px',
                marginLeft: '16px',
                height: '375px',
                width: '450px',
              }}>
              <Grid
                container
                spacing={2}>
                <Grid
                  item
                  xs={6}>
                  <Box
                    sx={{
                      background: 'white',
                      borderRadius: '8px',
                      padding: '10px',
                      textAlign: 'center',
                      fontSize: '18px',
                      backgroundColor: '#ed5151',
                      color: 'white',
                    }}>
                    <p>Average Active Clients</p>
                    <p>233</p>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={6}>
                  <Box
                    sx={{
                      background: 'white',
                      borderRadius: '8px',
                      padding: '10px',
                      textAlign: 'center',
                      fontSize: '18px',
                      backgroundColor: '#4770f5',
                      color: 'white',
                    }}>
                    <p>DFT current value</p>
                    <p>15 Rs</p>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={6}>
                  <Box
                    sx={{
                      background: 'white',
                      borderRadius: '8px',
                      padding: '10px',
                      textAlign: 'center',
                      fontSize: '18px',
                      backgroundColor: '#e6de02',
                      color: 'white',
                    }}>
                    <p>Dft Client Bought</p>
                    <p>15231 DFT</p>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={6}>
                  <Box
                    sx={{
                      background: 'white',
                      borderRadius: '8px',
                      padding: '4px',
                      textAlign: 'center',
                      fontSize: '18px',
                      backgroundColor: '#2c9e41',
                      color: 'white',
                    }}>
                    <p>This mmonth pridiction Of DFT use</p>
                    <p style={{ marginTop: '-12px' }}>2123 DFT</p>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={6}>
                  <Box
                    sx={{
                      background: 'white',
                      borderRadius: '8px',
                      padding: '10px',
                      textAlign: 'center',
                      fontSize: '18px',
                      backgroundColor: '#d91cd2',
                      color: 'white',
                    }}>
                    <p>Total Ads watched</p>
                    <p>2321</p>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={6}>
                  <Box
                    sx={{
                      background: 'white',
                      borderRadius: '8px',
                      padding: '10px',
                      textAlign: 'center',
                      fontSize: '18px',
                      backgroundColor: '#f09b2b',
                      color: 'white',
                    }}>
                    <p>Today's Ads Queue</p>
                    <p>151</p>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>

          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 500 }}
              aria-label='custom pagination table'>
              <TableHead>
                <TableRow>
                  <TableCell>Campaign Name</TableCell>
                  <TableCell>Campaign Type</TableCell>
                  <TableCell>Ad Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Client ID</TableCell>
                  <TableCell>Tags</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? fetchedData.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : fetchedData
                ).map((row: AdContent, index: any) => (
                  <TableRow
                    key={index}
                    onClick={() => handleRowClick(row)}
                    sx={{ cursor: 'pointer' }}>
                    <TableCell
                      component='th'
                      scope='row'>
                      {row.campaignName}
                    </TableCell>
                    <TableCell align='left'>{row.campaignType}</TableCell>
                    <TableCell align='left'>{row.adName}</TableCell>
                    <TableCell
                      align='left'
                      style={{
                        color:
                          row.status === 'unverified'
                            ? 'orange'
                            : row.status === 'paused'
                            ? 'red'
                            : 'green',
                      }}>
                      {row.status}
                    </TableCell>
                    <TableCell align='left'>{row.clientId}</TableCell>
                    <TableCell align='left'>
                      {row.tags.map((singleTag: string, index: number) => (
                        <span
                          key={index}
                          style={{
                            border: '1px solid black',
                            borderRadius: '4px',
                            padding: '4px',
                          }}>
                          {singleTag}
                        </span>
                      ))}
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
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: 'All', value: -1 },
                    ]}
                    colSpan={3}
                    count={fetchedData.length}
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

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}>
          <DialogTitle>Client Info</DialogTitle>
          <DialogContent>
            {selectedRowData && (
              <div>
                <p>Campagin Name: {selectedRowData.campaignName}</p>
                <p>Capaign Type: {selectedRowData.campaignType}</p>
                <p>Ad Content: {selectedRowData.adContent}</p>
                <p>Ad Name: {selectedRowData.adName}</p>
                <p>Client Id: {selectedRowData.clientId}</p>
                <p>Start Date: {selectedRowData.startDate}</p>
                <p>End Date: {selectedRowData.endDate}</p>
                <p>
                  Tags:{' '}
                  {selectedRowData.tags.map((tag, index) => (
                    <span
                      key={index}
                      style={{
                        border: '1px solid black',
                        borderRadius: '4px',
                        padding: '4px',
                        marginLeft: '8px',
                      }}>
                      {tag}
                    </span>
                  ))}
                </p>
                {/* <p>
                Users:{' '}
                {selectedRowData.users.map((tag, index) => (
                  <span
                    key={index}
                    style={{
                      border: '1px solid black' ,
                      borderRadius: '4px',
                      padding: '4px', 
                      marginLeft:"8px"
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </p> */}
                <p>Assigned Users: {selectedRowData.assignedUsers}</p>
                <p>Bid Amount: {selectedRowData.bidAmount}</p>
                <p>Per Day Spending: {selectedRowData.perDay}</p>
                <p>Type: {selectedRowData.type}</p>
                <p>
                  Status:{' '}
                  <span
                    style={{
                      color:
                        selectedRowData.status === 'unverified'
                          ? 'orange'
                          : selectedRowData.status === 'paused'
                          ? 'red'
                          : 'green',
                    }}>
                    {selectedRowData.status}
                  </span>
                </p>
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              variant='contained'
              style={{
                backgroundColor:
                  selectedRowData?.status === 'unverified'
                    ? 'green'
                    : selectedRowData?.status === 'paused'
                    ? 'green'
                    : 'red',
                color: 'white',
              }}
              onClick={() => {
                if (
                  selectedRowData?.status === 'unverified' ||
                  selectedRowData?.status === 'paused'
                ) {
                  handleVerify(selectedRowData?._id);
                } else {
                  handlePause(selectedRowData?._id);
                }
              }}
              disabled={selectedRowData?.status === 'inactive'}>
              {selectedRowData?.status == 'unverified'
                ? 'Verify'
                : selectedRowData?.status == 'paused'
                ? 'Start'
                : 'Pause'}
            </Button>
            <Button
              onClick={handleCloseDialog}
              color='primary'>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
