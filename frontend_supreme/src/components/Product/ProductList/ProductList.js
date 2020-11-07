import React, { useState, useEffect, useMemo, useRef } from 'react';
import _isEmpty from 'lodash/isEmpty';
import _map from 'lodash/map';
import _isArray from 'lodash/isArray';
import _assign from 'lodash/assign';
import _floor from 'lodash/floor';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import AddEditProduct from '../AddEditProduct/AddEditProduct';
import { tablePageSize, packTypesMap } from '../../../constants/AppConstants';
import ConfirmModal, {
  ConfirmModel,
} from '../../ConfirmModal/ConfirmModal';

import ProductListContainer from './ProductList.style';
import PlusIcon from '../../../assets/svg/plus.svg';
import Pencil from '../../../assets/svg/pencil.svg';
import Trash from '../../../assets/png/trash.png';
import Currency from '../../../assets/png/currency.png';
import Box from '../../../assets/png/box.png';

export default function ProductList({
  productList,
  // getProducts,
  deleteProduct,
  addProduct,
  updateProduct,
  filterProducts,
  hasNextPage,
  hasPreviousPage,
  total,
}) {
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const deleteCrackerId = useRef(null);
  const [modalConfig, setModalConfig] = useState(new ConfirmModel({
    onClose: (val) => {
      if (val) deleteProduct(deleteCrackerId.current);
      setModalConfig((config) => _assign({}, config, { isOpen: false }));
    },
    text: 'Are you sure you want to delete this cracker?',
    isOpen: false,
    title: 'Delete cracker!',
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
    if (_isEmpty(productList)) {
      filterProducts('', 1);
    }
  }, []);

  const handleModal = (value) => {
    if (value && editProduct) {
      updateProduct(editProduct.id, value);
    } else if (value && !editProduct) {
      addProduct(value);
    }
    setEditProduct(null);
    setShowModal(false);
  };

  const onEdit = (product) => {
    setShowModal(true);
    setEditProduct(product);
  };

  const onDelete = (product) => {
    deleteCrackerId.current = product.id;
    setModalConfig((config) => _assign({}, config, { isOpen: true }));
  };

  const onSearch = ({ target }) => {
    setPage(1);
    filterProducts(target.value, 1);
    setSearchText(target.value);
  };

  const onPrevious = () => {
    if (page > 1) {
      setPage((value) => value - 1);
      filterProducts(searchText, page - 1);
    }
  };

  const onNext = () => {
    if (page > -1) {
      setPage((value) => value + 1);
      filterProducts(searchText, page + 1);
    }
  };

  const gotoPage = (selectedPage) => {
    filterProducts(searchText, selectedPage);
    setPage(selectedPage);
  };

  const list = _isArray(productList) ? productList : [];

  return (
    <div className="container">
      <ConfirmModal config={modalConfig} />
      <AddEditProduct isOpen={showModal} onClose={handleModal} isUpdate={editProduct} />
      <h3 className="mt-4 ml-3">Crackers</h3>
      <ProductListContainer>
        <div className="product-list-header">
          <div className="product-list-header__search">
            <input type="text" className="form-control" value={searchText} onChange={onSearch} placeholder="Search" />
          </div>
          <button type="button" title="Add new cracker" onClick={() => setShowModal(true)} className="btn btn-secondary btn-round">
            <img className="add-item mr-3" src={PlusIcon} alt="add" />
            Add new
          </button>
        </div>
        <div className="product-list">
          {_map(list, (item, index) => (
            <div key={index} className="product-item">
              <div className="product-item-line1">
                <div title={item.name} className="product-item-line1__name">{item.name}</div>
                <div>
                  <img title="Edit product" onClick={() => onEdit(item)} src={Pencil} className="product-item-line1__edit-button" alt="edit" />
                  <img title="Delete product" onClick={() => onDelete(item)} src={Trash} className="product-item-line1__delete-button" alt="Delete" />
                </div>
              </div>
              <div className="product-item-line2">
                <div className="product-item-line2__text">
                  <img src={Box} alt="pack_text" className="product-packing" />
                  {packTypesMap[item.pack_text] ? packTypesMap[item.pack_text] : ''}
                </div>
                <div className="product-item-line2__text">
                  <img src={Currency} alt="Rs. " className="product-currency" />
                  {item.price}
                </div>
                <div className="product-item-line2__text">
                  ID:
                  <span className="id">
                    {item.id}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="product-pagination-container">
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
      </ProductListContainer>
    </div>
  );
}
