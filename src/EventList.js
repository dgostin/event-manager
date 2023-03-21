import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormControl, InputLabel } from '@material-ui/core';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Jumbotron from './Jumbotron';
import EventForm from './EventForm';
import axios from 'axios';
import categories from './categories.json';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
    marginBottom: '25px',
  },
  category: {
    textAlign: 'center',
    margin: '0 auto',
    marginBottom: '25px',
  },
  title: {
    flexGrow: 1,
  },
  table: {
    minWidth: 650,
  },
  loading: {
    textAlign: 'center',
    color: 'blue'
  },
  th: {
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: '#3f51b5',
  },
  formControl: {
    textAlign: 'center',
    marginLeft: theme.spacing(1),
    paddingTop: theme.spacing(3),
    minWidth: 150,
  }
}));


function EventList() {
  const classes = useStyles();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');

  const handleAddEvent = async (eventData) => {
  
    setLoading(true);
    try {
      const response = 
        await axios.post('https://6413adddc469cff60d684ba6.mockapi.io/events', eventData);
      console.log('Event created:', response.data);
      setLoading(false);
      // handle success, e.g. show success message, redirect to event list page
    } catch (error) {
      console.error('Error creating event:', error);
      // handle error, e.g. show error message
    }  

  };

  const handleDeleteEvent = async (id) => {
  
    setLoading(true);
    try {
      const response = 
        await axios.delete('https://6413adddc469cff60d684ba6.mockapi.io/events/'+id);
      console.log('Event deleted:', response.data);
      setLoading(false);
      // handle success, e.g. show success message, redirect to event list page
    } catch (error) {
      console.error('Error creating event:', error);
      // handle error, e.g. show error message
    }  

  };


  const handleCategoryChange = async (event) => {
 
    setCategory(event.target.value);

  };



  useEffect(() => {
    async function fetchEvents() {
      try {

        const url = (category === 'all') ?
        "https://6413adddc469cff60d684ba6.mockapi.io/events" :
        "https://6413adddc469cff60d684ba6.mockapi.io/events?category="+category;

        const response = 
          await axios.get(url);
        // console.log('Event created:', response.data);
        // handle success, e.g. show success message, redirect to event list page

        let data = response.data.map(obj => {
          var newDate = new Date();
          newDate.setTime(obj.date*1000);
          var dateString = newDate.toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'});
          obj.date = dateString;
          return obj;
        });

        setEvents(data);
        setLoading(false);
      } catch (error) {
        console.error('Error getting events:', error);
       // handle error, e.g. show error message
      }
    }

    fetchEvents();

  }, [loading, category]);


  return (
    <>
      <Jumbotron title="Events" />

      <div className={classes.category}>
       <FormControl className={classes.formControl}>
       <InputLabel id="category-label">Category</InputLabel>
        <Select
          name="category"
          id="category-label"
          value={category}
          // label="Category"
          onChange={handleCategoryChange}
          required
        >
          <MenuItem key="all" value="all">
            (All)
          </MenuItem>

          {categories.map((category) => (
            <MenuItem key={category.value} value={category.value}>
              {category.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </div>

  
      {!loading ? (
        <TableContainer component={Paper} className={classes.root}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.th}>Name</TableCell>
                <TableCell className={classes.th}>Date</TableCell>
                <TableCell className={classes.th}>Participants</TableCell>
                <TableCell className={classes.th}>Category</TableCell>
                <TableCell className={classes.th}>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>
                    <Link to={"/event/" + event.id}>{event.name}</Link>
                  </TableCell>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>{event.participants.join(", ")}</TableCell>
                  <TableCell>{event.category}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteEvent(event.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <h2 className={classes.loading}>Loading...</h2>
      )}
      <Jumbotron title="Add Event" variant="h4" />
      <EventForm onSubmit={handleAddEvent} />
    </>
  );
}

export default EventList;
