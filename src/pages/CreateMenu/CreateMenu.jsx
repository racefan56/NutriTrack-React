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
import { findAllByDisplayValue } from '@testing-library/react';

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
    isOutOfService: false,
    createdOn: null,
  });

  const [filteredMenuItems, setFilteredMenuItems] = useState(null);

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
    isOutOfService,
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

  useEffect(() => {
    if (dietAvailability.length > 0 && menuItems) {
      const selectedDietIds = dietAvailability.map((diet) => {
        if (typeof diet === 'object') {
          return diet._id;
        } else {
          return diet;
        }
      });

      setFilteredMenuItems(
        menuItems.filter((menuItem) => {
          const menuItemDiets = menuItem.dietAvailability.map(
            (diet) => diet._id
          );

          const menuItemAvailableOnSelectedDiets = selectedDietIds.every(
            (diet) => {
              return menuItemDiets.includes(diet);
            }
          );

          if (menuItemAvailableOnSelectedDiets) {
            return menuItem;
          } else {
            return false;
          }
        })
      );
    }
  }, [dietAvailability, menuItems]);

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

  const noOptionsTemplate = (item) => {
    return `There are currently no ${item} available for the Diet Availability combination you have selected.`;
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
              id='isOutOfService'
              inputType='select'
              selectOptions={[
                { value: true, label: 'True' },
                { value: false, label: 'False' },
              ]}
              className='col-12 col-md-6 col-lg-4'
              label='Out of Service?'
              value={isOutOfService}
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
            {dietAvailability.length > 0 && filteredMenuItems ? (
              <>
                <FormGroup
                  id='entree'
                  inputType='select'
                  selectOptions={filteredMenuItems.flatMap((menuItem) => {
                    return menuItem.category === 'entree'
                      ? { value: menuItem._id, label: menuItem.name }
                      : [];
                  })}
                  label='Entree'
                  noOptionsMessage='-- No options available --'
                  value={entree}
                  onChange={handleChange}
                  alwaysEditable
                />
                <FormGroup
                  id='sides'
                  inputType='checkbox'
                  checkboxOptions={filteredMenuItems.flatMap((menuItem) => {
                    return menuItem.category === 'side'
                      ? { value: menuItem._id, label: menuItem.name }
                      : [];
                  })}
                  label='Sides'
                  className='col-12 col-lg-6'
                  noOptionsMessage={noOptionsTemplate('sides')}
                  value={sides}
                  onChange={handleChange}
                  alwaysEditable
                />
                <FormGroup
                  id='dessert'
                  inputType='checkbox'
                  checkboxOptions={filteredMenuItems.flatMap((menuItem) => {
                    return menuItem.category === 'dessert'
                      ? { value: menuItem._id, label: menuItem.name }
                      : [];
                  })}
                  label='Dessert'
                  className='col-12 col-lg-6'
                  value={dessert}
                  noOptionsMessage={noOptionsTemplate('desserts')}
                  onChange={handleChange}
                  alwaysEditable
                />
                <FormGroup
                  id='drinks'
                  inputType='checkbox'
                  checkboxOptions={filteredMenuItems.flatMap((menuItem) => {
                    return menuItem.category === 'drink'
                      ? { value: menuItem._id, label: menuItem.name }
                      : [];
                  })}
                  label='Drinks'
                  className='col-12 col-lg-6'
                  value={drinks}
                  noOptionsMessage={noOptionsTemplate('drinks')}
                  onChange={handleChange}
                  alwaysEditable
                />
                <FormGroup
                  id='condiments'
                  inputType='checkbox'
                  checkboxOptions={filteredMenuItems.flatMap((menuItem) => {
                    return menuItem.category === 'condiment'
                      ? { value: menuItem._id, label: menuItem.name }
                      : [];
                  })}
                  label='Condiments'
                  className='col-12 col-lg-6'
                  value={condiments}
                  noOptionsMessage={noOptionsTemplate('condiments')}
                  onChange={handleChange}
                  alwaysEditable
                />
              </>
            ) : (
              <></>
            )}

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
