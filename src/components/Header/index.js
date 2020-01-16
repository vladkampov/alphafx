import React from 'react';
import { Menu, Layout } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeader = styled(Layout.Header)`
  margin-bottom: 25px;
`;

const AppHeader = () => {
  return (
    <StyledHeader>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['Teams']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="Teams">
          <Link to="/teams">Teams</Link>
        </Menu.Item>
        <Menu.Item key="Players">
          <Link to="/players">Players</Link>
        </Menu.Item>
      </Menu>
    </StyledHeader>
  );
};

export default AppHeader;
