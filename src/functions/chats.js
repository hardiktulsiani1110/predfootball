/* eslint-disable prettier/prettier */
import axios from 'axios';
import {BACKEND_URL} from '@env';

export const getChatGroups = async email => {
  return await axios.post(
    `${BACKEND_URL}/groups/`,
    {
      email,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};

export const createChatGroup = async (name, admin) => {
  return await axios.post(
    `${BACKEND_URL}/create-group/`,
    {
      name,
      admin,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};

export const getGroupInfo = async groupId => {
  return await axios.post(
    `${BACKEND_URL}/group/`,
    {
      groupId,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};

export const getExistingGroupCode = async groupId => {
  return await axios.post(
    `${BACKEND_URL}/group-code/`,
    {
      groupId,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};

export const getNewGroupCode = async groupId => {
  return await axios.post(
    `${BACKEND_URL}/new-group-code/`,
    {
      groupId,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};

export const joinGroup = async (inviteCode, userId) => {
  return await axios.post(
    `${BACKEND_URL}/join-group/`,
    {
      inviteCode,
      userId,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};

export const addGroupChat = async (userId, groupId, message) => {
  return await axios.post(
    `${BACKEND_URL}/add-group-chat-message/`,
    {
      userId,
      groupId,
      message,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};

export const getGroupChats = async groupId => {
  return await axios.post(
    `${BACKEND_URL}/get-group-chat-messages/`,
    {
      groupId,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};

export const leaveGroup = async (groupId, userId) => {
  return await axios.post(
    `${BACKEND_URL}/leave-group/`,
    {
      groupId,
      userId,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};

export const getLatestChatMessage = async groupId => {
  return await axios.post(
    `${BACKEND_URL}/latest-message/`,
    {
      groupId,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};

export const getGroupPredictions = async groupId => {
  return await axios.post(
    `${BACKEND_URL}/group-predictions/`,
    {
      groupId,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};

export const getUserPredictions = async userId => {
  return await axios.post(
    `${BACKEND_URL}/user-predictions/`,
    {
      userId,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};
