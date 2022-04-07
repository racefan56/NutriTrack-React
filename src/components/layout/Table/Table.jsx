import React from 'react';
import classes from './Table.module.css';

import ButtonRefresh from '../Button/ButtonRefresh/ButtonRefresh';

const Table = ({ children, headers, heading, refresh }) => {
  return (
    <>
      <div className={classes.headingContainer}>
        <div className={classes.heading}>
          {refresh ? <ButtonRefresh refresh={refresh} /> : <></>}
          {heading}
        </div>
      </div>
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
    </>
  );
};

export default Table;
