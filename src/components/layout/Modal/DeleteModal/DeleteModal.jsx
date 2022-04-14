import React from 'react';
import classes from './DeleteModal.module.css';

import ButtonSecondary from '../../Button/ButtonSecondary/ButtonSecondary';
import ButtonMain from '../../Button/ButtonMain/ButtonMain';
import ButtonDelete from '../../Button/ButtonDelete/ButtonDelete';

const Modal = ({
  id,
  heading,
  message,
  btnDelete,
  onDelete,
  btnText,
  itemId,
  itemName,
}) => {
  const openModal = () => {
    document.getElementById(id).style.display = 'flex';
  };

  const closeModal = () => {
    document.getElementById(id).style.display = 'none';
  };

  return (
    <>
      <ButtonDelete
        onClick={openModal}
        className={classes.btnDelete}
        text='Delete'
      />
      <div id={id} onClick={closeModal} className={classes.modalContainer}>
        <div className={classes.modalContent}>
          <div>
            {btnDelete ? (
              <>
                <h3 className={classes.modalHeading}>Delete?</h3>
                <p>
                  Are you sure you want to delete{' '}
                  <span className={classes.itemName}>{itemName}</span>?
                </p>

                <div className={classes.modalBtnContainer}>
                  <ButtonDelete onClick={onDelete} text='Delete' />
                  <ButtonSecondary className='m-3' text='Cancel' />
                </div>
              </>
            ) : (
              <>
                <h3 className={classes.modalHeading}>{heading}</h3>
                <p>{message}</p>

                <ButtonMain
                  onClick={closeModal}
                  className={classes.btnDelete}
                  text='Ok'
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
