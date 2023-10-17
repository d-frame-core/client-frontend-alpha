/** @format */

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getAuth,
  initializeAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import axios from 'axios';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import './login.css';

const firebaseConfig = {
  apiKey: 'AIzaSyCYpkhlVsy1eO1vVuRNpa6l1CWONEKiXU8',
  authDomain: 'client-dashboard-2.firebaseapp.com',
  projectId: 'client-dashboard-2',
  storageBucket: 'client-dashboard-2.appspot.com',
  messagingSenderId: '578943720826',
  appId: '1:578943720826:web:d6d52242c9743e540d0ac3',
};

interface LoginFormValues {
  password: string;
}

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string }) => Promise<string[]>;
    };
  }
}

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [recaptchaVerifier, setRecaptchaVerifier] =
    useState<RecaptchaVerifier | null>(null);
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [verifyCode, setVerifyCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [metamaskAddress, setMetamaskAddress] = useState('');

  const navigate = useNavigate();
  const app = initializeApp(firebaseConfig); // Initialize Firebase
  const auth = getAuth(app); // Initialize the auth object after initializing Firebase
  auth.languageCode = 'en';

  const generaterecaptcha = () => {
    (window as any).recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
        lang: 'https://www.google.com/recaptcha/api.js?render=reCAPTCHA_site_key&lang=en',
        callback: (response: any) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      auth
    );
  };

  useEffect(() => {
    // Create the RecaptchaVerifier
    const appVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
      },
      auth
    );
    setRecaptchaVerifier(appVerifier);
    // Collect Metamask address on page load
    const collectMetamaskAddress = async () => {
      try {
        if (window.ethereum) {
          const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
          });
          if (accounts[0] === '0x298ab03dd8d59f04b2fec7bcc75849bd685eea75') {
            const metamaskAddress = accounts[0];
            setMetamaskAddress(metamaskAddress);
            console.log(metamaskAddress);
          } else {
            navigate('/register1');
          }
        }
      } catch (error) {
        console.error('Error collecting Metamask address:', error);
        // Handle error if necessary
      }
    };

    collectMetamaskAddress();
  }, [auth]); // Include auth in the dependency array if needed

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const handleVerifyCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVerifyCode(e.target.value);
  };

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    console.log(data.password, metamaskAddress);
    try {
      // Create a separate RecaptchaVerifier instance
      const response = await axios.post(
        'http://localhost:5000/admin/adminLogin',
        {
          password: data.password,
          userAddress: '0x298ab03DD8D59f04b2Fec7BcC75849bD685eea75',
        }
      );
      console.log(response.data);
      localStorage.setItem('dframeAdmindata', JSON.stringify(response.data));
      navigate('/admin/clientInfo');
      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setErrorMessage('Error sending OTP.');
    }
    console.log('submit');
  };

  const sendOtp = (e: any) => {
    setIsVerifying(true);
    generaterecaptcha();
    let appVerifier = (window as any).recaptchaVerifier;
    signInWithPhoneNumber(auth, `+918447411862`, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        (window as any).confirmationResult = confirmationResult;
        // ...
      })
      .catch((error: any) => {
        // Error; SMS not sent
        // ...
        console.log(error);
      });
  };

  // const sendOtp = async () => {
  //   const recaptchaVerifierInstance = recaptchaVerifier as RecaptchaVerifier;
  //       // Send the OTP to the phone number associated with the Metamask address
  //       await signInWithPhoneNumber(auth, "+918447411862",recaptchaVerifierInstance)
  //       .then((confirmationResult) => {
  //         // At this point SMS is sent. Ask user for code.
  //         const codePromptResult = window.prompt('Please enter the 6 digit code');

  //         if (codePromptResult === null) {
  //           // User canceled the prompt
  //           setErrorMessage("OTP entry canceled.");
  //           return;
  //         }

  //         const code = codePromptResult.toString();
  //         console.log(code)
  //         const userCredential = await confirmationResult.confirm(code);
  //       // OTP verification successful, you can access user information
  //       const user = userCredential;
  //       console.log("Successfully verified OTP for user:", user);
  //       })
  //   // try {
  //   //   if (metamaskAddress) {
  //   //     const recaptchaVerifierInstance = recaptchaVerifier as RecaptchaVerifier;
  //   //     // Send the OTP to the phone number associated with the Metamask address
  //   //     const phoneProvider = signInWithPhoneNumber(auth, "+918447411862", recaptchaVerifierInstance);
  //   //     setConfirmationResult(phoneProvider);
  //   //     setIsVerifying(true);
  //   //   } else {
  //   //     setErrorMessage("Metamask address is not available.");
  //   //   }
  //   // } catch (error) {
  //   //   console.error(error);
  //   //   setErrorMessage("Error sending OTP.");
  //   // }
  // };

  // const verifyOtp = async () => {
  //   try {
  //     const code = verifyCode;
  //     if (confirmationResult && code) {
  //       // Verify the OTP entered by the user
  //       const userCredential = await confirmationResult.confirm(code);
  //       // OTP verification successful, you can access user information
  //       const user = userCredential.user;
  //       console.log("Successfully verified OTP for user:", user.uid);
  //       console.log(confirmationResult, verifyCode);
  //     } else {
  //       setErrorMessage("Confirmation result or OTP code is missing.");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     setErrorMessage("Error verifying OTP.");
  //   }
  // };

  const verifyOtp = () => {
    let confirmationResult = (window as any).confirmationResult;
    console.log('verifyCode', verifyCode);
    confirmationResult
      .confirm(verifyCode)
      .then((result: any) => {
        const user = result.user;
        console.log(user);
        setIsVerifying(false);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <div className='login-container'>
      <div className='login-form'>
        <h1>Admin Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <button onClick={sendOtp}>Verify with OTP</button>
          <div id='recaptcha-container'></div>
          {isVerifying && (
            <div>
              <p>Enter the OTP sent to your phone:</p>
              <input
                type='text'
                onChange={handleVerifyCodeChange}
                placeholder='OTP'
              />
              <button onClick={verifyOtp}>Verify OTP</button>
            </div>
          )}
          {errorMessage && <div>{errorMessage}</div>}
          <div>
            <label>Password</label>
            <Controller
              name='password'
              control={control}
              defaultValue=''
              rules={{ required: 'Password is required' }}
              render={({ field }) => (
                <input
                  {...field}
                  type='password'
                  placeholder='Password'
                />
              )}
            />
            {errors.password && <span>{errors.password.message}</span>}
          </div>
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
