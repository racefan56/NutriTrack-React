import React from 'react';

import ContainerSideNav from '../../components/layout/ContainerSideNav/ContainerSideNav';
import SideNav from '../../components/layout/SideNav/SideNav';
import ProductionAreaResults from '../../components/ProductionAreaResults/ProductionAreaResults';

import classes from './ProductionAreas.module.css';

const ProductionAreas = (props) => {
  return (
    <>
      <SideNav />
      <ContainerSideNav>
        <ProductionAreaResults />
      </ContainerSideNav>
    </>
  );
};

export default ProductionAreas;
