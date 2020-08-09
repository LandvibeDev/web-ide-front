import React, { useState } from 'react';
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
} from '@material-ui/core';
import GoogleLogOut from './GoogleLogOut';
import './item.css';

function SignUp(props) {
  const [user, setUser] = useState({
    nickname: '',
    email: '',
    bio: '',
  });

  const [isTermChecked, setTermChecked] = useState(false);

  const userHandle = (v) => (e) => {
    setUser({
      ...user,
      [v]: e.target.value,
    });
  };

  const checkHandle = (e) => {
    setTermChecked(!e.target.checked);
  };

  const onSubmitSignup = (e) => {
    e.preventDefault();
    if (!isTermChecked) {
      return setTermChecked(true);
    }
  };

  return (
    <div>
      <div style={{ float: 'left' }}>
        <form onSubmit={onSubmitSignup}>
          <div className="attribute-align">
            <div className="attribute">닉네임</div>
            <TextField
              name="user-nickname"
              value={user.nickname}
              required
              style={{ margin: 5, width: 400 }}
              label="닉네임"
              variant="outlined"
              onChange={userHandle('nickname')}
            />
          </div>
          <div className="attribute-align">
            <div className="attribute">이메일</div>
            <TextField
              name="user-email"
              value={user.email}
              required
              style={{ margin: 5, width: 400 }}
              label="이메일"
              variant="outlined"
              onChange={userHandle('email')}
            />
          </div>
          <div className="attribute-align">
            <div className="attribute">소개</div>
            <TextField
              name="user-bio"
              value={user.bio}
              multiline
              rows={3}
              required
              style={{ margin: 5, width: 400 }}
              label="소개"
              variant="outlined"
              onChange={userHandle('bio')}
            />
          </div>
          <div className="attribute-align">
            <div className="attribute">term and conditions</div>
            <div className="termandcondition">
              <br />
              <br />
              이용 약관
            </div>
          </div>
          <div style={{ marginTop: 150 }}>
            <div>
              <FormControlLabel
                style={{ marginLeft: 300 }}
                control={
                  <div>
                    <Checkbox
                      name="valid"
                      color="primary"
                      value={isTermChecked}
                      onChange={checkHandle}
                    >
                      동의하십니까?
                    </Checkbox>
                    {isTermChecked && (
                      <div style={{ color: 'blue' }}>
                        약관에 동의하셔야 합니다.
                      </div>
                    )}
                  </div>
                }
                label="동의하십니까?"
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ float: 'right' }}
            >
              SIGN UP
            </Button>
          </div>

          <GoogleLogOut />
        </form>
      </div>
    </div>
  );
}

export default SignUp;
