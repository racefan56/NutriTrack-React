import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  getProductionArea,
  updateProductionArea,
  deleteProductionArea,
} from '../../features/productionArea/productionAreaSlice';

import {
  formatDate,
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

import classes from './ProductionArea.module.css';

const ProductionArea = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productionAreaId } = useParams();

  const { loading, productionArea, isSuccess, isError, message } = useSelector(
    (state) => state.productionArea
  );

  const [editMode, setEditMode] = useState();
  const [formData, setFormData] = useState({
    areaName: '',
    description: '',
  });

  const { areaName, description } = formData;

  useEffect(() => {
    dispatch(getProductionArea(productionAreaId));
  }, [dispatch, productionAreaId]);

  useEffect(() => {
    if (productionArea) {
      setFormData({ ...productionArea });
    }
  }, [productionArea]);

  useEffect(() => {
    if (isSuccess && productionArea) {
      toast.success('Production area successfully updated!');
      navigate('/control-panel/production-areas');
    }

    if (isSuccess && !productionArea) {
      toast.success('Production area successfully deleted!');
      navigate('/control-panel/production-areas');
    }

    if (isError) {
      if (message.keyValue?.areaName) {
        toast.error('That area name is already taken.');
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

    setFormData((prevState) => ({ ...prevState, [key]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (areaName.length < 1 || description.length < 3) {
      if (areaName.length < 1) {
        invalidInput('areaName');
        toast.error('Area name is required.');
      }
      if (description.length < 3) {
        invalidInput('description');
        toast.error('A description is required.');
      }
    } else {
      dispatch(updateProductionArea([productionAreaId, formData]));
    }
  };

  const handleEdit = () => {
    formEditMode(true);
    setEditMode(true);
  };

  const handleCancel = () => {
    formEditMode(false);
    setEditMode(false);
    //Reset fields back to their original values
    setFormData({ ...productionArea });
  };

  const handleDelete = (productionAreaId) => {
    dispatch(deleteProductionArea(productionAreaId));
    if (isSuccess) {
      toast.success('Production area successfully deleted!');
      //After area is deleted, return to areas page
      navigate('/control-panel/production-areas');
    }
  };

  if (loading || !productionArea || !formData) {
    return <Spinner />;
  } else {
    return (
      <>
        <SideNav />
        <ContainerSideNav>
          <FormContainer
            category='Production Area'
            title={areaName}
            onSubmit={handleSubmit}
          >
            <FormGroup
              id='areaName'
              inputType='text'
              className='col-12 col-lg-6'
              label='Area Name'
              value={areaName}
              onChange={handleChange}
              editable
            />
            <FormGroup
              id='description'
              textarea
              className='col-12 col-lg-6'
              label='Description'
              value={description}
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
                  id={productionAreaId}
                  itemName={productionArea.areaName}
                  onDelete={() => {
                    handleDelete(productionAreaId);
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

export default ProductionArea;
