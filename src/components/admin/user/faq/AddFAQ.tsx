import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Button,
  DialogActions,
  Box,
} from '@mui/material';
import axios from 'axios';

interface AddDialogProps {
  open: boolean;
  onClose: () => void;
}

const AddFAQ: React.FC<AddDialogProps> = ({ open, onClose }) => {
  const { handleSubmit, control, reset } = useForm();

  const onSubmit = async (data:any) => {
    try {
      // Make an HTTP request to add the data
      const response = await axios.post(
        'http://localhost:8000/F&Q/userFAQ/addFAQ',
        data
      );
      console.log('FAQ Data added:', response.data);
      // Clear the form fields after successful addition
      onClose(); // Close the dialog after successful addition
      window.location.reload();
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle>Add Learn More Questions</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <Controller
                name="question"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    autoFocus
                    margin="dense"
                    id="Question"
                    label="Question"
                    type="text"
                    fullWidth
                    variant="standard"
                    {...field}
                  />
                )}
              />
              <Controller
                name="answer"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    autoFocus
                    margin="dense"
                    id="text"
                    label="Answer"
                    multiline
                    fullWidth
                    variant="standard"
                    {...field}
                  />
                )}
              />
            </Box>
            <DialogActions>
              <Button type="submit">Add</Button>
              <Button onClick={onClose}>Close</Button>
            </DialogActions>
          </form>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default AddFAQ;
