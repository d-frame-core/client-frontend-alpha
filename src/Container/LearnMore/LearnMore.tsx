import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar';
import './learnmore.css';


export default function LearnMore() {
  return (
    <div>
      <Sidebar/>
      <div className='ltext1'>Learn More</div>
      <div className='ltext2'>Why advertise on D Frame ?</div>
      <div className='ltext3'>How does the campaign pricing works?</div>
      <div className='ltext4'>What is the reach of our campaigns?</div>
      <div className='ltext5'>How do you pay for the campaigns ?</div>
      <div className='ltext6'>FAQs</div>

      <div className='lrect1'></div>
      <div className='lrect2'></div>
      <div className='lrect3'></div>
      <div className='lrect4'></div>
      <div className='lrect5'></div>
      <div className='lrect6'></div>
    </div>
  )
}
