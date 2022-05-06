import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { getProductionAreas } from '../../features/productionArea/productionAreaSlice';
import Table from '../layout/Table/Table';
import TableDataItem from '../layout/Table/TableDataItem/TableDataItem';
import Spinner from '../Spinner/Spinner';
import ButtonMain from '../layout/Button/ButtonMain/ButtonMain';
import NoResults from '../NoResults/NoResults';
import Error from '../Error/Error';

import { titleCase } from '../helperFunctions/helperFunctions';

import classes from './ProductionAreaResults.module.css';

const ProductionAreaResults = (props) => {
  const dispatch = useDispatch();

  const { productionAreas, loading, isError, message } = useSelector(
    (state) => state.productionArea
  );

  useEffect(() => {
    dispatch(getProductionAreas());
    if (isError) {
      toast.error(message);
    }
  }, [dispatch, isError, message]);

  const handleRefresh = () => {
    dispatch(getProductionAreas());
  };

  if (loading) {
    return <Spinner />;
  }

  if (!loading && isError) {
    return <Error></Error>;
  } else {
    return (
      <>
        <Table
          headers={['Area name', 'Description', '']}
          heading='Production Areas'
          refresh={handleRefresh}
          createPath='create'
        >
          {productionAreas.map((productionArea, index) => (
            <React.Fragment key={productionArea._id}>
              <TableDataItem
                navigatePath={`/control-panel/production-areas/${productionArea._id}`}
                dataPoints={[
                  titleCase(productionArea.areaName),
                  productionArea.description,
                ]}
              >
                <td>
                  <ButtonMain
                    className='m-0'
                    type='Link'
                    path={`${productionArea._id}`}
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

export default ProductionAreaResults;
