import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { toast } from 'react-toastify';

import { getDiets } from '../../features/diet/dietSlice';
import Table from '../layout/Table/Table';
import TableDataItem from '../layout/Table/TableDataItem/TableDataItem';
import Spinner from '../Spinner/Spinner';
import ButtonMain from '../layout/Button/ButtonMain/ButtonMain';
import Error from '../Error/Error';

const DietResults = () => {
  const dispatch = useDispatch();

  const { diets, loading, isError, message } = useSelector(
    (state) => state.diet
  );

  // set inital page
  const [curPage, setCurPage] = useState(1);
  // set default results per page limit
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    dispatch(getDiets(`limit=${limit}`));
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
          headers={['Diet Name', 'Sodium', 'Carbs', '']}
          heading='Diets'
          refresh
          refreshDispatch={getDiets}
          createPath='create'
          createAllowedRoles={['admin']}
          limit
          limitValue={limit}
          limitSetLimit={setLimit}
          paginate
          paginateCurPage={curPage}
          paginateSetPage={setCurPage}
        >
          {diets.map((diet) => (
            <React.Fragment key={diet._id}>
              <TableDataItem
                navigatePath={`/control-panel/diets/${diet._id}`}
                dataPoints={[diet.name, diet.sodiumInMG, diet.carbsInGrams]}
              >
                <td>
                  <ButtonMain
                    className='m-0'
                    type='Link'
                    path={`${diet._id}`}
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

export default DietResults;
