import React from 'react';
import { GoogleLogin } from 'react-google-login';
import GitHubLogin from 'react-github-login';
import { Grid } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import GithubButton from 'react-github-login-button';
import axios from 'axios';
import './item.css';

function SignIn(props) {
  const googleClientId =
    '205753666169-9rf5ok863ug67g84juf3ngb1vr6ibgae.apps.googleusercontent.com';
  const githubClientId = 'dbefa8a77a035ec6619e';
  const githubClientSecret = 'd716e848f76ff25b776c70b151f93f29e0665bc7';
  const redirect_uri = 'http://localhost:3000/signup';
  const githubPostUri = 'http://github.com/login/oauth/access_token';

  const handleSuccessGoogle = (res) => {
    console.log('[로그인 성공] 현재 사용자 : ', res);
    const googleToken = res.wc.access_token;
    // 서버url({
    //   method: 'post',
    //   url: '/signin/google',
    //   data: googleToken,
    // })
    //   .then((res) => {
    //     console.log('토큰 전송 성공', res.data);
    //   })
    //   .catch((err) => {
    //     console.log('토큰 전송 실패', err);
    //   });
    props.history.replace('/signup');
  };

  const handleSuccessGitHub = (res) => {
    /* 깃헙에서 accesstoken 받아와서 서버 /signin/github으로 전송 
       !!수정!! CORS Policy 때문에 code를 서버로 전송하고 서버에서 jwt token 받도록
    */
    console.log('[로그인 성공] 현재 사용자 : ', res);
    const code = res.code;
    console.log(code);
    // 서버url({
    //   method: 'post',
    //   url: '/signin/github',
    //   data: code,
    // })
    //   .then((res) => {
    //     console.log('코드 전송 성공', res.data);
    //   })
    //   .catch((err) => {
    //     console.log('코드 전송 실패', err);
    //   });
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
        onSuccess={handleSuccessGoogle}
        onFailure={handleFailure}
        isSignedIn={true}
      />
      <div className="space1" />
      <Grid>
        <GitHubLogin
          className="githublogin"
          clientId={githubClientId}
          redirectUri={redirect_uri}
          onSuccess={handleSuccessGitHub}
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
