import axios from 'axios';

const SERVER = process.env.REACT_APP_SERVER;

//Create room
const createRoom = async (formData, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.post(`${SERVER}/units/rooms`, formData, config);

  const room = await response.data;
  return room;
};

//get all rooms
const getRooms = async (queryString, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.get(
    `${SERVER}/units/rooms?${queryString ? queryString : ''}`,
    config
  );

  const rooms = await response.data;
  return rooms;
};

//get room
const getRoom = async (roomId, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.get(
    `${SERVER}/units/rooms/${roomId ? roomId : ''}`,
    config
  );

  const room = await response.data;
  return room;
};

//Update room
const updateRoom = async (roomId, formData, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.patch(
    `${SERVER}/units/rooms/${roomId}`,
    formData,
    config
  );

  const room = await response.data;
  return room;
};

//Delete room
const deleteRoom = async (roomId, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.delete(
    `${SERVER}/units/rooms/${roomId ? roomId : ''}`,
    config
  );

  const room = await response.data;
  return room;
};

const roomService = {
  createRoom,
  getRooms,
  getRoom,
  updateRoom,
  deleteRoom,
};

export default roomService;
