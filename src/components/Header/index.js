import React from 'react';
import { Menu, Layout } from 'antd';
import { Link } from 'react-router-dom';

const AppHeader = () => {
  return (
    <Layout.Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['homepage']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="homepage">
          <Link to="/">Homepage</Link>
        </Menu.Item>
      </Menu>
    </Layout.Header>
  );
};

export default AppHeader;
