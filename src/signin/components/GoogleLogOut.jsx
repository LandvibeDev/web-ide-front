import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { withRouter } from 'react-router-dom';

function SocialLogOut(props) {
  const googleClientId =
    '205753666169-9rf5ok863ug67g84juf3ngb1vr6ibgae.apps.googleusercontent.com';

  const onSuccess = () => {
    alert('로그아웃 되었습니다');
    props.history.replace('/signin');
  };

  const onFailure = (err) => {
    console.log(err);
  };

  return (
    <div>
      <div style={{ marginTop: 50 }}>테스트 위해 잠시 추가</div>
      <GoogleLogout
        clientId={googleClientId}
        buttonText="LogOut"
        onLogoutSuccess={onSuccess}
        onFailure={onFailure}
      />
    </div>
  );
}

export default withRouter(SocialLogOut);
