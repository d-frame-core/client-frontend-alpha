import { Container } from '@mui/material'
import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import user from '../../assets/user.png';
import './profile.css'


export default function Profile() {
  return (
    <div>
      <Sidebar/>
      <img className='pim1' src={user} alt=''/>
      <div className='ptext1'>Profile</div>
      <div className='ptext2'>Company Name :</div>
      <div className='ptext3'>Company Type :</div>
      <div className='ptext4'>Company Number :</div>
      <div className='ptext5'>Company E-Mail :</div>
      <div className='ptext6'>Company Address 1:</div>
      <div className='ptext7'>Company Address 2:</div>
      <div className='ptext8'>Wallet Address :</div>
      <div className='ptext9'><b>Profile Improvement :</b>This enables us to know about you betterand show more relevent ads</div>
      <div className='ptext10'>History</div>
      <div className='ptext11'><b>Wallet Balance<br></br>
      345 DFT</b></div>

      <div><input className='pin1' placeholder=''/></div>
      <div><input className='pin2' placeholder=''/></div>
      <div><input className='pin3' placeholder=''/></div>
      <div><input className='pin4' placeholder=''/></div>
      <div><input className='pin5' placeholder=''/></div>
      <div><input className='pin6' placeholder=''/></div>
      <div><input className='pin7' placeholder=''/></div>
      
      

        <div className='prect1'></div>
        <div className='prect2'></div>
        <div className='prect3'></div>
        <div className='prect4'></div>
        <div className='prect5'></div>
        <div className='prect6'></div>
        <div className='prect7'></div>

        <button className='pb1'>Save</button>
        <button className='pb2'>More..</button>
    </div>
  )
}
