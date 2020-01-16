import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { useHistory, Link } from 'react-router-dom';
import { Avatar, Table, Typography } from 'antd';

const { Column } = Table;

const TablePlayers = ({ teamStore, playerStore, teamId }) => {
  const history = useHistory();
  useEffect(() => {
    if (!teamId) {
      teamStore.getTeams({});
    }
    playerStore.getPlayers({ team_id: teamId });
  }, []);

  const handlePlayerClick = id => history.push(`/players/${id}`);

  return (
    <React.Fragment>
      <Typography.Title level={3}>Players</Typography.Title>
      <Table
        dataSource={playerStore.instances}
        rowKey="id"
        loading={playerStore.isLoading}
        onRow={record => ({
          onClick: () => {
            handlePlayerClick(record.id);
          },
        })}
      >
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Age" dataIndex="age" key="age" />
        <Column
          title="Nationality"
          dataIndex="nationality"
          key="nationality"
          render={(n, record) => (
            <React.Fragment>
              <Avatar size="small" shape="square" stc={record.flag_url} /> {n}
            </React.Fragment>
          )}
        />
        <Column title="Position" dataIndex="position" key="position" />
        <Column title="Value" dataIndex="value" key="value" />
        {!teamId && (
          <Column
            title="Team"
            dataIndex="team_id"
            key="team_id"
            render={id => {
              const team = teamStore.instancesMap[id];

              if (!team) {
                return 'No team';
              }

              return (
                <Link to={`/teams/${id}`}>
                  <Avatar size="large" src={team.logo_url} /> {team.name}
                </Link>
              );
            }}
          />
        )}
      </Table>
    </React.Fragment>
  );
};

export default inject('playerStore', 'teamStore')(observer(TablePlayers));
