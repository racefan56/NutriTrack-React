import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { getUnits } from '../../features/unit/unitSlice';
import Table from '../layout/Table/Table';
import TableDataItem from '../layout/Table/TableDataItem/TableDataItem';
import Spinner from '../Spinner/Spinner';
import ButtonMain from '../layout/Button/ButtonMain/ButtonMain';

import classes from './UnitResults.module.css';

const UnitResults = (props) => {
  const dispatch = useDispatch();

  const { units, loading, isError, message } = useSelector(
    (state) => state.unit
  );

  useEffect(() => {
    dispatch(getUnits());
    if (isError) {
      toast.error(message);
    }
  }, [dispatch, isError, message]);

  const handleRefresh = () => {
    dispatch(getUnits());
  };

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <>
        <Table
          headers={['Unit name', 'Description', '']}
          heading='Units'
          refresh={handleRefresh}
          createPath='create'
        >
          {units.map((unit, index) => (
            <React.Fragment key={unit._id}>
              <TableDataItem
                navigatePath={`/control-panel/units/${unit._id}`}
                dataPoints={[unit.unitName.toUpperCase(), unit.description]}
              >
                <td>
                  <ButtonMain
                    className='m-0'
                    type='Link'
                    path={`${unit._id}`}
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

export default UnitResults;
