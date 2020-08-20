import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { GithubLogin } from 'react-github-login';
import { Grid } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import './item.css';

function SocialLogIn(props) {
  const googleClientId =
    '205753666169-9rf5ok863ug67g84juf3ngb1vr6ibgae.apps.googleusercontent.com';
  const githubClientId = 'dbefa8a77a035ec6619e';
  
  const [user, setUser] = useState({
    id: '',
    name: '',
    provider: '',
  });

  const onSuccessLogin = (res) => {
    setUser({
      id: res.googleId,
      name: res.profileObj.name,
      provider: 'google',
    });
    console.log('[로그인 성공] 현재 사용자 : ', res.profileObj);
    props.history.replace('/main');
  };

  const onFailureLogin = (err) => {
    console.log('[로그인 실패] ', err);
  };

  return (
    <div>
      <Grid>
        <GoogleLogin
          clientId={googleClientId}
          buttonText="LogIn with Google"
          onSuccess={onSuccessLogin}
          onFailure={onFailureLogin}
          isSignedIn={true}
        />
      </Grid>
      <Grid>
        <GithubLogin
          clientId={githubClientId}
          onSuccess={onSuccessLogin}
          onFailure={onFailureLogin}
        />
      </Grid>
    </div>
  );
}

export default withRouter(SocialLogIn);
