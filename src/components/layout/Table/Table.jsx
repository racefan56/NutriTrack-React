import React from 'react';
import classes from './Table.module.css';

const Table = ({ children, headers }) => {
  return (
    <div className={classes.tableContainer}>
      <table className='table'>
        <thead>
          <tr>
            {headers.map((header, index) => {
              return (
                <th className={classes.tableHeader} key={index} scope='col'>
                  {header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default Table;
