import React, { useState } from 'react';
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import './item.css';

/*
  jwt token 받아오기
  받은 token이랑 user 정보 합쳐서 보내기
*/

function SignUp(props) {
  //const accessToken = window.localStorage.getItem(accessToken);
  const [user, setUser] = useState({
    nickname: '',
    email: '',
    bio: '',
  });

  const [isTermChecked, setTermChecked] = useState(false);
  const [termError, setTermError] = useState(false);

  const handleChangeUser = (v) => (e) => {
    setUser({
      ...user,
      [v]: e.target.value,
    });
  };

  const handleChangeCheck = (e) => {
    setTermError(false);
    setTermChecked(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isTermChecked) {
      return setTermError(true);
    }
    // 서버url({
    //   method: 'post',
    //   url: '/signup',
    //   data: { accessToken, user },
    // })
    //   .then((res) => {
    //     // 서버에서 검증
    //     props.history.replace('/dashboard');
    //   })
    //   .catch((err) => {
    //     // 에러코드 처리
    //   });
  };

  return (
    <div>
      <div style={{ float: 'left' }}>
        <form onSubmit={handleSubmit}>
          <div className="attribute-align">
            <div className="attribute">닉네임</div>
            <TextField
              name="nickname"
              value={user.nickname}
              required
              style={{ margin: 5, width: 400 }}
              label="닉네임"
              variant="outlined"
              onChange={handleChangeUser('nickname')}
            />
          </div>
          <div className="attribute-align">
            <div className="attribute">이메일</div>
            <TextField
              name="email"
              value={user.email}
              required
              style={{ margin: 5, width: 400 }}
              label="이메일"
              variant="outlined"
              onChange={handleChangeUser('email')}
            />
          </div>
          <div className="attribute-align">
            <div className="attribute">소개</div>
            <TextField
              name="bio"
              value={user.bio}
              multiline
              rows={3}
              required
              style={{ margin: 5, width: 400 }}
              label="소개"
              variant="outlined"
              onChange={handleChangeUser('bio')}
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
                      onChange={handleChangeCheck}
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
              SIGN UP
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default withRouter(SignUp);
