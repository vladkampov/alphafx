import * as React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import { Header, Footer } from '../components';
import Teams from './Teams';
import Team from './Team';
import Players from './Players';
import Player from './Player';
import Games from './Games';
import NewGame from './NewGame';

const { Content } = Layout;

const AppRouter = () => (
  <BrowserRouter>
    <Layout className="layout">
      <Header />
      <Content style={{ padding: '0 50px' }}>
        <Switch>
          <Route path="/teams" component={Teams} exact />
          <Route path="/teams/:id" component={Team} exact />
          <Route path="/players" component={Players} exact />
          <Route path="/players/:id" component={Player} exact />
          <Route path="/games" component={Games} exact />
          <Route path="/games/new" component={NewGame} exact />
          <Redirect from="*" to="/teams" />
        </Switch>
      </Content>
      <Footer />
    </Layout>
  </BrowserRouter>
);

export default AppRouter;
