import React from 'react';
import { useNavigate } from 'react-router-dom';
import { setPathname } from '../../../../features/navigation/navigationSlice';
import { useDispatch } from 'react-redux';

import classes from './TableDataItem.module.css';

const TableDataItem = ({ children, navigatePath, dataPoints }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <tr
      className={
        navigatePath ? classes['item-row-link'] : classes['item-row-no-link']
      }
    >
      {dataPoints.map((dataPoint, index) => {
        if (index === 0) {
          return (
            <td
              onClick={() => {
                if (navigatePath) {
                  dispatch(setPathname(`${navigatePath}`));
                  navigate(`${navigatePath}`);
                }
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
              if (navigatePath) {
                dispatch(setPathname(`${navigatePath}`));
                navigate(`${navigatePath}`);
              }
            }}
            key={index}
          >
            {dataPoint}
          </td>
        );
      })}
      {children}
    </tr>
  );
};

export default TableDataItem;
