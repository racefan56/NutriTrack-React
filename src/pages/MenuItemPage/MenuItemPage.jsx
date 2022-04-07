import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';

import { getMenuItem } from '../../features/menuItem/menuItemSlice';

import {
  formatDate,
  capitalizeWord,
  titleCase,
} from './../../components/helperFunctions/helperFunctions';

import Spinner from './../../components/Spinner/Spinner';
import ContainerSideNav from '../../components/layout/ContainerSideNav/ContainerSideNav';
import SideNav from '../../components/layout/SideNav/SideNav';
import FormContainer from '../../components/layout/Form/FormContainer/FormContainer';
import FormGroup from '../../components/layout/Form/FormGroup/FormGroup';

import classes from './MenuItemPage.module.css';

const MenuItem = (props) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams({});
  const [firstRender, setfirstRender] = useState(true);

  console.log(searchParams.get('edit'));

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
          <FormContainer
            category={capitalizeWord(menuItem.category)}
            title={titleCase(menuItem.name)}
          >
            <FormGroup
              className='col-12'
              label='Description'
              data={menuItem.description}
            />
            <FormGroup
              className='col-sm-12 col-md-6 col-xl-4'
              label='Diet Availability'
              data={menuItem.dietAvailability
                .map((diet) => diet.name)
                .join(', ')}
            />
            <FormGroup
              className='col-sm-12 col-md-6 col-xl-4'
              label='Production Area'
              data={menuItem.productionArea.areaName}
            />
            <FormGroup
              className='col-sm-12 col-md-6 col-xl-4'
              label='Portion'
              data={menuItem.portionSize + ' ' + menuItem.portionUnit}
            />
            <FormGroup
              className='col-sm-12 col-md-6 col-xl-4'
              label='Carbs'
              data={menuItem.carbsInGrams + 'G'}
            />

            <FormGroup
              className='col-sm-12 col-md-6 col-xl-4'
              label='Liquid'
              data={menuItem.isLiquid.toString().toUpperCase()}
            />
            <FormGroup
              className='col-sm-12 col-md-6 col-xl-4'
              label='Major Allergens'
              data={menuItem.majorAllergens.join(', ')}
            />
            <FormGroup
              className='col-sm-12 col-md-6 col-xl-4'
              label='Sodium'
              data={menuItem.sodiumInMG + 'MG'}
            />

            <FormGroup
              className='col-sm-12 col-md-6 col-xl-4'
              label='Created'
              data={formatDate(menuItem.createdOn)}
            />
          </FormContainer>
        </ContainerSideNav>
      </>
    );
  }
};

export default MenuItem;
