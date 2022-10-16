import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar';
import './wallet.css';
export default function Wallet() {
  return (
    <div>
      
      <Sidebar />
      <div className='wr1'></div>
      <div className='wr2'></div>
      <div className='wr3'></div>
      <div className='wr4'></div>
      <div className='wr5'></div>

      <div className='wtext1'>Wallet Balance</div>
      <div className='wtext2'>DFT 0.000</div>
      <div className='wtext3'>Your Wallet Address</div>
      <div className='wtext4'>Token transfer</div>
      <div className='wtext5'>Amount</div>
      <div className='wtext6'>Transfer to</div>
      <div className='wtext7'>Recipient Wallet Address</div>
      <div className='wtext8'>Wallet</div>

      <input className='winput1' type='text' placeholder='0x0000000000000000000000000000000000000000' />
      <input className='winput2' type='text'  />
      <input className='winput3' type='text' placeholder='Enter Recipient wallet address' />
      <input className='winput4' type='text' placeholder='0x0000000000000000000000000000000000000000'/>
      <button className='wbutton1'>Terms & Condition</button>
      <button className='wbutton2'>Send</button>
    
    </div>
  )
}
