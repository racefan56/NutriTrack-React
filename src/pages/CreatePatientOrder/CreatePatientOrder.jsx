import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  createPatientOrder,
  getPatient,
  reset,
} from '../../features/patient/patientSlice';
import { getMenuItems } from '../../features/menuItem/menuItemSlice';

import {
  formEditMode,
  getToday,
  formatDate,
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
import Modal from '../../components/layout/Modal/Modal';

const CreatePatientOrder = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { patientId } = useParams();

  const { patient, patientOrder, loading, isSuccess, isError, message } =
    useSelector((state) => state.patient);
  const { menuItems } = useSelector((state) => state.menuItem);
  const { pathname } = useSelector((state) => state.navigation);

  const [firstRender, setfirstRender] = useState(true);
  const [formData, setFormData] = useState({
    day: '',
    mealPeriod: '',
    option: 'Hot',
    entree: {},
    dietAvailability: [],
    sides: [],
    dessert: [],
    drinks: [],
    condiments: [],
  });
  const today = getToday({ mmddyyyy: true });

  const {
    day,
    mealPeriod,
    option,
    entree,
    sides,
    dessert,
    drinks,
    condiments,
  } = formData;

  useEffect(() => {
    dispatch(getPatient(patientId));

    setfirstRender(false);
  }, [dispatch, patientId]);

  useEffect(() => {
    if (patient) {
      dispatch(getMenuItems(`dietAvailability=${patient.currentDiet._id}&isOutOfStock=false`));
    }
  }, [dispatch, patient]);

  useEffect(() => {
    if (pathname) {
      // Isolate the search params from the path.
      const searchParams = pathname.split('?', 2)[1].split('&');
      searchParams.map((param) => {
        if (param.startsWith('day=')) {
          return setFormData((prevState) => ({
            ...prevState,
            day: param.split('=')[1],
          }));
        }
        if (param.startsWith('mealPeriod=')) {
          setFormData((prevState) => ({
            ...prevState,
            mealPeriod: param.split('=')[1],
          }));
        }
        return param;
      });
    }
  }, [pathname]);

  useEffect(() => {
    if (isSuccess && patientOrder) {
      dispatch(reset());
      toast.success('Patient order successfully created!');
      navigate(`/patients/${patientId}`);
    }

    if (isError) {
      if (message && message.message) {
        toast.error(message.message);
      } else {
        toast.error('Something went wrong. Please try again later.');
      }
    }
  }, [
    dispatch,
    isError,
    isSuccess,
    message,
    navigate,
    patientId,
    patientOrder,
  ]);

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

    if (!entree) {
      invalidInput('entree');
      toast.error('An entree is required.');
    } else {
      dispatch(createPatientOrder([patientId, formData]));
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
    navigate(`/patients/${patientId}`);
  };

  const noOptionsTemplate = (item) => {
    return `There are currently no ${item} available for the patients current diet.`;
  };

  if (loading || !patient || !menuItems || firstRender) {
    return <Spinner />;
  } else {
    return (
      <>
        <SideNav />
        <ContainerSideNav>
          <FormContainer
            category='Menu'
            title={`${day} ${mealPeriod}`}
            subTitle={`${patient.firstName} ${patient.lastName}: ${patient.currentDiet.name}`}
            onSubmit={handleSubmit}
          >
            <FormGroup
              id='day'
              inputType='text'
              className='col-12 col-md-6 col-lg-4'
              label='Day'
              defaultValue={day}
              readonly
            />
            <FormGroup
              id='mealPeriod'
              inputType='text'
              className='col-12 col-md-6 col-lg-4'
              label='Meal Period'
              defaultValue={mealPeriod}
              readonly
            />
            <FormGroup
              id='option'
              inputType='select'
              selectOptions={[
                { value: 'Hot', label: 'Hot' },
                { value: 'Cold', label: 'Cold' },
                { value: 'Custom', label: 'Custom' },
              ]}
              className='col-12 col-md-6 col-lg-4'
              label='Option'
              value={option}
              onChange={handleChange}
              alwaysEditable
            />
            {/* If option selected is NOT custom, hide these fields */}
            {option !== 'Custom' ? (
              <></>
            ) : (
              <>
                {' '}
                <FormGroup
                  id='entree'
                  inputType='select'
                  selectOptions={menuItems.flatMap((menuItem) => {
                    return menuItem.category === 'entree'
                      ? { value: menuItem._id, label: menuItem.name }
                      : [];
                  })}
                  noOptionsMessage='-- No options available --'
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
                  noOptionsMessage={noOptionsTemplate('sides')}
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
                  noOptionsMessage={noOptionsTemplate('desserts')}
                  label='Desserts'
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
                  noOptionsMessage={noOptionsTemplate('drinks')}
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
                  noOptionsMessage={noOptionsTemplate('condiments')}
                  label='Condiments'
                  className='col-12 col-lg-6'
                  value={condiments}
                  onChange={handleChange}
                  alwaysEditable
                />
              </>
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

export default CreatePatientOrder;
