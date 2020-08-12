import React from 'react';
import SignIn from '../components/SignIn';
import '../components/item.css';

function SignInView(props) {
  return (
    <div>
      <div className="main-logo">LOGO</div>
      <div>
        <div className="item-align">
          <SignIn />
        </div>
      </div>
    </div>
  );
}

export default SignInView;
