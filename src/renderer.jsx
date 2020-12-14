import './index.css';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
require('@babel/polyfill');
//ipc
const { ipcRenderer } = require('electron');

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const App = () => {
  const classes = useStyles();

  //regist ipc listen event
  useEffect(() => {
    ipcRenderer.on('IPCFromBackend', function (event, data) {
      console.log(data);
    });
    return () => {
      ipcRenderer.removeAllListeners();
    };
  }, []);

  //example 2: send message to backend through IPC
  const handleClick = async () => {
    //async and without receiving return data
    ipcRenderer.send('IPCFromFrontend', { msg: 'hello electron' });

    //async and receiving return data
    const data = await ipcRenderer.invoke('IPCFromFrontendPromise', {
      msg: 'hello electron',
    });
    console.log('receive data from backend', data);
  };
  const FormRow = () => {
    return (
      <React.Fragment>
        <Grid item xs={4}>
          <Paper className={classes.paper} onClick={handleClick}>
            item
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
      </React.Fragment>
    );
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
      </Grid>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
