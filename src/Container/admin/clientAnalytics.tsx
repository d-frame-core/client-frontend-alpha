import * as React from 'react';
import Header from "../../components/admin/header/Heades";
import Sidebar from "../../components/admin/sidebar/Sidebar";
import Box from '@mui/material/Box';
import DftStats from '../../components/admin/user/SideTabsSecond';

export default function ClientAnalytics() {

  return (
    <Box sx={{ display: 'flex'}} >
      <Sidebar/>
      <Box style={{background:"#f3f3f3"}}>
        <Header />
        <Box sx={{padding:"20px"}}>
            <Box sx={{background:"white",padding:"16px",borderRadius:"8px",marginBottom:"16px", textAlign:"center",fontSize:"20px"}}>
               Client Growth
              <DftStats />
            </Box>
            <Box sx={{background:"white",padding:"16px",borderRadius:"8px",marginBottom:"16px", textAlign:"center",fontSize:"20px"}}>
            Ads & Survey Growth
            <DftStats />
        
        </Box>
        </Box>
      </Box>
    </Box>
  );
}
