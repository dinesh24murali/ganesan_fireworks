import React, { useState, useEffect, useMemo, useRef } from 'react';
import _isEmpty from 'lodash/isEmpty';
import _map from 'lodash/map';
import _isArray from 'lodash/isArray';
import _assign from 'lodash/assign';
import _floor from 'lodash/floor';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import AddEditCustomer from '../AddEditCustomer/AddEditCustomer';
import { tablePageSize } from '../../../constants/AppConstants';
import ConfirmModal, {
  ConfirmModel,
} from '../../ConfirmModal/ConfirmModal';

import CustomerListContainer from './CustomerList.style';
import PlusIcon from '../../../assets/svg/plus.svg';
import Pencil from '../../../assets/svg/pencil.svg';
import Phone from '../../../assets/png/phone.png';
import Email from '../../../assets/png/email.png';
import Trash from '../../../assets/png/trash.png';

export default function CustomerList({
  customerList,
  // getCustomers,
  deleteCustomer,
  addCustomer,
  updateCustomer,
  filterCustomers,
  hasNextPage,
  hasPreviousPage,
  total,
}) {
  const [showModal, setShowModal] = useState(false);
  const [editCustomer, setEditCustomer] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const deleteCustomerId = useRef();
  const [modalConfig, setModalConfig] = useState(new ConfirmModel({
    onClose: (val) => {
      if (val) deleteCustomer(deleteCustomerId.current);
      setModalConfig((config) => _assign({}, config, { isOpen: false }));
    },
    text: 'Are you sure you want to delete this Customer?',
    isOpen: false,
    title: 'Delete Customer!',
    showCancel: true,
    clickOutsideToClose: true,
    positiveBtnText: 'I\'m sure',
    negetiveBtnText: 'cancel',
  }));

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

  useEffect(() => {
    if (_isEmpty(customerList)) {
      filterCustomers('', 1);
    }
  }, []);

  const handleModal = (value) => {
    if (value && editCustomer) {
      updateCustomer(editCustomer.id, value);
    } else if (value && !editCustomer) {
      addCustomer(value);
    }
    setEditCustomer(null);
    setShowModal(false);
  };

  const onEdit = (customer) => {
    setShowModal(true);
    setEditCustomer(customer);
  };

  const onDelete = (customer) => {
    deleteCustomerId.current = customer.id;
    setModalConfig((config) => _assign({}, config, { isOpen: true }));
  };

  const onSearch = ({ target }) => {
    setPage(1);
    filterCustomers(target.value, 1);
    setSearchText(target.value);
  };

  const onPrevious = () => {
    if (page > 1) {
      setPage((value) => value - 1);
      filterCustomers(searchText, page - 1);
    }
  };

  const onNext = () => {
    if (page > -1) {
      setPage((value) => value + 1);
      filterCustomers(searchText, page + 1);
    }
  };

  const gotoPage = (selectedPage) => {
    filterCustomers(searchText, selectedPage);
    setPage(selectedPage);
  };

  const list = _isArray(customerList) ? customerList : [];

  return (
    <div className="container">
      <ConfirmModal config={modalConfig} />
      <AddEditCustomer isOpen={showModal} onClose={handleModal} isUpdate={editCustomer} />
      <h3 className="mt-4 ml-3">Customers</h3>
      <CustomerListContainer>
        <div className="customer-list-header">
          <div className="customer-list-header__search">
            <input type="text" className="form-control" value={searchText} onChange={onSearch} placeholder="Search" />
          </div>
          <button type="button" title="Add new cracker" onClick={() => setShowModal(true)} className="btn btn-secondary btn-round">
            <img className="add-item mr-3" src={PlusIcon} alt="add" />
            Add new
          </button>
        </div>
        <div className="customer-list">
          {_map(list, (item, index) => (
            <div key={index} className="customer-item">
              <div className="customer-item-line1">
                <div title={item.name} className="customer-item-line1__name">{item.name}</div>
                <div>
                  <img title="Edit customer" onClick={() => onEdit(item)} src={Pencil} className="customer-item-line1__edit-button" alt="edit" />
                  <img title="Delete customer" onClick={() => onDelete(item)} src={Trash} className="customer-item-line1__delete-button" alt="Delete" />
                </div>
              </div>
              <div className="customer-item-line2">
                <div className="customer-item-line2__text">
                  <img src={Phone} alt="Phone no:" className="customer-phone" />
                  <span title={item.phone_no}>{item.phone_no}</span>
                </div>
                <div className="customer-item-line2__text">
                  ID:
                  <span className="id">
                    {item.id}
                  </span>
                </div>
                {!_isEmpty(item.email) ? <div className="customer-item-line2__text">
                  <img src={Email} alt="pack_text" className="customer-email" />
                  <span title={item.email}>{item.email}</span>
                </div> : null}
              </div>
            </div>
          ))}
        </div>
        <div className="customer-pagination-container">
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
      </CustomerListContainer>
    </div>
  );
}
