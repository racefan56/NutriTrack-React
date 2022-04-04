import React from 'react';

import MealItemCategory from '../MealItemCategory/MealItemCategory';

import classes from './MealItem.module.css';

const MealItem = ({ meal }) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th scope='col'>Carb Total</th>
            <th scope='col'>Sodium Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{meal.totalMealCarbCount} G</td>
            <td>{meal.totalMealSodiumCount} MG</td>
          </tr>
        </tbody>
        {meal.entree && (
          <MealItemCategory
            key='Entree'
            category={[meal.entree]}
            title='Entree'
          />
        )}
        {meal.condiments.length > 0 && (
          <MealItemCategory
            key='Condiments'
            category={meal.condiments}
            title='Condiments'
          />
        )}
        {meal.dessert.length > 0 && (
          <MealItemCategory
            key='Dessert'
            category={meal.dessert}
            title='Dessert'
          />
        )}
        {meal.drinks.length > 0 && (
          <MealItemCategory
            key='Drinks'
            category={meal.drinks}
            title='Drinks'
          />
        )}
        {meal.sides.length > 0 && (
          <MealItemCategory key='Sides' category={meal.sides} title='Sides' />
        )}
        {meal.supplements.length > 0 && (
          <MealItemCategory
            key='Supplements'
            category={meal.supplements}
            title='Supplements'
          />
        )}
      </table>
    </>
  );
};

export default MealItem;
