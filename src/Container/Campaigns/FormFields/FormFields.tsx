import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';


const steps = ['Campaign Details', 'Select Auidance and Tags', 'Date-Time and Budget'];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  interface pageNumber{
    pNum: number
  }

  const Page1 = ({pNum}:pageNumber) => {
    if(pNum===1){
    return(
      <div>
        <TextField
          variant="outlined"
          margin="normal"
          label="Campaign Name"
          fullWidth
          required
        />
        <TextField
          variant="outlined"
          margin="normal"
          label="Campaign Type"
          fullWidth
          required
        />
        <TextField
          variant="outlined"
          margin="normal"
          label="Ad Name"
          fullWidth
          required
        />
        <TextField
          id="outlined-select-currency"
          margin="normal"
          select
          fullWidth
          required
          label="Ad Type"
          helperText="Please Select the type of Ad"
        >
          {["Image","Video"].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          variant="outlined"
          margin="normal"
          label="Ad URL"
          fullWidth
          required
        />
        <TextField
          variant="outlined"
          margin="normal"
          label="Ad Content"
          fullWidth
          required
        />
      </div>
    );
  }else if(pNum===2){
    
    return(
      <div>
        <TextField
          id="outlined-select-currency"
          margin="normal"
          select
          fullWidth
          required
          label="Gender"
          helperText="Select Gender "
        >
          {["Males","Females","Others"].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <div>
          Age<br/>
        <TextField
          id="demo-helper-text-aligned-no-helper"
          label="From"
          required
          style={{marginRight:"30px"}}
        />
        <TextField
          id="demo-helper-text-aligned-no-helper"
          label="To"
          required
        />
        </div>
        <TextField
          variant="outlined"
          margin="normal"
          label="Tags"
          fullWidth
          required
        />
        <TextField
          variant="outlined"
          margin="normal"
          label="Locations"
          fullWidth
          required
        />
      </div>
    );
  }
  else if(pNum===3){
    return(
      <div>
        {/* <CampaignDatePicker /> */}<br />
        <label>Select a time:</label>
        <input type="date" id="date1" name="From" placeholder='from'/>
        <div><br/>
        <label>Select a time:</label>
        <input type="time" id="appt" name="appt" />
        </div><br/>
        <div>
          Budget<br/>
          <TextField
          label="Per Day"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            endAdornment: <InputAdornment position="end">ana</InputAdornment>,
          }}
        />
        <TextField
          label="Total Days"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            endAdornment: <InputAdornment position="end">Days</InputAdornment>,
          }}
        />
        </div>
      </div>
    );
  }else{
    return(
      <div>wrong</div>
    );
  }
  }


  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === 3 ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
           Congratulations Campaign Created
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Create Another Campaign</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            Step {activeStep + 1}<Page1 pNum={activeStep + 1} />
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
