import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import IssuesList from './components/Issueslist'
import IssuesDetail from './components/IssuesDetail'

function App() {
  return (
    <BrowserRouter >
      <Header />
      <Switch>
        <Route exact path="/">
          <Redirect to="/sudarshan070/trello-clone-api/issues" />
        </Route>
        <Route exact path="/:org/:repo/issues" component={IssuesList} />
        <Route exact path="/:org/:repo/issues/:number" component={IssuesDetail} />
      </Switch>

    </BrowserRouter>
  );
}

export default App;
