import React, { useEffect } from 'react';
import _isEmpty from 'lodash/isEmpty';
import _map from 'lodash/map';

export default function SalesList({
  salesList,
  // getSalesList,
}) {
  useEffect(() => {
    if (_isEmpty(salesList)) {
      // getSalesList();
    }
  }, []);

  return (
    <div>
      <ul>
        {_map(salesList, (item, index) => <li key={index}>{index}</li>)}
      </ul>
    </div>
  );
}
