import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { getUnits } from '../../features/unit/unitSlice';
import Table from '../layout/Table/Table';
import TableDataItem from '../layout/Table/TableDataItem/TableDataItem';
import Spinner from '../Spinner/Spinner';
import ButtonMain from '../layout/Button/ButtonMain/ButtonMain';
import Error from '../Error/Error';

import classes from './UnitResults.module.css';

const UnitResults = (props) => {
  const dispatch = useDispatch();

  const { units, loading, isError, message } = useSelector(
    (state) => state.unit
  );
  const [curPage, setCurPage] = useState(1);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    dispatch(getUnits(`limit=${limit}`));
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
          headers={['Unit name', 'Description', '']}
          heading='Units'
          refresh
          refreshDispatch={getUnits}
          createPath='create'
          createAllowedRoles={['admin']}
          limit
          limitValue={limit}
          limitSetLimit={setLimit}
          paginate
          paginateCurPage={curPage}
          paginateSetPage={setCurPage}
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
