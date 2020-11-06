import React, { useState, useEffect, useMemo } from 'react';
import { FormGroup, Modal, ModalHeader, ModalBody, Input, FormFeedback } from 'reactstrap';
import _isArray from 'lodash/isArray';
import _map from 'lodash/map';
import _assign from 'lodash/assign';
import _forEach from 'lodash/forEach';

import { packTypesMap } from '../../../constants/AppConstants';
import SalesProductListContainer from './SalesProductList.style';

import PlusIcon from '../../../assets/svg/plus.svg';
import Trash from '../../../assets/png/trash.png';
import Currency from '../../../assets/png/currency.png';
import Box from '../../../assets/png/box.png';

const SelectProductModal = ({
  onChangeList,
  selectedProductList,
  isOpen,
  onClose,
  searchText,
  onSearch,
  filteredProductList,
}) => {
  const list = _isArray(filteredProductList) ? filteredProductList : [];

  useEffect(() => {
    onSearch({ target: { value: '' } });
  }, []);

  const selectedProductsMap = useMemo(() => {
    const temp = {};
    if (_isArray(selectedProductList)) _forEach(selectedProductList, (item) => {
      temp[item.id] = true;
    });
    return temp;
  }, [selectedProductList.length]);

  const onAdd = (item) => {
    onChangeList({
      isAdded: true,
      item,
    });
  };

  const onRemove = (item) => {
    onChangeList({
      isAdded: false,
      item,
    });
  };

  return (
    <Modal size="lg" isOpen={isOpen} toggle={() => onClose()}>
      <ModalHeader toggle={() => onClose()}>Add/Remove crackers</ModalHeader>
      <ModalBody>
        <SalesProductListContainer className="mb-0">
          <div className="sales-product-list-header justify-to-start">
            <div className="sales-product-list-header__search">
              <input type="text" className="form-control" value={searchText} onChange={onSearch} placeholder="Search" />
            </div>
          </div>
          {list.length ? <div className="sales-product-list">
            {_map(list, (item, index) => (
              <div key={index} className="sales-product-item">
                <div className="sales-product-item-line1">
                  <div title={item.name} className="sales-product-item-line1__name">{item.name}</div>
                  {selectedProductsMap[item.id] ? <img
                    title="Remove cracker"
                    onClick={() => onRemove(item)}
                    src={Trash}
                    className="sales-product-item-line1__edit-button"
                    alt="remove"
                  /> : <img
                    title="Add cracker"
                    onClick={() => onAdd(item)}
                    src={PlusIcon}
                    className="sales-product-item-line1__edit-button"
                    alt="add"
                  />}
                </div>
                <div className="sales-product-item-line2">
                  <div className="sales-product-item-line2__text">
                    <img src={Box} alt="pack_text" className="sales-product-packing" />
                    {packTypesMap[item.pack_text] ? packTypesMap[item.pack_text] : ''}
                  </div>
                  <div className="sales-product-item-line2__text">
                    <img src={Currency} alt="Rs. " className="sales-product-currency" />
                    {item.price}
                  </div>
                  <div className="sales-product-item-line2__text">
                    ID:
                    <span className="id">
                      {item.id}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
            : <div className="sales-product-list-empty">
              <div>No crackers found</div>
            </div>}
        </SalesProductListContainer>
      </ModalBody>
    </Modal>
  );
};

export default function SalesProductList({
  productList,
  onChangeList,
  filterProducts,
  onChangeQuantity,
  selectedProductList,
}) {
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [errors, setErrors] = useState({});

  const onRemove = (item) => {
    onChangeList({
      isAdded: false,
      item,
    });
  };

  const list = _isArray(selectedProductList) ? selectedProductList : [];

  const onSearch = ({ target }) => {
    filterProducts(target.value);
    setSearchText(target.value);
  };

  const onChange = (qty, item) => {
    if (qty < 0 || !qty) {
      setErrors((values) => {
        const temp = _assign({}, values, { [item.id]: true });
        return temp;
      });
    } else {
      setErrors((values) => {
        const temp = _assign({}, values, { [item.id]: false });
        return temp;
      });
    }
    onChangeQuantity(qty, item);
  };

  return <>
    <SelectProductModal
      searchText={searchText}
      onSearch={onSearch}
      onChangeList={onChangeList}
      selectedProductList={selectedProductList}
      filteredProductList={productList}
      isOpen={showModal}
      onChangeQuantity={onChangeQuantity}
      onClose={() => setShowModal(false)}
    />
    <SalesProductListContainer>
      <div className="sales-product-list-header">
        <button type="button" title="Add new cracker" onClick={() => setShowModal(true)} className="btn btn-secondary btn-round">
          <img className="add-item mr-3" src={PlusIcon} alt="add" />
          Add Cracker
        </button>
      </div>
      {list.length ? <div className="sales-product-list">
        {_map(list, (item, index) => (
          <div key={index} className="sales-product-item">
            <div className="sales-product-item-line1">
              <div title={item.name} className="sales-product-item-line1__name">{item.name}</div>
              <img title="Remove product" onClick={() => onRemove(item)} src={Trash} className="sales-product-item-line1__edit-button" alt="edit" />
            </div>
            <div className="sales-product-item-line2">
              <div className="sales-product-item-line2__text">
                <img src={Box} alt="pack_text" className="sales-product-packing" />
                {packTypesMap[item.pack_text] ? packTypesMap[item.pack_text] : ''}
              </div>
              <div className="sales-product-item-line2__text">
                <img src={Currency} alt="Rs. " className="sales-product-currency" />
                {item.price}
              </div>
              <div className="sales-product-item-line2__text">
                ID:
                <span className="id">
                  {item.id}
                </span>
              </div>
              <div className="sales-product-item-line2__qty">
                <FormGroup>
                  <Input
                    invalid={errors[item.id]}
                    value={item.quantity}
                    onChange={(event) => onChange(event.target.value, item)}
                    type="number"
                    bsSize="sm"
                    placeholder="Qty"
                  />
                  <FormFeedback className="mt-3">Quantity is Required</FormFeedback>
                </FormGroup>
              </div>
            </div>
          </div>
        ))}
      </div> : <div className="sales-product-list-empty">
        <button onClick={() => setShowModal(true)} type="button" className="btn btn-primary">Add crackers</button>
      </div>}
    </SalesProductListContainer>
  </>;
}
