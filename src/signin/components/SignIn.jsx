import React from 'react';
import GitHubLogin from 'react-github-login';
import { Grid } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import GithubButton from 'react-github-login-button';
import GoogleButton from 'react-google-button';
import qs from 'qs';
import './item.css';

function SignIn(props) {
  const githubClientId = 'dbefa8a77a035ec6619e';
  const google_uri = 'http://localhost:8080/oauth2/authorize/google';
  const redirect_uri = 'http://localhost:3000/login';

  //const githubPostUri = 'http://github.com/login/oauth/access_token';

  const handleClickGoogle = (res) => {
    window.location.replace(google_uri + '?redirect_uri=' + redirect_uri);
    console.log(props);

    // 이 부분은 리다이렉트용 페이지 /login에서 해야함 ? ?
    const token = qs.parse(props.location.search, {
      ignoreQueryPrefix: true,
    });
    console.log(token);
    window.localStorage.setItem('token', token);
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
