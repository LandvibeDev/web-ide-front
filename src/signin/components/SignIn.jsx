import React from 'react';
import GitHubLogin from 'react-github-login';
import { Grid } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import GithubButton from 'react-github-login-button';
import GoogleButton from 'react-google-button';
import './item.css';

function SignIn(props) {
  const githubClientId = 'dbefa8a77a035ec6619e';
  const redirect_uri = 'http://localhost:3000/signup';
  //const githubPostUri = 'http://github.com/login/oauth/access_token';

  const handleClickGoogle = (res) => {
    window.location.replace('http://localhost:8080/oauth2/authorize/google');
    // 서버url({
    //   method: 'get',
    //   url: '',
    //   data: accessToken,
    // })
    //   .then((res) => {
    //     console.log('토큰 수신 성공', res.data);
    //     window.localStorage.setItem('accessToken', accessToken);
    //     회원가입인지 로그인인지 확인 후
    //     로그인이면 props.history.replace('/dashboard');
    //     회원가입이면 props.history.replace('/signup');
    //   })
    //   .catch((err) => {
    //     console.log('토큰 수신 실패', err);
    //   });
  };

  const handleSuccessGitHub = (res) => {
    /* 깃헙에서 accesstoken 받아와서 서버 /signin/github으로 전송 
       !!수정!! CORS Policy 때문에 code를 서버로 전송하고 서버에서 jwt token 받도록
       ==> 일단 구글을 우선으로 하는것으로
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
      <h1 style={{ marginTop: 60, marginBottom: 70 }}>Sign In</h1>
      <div className="line" />

      <GoogleButton
        type="dark"
        className="googlelogin"
        onClick={handleClickGoogle}
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
