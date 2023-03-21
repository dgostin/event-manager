import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import axios from 'axios';
import Jumbotron from './Jumbotron';
import EventForm from './EventForm';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop: "20px",
      marginLeft: "100px"
    },
    title: {
      flexGrow: 1,
    },
  }));
  
function Event() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(true);
  const [dateString, setDateString] = useState('');

  const { id } = useParams();

  useEffect(() => {
    async function fetchEvent() {
      try {
        const response = 
          await axios.get('https://6413adddc469cff60d684ba6.mockapi.io/events/'+id);
        // console.log('Event created:', response.data);
        // handle success, e.g. show success message, redirect to event list page

        var newDate = new Date();
        newDate.setTime(response.data.date*1000);
        setDateString(newDate.toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'}));

        setEvent(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error creating event:', error);
       // handle error, e.g. show error message
      }
    }
    fetchEvent();
  }, [id]);


  const handleEditEvent = async (eventData, setValues) => {

    try {
        const response = 
        await axios.put('https://6413adddc469cff60d684ba6.mockapi.io/events/'+id, eventData);
        console.log('Event created:', response.data);

        // handle success, e.g. show success message, redirect to event list page
    } catch (error) {
        console.error('Error creating event:', error);
        // handle error, e.g. show error message
    }
    // setValues(initialValues);
    navigate('/events');
};


    return (
    
        !loading ? (
    
        <div className={classes.root}>
        <Typography variant="h4">{event.name}</Typography>
        <Typography variant="subtitle1">Date: {dateString}</Typography>
        <Typography variant="subtitle1">Participants: {event.participants.join(', ')}</Typography>
        <Typography variant="subtitle1">Category: {event.category}</Typography>

        <Jumbotron title="Edit Event" variant="h4" />
        <EventForm onSubmit={handleEditEvent} initialValues={event} />

        </div>
        ) : (<h2 className={classes.loading}>Loading...</h2>)
    
  );
}

export default Event;
