import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import {Avatar, Descriptions, Divider, Table, Typography} from 'antd';
import { ColourBlock } from '../../components';
import { isHex } from '../../utils';

const { Column } = Table;

const TablePlayers = ({ teamStore }) => {
  const history = useHistory();
  useEffect(() => {
    teamStore.getTeams({});
  }, []);

  const handleTeamClick = id => history.push(`/teams/${id}`);

  return (
    <React.Fragment>
      <Typography.Title level={3}>Teams</Typography.Title>
      <Divider />
      <Table
        dataSource={teamStore.instances}
        rowKey="id"
        loading={teamStore.isLoading}
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
            <ColourBlock
              key={`colour_${colour}`}
              colour={isHex(colour) ? `#${colour}` : colour}
            />
          )}
        />
      </Table>
    </React.Fragment>
  );
};

export default inject('teamStore')(observer(TablePlayers));
