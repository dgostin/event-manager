import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
  Button,
  Box,
} from '@material-ui/core';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@material-ui/core/Chip';
import DateTimePicker from 'react-datetime-picker';
import categories from './categories.json';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    padding: theme.spacing(3),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  formContainer: {
    width: 400,
    margin: 'auto',
    backgroundColor: '#dddddd',
    paddingTop: '20px',
    paddingBottom: '20px',
    paddingLeft: '40px',
    paddingRight: '40px',
    borderRadius: '25px',
  },
  box: {
    marginBottom: '25px',
    backgroundColor: '#eeeeee',
    borderRadius: '10px',
    paddingLeft: '15px'
  },
  button: {
    margin: 'auto',
    textAlign: 'center'
  },
}));

// const categories = [
//   { value: 'Music', label: 'Music' },
//   { value: 'Sports', label: 'Sports' },
//   { value: 'Food', label: 'Food' },
//   { value: 'Arts', label: 'Arts' },
//   { value: 'Technology', label: 'Technology' },
// ];

const participants = [
  'John Doe',
  'Jane Doe',
  'Bob Smith',
  'Alice Jones',
  'Tom Brown',
];

function EventForm({ onSubmit, initialValues }) {

  const classes = useStyles();
  const [values, setValues] = useState({category: 'Music'});
  const [dateValue, setDateValue] = useState(new Date());

//   console.log(initialValues.name);
    useEffect(() => {
        if (initialValues !== undefined) {
            setValues({
                name: initialValues.name, 
                participants: initialValues.participants,
                category: initialValues.category,
            });
            setDateValue(new Date(initialValues.date*1000));
        }
    },[initialValues]);

    const handleChange = (event) => {
        setValues({
        ...values,
        [event.target.name]: event.target.value,
        });
    };

    const handleDateChange = (value) => {
        setDateValue(value);
    };

    const handleSubmit = (event) => {
        const dateStamp = Math.round(new Date(dateValue).getTime()/1000);
        event.preventDefault();
        onSubmit({...values, date: dateStamp}, setValues);
    };

    return (
    <div className={classes.formContainer}>
    <form onSubmit={handleSubmit}>
        <Box className={classes.box}>
            <TextField
            name="name"
            label="Name"
            value={values.name || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            />
        </Box>

        <Box className={classes.box}>
            Date/Time: &nbsp;
            <DateTimePicker 
            onChange={handleDateChange} 
            value={dateValue} 
            name="Date/Time"
            />
        </Box>

        <Box className={classes.box}>
        <FormControl className={classes.formControl}>
            <InputLabel>Category</InputLabel>
            <Select
                name="category"
                value={values.category || 'Music'}
                onChange={handleChange}
                required
            >
            {categories.map((category) => (
                <MenuItem key={category.value} value={category.value}>
                {category.label}
                </MenuItem>
            ))}
            </Select>
        </FormControl>
        </Box>

        <Box className={classes.box}>
        <FormControl className={classes.formControl}>
            <InputLabel shrink={true}>Participants</InputLabel>
            <Select
                multiple
                name="participants"
                value={values.participants || []}
                onChange={handleChange}
                renderValue={(selected) => (
                    <div className={classes.chips}>
                    {selected.map((value) => (
                        <Chip key={value} label={value} className={classes.chip} />
                    ))}
                    </div>
                )}
            >
            {participants.map((participant) => (
                <MenuItem key={participant} value={participant}>
                <Checkbox
                    checked={(values.participants || []).indexOf(participant) > -1}
                />
                <ListItemText primary={participant} />
                </MenuItem>
            ))}
                </Select>
        </FormControl>
        </Box>

        <Box className={classes.button}>
        <Button type="submit" variant="contained" color="primary">
            Submit
        </Button>
        </Box>
    </form>
    </div>
  );
}

export default EventForm;
