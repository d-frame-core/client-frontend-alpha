import React from 'react'
import './campaigns.css'
import Sidebar from '../../components/sidebar/Sidebar';
import CampaignForm from './CampaignForm/CampaignForm'


export default function Campaigns() {
  return (
    <div>
      <Sidebar/>

        <div className='crect1'></div>
        <div className='crect2'></div>
        <div className='crect3'></div>

      <div className='c1'>Campaigns</div>
      <div className='c2'>Campaign Name</div>
      <div className='c3'>Activity </div>
        <div className='c4'>Bid strategy</div>
        <div className='c5'>Budget</div>
        <div className='c6'>Reach</div>
        <div className='c7'>Type</div>
        <div className='c8'>Time</div>
        <div className='c9'>No Ads Generated yet</div>

        <button className='cbtn1'> <CampaignForm /></button>
        <button className='cbtn2'>Create Ad</button>
    </div>
  )
}
