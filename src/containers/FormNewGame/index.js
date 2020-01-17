import React, { useEffect } from 'react';
import {
  Form,
  DatePicker,
  Select,
  InputNumber,
  Typography,
  Divider,
  Button,
} from 'antd';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import { Thumbnail } from '../../components';

const FormNewGame = ({ form, submit, teamStore }) => {
  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        return submit(values);
      }

      return err;
    });
  };

  useEffect(() => {
    teamStore.getTeams({});
  }, []);

  const { getFieldDecorator } = form;

  return (
    <React.Fragment>
      <Typography.Title level={3}>Add new game</Typography.Title>
      <Divider />
      <Form layout="inline" onSubmit={handleSubmit}>
        <Form.Item>
          {getFieldDecorator('date', {
            rules: [{ required: true, message: 'Please input date' }],
            valuePropName: 'value',
            initialValue: moment(),
          })(
            <DatePicker
              format="DD/MM/YY"
              disabledDate={current =>
                current && current > moment().endOf('day')
              }
            />
          )}
        </Form.Item>
        <br />
        <Form.Item>
          {getFieldDecorator('team_one_id', {
            rules: [
              {
                required: true,
                message: 'Please select the team',
              },
            ],
            type: 'string',
            valuePropName: 'value',
          })(
            <Select
              placeholder="Select the team"
              loading={teamStore.isLoading}
              style={{ minWidth: 200 }}
            >
              {teamStore.instances.map(t => (
                <Select.Option value={t.id} key={t.id}>
                  <Thumbnail src={t.logo_url} alt={t.name} />
                  {t.name}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('team_one_goals', {
            type: 'number',
            initialValue: 0,
            valuePropName: 'value',
            rules: [
              {
                required: true,
                message: 'Please input the score',
              },
            ],
          })(
            <InputNumber
              placeholder="first team goal"
              min={0}
              max={10}
              style={{ minWidth: 200 }}
            />
          )}
        </Form.Item>
        <br />
        <Form.Item>
          {getFieldDecorator('team_two_id', {
            rules: [
              {
                required: true,
                message: 'Please select the team',
              },
            ],
            type: 'string',
            valuePropName: 'value',
          })(
            <Select
              placeholder="Select the team"
              loading={teamStore.isLoading}
              style={{ minWidth: 200 }}
            >
              {teamStore.instances.map(t => (
                <Select.Option value={t.id} key={t.id}>
                  <Thumbnail src={t.logo_url} alt={t.name} />
                  {t.name}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('team_two_goals', {
            type: 'number',
            initialValue: 0,
            valuePropName: 'value',
            rules: [{ required: true, message: 'Please input the score' }],
          })(
            <InputNumber
              placeholder="second team goal"
              min={0}
              max={10}
              defaultValue={0}
              style={{ minWidth: 200 }}
            />
          )}
        </Form.Item>
        <Divider />
        <Form.Item>
          <Button size="large" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </React.Fragment>
  );
};

export default Form.create({ name: 'gameCreate' })(
  inject('teamStore')(observer(FormNewGame))
);
