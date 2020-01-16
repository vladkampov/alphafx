import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { Link, useParams } from 'react-router-dom';
import { Avatar, Icon, Typography, Descriptions, Divider } from 'antd';
import { TablePlayerHistory } from '../../containers';

const Player = ({ playerStore, teamStore }) => {
  const { id } = useParams();

  useEffect(() => {
    playerStore.getPlayer(id, {});
    teamStore.getTeams({});
  }, []);

  if (playerStore.isLoading) {
    return (
      <section>
        <Icon type="loading" spin />
      </section>
    );
  }

  if (!playerStore.activeInstance) {
    return <section>Player doesn't exist :(</section>;
  }

  const player = playerStore.activeInstance;

  const team = teamStore.instancesMap[player.team_id];

  return (
    <section>
      <Typography.Title level={2}>{player.name}</Typography.Title>
      <Divider />
      <Descriptions bordered>
        <Descriptions.Item label="Age">{player.age}</Descriptions.Item>
        <Descriptions.Item label="Nationality">
          <Avatar size="small" shape="square" src={player.flag_url} />{' '}
          {player.nationality}
        </Descriptions.Item>
        <Descriptions.Item label="Position">
          {player.position}
        </Descriptions.Item>
        <Descriptions.Item label="Value">{player.value}</Descriptions.Item>
        <Descriptions.Item label="Team">
          {team && (
            <Link to={`/teams/${team.id}`}>
              <Avatar size="large" src={team.logo_url} /> {team.name}
            </Link>
          )}
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <TablePlayerHistory
        history={player.history}
        teamsMap={teamStore.instancesMap}
      />
    </section>
  );
};

export default inject('playerStore', 'teamStore')(observer(Player));
