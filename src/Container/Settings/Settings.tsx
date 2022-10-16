import React from 'react'
import './settings.css';
import Sidebar from '../../components/sidebar/Sidebar';
import { FormControlLabel, FormGroup, Switch } from '@mui/material';

export default function Settings() {
  return (
    <div>
        <Sidebar/>
      <div className='srect1'></div>
        
        <div className='stext0'>Settings</div>
        <div className='stext1'>Update Email :</div>    
        <div className='stext2'>Update Number :</div>    
        <div className='stext3'>Theme:</div>
        <div className='stext4'>Clear Ad-History:</div>
        <div className='stext5'>Notification:</div>    

        <input className='sinput1'></input>
        <input className='sinput2'></input>

        <button className='sbtn3'>Clear Previous Campaigns</button>
        
        <FormGroup>
        <FormControlLabel className='sbtn1'control={<Switch defaultChecked />} label="" />
        <FormControlLabel className='sbtn2'control={<Switch defaultChecked/>} label="" />
        </FormGroup>

    </div>
  )
}
