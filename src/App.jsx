import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function App() {
  const[task, setTask] = useState('');
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('Task');
    return saved ? JSON.parse(saved) : [];
  });
  const [editIndex, setEditIndex] = useState(null);
  const [fillTask, setFillTask] = useState('');
  const [search, setSearch] = useState('');

  
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem('Task', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (fillTask) {
      const timer = setTimeout(() => setFillTask(''), 2000);
      return () => clearTimeout(timer);
    }
  }, [fillTask]);

  const filteredTask = tasks.filter((t) =>
    t.text.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddOrEdit = () => {
    if (task.trim() === '') return setFillTask('Enter valid data!');

    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex].text = task;
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, { text: task }]);
    }

    setTask('');
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') handleAddOrEdit();
  };

  const handleEdit = (index) => {
    setTask(tasks[index].text);
    setEditIndex(index);
  };

  const handleDeleteClick = (index) => {
    setDeleteIndex(index);
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    const updated = tasks.filter((_, i) => i !== deleteIndex);
    setTasks(updated);
    setOpenDialog(false);
    setDeleteIndex(null);
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
    setDeleteIndex(null);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        bgcolor: '#f8f9fa',
        p: { xs: 1, sm: 2, md: 4, lg: 2 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: { xs: '95%', sm: '80%', md: '60%', lg: '90%' },
          background: '#32bac7ff',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          p: { xs: 1, sm: 2, md: 3 },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            p: 1, 
            color: 'white',
            fontSize: { xs: '18px', sm: '22px', lg: '40px' },
          }}
        >
          TO-DO LIST
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 1,
            width: '80%',
            mt: 1,
          }}
        >
          <TextField
            placeholder="Enter a task"
            variant="outlined"
            size="small"
            fullWidth
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={handleEnter}
            sx={{
              bgcolor: 'white',
              borderRadius: 1,
              fontSize: { xs: '12px', sm: '14px' },
            }}
          />

          <Button
            variant="contained"
            onClick={handleAddOrEdit}
            sx={{
              bgcolor: editIndex !== null ? 'orange' : '#1976d2',
              textTransform: 'none',
              fontWeight: 600,
              height: { xs: '35px', sm: '40px' },
              '&:hover': {
                bgcolor: editIndex !== null ? '#e67e22' : '#115293',
              },
            }}
          >
            {editIndex !== null ? 'Update' : 'Add'}
          </Button>
        </Box>

        {fillTask && (
          <Typography
            color="error"
            sx={{
              mt: 1,
              fontSize: { xs: '13px', sm: '14px' },
              fontWeight: 500,
            }}
          >
            {fillTask}
          </Typography>
        )}

        <TextField
          placeholder="Search tasks..."
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            backgroundColor: '#64d1b49a',
            m: '8px',
            width: { xs: '80%', sm: '80%' },
          }}
        />
      </Paper>

      <List sx={{ width: { xs: '95%', sm: '80%', md: '60%', lg: '90%' }, mt: 2 }}>
        {filteredTask.map((t, index) => (
          <ListItem
            key={index}
            sx={{
              bgcolor: 'white',
              mb: 1,
              borderRadius: 1,
              px: { xs: 1, sm: 2 },
              py: { xs: 0.5, sm: 1 },
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: { xs: 1, sm: 0, lg: 2 },
            }}
          >
            <Typography sx={{ fontSize: { xs: '14px', sm: '16px', lg: '24px' } }}>
              {t.text}
            </Typography>
            <Box>
              <IconButton color="primary" onClick={() => handleEdit(index)}>
                <EditIcon />
              </IconButton>
              <IconButton color="error" onClick={() => handleDeleteClick(index)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>

      <Dialog open={openDialog} onClose={handleCancelDelete}> 
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this task?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box> 
  );
}

export default App;
