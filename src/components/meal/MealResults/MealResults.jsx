import React from 'react';

import formatDate from '../../helperFunctions/formatDate';

import classes from './MealResults.module.css';

import Meal from '../Meal/Meal';

const MealResults = ({ meals }) => {
  const mealDays = meals.map((meal) => {
    return formatDate(meal.mealDate, { dateOnly: true });
  });

  const mealDaySet = [...new Set(mealDays)];

  const mealsSortedByDay = mealDaySet.map((day) => {
    return meals
      .filter((meal) => day === formatDate(meal.mealDate, { dateOnly: true }))
      .map((meal) => {
        return (
          <>
            <Meal key={meal._id} meal={meal}></Meal>
          </>
        );
      });
  });

  return mealDaySet.map((day, index) => {
    return (
      <>
        <h1>{day}</h1>
        {mealsSortedByDay[index]}
      </>
    );
  });
};

export default MealResults;
