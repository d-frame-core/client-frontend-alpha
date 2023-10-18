/** @format */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Connect.css';
import axios from 'axios';
import { MyContext } from '../../components/context/Context';
import dframLogo from '../../assets/dframe.png';
const Connect = () => {
  const navigate = useNavigate();
  const {
    walletAddress,
    setWalletAddress,
    token,
    clientId,
    setToken,
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
    setClientId,
  } = React.useContext(MyContext);
  const [isConnected, setIsConnected] = React.useState(false);

  async function connectWallet(): Promise<void> {
    try {
      const accounts: string[] = await (window as any).ethereum.request({
        method: 'eth_requestAccounts',
      });
      const address = accounts[0];
 
      const response = await axios.post('https://client-backend-402017.el.r.appspot.com/users/login', {
        walletAddress: address,
      });

      // console.log(response.data);
      setWalletAddress(address);
      if (response.data.message === 'No address found please Signup') {
        setIsConnected(true);
      } else {
        // console.log(response.data);
        setToken(response.data.token);
        // console.log("token", response.data.token);
        localStorage.setItem('tokenForClient', response.data.token);
        localStorage.setItem('walletAddress', address);

        const data = response.data.user;
        console.log(response.data.user._id);
        await setCompanyName(data.companyName);
        await setCompanyType(data.companyType);
        await setCompanyEmail(data.companyEmail);
        await setCompanyAddress1(data.companyAddress1);
        await setCompanyAddress2(data.companyAddress2);
        await setWalletAddress(data.walletAddress);
        await setClientId(data._id);
        await localStorage.setItem('clientId', data._id);
        console.log('id', clientId);
        console.log(localStorage.getItem('clientId'));
        navigate('/profile');
      }
      // setWalletAddress(address);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='connectClientWallet'>
      {!isConnected && (
        <div>
          <img
            className='dframeLogoConnectWalletPage'
            src={dframLogo}
            alt='d frame logo'
          />
          <h1 className="connectClientWallet__headingMain">
            Welcome to D  Frame
          </h1>
          
          <h1 className="connectClientWallet__heading">
            Connect Wallet To Login
          </h1>
          <button
            className='connectClientWallet__button'
            onClick={() => connectWallet()}>
            Connect to Metamask
          </button>
        </div>
      )}
      {isConnected && (
        <div>
          <p className='connectClientWallet__address'>
            Connected to {walletAddress}
          </p>
          <p className='connectClientWallet__message'>
            You are NOT registered with us. Please register to continue
          </p>
          <button
            className='connectClientWallet__button'
            onClick={() => navigate('/register1')}>
            Register
          </button>
        </div>
      )}
    </div>
  );
};

export default Connect;
