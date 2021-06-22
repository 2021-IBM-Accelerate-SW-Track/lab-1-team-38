import React, { useState } from "react";
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';

export default function Todo(props) {
 
  // Render Edit View
  function editingTemp() {
    return (
    <li className="todo stack-small">
    <Grid container fullWidth='true' spacing={1} alignItems="center">
        <Grid item>
        <Checkbox
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
          size="large"
        />
        </Grid>

        <Grid item alignItems="stretch" style={{ display: "flex" }}>
         <Grid item>

        {/* user input */}
        <TextField 
          type="text"
          id="outlined-secondary"
          label = "task"
          variant="outlined"
          color="secondary"
          margin='none'
          defaultValue={props.name}
          onChange={handleChange}
          inputProps={{style: {fontSize: '2vh'}}}
          InputLabelProps={{style: {fontSize: '2vh'}}}
          style={{ width: '50vw'}}
          mr = {2}
          refs = "Input"
        />

        {/* update button */}
         <CheckRoundedIcon onClick={() => updateValue()} style={{ fontSize: 50 , color: "gray"}}>
         </CheckRoundedIcon>
         
        {/* cancel button */}
        <ClearRoundedIcon onClick={() => changeEditMode()} style={{ fontSize: 50, color: "gray"}}>
        </ClearRoundedIcon>

          </Grid>
        </Grid>
        <Grid item justify ="center" alignItems="stretch" style={{ display: "flex" }}>
          <Typography className="todo-timestamp" variant="h5" htmlFor={props.id}>
          {props.timestamp}
          </Typography> 
        </Grid>

        {/* delete button */}
        <Grid item alignItems="stretch" style={{ display: "flex" }}>

        <IconButton
          variant="contained" color="red"
          onClick={() => props.deleteTask(props.id)}
        >
          <DeleteIcon fontSize="large" /> <span className="visually-hidden">{props.name}</span>
        </IconButton>
        
        </Grid>
      </Grid>
      </li>
    );
  }

  // Render Default View
  function normTemp() {
    return (
  <li className="todo stack-small">
    <Grid container fullWidth='true' spacing={1} alignItems="center">
        <Grid item>
        <Checkbox
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
          size="large"
        />
        </Grid>

        <Grid item alignItems="stretch" style={{ display: "flex" }}>
        <Typography className="todo-label" variant="h3" htmlFor={props.id}>
          {props.name}
        </Typography>
        
        </Grid>

        {/* edit button */}
        <Grid item alignItems="stretch" style={{ display: "flex" }}>

        <IconButton
          variant="contained" color="red"
          onClick={() => changeEditMode()}
        >
          <EditIcon fontSize="large" /> <span className="visually-hidden">{props.name}</span>
        </IconButton>
        
        </Grid>


        {/* delete button */}
        <Grid item alignItems="stretch" style={{ display: "flex" }}>

        <IconButton
          variant="contained" color="red"
          onClick={() => props.deleteTask(props.id)}
        >
          <DeleteIcon fontSize="large" /> <span className="visually-hidden">{props.name}</span>
        </IconButton>
        </Grid>

        <Grid container alignItems="center" >

          <Grid item margin="left" alignItems="stretch" style={{ marginLeft: 45}}>
            <Typography className="todo-timestamp" variant="h5" htmlFor={props.id}>
            {props.timestamp}
            </Typography> 
          </Grid>    
           
        </Grid>

      </Grid>
      </li>
    );
  }

  // Store changes from textfield into a placeholder
  function handleChange(event) {
    const id = props.id
    const newToDo = [...props.tasks];

    for (let i = 0; i < newToDo.length; i++) {
        if (newToDo[i].id == id) {
            newToDo[i].placeholder = event.target.value
        }
    }
    props.setTasks(newToDo);
  }

  // Update condition of current mode
  function changeEditMode() {
    const id = props.id
    const newToDo = [...props.tasks];

    for (let i = 0; i < newToDo.length; i++) {
        if (newToDo[i].id == id) {
            newToDo[i].isEditing = !(newToDo[i].isEditing)
        }
    }
    props.setTasks(newToDo);
  }

  // Set text equal to stored value (placeholder) once user wants to update
 function updateValue() {
    const id = props.id
    const newToDo = [...props.tasks];

    for (let i = 0; i < newToDo.length; i++) {
        if (newToDo[i].id == id) {
            for (let j = 0; j < newToDo.length; j++) {
              //make all tasks only have maximum one space inbetween and all lowercase for data validation
              let newTodoTextFormat = newToDo[j].text.toLowerCase();
              newTodoTextFormat = newTodoTextFormat.replace(/  +/g, ' ');
              newTodoTextFormat = newTodoTextFormat.trim();
              let placeholderTaskFormat = newToDo[i].placeholder.toLowerCase();
              placeholderTaskFormat = placeholderTaskFormat.replace(/  +/g, ' ');
              placeholderTaskFormat = placeholderTaskFormat.trim();
              if (newTodoTextFormat == placeholderTaskFormat) {
                return( 
                  alert("Error: This task already exists. Please enter a new task")
                ); 
              }
            }
            newToDo[i].text = newToDo[i].placeholder
            newToDo[i].isEditing = false
        } 
    }
    props.setTasks(newToDo);
}

  // toggle between two different views depending on condition of isEditing
  return (
    props.isEditing ? editingTemp() : normTemp()
  );
}
