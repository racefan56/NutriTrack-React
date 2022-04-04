import React from 'react';

import DetailCardGroup from '../../layout/DetailCard/DetailCardGroup/DetailCardGroup';
import DetailCardCategory from '../../layout/DetailCard/DetailCardCategory/DetailCardCategory';
import MealItem from './../MealItem/MealItem';

import formatDate from '../../helperFunctions/formatDate';

import classes from './Meal.module.css';

const Meal = ({ meal }) => {
  return (
    <>
      <DetailCardCategory
        title={`${formatDate(meal.mealDate, { dateOnly: true })} ${
          meal.mealPeriod
        }`}
      >
        <MealItem key={meal._id} meal={meal} />
      </DetailCardCategory>
    </>
  );
};

export default Meal;
