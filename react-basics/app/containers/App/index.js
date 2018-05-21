

import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import EditPage from 'containers/EditPage/Loadable';
import MainPage from 'containers/MainPage/Loadable';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/editpage" component={EditPage} />
        <Route path="/" component={MainPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}
