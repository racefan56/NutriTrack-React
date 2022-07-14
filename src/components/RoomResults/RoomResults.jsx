import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { getRooms } from '../../features/room/roomSlice';
import { getUnits } from '../../features/unit/unitSlice';
import Table from '../layout/Table/Table';
import TableDataItem from '../layout/Table/TableDataItem/TableDataItem';
import Spinner from '../Spinner/Spinner';
import ButtonMain from '../layout/Button/ButtonMain/ButtonMain';
import Error from '../Error/Error';

const RoomResults = () => {
  const dispatch = useDispatch();

  const { rooms, loading, isError, message } = useSelector(
    (state) => state.room
  );

  const [curPage, setCurPage] = useState(1);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    dispatch(getUnits());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getRooms(`limit=${limit}`));
    if (isError) {
      toast.error(message);
    }
  }, [dispatch, isError, limit, message]);

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
          refresh
          refreshDispatch={getRooms}
          createPath='create'
          createAllowedRoles={['admin']}
          limit
          limitValue={limit}
          limitSetLimit={setLimit}
          paginate
          paginateCurPage={curPage}
          paginateSetPage={setCurPage}
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
