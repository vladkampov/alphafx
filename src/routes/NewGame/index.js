import React from 'react';
import { notification } from 'antd';
import { inject } from 'mobx-react';
import { FormNewGame } from '../../containers';

const NewGame = ({ gameStore }) => {
  const handleSubmit = ({ date, ...rest }) => {
    gameStore
      .createGame({ date: date.toISOString(), ...rest })
      .then(() => {
        return notification.success({
          message: 'Game successfully added',
        });
      })
      .catch(err => {
        notification.error({
          message: 'Something went wrong',
          description: err.error,
        });
      });
    // return login({ identifier, password })
    //   .then(() => history.push('/profile'))
    //   .catch(({ data: { message: error } }) => Promise.reject(error));
  };
  return (
    <section>
      <FormNewGame submit={handleSubmit} />
    </section>
  );
};

export default inject('gameStore')(NewGame);
