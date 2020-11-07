import React, { useEffect, useState, useMemo, useRef } from 'react';
import { FormGroup, Pagination, PaginationItem, PaginationLink, Table } from 'reactstrap';
import _isEmpty from 'lodash/isEmpty';
import _floor from 'lodash/floor';
import _map from 'lodash/map';
import _assign from 'lodash/assign';
import { Link } from 'react-router-dom';
import Select from 'react-select';

import ConfirmModal, {
  ConfirmModel,
} from '../../ConfirmModal/ConfirmModal';
import { tablePageSize } from '../../../constants/AppConstants';
import { getUIDate } from '../../../utils/utils';

import SalesListContainer from './SalesList.style';
import Trash from '../../../assets/png/trash.png';
import ArrowRight from '../../../assets/png/arrow_right.png';
import ArrowDown from '../../../assets/png/arrow_down.png';

export default function SalesList({
  salesList,
  hasNextPage,
  hasPreviousPage,
  getSalesList,
  getSalesData,
  deleteSales,
  customerList,
  setSalesFilter,
  filterCustomers,
  total,
  customer,
}) {
  const [page, setPage] = useState(1);
  const [isExpandSale, setIsExpandSale] = useState(null);
  const deleteSaleId = useRef();
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const pageCount = useMemo(() => {
    if (total <= 0) return [];
    let numberOfPages = _floor(total / tablePageSize);
    if (total % tablePageSize > 0) numberOfPages += 1;
    const temp = [];
    let i = 1;
    while (i <= numberOfPages) {
      temp.push(i);
      i += 1;
    }
    return temp;
  }, [total]);
  const [modalConfig, setModalConfig] = useState(new ConfirmModel({
    onClose: (val) => {
      if (val) deleteSales(deleteSaleId.current);
      setModalConfig((config) => _assign({}, config, { isOpen: false }));
    },
    text: 'Are you sure you want to delete this Sale?',
    isOpen: false,
    title: 'Delete Sale!',
    showCancel: true,
    clickOutsideToClose: true,
    positiveBtnText: 'I\'m sure',
    negetiveBtnText: 'cancel',
  }));

  useEffect(() => {
    getSalesList(1);
    filterCustomers('', 1);
  }, []);

  useEffect(() => {
    let temp = [];
    if (!_isEmpty(customerList)) {
      temp = _map(customerList, (item) => ({ value: item.id, label: `${item.name} - ${item.id}` }));
    }
    setCustomers(temp);
    setIsLoading(false);
  }, [customerList]);

  const deleteSale = (sale) => {
    deleteSaleId.current = sale.id;
    setModalConfig((config) => _assign({}, config, { isOpen: true }));
  };

  const onPrevious = () => {
    if (page > 1) {
      setPage((value) => value - 1);
      getSalesList(page - 1);
      setIsExpandSale(null);
    }
  };

  const onNext = () => {
    if (page > -1) {
      setPage((value) => value + 1);
      getSalesList(page + 1);
      setIsExpandSale(null);
    }
  };

  const gotoPage = (selectedPage) => {
    getSalesList(selectedPage);
    setIsExpandSale(null);
    setPage(selectedPage);
  };

  const toggleExpandSale = (sale) => {
    if (!sale.sales_data) {
      getSalesData(sale.id);
    }
    if (sale.id === isExpandSale) setIsExpandSale(null);
    else setIsExpandSale(sale.id);
  };

  const onFilterCustomers = (event) => {
    filterCustomers(event, 1);
    setIsLoading(true);
  };

  const onCustomerChange = (event) => {
    setSalesFilter(event);
  };

  return (
    <SalesListContainer className="container">
      <ConfirmModal config={modalConfig} />
      <div className="row mt-4">
        <div className="col-6">
          <FormGroup>
            <Select
              placeholder="Customer filter"
              className="basic-single"
              classNamePrefix="select"
              defaultValue={customer}
              value={customer}
              isLoading={isLoading}
              isClearable
              isSearchable
              onChange={onCustomerChange}
              name="color"
              onInputChange={onFilterCustomers}
              options={customers}
            />
          </FormGroup>
        </div>
      </div>
      <Table className="sales-table">
        <thead>
          <tr>
            <th style={{ width: '5%' }} />
            <th>Invoice no</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Discount</th>
            <th>Paid</th>
            <th style={{ width: '5%' }} />
          </tr>
        </thead>
        <tbody>
          {_map(salesList, (sale, index) => <>
            <tr key={index}>
              <td>
                {isExpandSale === sale.id
                  ? <img onClick={() => toggleExpandSale(sale)} src={ArrowDown} title="collapse cracker list" alt="collapse_sales_data" className="cracker_list_arrow" />
                  : <img onClick={() => toggleExpandSale(sale)} src={ArrowRight} title="expand cracker list" alt="expand_sales_data" className="cracker_list_arrow" />}
              </td>
              <td>
                <Link to={`/edit-sales/${sale.id}`} className="text-primary">{sale.invoice_no}</Link>
              </td>
              <td>{getUIDate(sale.date)}</td>
              <td>{sale.customer_name}</td>
              <td>{sale.discount}</td>
              <td>{sale.paid}</td>
              <td>
                <img onClick={() => deleteSale(sale)} src={Trash} title="Delete sale" alt="delete_sales" className="cracker_list_arrow" />
              </td>
            </tr>
            {isExpandSale === sale.id && sale.sales_data && <tr className="bg-light">
              <td colSpan="7" className="p-0">
                <div className="sales-data-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Cracker name</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {_map(sale.sales_data, (item) => (<tr>
                        <td>{item.item_name}</td>
                        <td>{item.quantity}</td>
                      </tr>))}
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>}
          </>)}
        </tbody>
      </Table>
      <div className="pagination-container">
        {!_isEmpty(pageCount) && <Pagination>
          <PaginationItem>
            <PaginationLink disabled={!hasPreviousPage} previous onClick={onPrevious} />
          </PaginationItem>
          {_map(pageCount, (item) => <PaginationItem active={item === page} key={item}>
            <PaginationLink onClick={() => gotoPage(item)}>
              {item}
            </PaginationLink>
          </PaginationItem>)}
          <PaginationItem>
            <PaginationLink disabled={!hasNextPage} next onClick={onNext} />
          </PaginationItem>
        </Pagination>}
      </div>
    </SalesListContainer>
  );
}
