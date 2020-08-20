import React, { useEffect } from 'react';
import qs from 'qs';

function RedirectPage(props) {
  useEffect(() => {
    const query = qs.parse(props.location.search);
    const { token, email, registered, provider } = query;
    console.log(props);
    window.localStorage.setItem('token', token);
    if (registered) {
      props.history.replace('/dashboard');
    } else {
      props.history.replace('/signup'); // email 넘기기 props
    }
  });
  return <div></div>;
}

export default RedirectPage;
