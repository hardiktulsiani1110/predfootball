/* eslint-disable prettier/prettier */
import axios from 'axios';
import {BACKEND_URL} from '@env';

export const getLeagueMatches = async (leagueId, fromDate, toDate) => {
  return await axios.post(
    `${BACKEND_URL}/league-matches/`,
    {
      leagueId,
      fromDate,
      toDate,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};

export const getLeagueRankings = async (leagueId, season) => {
  return await axios.post(
    `${BACKEND_URL}/league-standings/`,
    {
      leagueId,
      season,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};

export const getMatchEvents = async fixtureId => {
  return await axios.post(
    `${BACKEND_URL}/match-events/`,
    {
      fixtureId,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};

export const getMatchLineups = async fixtureId => {
  return await axios.post(
    `${BACKEND_URL}/match-lineups/`,
    {
      fixtureId,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};

export const getMatchStats = async fixtureId => {
  return await axios.post(
    `${BACKEND_URL}/match-stats/`,
    {
      fixtureId,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};

export const getMatchPrediction = async (matchId, userId) => {
  return await axios.post(
    `${BACKEND_URL}/get-prediction/`,
    {
      matchId,
      userId,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};

export const makeMatchPrediction = async (
  userId,
  matchId,
  team1,
  team2,
  matchDate,
) => {
  return await axios.post(
    `${BACKEND_URL}/new-prediction/`,
    {
      userId,
      matchId,
      team1,
      team2,
      matchDate,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};

export const editMatchPrediction = async (
  userId,
  matchId,
  team1,
  team2,
  matchDate,
) => {
  return await axios.post(
    `${BACKEND_URL}/edit-prediction/`,
    {
      userId,
      matchId,
      team1,
      team2,
      matchDate,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};
