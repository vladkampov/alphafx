import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import { Button, Divider, Table, Typography } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { Thumbnail } from '../../components';

const { Column } = Table;

const TableGames = ({ teamId, gameStore, teamStore }) => {
  const history = useHistory();

  useEffect(() => {
    if (!teamId) {
      teamStore.getTeams({});
    }
    gameStore.getGames({ team_one_id: teamId });
  }, []);

  return (
    <React.Fragment>
      <Typography.Title level={3}>
        Games{' '}
        <Button
          size="small"
          type="primary"
          onClick={() => history.push('/games/new')}
        >
          Add new game
        </Button>
      </Typography.Title>
      <Divider />
      <Table
        dataSource={gameStore.instances}
        rowKey="id"
        loading={gameStore.isLoading}
      >
        <Column
          title="Date"
          dataIndex="date"
          key="date"
          render={date => moment(date).format('DD/MM/YY')}
        />
        {!teamId && (
          <Column
            title="First Team"
            dataIndex="team_one_id"
            key="team_one_id"
            sorter={(a, b) => a.team_one_id.localeCompare(b.team_one_id)}
            render={id => {
              const team = teamStore.instancesMap[id];

              if (!team) {
                return 'No team';
              }

              return (
                <Link to={`/teams/${team.id}`}>
                  <Thumbnail src={team.logo_url} alt={team.name} /> {team.name}
                </Link>
              );
            }}
          />
        )}
        <Column
          title="Team One Goals"
          dataIndex="team_one_goals"
          key="team_one_goals"
        />
        <Column
          title="Second Team"
          dataIndex="team_two_id"
          key="team_two_id"
          sorter={(a, b) => a.team_two_id.localeCompare(b.team_two_id)}
          render={id => {
            const team = teamStore.instancesMap[id];

            if (!team) {
              return 'No team';
            }

            return (
              <Link to={`/teams/${team.id}`}>
                <Thumbnail src={team.logo_url} alt={team.name} /> {team.name}
              </Link>
            );
          }}
        />
        <Column
          title="Team Two Goals"
          dataIndex="team_two_goals"
          key="team_two_goals"
        />
      </Table>
    </React.Fragment>
  );
};

export default inject('gameStore', 'teamStore')(observer(TableGames));
