import React from 'react';
import { useNavigate } from 'react-router-dom';
import { setPathname } from '../../../../features/navigation/navigationSlice';
import { useSelector, useDispatch } from 'react-redux';

import classes from './TableDataItem.module.css';

const TableDataItem = ({ children, navigatePath, dataPoints }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <tr className={classes['item-row']}>
      {dataPoints.map((dataPoint, index) => {
        if (index === 0) {
          return (
            <td
              onClick={() => {
                dispatch(setPathname(`${navigatePath}`));
                navigate(`${navigatePath}`);
              }}
              className={classes.rowHeader}
              key={index}
            >
              {dataPoint}
            </td>
          );
        }
        return (
          <td
            onClick={() => {
              dispatch(setPathname(`${navigatePath}`));
              navigate(`${navigatePath}`);
            }}
            key={index}
          >
            {dataPoint}
          </td>
        );
      })}
      {children ? children : <></>}
    </tr>
  );
};

export default TableDataItem;
