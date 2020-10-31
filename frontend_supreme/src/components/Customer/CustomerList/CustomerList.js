import React, { useState, useEffect } from 'react';
import _isEmpty from 'lodash/isEmpty';
import _map from 'lodash/map';
import _isArray from 'lodash/isArray';

import AddEditCustomer from '../AddEditCustomer/AddEditCustomer';

import CustomerListContainer from './CustomerList.style';
import PlusIcon from '../../../assets/svg/plus.svg';
import Pencil from '../../../assets/svg/pencil.svg';
import Phone from '../../../assets/png/phone.png';
import Email from '../../../assets/png/email.png';

export default function CustomerList({
  customerList,
  getCustomers,
  addCustomer,
  updateCustomer,
  filterCustomers,
}) {
  const [showModal, setShowModal] = useState(false);
  const [editCustomer, setEditCustomer] = useState(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (_isEmpty(customerList)) {
      getCustomers();
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

  const onSearch = ({ target }) => {
    filterCustomers(target.value);
    setSearchText(target.value);
  };

  const list = _isArray(customerList) ? customerList : [];

  return (
    <div className="container">
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
                <img title="Edit customer" onClick={() => onEdit(item)} src={Pencil} className="customer-item-line1__edit-button" alt="edit" />
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
      </CustomerListContainer>
    </div>
  );
}
