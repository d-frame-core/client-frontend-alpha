/** @format */

// importing the packages
import { Box, Divider, Modal, TextField } from '@mui/material';
import { useContext, useState, useEffect } from 'react';
import { MyContext } from '../../components/context/Context';
import Sidebar from '../../components/sidebar/Sidebar';
import './wallet.css';
import { Alert, Snackbar } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CircularProgress from '@mui/material/CircularProgress';
import Web3 from 'web3';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
export default function Wallet() {
  //  useform compoenent
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  //  importing from context api
  const {
    walletAddress,
    walletBalance,
    setWalletBalance,
    clientId,
    setClientId,
    companyName,
    companyEmail,
  } = useContext(MyContext);
  const _walletAddress = walletAddress || localStorage.getItem('walletAddress');

  //  defining state variables
  const [transactionUnderProgress, setTransactionUnderProgress] =
    useState(false);
  const [senderAddress, setSenderAddress] = useState('');
  const [dftAmount, setDftAmount] = useState('');
  const [transactionEvents, setTransactionEvents] = useState<any>([]);
  const [dftCA, setdftCA] = useState<any>('');
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [buyDFTModal, setBuyDFTModal] = useState(false);
  const [amountToBuy, setAmountToBuy] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const [contentCopiedSuccesfully, setContentCopiedSuccesfully] =
    useState(false);

  //  function to copy the wallet address
  const copyContent = async (text: any) => {
    try {
      await navigator.clipboard.writeText(text);

      setContentCopiedSuccesfully(true);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  //  function to handle the close of the snackbar
  const handleSend = async () => {
    if (dftAmount === '' || senderAddress === '') {
      alert('Please enter the required fields');
      return;
    }
    setTransactionUnderProgress(true);
    const web3 = new Web3((window as any).ethereum);

    // set the wallet address to query
    const _walletAddress =
      walletAddress || localStorage.getItem('walletAddress');
    // set the contract address of the DFRAME token
    const dframeAddress = '0x0B6163c61D095b023EC3b52Cc77a9099f6231FCC';

    // set the ABI for the DFRAME token contract
    const dframeABI = [
      { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'Approval',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'previousOwner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnershipTransferred',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'Snapshot',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'Transfer',
        type: 'event',
      },
      {
        inputs: [
          { internalType: 'address', name: 'owner', type: 'address' },
          { internalType: 'address', name: 'spender', type: 'address' },
        ],
        name: 'allowance',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'spender', type: 'address' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
        ],
        name: 'approve',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'account', type: 'address' },
          { internalType: 'uint256', name: 'snapshotId', type: 'uint256' },
        ],
        name: 'balanceOfAt',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
        name: 'burn',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'account', type: 'address' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
        ],
        name: 'burnFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'decimals',
        outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'spender', type: 'address' },
          {
            internalType: 'uint256',
            name: 'subtractedValue',
            type: 'uint256',
          },
        ],
        name: 'decreaseAllowance',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'spender', type: 'address' },
          { internalType: 'uint256', name: 'addedValue', type: 'uint256' },
        ],
        name: 'increaseAllowance',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'name',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'owner',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'snapshot',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'symbol',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'totalSupply',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'uint256', name: 'snapshotId', type: 'uint256' },
        ],
        name: 'totalSupplyAt',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
        ],
        name: 'transfer',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'from', type: 'address' },
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
        ],
        name: 'transferFrom',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'newOwner', type: 'address' },
        ],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ];

    // get the DFRAME token contract instance
    const dframeContract = new web3.eth.Contract(
      dframeABI as any,
      dframeAddress
    );
    const amount = web3.utils.toWei(dftAmount as any, 'ether');

    // transfer DFT tokens using web3

    const tx = dframeContract.methods
      .transfer(senderAddress, amount)
      .send({ from: _walletAddress, gasPrice: web3.utils.toWei('300', 'gwei') }) // Adjust the gas price as needed
      .on('transactionHash', function (hash: any) {
        console.log('Transaction Hash:', hash);
      })
      .on('receipt', function (receipt: any) {
        console.log('Transaction Receipt:', receipt);
      })
      .on('confirmation', function (confirmationNumber: any, receipt: any) {
        console.log('Confirmation Number:', confirmationNumber);
        console.log('Transaction Receipt:', receipt);
      })
      .on('error', function (error: any) {
        console.log('Error:', error);
        alert('Error: ' + error.message);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      });
    // wait for the tx on metamask to be completed then recall the getBalance function to update the balance and getpastevents function
    await tx;
    getPastEvents();
    setSenderAddress('');
    setDftAmount('');
    setTransactionUnderProgress(false);
  };

  // function to copy the contract address to clipboard
  const handleToastClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setContentCopiedSuccesfully(false);
  };

  //  function to get the past events of the DFT token contract
  async function getPastEvents() {
    // initialize the Web3 provider
    const web3 = new Web3(
      'https://polygon-mainnet.g.alchemy.com/v2/813GjZ3KqO5pVH_rmwgWbOftCQiezSse'
    );
    // const web3 = new Web3((window as any).ethereum);
    // const web3 = new Web3((window as any).ethereum);
    // const web3 = new Web3("https://polygon-rpc.com");

    // set the wallet address to query
    const _walletAddress =
      walletAddress || localStorage.getItem('walletAddress');
    // set the contract address of the DFT token
    const dframeAddress = '0x0B6163c61D095b023EC3b52Cc77a9099f6231FCC';

    // set the ABI for the DFT token contract
    const dframeABI = [
      { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'Approval',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'previousOwner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnershipTransferred',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'Snapshot',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'Transfer',
        type: 'event',
      },
      {
        inputs: [
          { internalType: 'address', name: 'owner', type: 'address' },
          { internalType: 'address', name: 'spender', type: 'address' },
        ],
        name: 'allowance',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'spender', type: 'address' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
        ],
        name: 'approve',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'account', type: 'address' },
          { internalType: 'uint256', name: 'snapshotId', type: 'uint256' },
        ],
        name: 'balanceOfAt',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
        name: 'burn',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'account', type: 'address' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
        ],
        name: 'burnFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'decimals',
        outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'spender', type: 'address' },
          {
            internalType: 'uint256',
            name: 'subtractedValue',
            type: 'uint256',
          },
        ],
        name: 'decreaseAllowance',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'spender', type: 'address' },
          { internalType: 'uint256', name: 'addedValue', type: 'uint256' },
        ],
        name: 'increaseAllowance',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'name',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'owner',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'snapshot',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'symbol',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'totalSupply',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'uint256', name: 'snapshotId', type: 'uint256' },
        ],
        name: 'totalSupplyAt',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
        ],
        name: 'transfer',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'from', type: 'address' },
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
        ],
        name: 'transferFrom',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'newOwner', type: 'address' },
        ],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ];

    // get the DFT token contract instance
    const dframeContract = new web3.eth.Contract(
      dframeABI as any,
      dframeAddress
    );
    setdftCA(dframeContract);
    //  get the balance of DFRAME tokens for the specified wallet address
    const balance = await dframeContract.methods
      .balanceOf(_walletAddress)
      .call();
    const balanceInEth = web3.utils.fromWei(balance, 'ether');
    const balanceInKFormat =
      Math.trunc((balanceInEth as any) / 1000).toString() + 'K';
    setWalletBalance(balanceInKFormat);
    const latestBlock = await (window as any).ethereum.request({
      method: 'eth_blockNumber',
      params: [],
    });
    // get the transfer events of the MATIC token for the specified wallet address
    const transferFromEvents = await dframeContract.getPastEvents('Transfer', {
      fromBlock: 0,
      toBlock: 'latest',
      filter: {
        from: _walletAddress,
      },
    });

    //  get the transfer events of the MATIC token for the specified wallet address
    const eventFromPromises = transferFromEvents.map(async (event) => {
      const block = await web3.eth.getBlock(event.blockNumber);
      return {
        ...event,
        timestamp: block.timestamp,
      };
    });

    // get the transfer events of the MATIC token for the specified wallet address
    const eventsFromWithTimestamps = await Promise.all(eventFromPromises);
    const transferToEvents = await dframeContract.getPastEvents('Transfer', {
      fromBlock: 0,
      toBlock: 'latest',
      filter: {
        to: _walletAddress,
      },
    });

    // get the transfer events of the MATIC token for the specified wallet address
    const eventToPromises = transferToEvents.map(async (event) => {
      const block = await web3.eth.getBlock(event.blockNumber);
      return {
        ...event,
        timestamp: block.timestamp,
      };
    });

    // get the transfer events of the MATIC token for the specified wallet address
    const eventsToWithTimestamps = await Promise.all(eventToPromises);
    const allEvents = [...eventsFromWithTimestamps, ...eventsToWithTimestamps];
    const sortedEvents = allEvents.sort(
      (a, b) => (b as any).timestamp - (a as any).timestamp
    );
    setTransactionEvents(sortedEvents);
    setLoadingTransactions(false);
  }

  const navigate = useNavigate();
  const handleWalletDisconnect = () => {
    if (!(window as any).ethereum?.selectedAddress) {
      // Metamask wallet disconnected
      navigate('/');
    }
  };

  const checkMetamaskConnection = () => {
    if (!(window as any).ethereum?.selectedAddress) {
      // Metamask wallet disconnected, redirect to root route
      navigate('/');
    }
  };

  useEffect(() => {
    checkMetamaskConnection();
    // Listen for changes in the selected address property
    if ((window as any).ethereum) {
      (window as any).ethereum.on('accountsChanged', handleWalletDisconnect);
    }
  }, [(window as any).ethereum]);

  //  useeffect to get the past events of the DFRAME token
  useEffect(() => {
    const _token =localStorage.getItem("tokenForClient");
    if(!_token){
      navigate("/");
    }
    const tempId = localStorage.getItem("clientId");
    
    if (tempId) {
      setClientId(tempId);
    }
    console.log('cliendId wallet page', clientId);
    getPastEvents();
  }, []);
  useEffect(() => {}, [transactionEvents]);
  const handleChange = (e: any) => {
    const value = e.target.value;
    // check the if statement that the value is ONLY between 0-9, no decimals, no spaces, nothing EXCEPT 0-9

    if (value.match(/^[0-9]*$/gm)) {
      setAmountToBuy(value);
    } else {
      // throw alert of invalid input
      alert('Invalid input');
      setAmountToBuy('');
    }
  };
  function buyDFTMail() {
    // Rishabhkapoor8711@gmail.com
    if (!amountToBuy || !paymentMethod) {
      alert('Please enter the required fields');
      return;
    }
    const email = 'Rishabhkapoor8711@gmail.com';
    const subject = encodeURIComponent('I want to buy dft');
    const body = encodeURIComponent(
      `Client Name:- ${companyName}\nClient Address:-${walletAddress}\nClient Balance:-${walletBalance} DFT\nClient Email:-${companyEmail}\n....................................................................\n....................................................................\nI want to buy DFT worth ${amountToBuy}$ \nMy preferred payment method(FIAT/CRYPTO) is ${paymentMethod}\n...............................`
    );
    const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
    setBuyDFTModal(false);
    setAmountToBuy('');
    setPaymentMethod('');
  }
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
  const handleOptionChange = (e: any) => {
    setPaymentMethod(e.target.value);
  };
  return (
    <div>
      <>{Sidebar(2)}</>
      <div className='Wallet'>
        <div className='walletHeader'>
          <div className='walletHeaderTitleMain'>Wallet</div>
          <button
            className='walletHeaderButton'
            // onclick to redirect to the buy DFT page
            onClick={() => setBuyDFTModal(true)}>
            Buy DFT
          </button>
        </div>
        <div className='walletBox'>
          <div className='transactions'>
            <div className='transactionHeader'>Transactions</div>
            <Divider />
            {
              // if the transactions are loading, show the loading icon
              loadingTransactions === true ? (
                <div className='transactionLoading'>
                  Loading transactions...
                  <CircularProgress />
                </div>
              ) : (
                <div className='transactionBox'>
                  {transactionEvents.map((event: any) => {
                    if (
                      event.returnValues.from.toString().toLowerCase() ===
                      _walletAddress.toString().toLowerCase()
                    ) {
                      return (
                        <div
                          className='transactionList'
                          onClick={() => {
                            // redirect to the transaction details page
                            window.open(
                              'https://polygonscan.com/tx/' +
                                event.transactionHash,
                              '_blank'
                            );
                          }}
                          key={event.transactionHash}>
                          <div
                            className='transactionListTop'
                            key={event.transactionHash}>
                            <div className='transactionListTopLeft'>
                              <p className='transactionListTopLeftText'>
                                To: {event.returnValues.to.slice(0, 7)}....
                                {event.returnValues.to.slice(-7)}
                              </p>
                            </div>
                            <div className='transactionListTopRight'>
                              <p className='transactionListTopRightText'>
                                On:{' '}
                                {new Date(
                                  event.timestamp * 1000
                                ).toLocaleDateString('en-US', {
                                  month: '2-digit',
                                  day: '2-digit',
                                  year: '2-digit',
                                })}
                              </p>
                            </div>
                          </div>
                          <div className='transactionListBottom'>
                            <div className='transactionListBottomLeft'>
                              <p className='transactionListBottomLeftText'>
                                Amount:{' '}
                                {(Web3.utils.fromWei(
                                  event.returnValues.value,
                                  'ether'
                                ) as any) >= 1000
                                  ? (Web3.utils.fromWei(
                                      event.returnValues.value,
                                      'ether'
                                    ) as any) /
                                      1000 +
                                    'K'
                                  : Web3.utils.fromWei(
                                      event.returnValues.value,
                                      'ether'
                                    )}{' '}
                                DFT
                              </p>
                            </div>
                            <div className='transactionListBottomCenter'>
                              <p className='transactionListBottomCenterText'>
                                At:{' '}
                                {new Date(
                                  event.timestamp * 1000
                                ).toLocaleTimeString(undefined, {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  second: '2-digit',
                                  hour12: false,
                                  timeZone:
                                    Intl.DateTimeFormat().resolvedOptions()
                                      .timeZone,
                                })}
                              </p>
                            </div>
                            <div className='transactionListBottomRight'>
                              <p className='transactionListBottomRightTextSent'>
                                Sent
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          className='transactionList'
                          onClick={() => {
                            // redirect to the transaction details page
                            window.open(
                              'https://polygonscan.com/tx/' +
                                event.transactionHash,
                              '_blank'
                            );
                          }}
                          key={event.transactionHash}>
                          <div className='transactionListTop'>
                            <div className='transactionListTopLeft'>
                              <p className='transactionListTopLeftText'>
                                From: {event.returnValues.from.slice(0, 7)}....
                                {event.returnValues.from.slice(-6)}
                              </p>
                            </div>
                            <div className='transactionListTopRight'>
                              <p className='transactionListTopRightText'>
                                On:{' '}
                                {new Date(
                                  event.timestamp * 1000
                                ).toLocaleDateString('en-US', {
                                  month: '2-digit',
                                  day: '2-digit',
                                  year: '2-digit',
                                })}
                              </p>
                            </div>
                          </div>
                          <div className='transactionListBottom'>
                            <div className='transactionListBottomLeft'>
                              <p className='transactionListBottomLeftText'>
                                Amount:{' '}
                                {(Web3.utils.fromWei(
                                  event.returnValues.value,
                                  'ether'
                                ) as any) >= 1000
                                  ? (Web3.utils.fromWei(
                                      event.returnValues.value,
                                      'ether'
                                    ) as any) /
                                      1000 +
                                    'K'
                                  : Web3.utils.fromWei(
                                      event.returnValues.value,
                                      'ether'
                                    )}{' '}
                                DFT
                              </p>
                            </div>
                            <div className='transactionListBottomCenter'>
                              <p className='transactionListBottomCenterText'>
                                At:{' '}
                                {new Date(
                                  event.timestamp * 1000
                                ).toLocaleTimeString(undefined, {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  second: '2-digit',
                                  hour12: false,
                                  timeZone:
                                    Intl.DateTimeFormat().resolvedOptions()
                                      .timeZone,
                                })}
                              </p>
                            </div>
                            <div className='transactionListBottomRight'>
                              <p className='transactionListBottomRightTextreceived'>
                                Received
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })}
                  <Divider />
                </div>
              )
            }
          </div>
          <Box className='userWallet'>
            <p>Wallet Balance : {walletBalance} DFT</p>
            {/* {walletAddress} */}
            <div>
              <p className='userAddress'>
                {_walletAddress.slice(0, 10)}....{_walletAddress.slice(-10, -1)}
              </p>
              <div
                title='Copy your wallet address'
                onClick={() => copyContent(_walletAddress)}>
                <ContentCopyIcon className='copyIcon' />
              </div>
            </div>
          </Box>
          <Box>
            <div className='transfertoken'>
              <div className='transferTokenHeading'>Transfer Tokens</div>
              <Divider />
              <div className='walletAddressInput'>
                Wallet Address :
                <input
                  className='inputForm'
                  value={senderAddress}
                  onChange={(e) => setSenderAddress(e.target.value)}
                  type='walletPageInput'
                />
              </div>
              <div className='walletAddressInput'>
                DFT Amount :
                <input
                  className='inputForm'
                  value={dftAmount}
                  onChange={(e) => setDftAmount(e.target.value)}
                  type='walletPageInput'
                />
              </div>
              {!transactionUnderProgress && (
                <button
                  className={
                    dftAmount === '' || senderAddress === ''
                      ? 'sendButtonDisable'
                      : 'sendButton'
                  }
                  onClick={handleSend}
                  title={
                    dftAmount === '' || senderAddress === ''
                      ? 'Fill Details to Enable'
                      : ''
                  }>
                  Send
                </button>
              )}
              {
                // show  a loader in place of SEND text when transactionunderprogress is true
                transactionUnderProgress && (
                  <button className='sendButton'>
                    <div className='loader'>
                      <CircularProgress />
                    </div>
                  </button>
                )
              }
            </div>
          </Box>
        </div>
      </div>
      {contentCopiedSuccesfully && (
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={contentCopiedSuccesfully}
          autoHideDuration={6000}
          onClose={() => {
            setContentCopiedSuccesfully(false);
          }}>
          <Alert
            onClose={handleToastClose}
            severity='info'
            sx={{ width: '25vw', height: '5vh', fontSize: '1rem' }}>
            Wallet Address Copied to Clipboard
          </Alert>
        </Snackbar>
      )}
      <Modal
        open={buyDFTModal}
        onClose={() => setBuyDFTModal(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style2}>
          <h1 style={{ textAlign: 'center', margin: 0, marginBottom: '1vh' }}>
            1 DFT = 0.1$
          </h1>
          <Divider />
          <TextField
            id='standard-basic'
            label='Total USD you want to BUY'
            variant='standard'
            sx={{ left: '2vw', width: '90%' }}
            {...register('amountToBuy')}
            onChange={handleChange}
            required
            value={amountToBuy}
            style={{
              margin: '1vh 0',
            }}
          />
          {amountToBuy !== '' && (
            <p
              style={{
                textAlign: 'center',
                margin: '1vh 0',
              }}>
              You will get {Number(amountToBuy) * 10} DFT for ${amountToBuy}
            </p>
          )}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <label>
              <input
                type='radio'
                value='FIAT'
                checked={paymentMethod === 'FIAT'}
                onChange={handleOptionChange}
              />
              FIAT
            </label>

            <label style={{ marginLeft: '20px' }}>
              <input
                type='radio'
                value='CRYPTO'
                checked={paymentMethod === 'CRYPTO'}
                onChange={handleOptionChange}
              />
              CRYPTO
            </label>
          </div>
          <p className='sendMailInformation'>
            **DO NOT CHANGE any information in the mail body**
          </p>
          <button
            className={amountToBuy ? 'sendMailButton' : 'sendMailButton2'}
            onClick={buyDFTMail}>
            Send Mail
          </button>
        </Box>
      </Modal>
    </div>
  );
}
