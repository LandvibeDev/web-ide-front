import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import SignInView from './signin/view/SignInView';
import SignUpView from './signin/view/SignUpView';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/signin" component={SignInView} />
        <Route path="/signup" component={SignUpView} />
      </BrowserRouter>
    </div>
  );
}

export default App;
