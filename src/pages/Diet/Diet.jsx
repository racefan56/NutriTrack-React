import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getDiet, updateDiet, deleteDiet } from '../../features/diet/dietSlice';

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

const Diet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dietId } = useParams();

  const { loading, diet, isSuccess, isError, message } = useSelector(
    (state) => state.diet
  );
  const { userRole } = useSelector((state) => state.auth);

  const [editMode, setEditMode] = useState();
  const [formData, setFormData] = useState({
    name: '',
    sodiumInMG: 0,
    carbsInGrams: 0,
    description: '',
  });

  const { name, sodiumInMG, carbsInGrams, description } = formData;

  useEffect(() => {
    dispatch(getDiet(dietId));
  }, [dispatch, dietId]);

  useEffect(() => {
    if (diet) {
      setFormData({ ...diet });
    }
  }, [diet]);

  useEffect(() => {
    if (isSuccess && diet) {
      toast.success('Diet successfully updated!');
      navigate('/control-panel/diets');
    }

    if (isSuccess && !diet) {
      toast.success('Diet successfully deleted!');
      //After diet is deleted, return to diets page
      navigate('/control-panel/diets');
    }

    if (isError) {
      if (message.keyValue?.name) {
        toast.error('That diet name is already taken.');
      }

      if (message.message) {
        toast.error(message.message);
      }
    }
  }, [diet, isError, isSuccess, message, navigate]);

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

    if (name.length < 1 || description.length < 3) {
      if (name.length < 1) {
        invalidInput('name');
        toast.error('Diet name is required.');
      }
      if (description.length < 3) {
        invalidInput('description');
        toast.error('A description is required.');
      }
    } else {
      dispatch(updateDiet([dietId, formData]));
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
    setFormData({ ...diet });
  };

  const handleDelete = (dietId) => {
    dispatch(deleteDiet(dietId));
  };

  if (loading || !diet || !formData) {
    return <Spinner />;
  } else {
    return (
      <>
        <SideNav />
        <ContainerSideNav>
          <FormContainer category='Diet' title={name} onSubmit={handleSubmit}>
            <FormGroup
              id='name'
              inputType='text'
              className='col-12 col-lg-4'
              label='Diet Name'
              value={name}
              onChange={handleChange}
              editable
            />
            <FormGroup
              id='sodiumInMG'
              inputType='number'
              className='col-12 col-md-6 col-lg-4'
              label='Sodium (MG/meal)'
              value={sodiumInMG}
              onChange={handleChange}
              editable
            />
            <FormGroup
              id='carbsInGrams'
              inputType='number'
              className='col-12 col-md-6 col-lg-4'
              label='Carbs (G/meal)'
              value={carbsInGrams}
              onChange={handleChange}
              editable
            />
            <FormGroup
              id='description'
              textarea
              className='col-12'
              label='Description'
              value={description}
              onChange={handleChange}
              editable
            />
            {userRole === 'admin' ? (
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
                    id={dietId}
                    itemName={diet.name}
                    onDelete={() => {
                      handleDelete(dietId);
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

export default Diet;
