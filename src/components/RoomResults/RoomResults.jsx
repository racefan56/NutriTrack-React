import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { getRooms } from '../../features/room/roomSlice';
import Table from '../layout/Table/Table';
import TableDataItem from '../layout/Table/TableDataItem/TableDataItem';
import Spinner from '../Spinner/Spinner';
import ButtonMain from '../layout/Button/ButtonMain/ButtonMain';
import Error from '../Error/Error';

import classes from './RoomResults.module.css';

const RoomResults = (props) => {
  const dispatch = useDispatch();

  const { rooms, loading, isError, message } = useSelector(
    (state) => state.room
  );

  useEffect(() => {
    dispatch(getRooms());
    if (isError) {
      toast.error(message);
    }
  }, [dispatch, isError, message]);

  const handleRefresh = () => {
    dispatch(getRooms());
  };

  if (loading) {
    return <Spinner />;
  }

  if (!loading && isError) {
    return <Error></Error>;
  } else {
    return (
      <>
        <Table
          headers={['Room Number', 'Unit', '']}
          heading='Rooms'
          refresh={handleRefresh}
          createPath='create'
        >
          {rooms.map((room, index) => (
            <React.Fragment key={room._id}>
              <TableDataItem
                navigatePath={`/control-panel/rooms/${room._id}`}
                dataPoints={[room.roomNumber, room.unit.unitName]}
              >
                <td>
                  <ButtonMain
                    className='m-0'
                    type='Link'
                    path={`${room._id}`}
                    text='View/Edit'
                  />
                </td>
              </TableDataItem>
            </React.Fragment>
          ))}
        </Table>
      </>
    );
  }
};

export default RoomResults;
