import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  getMenu,
  createMenu,
  deleteMenu,
  updateMenu,
} from '../../features/menu/menuSlice';
import { getDiets } from '../../features/diet/dietSlice';
import { getMenuItems } from '../../features/menuItem/menuItemSlice';

import {
  formEditMode,
  invalidInput,
} from '../../components/helperFunctions/helperFunctions';

import Spinner from './../../components/Spinner/Spinner';
import ContainerSideNav from '../../components/layout/ContainerSideNav/ContainerSideNav';
import SideNav from '../../components/layout/SideNav/SideNav';
import FormContainer from '../../components/layout/Form/FormContainer/FormContainer';
import FormGroup from '../../components/layout/Form/FormGroup/FormGroup';
import FormActionBtnContainer from '../../components/layout/Form/FormActionBtnContainer/FormActionBtnContainer';
import ButtonMain from '../../components/layout/Button/ButtonMain/ButtonMain';
import ButtonSecondary from '../../components/layout/Button/ButtonSecondary/ButtonSecondary';
import ButtonEdit from '../../components/layout/Button/ButtonEdit/ButtonEdit';
import Modal from '../../components/layout/Modal/Modal';

import classes from './Menu.module.css';

const Menu = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { menuId } = useParams();

  const { menu, loading, isSuccess, isError, message } = useSelector(
    (state) => state.menu
  );
  const { diets } = useSelector((state) => state.diet);
  const { menuItems } = useSelector((state) => state.menuItem);

  const [editMode, setEditMode] = useState(false);
  const [firstRender, setfirstRender] = useState(true);
  const [formData, setFormData] = useState({
    day: 'Sunday',
    mealPeriod: 'Breakfast',
    option: 'Cold',
    entree: {},
    dietAvailability: [],
    sides: [],
    dessert: [],
    drinks: [],
    condiments: [],
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
  } = formData;
  useEffect(() => {
    if (menu) {
      setFormData({ ...menu });
    }
  }, [menu]);

  useEffect(() => {
    formEditMode(editMode);
    // When the filteredMenuItems change, rerun the formEditMode check. Otherwise, checkbox fields will be disabled by default when readded
  }, [editMode, filteredMenuItems]);

  useEffect(() => {
    if (menu) {
      if (editMode && dietAvailability !== menu.dietAvailability) {
        setFormData((prevState) => ({
          ...prevState,
          sides: [],
          dessert: [],
          drinks: [],
          condiments: [],
          entree: {},
        }));
      }
    }
  }, [dietAvailability, editMode, menu]);

  useEffect(() => {
    dispatch(getDiets());
    dispatch(getMenuItems());
    dispatch(getMenu(menuId));
    setfirstRender(false);
  }, [dispatch, menuId]);

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

  useEffect(() => {
    if (isSuccess && menu) {
      toast.success('Menu successfully updated!');
      navigate('/control-panel/menus');
    }

    if (isSuccess && !menu) {
      toast.success('Menu successfully deleted!');
      navigate('/control-panel/menus');
    }

    if (isError) {
      setEditMode(true);
      if (message && message.keyValue?.mealPeriod) {
        toast.error(
          'A menu already exists for that day, meal period, option, &/or diets'
        );
        invalidInput('mealPeriod');
        invalidInput('day');
      }
      if (message && message.message) {
        toast.error(message.message);
      } else {
        toast.error('Something went wrong. Please try again later.');
      }
    }
  }, [isError, isSuccess, menu, message, navigate]);

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

  const handleEdit = () => {
    setEditMode(true);
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
      dispatch(updateMenu([menuId, formData]));
    }
  };

  const handleDelete = (menuId) => {
    dispatch(deleteMenu(menuId));
    //After a menu is deleted, return to menus page
    if (isSuccess) {
      navigate('/control-panel/menus');
      toast.success('Menu successfully deleted!');
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    //Reset menu item fields back to their original values
    setFormData({ ...menu });
  };

  if (loading || !diets || !filteredMenuItems || !menu || firstRender) {
    return <Spinner />;
  } else {
    return (
      <>
        <SideNav />
        <ContainerSideNav>
          <FormContainer
            category='Menu'
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
              editable
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
              editable
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
              editable
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
              id='entree'
              inputType='select'
              selectOptions={filteredMenuItems.flatMap((menuItem) => {
                return menuItem.category === 'entree'
                  ? { value: menuItem._id, label: menuItem.name }
                  : [];
              })}
              label='Entree'
              className='col-12 col-lg-6'
              value={entree}
              onChange={handleChange}
              editable
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
              value={sides.map((side) => {
                return side._id;
              })}
              onChange={handleChange}
              editable
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
              value={dessert.map((item) => {
                return item._id;
              })}
              onChange={handleChange}
              editable
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
              value={drinks.map((drink) => {
                return drink._id;
              })}
              onChange={handleChange}
              editable
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
              value={condiments.map((condiment) => {
                return condiment._id;
              })}
              onChange={handleChange}
              editable
            />

            {editMode ? (
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
                  onClick={handleCancel}
                />
              </FormActionBtnContainer>
            ) : (
              <FormActionBtnContainer>
                <ButtonEdit onClick={handleEdit} />
                <Modal
                  id={menuId}
                  itemName={`${menu.day} ${menu.mealPeriod} ${menu.option} option`}
                  onDelete={() => {
                    handleDelete(menuId);
                  }}
                  btnDelete
                />
              </FormActionBtnContainer>
            )}
          </FormContainer>
        </ContainerSideNav>
      </>
    );
  }
};

export default Menu;
