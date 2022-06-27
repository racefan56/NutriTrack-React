import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { getMenus } from '../../features/menu/menuSlice';
import Table from '../layout/Table/Table';
import TableDataItem from '../layout/Table/TableDataItem/TableDataItem';
import Spinner from '../Spinner/Spinner';
import ButtonMain from '../layout/Button/ButtonMain/ButtonMain';
import Error from '../Error/Error';

import classes from './MenuResults.module.css';

const MenuResults = (props) => {
  const dispatch = useDispatch();

  const { menus, loading, isError, message } = useSelector(
    (state) => state.menu
  );
  const [curPage, setCurPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [sort, setSort] = useState('+day');
  const [formData, setFormData] = useState({
    day: '',
    mealPeriod: '',
    option: '',
  });

  const { day, mealPeriod, option } = formData;

  useEffect(() => {
    dispatch(getMenus(`limit=${limit}&sort=${sort}`));
    if (isError) {
      toast.error(message);
    }
  }, [dispatch, isError, limit, message, sort]);

  const handleReset = () => {
    if (day !== '' || mealPeriod !== '' || option !== '') {
      setFormData({
        day: '',
        mealPeriod: '',
        option: '',
      });
      dispatch(getMenus(`limit=${limit}&sort=${sort}`));
    }
  };

  const handleFilterString = () => {
    let string = '';

    if (day !== '') {
      string = `${string + `&day=${day}`}`;
    }
    if (mealPeriod !== '') {
      string = `${string + `&mealPeriod=${mealPeriod}`}`;
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
      { value: 'sunday', label: 'Sunday' },
      { value: 'monday', label: 'Monday' },
      { value: 'tuesday', label: 'Tuesday' },
      { value: 'wednesday', label: 'Wednesday' },
      { value: 'thursday', label: 'Thursday' },
      { value: 'friday', label: 'Friday' },
      { value: 'saturday', label: 'Saturday' },
    ],
    mealPeriod: [
      { value: '', label: 'All' },
      { value: 'Breakfast', label: 'Breakfast' },
      { value: 'Lunch', label: 'Lunch' },
      { value: 'Dinner', label: 'Dinner' },
    ],
    option: [
      { value: '', label: 'All' },
      { value: 'Hot', label: 'Hot' },
      { value: 'Cold', label: 'Cold' },
    ],
  };

  const sortOptions = [
    { value: '+day', label: 'Day A-Z' },
    { value: '-day', label: 'Day Z-A' },
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
          filterHeading='Menus'
          filterOptions={filterOptions}
          filterValues={[day, mealPeriod, option]}
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
          {menus.map((menu, index) => (
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
