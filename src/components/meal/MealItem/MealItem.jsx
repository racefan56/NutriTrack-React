import React from 'react';

import FormGroup from '../../layout/Form/FormGroup/FormGroup';

import classes from './MealItem.module.css';

const MealItem = ({ meal }) => {
  //Convert an array of menu item objects to a usable data string
  const objArrToString = (item) => {
    let string = '';
    item.forEach((el) => {
      string += el.name;
    });
    return string;
  };

  return (
    <div className={`row ${classes.mealContainer}`}>
      {meal.drinks.length > 0 && (
        <FormGroup inputType='text' mealItemArr={meal.drinks} label='Drinks' />
      )}
      {meal.entree && (
        <FormGroup inputType='text' label='Entree' mealItemObj={meal.entree} />
      )}
      {meal.sides.length > 0 && (
        <FormGroup inputType='text' mealItemArr={meal.sides} label='Sides' />
      )}
      {meal.sides.length > 0 && (
        <FormGroup
          inputType='text'
          defaultValue={objArrToString(meal.sides)}
          label='Sides'
        />
      )}
      {meal.condiments.length > 0 && (
        <FormGroup
          inputType='text'
          mealItemArr={meal.condiments}
          label='Condiments'
        />
      )}
      {meal.dessert.length > 0 && (
        <FormGroup
          inputType='text'
          mealItemArr={meal.dessert}
          label='Dessert'
        />
      )}
      {meal.supplements.length > 0 && (
        <FormGroup
          inputType='text'
          mealItemArr={meal.supplements}
          label='Supplements'
        />
      )}
      <FormGroup
        inputType='text'
        className='col-6'
        label='Carbs'
        defaultValue={meal.totalMealCarbCount + 'G'}
      />
      <FormGroup
        inputType='text'
        className='col-6'
        label='Sodium'
        defaultValue={meal.totalMealSodiumCount + 'MG'}
      />
    </div>
  );
};

export default MealItem;
