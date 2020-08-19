import React from 'react';
import SignIn from '../components/SignIn';
import { Paper, Grid } from '@material-ui/core';
import '../components/item.css';

function SignInView(props) {
  return (
    <div>
      <div className="main-logo">울림 IDE</div>
      <div>
        <Paper variant="elevation" elevation={10} className="item-align">
          <Grid>
            <br/>
            {/* TODO : css 속성으로 여백 줘도 안먹히네요 Sign In 글자 위에 여백이 안생겨서 
                여백 설정할 수 있는 방법이 지금은 <br> 뿐인 것 같아서 일단 이걸루 해놨구여 해결방법이 생기면 수정할 예정입니다 */}
            <SignIn />
          </Grid>
        </Paper>
      </div>
    </div>
  );
}

export default SignInView;
