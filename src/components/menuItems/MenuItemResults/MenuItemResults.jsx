import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import {
  getMenuItems,
  deleteMenuItem,
} from '../../../features/menuItem/menuItemSlice';
import Table from '../../layout/Table/Table';
import TableDataItem from '../../layout/Table/TableDataItem/TableDataItem';
import Spinner from '../../Spinner/Spinner';
import ButtonEdit from '../../layout/Button/ButtonEdit/ButtonEdit';
import Modal from '../../layout/Modal/Modal';

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

  const handleDelete = (menuItemId, menuItemName) => {
    dispatch(deleteMenuItem(menuItemId));
    if (loading) {
      return <Spinner />;
    }

    //After a menu item is deleted, refresh the table to reflect the deletion
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
            'Production Area',
            'Diet Availability',
            'Edit',
            'Delete',
          ]}
          heading='Menu Items'
          refresh={handleRefresh}
        >
          {menuItems.map((menuItem, index) => (
            <React.Fragment key={menuItem._id}>
              <TableDataItem
                navigatePath={`/control-panel/menu-items/${menuItem._id}`}
                dataPoints={[
                  titleCase(menuItem.name),
                  menuItem.productionArea.areaName,
                  menuItem.dietAvailability.map((diet) => diet.name).join(', '),
                ]}
              >
                <td>
                  <ButtonEdit path={menuItem._id} />
                </td>
                <td>
                  <Modal
                    id={`menuItems-${index}`}
                    itemId={menuItem._id}
                    itemName={menuItem.name}
                    onDelete={() => {
                      handleDelete(menuItem._id, menuItem.name);
                      handleRefresh();
                    }}
                    btnDelete
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
