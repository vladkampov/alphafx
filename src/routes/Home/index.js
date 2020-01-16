import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Avatar, Table, Typography } from 'antd';
import { isHex } from '../../utils';

const { Column } = Table;

const ColourLabel = styled.div`
  width: 16px;
  height: 16px;
  background: ${props => props.colour};
`;

const Home = ({ teamStore }) => {
  const history = useHistory();
  useEffect(() => {
    teamStore.getTeams({});
  }, [teamStore]);

  const handleTeamClick = id => history.push(`/team/${id}`);

  return (
    <section>
      <Typography.Title level={2}>Teams</Typography.Title>
      <Table
        dataSource={teamStore.instances}
        rowKey="id"
        onRow={record => ({
          onClick: () => {
            handleTeamClick(record.id);
          },
        })}
      >
        <Column
          title="Logo"
          dataIndex="logo_url"
          key="logo_url"
          render={url => <Avatar key={`logo_${url}`} src={url} />}
        />
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="City" dataIndex="city" key="city" />
        <Column title="Founded" dataIndex="founded" key="founded" />
        <Column title="Budget" dataIndex="budget" key="budget" />
        <Column
          title="Colour"
          dataIndex="colour"
          key="colour"
          render={colour => (
            <ColourLabel
              key={`colour_${colour}`}
              colour={isHex(colour) ? `#${colour}` : colour}
            />
          )}
        />
      </Table>
    </section>
  );
};

export default inject('teamStore')(observer(Home));
