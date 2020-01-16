import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import { Header, Footer } from '../components';
import Home from './Home';

const { Content } = Layout;

const AppRouter = () => (
  <BrowserRouter>
    <Layout className="layout">
      <Header />
      <Content style={{ padding: '0 50px' }}>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </Content>
      <Footer />
    </Layout>
  </BrowserRouter>
);

export default AppRouter;
