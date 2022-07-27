import client from "./client";

const get_state = async () => {
  const response = await client.get(`/api/state`);
  return response.data;
};

const create_state = async (state) => {
  const response = await client.post(`/api/state`, {
    state,
  });
  return response.data;
};

const update_state = async (id, state) => {
  const response = await client.patch(`/api/state/${id}`, {
    state,
  });
  return response.data;
};

export const state = {
  get: get_state,
  create: create_state,
  update: update_state,
};
