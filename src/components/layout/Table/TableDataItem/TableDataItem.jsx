import React from 'react';
import { useNavigate } from 'react-router-dom';

import classes from './TableDataItem.module.css';

const TableDataItem = ({ children, navigatePath, dataPoints }) => {
  const navigate = useNavigate();
  return (
    <tr className={classes['item-row']}>
      {dataPoints.map((dataPoint, index) => {
        if (index === 0) {
          return (
            <td
              onClick={() => navigate(`${navigatePath}`)}
              className={classes.rowHeader}
              key={index}
            >
              {dataPoint}
            </td>
          );
        }
        return (
          <td onClick={() => navigate(`${navigatePath}`)} key={index}>
            {dataPoint}
          </td>
        );
      })}
      {children ? children : <></>}
    </tr>
  );
};

export default TableDataItem;
