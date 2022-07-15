import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  getMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from '../../features/menuItem/menuItemSlice';
import { getProductionAreas } from '../../features/productionArea/productionAreaSlice';
import { getDiets } from '../../features/diet/dietSlice';

import {
  formatDate,
  capitalizeWord,
  titleCase,
  formEditMode,
} from './../../components/helperFunctions/helperFunctions';

import Modal from '../../components/layout/Modal/Modal';
import Spinner from './../../components/Spinner/Spinner';
import ContainerSideNav from '../../components/layout/ContainerSideNav/ContainerSideNav';
import SideNav from '../../components/layout/SideNav/SideNav';
import FormContainer from '../../components/layout/Form/FormContainer/FormContainer';
import FormGroup from '../../components/layout/Form/FormGroup/FormGroup';
import FormActionBtnContainer from '../../components/layout/Form/FormActionBtnContainer/FormActionBtnContainer';
import ButtonEdit from '../../components/layout/Button/ButtonEdit/ButtonEdit';
import ButtonMain from '../../components/layout/Button/ButtonMain/ButtonMain';
import ButtonSecondary from '../../components/layout/Button/ButtonSecondary/ButtonSecondary';

const MenuItemPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { menuItem, loading, isSuccess, message, isError } = useSelector(
    (state) => state.menuItem
  );
  const { productionAreas } = useSelector((state) => state.productionArea);
  const { diets } = useSelector((state) => state.diet);
  const { userRole } = useSelector((state) => state.auth);

  const { menuItemId } = useParams();

  const [firstRender, setfirstRender] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    category: 'entree',
    productionArea: null,
    name: '',
    dietAvailability: [],
    portionSize: 0,
    portionUnit: 'each',
    isLiquid: false,
    majorAllergens: [],
    carbsInGrams: 0,
    sodiumInMG: 0,
    description: '',
    isOutOfStock: false,
  });

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
    isOutOfStock,
  } = formData;

  useEffect(() => {
    setfirstRender(false);
    if (menuItemId) {
      dispatch(getMenuItem(menuItemId));
    }
    dispatch(getDiets());
    dispatch(getProductionAreas());
  }, [dispatch, menuItemId]);

  useEffect(() => {
    if (menuItem) {
      setFormData({ ...menuItem });
    }
  }, [menuItem]);

  useEffect(() => {
    formEditMode(editMode);
  }, [editMode]);

  useEffect(() => {
    if (isSuccess && menuItem) {
      toast.success('Room successfully updated!');
      navigate('/control-panel/rooms');
    }

    if (isSuccess && !menuItem) {
      toast.success('Room successfully deleted!');
      navigate('/control-panel/rooms');
    }

    if (isError) {
      if (message?.message) {
        toast.error(message.message);
      } else {
        toast.error(message);
      }
    }
  }, [isError, isSuccess, message, navigate, menuItem]);

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

    dispatch(updateMenuItem([menuItemId, formData]));
    setEditMode(false);
    if (isSuccess) {
      toast.success('Menu item successfully updated!');
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    //Reset menu item fields back to their original values
    setFormData({ ...menuItem });
  };

  const handleDelete = (menuItemId) => {
    dispatch(deleteMenuItem(menuItemId));
  };

  if (loading || firstRender || !menuItem || !productionAreas || !diets) {
    return <Spinner />;
  } else {
    return (
      <>
        <SideNav />
        <ContainerSideNav>
          <FormContainer
            category={capitalizeWord(menuItem ? menuItem.category : 'New Item')}
            title={titleCase(menuItem ? menuItem.name : '')}
            onSubmit={handleSubmit}
          >
            <FormGroup
              id='name'
              inputType='text'
              className='col-12 col-md-6'
              label='Name'
              value={name}
              onChange={handleChange}
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
              className='col-12 col-md-6'
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
              className='col-12 col-md-6'
              value={productionArea ? productionArea._id : ''}
              onChange={handleChange}
              editable
            />
            <FormGroup
              id='isOutOfStock'
              inputType='select'
              selectOptions={[
                { value: true, label: 'True' },
                { value: false, label: 'False' },
              ]}
              className='col-12 col-md-6'
              label='Out of Stock?'
              value={isOutOfStock}
              onChange={handleChange}
              editable
            />
            <FormGroup
              id='description'
              className='col-12'
              label='Description'
              value={description}
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

            <FormGroup
              id='createdAt'
              inputType='text'
              className='col-12 col-xl-6'
              label='Created'
              defaultValue={formatDate(menuItem ? menuItem.createdAt : '')}
              readonly
            />

            {userRole === 'admin' || userRole === 'dietitian' ? (
              editMode ? (
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
                    id={menuItemId}
                    itemId={menuItemId}
                    itemName={menuItem.name}
                    onDelete={() => {
                      handleDelete(menuItemId, menuItem.name);
                    }}
                    btnDelete
                  />
                </FormActionBtnContainer>
              )
            ) : (
              <></>
            )}
          </FormContainer>
        </ContainerSideNav>
      </>
    );
  }
};

export default MenuItemPage;
