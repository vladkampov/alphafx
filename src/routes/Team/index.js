import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { useParams, useHistory } from 'react-router-dom';
import { Avatar, Icon, Typography, Descriptions, Divider } from 'antd';
import { ColourBlock } from '../../components';
import { TableGames, TablePlayers } from '../../containers';
import { isHex } from '../../utils';

const Team = ({ teamStore }) => {
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    teamStore.getTeam(id, {}).catch(err => {
      // eslint-disable-next-line
      console.error(err);
      history.push('/teams');
    });
  }, []);

  if (teamStore.isLoading) {
    return (
      <section>
        <Icon type="loading" spin />
      </section>
    );
  }

  if (!teamStore.activeInstance) {
    return <section>Team doesn't exist :(</section>;
  }

  const team = teamStore.activeInstance;

  return (
    <section>
      <Typography.Title level={2}>
        <Avatar size="large" src={team.logo_url} /> {team.name}
      </Typography.Title>
      <Descriptions bordered>
        <Descriptions.Item label="City">{team.city}</Descriptions.Item>
        <Descriptions.Item label="Founded">{team.founded}</Descriptions.Item>
        <Descriptions.Item label="Budget">{team.budget}</Descriptions.Item>
        <Descriptions.Item label="Colour">
          <ColourBlock
            colour={isHex(team.colour) ? `#${team.colour}` : team.colour}
          />
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <TablePlayers teamId={team.id} />
      <Divider />
      <TableGames teamId={team.id} />
    </section>
  );
};

export default inject('teamStore')(observer(Team));
