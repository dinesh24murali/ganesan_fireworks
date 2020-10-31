import React, { useState, useEffect } from 'react';
import _isEmpty from 'lodash/isEmpty';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';

import { emailRegularExpression } from '../../../constants/AppConstants';

const AddEditCustomer = ({
  isOpen,
  onClose,
  isUpdate,
}) => {
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});
  const [phoneNo, setPhoneNo] = useState(undefined);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (isUpdate) {
      setName(isUpdate.name);
      setPhoneNo(isUpdate.phone_no);
      setEmail(isUpdate.email);
    }
  }, [isUpdate]);

  const clearForm = () => {
    setName('');
    setErrors({});
    setPhoneNo(undefined);
    setEmail('');
  };

  const toggle = (isSave) => {
    if (isSave) {
      const newErrors = {};
      if (_isEmpty(name)) {
        newErrors.name = true;
      }
      if (!_isEmpty(email) && !emailRegularExpression.test(email)) {
        newErrors.email = true;
      }
      if (String(phoneNo).length <= 0 || String(phoneNo).length > 15) {
        newErrors.phoneNo = true;
      }
      if (!_isEmpty(newErrors)) {
        setErrors(newErrors);
        return;
      }

      onClose({
        name,
        email,
        phone_no: phoneNo,
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
      case 'email':
        setEmail(value);
        setErrors((state) => {
          state.email = false;
          return state;
        });
        break;
      case 'phoneNo':
        setPhoneNo(value);
        setErrors((state) => {
          state.phoneNo = false;
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
        {isUpdate ? isUpdate.name : 'Add Customer'}
        {' '}
      </ModalHeader>
      <ModalBody>
        <Form>
          <div className="row">
            <div className="col-6">
              <FormGroup>
                <Label for="customer-name">Name</Label>
                <Input invalid={errors.name} value={name} onChange={onChange} type="text" name="name" id="customer-name" placeholder="Cracher name" />
                <FormFeedback>Name is Required</FormFeedback>
              </FormGroup>
            </div>
            <div className="col-6">
              <FormGroup>
                <Label for="customer-phone-no">Phone no</Label>
                <Input invalid={errors.phoneNo} value={phoneNo} onChange={onChange} type="number" name="phoneNo" id="customer-phone-no" placeholder="Phone Number" />
                <FormFeedback>Phone Number is Required</FormFeedback>
              </FormGroup>
            </div>
            <div className="col-6">
              <FormGroup>
                <Label for="customer-email">Email</Label>
                <Input invalid={errors.email} value={email} onChange={onChange} type="email" name="email" id="customer-email" placeholder="Email" />
                <FormFeedback>Email is incorrect</FormFeedback>
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

export default AddEditCustomer;
