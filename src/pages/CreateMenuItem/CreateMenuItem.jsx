import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { createMenuItem } from '../../features/menuItem/menuItemSlice';
import { getProductionAreas } from '../../features/productionArea/productionAreaSlice';
import { getDiets } from '../../features/diet/dietSlice';

import {
  titleCase,
  formEditMode,
  invalidInput,
} from './../../components/helperFunctions/helperFunctions';

import Spinner from './../../components/Spinner/Spinner';
import ContainerSideNav from '../../components/layout/ContainerSideNav/ContainerSideNav';
import SideNav from '../../components/layout/SideNav/SideNav';
import FormContainer from '../../components/layout/Form/FormContainer/FormContainer';
import FormGroup from '../../components/layout/Form/FormGroup/FormGroup';
import FormActionBtnContainer from '../../components/layout/Form/FormActionBtnContainer/FormActionBtnContainer';
import ButtonMain from '../../components/layout/Button/ButtonMain/ButtonMain';
import ButtonSecondary from '../../components/layout/Button/ButtonSecondary/ButtonSecondary';
import Modal from '../../components/layout/Modal/Modal';

import classes from './CreateMenuItem.module.css';

const CreateMenuItem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  formEditMode(true);

  const { loading, isError, isSuccess, message } = useSelector(
    (state) => state.menuItem
  );
  const { productionAreas } = useSelector((state) => state.productionArea);
  const { diets } = useSelector((state) => state.diet);

  const initialFormState = {
    category: 'entree',
    productionArea: productionAreas[0] ? productionAreas[0]._id : '',
    name: '',
    dietAvailability: [],
    portionSize: 1,
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
  }, [dispatch, productionAreas]);

  useEffect(() => {
    if (productionAreas[0]) {
      setFormData({ ...formData, productionArea: productionAreas[0]._id });
    }
  }, [productionAreas]);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Menu item successfully created!');
      navigate('/control-panel/menu-items');
    }

    if (isError) {
      if (message.keyValue?.name) {
        toast.error('That name is already taken.');
      }
      if (message.message) {
        toast.error(message.message);
      } else {
        toast.error(message);
      }
    }
  }, [isError, isSuccess, message, navigate]);

  const openModal = (id) => {
    document.getElementById(id).style.display = 'flex';
  };

  const closeModal = (id) => {
    document.getElementById(id).style.display = 'none';
  };

  const handleChange = (e) => {
    const key = e.target.id;

    //remove inline style added to invalid inputs on submit attempts when edited
    if (e.target.style) {
      e.target.removeAttribute('style');
    }

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

    console.log(formData);
    if (
      name < 1 ||
      description.length < 1 ||
      dietAvailability.length < 1 ||
      portionSize <= 0
    ) {
      if (name.length < 1) {
        invalidInput('name');
        toast.error('Item name is required.');
      }
      if (description.length < 3) {
        invalidInput('description');
        toast.error('Item description is required.');
      }
      if (dietAvailability.length < 1) {
        invalidInput('dietAvailability');
        toast.error('Diet availability is required.');
      }
      if (portionSize <= 0) {
        invalidInput('portionSize');
        toast.error('Portion size must be greater than 0');
      }
    } else {
      dispatch(createMenuItem(formData));
    }
  };

  const handleCancel = () => {
    closeModal('confirmCancel');
  };

  const handleConfirm = () => {
    navigate('/control-panel/menu-items');
  };

  if (loading || firstRender || !productionAreas) {
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
            <FormActionBtnContainer>
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
                onClick={() => openModal('confirmCancel')}
              />
              <Modal
                heading='Are you sure?'
                message='Any unsaved changes will be lost.'
                id='confirmCancel'
                handleCancel={handleCancel}
                handleConfirm={handleConfirm}
              />
            </FormActionBtnContainer>
          </FormContainer>
        </ContainerSideNav>
      </>
    );
  }
};

export default CreateMenuItem;
