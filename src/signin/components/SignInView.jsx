import React from 'react';
import SocialLogin from './SocialLogIn';
import './item.css';

function SignInView(props) {
  return (
    <div style={{margin:200}}>
      <div className="item-align">
        <div style={{ margin: 200 }}></div>
        <SocialLogin />
        <div style={{ margin: 200 }}></div>
      </div>
    </div>
  );
}

export default SignInView;
