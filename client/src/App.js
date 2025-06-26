import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';
import {
  Container, Typography, Box, TextField, Button, List, ListItem, CircularProgress, Snackbar, Alert
} from '@mui/material';

const API_BASE = 'https://fullstack-bwft.onrender.com/api/events';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', description: '', location: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchEvents = async (date) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/date/${date.toISOString().split('T')[0]}`);
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      setError('Failed to fetch events');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents(selectedDate);
    // eslint-disable-next-line
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setNewEvent({ title: '', description: '', location: '' });
  };

  const handleAddEvent = async () => {
    if (!newEvent.title) {
      setError('Event title is required');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newEvent,
          date: selectedDate,
        }),
      });
      if (!res.ok) throw new Error('Failed to add event');
      setSuccess('Event added successfully');
      setNewEvent({ title: '', description: '', location: '' });
      fetchEvents(selectedDate);
    } catch (err) {
      setError('Failed to add event');
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h3" gutterBottom>📅 Community Calendar</Typography>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
        />
      </Box>
      <Box mb={4}>
        <Typography variant="h5" gutterBottom>Add Event for {selectedDate.toDateString()}</Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Title"
            value={newEvent.title}
            onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
            required
          />
          <TextField
            label="Description"
            value={newEvent.description}
            onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
            multiline
            rows={2}
          />
          <TextField
            label="Location"
            value={newEvent.location}
            onChange={e => setNewEvent({ ...newEvent, location: e.target.value })}
          />
          <Button variant="contained" onClick={handleAddEvent} disabled={loading}>
            Add Event
          </Button>
        </Box>
      </Box>
      <Box mb={4}>
        <Typography variant="h5" gutterBottom>Events on {selectedDate.toDateString()}</Typography>
        {loading ? <CircularProgress /> : (
          <List>
            {events.length === 0 && <Typography>No events for this date.</Typography>}
            {events.map((event, idx) => (
              <ListItem key={event._id || idx} divider>
                <Box>
                  <Typography variant="subtitle1"><b>{event.title}</b></Typography>
                  {event.description && <Typography variant="body2">{event.description}</Typography>}
                  {event.location && <Typography variant="body2">Location: {event.location}</Typography>}
                </Box>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
      <Snackbar open={!!error} autoHideDuration={4000} onClose={() => setError('')}>
        <Alert severity="error" onClose={() => setError('')}>{error}</Alert>
      </Snackbar>
      <Snackbar open={!!success} autoHideDuration={3000} onClose={() => setSuccess('')}>
        <Alert severity="success" onClose={() => setSuccess('')}>{success}</Alert>
      </Snackbar>
    </Container>
  );
}

export default App;
