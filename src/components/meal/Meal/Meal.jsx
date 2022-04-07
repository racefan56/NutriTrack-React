import React from 'react';

import SubForm from './../../layout/Form/SubForm/SubForm';
import MealItem from './../MealItem/MealItem';

import { v4 as uuidv4 } from 'uuid';

const Meal = ({ meal }) => {
  return (
    <>
      <SubForm
        key={uuidv4()}
        title={meal.mealPeriod}
        className='col-md-12 col-lg-6 col-xl-4'
      >
        <MealItem key={meal._id} meal={meal} />
      </SubForm>
    </>
  );
};

export default Meal;
