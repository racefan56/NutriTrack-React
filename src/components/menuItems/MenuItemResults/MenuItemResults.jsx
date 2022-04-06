import React, { useEffect } from 'react';
import { getMenuItems } from '../../../features/menuItem/menuItemSlice';
import { useSelector, useDispatch } from 'react-redux';

import Table from '../../layout/Table/Table';
import TableDataItem from '../../layout/Table/TableDataItem/TableDataItem';
import Spinner from '../../Spinner/Spinner';
import ButtonMain from '../../layout/Button/ButtonMain/ButtomMain';
import ButtonSecondary from '../../layout/Button/ButtonSecondary/ButtonSecondary';

import { titleCase } from '../../helperFunctions/helperFunctions';

import classes from './MenuItemResults.module.css';

const MenuItemResults = (props) => {
  const dispatch = useDispatch();

  const { menuItems, loading } = useSelector((state) => state.menuItem);

  useEffect(() => {
    dispatch(getMenuItems());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(getMenuItems());
  };

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <>
        <div className={`row ${classes.headingContainer}`}>
          <div className={`col-9 ${classes.heading}`}>Menu Items</div>
          <div className='col-3'>
            <ButtonMain
              className='m-0'
              text='Refresh'
              onClick={handleRefresh}
            />
          </div>
        </div>
        <Table
          headers={[
            'Name',
            'Production Area',
            'Diet Availability',
            'Edit',
            'Delete',
          ]}
        >
          {menuItems.map((menuItem) => (
            <TableDataItem
              key={menuItem._id}
              navigatePath={`/control-panel/menu-items/${menuItem._id}`}
              dataPoints={[
                titleCase(menuItem.name),
                menuItem.productionArea.areaName,
                menuItem.dietAvailability.map((diet) => diet.name).join(', '),
                <ButtonSecondary
                  type='Link'
                  path={`/control-panel/menu-items/${menuItem._id}/edit`}
                  text='Edit'
                  className='m-0'
                />,
              ]}
            />
          ))}
        </Table>
      </>
    );
  }
};

export default MenuItemResults;
