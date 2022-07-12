import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { getRooms } from '../../features/room/roomSlice';
import Table from '../layout/Table/Table';
import TableDataItem from '../layout/Table/TableDataItem/TableDataItem';
import Spinner from '../Spinner/Spinner';
import ButtonMain from '../layout/Button/ButtonMain/ButtonMain';
import Error from '../Error/Error';

import classes from './RoomResults.module.css';
import { getUnits } from '../../features/unit/unitSlice';

const RoomResults = (props) => {
  const dispatch = useDispatch();

  const { rooms, loading, isError, message } = useSelector(
    (state) => state.room
  );
  const { units } = useSelector((state) => state.unit);

  const [curPage, setCurPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [formData, setFormData] = useState({
    unit: '',
  });
  const [unitValuesLabels, setUnitValuesLabels] = useState([]);

  const { unit } = formData;

  useEffect(() => {
    dispatch(getUnits());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getRooms(`limit=${limit}`));
    if (isError) {
      toast.error(message);
    }
  }, [dispatch, isError, limit, message]);

  useEffect(() => {
    if (units) {
      const data = units.map((unit) => {
        return { value: unit.unitName, label: unit.unitName };
      });
      data.unshift({ value: '', label: 'All' });
      setUnitValuesLabels(data);
    }
  }, [units]);

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
