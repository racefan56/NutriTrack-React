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
    console.log(string);
    return string;
  };

  return (
    <div className={`row ${classes.mealContainer}`}>
      {meal.drinks.length > 0 && (
        <FormGroup mealItemArr={meal.drinks} label='Drinks' />
      )}
      {meal.entree && <FormGroup label='Entree' mealItemObj={meal.entree} />}
      {meal.sides.length > 0 && (
        <FormGroup mealItemArr={meal.sides} label='Sides' />
      )}
      {meal.sides.length > 0 && (
        <FormGroup
          data={objArrToString(meal.sides)}
          label='Sides'
        />
      )}
      {meal.condiments.length > 0 && (
        <FormGroup mealItemArr={meal.condiments} label='Condiments' />
      )}
      {meal.dessert.length > 0 && (
        <FormGroup mealItemArr={meal.dessert} label='Dessert' />
      )}
      {meal.supplements.length > 0 && (
        <FormGroup mealItemArr={meal.supplements} label='Supplements' />
      )}
      <FormGroup
        className='col-6'
        label='Carbs'
        data={meal.totalMealCarbCount + 'G'}
      />
      <FormGroup
        className='col-6'
        label='Sodium'
        data={meal.totalMealSodiumCount + 'MG'}
      />
    </div>
  );
};

export default MealItem;
