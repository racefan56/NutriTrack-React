import React, { useEffect, useRef } from 'react';
import classes from './Table.module.css';

import ButtonMain from '../Button/ButtonMain/ButtonMain';
import ButtonRefresh from '../Button/ButtonRefresh/ButtonRefresh';
import ButtonCreate from '../Button/ButtonCreate/ButtonCreate';
import ButtonFilter from '../Button/ButtonFilter/ButtonFilter';
import ButtonLimit from '../Button/ButtonLimit/ButtonLimit';
import ButtonSort from '../Button/ButtonSort/ButtonSort';

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
  paginate,
  paginateCurPage,
  paginateNext,
  paginatePrevious,
  sort,
  sortValue,
  sortOptions,
  sortOnChange,
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
      {filterValues?.join('').length > 0 || sort ? (
        <div className={classes.filtersAndSortContainer}>
          {filterValues?.join('').length > 0
            ? `Filters: ${filterValues.join(' ')}`
            : 'Filters: No Filters'}
          <ButtonSort
            sortId={tableId + 'sortBtn'}
            sortOnChange={sortOnChange}
            sortValue={sortValue}
            sortOptions={sortOptions}
          />
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
      {paginate ? (
        <div className={classes.paginateContainer}>
          {paginateCurPage !== 1 ? (
            <ButtonMain
              className='m-0 w-25'
              type='Button'
              text='Previous'
              onClick={paginatePrevious}
            />
          ) : (
            <></>
          )}

          <div>
            Page {paginateCurPage}
            {children.length !== +limitValue ? ` of ${paginateCurPage}` : ''}
          </div>
          {children.length === +limitValue ? (
            <ButtonMain
              id='nextBtn'
              className='m-0 w-25'
              type='Button'
              text='Next'
              onClick={paginateNext}
            />
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Table;
