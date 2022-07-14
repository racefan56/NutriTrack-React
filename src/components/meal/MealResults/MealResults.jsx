import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { BiCheckCircle, BiXCircle } from 'react-icons/bi';

import { v4 as uuidv4 } from 'uuid';

import { setPathname } from '../../../features/navigation/navigationSlice';
import {
  formatDate,
  getDayOfWeek,
  getToday,
} from '../../helperFunctions/helperFunctions';

import classes from './MealResults.module.css';

const MealResults = ({ meals, patientId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const today = getToday({ mmddyyyy: true });

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

  // Takes each meal, and organizes the meal data into an array of [meal date, mealPeriod, meal ID, patient ID] which is then used by the mealDaySet function below
  const mealDaysPeriodsIds = meals.map((meal) => {
    return [
      formatDate(meal.mealDate, { dateOnly: true }),
      meal.mealPeriod,
      meal._id,
      meal.patientID._id,
    ];
  });

  // Returns a unique set of the days that there are meal orders
  const mealDaySet = [
    ...new Set(
      mealDaysPeriodsIds.map((item) => {
        return item[0];
      })
    ),
  ];

  // Determines if the specified day and meal for that day has an order taken for it
  const isOrderTaken = (day, meal) => {
    const findOrder = () => {
      return mealDaysPeriodsIds.find((el) => el[0] === day && el[1] === meal);
    };

    const order = findOrder();

    // If there is an order display a green check box, and link to the order details page on click. If there is NOT an order, display a red X box and link to a create order page on click
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

  // If there are no meals, output a section for the current day so meals can be order for the current day
  if (meals.length === 0) {
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
    //If no orders have been taken for the current day, add a section for the current day.
    if (!mealDaySet.includes(today) && index === 0) {
      return (
        <React.Fragment key={uuidv4()}>
          <div className={classes.dayContainer}>
            <div className={classes.dayHeading}>
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
          <div className={classes.dayContainer}>
            <div className={classes.dayHeading}>
              <div className={classes.orderDate}>{day}</div>
              <div className={classes.orderTakenContainer}>
                {isOrderTaken(day, 'Breakfast')}
                {isOrderTaken(day, 'Lunch')}
                {isOrderTaken(day, 'Dinner')}
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      // Check if each meal is taken or not for the supplied day
      return (
        <div className={classes.dayContainer} key={uuidv4()}>
          <div className={classes.dayHeading}>
            <div className={classes.orderDate}>{day}</div>
            <div className={classes.orderTakenContainer}>
              {isOrderTaken(day, 'Breakfast')}
              {isOrderTaken(day, 'Lunch')}
              {isOrderTaken(day, 'Dinner')}
            </div>
          </div>
        </div>
      );
    }
  });
};

export default MealResults;
