import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getMenuItem } from '../../features/menuItem/menuItemSlice';

import {
  formatDate,
  capitalizeWord,
  titleCase,
} from './../../components/helperFunctions/helperFunctions';

import Spinner from './../../components/Spinner/Spinner';
import ContainerSideNav from '../../components/layout/ContainerSideNav/ContainerSideNav';
import SideNav from '../../components/layout/SideNav/SideNav';
import DetailCard from '../../components/layout/DetailCard/DetailCard';
import DetailCardGroup from '../../components/layout/DetailCard/DetailCardGroup/DetailCardGroup';

import classes from './MenuItemPage.module.css';

const MenuItem = (props) => {
  console.log(window.location.pathname);
  const dispatch = useDispatch();

  const [firstRender, setfirstRender] = useState(true);

  const { menuItemId } = useParams();

  const { menuItem, loading } = useSelector((state) => state.menuItem);

  useEffect(() => {
    setfirstRender(false);
    dispatch(getMenuItem(menuItemId));
  }, [dispatch, menuItemId]);

  if (loading || firstRender) {
    return <Spinner />;
  } else {
    return (
      <>
        <SideNav />
        <ContainerSideNav>
          <DetailCard
            category={capitalizeWord(menuItem.category)}
            title={titleCase(menuItem.name)}
          >
            <DetailCardGroup
              className='col-12'
              label='Description'
              data={menuItem.description}
            />
            <DetailCardGroup
              className='col-sm-12 col-md-6 col-xl-4'
              label='Diet Availability'
              data={menuItem.dietAvailability
                .map((diet) => diet.name)
                .join(', ')}
            />
            <DetailCardGroup
              className='col-sm-12 col-md-6 col-xl-4'
              label='Production Area'
              data={menuItem.productionArea.areaName}
            />
            <DetailCardGroup
              className='col-sm-12 col-md-6 col-xl-4'
              label='Portion'
              data={menuItem.portionSize + ' ' + menuItem.portionUnit}
            />
            <DetailCardGroup
              className='col-sm-12 col-md-6 col-xl-4'
              label='Carbs'
              data={menuItem.carbsInGrams + 'G'}
            />

            <DetailCardGroup
              className='col-sm-12 col-md-6 col-xl-4'
              label='Liquid'
              data={menuItem.isLiquid.toString().toUpperCase()}
            />
            <DetailCardGroup
              className='col-sm-12 col-md-6 col-xl-4'
              label='Major Allergens'
              data={menuItem.majorAllergens.join(', ')}
            />
            <DetailCardGroup
              className='col-sm-12 col-md-6 col-xl-4'
              label='Sodium'
              data={menuItem.sodiumInMG + 'MG'}
            />

            <DetailCardGroup
              className='col-sm-12 col-md-6 col-xl-4'
              label='Created'
              data={formatDate(menuItem.createdOn)}
            />
          </DetailCard>
        </ContainerSideNav>
      </>
    );
  }
};

export default MenuItem;
