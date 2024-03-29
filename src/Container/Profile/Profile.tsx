/** @format */

// importing required files and packages here.
import { Box } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import user from '../../assets/userIcon.png';
import Grid from '@mui/material/Grid';
import './profilep.css';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { MyContext } from '../../components/context/Context';
import axios from 'axios';
import { async } from '@firebase/util';
import { Navigate, useNavigate } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';
import Drawer from '../../components/sidebar/Drawer';

export default function Profile() {
  // defining states here.
  const [openImageToast, setOpenImageToast] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [files, setFiles] = useState(user);
  const [image, setImage] = useState('');

  // using context here.
  const {
    _id,
    companyAddress1,
    setCompanyAddress1,
    companyAddress2,
    setCompanyAddress2,
    companyName,
    setCompanyName,
    companyType,
    setCompanyType,
    companyEmail,
    setCompanyEmail,
    walletAddress,
    setWalletAddress,
    token,
    _imageUrl,
    setImageUrl,
    setClientId,
    clientId,
    companyImage,
    setCompanyImage,
  } = useContext(MyContext);

  // function to connect to polygon mainnet here.
  const connectToPolygonMainnet = async () => {
    if ((window as any).ethereum) {
      const chainId = await (window as any).ethereum.request({
        method: 'eth_chainId',
      });

      // Check if connected to a different network (not Polygon mainnet)
      if (chainId !== '0x89') {
        // ChainId of Polygon mainnet is '0x89'
        try {
          await (window as any).ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x89' }],
          });
        } catch (error) {
          // Handle error
          console.log('Error while switching to Polygon mainnet:', error);
        }
      }
    } else {
      // Handle case where window.ethereum is not available (e.g., Metamask is not installed)
      console.log('Metamask not available');
    }
  };

  const checkMetamaskConnection = () => {
    if (!(window as any).ethereum?.selectedAddress) {
      // Metamask wallet disconnected, redirect to root route
      navigate('/');
    }
  };

  const handleWalletDisconnect = () => {
    if (!(window as any).ethereum?.selectedAddress) {
      // Metamask wallet disconnected
      navigate('/');
    }
  };

  useEffect(() => {
    // Listen for changes in the selected address property
    if ((window as any).ethereum) {
      (window as any).ethereum.on('accountsChanged', handleWalletDisconnect);
    }
  }, [(window as any).ethereum]);
  // function to handle file change here.
  const handleFileChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setOpenImageToast(true);
    const file = event.target.files![0];
    // Read the file as a buffer
    setFiles(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = async () => {
      // Create a new Blob object from the buffer
      const blob = new Blob([new Uint8Array(reader.result as ArrayBuffer)]);

      // Create a new FormData object and append the blob to it
      const formData = new FormData();
      formData.append('image', file);

      // Send the image to the backend using Axios
      const id = localStorage.getItem('clientId');
      console.log('id', id);
      await axios
        .patch(
          `https://client-backend-402017.el.r.appspot.com/users/image/${id}`,
          formData
        )
        .then((response) => {
          console.log('image called');
          console.log(response.data.imageUrl);
          const _imageUrl = response.data.imageUrl;
          setImageUrl(_imageUrl);
          setImage(response.data.imageUrl);
          localStorage.setItem('imageUrl', response.data.imageUrl);
          console.log(image);
        })
        .catch((error) => {
          console.log('image error');
          console.error(error);
        });
    };
  };

  // function to change the edit mode here
  const handleEdit = () => {
    setEdit(!edit);
  };

  // function to save the data of profile edited here
  const handleSave = async () => {
    setEdit(!edit);
    setOpenToast(true);
    const id = localStorage.getItem('clientId');
    console.log('id', id);
    await axios
      .patch(`https://client-backend-402017.el.r.appspot.com/users/${id}`, {
        companyName,
        companyType,
        companyEmail,
        companyAddress1,
        companyAddress2,
        walletAddress,
      })
      .then((response) => {
        console.log('Data has been sent to the server');
        console.log(response);
      })
      .catch((error) => {
        console.log('error in sending data to server', error);
      });
  };

  // function to fetch the image here.
  const fetchImage = async () => {
    const imageUrl = _imageUrl || localStorage.getItem('imageUrl');

    try {
      const response = await axios.get(imageUrl, {
        responseType: 'blob',
      });

      const imageUrlObject = URL.createObjectURL(response.data);
      setImage(imageUrlObject);
    } catch (error) {
      console.error(error);
    }
  };

  //  use effect to fetch the data from the server here.
  useEffect(() => {
    const id = localStorage.getItem('clientId');
    const _token = localStorage.getItem('tokenForClient');
    if (!_token) {
      navigate('/');
    }
    console.log('the details', clientId, token);
    axios
      .get(`https://client-backend-402017.el.r.appspot.com/users/data/${id}`)
      .then((response) => {
        console.log(response.data);
        const data = response.data;
        setCompanyName(data.companyName);
        setCompanyType(data.companyType);
        setCompanyEmail(data.companyEmail);
        setCompanyAddress1(data.companyAddress1);
        setCompanyAddress2(data.companyAddress2);
        setWalletAddress(data.walletAddress);
        setClientId(data._id);
        setCompanyImage(data.profileImage);
      })
      .catch((error) => {
        console.log(error);
      });
    connectToPolygonMainnet();
    checkMetamaskConnection();
  }, []);

  const handleToastClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenToast(false);
    setOpenImageToast(false);
  };
  return (
    <div>
      <div className='smopen'>{Drawer(1)}</div>
      <>{Sidebar(1)}</>
      <div className='outerlayer'>
        <div className='Profile'>
          <Box>
            <div className='profileTitle'>Profile</div>
            {!edit && (
              <Box className='profileBox'>
                <Grid
                  container
                  spacing={1}>
                  <Grid
                    item
                    xs={12}
                    sm={3}>
                    <div className='profileImage'>
                      {companyImage ? (
                        <img
                          src={companyImage}
                          alt='user'
                          className='img'
                          id='profilePicture'
                        />
                      ) : (
                        <img
                          src={files}
                          alt='user'
                          className='img'
                          id='profilePicture'
                        />
                      )}
                    </div>
                  </Grid>

                  <div className='profileEntries'>
                    <div className='profileEntriesData'>Company Name</div>
                    <div className='profileEntriesData'>Company Type</div>
                    <div className='profileEntriesData'>Company Email</div>
                    <div className='profileEntriesData'>Company Address 1</div>
                    <div className='profileEntriesData'>Company Address 2</div>
                    <div className='profileEntriesData'>Wallet Address</div>
                  </div>

                  <div className='semiColon'>
                    <div className='secol'>:</div>
                    <div className='secol'>:</div>
                    <div className='secol'>:</div>
                    <div className='secol'>:</div>
                    <div className='secol'>:</div>
                    <div className='secol'>:</div>
                  </div>

                  <div className='profileDetailsEdit'>
                    <div className='profileDetailsData'>{companyName}</div>
                    <div className='profileDetailsData'>{companyType}</div>
                    <div className='profileDetailsData'>{companyEmail}</div>
                    <div className='profileDetailsData'>
                      {companyAddress1.length > 30
                        ? companyAddress1.slice(0, 25) + '...'
                        : companyAddress1}
                    </div>
                    <div className='profileDetailsData'>{companyAddress2}</div>
                    <div className='profileDetailsData'>
                      {walletAddress.slice(0, 10)}...{walletAddress.slice(27)}
                    </div>
                  </div>
                </Grid>
                <button
                  className='editButton'
                  onClick={() => handleEdit()}>
                  Edit
                </button>
              </Box>
            )}
            {edit && (
              <Box className='profileBox'>
                <Grid
                  container
                  spacing={1}>
                  <Grid
                    item
                    xs={12}
                    sm={3}>
                    <div className='profileImage'>
                      {image ? (
                        <img
                          src={image}
                          alt='Stored'
                          className='imgInEditMode'
                        />
                      ) : (
                        <img
                          src={files}
                          alt='user'
                          className='imgInEditMode'
                        />
                      )}
                      <div className='editIMG'>
                        <label
                          className='editIcon'
                          htmlFor='files'>
                          <CreateOutlinedIcon />
                        </label>
                        <input
                          type='file'
                          className='hidden'
                          id='files'
                          onChange={handleFileChange2}
                        />
                      </div>
                    </div>
                  </Grid>

                  <div className='profileEntries'>
                    <div className='profileEntriesData'>Company Name </div>
                    <div className='profileEntriesData'>Company Type </div>
                    <div className='profileEntriesData'>Company Email </div>
                    <div className='profileEntriesData'>Company Address 1 </div>
                    <div className='profileEntriesData'>Company Address 2 </div>
                    <div className='profileEntriesData'>Wallet Address </div>
                  </div>

                  <div className='semiColon'>
                    <div className='secol'>:</div>
                    <div className='secol'>:</div>
                    <div className='secol'>:</div>
                    <div className='secol'>:</div>
                    <div className='secol'>:</div>
                    <div className='secol'>:</div>
                  </div>

                  <div className='profileDetailsEdit1'>
                    <input
                      className='profileDetailsDataEdit1'
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                    <input
                      className='profileDetailsDataEdit1'
                      value={companyType}
                      onChange={(e) => setCompanyType(e.target.value)}
                    />
                    <div className='profileDetailsDataEditState'>
                      {companyEmail}
                    </div>
                    <input
                      className='profileDetailsDataEdit2'
                      value={companyAddress1}
                      onChange={(e) => setCompanyAddress1(e.target.value)}
                    />
                    <input
                      className='profileDetailsDataEdit2'
                      value={companyAddress2}
                      onChange={(e) => setCompanyAddress2(e.target.value)}
                    />
                    <div className='profileDetailsDataEditState'>
                      {walletAddress.slice(0, 10)}...{walletAddress.slice(27)}
                    </div>
                  </div>
                </Grid>
                <button
                  className='editButton'
                  onClick={() => handleSave()}>
                  Save
                </button>
              </Box>
            )}
          </Box>
          {edit && (
            <div className='disclaimerProfilePage'>
              **You cannot edit Email ID and Wallet Address**
            </div>
          )}
        </div>
        {openToast && (
          <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            open={openToast}
            autoHideDuration={6000}
            onClose={() => {
              setOpenToast(false);
            }}>
            <Alert
              onClose={handleToastClose}
              severity='success'
              sx={{ width: '20vw', height: '5vh' }}>
              Profile Details edited succesfully
            </Alert>
          </Snackbar>
        )}
        {openImageToast && (
          <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            open={openImageToast}
            autoHideDuration={6000}
            onClose={() => {
              setOpenImageToast(false);
            }}>
            <Alert
              onClose={handleToastClose}
              severity='info'
              sx={{ width: '20vw', height: '5vh' }}>
              Image Edited Succesfully
            </Alert>
          </Snackbar>
        )}
      </div>
    </div>
  );
}
