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

  const [term, setTerm] = useState(false);
  const [termError, setTermError] = useState(false);

  const userHandle = (v) => (e) => {
    setUser({
      ...user,
      [v]: e.target.value,
    });
  };

  const onChangeTerm = (e) => {
    setTermError(!term);
    setTerm(!term);
  };

  const onSubmitSignup = (e) => {
    e.preventDefault();
    if (!term) {
      return setTermError(true);
    }
  };

  return (
    <div>
      <div style={{ float: 'left' }}>
        <form onSubmit={onSubmitSignup}>
          <div className="attribute-align">
            <div className="attribute">nickname</div>
            <TextField
              name="user-nickname"
              value={user.nickname}
              required
              style={{ margin: 5, width: 400 }}
              label="nickname"
              variant="outlined"
              onChange={userHandle('nickname')}
            />
          </div>
          <div className="attribute-align">
            <div className="attribute">email</div>
            <TextField
              name="user-email"
              value={user.email}
              required
              style={{ margin: 5, width: 400 }}
              label="email"
              variant="outlined"
              onChange={userHandle('email')}
            />
          </div>
          <div className="attribute-align">
            <div className="attribute">bio</div>
            <TextField
              name="user-bio"
              value={user.bio}
              multiline
              rows={3}
              required
              style={{ margin: 5, width: 400 }}
              label="bio"
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
                      value={term}
                      onChange={onChangeTerm}
                    >
                      동의하십니까?
                    </Checkbox>
                    {termError && (
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
              SIGN IN
            </Button>
          </div>

          <GoogleLogOut />
        </form>
      </div>
    </div>
  );
}

export default SignUp;
