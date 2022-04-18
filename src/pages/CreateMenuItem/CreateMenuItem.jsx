import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { createMenuItem } from '../../features/menuItem/menuItemSlice';
import { getProductionAreas } from '../../features/productionArea/productionAreaSlice';
import { getDiets } from '../../features/diet/dietSlice';

import {
  formatDate,
  capitalizeWord,
  titleCase,
  formEditMode,
} from './../../components/helperFunctions/helperFunctions';

import Spinner from './../../components/Spinner/Spinner';
import ContainerSideNav from '../../components/layout/ContainerSideNav/ContainerSideNav';
import SideNav from '../../components/layout/SideNav/SideNav';
import FormContainer from '../../components/layout/Form/FormContainer/FormContainer';
import FormGroup from '../../components/layout/Form/FormGroup/FormGroup';
import ButtonMain from '../../components/layout/Button/ButtonMain/ButtonMain';
import ButtonSecondary from '../../components/layout/Button/ButtonSecondary/ButtonSecondary';

import classes from './CreateMenuItem.module.css';

const CreateMenuItem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  formEditMode(true);

  const { loading, isError, message } = useSelector((state) => state.menuItem);
  const { productionAreas } = useSelector((state) => state.productionArea);
  const { diets } = useSelector((state) => state.diet);

  const initialFormState = {
    category: 'entree',
    productionArea: productionAreas[0] ? productionAreas[0]._id : '',
    name: '',
    dietAvailability: [],
    portionSize: 0,
    portionUnit: 'each',
    isLiquid: false,
    majorAllergens: [],
    carbsInGrams: 0,
    sodiumInMG: 0,
    description: '',
  };

  const [firstRender, setfirstRender] = useState(true);
  const [formData, setFormData] = useState(initialFormState);

  const {
    category,
    productionArea,
    name,
    dietAvailability,
    portionSize,
    portionUnit,
    isLiquid,
    majorAllergens,
    carbsInGrams,
    sodiumInMG,
    description,
  } = formData;

  useEffect(() => {
    dispatch(getDiets());
    dispatch(getProductionAreas());
    setfirstRender(false);
  }, [dispatch]);

  const handleChange = (e) => {
    const key = e.target.id;
    if (e.target.type === 'checkbox') {
      const checked = Array.from(
        document.querySelectorAll(`input[type=checkbox][name=${key}]:checked`),
        (e) => e.value
      );
      return setFormData((prevState) => ({
        ...prevState,
        [key]: [...checked],
      }));
    }

    setFormData((prevState) => ({ ...prevState, [key]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createMenuItem(formData));

    if (loading) {
      return <Spinner />;
    }

    if (isError) {
      toast.error(message);
      navigate('/control-panel/menu-items/create');
    } else {
      toast.success('Menu item successfully created!');
      navigate('/control-panel/menu-items');
    }
  };

  const handleCancel = () => {
    //Reset menu item fields back to their original values
    setFormData({ ...initialFormState });
  };

  if (loading || firstRender) {
    return <Spinner />;
  } else {
    return (
      <>
        <SideNav />
        <ContainerSideNav>
          <FormContainer
            title={titleCase('Create Menu Item')}
            onSubmit={handleSubmit}
          >
            <FormGroup
              id='name'
              inputType='text'
              className='col-12 col-lg-6'
              label='Name'
              value={name}
              onChange={handleChange}
              placeholder='Enter item name'
              editable
            />
            <FormGroup
              id='category'
              inputType='select'
              selectOptions={[
                { value: 'entree', label: 'entree' },
                { value: 'side', label: 'side' },
                { value: 'drink', label: 'drink' },
                { value: 'dessert', label: 'dessert' },
                { value: 'condiment', label: 'condiment' },
                { value: 'supplement', label: 'supplement' },
              ]}
              label='Category'
              className='col-12 col-md-6 col-lg-3'
              value={category}
              onChange={handleChange}
              editable
            />
            <FormGroup
              id='productionArea'
              inputType='select'
              selectOptions={productionAreas.map((area) => {
                return { value: area._id, label: area.areaName };
              })}
              label='Production Area'
              className='col-12 col-md-6 col-lg-3'
              value={productionArea}
              onChange={handleChange}
              editable
            />
            <FormGroup
              id='description'
              className='col-12'
              label='Description'
              value={description}
              placeholder='Description...'
              onChange={handleChange}
              editable
              textarea
            />
            <FormGroup
              id='dietAvailability'
              inputType='checkbox'
              checkboxOptions={diets.map((diet) => {
                return { value: diet._id, label: diet.name };
              })}
              label='Diet Availability'
              className='col-12 col-lg-6'
              value={dietAvailability.map((diet) => {
                return diet._id;
              })}
              onChange={handleChange}
              editable
            />
            <FormGroup
              id='majorAllergens'
              inputType='checkbox'
              checkboxOptions={[
                { value: 'milk', label: 'milk' },
                { value: 'eggs', label: 'eggs' },
                { value: 'fish', label: 'fish' },
                { value: 'shellfish', label: 'shellfish' },
                { value: 'tree nuts', label: 'tree nuts' },
                { value: 'peanuts', label: 'peanuts' },
                { value: 'wheat', label: 'wheat' },
                { value: 'soybean', label: 'soybean' },
              ]}
              label='Major Allergens'
              className='col-12 col-lg-6'
              value={majorAllergens}
              onChange={handleChange}
              editable
            />
            <FormGroup
              id='portionSize'
              inputType='number'
              className='col-sm-6 col-lg-4 col-xl-4'
              label='Portion Size'
              value={portionSize}
              onChange={handleChange}
              editable
            />
            <FormGroup
              id='portionUnit'
              inputType='select'
              selectOptions={[
                { value: 'each', label: 'each' },
                { value: 'cup', label: 'cup' },
                { value: 'ounce', label: 'ounce' },
              ]}
              label='Portion Unit'
              className='col-sm-6 col-lg-4 col-xl-4'
              value={portionUnit}
              onChange={handleChange}
              editable
            />
            <FormGroup
              id='isLiquid'
              inputType='select'
              selectOptions={[
                { value: 'true', label: 'true' },
                { value: 'false', label: 'false' },
              ]}
              label='Is Liquid'
              className='col-12 col-lg-4 col-xl-4'
              value={isLiquid}
              onChange={handleChange}
              editable
            />
            <FormGroup
              id='carbsInGrams'
              className='col-12 col-lg-6 col-xl-3'
              label='Carbs (grams)'
              inputType='number'
              step={10}
              value={carbsInGrams}
              onChange={handleChange}
              editable
            />
            <FormGroup
              id='sodiumInMG'
              className='col-12 col-lg-6 col-xl-3'
              label='Sodium (miligrams)'
              inputType='number'
              step={100}
              value={sodiumInMG}
              onChange={handleChange}
              editable
            />
            <div className={classes.btnDiv}>
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
            </div>
          </FormContainer>
        </ContainerSideNav>
      </>
    );
  }
};

export default CreateMenuItem;
