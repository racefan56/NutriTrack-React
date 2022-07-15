import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

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
  refreshDispatch,
  filterHeading,
  filterOptions,
  filterValues,
  filterOnChange,
  filterString,
  filterReset,
  limit,
  limitValue,
  limitSetLimit,
  limitOptions,
  paginate,
  paginateCurPage,
  paginateSetPage,
  sort,
  sortValue,
  sortSetSort,
  sortOptions,
  createPath,
  createAllowedRoles,
  noResultsMsg,
}) => {
  const dispatch = useDispatch();

  const { userRole } = useSelector((state) => state.auth);

  // When the table is refreshed or the search params change, this function builds the querystring based on the supplied limit, page, & sort and dispatches the request
  const handleRefreshAndQueryChange = ({
    limitChange,
    pageChange,
    sortChange,
  }) => {
    let string = '';

    if (limitChange) {
      string = `limit=${limitChange}`;
    } else {
      string = `limit=${limitValue}`;
    }

    if (pageChange) {
      string = `${string + `&page=${pageChange}`}`;
    } else {
      string = `${string + `&page=${paginateCurPage}`}`;
    }

    if (filterString) {
      string += filterString();
    }
    if (sort || sortChange) {
      if (sortChange) {
        if (sortChange !== '') {
          string = `${string + `&sort=${sortChange}`}`;
        }
      } else {
        string = `${string + `&sort=${sortValue}`}`;
      }
    }
    return dispatch(refreshDispatch(string));
  };

  const handleLimitChange = (e) => {
    limitSetLimit(e.target.value);
    handleRefreshAndQueryChange({ limitChange: e.target.value });
  };

  const handleSortChange = (e) => {
    sortSetSort(e.target.value);
    handleRefreshAndQueryChange({ sortChange: e.target.value });
  };

  const handlePaginateOnChange = (e) => {
    const action = e.target.innerHTML;

    if (action === 'Previous') {
      if (paginateCurPage > 1) {
        paginateSetPage((prevState) => prevState - 1);
        handleRefreshAndQueryChange({ pageChange: paginateCurPage - 1 });
      }
    }

    if (action === 'Next') {
      paginateSetPage((prevState) => prevState + 1);
      handleRefreshAndQueryChange({ pageChange: paginateCurPage + 1 });
    }
  };

  const table = useRef();
  useEffect(() => {
    table.current = document.getElementById(tableId);
  }, [tableId]);

  return (
    <>
      <div className={classes.headingContainer}>
        <div className={classes.heading}> {heading}</div>
      </div>
      <div className={classes.tableButtonsContainer}>
        {' '}
        {filterValues?.join('').length > 0
          ? `Applied Filters: ${filterValues
              .filter((el) => el !== '')
              .join(', ')}`
          : 'Applied Filters: None'}
        {refresh || createPath || filterOptions ? (
          <>
            <div className={classes.tableButtonsContainer}>
              {refresh ? (
                <ButtonRefresh
                  refresh={
                    refreshDispatch ? handleRefreshAndQueryChange : refresh
                  }
                />
              ) : (
                <></>
              )}
              {createPath && createAllowedRoles?.includes(userRole) ? (
                <ButtonCreate path={createPath} />
              ) : (
                <></>
              )}
              {filterOptions ? (
                <ButtonFilter
                  filterHeading={filterHeading}
                  filterOptions={filterOptions}
                  filterValues={filterValues}
                  filterOnChange={filterOnChange}
                  filterSubmit={handleRefreshAndQueryChange}
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
      {sort || limit ? (
        <div className={classes.filtersAndSortContainer}>
          {limit ? (
            <ButtonLimit
              limitOnChange={handleLimitChange}
              limitValue={limitValue}
              limitId={tableId + 'limitBtn'}
              limitOptions={limitOptions}
            />
          ) : (
            <></>
          )}
          {sort ? (
            <ButtonSort
              sortId={tableId + 'sortBtn'}
              sortOnChange={handleSortChange}
              sortValue={sortValue}
              sortOptions={sortOptions}
            />
          ) : (
            <></>
          )}
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
            {children.length === 0 || !children.length ? (
              <tr>
                <td className={classes.noResults} colSpan='100%'>
                  {noResultsMsg ? noResultsMsg : `No results were found`}
                </td>
              </tr>
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
              onClick={handlePaginateOnChange}
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
              onClick={handlePaginateOnChange}
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
