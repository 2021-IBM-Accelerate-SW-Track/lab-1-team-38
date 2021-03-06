import './App.css';


// Structure of Program
// - The add task is handled by a form in component/form.js.  ** the spacing for this is a bit whack and could be touched up a bit.
// - component/FilterButton.js is the formatting for the side Buttons .
// - component/todo.js is the formatting and display for the todolist items.
// - the mapping of the list is handled in this File, and is combined with some .filter logic to seperate the completed and 
// umcompleted tasks, i dont think much needs to be touched here, but feel free to fix if needed.
// - The data for the tasks is passed into App.js from index.js, the array for the tasks is stored in ./todosData.js 
//   - to access the data inside the App.js file do tasks."property name"
// - The index.css file is leftover from some of the tutorial i tinkered around with,  I think we should remove this by the end, 
// but some of it still needs to be migrated over to material ui 


// What is left to is do:
// - update list items
// - clean up some spaces where items are not using material ui and make the formatting cleaner 
// - just clean up some of the UI and Code.
// - cleanup import statements


// possible future features:
// - dropdown item per list item to show Description, and Details
// - more complicated add form to accomdate more Details.

import React, { useState } from "react";
import moment from 'moment';
import '@fontsource/roboto';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';
import Form from "./component/Form";
import FilterButton from "./component/FilterButton";
import Todo from "./component/Todo";
import { BluetoothConnectedRounded, Code, Description, Details, HelpRounded, NearMeRounded } from '@material-ui/icons';
import todosData from './todosData';
import { ButtonBase, Input, ListItemSecondaryAction, TextField } from '@material-ui/core';
import { isDOMComponentElement } from 'react-dom/test-utils';
import uuid from 'react-uuid'


// this when called will assign and generate the filters.  to add more filters add a label with a following conditional
const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};
const FILTER_NAMES = Object.keys(FILTER_MAP);


function App(props) {
  const [filter, setFilter] = useState('All');
  const [tasks, setTasks] = useState(props.tasks);
  if(tasks == null){
    const defaultTasks = [...todosData]
    setTasks(defaultTasks);
  }
  console.log(tasks);

  function addTask(name) {
    //code for new task to go here, will need to call settasks() or something.
   /*
    Empty string/null check for input, doesn't display error message 
    */
   if(name.length <= 0){
      return(
         alert("Error: Please enter a full string")
      ); 
   }

    for (let i = 0; i < tasks.length; i++) {
      //make all tasks only have maximum one space inbetween and all lowercase for data validation
      let taskFormat = tasks[i].text.toLowerCase();
      taskFormat = taskFormat.replace(/[\n\r\s\t]+/g, ' ').trim();

      let nameTaskFormat = name.toLowerCase();
      nameTaskFormat = nameTaskFormat.replace(/[\n\r\s\t]+/g, ' ').trim();
      if (taskFormat === nameTaskFormat) {
        return( 
          alert("Error: This task already exists. Please enter a new task")
        ); 
      }


    }

  /*
  After checking if string is empty and if the task in repeated, then can push onto list
  */
    let newElem = (
      { 
        id: uuid(), 
        text: name,
        dateAndTime: new moment(Date()).format("MMM Do YYYY LT"),
        completed: false
      }
    );
    const newToDosData = [...tasks, newElem]; 
    setTasks(newToDosData);
  }

  function deleteTask(id) {
    const newToDo = [...tasks];

    // Find and delete specified task
    for (let i = 0; i < newToDo.length; i++) {
        if (newToDo[i].id == id) {
            newToDo.splice(i, 1);
        }
    }
    setTasks(newToDo);
  }

  function updateTask(id) {

  }

  function toggleTaskCompleted(id) {
    //code for marking items as complete will go here, should call settasks or something.

    /*
    ranges through the todosData to find the matching id with the id to be completed;
    if finds task, then marks as complete; else maintains the original task completion state
    */
    tasks.map(x => x.id == id ? x.completed = !x.completed : x.completed = x.completed);
  }

  
  //this uses the array.map function as required in the instrucitons
  var taskList;
  if (tasks == null){
    taskList = todosData.map(task => (
      <Todo
        id={task.id}
        name={task.text}
        timestamp={task.dateAndTime}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        updateTask={updateTask}
      />
    ));
  }
  else {taskList = tasks.filter(FILTER_MAP[filter]).map(task => (
    <Todo
      id={task.id}
      name={task.text}
      timestamp={task.dateAndTime}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      setTasks = {setTasks}
      isEditing = {task.isEditing}
      placeholder = {task.placeholder}
      tasks = {tasks}

    />
  ));}
  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));
  
  return (
    //these grid things are pretty important any time you need items to be vertically aligned a grid should probably be used.
    <Grid
      container
      spacing={0}
      direction="row"
      alignItems="center"
      justify="left"
      style={{ minHeight: '100vh', minWidth: '99vw' }}
    >
      <Box color="text.primary"  p={4} alignItems="center" justify="center" style={{ width: '20vw' }}>
      <ButtonGroup
        orientation="vertical"
        color="text.primary"
        aria-label="vertical contained primary button group"
        variant="text"
        style={{maxWidth: '20vw', minWidth: '10vw'}}
      >
        {/* this is where filter list is called and the tasks will appear based on which filter tab is active */}
        {filterList}
      </ButtonGroup>
      </Box>

      <Box color="text.primary" bgcolor="rgba(0,0,10,0.2)" p={4} boxShadow={3} borderRadius={16}style={{ width: '70vw' }} >
        <Typography variant="h2" component="h3" margin = 'dense'>
          Group 38 To Do List 
        </Typography>
        
        <Form addTask={addTask} />
        <div className="filters btn-group stack-exception">
          
        </div>
        <h2 id="list-heading"> Size: {taskList.length}</h2> 
          {/* this needs to be in material.ui typography */}
          {/* this should also be left justified list and should somehow be implemented in material ui*/}
        <ul
          role="list"
          className="stack-large stack-exception"
          aria-labelledby="list-heading"
        >
          {taskList}
        </ul>
      </Box>
    </Grid>
  );
}


export default App;
