/** @format */

import React, { createContext, useState } from 'react';

const MyContext = createContext();

function MyContextProvider(props) {
  const [walletAddress, setWalletAddress] = useState('');
  const [_id, setId] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyType, setCompanyType] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyAddress1, setCompanyAddress1] = useState('');
  const [companyAddress2, setCompanyAddress2] = useState('');
  const [token, setToken] = useState('');
  const [_imageUrl, setImageUrl] = useState('');
  const [walletBalance, setWalletBalance] = useState('');
  const [clientId, setClientId] = useState('');
  const [companyImage, setCompanyImage] = useState('');
  return (
    <MyContext.Provider
      value={{
        walletAddress,
        setWalletAddress,
        setClientId,
        clientId,
        _id,
        setId,
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
        token,
        setToken,
        _imageUrl,
        setImageUrl,
        walletBalance,
        setWalletBalance,
        companyImage,
        setCompanyImage,
      }}>
      {props.children}
    </MyContext.Provider>
  );
}

export { MyContextProvider, MyContext };
