import React from 'react';
import { Avatar, Divider, Table, Typography } from 'antd';
import {Link} from "react-router-dom";

const { Column } = Table;

const TablePlayerHistory = ({ teamsMap, history = [] }) => {
  return (
    <React.Fragment>
      <Typography.Title level={3}>History</Typography.Title>
      <Divider />
      <Table dataSource={history} rowKey="team_id">
        <Column
          title="Team"
          dataIndex="team_id"
          key="team_id"
          render={id => {
            const team = teamsMap[id];

            if (!team) {
              return 'No team';
            }

            return (
              <Link to={`/teams/${team.id}`}>
                <Avatar size="large" src={team.logo_url} /> {team.name}
              </Link>
            );
          }}
        />
        <Column title="Apps" dataIndex="apps" key="apps" />
        <Column title="Goals" dataIndex="goals" key="goals" />
      </Table>
    </React.Fragment>
  );
};

export default TablePlayerHistory;
