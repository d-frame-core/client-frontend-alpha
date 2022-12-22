import React from 'react'
import './ads.css'
import Sidebar from '../../components/sidebar/Sidebar';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { ResponsiveContainer } from 'recharts';

export default function Ads() {
  return (
    <div>
      <Sidebar/>
        
        <div className='arect1'></div>
        <div className='arect2'></div>
        <div className='arect3'></div>
        

      <div className='a11'>Ads History</div>
      <div className='a2'>Campaign Name</div>
      <div className='a3'>Campaign type </div>
        <div className='a4'>Ad-type</div>
        <div className='a5'>Ad budget/Day</div>
        <div className='a6'>Time Period</div>
        <div className='a7'>S.NO</div>
        <div className='a8'><CheckBoxOutlinedIcon/></div>
        
        <button className='abtn1'>Edit</button>
        <button className='abtn2'>Delete</button>
    </div>
  )
}
