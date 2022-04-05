import React from 'react';

import DetailCardGroup from '../../layout/DetailCard/DetailCardGroup/DetailCardGroup';
import DetailCardCategory from '../../layout/DetailCard/DetailCardCategory/DetailCardCategory';
import MealItem from './../MealItem/MealItem';

import { v4 as uuidv4 } from 'uuid';

import classes from './Meal.module.css';

const Meal = ({ meal }) => {
  return (
    <>
      <DetailCardCategory key={uuidv4()} title={meal.mealPeriod}>
        {/* <DetailCardGroup data={meal.sides} /> */}
        <MealItem key={meal._id} meal={meal} />
      </DetailCardCategory>
    </>
  );
};

export default Meal;
