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
import FormContainer from '../../components/layout/Form/FormContainer/FormContainer';
import FormGroup from '../../components/layout/Form/FormGroup/FormGroup';

import classes from './MenuItemPage.module.css';

const MenuItem = (props) => {
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
          <FormContainer
            category={capitalizeWord(menuItem.category)}
            title={titleCase(menuItem.name)}
          >
            <FormGroup
              inputType='text'
              className='col-sm-12 col-md-6 col-xl-4'
              label='Category'
              data={menuItem.category}
              editable
            />
            <FormGroup
              inputType='text'
              className='col-sm-12 col-md-6 col-xl-4'
              label='Production Area'
              data={menuItem.productionArea.areaName}
              editable
            />
            <FormGroup
              inputType='text'
              className='col-sm-12 col-md-6 col-xl-4'
              label='Name'
              data={menuItem.name}
              editable
            />
            <FormGroup
              inputType='text'
              className='col-sm-12 col-md-6 col-xl-4'
              label='Diet Availability'
              data={menuItem.dietAvailability
                .map((diet) => diet.name)
                .join(', ')}
              editable
            />
            <FormGroup
              inputType='number'
              className='col-sm-6 col-md-3 col-xl-2'
              label='Portion Size'
              data={menuItem.portionSize}
              editable
            />
            <FormGroup
              inputType='text'
              className='col-sm-6 col-md-3 col-xl-2'
              label='Portion Unit'
              data={menuItem.portionUnit}
              editable
            />
            <FormGroup
              inputType='radio'
              radioName='isLiquid'
              radioOptions={['True', 'False']}
              className='col-sm-12 col-md-6 col-xl-4'
              label='Is Liquid?'
              data={capitalizeWord(menuItem.isLiquid)}
              editable
            />
            <FormGroup
              className='col-sm-12 col-md-6 col-xl-4'
              label='Major Allergens'
              inputType='text'
              data={menuItem.majorAllergens.join(', ')}
              editable
            />
            <FormGroup
              className='col-sm-12 col-md-6 col-xl-4'
              label='Carbs (grams)'
              inputType='number'
              step={10}
              data={menuItem.carbsInGrams}
              editable
            />
            <FormGroup
              className='col-sm-12 col-md-6 col-xl-4'
              label='Sodium (miligrams)'
              inputType='number'
              step={100}
              data={menuItem.sodiumInMG}
              editable
            />
            <FormGroup
              className='col-12'
              label='Description'
              data={menuItem.description}
              editable
              textarea
            />
            <FormGroup
              inputType='text'
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
