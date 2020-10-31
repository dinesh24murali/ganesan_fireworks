import React, { useState, useEffect } from 'react';
import _map from 'lodash/map';
import _isEmpty from 'lodash/isEmpty';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';

import { packTypes } from '../../../constants/AppConstants';

const AddEditProduct = ({
  isOpen,
  onClose,
  isUpdate,
}) => {
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});
  const [packText, setPackText] = useState('');
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (isUpdate) {
      setName(isUpdate.name);
      setPackText(isUpdate.pack_text);
      setPrice(isUpdate.price);
    }
  }, [isUpdate]);

  const clearForm = () => {
    setName('');
    setErrors({});
    setPackText('');
    setPrice(0);
  };

  const toggle = (isSave) => {
    if (isSave) {
      const newErrors = {};
      if (_isEmpty(name)) {
        newErrors.name = true;
      }
      if (_isEmpty(packText)) {
        newErrors.packText = true;
      }
      if (price <= 0) {
        newErrors.price = true;
      }
      if (!_isEmpty(newErrors)) {
        setErrors(newErrors);
        return;
      }

      onClose({
        name,
        price,
        pack_text: packText,
      });
    } else onClose();
    clearForm();
  };

  const onChange = (event) => {
    const { value, name: crackerName } = event.target;
    switch (crackerName) {
      case 'name':
        setName(value);
        setErrors((state) => {
          state.name = false;
          return state;
        });
        break;
      case 'price':
        setPrice(value);
        setErrors((state) => {
          state.price = false;
          return state;
        });
        break;
      case 'packText':
        setPackText(value);
        setErrors((state) => {
          state.packText = false;
          return state;
        });
        break;
      default:
        break;
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={() => toggle(false)}>
      <ModalHeader toggle={() => toggle(false)}>
        {isUpdate ? isUpdate.name : 'Add Cracker'}
        {' '}
      </ModalHeader>
      <ModalBody>
        <Form>
          <div className="row">
            <div className="col-6">
              <FormGroup>
                <Label for="product-name">Name</Label>
                <Input invalid={errors.name} value={name} onChange={onChange} type="text" name="name" id="product-name" placeholder="Cracher name" />
                <FormFeedback>Name is Required</FormFeedback>
              </FormGroup>
            </div>
            <div className="col-6">
              <FormGroup>
                <Label for="product-price">Price</Label>
                <Input invalid={errors.price} value={price} onChange={onChange} type="number" name="price" id="product-price" placeholder="price" />
                <FormFeedback>Price is Required</FormFeedback>
              </FormGroup>
            </div>
            <div className="col-6">
              <FormGroup>
                <Label for="product-pack-text">Pack</Label>
                <Input
                  invalid={errors.packText}
                  value={packText}
                  type="select"
                  onChange={onChange}
                  name="packText"
                  id="product-pack-text"
                >
                  <option>-</option>
                  {_map(packTypes, (item, index) => <option key={index} value={item.value}>{item.label}</option>)}
                </Input>
                <FormFeedback>Pack type is Required</FormFeedback>
              </FormGroup>
            </div>
          </div>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={() => toggle(false)}>Cancel</Button>
        {' '}
        <Button color="primary" onClick={() => toggle(true)}>Save</Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddEditProduct;
