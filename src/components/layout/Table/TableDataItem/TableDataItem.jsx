import React from 'react';
import { useNavigate } from 'react-router-dom';

import classes from './TableDataItem.module.css';

const TableDataItem = ({ navigatePath, dataPoints }) => {
  const navigate = useNavigate();
  return (
    <tr
      className={classes['item-row']}
      onClick={() => navigate(`${navigatePath}`)}
    >
      {dataPoints.map((dataPoint, index) => {
        if (index === 0) {
          return (
            <td className={classes.rowHeader} key={index}>
              {dataPoint}
            </td>
          );
        }
        return <td key={index}>{dataPoint}</td>;
      })}
    </tr>
  );
};

export default TableDataItem;
