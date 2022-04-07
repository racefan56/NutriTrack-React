import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSearchParams, useNavigate } from 'react-router-dom';

import { getMenuItems } from '../../../features/menuItem/menuItemSlice';
import Table from '../../layout/Table/Table';
import TableDataItem from '../../layout/Table/TableDataItem/TableDataItem';
import Spinner from '../../Spinner/Spinner';
import ButtonSecondary from '../../layout/Button/ButtonSecondary/ButtonSecondary';
import ButtonDelete from '../../layout/Button/ButtonDelete/ButtonDelete';

import { titleCase } from '../../helperFunctions/helperFunctions';

import classes from './MenuItemResults.module.css';

const MenuItemResults = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { menuItems, loading } = useSelector((state) => state.menuItem);

  useEffect(() => {
    dispatch(getMenuItems());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(getMenuItems());
  };

  const editMenuItem = (menuItemId) => {
    console.log(menuItemId);
    return navigate({
      pathname: `${menuItemId}`,
      search: createSearchParams({ edit: 'true' }).toString(),
    });
  };

  const deleteMenuItem = () => {
    console.log('CLOCKED!');
  };

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <>
        <Table
          headers={[
            'Name',
            'Production Area',
            'Diet Availability',
            'Edit',
            'Delete',
          ]}
          heading='Menu Items'
          refresh={handleRefresh}
        >
          {menuItems.map((menuItem) => (
            <TableDataItem
              key={menuItem._id}
              navigatePath={`/control-panel/menu-items/${menuItem._id}`}
              dataPoints={[
                titleCase(menuItem.name),
                menuItem.productionArea.areaName,
                menuItem.dietAvailability.map((diet) => diet.name).join(', '),
              ]}
            >
              <td onClick={() => editMenuItem(menuItem._id)}>
                <ButtonSecondary text='Edit' />
              </td>
              <td onClick={() => deleteMenuItem(menuItem._id)}>
                <ButtonDelete text='Delete' className={classes.deleteBtn} />
              </td>
            </TableDataItem>
          ))}
        </Table>
      </>
    );
  }
};

export default MenuItemResults;
