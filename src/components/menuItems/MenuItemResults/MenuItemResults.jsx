import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { getMenuItems } from '../../../features/menuItem/menuItemSlice';
import { getProductionAreas } from '../../../features/productionArea/productionAreaSlice';
import Table from '../../layout/Table/Table';
import TableDataItem from '../../layout/Table/TableDataItem/TableDataItem';
import Spinner from '../../Spinner/Spinner';
import ButtonSecondary from '../../layout/Button/ButtonSecondary/ButtonSecondary';
import ButtonMain from '../../layout/Button/ButtonMain/ButtonMain';
import NoResults from '../../NoResults/NoResults';
import Error from '../../Error/Error';

import { titleCase } from '../../helperFunctions/helperFunctions';

import classes from './MenuItemResults.module.css';

const MenuItemResults = (props) => {
  const dispatch = useDispatch();

  const { menuItems, loading, isError, message } = useSelector(
    (state) => state.menuItem
  );
  const { productionAreas } = useSelector((state) => state.productionArea);

  const [curPage, setCurPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [sort, setSort] = useState('+name');
  const [formData, setFormData] = useState({
    category: '',
    productionArea: '',
    diet: '',
  });

  const { category, productionArea, diet } = formData;

  useEffect(() => {
    dispatch(getMenuItems(`limit=${limit}&sort=${sort}`));
    if (isError) {
      toast.error(message);
    }
  }, [dispatch, isError, limit, message, sort]);

  const handleReset = () => {
    if (category !== '' || productionArea !== '' || diet !== '') {
      setFormData({
        category: '',
        productionArea: '',
        diet: '',
      });
      dispatch(getMenuItems(`limit=${limit}&sort=${sort}`));
    }
  };

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
    { value: '+category', label: 'Category A-Z' },
    { value: '-category', label: 'Category Z-A' },
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
          filterHeading='Menu Items'
          filterOptions={filterOptions}
          filterValues={[category, productionArea, diet]}
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
