import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getPrepList } from '../../features/prepList/prepListSlice';
import { getProductionAreas } from '../../features/productionArea/productionAreaSlice';
import Table from '../layout/Table/Table';
import TableDataItem from '../layout/Table/TableDataItem/TableDataItem';
import Spinner from '../Spinner/Spinner';
import Error from '../Error/Error';

import { titleCase, getDayOfWeek } from '../helperFunctions/helperFunctions';

// Generates a food preparation list for the specified day, mealPeriod, & food production area. Gives the menu items along with portion sizes, and quantity ordered
const PrepListResults = () => {
  const dispatch = useDispatch();

  const { prepList, loading, isError } = useSelector((state) => state.prepList);
  const { productionAreas } = useSelector((state) => state.productionArea);

  const [curPage, setCurPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [formData, setFormData] = useState({
    mealPeriod: 'Breakfast',
    productionArea: null,
    day: getDayOfWeek(),
  });

  const { mealPeriod, productionArea, day } = formData;

  useEffect(() => {
    dispatch(getProductionAreas());
  }, [dispatch]);

  useEffect(() => {
    if (productionAreas?.length) {
      setFormData((prevState) => {
        return { ...prevState, productionArea: productionAreas[0].areaName };
      });
    }
  }, [productionAreas]);

  // reset filters and resend dispatch
  const handleReset = () => {
    setFormData({
      mealPeriod: 'Breakfast',
      productionArea: productionAreas ? productionAreas[0].areaName : '',
      day: getDayOfWeek(),
    });
    dispatch(
      getPrepList(
        `limit=${limit}&mealPeriod=Breakfast&productionArea=${
          productionAreas[0].areaName
        }&day=${getDayOfWeek()}`
      )
    );
  };

  // Create filter string
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
      { value: 'Breakfast', label: 'Breakfast' },
      { value: 'Lunch', label: 'Lunch' },
      { value: 'Dinner', label: 'Dinner' },
    ],
    productionArea: productionAreas?.map((productionArea) => {
      return { value: productionArea.areaName, label: productionArea.areaName };
    }),
    day: [
      { value: 'Sunday', label: 'Sunday' },
      { value: 'Monday', label: 'Monday' },
      { value: 'Tuesday', label: 'Tuesday' },
      { value: 'Wednesday', label: 'Wednesday' },
      { value: 'Thursday', label: 'Thursday' },
      { value: 'Friday', label: 'Friday' },
      { value: 'Saturday', label: 'Saturday' },
    ],
  };

  if (!productionAreas || loading) {
    return <Spinner />;
  }

  if (!loading && isError) {
    return <Error></Error>;
  } else {
    return (
      <>
        <Table
          headers={['Item', 'Portion Size', 'Portion Unit', 'Quantity']}
          heading='Prep List Report'
          refresh
          refreshDispatch={getPrepList}
          filterHeading='Prep List Report'
          filterOptions={filterOptions}
          filterValues={[mealPeriod, productionArea, day]}
          filterOnChange={handleChange}
          filterReset={handleReset}
          filterString={handleFilterString}
          noResultsMsg={
            !prepList
              ? 'Use the filter button to get a report'
              : 'No prep items were returned'
          }
          limit
          limitValue={limit}
          limitSetLimit={setLimit}
          paginate
          paginateCurPage={curPage}
          paginateSetPage={setCurPage}
        >
          {prepList?.length > 0 ? (
            prepList.map((menuItem, index) => (
              <React.Fragment key={`${menuItem.name}${index}`}>
                <TableDataItem
                  dataPoints={[
                    titleCase(menuItem.name),
                    menuItem.portionSize,
                    menuItem.portionUnit,
                    menuItem.count,
                  ]}
                ></TableDataItem>
              </React.Fragment>
            ))
          ) : (
            <>frs</>
          )}
        </Table>
      </>
    );
  }
};

export default PrepListResults;
