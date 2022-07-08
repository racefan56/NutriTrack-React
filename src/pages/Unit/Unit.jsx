import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getUnit, updateUnit, deleteUnit } from '../../features/unit/unitSlice';

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

import classes from './Unit.module.css';

const Unit = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { unitId } = useParams();

  const { loading, unit, isSuccess, isError, message } = useSelector(
    (state) => state.unit
  );

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    unitName: '',
    description: '',
    isOutOfService: false,
  });

  const { unitName, description, isOutOfService } = formData;

  useEffect(() => {
    dispatch(getUnit(unitId));
  }, [dispatch, unitId]);

  useEffect(() => {
    if (unit) {
      setFormData({ ...unit });
    }
  }, [unit]);

  useEffect(() => {
    if (isSuccess && unit) {
      toast.success('Unit successfully updated!');
      navigate('/control-panel/units');
    }

    if (isSuccess && !unit) {
      toast.success('Unit successfully deleted!');
      navigate('/control-panel/units');
    }

    if (isError) {
      if (message.keyValue?.unitName) {
        toast.error('That unit name is already taken.');
      }

      if (message.message) {
        toast.error(message.message);
      }
    }
  }, [isError, isSuccess, message, navigate, unit]);

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

    if (unitName.length < 1 || description.length < 3) {
      if (unitName.length < 1) {
        invalidInput('unitName');
        toast.error('Unit name is required.');
      }
      if (description.length < 3) {
        invalidInput('description');
        toast.error('A description is required.');
      }
    } else {
      dispatch(updateUnit([unitId, formData]));
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
    setFormData({ ...unit });
  };

  const handleDelete = (unitId) => {
    dispatch(deleteUnit(unitId));
  };

  if (loading || !unit || !formData) {
    return <Spinner />;
  } else {
    return (
      <>
        <SideNav />
        <ContainerSideNav>
          <FormContainer
            category='Unit'
            title={unitName}
            onSubmit={handleSubmit}
          >
            <FormGroup
              id='unitName'
              inputType='text'
              className='col-12 col-lg-6'
              label='Unit Name'
              value={unitName}
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
                  id={unitId}
                  itemName={unit.unitName}
                  onDelete={() => {
                    handleDelete(unitId);
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

export default Unit;
