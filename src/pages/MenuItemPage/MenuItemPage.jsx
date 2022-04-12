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
import ButtonEdit from '../../components/layout/Button/ButtonEdit/ButtonEdit';
import ButtonDelete from '../../components/layout/Button/ButtonDelete/ButtonDelete';
import ButtonMain from '../../components/layout/Button/ButtonMain/ButtonMain';
import ButtonSecondary from '../../components/layout/Button/ButtonSecondary/ButtonSecondary';

import classes from './MenuItemPage.module.css';

const MenuItem = (props) => {
  const dispatch = useDispatch();
  const { menuItem, loading } = useSelector((state) => state.menuItem);

  const [firstRender, setfirstRender] = useState(true);

  const { menuItemId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setfirstRender(false);
    dispatch(getMenuItem(menuItemId));
  }, [dispatch, menuItemId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const category = document.getElementById('Category').value;
    const productionArea = document.getElementById('ProductionArea').value;
    const name = document.getElementById('Name').value;
    const dietAvailability = document.getElementById('DietAvailability').value;
    const portionSize = document.getElementById('PortionSize').value;
    // const category = document.getElementById('Category').value;
    // const category = document.getElementById('Category').value;
    // const category = document.getElementById('Category').value;

    const updatedMenuItem = {
      category,
      productionArea,
      name,
      dietAvailability,
      portionSize,
    };
    console.log(updatedMenuItem);
  };

  const handleCancel = () => {
    setSearchParams();
  };

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
            onSubmit={handleSubmit}
          >
            <FormGroup
              inputType='text'
              className='col-sm-12 col-md-6 col-xl-4'
              label='Category'
              value={menuItem.category}
              editable
            />
            <FormGroup
              inputType='text'
              className='col-sm-12 col-md-6 col-xl-4'
              label='Production Area'
              value={menuItem.productionArea.areaName}
              editable
            />
            <FormGroup
              inputType='text'
              className='col-sm-12 col-md-6 col-xl-4'
              label='Name'
              value={menuItem.name}
              editable
            />
            <FormGroup
              inputType='text'
              className='col-sm-12 col-md-6 col-xl-4'
              label='Diet Availability'
              value={menuItem.dietAvailability
                .map((diet) => diet.name)
                .join(', ')}
              editable
            />
            <FormGroup
              inputType='number'
              className='col-sm-6 col-md-3 col-xl-2'
              label='Portion Size'
              value={menuItem.portionSize}
              editable
            />
            <FormGroup
              inputType='text'
              className='col-sm-6 col-md-3 col-xl-2'
              label='Portion Unit'
              value={menuItem.portionUnit}
              editable
            />
            <FormGroup
              inputType='radio'
              radioName='isLiquid'
              radioOptions={['True', 'False']}
              className='col-sm-12 col-md-6 col-xl-4'
              label='Is Liquid?'
              value={capitalizeWord(menuItem.isLiquid)}
              editable
            />
            <FormGroup
              className='col-sm-12 col-md-6 col-xl-4'
              label='Major Allergens'
              inputType='text'
              value={menuItem.majorAllergens.join(', ')}
              editable
            />
            <FormGroup
              className='col-sm-12 col-md-6 col-xl-4'
              label='Carbs (grams)'
              inputType='number'
              step={10}
              value={menuItem.carbsInGrams}
              editable
            />
            <FormGroup
              className='col-sm-12 col-md-6 col-xl-4'
              label='Sodium (miligrams)'
              inputType='number'
              step={100}
              value={menuItem.sodiumInMG}
              editable
            />
            <FormGroup
              className='col-12'
              label='Description'
              value={menuItem.description}
              editable
              textarea
            />
            <FormGroup
              inputType='text'
              className='col-sm-12 col-md-6 col-xl-4'
              label='Created'
              value={formatDate(menuItem.createdOn)}
            />
            <div className={classes.btnDiv}>
              {searchParams.get('edit') === 'true' ? (
                <>
                  <ButtonMain
                    className='mx-3'
                    text='Submit'
                    type='Submit'
                    onClick={handleSubmit}
                  />
                  <ButtonSecondary
                    className='m-3'
                    text='Cancel'
                    type='Button'
                    onClick={handleCancel}
                  />
                </>
              ) : (
                <>
                  <ButtonEdit className='m-3' />
                  <ButtonDelete
                    className='m-3'
                    text='Delete'
                    type='Button'
                    item={menuItem.name}
                  />
                </>
              )}
            </div>
          </FormContainer>
        </ContainerSideNav>
      </>
    );
  }
};

export default MenuItem;
