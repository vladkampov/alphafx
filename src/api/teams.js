import config from '../config';
import api from '.';

const CORE_END_POINT_URL = `${config('CORE_API_DOMAIN')}/teams`;

export const getTeams = data =>
  api(({ post }) => post(CORE_END_POINT_URL, { data }));
export const getTeam = (id, data) =>
  api(({ post }) =>
    post(CORE_END_POINT_URL, { data: { ...data, team_id: id } })
  );

export const getPlayers = data =>
  api(({ post }) => post(`${CORE_END_POINT_URL}/players`, { data }));

export const getGames = data =>
  api(({ post }) => post(`${CORE_END_POINT_URL}/games`, { data }));

export const postGame = data =>
  api(({ post }) => post(`${CORE_END_POINT_URL}/games/new`, { data }));
