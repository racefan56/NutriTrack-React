import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getMenuItems } from '../../../features/menuItem/menuItemSlice';
import Table from '../../layout/Table/Table';
import TableDataItem from '../../layout/Table/TableDataItem/TableDataItem';
import Spinner from '../../Spinner/Spinner';
import ButtonMain from '../../layout/Button/ButtonMain/ButtonMain';
import Error from '../../Error/Error';

import { titleCase } from '../../helperFunctions/helperFunctions';

const MenuItemResults = () => {
  const dispatch = useDispatch();

  const { menuItems, loading, isError } = useSelector(
    (state) => state.menuItem
  );

  const [curPage, setCurPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [sort, setSort] = useState('+name');
  const [formData, setFormData] = useState({
    category: '',
  });

  const { category } = formData;

  // Only run on inital page load
  useEffect(() => {
    dispatch(getMenuItems(`limit=${limit}&sort=${sort}`));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reset filter options back to default values, and resend dispatch
  const handleReset = () => {
    if (category !== '') {
      setFormData({
        category: '',
      });
      dispatch(getMenuItems(`limit=${limit}&sort=${sort}`));
    }
  };

  // Create filter string
  const handleFilterString = () => {
    let string = '';
    if (category !== '') {
      string = `${string + `&category=${category}`}`;
    }

    return string;
  };

  const handleChange = (e) => {
    const key = e.target.id;
    setFormData((prevState) => ({ ...prevState, [key]: e.target.value }));
  };

  const filterOptions = {
    category: [
      { value: '', label: 'All' },
      { value: 'entree', label: 'entree' },
      { value: 'side', label: 'side' },
      { value: 'dessert', label: 'dessert' },
      { value: 'drink', label: 'drink' },
      { value: 'condiment', label: 'Condiment' },
      { value: 'supplement', label: 'supplement' },
    ],
  };

  const sortOptions = [
    { value: '+name', label: 'Name A-Z' },
    { value: '-name', label: 'Name Z-A' },
    { value: '+productionArea', label: 'Production Area A-Z' },
    { value: '-productionArea', label: 'Production Area Z-A' },
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
          headers={[
            'Name',
            'Category',
            <abbr title='Production Area'>Prod. Area</abbr>,
            'Diets',
            '',
          ]}
          heading='Menu Items'
          refresh
          refreshDispatch={getMenuItems}
          createPath='create'
          createAllowedRoles={['admin']}
          filterHeading='Menu Items'
          filterOptions={filterOptions}
          filterValues={[category]}
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
          {menuItems.map((menuItem, index) => (
            <React.Fragment key={menuItem._id}>
              <TableDataItem
                navigatePath={`/control-panel/menu-items/${menuItem._id}`}
                dataPoints={[
                  titleCase(menuItem.name),
                  menuItem.category,
                  menuItem.productionArea.areaName,
                  menuItem.dietAvailability.map((diet) => diet.name).join(', '),
                ]}
              >
                <td>
                  <ButtonMain
                    className='m-0'
                    type='Link'
                    path={`${menuItem._id}`}
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

export default MenuItemResults;
