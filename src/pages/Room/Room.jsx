import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getRoom, updateRoom, deleteRoom } from '../../features/room/roomSlice';

import { getUnits } from '../../features/unit/unitSlice';

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

import classes from './Room.module.css';

const Room = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { roomId } = useParams();

  const { loading, room, isSuccess, isError, message } = useSelector(
    (state) => state.room
  );
  const { units } = useSelector((state) => state.unit);

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    roomNumber: 0,
    unit: {},
  });

  const { roomNumber, unit } = formData;

  useEffect(() => {
    dispatch(getRoom(roomId));
    dispatch(getUnits());
  }, [dispatch, roomId]);

  useEffect(() => {
    if (room) {
      setFormData({ ...room });
    }
  }, [room]);

  useEffect(() => {
    if (isSuccess && room) {
      toast.success('Room successfully updated!');
      navigate('/control-panel/rooms');
    }

    if (isSuccess && !room) {
      toast.success('Room successfully deleted!');
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
  }, [isError, isSuccess, message, navigate, room]);

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
      dispatch(updateRoom([roomId, formData]));
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
    setFormData({ ...room });
  };

  const handleDelete = (roomId) => {
    dispatch(deleteRoom(roomId));
  };

  if (loading || !room || !units || !formData) {
    return <Spinner />;
  } else {
    return (
      <>
        <SideNav />
        <ContainerSideNav>
          <FormContainer
            category='Room'
            title={`${room.unit.unitName} ${room.roomNumber}`}
            onSubmit={handleSubmit}
          >
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
              editable
              required
            />
            <FormGroup
              id='roomNumber'
              inputType='number'
              className='col-12 col-lg-6'
              label='Room Number'
              value={roomNumber}
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
                  id={roomId}
                  itemName={`${unit.unitName} ${roomNumber}`}
                  onDelete={() => {
                    handleDelete(roomId);
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

export default Room;
