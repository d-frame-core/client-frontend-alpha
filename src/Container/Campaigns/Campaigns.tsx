import { Box } from '@mui/system'
import Sidebar from '../../components/sidebar/Sidebar'
import './campaigns.css'
import Divider from '@mui/material/Divider'
import { Backdrop, Button, TextField } from '@mui/material'
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';

import React from 'react'

const typesofads:any[]=[
  {value:'Image',label:'Image'},
  {value:'Video',label:'Video'}
]
const dataofcampaigns:any[]=[
  {camname:'ad1',act:'active',bid:'normal',budget:'500',reach:'5k',type:'video',time:'10'},
  {camname:'ad1',act:'active',bid:'normal',budget:'500',reach:'5k',type:'video',time:'10'}
]
export default function Campaigns() {
 
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = (data:any) => {
    
    setNextpage(true);
    console.log(data);
  };
  const [formopen,setFormopen]= useState(false);
  const [nextpage,setNextpage]=useState(false)
  return (
    <>
    <>{Sidebar(4)}</>
    <Box className='campaigns'>
      <div className='head'>Campaigns</div>
      <Button variant='contained' sx={{textTransform:'none',position:'absolute',right:'2vw',top:'3vh'}} onClick={()=>setFormopen(true)}>+ Create</Button>
    <div className='campaignsbox'>
      <div className='campaignbar'>
        <a>Campaign Name</a><Divider variant='middle' style={{width:'0',left:'0vw',backgroundColor:'#1D59F4'}} orientation='vertical'/>
        <a>Activity</a><Divider variant='middle' style={{width:'0',left:'0vw',backgroundColor:'#1D59F4'}} orientation='vertical'/>
        <a>Bid Stragedy</a><Divider variant='middle' style={{width:'0',left:'0vw',backgroundColor:'#1D59F4'}} orientation='vertical'/>
        <a>Budget</a><Divider variant='middle' style={{width:'0',left:'0vw',backgroundColor:'#1D59F4'}} orientation='vertical'/>
        <a>Reach</a><Divider variant='middle' style={{width:'0',left:'0vw',backgroundColor:'#1D59F4'}} orientation='vertical'/>
        <a>Type</a><Divider variant='middle' style={{width:'0',left:'0vw',backgroundColor:'#1D59F4'}} orientation='vertical'/>
        <a>Time</a>
      </div>
       <div >{dataofcampaigns.map(item=>{
        return(
          <div className='camitem'>
       <div className='sep'>
          <div className='a1'>{item.camname}</div>
          <div className='a2'>{item.act}</div>
          <div className='a3'>{item.bid}</div>
          <div className='a4'>{item.budget}</div>
          <div className='a5'>{item.reach}</div>
          <div className='a6'>{item.type}</div>
          <div className='a7'>{item.time}</div>
       </div>
       </div>
       );
      })
      }
      </div>
      <Backdrop open={formopen} sx={{  zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <div className='form'>
          <a onClick={()=>setFormopen(false)}><CloseIcon sx={{top:'3vh',left:'37vw',position:'absolute',zIndex:'1'}}/></a>
          <div style={{fontSize:'4vh',top:'2vh',position:"relative",height:'10vh'}}>Campaign Form</div>
            <Divider/>
          {!nextpage && <>
          <form onSubmit={handleSubmit(onSubmit)} className='form1'>
           
            <TextField
            id="standard-basic" 
            label="Campaign Name" 
            variant="standard" 
            sx={{left:'2vw',width:'90%'}} 
            {...register('Campaignname')}
            required
            />
            <TextField
            id="standard-basic" 
            label="Campaign Type" 
            variant="standard" 
            sx={{left:'2vw',width:'90%'}} 
            {...register('Campaigntype')}
            required
            />
            <TextField
            id="standard-basic" 
            label="Ad Name" 
            variant="standard" 
            sx={{left:'2vw',width:'90%'}} 
            {...register('Ad Name')}
            required
            />
            <TextField
          sx={{left:'2vw',width:'90%'}} 
          select
          label="Ad Type"
          defaultValue={false}
          {...register('Ad Type')}
          SelectProps={{
            native: true,
          }}
          helperText="Please select the ad type"
          variant="standard"
        >
          {typesofads.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <TextField
         id="standard-basic" 
         label="Ad URL" 
         variant="standard"
         type="url" 
         sx={{left:'2vw',width:'90%'}} 
         {...register('Ad URL')}
         required
        />
        <TextField
         id="standard-basic" 
         label="Ad Content" 
         variant="standard" 
         sx={{left:'2vw',width:'90%'}} 
         {...register('Ad content')}
         required
        />
        <button type='submit' className='btncampaign'>Next</button>
    </form>
    </>}
    {nextpage && <>
      <form onSubmit={handleSubmit(onSubmit)} className='form1'>
      <TextField
         id="standard-basic" 
         label="Ad tags" 
         variant="standard"
         sx={{left:'2vw',width:'90%'}} 
         {...register('tags')}
        />
        <TextField
         id="standard-basic" 
         label="Location" 
         variant="standard"
         sx={{left:'2vw',width:'90%'}} 
         {...register('location')}
        />
        <a className="dt">Start Date:<input type="date" className='datetime' {...register("Startdate")}/></a>
        <a className="dt">End Date:<input type="date" className='datetime' {...register("Enddate")}/></a>
        <button type='submit' className='btncampaign'>Complete</button>
      </form></>
    }
       <Divider sx={{bottom:'10vh',position:'absolute'}}/>
       
{nextpage && 
<Button variant="contained" sx={{textTransform:'none',width:'5vw',position:'absolute',bottom:'2vh',left:'3vw'}} onClick={()=>setNextpage(false)}>Back</Button>
}         </div>
         </Backdrop>

        </div>
      
    </Box>
    </>
  )
}
