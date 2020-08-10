import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { SignInView, SignUpView } from './signin';
import { WorkSpaceMain } from './workspace';
import { DashBoardMain } from './dashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/signin" component={SignInView} />
        <Route path="/signup" component={SignUpView} />
        <Route path="/workspace" component={WorkSpaceMain} />
        <Route path="/dashboard" component={DashBoardMain} />
        <Route exact path="/" component={WorkSpaceMain} />
      </BrowserRouter>
    </div>
  );
}
export default App;
