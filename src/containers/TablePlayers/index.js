import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { useHistory, Link } from 'react-router-dom';
import { Table, Typography } from 'antd';
import { Thumbnail } from '../../components';
import { fmtCurrency } from '../../utils';

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
        <Column
          title="Name"
          dataIndex="name"
          key="name"
          render={(name, record) => (
            <Link to={`/players/${record.id}`}>{name}</Link>
          )}
        />
        {!teamId && (
          <Column
            title="Team"
            dataIndex="team_id"
            key="team_id"
            sorter={(a, b) => a.name.localeCompare(b.name)}
            render={id => {
              const team = teamStore.instancesMap[id];

              if (!team) {
                return 'No team';
              }

              return (
                <Link to={`/teams/${id}`}>
                  <Thumbnail size="large" src={team.logo_url} /> {team.name}
                </Link>
              );
            }}
          />
        )}
        <Column
          title="Age"
          sorter={(a, b) => +a.age - +b.age}
          dataIndex="age"
          key="age"
        />
        <Column
          title="Nationality"
          dataIndex="nationality"
          key="nationality"
          sorter={(a, b) => a.nationality.localeCompare(b.nationality)}
          render={(n, record) => (
            <React.Fragment>
              <Thumbnail size="small" shape="square" src={record.flag_url} />{' '}
              {n}
            </React.Fragment>
          )}
        />
        <Column
          title="Position"
          sorter={(a, b) => a.position.localeCompare(b.position)}
          dataIndex="position"
          key="position"
        />
        <Column
          title="Value"
          dataIndex="value"
          key="value"
          sorter={(a, b) => +a.value - +b.value}
          render={money => fmtCurrency(money)}
        />
      </Table>
    </React.Fragment>
  );
};

export default inject('playerStore', 'teamStore')(observer(TablePlayers));
