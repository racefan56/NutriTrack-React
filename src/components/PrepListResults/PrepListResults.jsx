import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { getPrepList } from '../../features/prepList/prepListSlice';
import { getProductionAreas } from '../../features/productionArea/productionAreaSlice';
import Table from '../layout/Table/Table';
import TableDataItem from '../layout/Table/TableDataItem/TableDataItem';
import Spinner from '../Spinner/Spinner';

import Error from '../Error/Error';

import { titleCase } from '../helperFunctions/helperFunctions';

const PrepListResults = (props) => {
  const dispatch = useDispatch();

  const { prepList, loading, isError, message } = useSelector(
    (state) => state.prepList
  );
  const { productionAreas } = useSelector((state) => state.productionArea);

  const [curPage, setCurPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [formData, setFormData] = useState({
    mealPeriod: '',
    productionArea: '',
    day: '',
  });

  const { mealPeriod, productionArea, day } = formData;

  useEffect(() => {
    dispatch(getPrepList(`limit=${limit}`));
    if (isError) {
      toast.error(message);
    }
  }, [dispatch, isError, limit, message]);

  useEffect(() => {
    dispatch(getProductionAreas());
  }, [dispatch]);

  const handleReset = () => {
    if (mealPeriod !== '' || productionArea !== '' || day !== '') {
      setFormData({
        mealPeriod: '',
        productionArea: '',
        day: '',
      });
      dispatch(getPrepList(`limit=${limit}`));
    }
  };

  const handleFilterString = () => {
    let string = '';

    if (mealPeriod !== '') {
      string = `${string + `&mealPeriod=${mealPeriod}`}`;
    }
    if (productionArea !== '') {
      string = `${string + `&productionArea=${productionArea}`}`;
    }
    if (day !== '') {
      string = `${string + `&day=${day}`}`;
    }

    return string;
  };

  const handleChange = (e) => {
    const key = e.target.id;
    setFormData((prevState) => ({ ...prevState, [key]: e.target.value }));
  };

  const filterOptions = {
    mealPeriod: [
      { value: '', label: 'All' },
      { value: 'Breakfast', label: 'Breakfast' },
      { value: 'Lunch', label: 'Lunch' },
      { value: 'Dinner', label: 'Dinner' },
    ],
    productionArea: productionAreas?.map((productionArea) => {
      return { value: productionArea.name, label: productionArea.name };
    }),
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
  };

  if (loading || !prepList) {
    return <Spinner />;
  }

  if (!loading && isError) {
    return <Error></Error>;
  } else {
    return (
      <>
        <Table
          headers={['Item', 'Quantity']}
          heading='Prep List Report'
          refresh
          refreshDispatch={getPrepList}
          filterHeading='Prep List Report'
          filterOptions={filterOptions}
          filterValues={[mealPeriod, productionArea, day]}
          filterOnChange={handleChange}
          filterReset={handleReset}
          filterString={handleFilterString}
          limit
          limitValue={limit}
          limitSetLimit={setLimit}
          paginate
          paginateCurPage={curPage}
          paginateSetPage={setCurPage}
        >
          {prepList.map((menuItem, index) => (
            <React.Fragment>
              <TableDataItem
                dataPoints={[titleCase(menuItem.name), menuItem.category]}
              ></TableDataItem>
            </React.Fragment>
          ))}
        </Table>
      </>
    );
  }
};

export default PrepListResults;
