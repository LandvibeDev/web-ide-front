import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import SignInView from './signin/view/SignInView';
import SignUpView from './signin/view/SignUpView';
import WorkSpaceMain from './workspace/WorkSpaceMain';
import DashBoardMain from './dashboard/components/DashBoardMain';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/signin" component={SignInView} />
        <Route path="/signup" component={SignUpView} />
        <Route path="/workspace" component={WorkSpaceMain} />
        <Route path="/dashboard" component={DashBoardMain} />
      </BrowserRouter>
    </div>
  );
}
export default App;
