import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getMenus } from '../../features/menu/menuSlice';
import Table from '../layout/Table/Table';
import TableDataItem from '../layout/Table/TableDataItem/TableDataItem';
import Spinner from '../Spinner/Spinner';
import ButtonMain from '../layout/Button/ButtonMain/ButtonMain';
import Error from '../Error/Error';

const MenuResults = () => {
  const dispatch = useDispatch();

  const { menus, loading, isError } = useSelector((state) => state.menu);
  const [curPage, setCurPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [sort, setSort] = useState('+mealPeriod');
  const [formData, setFormData] = useState({
    day: '',
    option: '',
  });

  const { day, option } = formData;

  // Only run on initial page load
  useEffect(() => {
    dispatch(getMenus(`limit=${limit}&sort=${sort}`));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reset filter options back to defaults. Resend dispatch
  const handleReset = () => {
    if (day !== '' || option !== '') {
      setFormData({
        day: '',
        option: '',
      });
      dispatch(getMenus(`limit=${limit}&sort=${sort}`));
    }
  };

  // Create filter string
  const handleFilterString = () => {
    let string = '';

    if (day !== '') {
      string = `${string + `&day=${day}`}`;
    }
    if (option !== '') {
      string = `${string + `&option=${option}`}`;
    }

    return string;
  };

  const handleChange = (e) => {
    const key = e.target.id;
    setFormData((prevState) => ({ ...prevState, [key]: e.target.value }));
  };

  const filterOptions = {
    day: [
      { value: '', label: 'All' },
      { value: 'Sunday', label: 'Sunday' },
      { value: 'Monday', label: 'Monday' },
      { value: 'Tuesday', label: 'Tuesday' },
      { value: 'Wednesday', label: 'Wednesday' },
      { value: 'Thursday', label: 'Thursday' },
      { value: 'Friday', label: 'Friday' },
      { value: 'Saturday', label: 'Saturday' },
    ],
    option: [
      { value: '', label: 'All' },
      { value: 'Hot', label: 'Hot' },
      { value: 'Cold', label: 'Cold' },
    ],
  };

  const sortOptions = [
    { value: '+mealPeriod', label: 'Meal Period A-Z' },
    { value: '-mealPeriod', label: 'Meal Period Z-A' },
  ];

  if (loading) {
    return <Spinner />;
  }

  if (!loading && isError) {
    return <Error></Error>;
  } else {
    return (
      <>
        <Table
          headers={['Day', 'Meal Period', 'Option', 'Diets', '']}
          heading='Menus'
          refresh
          refreshDispatch={getMenus}
          createPath='create'
          createAllowedRoles={['admin', 'dietitian']}
          filterHeading='Menus'
          filterOptions={filterOptions}
          filterValues={[day, option]}
          filterOnChange={handleChange}
          filterReset={handleReset}
          filterString={handleFilterString}
          limit
          limitValue={limit}
          limitSetLimit={setLimit}
          paginate
          paginateCurPage={curPage}
          paginateSetPage={setCurPage}
          sort
          sortInitialVal='+day'
          sortValue={sort}
          sortSetSort={setSort}
          sortOptions={sortOptions}
        >
          {menus.map((menu) => (
            <React.Fragment key={menu._id}>
              <TableDataItem
                navigatePath={`/control-panel/menus/${menu._id}`}
                dataPoints={[
                  menu.day,
                  menu.mealPeriod,
                  menu.option,
                  menu.dietAvailability
                    .map((diet) => {
                      return diet.name;
                    })
                    .toString(),
                ]}
              >
                <td>
                  <ButtonMain
                    className='m-0'
                    type='Link'
                    path={`${menu._id}`}
                    text='View/Edit'
                  />
                </td>
              </TableDataItem>
            </React.Fragment>
          ))}
        </Table>
      </>
    );
  }
};

export default MenuResults;
