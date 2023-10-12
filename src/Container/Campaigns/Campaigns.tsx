/** @format */

//  importing all dependencies and required components
import { Box } from '@mui/system';
import Sidebar from '../../components/sidebar/Sidebar';
import './campaigns.css';
import Divider from '@mui/material/Divider';
import {
  Backdrop,
  Button,
  CircularProgress,
  FormControlLabel,
  Modal,
  Switch,
  TextField,
} from '@mui/material';
import { Alert, Snackbar } from '@mui/material';
import { SubmitHandler, set, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import React from 'react';
import axios from 'axios';
import { MyContext } from '../../components/context/Context';
import Drawer from '../../components/sidebar/Drawer';
import { useNavigate } from 'react-router-dom';

//  defining types of ads
const typesofads: any[] = [
  { value: 'Image', label: 'Image' },
  { value: 'Video', label: 'Video' },
];
export default function Campaigns() {
  const navigate = useNavigate();
  //  defining states
  const [campaignName, setCampaignName] = useState<string>('');
  const [adImage, setAdImage] = useState<any>('');
  const [campaignType, setCampaignType] = useState<string>('Awareness');
  const [adName, setAdName] = useState<string>('');
  const [adType, setAdType] = useState<string>('Image');
  const [adFile, setAdFile] = useState<string | Blob>('');
  // const [adVideo, setAdVideo] = useState<string>("");
  const [adContent, setAdContent] = useState<string>('');
  const [adLink, setAdLink] = useState<string>('');
  const [adTags, setAdTags] = useState<any>([]);
  const [adLocation, setAdLocation] = useState<string>('');
  const [adStartDate, setAdStartDate] = useState('');
  const [adEndDate, setAdEndDate] = useState('');
  const [dateError, setDateError] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [immediateAdId, setImmediateAdId] = useState<any>();
  const { _id, token, clientId, setClientId } = React.useContext(MyContext);
  const [tagsExist, setTagsExist] = useState(false);
  const [allAdsDetails, setAllAdsDetails] = useState<any>([]);
  const [particularAdsDetails, setParticularAdsDetails] = useState<any>();
  const [edit, setEdit] = useState(false);
  const [editAd, setEditAd] = useState(false);
  const [editAdDetails, setEditAdDetails] = useState<any>([]);
  // const [bidAmount, setBidAmount] = useState<any>();
  const [perDayBudget, setPerDayBudget] = useState<any>();
  const [totalDaysToRun, setTotalDaysToRun] = useState<any>();
  const [adSelectedId, setAdSelectedId] = useState<any>();
  const [editedAdData, setEditedAdData] = useState<any>();
  const [files, setFiles] = useState<any>();
  const [imageUrl, setImageUrl] = useState<any>();
  const [image, setImage] = useState<any>();
  const [particularBidDetails, setParticularBidDetails] = useState<any>();
  const [editedAdToaster, setEditedAdToaster] = useState(false);
  const [createdAdToaster, setCreatedAdToaster] = useState(false);
  const [deletedAdToaster, setDeletedAdToaster] = useState(false);
  const [editBidModal, setEditBidModal] = useState(false);
  const [newBidAmount, setNewBidAmount] = useState('');
  const [newPerDayAmount, setNewPerDayAmount] = useState('');
  const [newTotalDays, setNewTotalDays] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [bidAmountError, setBidAmountError] = useState('');
  const [fileUploadedInBackend, setFileUploadedInBackend] = useState(false);
  const [loaderCampaignsPage, setLoaderCampaignsPage] = useState(false);

  //  function to handle toast close
  const handleToastClose = () => {
    setEditedAdToaster(false);
    setCreatedAdToaster(false);
    setDeletedAdToaster(false);
  };

  //  option types for campaign type
  const optionsType: any[] = [
    {
      value: 'Awareness',
      label: 'Awareness',
    },
    {
      value: 'Engagement',
      label: 'Engagement',
    },
    {
      value: 'Traffic',
      label: 'Traffic',
    },
    {
      value: 'Sales',
      label: 'Sales',
    },
  ];

  //  style for the bigger modal
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 650,
    height: 550,
    bgcolor: 'white',
    boxShadow: 24,
    border: '0',
    p: 2,
    pb: 1,
    pt: 3,
    borderRadius: '1.1vh',
    overflow: 'hidden',
  };

  // style for the smaller modal
  const style2 = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 250,
    bgcolor: 'white',
    boxShadow: 24,
    border: '0',
    p: 3,
    borderRadius: '1.1vh',
    overflow: 'hidden',
  };

  //  useform compoenent
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    setNextpage(true);
    console.log(data);
  };
  const [formopen, setFormopen] = useState(false);
  const [nextpage, setNextpage] = useState(false);

  // function to handle the start date change
  const handleStartDateChange = (event: any) => {
    const startDate = event.target.value;
    setAdStartDate(startDate);

    const currentDate = new Date().toISOString().slice(0, 10);
    if (startDate < currentDate) {
      setAdStartDate('');
      setAdEndDate('');
      setDateError('Start Date should be greater than the current date');
    } else {
      setDateError('');
    }
  };

  //  function to handle the end date change
  const handleEndDateChange = (event: any) => {
    const endDate = event.target.value;
    setAdEndDate(endDate);

    if (endDate <= adStartDate) {
      setAdEndDate('');
      setDateError('End Date should be greater than the Start Date');
    } else {
      setDateError('');
    }
  };

  // // function to create a new Ad
  // async function submitAdCampaign() {
  //   console.log(
  //     adStartDate,
  //     adEndDate,
  //     campaignName,
  //     campaignType,
  //     adName,
  //     adContent,
  //     adLink,
  //     adTags,
  //     adLocation
  //   );

  //   // if (
  //   //   adStartDate === "" ||
  //   //   adEndDate === "" ||
  //   //   campaignName === "" ||
  //   //   campaignType === "" ||
  //   //   adName === "" ||
  //   //   adContent === "" ||
  //   //   adLink === "" ||
  //   //   adTags.length === 0 ||
  //   //   adLocation === ""
  //   // ) {
  //   //   alert("Please fill all the fields");
  //   //   return;
  //   // }
  //   if (bidAmountError !== "" && dateError !== "") {
  //     alert("Error in Bid Amount or Date");
  //     return;
  //   }
  //   const id = clientId || localStorage.getItem("id");
  //   console.log("idCampaignPage", id);
  //   setFormopen(false);
  //   setLoaderCampaignsPage(true);
  //   await axios
  //     .post("http://localhost:8000/ads/createAd", {
  //       clientId: id,
  //       campaignName: campaignName,
  //       campaignType: campaignType,
  //       adName: adName,
  //       adType: adType,
  //       startDate: adStartDate,
  //       endDate: adEndDate,
  //       adUrl: adLink,
  //       adContent: adContent,
  //       tags: adTags,
  //     })
  //     .then(async (res) => {
  //       console.log("Posted Ad Details", res.data);
  //       // console.log("Immediate Ad Id", res.data.data._id);

  //       // await axios.post("http://localhost:8000/bids", {
  //       //   adId: res.data.data._id,
  //       //   bidAmount: Number(bidAmount),
  //       //   perDay: Number(perDayBudget),
  //       //   totalDays: Number(totalDaysToRun),
  //       // });
  //       getAllCampaigns();
  //       setLoaderCampaignsPage(false);
  //       setCreatedAdToaster(true);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   setFormopen(false);
  // }

  // Function to create a new Ad
  async function submitAdCampaign() {
    console.log(
      adStartDate,
      adEndDate,
      campaignName,
      campaignType,
      adName,
      adContent,
      adLink,
      adTags,
      adLocation
    );

    // Validate your form data here if needed

    if (bidAmountError !== '' && dateError !== '') {
      alert('Error in Bid Amount or Date');
      return;
    }

    const id = clientId || localStorage.getItem('id');
    console.log('idCampaignPage', id);

    setFormopen(false);
    setLoaderCampaignsPage(true);

    // Create a FormData object and append your data
    const formData = new FormData();
    formData.append('clientId', id);
    formData.append('campaignName', campaignName);
    formData.append('campaignType', campaignType);
    formData.append('adName', adName);
    formData.append('adType', adType);
    formData.append('startDate', adStartDate);
    formData.append('endDate', adEndDate);
    formData.append('adUrl', adLink);
    formData.append('adContent', adContent);
    formData.append('tags', JSON.stringify(adTags));
    formData.append('image', adImage); // Append the image file

    try {
      const response = await axios.post(
        'http://localhost:8000/ads/test/createAd',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
          },
        }
      );

      console.log('Posted Ad Details', response.data);
      getAllCampaigns();
      setLoaderCampaignsPage(false);
      setCreatedAdToaster(true);
    } catch (error) {
      console.log(error);
    }

    setFormopen(false);
  }

  const removeTag = (indexToRemove: number) => {
    setAdTags(adTags.filter((_: any, index: any) => index !== indexToRemove));
  };

  // function to get all campaigns of a particular client
  async function getAllCampaigns() {
    const id = localStorage.getItem('clientId');
    console.log('id', id);
    await axios
      .get(`http://localhost:8000/ads/clientAllAds/${id}`, {
        headers: {
          id: id,
        },
      })
      // ""
      .then((res) => {
        console.log('All Ads Details', res.data);
        setAllAdsDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // function to get particular campaign details
  async function getParticularCampaign(
    id: any,
    e: React.MouseEvent<HTMLDivElement>
  ) {
    e.stopPropagation();
    // const idOfCilent = localStorage.getItem("clientId");
    const detail = allAdsDetails[id];
    setParticularAdsDetails(detail);

    setEditedAdData(detail);
    setAdSelectedId(detail._id);
    setEdit(true);
    setEditAd(true);
    // await axios
    //   .get(`http://localhost:8000/ads/${id}`)
    //   .then(async (res) => {
    //     console.log("Particular Ad Details", res.data);
    //     await axios
    //       .get(`http://localhost:8000/bids/${idOfCilent}`)
    //       .then((res) => {
    //         console.log("Particular Bid Details", res.data);
    //         // setParticularBidDetails(res.data);
    //         const sortedBidDetails = res.data.sort(
    //           (a: any, b: any) => b.bidAmount - a.bidAmount
    //         );
    //         setParticularBidDetails(sortedBidDetails);
    //       });
    //     setParticularAdsDetails(res.data);
    //     setEditedAdData(res.data);
    //     setAdSelectedId(id);
    //     setEdit(true);
    //     setEditAd(true);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  //  function to update a particular ad
  async function updateParticularAd(id: any) {
    if (editedAdData.adName === '' || editedAdData.adContent === '') {
      alert('Please fill all the fields');
      return;
    }
    await axios
      .patch(`http://localhost:8000/ads/${id}`, {
        adName: editedAdData.adName,
        adContent: editedAdData.adContent,
      })
      .then((res) => {
        console.log('Updated Ad Details', res.data);
        setEdit(false);
        setEditAd(false);
        setEditedAdToaster(true);
        getAllCampaigns();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // function to handle bid amount

  const handleBidAmount = (event: any) => {
    const amount = event.target.value;
    setBidAmount(amount);

    if (amount < 1 || amount > 100) {
      setBidAmountError('**Bid Amount should be between 1 and 100');
    } else {
      setBidAmountError('');
    }
  };

  const handleNewBidAmount = (event: any) => {
    const amount = event.target.value;
    setNewBidAmount(amount);

    if (amount < 1 || amount > 100) {
      setBidAmountError('**Bid Amount should be between 1 and 100');
    } else {
      setBidAmountError(' ');
    }
  };

  const checkMetamaskConnection = () => {
    if (!(window as any).ethereum?.selectedAddress) {
      // Metamask wallet disconnected, redirect to root route
      navigate('/');
    }
  };

  // useeffect to set the edited ad data
  useEffect(() => {
    checkMetamaskConnection();
    const tempId = localStorage.getItem('clientId');
    if (tempId) {
      setClientId(tempId);
    }
    console.log('cliendId campaigns page', clientId);
    setEditedAdData(particularAdsDetails);
  }, [particularAdsDetails]);

  useEffect(() => {
    getAllCampaigns();
  }, []);

  // function to delete a particular Ad
  async function deleteParticularAd(id: any) {
    await axios
      .delete(`http://localhost:8000/ads/${id}`)
      .then((res) => {
        // console.log("Deleted Ad Details", res.data);
        // window.location.reload();
        setEdit(false);
        setDeletedAdToaster(true);
        getAllCampaigns();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // update bid amount
  async function handleUpdateBidAmount() {
    const id = clientId || localStorage.getItem('clientId');
    if (
      newBidAmount === '' ||
      newPerDayAmount === '' ||
      newTotalDays === '' ||
      bidAmountError !== ' '
    ) {
      alert('Please fill all the fields');
      return;
    }
    console.log(particularAdsDetails._id);
    await axios
      .patch(`http://localhost:8000/bids/${particularAdsDetails._id}`, {
        bidAmount: Number(newBidAmount),
        perDay: Number(newPerDayAmount),
        totalDays: Number(newTotalDays),
      })
      .then((res) => {
        console.log('Updated Bid Details', res.data);
        setEditBidModal(false);
        setNewBidAmount('');
        setNewPerDayAmount('');
        setNewTotalDays('');
        getAllCampaigns();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // use effect to logout the user if wallet is disconnected

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

  // upload image in campaign
  const handleFileChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('image called');
    event.preventDefault();

    const file = event.target.files![0];
    // Read the file as a buffer
    setFiles(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      // Create a new Blob object from the buffer
      const blob = new Blob([new Uint8Array(reader.result as ArrayBuffer)]);

      // Create a new FormData object and append the blob to it
      const formData = new FormData();
      formData.append('image', file);

      // Send the image to the backend using Axios
      axios
        .post('http://localhost:8000/picture/uploadPicture', formData)
        .then((response) => {
          console.log('image called');
          console.log(response.data);
          setFileUploadedInBackend(true);
        })
        .catch((error) => {
          console.log('image error');
          console.error(error);
        });
    };
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const file = event.target.files![0];
    // Read the file as a buffer
    const formdata = new FormData();
    formdata.append('video', file);
    axios
      .post('http://localhost:8000/video/uploadProfileVideo', formdata)
      .then((response) => {
        console.log('video called');
        console.log(response.data);
        setFileUploadedInBackend(true);
      })
      .catch((error) => {
        console.log('video up error');
        console.error(error);
      });
  };

  return (
    <>
      <>{Sidebar(4)}</>
      <div className='smopen'>{Drawer(4)}</div>
      <div className='outbox'>
        <div className='campaignsBox'>
          <div className='campaignsGreyBox'>
            <div className='campaignsHeader'>
              <div className='campaignsHeaderTitleMain'>Create Campaign</div>
              <button
                className='campaignsHeaderButton'
                onClick={() => {
                  setFormopen(true);
                  setNextpage(false);
                }}>
                Create
              </button>
            </div>
            <Backdrop
              open={formopen}
              className='backdrop'
              sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
              <div className='campaignsForm'>
                <div className='campaignsFormHeader'>
                  <div className='campaignsHeaderTitle'>Create Campaign</div>
                  <button
                    className='closeButtoncampaignsPage'
                    onClick={() => {
                      // upon clicking X , the whole form will be closed and every variable will go back to default state
                      setFormopen(false);
                      setAdContent('');
                      setAdEndDate('');
                      setAdLink('');
                      setAdLocation('');
                      setAdName('');
                      setAdStartDate('');
                      setAdTags([]);
                      setAdType('Image');
                      setBidAmount('');
                      setCampaignName('');
                      setCampaignType('Awareness');
                      setEdit(false);
                      setEditAd(false);
                      setNextpage(false);
                      setPerDayBudget('');
                      setTotalDaysToRun('');
                      setTagsExist(false);
                      setFileUploadedInBackend(false);
                    }}>
                    X
                  </button>{' '}
                </div>
                <Divider />
                {!nextpage && (
                  <div className='campaignsFormBody'>
                    <TextField
                      id='standard-basic'
                      label='Campaign Name'
                      variant='standard'
                      sx={{ left: '2vw', width: '90%' }}
                      {...register('campaignName')}
                      onChange={(e) => setCampaignName(e.target.value)}
                      required
                    />
                    <TextField
                      id='standard-basic'
                      label='Campaign Type'
                      select
                      SelectProps={{
                        native: true,
                      }}
                      helperText='Please select the Tags'
                      variant='standard'
                      sx={{ left: '2vw', width: '90%', marginTop: '1.5vh' }}
                      {...register('Campaign Type')}
                      onChange={(e) => setCampaignType(e.target.value)}
                      required
                      onClick={() => console.log(campaignType)}>
                      {optionsType.map((option) => (
                        <option
                          key={option.label}
                          value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                    <TextField
                      id='standard-basic'
                      label='Ad Name'
                      variant='standard'
                      sx={{ left: '2vw', width: '90%', marginTop: '1.5vh' }}
                      {...register('Ad Name')}
                      onChange={(e) => setAdName(e.target.value)}
                      required
                    />
                    <TextField
                      sx={{ left: '2vw', width: '90%', marginTop: '1.5vh' }}
                      select
                      label='Ad Type'
                      defaultValue={false}
                      {...register('Ad Type')}
                      SelectProps={{
                        native: true,
                      }}
                      helperText='Please select the ad type'
                      variant='standard'
                      onChange={(e) => {
                        setAdType(e.target.value);
                      }}>
                      {typesofads.map((option) => (
                        <option
                          key={option.value}
                          value={option.value}>
                          {option.value}
                        </option>
                      ))}
                    </TextField>
                    {!fileUploadedInBackend && (
                      <div className='addImage'>
                        <label
                          style={{
                            cursor: 'pointer',
                          }}
                          htmlFor='files'>
                          Add {adType === 'Image' ? 'Image' : 'Video'}
                        </label>
                        <input
                          // accept type image if adType is image else accept video
                          type='file'
                          className='hidden'
                          alt='imageUpload'
                          id='files'
                          accept={adType === 'Image' ? 'image/*' : 'video/*'}
                          onChange={(e: any) => setAdImage(e.target.files![0])}
                        />
                      </div>
                    )}
                    {fileUploadedInBackend && (
                      <div
                        style={{
                          color: 'green',
                        }}>
                        ✔ {adType === 'Image' ? 'Image' : 'Video'} Uploaded
                        Successfully
                      </div>
                    )}
                    <TextField
                      id='standard-basic'
                      label='Ad Website'
                      variant='standard'
                      sx={{ left: '2vw', width: '90%' }}
                      {...register('Ad WEBSITE')}
                      onChange={(e) => setAdLink(e.target.value)}
                      required
                    />
                    <TextField
                      id='standard-basic'
                      label='Ad Description'
                      variant='standard'
                      sx={{ left: '2vw', width: '90%', marginTop: '1.5vh' }}
                      {...register('Ad Description')}
                      onChange={(e) => setAdContent(e.target.value)}
                      required
                    />
                  </div>
                )}
                {nextpage && (
                  <div className='campaignsFormBody'>
                    <div
                      className={`${
                        tagsExist ? 'tagsOuterDivv' : 'tagsOuterDivvSmall'
                      }`}>
                      <div
                        className={`${
                          tagsExist ? 'tagsBoxx' : 'tagsBoxVisibilityHidden'
                        }`}>
                        {adTags.map((tag: any, index: any) => (
                          <div
                            key={index}
                            className='tagAddedDiv'>
                            <span>{tag}</span>
                            <button onClick={() => removeTag(index)}>
                              &#10006;
                            </button>
                          </div>
                        ))}
                      </div>

                      <TextField
                        id='standard-basic'
                        label='Ad Tags'
                        variant='standard'
                        sx={{ left: '0', width: '90%', marginTop: '1.5vh' }}
                        value={inputValue}
                        {...register('Ad Tags')}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const tagText = inputValue.trim();
                            if (tagText) {
                              setAdTags([...adTags, tagText]);
                              setInputValue('');
                              setTagsExist(true);
                            }
                            e.preventDefault();
                          }
                          if (e.key === 'Backspace' && inputValue === '') {
                            setAdTags(adTags.slice(0, adTags.length - 1));
                          }
                        }}
                        required
                      />
                    </div>
                    <TextField
                      id='standard-basic'
                      label='Location (Will Implement In Future Release)'
                      variant='standard'
                      sx={{ left: '2vw', width: '90%', marginTop: '1.5vh' }}
                      {...register('location')}
                      required
                      onChange={(e) => setAdLocation(e.target.value)}
                    />
                    <TextField
                      id='start-date'
                      variant='standard'
                      label='Start Date'
                      placeholder='Start Date'
                      type='date'
                      sx={{ left: '2vw', width: '90%', marginTop: '1.5vh' }}
                      value={adStartDate}
                      onChange={handleStartDateChange}
                      required
                    />
                    <TextField
                      id='end-date'
                      label='End Date'
                      variant='standard'
                      type='date'
                      sx={{ left: '2vw', width: '90%', marginTop: '1.5vh' }}
                      value={adEndDate}
                      onChange={handleEndDateChange}
                      required
                    />
                    {dateError && <p style={{ color: 'red' }}>{dateError}</p>}
                    <Divider />

                    <TextField
                      id='standard-basic'
                      label='Bid Amount per user (DFT)'
                      variant='standard'
                      sx={{ left: '2vw', width: '90%', marginTop: '1.5vh' }}
                      value={bidAmount}
                      onChange={handleBidAmount}
                      required
                    />
                    {bidAmountError && (
                      <p
                        style={{
                          color: 'red',
                          fontWeight: '600',
                          fontSize: '100%',
                          padding: 0,
                          margin: 0,
                        }}>
                        {bidAmountError}
                      </p>
                    )}
                    {/* Rest of your code */}

                    <TextField
                      id='standard-basic'
                      label='Budget Amount Per Day (DFT)'
                      variant='standard'
                      sx={{ left: '2vw', width: '90%', marginTop: '1.5vh' }}
                      {...register('budgetAmountPerDay')}
                      onChange={(e) => setPerDayBudget(e.target.value)}
                      required
                    />
                    <TextField
                      id='standard-basic'
                      label='Total Days of Campaign'
                      variant='standard'
                      sx={{ left: '2vw', width: '90%', marginTop: '1.5vh' }}
                      {...register('totalDays')}
                      onChange={(e) => setTotalDaysToRun(e.target.value)}
                      required
                    />
                  </div>
                )}
                <Divider />
                {!nextpage && (
                  <button
                    className='nextCampaignButton'
                    type='submit'
                    onClick={() => setNextpage(true)}>
                    Next
                  </button>
                )}
                {nextpage && (
                  <button
                    className='nextCampaignButton'
                    type='submit'
                    onClick={() => submitAdCampaign()}>
                    Submit
                  </button>
                )}
              </div>
            </Backdrop>
            <div className='campaignsBody'>
              <div className='campaignsCategoriesBox'>
                <div className='campaignNameHeading'>Ad Name</div>
                <div className='bidStrategy'>Bid Amount</div>
                <div className='budgetDFT'>Budget / Day</div>
                <div className='editCampaignHeading'>View</div>
                <div className='typeHeading'>Type</div>
                <div className='reachHeading'>Users Assigned</div>
                <div className='startDateCampaign'>Start Date</div>
                <div className='endDateCampgin'>End Date</div>
              </div>

              {!loaderCampaignsPage && (
                <div className='campaignsDetails'>
                  {allAdsDetails &&
                    allAdsDetails.map((item: any, index: any) => (
                      <div
                        className='adDetails'
                        key={index}
                        onClick={() => navigate('/campaign-details')}>
                        <div className='campaignNameDetails'>{item.adName}</div>
                        <div className='bidStrategyDetails'>
                          {item.bidAmount} DFT
                        </div>
                        <div className='budgetDFTDetails'>
                          {item.perDay} DFT
                        </div>
                        <div
                          className='editCampaignDetails'
                          onClick={(e) => getParticularCampaign(index, e)}>
                          <VisibilityIcon />
                        </div>
                        <div className='typeDetails'>
                          {/* {item.campaignType ? item.campaignType : "N.A."} */}
                          {item.campaignType}
                        </div>
                        <div className='reachDetails'>
                          {item.assignedUsers ? item.assignedUsers : '5000'}
                        </div>
                        <div className='startDateCampaignDetails'>
                          {item.startDate.slice(0, 10)}
                        </div>
                        <div className='endDateCampginDetails'>
                          {item.endDate.slice(0, 10)}
                        </div>
                      </div>
                    ))}
                  {
                    // when all ads is empty show No DATA TO DISPLAY AT THE CENTER OF THE campaignDetails
                    allAdsDetails.length === 0 && (
                      <div className='noDataToDisplay'>
                        <p className='noDataToDisplayText'>
                          No Data to Display
                        </p>
                      </div>
                    )
                  }
                </div>
              )}
              {loaderCampaignsPage && (
                <div className='campaignsLoader'>
                  <p>Creating Campaign...</p>
                  <CircularProgress />
                </div>
              )}

              {particularAdsDetails && (
                <Modal
                  open={edit}
                  onClose={() => {
                    setEdit(false);
                  }}
                  aria-labelledby='modal-modal-title'
                  aria-describedby='modal-modal-description'>
                  <Box sx={style}>
                    <div className='modalHeaderCampaignsPage'>
                      <h1 className=' modalHeaderCampaignName '>
                        {particularAdsDetails.campaignName}
                      </h1>
                      <div
                        className='modalCloseButtonCampaignsPage'
                        onClick={() => setEdit(false)}>
                        X
                      </div>
                    </div>

                    {
                      // edit ad section
                      editAd && (
                        <div className='modalBodyCampaignsPage'>
                          <img
                            src={
                              editedAdData.image
                                ? editedAdData.image.replace(/ /g, '%20')
                                : 'https://aioseo.com/wp-content/uploads/2021/04/how-to-find-and-fix-404-errors-in-wordpress.png.webp'
                            }
                            alt='errormage'
                            width={200}
                            style={{ marginTop: '20px' }}
                          />
                          <input
                            className='modalBodyCampaignsPageHeadingEdit'
                            value={editedAdData.adName}
                            onChange={(e) =>
                              setEditedAdData({
                                ...editedAdData,
                                adName: e.target.value,
                              })
                            }
                          />

                          <textarea
                            // type="textCampaignsPage"
                            className='modalBodyCampaignsPageContentEdit'
                            value={editedAdData.adContent}
                            onChange={(e) =>
                              setEditedAdData({
                                ...editedAdData,
                                adContent: e.target.value,
                              })
                            }
                          />

                          <div className='modalBodyCampaignsPageBottomContent'>
                            {particularAdsDetails.tags.length > 0 ? (
                              // display total tags less than or equal to 10, else show ... after 10 tags
                              particularAdsDetails.tags
                                .slice(0, 10)
                                .map((tag: any, index: any) => (
                                  <>
                                    <div
                                      key={index}
                                      className='individualTag'>
                                      {tag}
                                    </div>
                                    <div>
                                      {index === 9 && <span>....</span>}
                                    </div>
                                  </>
                                ))
                            ) : (
                              <p className='notagsadded'>
                                <p>No Tags Added, so no data available</p>
                              </p>
                            )}
                          </div>
                          <div className='modalBodyCampaignsPageBottomDateSection'>
                            <div className='startDateCampaignsPage'>
                              <p className='startDateCampaignsPageTitle'>
                                Start Date:-{' '}
                              </p>
                              <p className='startDateCampaignsPageContent'>
                                {particularAdsDetails.startDate.slice(0, 10)}
                              </p>
                            </div>
                            <div className='endDateCampaignsPage'>
                              <p className='endDateCampaignsPageTitle'>
                                End Date:-{' '}
                              </p>
                              <p className='endDateCampaignsPageContent'>
                                {particularAdsDetails.endDate.slice(0, 10)}
                              </p>
                            </div>
                          </div>
                          <p className='infoMsgAds'>
                            **Campaign Name, Campaign Type, Tags and Dates
                            cannot be changed**
                          </p>
                          <Divider style={{ marginTop: '1.5%' }} />
                          <div className='bidModalHeadingDiv'>
                            <h4 className='bidsModalHeadingSno'>S.No</h4>
                            <h4 className='bidsModalHeadingClientNameHeading'>
                              Ad Id
                            </h4>
                            <h4 className='bidsModalHeadingOption'>
                              Bid Amount
                            </h4>
                            <h4 className='bidsModalHeadingOption'>
                              Users Reached
                            </h4>
                          </div>
                          <div className='bidModalDiv'>
                            {particularBidDetails &&
                              particularBidDetails.map(
                                (item: any, index: any) => (
                                  <div
                                    className={
                                      item.adId == particularAdsDetails._id
                                        ? 'bidModalArrayDivActive'
                                        : 'bidModalArrayDiv'
                                    }
                                    key={index}>
                                    <p className='bidsModalHeadingSno'>
                                      {index + 1}
                                    </p>
                                    <p className='bidsModalHeadingClientName'>
                                      {item.adId ? item.adId : 'NA'}
                                    </p>
                                    <p className='bidsModalHeadingOption'>
                                      {item.bidAmount ? item.bidAmount : 'NA'}
                                      {item.bidAmount ? ' DFT' : ''}
                                    </p>
                                    <p className='bidsModalHeadingOption'>NA</p>
                                  </div>
                                )
                              )}
                          </div>
                        </div>
                      )
                    }
                    {/* {editAd && (
                      <div className='modalFooterCampaignsPage'>
                        <button
                          className='modalFooterButtonDeleteCampaignsPage'
                          onClick={() =>
                            deleteParticularAd(particularAdsDetails._id)
                          }>
                          Delete this Ad
                        </button>
                        <button
                          className='modalFooterButtonEditCampaignsPage'
                          onClick={() => updateParticularAd(adSelectedId)}>
                          Save Edit
                        </button>
                        <button
                          className='modalFooterButtonBidsCampaignsPage'
                          onClick={() => {
                            setEdit(false);
                            setEditBidModal(true);
                          }}>
                          Edit Bid for this Ad
                        </button>
                      </div>
                    )} */}
                  </Box>
                </Modal>
              )}
            </div>
            {editBidModal && (
              <Modal
                open={editBidModal}
                onClose={() => setEditBidModal(false)}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'>
                <Box sx={style2}>
                  <div className='editBidModalDiv'>
                    <div className='editBidModalDivTop'>
                      <div className='editBidModalAdName'>
                        {particularAdsDetails.adName}
                      </div>
                    </div>
                    <Divider />
                    <div className='editBidModalDivEdit'>
                      <div className='editBidModalDivEditLeft'>
                        Current Bid Amount
                      </div>
                      <div className='editBidModalDivEditMiddle'>:</div>
                      <div className='editBidModalDivEditRight'>
                        {particularAdsDetails.bidAmount} DFT
                      </div>
                    </div>
                    <div className='editBidModalDivEdit'>
                      <div className='editBidModalDivEditLeft'>
                        New Bid Amount (per user)
                      </div>
                      <div className='editBidModalDivEditMiddle'>:</div>
                      <div className='editBidModalDivEditRight'>
                        <input
                          type='text'
                          className='editBidModalDivEditInput'
                          value={newBidAmount}
                          onChange={handleNewBidAmount}
                        />
                      </div>
                    </div>
                    {bidAmountError && (
                      <p
                        style={{
                          color: 'red',
                          fontWeight: '600',
                          fontSize: '100%',
                          padding: 0,
                          margin: 0,
                        }}>
                        {bidAmountError}
                      </p>
                    )}
                    <div className='editBidModalDivEdit'>
                      <div className='editBidModalDivEditLeft'>
                        New Per Day Budget
                      </div>
                      <div className='editBidModalDivEditMiddle'>:</div>
                      <div className='editBidModalDivEditRight'>
                        <input
                          type='text'
                          className='editBidModalDivEditInput'
                          value={newPerDayAmount}
                          onChange={(e) => setNewPerDayAmount(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className='editBidModalDivEdit'>
                      <div className='editBidModalDivEditLeft'>
                        New Total Days
                      </div>
                      <div className='editBidModalDivEditMiddle'>:</div>
                      <div className='editBidModalDivEditRight'>
                        <input
                          type='text'
                          className='editBidModalDivEditInput'
                          value={newTotalDays}
                          onChange={(e) => setNewTotalDays(e.target.value)}
                        />
                      </div>
                    </div>
                    <Divider style={{ marginTop: '6px' }} />
                    <div className='modalFooterCampaignsPage2'>
                      <button
                        className='modalFooterButtonDeleteCampaignsPage2'
                        onClick={() => setEditBidModal(false)}>
                        Cancel
                      </button>
                      <button
                        className={
                          newBidAmount === '' ||
                          newPerDayAmount === '' ||
                          newTotalDays === '' ||
                          bidAmountError !== ' '
                            ? 'modalFooterButtonEditCampaignsPage2Disabled'
                            : 'modalFooterButtonEditCampaignsPage2'
                        }
                        onClick={handleUpdateBidAmount}
                        title={
                          newBidAmount === '' ||
                          newPerDayAmount === '' ||
                          newTotalDays === '' ||
                          bidAmountError !== ' '
                            ? 'Fill Details to Enable'
                            : ''
                        }>
                        Update Bid
                      </button>
                    </div>
                  </div>
                </Box>
              </Modal>
            )}
          </div>
          {editedAdToaster && (
            <Snackbar
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              open={editedAdToaster}
              autoHideDuration={6000}
              onClose={() => {
                setEditedAdToaster(false);
              }}>
              <Alert
                onClose={handleToastClose}
                severity='info'
                sx={{ width: '20vw', height: '5vh', fontSize: '1rem' }}>
                Ad Edited
              </Alert>
            </Snackbar>
          )}
          {createdAdToaster && (
            <Snackbar
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              open={createdAdToaster}
              autoHideDuration={6000}
              onClose={() => {
                setCreatedAdToaster(false);
              }}>
              <Alert
                onClose={handleToastClose}
                severity='success'
                sx={{ width: '20vw', height: '5vh', fontSize: '1rem' }}>
                New Ad Created
              </Alert>
            </Snackbar>
          )}
          {deletedAdToaster && (
            <Snackbar
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              open={deletedAdToaster}
              autoHideDuration={6000}
              onClose={() => {
                setDeletedAdToaster(false);
              }}>
              <Alert
                onClose={handleToastClose}
                severity='error'
                sx={{ width: '20vw', height: '5vh', fontSize: '1rem' }}>
                Ad Deleted Successfully
              </Alert>
            </Snackbar>
          )}
        </div>
      </div>
    </>
  );
}
