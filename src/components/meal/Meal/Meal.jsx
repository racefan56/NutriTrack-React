import React from 'react';

import DetailCardGroup from '../../layout/DetailCard/DetailCardGroup/DetailCardGroup';
import DetailCardCategory from '../../layout/DetailCard/DetailCardCategory/DetailCardCategory';
import MealItem from './../MealItem/MealItem';

import { v4 as uuidv4 } from 'uuid';

const Meal = ({ meal }) => {
  return (
    <>
      <DetailCardCategory
        key={uuidv4()}
        title={meal.mealPeriod}
        className='col-md-12 col-lg-6 col-xl-4'
      >
        <MealItem key={meal._id} meal={meal} />
      </DetailCardCategory>
    </>
  );
};

export default Meal;
