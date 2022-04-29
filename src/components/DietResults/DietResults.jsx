import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { getDiets } from '../../features/diet/dietSlice';
import Table from '../layout/Table/Table';
import TableDataItem from '../layout/Table/TableDataItem/TableDataItem';
import Spinner from '../Spinner/Spinner';
import ButtonMain from '../layout/Button/ButtonMain/ButtonMain';

import classes from './DietResults.module.css';

const DietResults = (props) => {
  const dispatch = useDispatch();

  const { diets, loading, isError, message } = useSelector(
    (state) => state.diet
  );

  useEffect(() => {
    dispatch(getDiets());
    if (isError) {
      toast.error(message);
    }
  }, [dispatch, isError, message]);

  const handleRefresh = () => {
    dispatch(getDiets());
  };

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <>
        <Table
          headers={['Diet Name', 'Sodium', 'Carbs', '']}
          heading='Diets'
          refresh={handleRefresh}
          createPath='create'
        >
          {diets.map((diet, index) => (
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
