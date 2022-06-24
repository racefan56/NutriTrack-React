import React from 'react';
import { useNavigate } from 'react-router-dom';
import { setPathname } from '../../../features/navigation/navigationSlice';
import { useSelector, useDispatch } from 'react-redux';

import { BiCheckCircle, BiXCircle } from 'react-icons/bi';

import { v4 as uuidv4 } from 'uuid';

import {
  formatDate,
  getDayOfWeek,
  getToday,
} from '../../helperFunctions/helperFunctions';
import Meal from '../Meal/Meal';

import classes from './MealResults.module.css';

const MealResults = ({ meals, patientId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (!meals) {
    return;
  }

  const handleOrderClick = (mealData) => {
    if (!mealData) {
      return;
    }
    if (mealData.length === 2) {
      // Order not yet taken. Will contain the date in element 0 & the mealPeriod in element 1
      const dayOfWeek = getDayOfWeek(new Date(`${mealData[0]} 00:00`));
      const navigatePath = `/patients/${patientId}/orders/createOrder?day=${dayOfWeek}&mealPeriod=${mealData[1]}`;
      dispatch(setPathname(navigatePath));
      navigate(navigatePath);
    }
    if (mealData.length === 1) {
      // Order taken. Will contain the mealOrder ID in the single element
      const navigatePath = `/patients/${patientId}/orders/${mealData[0]}`;
      dispatch(setPathname(navigatePath));
      navigate(navigatePath);
    }
  };

  const mealDaysPeriodsIds = meals.map((meal) => {
    return [
      formatDate(meal.mealDate, { dateOnly: true }),
      meal.mealPeriod,
      meal._id,
      meal.patientID._id,
    ];
  });

  const mealDaySet = [
    ...new Set(
      mealDaysPeriodsIds.map((item) => {
        return item[0];
      })
    ),
  ];

  const isOrderTaken = (day, meal) => {
    const findOrder = () => {
      return mealDaysPeriodsIds.find((el) => el[0] === day && el[1] === meal);
    };

    const order = findOrder();

    return order ? (
      <span
        onClick={() => handleOrderClick([order[2]])}
        className={classes.mealCheckSpan}
      >
        {meal[0]}: <BiCheckCircle className={classes.iconCheck} />
      </span>
    ) : (
      <span
        onClick={() => handleOrderClick([day, meal])}
        className={classes.mealXSpan}
      >
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

  if (meals.length === 0) {
    const today = getToday();
    console.log(today);
    return (
      <div className={classes.dayContainer} key={uuidv4()}>
        <div className={classes.dayHeading} key={uuidv4()}>
          <div className={classes.orderDate}>{today}</div>
          <div className={classes.orderTakenContainer}>
            <span
              onClick={() => handleOrderClick([today, 'Breakfast'])}
              className={classes.mealXSpan}
            >
              B: <BiXCircle className={classes.iconX}></BiXCircle>
            </span>
            <span
              onClick={() => handleOrderClick([today, 'Lunch'])}
              className={classes.mealXSpan}
            >
              L: <BiXCircle className={classes.iconX}></BiXCircle>
            </span>
            <span
              onClick={() => handleOrderClick([today, 'Dinner'])}
              className={classes.mealXSpan}
            >
              D: <BiXCircle className={classes.iconX}></BiXCircle>
            </span>
          </div>
        </div>
      </div>
    );
  }

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
