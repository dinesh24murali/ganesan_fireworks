import React, { useEffect } from 'react';
import _isEmpty from 'lodash/isEmpty';
import _map from 'lodash/map';

export default function SalesList({
  productList,
  getProducts,
}) {
  useEffect(() => {
    if (_isEmpty(productList)) getProducts();
  }, [getProducts, productList]);

  return (
    <div>
      <ul>
        {_map(productList, (item, index) => <li key={index}>{item}</li>)}
      </ul>
    </div>
  );
}