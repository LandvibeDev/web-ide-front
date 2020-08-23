import React, { useEffect } from 'react';
// import qs from 'qs';

function RedirectPage(props) {
  useEffect(() => {
    /*
    const query = qs.parse(props.location.search);
    const { token, email, registered, provider } = query;
    console.log(query);
    if (!registered) {
      props.history.replace('/signup');
    } else {
      window.localStorage.setItem('token', token);
      props.history.replace('/dashboard'); // email, provider 넘기기 props
    }
    */
  });
  return <div></div>;
}

export default RedirectPage;
