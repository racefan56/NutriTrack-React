import React from 'react';
import classes from './Table.module.css';

import ButtonRefresh from '../Button/ButtonRefresh/ButtonRefresh';
import ButtonCreate from '../Button/ButtonCreate/ButtonCreate';
import ButtonFilter from '../Button/ButtonFilter/ButtonFilter';

const Table = ({
  children,
  tableId,
  headers,
  heading,
  refresh,
  filterOptions,
  createPath,
}) => {
  return (
    <>
      <div className={classes.headingContainer}>
        <div className={classes.heading}> {heading}</div>
        {refresh || createPath ? (
          <div>
            {' '}
            {refresh ? <ButtonRefresh refresh={refresh} /> : <></>}
            {createPath ? <ButtonCreate path={createPath} /> : <></>}
            {filterOptions ? (
              <ButtonFilter filterOptions={filterOptions} />
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className={classes.tableContainer}>
        <table id={tableId} className='table'>
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
