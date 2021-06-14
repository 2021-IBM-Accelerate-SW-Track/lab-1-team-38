import React from "react";
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

export default function Todo(props) {
  return (
    <li className="todo stack-small">
      <Grid container fullWidth='true'>
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