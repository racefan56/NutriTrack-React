import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  getMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from '../../features/menuItem/menuItemSlice';

import {
  formatDate,
  capitalizeWord,
  titleCase,
  formEditMode,
} from './../../components/helperFunctions/helperFunctions';

import DeleteModal from '../../components/layout/Modal/DeleteModal/DeleteModal';
import Spinner from './../../components/Spinner/Spinner';
import ContainerSideNav from '../../components/layout/ContainerSideNav/ContainerSideNav';
import SideNav from '../../components/layout/SideNav/SideNav';
import FormContainer from '../../components/layout/Form/FormContainer/FormContainer';
import FormGroup from '../../components/layout/Form/FormGroup/FormGroup';
import ButtonEdit from '../../components/layout/Button/ButtonEdit/ButtonEdit';
import ButtonMain from '../../components/layout/Button/ButtonMain/ButtonMain';
import ButtonSecondary from '../../components/layout/Button/ButtonSecondary/ButtonSecondary';

import classes from './MenuItemPage.module.css';

const MenuItem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { menuItem, loading, isSuccess } = useSelector((state) => state.menuItem);

  const { menuItemId } = useParams();

  const [firstRender, setfirstRender] = useState(true);

  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    category: '',
    productionArea: '',
    name: '',
    dietAvailability: [],
    portionSize: 0,
    portionUnit: '',
    isLiquid: false,
    majorAllergens: [],
    carbsInGrams: 0,
    sodiumInMG: 0,
    description: '',
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
  } = formData;

  useEffect(() => {
    setfirstRender(false);
    dispatch(getMenuItem(menuItemId));
  }, [dispatch, menuItemId]);

  useEffect(() => {
    if (menuItem) {
      setFormData({ ...menuItem });
    }
  }, [menuItem]);

  useEffect(() => {
    formEditMode(editMode);
  }, [editMode]);

  const handleChange = (e) => {
    const key = e.target.id;
    setFormData((prevState) => ({ ...prevState, [key]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateMenuItem([menuItemId, formData]));
    setEditMode(false);
    if(isSuccess) {
      toast.success('Menu item successfully updated!')
    }
  };

  const handleEdit = () => {
    setEditMode(true);
    navigate(`/control-panel/menu-items/${menuItemId}/edit`);
  };

  const handleCancel = () => {
    setEditMode(false);
    navigate(`/control-panel/menu-items/${menuItemId}`);
  };

  const handleDelete = (menuItemId) => {
    dispatch(deleteMenuItem(menuItemId));

    //After a menu item is deleted, return to menuItems page
    navigate('/control-panel/menu-items');
    if(isSuccess) {
      toast.success('Menu item successfully deleted!')
    }
  };

  if (loading || firstRender || !menuItem) {
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
              id='category'
              inputType='text'
              className='col-sm-12 col-md-6 col-xl-4'
              label='Category'
              value={category}
              editable
              onChange={handleChange}
            />
            <FormGroup
              id='productionArea'
              inputType='text'
              className='col-sm-12 col-md-6 col-xl-4'
              label='Production Area'
              value={productionArea.areaName}
              onChange={handleChange}
              editable
            />
            <FormGroup
              id='name'
              inputType='text'
              className='col-sm-12 col-md-6 col-xl-4'
              label='Name'
              value={name}
              onChange={handleChange}
              editable
            />
            <FormGroup
              id='dietAvailability'
              inputType='text'
              className='col-sm-12 col-md-6 col-xl-4'
              label='Diet Availability'
              value={dietAvailability.map((diet) => diet.name).join(', ')}
              onChange={handleChange}
              editable
            />
            <FormGroup
              id='portionSize'
              inputType='number'
              className='col-sm-6 col-md-3 col-xl-2'
              label='Portion Size'
              value={portionSize}
              onChange={handleChange}
              editable
            />
            <FormGroup
              id='portionUnit'
              inputType='text'
              className='col-sm-6 col-md-3 col-xl-2'
              label='Portion Unit'
              value={portionUnit}
              onChange={handleChange}
              editable
            />
            <FormGroup
              id='isLiquid'
              inputType='select'
              selectOptions={['true', 'false']}
              label='Is Liquid'
              className='col-sm-12 col-md-6 col-xl-4'
              value={isLiquid}
              onChange={handleChange}
              editable
            />
            <FormGroup
              id='majorAllergens'
              className='col-sm-12 col-md-6 col-xl-4'
              label='Major Allergens'
              inputType='text'
              value={majorAllergens.join(', ')}
              onChange={handleChange}
              editable
            />
            <FormGroup
              id='carbsInGrams'
              className='col-sm-12 col-md-6 col-xl-4'
              label='Carbs (grams)'
              inputType='number'
              step={10}
              value={carbsInGrams}
              onChange={handleChange}
              editable
            />
            <FormGroup
              id='sodiumInMG'
              className='col-sm-12 col-md-6 col-xl-4'
              label='Sodium (miligrams)'
              inputType='number'
              step={100}
              value={sodiumInMG}
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
              id='createdOn'
              inputType='text'
              className='col-sm-12 col-md-6 col-xl-4'
              label='Created'
              defaultValue={formatDate(menuItem.createdOn)}
            />
            <div className={classes.btnDiv}>
              {editMode ? (
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
                  <ButtonEdit onClick={handleEdit} />
                  <DeleteModal
                    id={menuItemId}
                    itemId={menuItemId}
                    itemName={menuItem.name}
                    onDelete={() => {
                      handleDelete(menuItemId, menuItem.name);
                    }}
                    btnDelete
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
