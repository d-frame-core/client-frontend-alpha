import { borderRadius } from '@mui/system';
import * as React from 'react'

import Sidebar from '../../components/sidebar/Sidebar';
import HelpModal from './HelpModal';

export default function Help() {


  return (
    <div style={{ backgroundColor: '#959595' }}>
      <Sidebar />
      <div style={{marginLeft:"25%",marginTop:"10%" ,marginRight:"5%",padding :'20px,30px,20px,30px',textAlign:"left",}}> 
      <div style={{fontFamily:"bold", fontSize:"28px",}}>HELP
      <HelpModal Text={"Read More"} /> 
      <HelpModal Text={"Privacy Policy"} />
      <HelpModal Text={"Support" }/>
      <HelpModal Text={"Terms of Services" }/>
      <HelpModal Text={"FAQs" }/>
      </div>


    </div>
    </div>
  )
}

