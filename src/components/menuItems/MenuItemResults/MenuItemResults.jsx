import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { getMenuItems } from '../../../features/menuItem/menuItemSlice';
import Table from '../../layout/Table/Table';
import TableDataItem from '../../layout/Table/TableDataItem/TableDataItem';
import Spinner from '../../Spinner/Spinner';
import ButtonSecondary from '../../layout/Button/ButtonSecondary/ButtonSecondary';
import ButtonMain from '../../layout/Button/ButtonMain/ButtonMain';

import { titleCase } from '../../helperFunctions/helperFunctions';

import classes from './MenuItemResults.module.css';

const MenuItemResults = (props) => {
  const dispatch = useDispatch();

  const { menuItems, loading, isError, message } = useSelector(
    (state) => state.menuItem
  );

  useEffect(() => {
    dispatch(getMenuItems());
    if (isError) {
      toast.error(message);
    }
  }, [dispatch, isError, message]);

  const handleRefresh = () => {
    dispatch(getMenuItems());
  };

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <>
        <Table
          headers={[
            'Name',
            'Category',
            <abbr title='Production Area'>Prod. Area</abbr>,
            'Diets',
            '',
          ]}
          heading='Menu Items'
          refresh={handleRefresh}
          createPath='create'
        >
          {menuItems.map((menuItem, index) => (
            <React.Fragment key={menuItem._id}>
              <TableDataItem
                navigatePath={`/control-panel/menu-items/${menuItem._id}`}
                dataPoints={[
                  titleCase(menuItem.name),
                  menuItem.category,
                  menuItem.productionArea.areaName,
                  menuItem.dietAvailability.map((diet) => diet.name).join(', '),
                ]}
              >
                <td>
                  <ButtonMain
                    className='m-0'
                    type='Link'
                    path={`${menuItem._id}`}
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

export default MenuItemResults;
