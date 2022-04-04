import React from 'react';
import classes from './MealItemCategory.module.css';

const MealItemCategory = ({ category, title }) => {
  return (
    <>
      <tr>
        <th colSpan='3'>{title}</th>
      </tr>
      {category.map((item) => {
        return (
          <tr>
            <td>{item.portionSize}</td>
            <td>{item.portionUnit}</td>
            <td>{item.name}</td>
          </tr>
        );
      })}
    </>
  );
};

export default MealItemCategory;
