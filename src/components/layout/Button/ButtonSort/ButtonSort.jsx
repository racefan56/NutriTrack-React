import React from 'react';

import FormGroup from '../../Form/FormGroup/FormGroup';

const ButtonSort = ({ sortId, sortValue, sortOptions, sortOnChange }) => {
  return (
    <form>
      <FormGroup
        id={sortId}
        sideLabel
        label={'Sort'}
        value={sortValue}
        inputType='select'
        selectOptions={sortOptions}
        onChange={sortOnChange}
        alwaysEditable
      />
    </form>
  );
};

export default ButtonSort;
