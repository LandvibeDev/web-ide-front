import React from 'react';
import { GoogleLogin } from 'react-google-login';
import GitHubLogin from 'react-github-login';
import { Grid } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import GithubButton from 'react-github-login-button';
import './item.css';

function SignIn(props) {
  const googleClientId =
    '205753666169-9rf5ok863ug67g84juf3ngb1vr6ibgae.apps.googleusercontent.com';
  const githubClientId = 'dbefa8a77a035ec6619e';

  const redirect_uri = 'http://localhost:3000/signup';

  const handleSuccess = (res) => {
    console.log('[로그인 성공] 현재 사용자 : ', res);
    props.history.replace('/signup');
  };

  const handleFailure = (err) => {
    console.log('[로그인 실패] ', err);
  };

  return (
    <div>
      <h2 style={{ marginTop: 60, marginBottom: 50 }}>Sign In</h2>
      <div className="line" />

      <GoogleLogin
        clientId={googleClientId}
        buttonText="Sign In with Google"
        onSuccess={handleSuccess}
        onFailure={handleFailure}
        isSignedIn={true}
      />
      <div className="space1" />
      {/* <a href="https://github.com/login/oauth/authorize?client_id=dbefa8a77a035ec6619e&redirect_uri=http://localhost:3000/login"></a> */}
      <Grid>
        <GitHubLogin
          className="githublogin"
          clientId={githubClientId}
          redirectUri={redirect_uri}
          onSuccess={handleSuccess}
          onFailure={handleFailure}
          buttonText="Sign In with GitHub"
        >
          <GithubButton />
        </GitHubLogin>
      </Grid>
      <div className="space2" />
    </div>
  );
}

export default withRouter(SignIn);
