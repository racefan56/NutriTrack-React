import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { getMenus } from '../../features/menu/menuSlice';
import Table from '../layout/Table/Table';
import TableDataItem from '../layout/Table/TableDataItem/TableDataItem';
import Spinner from '../Spinner/Spinner';
import ButtonMain from '../layout/Button/ButtonMain/ButtonMain';
import Error from '../Error/Error';

import classes from './MenuResults.module.css';

const MenuResults = (props) => {
  const dispatch = useDispatch();

  const { menus, loading, isError, message } = useSelector(
    (state) => state.menu
  );

  useEffect(() => {
    dispatch(getMenus());
    if (isError) {
      toast.error(message);
    }
  }, [dispatch, isError, message]);

  const handleRefresh = () => {
    dispatch(getMenus());
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
          headers={['Day', 'Meal Period', 'Option', 'Diets', '']}
          heading='Menus'
          refresh={handleRefresh}
          createPath='create'
        >
          {menus.map((menu, index) => (
            <React.Fragment key={menu._id}>
              <TableDataItem
                navigatePath={`/control-panel/menus/${menu._id}`}
                dataPoints={[
                  menu.day,
                  menu.mealPeriod,
                  menu.option,
                  menu.dietAvailability
                    .map((diet) => {
                      return diet.name;
                    })
                    .toString(),
                ]}
              >
                <td>
                  <ButtonMain
                    className='m-0'
                    type='Link'
                    path={`${menu._id}`}
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

export default MenuResults;
