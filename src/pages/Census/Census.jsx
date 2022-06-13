import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getCensus } from './../../features/patient/patientSlice';
import { getUnits } from './../../features/unit/unitSlice';

import {
  formatDate,
  ISOdateOnly,
  formEditMode,
  invalidInput,
  getToday,
  roomsAvailableByUnit,
} from '../../components/helperFunctions/helperFunctions';

import Spinner from './../../components/Spinner/Spinner';
import ContainerSideNav from '../../components/layout/ContainerSideNav/ContainerSideNav';
import SideNav from '../../components/layout/SideNav/SideNav';
import Table from '../../components/layout/Table/Table';
import TableDataItem from '../../components/layout/Table/TableDataItem/TableDataItem';

const Census = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading: loadingCensus, census } = useSelector(
    (state) => state.patient
  );
  const { loading: loadingUnits, units } = useSelector((state) => state.unit);

  useEffect(() => {
    dispatch(getCensus());
    dispatch(getUnits());
  }, [dispatch]);

  const npoTotalsArr = [];
  const npoTotal = useRef(0);
  const eatingTotalsArr = [];
  const eatingTotal = useRef(0);
  const overallTotal = 0;

  const censusCount = (type, unit, totalsArr) => {
    const count = Number(
      census[type]
        .flatMap((eatingUnit) => {
          return eatingUnit._id === unit ? eatingUnit.numPatients : 0;
        })
        .reduce((prevVal, curVal) => prevVal + curVal, 0)
    );
    totalsArr.push(count);
    return count;
  };

  const handleRefresh = () => {
    dispatch(getCensus());
    dispatch(getUnits());
  };

  if (loadingCensus || loadingUnits || !census) {
    return <Spinner />;
  } else {
    const tableData = units.map((unit) => {
      return unit.unitName;
    });

    return (
      <>
        <SideNav />
        <ContainerSideNav>
          <Table
            refresh={handleRefresh}
            tableId='censusTable'
            headers={['Unit', 'Eating', 'NPO', 'Total']}
            heading={`Census As Of ${getToday()}`}
          >
            {tableData.map((unit) => {
              const eatingCount = censusCount('eating', unit, eatingTotalsArr);
              const npoCount = censusCount('npo', unit, npoTotalsArr);
              return (
                <TableDataItem
                  key={unit}
                  dataPoints={[
                    unit,
                    eatingCount,
                    npoCount,
                    npoCount + eatingCount,
                  ]}
                ></TableDataItem>
              );
            })}
            <TableDataItem
              key='totals'
              dataPoints={[
                'TOTALS',
                (eatingTotal.current = eatingTotalsArr.reduce(
                  (prev, cur) => prev + cur,
                  0
                )),
                (npoTotal.current = npoTotalsArr.reduce(
                  (prev, cur) => prev + cur,
                  0
                )),
                eatingTotal.current + npoTotal.current,
              ]}
            ></TableDataItem>
          </Table>
        </ContainerSideNav>
      </>
    );
  }
};

export default Census;
