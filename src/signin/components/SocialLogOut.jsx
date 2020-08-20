import React from 'react';
import { GoogleLogout } from 'react-google-login';
import {withRouter} from 'react-router-dom';

function LogOut(props) {
  const clientId =
    '205753666169-9rf5ok863ug67g84juf3ngb1vr6ibgae.apps.googleusercontent.com';

  const onSuccess = () => {
    alert('로그아웃 되었습니다');
    props.history.replace('/login');
  };
  
  const onFailure = (err) => {
    console.log(err);
  }

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="LogOut"
        onLogoutSuccess={onSuccess}
        onFailure={onFailure}
      />
    </div>
  );
}

export default withRouter(LogOut);

// 로그아웃 해도 현재 사용자 정보 콘솔에서 사라지지 않는 문제
