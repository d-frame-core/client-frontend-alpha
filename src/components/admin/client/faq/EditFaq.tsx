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

interface FAQType {
    _id:string;
    question: string;
    answer: string;
  }

interface EditDialogProps {
  open: boolean;
  onClose: () => void;
  oneData2: FAQType | undefined;
}

const EditClientFaq: React.FC<EditDialogProps> = ({ open, onClose, oneData2 }) => {
  const { handleSubmit, control, setValue } = useForm();

  // Set initial form values when oneData2 changes
  React.useEffect(() => {
    if (oneData2) {
      setValue('question', oneData2.question);
      setValue('answer', oneData2.answer);
    }
  }, [oneData2, setValue]);

  const onSubmit = async (data:any) => {
    try {
      // Make an HTTP request to update the data
      const response = await fetch(`http://localhost:8000/F&Q/admin/updateFaq/${oneData2?._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Data updated successfully');
        onClose(); // Close the dialog after successful update
        window.location.reload();
      } else {
        console.error('Failed to update data');
      }
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
              name="question"
              control={control}
              defaultValue={oneData2?.question || ''}
              render={({ field }) => (
                <TextField
                  autoFocus
                  margin="dense"
                  id="question"
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
              defaultValue={oneData2?.answer || ''}
              render={({ field }) => (
                <TextField
                  autoFocus
                  margin="dense"
                  id="answer"
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

export default EditClientFaq;
