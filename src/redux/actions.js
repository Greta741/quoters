export const SELECT_ROOM = 'SELECT_ROOM';

export const selectRoom = room => {
  return {
    type: SELECT_ROOM,
    room
  };
};