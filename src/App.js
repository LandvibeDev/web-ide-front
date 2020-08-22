import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { SignInView, SignUpView } from './signin';
import { WorkSpaceMain } from './workspace';
import { DashBoardMain } from './dashboard';
import { RedirectPage } from './signin';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/signin/redirect" component={RedirectPage} />
        <Route exact path="/signin" component={SignInView} />
        <Route path="/signup" component={SignUpView} />
        <Route path="/workspace" component={WorkSpaceMain} />
        <Route path="/dashboard" component={DashBoardMain} />
      </BrowserRouter>
    </div>
  );
}
export default App;
