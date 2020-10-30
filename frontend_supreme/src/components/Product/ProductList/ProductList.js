import React, { useState, useEffect } from 'react';
import _isEmpty from 'lodash/isEmpty';
import _map from 'lodash/map';
import _isArray from 'lodash/isArray';

import AddEditProduct from '../AddEditProduct/AddEditProduct';
import { packTypesMap } from '../../../constants/AppConstants';

import ProductListContainer from './ProductList.style';
import PlusIcon from '../../../assets/svg/plus.svg';
import Pencil from '../../../assets/svg/pencil.svg';
import Currency from '../../../assets/png/currency.png';
import Box from '../../../assets/png/box.png';

export default function ProductList({
  productList,
  getProducts,
  addProduct,
  updateProduct,
  filterProducts,
}) {
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (_isEmpty(productList)) {
      getProducts();
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

  const onSearch = ({ target }) => {
    filterProducts(target.value);
    setSearchText(target.value);
  };

  const list = _isArray(productList) ? productList : [];

  return (
    <div className="container">
      <AddEditProduct isOpen={showModal} onClose={handleModal} isUpdate={editProduct} />
      <h3 className="mt-4 ml-3">Crackers</h3>
      <ProductListContainer>
        <div className="product-list-header">
          <div className="product-list-header__search">
            <input type="text" className="form-control search-input" value={searchText} onChange={onSearch} placeholder="Search" />
          </div>
          <button type="button" title="Add new cracker" onClick={() => setShowModal(true)} className="btn btn-secondary btn-round">
            <img className="add-item" src={PlusIcon} alt="add" />
          </button>
        </div>
        <div className="product-list">
          {_map(list, (item, index) => (
            <div key={index} className="product-item">
              <div className="product-item-line1">
                <div title={item.name} className="product-item-line1__name">{item.name}</div>
                <img title="Edit product" onClick={() => onEdit(item)} src={Pencil} className="product-item-line1__edit-button" alt="edit" />
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
              </div>
            </div>
          ))}
        </div>
      </ProductListContainer>
    </div>
  );
}
