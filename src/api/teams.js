import config from '../config';
import api from '.';

const CORE_END_POINT_URL = `${config('CORE_API_DOMAIN')}`;

export const getTeams = data =>
  api(({ get }) => get(`${CORE_END_POINT_URL}/teams`, { data }));

export const getTeam = (id, data) =>
  api(({ get }) => get(`${CORE_END_POINT_URL}/teams`, { data: { ...data, id } }));

export const getPlayers = data =>
  api(({ get }) => get(`${CORE_END_POINT_URL}/players`, { data }));

export const getPlayer = (id, data) =>
  api(({ get }) =>
    get(`${CORE_END_POINT_URL}/players`, { data: { ...data, id } })
  );

export const getGames = data =>
  api(({ get }) => get(`${CORE_END_POINT_URL}/games`, { data }));
export const getGame = (id, data) =>
  api(({ get }) =>
    get(`${CORE_END_POINT_URL}/games`, { data: { ...data, id } })
  );

export const postGame = data =>
  api(({ post }) => post(`${CORE_END_POINT_URL}/games/new`, { data }));
