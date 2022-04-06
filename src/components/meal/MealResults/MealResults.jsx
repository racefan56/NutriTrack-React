import React from 'react';
import { BiCheckCircle, BiXCircle } from 'react-icons/bi';

import { v4 as uuidv4 } from 'uuid';

import { formatDate } from '../../helperFunctions/helperFunctions';
import Meal from '../Meal/Meal';

import classes from './MealResults.module.css';

const MealResults = ({ meals }) => {
  const mealDaysPeriods = meals.map((meal) => {
    return [formatDate(meal.mealDate, { dateOnly: true }), meal.mealPeriod];
  });

  const mealDaySet = [
    ...new Set(
      mealDaysPeriods.map((item) => {
        return item[0];
      })
    ),
  ];

  const isOrderTaken = (day, meal) => {
    return mealDaysPeriods.find((el) => el[0] === day && el[1] === meal) ? (
      <span className={classes.mealCheckSpan}>
        {meal[0]}: <BiCheckCircle className={classes.iconCheck} />
      </span>
    ) : (
      <span className={classes.mealXSpan}>
        {meal[0]}: <BiXCircle className={classes.iconX}></BiXCircle>
      </span>
    );
  };

  const showHide = (day) => {
    const days = document.getElementsByClassName('allDays');

    for (let i = 0; i < days.length; i++) {
      if (days[i].id === day) {
        document.getElementById(day).toggleAttribute('hidden');
      } else {
        days[i].setAttribute('hidden', true);
      }
    }
  };

  const mealsFilteredByDay = mealDaySet.map((day) => {
    return meals
      .filter((meal) => day === formatDate(meal.mealDate, { dateOnly: true }))
      .sort(
        (meal1, meal2) =>
          Date.parse(meal1.mealDate) - Date.parse(meal2.mealDate)
      )
      .map((meal) => {
        return (
          <React.Fragment key={uuidv4()}>
            <Meal key={uuidv4()} meal={meal}></Meal>
          </React.Fragment>
        );
      });
  });

  return mealDaySet.map((day, index) => {
    return (
      <div className={classes.dayContainer} key={uuidv4()}>
        <div
          onClick={() => showHide(day)}
          className={classes.dayHeading}
          key={uuidv4()}
        >
          <div className={classes.orderDate}>{day}</div>
          <div className={classes.orderTakenContainer}>
            {isOrderTaken(day, 'Breakfast')}
            {isOrderTaken(day, 'Lunch')}
            {isOrderTaken(day, 'Dinner')}
          </div>
        </div>
        <div hidden id={day} className='allDays'>
          <div className='row'>{mealsFilteredByDay[index]}</div>
        </div>
      </div>
    );
  });
};

export default MealResults;
