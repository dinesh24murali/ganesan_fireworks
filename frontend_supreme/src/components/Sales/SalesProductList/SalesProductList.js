import React, { useState, useEffect, useMemo } from 'react';
import {
  FormGroup, Modal, ModalHeader, ModalBody, Input, FormFeedback,
  Pagination, PaginationItem, PaginationLink,
} from 'reactstrap';
import _isArray from 'lodash/isArray';
import _map from 'lodash/map';
import _assign from 'lodash/assign';
import _forEach from 'lodash/forEach';
import _isEmpty from 'lodash/isEmpty';
import _floor from 'lodash/floor';

import { packTypesMap, tablePageSize } from '../../../constants/AppConstants';
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
  total,
  hasNextPage,
  hasPreviousPage,
}) => {
  const list = _isArray(filteredProductList) ? filteredProductList : [];
  const [page, setPage] = useState(1);

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
    onSearch({ target: { value: '' } }, 1);
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

  const onPrevious = () => {
    if (page > 1) {
      setPage((value) => value - 1);
      onSearch({ target: { value: searchText } }, page - 1);
    }
  };

  const onNext = () => {
    if (page > -1) {
      setPage((value) => value + 1);
      onSearch({ target: { value: searchText } }, page + 1);
    }
  };

  const gotoPage = (selectedPage) => {
    onSearch({ target: { value: searchText } }, selectedPage);
    setPage(selectedPage);
  };

  const onChange = (event) => {
    onSearch(event, 1);
    setPage(1);
  };

  return (
    <Modal size="lg" isOpen={isOpen} toggle={() => onClose()}>
      <ModalHeader toggle={() => onClose()}>Add/Remove crackers</ModalHeader>
      <ModalBody>
        <SalesProductListContainer className="mb-0">
          <div className="sales-product-list-header justify-to-start">
            <div className="sales-product-list-header__search">
              <input type="text" className="form-control" value={searchText} onChange={onChange} placeholder="Search" />
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
          <div className="sales-product-pagination-container">
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
        </SalesProductListContainer>
      </ModalBody>
    </Modal>
  );
};

export default function SalesProductList({
  hasNextPage,
  hasPreviousPage,
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

  const { list, total } = useMemo(() => {
    const tempList = _isArray(selectedProductList) ? selectedProductList : [];
    let tempTotal = 0;

    _forEach(selectedProductList, (item) => {
      if (item.quantity) tempTotal += (item.quantity * item.price);
    });

    return {
      list: tempList,
      total: tempTotal,
    };
  }, [selectedProductList]);

  const onSearch = ({ target }, pageNumber) => {
    filterProducts(target.value, pageNumber);
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
      total={total}
      searchText={searchText}
      onSearch={onSearch}
      onChangeList={onChangeList}
      selectedProductList={selectedProductList}
      filteredProductList={productList}
      isOpen={showModal}
      onChangeQuantity={onChangeQuantity}
      onClose={() => setShowModal(false)}
      hasNextPage={hasNextPage}
      hasPreviousPage={hasPreviousPage}
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
      {total > 0 && <div className="sales-product-list-footer mr-4 mt-2">
        <FormGroup>
          <Input
            value={total}
            disabled
            type="number"
            bsSize="sm"
            placeholder="Total"
          />
        </FormGroup>
      </div>}
    </SalesProductListContainer>
  </>;
}
