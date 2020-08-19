import React from 'react';
import SignIn from '../components/SignIn';
import { Paper, Grid } from '@material-ui/core';
import '../components/item.css';

function SignInView(props) {
  return (
    <div>
      <div className="main-logo">울림 IDE</div>
      <div>
        <Paper variant="elevation" elevation={10} className="item-align">
          <Grid>
            <br/>
            <SignIn />
          </Grid>
        </Paper>
      </div>
    </div>
  );
}

export default SignInView;
