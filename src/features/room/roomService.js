import axios from 'axios';

const SERVER = process.env.REACT_APP_SERVER;

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

// //Update menuItem
// const updateMenuItem = async (menuItemId, formData, token) => {
//   const config = {
//     headers: {
//       Authorization: `${token}`,
//     },
//   };

//   const response = await axios.patch(
//     `${SERVER}/menus/menuItems/${menuItemId}`,
//     formData,
//     config
//   );

//   const menuItem = await response.data;
//   return menuItem;
// };

// //Delete menuItem
// const deleteMenuItem = async (menuItemId, token) => {
//   const config = {
//     headers: {
//       Authorization: `${token}`,
//     },
//   };

//   const response = await axios.delete(
//     `${SERVER}/menus/menuItems/${menuItemId ? menuItemId : ''}`,
//     config
//   );

//   const menuItem = await response.data;
//   return menuItem;
// };

const roomService = {
  getRooms,
  getRoom,
  //   updateMenuItem,
  //   deleteMenuItem,
};

export default roomService;
