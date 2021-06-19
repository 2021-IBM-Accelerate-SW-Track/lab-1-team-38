import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
function Form(props) {
  const [name, setName] = useState("");

  function handleChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.addTask(name);
    setName("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <Grid container fullWidth='true'>
        <Grid item>
        <TextField
          id="outlined-secondary"
          label = "task"
          variant="outlined"
          color="secondary"
          value={name}
          data-testid="new-item-input"
          onChange={handleChange}
          margin='none'
          inputProps={{style: {fontSize: '2vh'}}}
          InputLabelProps={{style: {fontSize: '2vh'}}}
          style={{ width: '50vw'}}
          mr = {2}
        />
        </Grid>

        <Grid item alignItems="stretch" style={{ display: "flex" }}>
        <Button data-testid="new-item-button" datavariant="contained" color="primary" type="submit" style={{ width: '10vw', fontSize: '2vh'}}>
          add
        </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default Form;