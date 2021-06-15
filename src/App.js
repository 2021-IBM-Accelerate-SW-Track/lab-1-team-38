import Header from "./component/header"
import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import React from 'react';
 
function App() {
 return (
   <div className="App">
   <Header/>
   <h1>
       Enter an item into your To Do List
   </h1>
   <TextField id="outlined-basic" label="Outlined" variant="outlined" />
   <Button onClick = {clickMe}>Add</Button>
   <script></script>
   </div>
 );
}

function clickMe()
{
var h=document.createElement("p");
var t=document.createTextNode(new Date().toLocaleString());
h.appendChild(t);
document.body.appendChild(h);
}

 export default App;

