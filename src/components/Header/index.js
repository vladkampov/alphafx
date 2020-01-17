import React from 'react';
import { Menu, Layout, Button, Typography } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeader = styled(Layout.Header)`
  margin-bottom: 25px;
`;

const AppHeader = () => {
  const { location, push } = useHistory();

  return (
    <StyledHeader>
      <Menu
        selectedKeys={location.pathname.split('/')}
        theme="dark"
        mode="horizontal"
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="teams">
          <Link to="/teams">Teams</Link>
        </Menu.Item>
        <Menu.Item key="players">
          <Link to="/players">Players</Link>
        </Menu.Item>
        <Menu.Item key="games">
          <Link to="/games">Games</Link>
        </Menu.Item>
      </Menu>
    </StyledHeader>
  );
};

export default AppHeader;
