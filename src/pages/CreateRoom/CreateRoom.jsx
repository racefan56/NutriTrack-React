import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { createRoom } from '../../features/room/roomSlice';
import { getUnits } from '../../features/unit/unitSlice';

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

import classes from './CreateRoom.module.css';

const CreateRoom = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isSuccess, isError, message } = useSelector(
    (state) => state.room
  );
  const { units } = useSelector((state) => state.unit);

  const [formData, setFormData] = useState({
    roomNumber: 1,
    unit: {},
    isOutOfService: false,
  });

  const { roomNumber, unit, isOutOfService } = formData;

  useEffect(() => {
    dispatch(getUnits());
  }, [dispatch]);

  useEffect(() => {
    if (units && units[0]) {
      setFormData({ ...formData, unit: units[0]._id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [units]);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Room successfully created!');
      navigate('/control-panel/rooms');
    }

    if (isError) {
      if (message.keyValue?.roomNumber) {
        toast.error('That room number is already taken for that unit.');
        invalidInput('roomNumber');
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

    if (roomNumber < 1 || !unit) {
      if (roomNumber < 1) {
        invalidInput('roomNumber');
        toast.error('Room number is required, and must be higher than 0.');
      }
      if (!unit) {
        invalidInput('unit');
        toast.error('A unit is required.');
      }
    } else {
      dispatch(createRoom(formData));
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
    navigate('/control-panel/rooms');
  };

  if (loading || !units) {
    return <Spinner />;
  } else {
    return (
      <>
        <SideNav />
        <ContainerSideNav>
          <FormContainer category='Create Room' onSubmit={handleSubmit}>
            <FormGroup
              id='unit'
              inputType='select'
              selectOptions={units.map((unit) => {
                return { value: unit._id, label: unit.unitName };
              })}
              className='col-12 col-lg-6'
              label='Unit'
              value={unit._id}
              onChange={handleChange}
              alwaysEditable
              required
            />
            <FormGroup
              id='roomNumber'
              inputType='number'
              className='col-12 col-lg-6'
              label='Room Number'
              value={roomNumber}
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

export default CreateRoom;
