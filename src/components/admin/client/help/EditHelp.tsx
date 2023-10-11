import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
  Box,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

interface EditDialogProps {
  open: boolean;
  onClose: () => void;
}

interface YourDataType {
  _id:string;
  title: string;
  text: string;
}

interface EditDialogProps {
  open: boolean;
  onClose: () => void;
  oneData: YourDataType | undefined;
}

const EditClientHelp: React.FC<EditDialogProps> = ({ open, onClose, oneData }) => {
  const { handleSubmit, control, setValue } = useForm();

  // Set initial form values when oneData changes
  React.useEffect(() => {
    if (oneData) {
      setValue('title', oneData.title);
      setValue('text', oneData.text);
    }
  }, [oneData, setValue]);


  const onSubmit = async (data:any) => {
    try {
      // Make an HTTP request to update the data using Axios
      const response = await axios.put(`http://localhost:8000/Help/admin/update/${oneData?._id}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        console.log('Data updated successfully');
        onClose(); // Close the dialog after successful update
      } else {
        console.error('Failed to update data');
      }
      window.location.reload();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
  

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle>Edit Help Questions</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <Controller
              name="title"
              control={control}
              defaultValue={oneData?.title || ''}
              render={({ field }) => (
                <TextField
                  autoFocus
                  margin="dense"
                  id="title"
                  label="Question"
                  type="text"
                  fullWidth
                  variant="standard"
                  {...field}
                />
              )}
            />
            <Controller
              name="text"
              control={control}
              defaultValue={oneData?.text || ''}
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
            <Button type="submit">Save</Button>
            <Button onClick={onClose}>Close</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditClientHelp;
