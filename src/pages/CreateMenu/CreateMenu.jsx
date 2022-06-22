import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { createMenu } from '../../features/menu/menuSlice';
import { getDiets } from '../../features/diet/dietSlice';
import { getMenuItems } from '../../features/menuItem/menuItemSlice';

import { invalidInput } from '../../components/helperFunctions/helperFunctions';

import Spinner from './../../components/Spinner/Spinner';
import ContainerSideNav from '../../components/layout/ContainerSideNav/ContainerSideNav';
import SideNav from '../../components/layout/SideNav/SideNav';
import FormContainer from '../../components/layout/Form/FormContainer/FormContainer';
import FormGroup from '../../components/layout/Form/FormGroup/FormGroup';
import FormActionBtnContainer from '../../components/layout/Form/FormActionBtnContainer/FormActionBtnContainer';
import ButtonMain from '../../components/layout/Button/ButtonMain/ButtonMain';
import ButtonSecondary from '../../components/layout/Button/ButtonSecondary/ButtonSecondary';
import Modal from '../../components/layout/Modal/Modal';

import classes from './CreateMenu.module.css';

const CreateMenu = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isSuccess, isError, message } = useSelector(
    (state) => state.menu
  );
  const { diets } = useSelector((state) => state.diet);
  const { menuItems } = useSelector((state) => state.menuItem);

  const [firstRender, setfirstRender] = useState(true);
  const [formData, setFormData] = useState({
    day: 'Sunday',
    mealPeriod: 'Breakfast',
    option: 'Cold',
    entree: menuItems && menuItems[0] ? menuItems[0]._id : '',
    dietAvailability: [],
    sides: [],
    dessert: [],
    drinks: [],
    condiments: [],
    createdOn: null,
  });

  const {
    day,
    mealPeriod,
    option,
    entree,
    dietAvailability,
    sides,
    dessert,
    drinks,
    condiments,
  } = formData;

  useEffect(() => {
    dispatch(getDiets());
    dispatch(getMenuItems());
    setfirstRender(false);
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Menu successfully created!');
      navigate('/control-panel/menus');
    }

    if (isError) {
      if (message.keyValue?.mealPeriod) {
        toast.error(
          'A menu already exists for that day, meal period, option, &/or diets'
        );
        invalidInput('mealPeriod');
        invalidInput('day');
      }
      if (message.message) {
        toast.error(message.message);
      }
    }
  }, [isError, isSuccess, message, navigate]);

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

    if (!entree || dietAvailability.length < 1) {
      if (!entree) {
        invalidInput('entree');
        toast.error('An entree is required.');
      }
      if (dietAvailability.length < 1) {
        invalidInput('dietAvailability');
        toast.error('Please select diet availability for this menu');
      }
    } else {
      console.log(formData);
      dispatch(createMenu(formData));
    }
  };

  const openModal = (id) => {
    document.getElementById(id).style.display = 'flex';
  };

  const closeModal = (id) => {
    document.getElementById(id).style.display = 'none';
  };

  const handleCancel = () => {
    closeModal('confirmCancel');
  };

  const handleConfirm = () => {
    navigate('/control-panel/menus');
  };

  if (loading || !diets || !menuItems || firstRender) {
    return <Spinner />;
  } else {
    return (
      <>
        <SideNav />
        <ContainerSideNav>
          <FormContainer
            category='Create Menu'
            title={`${day} ${mealPeriod} : ${option} option`}
            onSubmit={handleSubmit}
          >
            <FormGroup
              id='day'
              inputType='select'
              selectOptions={[
                { value: 'Sunday', label: 'Sunday' },
                { value: 'Monday', label: 'Monday' },
                { value: 'Tuesday', label: 'Tuesday' },
                { value: 'Wednesday', label: 'Wednesday' },
                { value: 'Thursday', label: 'Thursday' },
                { value: 'Friday', label: 'Friday' },
                { value: 'Saturday', label: 'Saturday' },
              ]}
              className='col-12 col-md-6 col-lg-4'
              label='Day'
              value={day}
              onChange={handleChange}
              alwaysEditable
            />
            <FormGroup
              id='mealPeriod'
              inputType='select'
              selectOptions={[
                { value: 'Breakfast', label: 'Breakfast' },
                { value: 'Lunch', label: 'Lunch' },
                { value: 'Dinner', label: 'Dinner' },
              ]}
              className='col-12 col-md-6 col-lg-4'
              label='Meal Period'
              value={mealPeriod}
              onChange={handleChange}
              alwaysEditable
            />
            <FormGroup
              id='option'
              inputType='select'
              selectOptions={[
                { value: 'Hot', label: 'Hot' },
                { value: 'Cold', label: 'Cold' },
              ]}
              className='col-12 col-md-6 col-lg-4'
              label='Option'
              value={option}
              onChange={handleChange}
              alwaysEditable
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
              alwaysEditable
            />
            <FormGroup
              id='entree'
              inputType='select'
              selectOptions={menuItems.flatMap((menuItem) => {
                return menuItem.category === 'entree'
                  ? { value: menuItem._id, label: menuItem.name }
                  : [];
              })}
              label='Entree'
              className='col-12 col-lg-6'
              value={entree}
              onChange={handleChange}
              alwaysEditable
            />
            <FormGroup
              id='sides'
              inputType='checkbox'
              checkboxOptions={menuItems.flatMap((menuItem) => {
                return menuItem.category === 'side'
                  ? { value: menuItem._id, label: menuItem.name }
                  : [];
              })}
              label='Sides'
              className='col-12 col-lg-6'
              value={sides}
              onChange={handleChange}
              alwaysEditable
            />
            <FormGroup
              id='dessert'
              inputType='checkbox'
              checkboxOptions={menuItems.flatMap((menuItem) => {
                return menuItem.category === 'dessert'
                  ? { value: menuItem._id, label: menuItem.name }
                  : [];
              })}
              label='Dessert'
              className='col-12 col-lg-6'
              value={dessert}
              onChange={handleChange}
              alwaysEditable
            />
            <FormGroup
              id='drinks'
              inputType='checkbox'
              checkboxOptions={menuItems.flatMap((menuItem) => {
                return menuItem.category === 'drink'
                  ? { value: menuItem._id, label: menuItem.name }
                  : [];
              })}
              label='Drinks'
              className='col-12 col-lg-6'
              value={drinks}
              onChange={handleChange}
              alwaysEditable
            />
            <FormGroup
              id='condiments'
              inputType='checkbox'
              checkboxOptions={menuItems.flatMap((menuItem) => {
                return menuItem.category === 'condiment'
                  ? { value: menuItem._id, label: menuItem.name }
                  : [];
              })}
              label='Condiments'
              className='col-12 col-lg-6'
              value={condiments}
              onChange={handleChange}
              alwaysEditable
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

export default CreateMenu;
