import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { Divider, Table, Typography } from 'antd';
import { ColourBlock, Thumbnail } from '../../components';
import { isHex } from '../../utils';

const { Column } = Table;

const TablePlayers = ({ teamStore }) => {
  useEffect(() => {
    teamStore.getTeams({});
  }, []);

  return (
    <React.Fragment>
      <Typography.Title level={3}>Teams</Typography.Title>
      <Divider />
      <Table
        dataSource={teamStore.instances}
        rowKey="id"
        loading={teamStore.isLoading}
      >
        <Column
          title="Logo"
          dataIndex="logo_url"
          key="logo_url"
          render={url => <Thumbnail key={`logo_${url}`} src={url} />}
        />
        <Column
          title="Name"
          dataIndex="name"
          key="name"
          sorter={(a, b) => a.name.localeCompare(b.name)}
          render={(name, record) => (
            <Link to={`/teams/${record.id}`}>{name}</Link>
          )}
        />
        <Column
          title="City"
          sorter={(a, b) => +a.city.localeCompare(b.city)}
          dataIndex="city"
          key="city"
        />
        <Column
          title="Founded"
          sorter={(a, b) => +a.founded - +b.founded}
          dataIndex="founded"
          key="founded"
        />
        <Column
          title="Budget"
          dataIndex="budget"
          key="budget"
          sorter={(a, b) => +a.budget - +b.budget}
          render={money =>
            new Intl.NumberFormat('en', {
              style: 'currency',
              currency: 'GBP',
            }).format(money)
          }
        />
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
