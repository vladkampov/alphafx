import React from 'react';
import { Form, Alert } from 'antd';

export default ({ input, meta, label, name, hidden, ...props }) => (
  <Form.Item
    hidden={hidden}
    controlId={name}
    validationState={
      meta.touched && !meta.valid && !meta.focused ? 'error' : null
    }
    {...input}
    {...props}
  />
);
