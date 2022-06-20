import React, { useEffect, useRef } from 'react';
import classes from './Table.module.css';

import ButtonRefresh from '../Button/ButtonRefresh/ButtonRefresh';
import ButtonCreate from '../Button/ButtonCreate/ButtonCreate';
import ButtonFilter from '../Button/ButtonFilter/ButtonFilter';
import ButtonLimit from '../Button/ButtonLimit/ButtonLimit';

const Table = ({
  children,
  tableId,
  headers,
  heading,
  refresh,
  filterHeading,
  filterOptions,
  filterValues,
  filterOnChange,
  filterSubmit,
  filterReset,
  limit,
  limitValue,
  limitOnChange,
  limitOptions,
  createPath,
}) => {
  const table = useRef();
  useEffect(() => {
    table.current = document.getElementById(tableId);
  }, [tableId]);
  return (
    <>
      <div className={classes.headingContainer}>
        <div className={classes.heading}> {heading}</div>
        {refresh || createPath || filterOptions || limit ? (
          <>
            <div className={classes.tableButtonsContainer}>
              {limit ? (
                <ButtonLimit
                  limitOnChange={limitOnChange}
                  limitValue={limitValue}
                  limitId={tableId + 'limitBtn'}
                  limitOptions={limitOptions}
                />
              ) : (
                <></>
              )}
              {refresh ? <ButtonRefresh refresh={refresh} /> : <></>}
              {createPath ? <ButtonCreate path={createPath} /> : <></>}
              {filterOptions ? (
                <ButtonFilter
                  filterHeading={filterHeading}
                  filterOptions={filterOptions}
                  filterValues={filterValues}
                  filterOnChange={filterOnChange}
                  filterSubmit={filterSubmit}
                  filterReset={filterReset}
                />
              ) : (
                <></>
              )}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      {filterValues?.join('').length > 0 ? (
        <div className={classes.filtersAppliedDiv}>
          Filters: {filterValues.join(' ')}{' '}
        </div>
      ) : (
        <></>
      )}
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
          <tbody>
            {children.length === 0 ? (
              <td className={classes.noResults} colSpan='100%'>
                No results were found
              </td>
            ) : (
              children
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
