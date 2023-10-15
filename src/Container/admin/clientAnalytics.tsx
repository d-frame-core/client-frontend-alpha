import * as React from 'react';
import Header from "../../components/admin/header/Heades";
import Sidebar from "../../components/admin/sidebar/Sidebar";
import Box from '@mui/material/Box';
import DftStats from '../../components/admin/user/SideTabsSecond';
import { useNavigate } from 'react-router-dom';

interface AdminData {
  token: string;
  userAddress: string;
}

export default function ClientAnalytics() {
  const navigate = useNavigate();
  React.useEffect(() => {
    // Check if dframeAdmindata exists in localStorage
    const dframeAdmindata:any = localStorage.getItem('dframeAdmindata');
    if (!dframeAdmindata) {
      navigate('/'); // Redirect to the login page if not found
      return;
    }
    // Parse the JSON data from the localStorage string
    const adminData:AdminData = JSON.parse(dframeAdmindata);

    // Check if the token or user address is missing
    if (!adminData.token && adminData.userAddress=="0x298ab03DD8D59f04b2Fec7BcC75849bD685eea75") {
      navigate("/"); // Redirect to the login page if not found
    }
    console.log("i am writing the data",adminData)
     
  }, []);

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
