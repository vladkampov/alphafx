import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { Avatar, Table, Typography } from 'antd';

const { Column } = Table;

const TableGames = ({ teamId, gameStore, teamStore }) => {
  useEffect(() => {
    if (!teamId) {
      teamStore.getTeams({});
    }
    gameStore.getGames({ team_id: teamId });
  }, []);

  return (
    <React.Fragment>
      <Typography.Title level={2}>Games</Typography.Title>
      <Table
        dataSource={gameStore.instances}
        rowKey="id"
        loading={gameStore.isLoading}
      >
        <Column title="Date" dataIndex="date" key="date" />
        <Column
          title="Team"
          dataIndex="team_one_id"
          key="team_one_id"
          render={id => {
            const team = teamStore.instancesMap[id];

            if (!team) {
              return 'No team';
            }

            return (
              <React.Fragment>
                <Avatar size="large" src={team.logo_url} /> {team.name}
              </React.Fragment>
            );
          }}
        />
        <Column title="Team One Goals" dataIndex="team_one_goals" key="team_one_goals" />
        <Column title="Team Two Goals" dataIndex="team_two_goals" key="team_two_goals" />
      </Table>
    </React.Fragment>
  );
};

export default inject('gameStore', 'teamStore')(observer(TableGames));
