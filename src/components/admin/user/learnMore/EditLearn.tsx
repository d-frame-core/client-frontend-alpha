import React, { useState } from 'react';
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
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

interface EditDialogProps {
  open: boolean;
  onClose: () => void;
}

interface YourDataType {
  _id: string;
  title: string;
  text: string;
}

interface EditDialogProps {
  open: boolean;
  onClose: () => void;
  oneData: YourDataType | undefined;
}

const EditDialog: React.FC<EditDialogProps> = ({ open, onClose, oneData }) => {
  const { handleSubmit, control, setValue } = useForm();

  React.useEffect(() => {
    if (oneData) {
      setValue('title', oneData.title);
      setValue('text', oneData.text);
    }
  }, [oneData, setValue]);

  const onSubmit = async (data:any) => {
    try {
      // Make an HTTP request to update the data
      const response = await axios.put(`http://localhost:8000/LearnMore/userLearn/update/${oneData?._id}`, data);
      console.log('Data updated:', response.data);
      onClose(); // Close the dialog after successful update
      window.location.reload();
      } catch (error) {
      console.error('Error updating data:', error);
    }
  };

    return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle>Edit Help Questions</DialogTitle>
      <DialogContent>
      <DialogContentText>
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
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
