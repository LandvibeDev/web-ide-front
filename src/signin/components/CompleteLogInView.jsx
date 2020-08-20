import React from 'react';
import LogOutGoogle from "./LogOutGoogle";

function CompleteLogInView(props) {
    return (
        <div style={{marginTop:100}}>
            로그인 성공!
            <div style={{marginTop:200}}>
                <div>로그아웃 하러가기</div>
                <div style={{marginTop:20}}>
                <LogOutGoogle/>
                </div>
            </div>
        </div>
    );
}

export default CompleteLogInView;