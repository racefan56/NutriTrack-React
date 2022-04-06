import React from 'react';

import DetailCardGroup from '../../layout/DetailCard/DetailCardGroup/DetailCardGroup';

import classes from './MealItem.module.css';

const MealItem = ({ meal }) => {
  return (
    <div className={`row ${classes.mealContainer}`}>
      {meal.drinks.length > 0 && (
        <DetailCardGroup mealItemArr={meal.drinks} label='Drinks' />
      )}
      {meal.entree && (
        <DetailCardGroup label='Entree' mealItemObj={meal.entree} />
      )}
      {meal.sides.length > 0 && (
        <DetailCardGroup mealItemArr={meal.sides} label='Sides' />
      )}
      {meal.condiments.length > 0 && (
        <DetailCardGroup mealItemArr={meal.condiments} label='Condiments' />
      )}
      {meal.dessert.length > 0 && (
        <DetailCardGroup mealItemArr={meal.dessert} label='Dessert' />
      )}
      {meal.supplements.length > 0 && (
        <DetailCardGroup mealItemArr={meal.supplements} label='Supplements' />
      )}
      <DetailCardGroup
        className='col-6'
        label='Carbs'
        data={meal.totalMealCarbCount + 'G'}
      />
      <DetailCardGroup
        className='col-6'
        label='Sodium'
        data={meal.totalMealSodiumCount + 'MG'}
      />
    </div>
  );
};

export default MealItem;
