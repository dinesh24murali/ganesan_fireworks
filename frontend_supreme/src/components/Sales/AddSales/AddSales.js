import React, { useEffect, useMemo, useState } from 'react';
import { Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import Select from 'react-select';
import _isEmpty from 'lodash/isEmpty';
import _map from 'lodash/map';
import _findIndex from 'lodash/findIndex';
import _find from 'lodash/find';
import _isNull from 'lodash/isNull';
import _get from 'lodash/get';
import DatePicker from 'react-datepicker';

import getServerDate from '../../../utils/utils';
import AddSalesContainer from './AddSales.style';
import 'react-datepicker/dist/react-datepicker.css';

import SalesProductListContainer from '../../../containers/SalesProductListContainer';

export default function AddSales({
  match,
  addSales,
  customerList,
  filterCustomers,
  showWarningToast,
  addEditSalesStatus,
  clearAddEditSalesStatus,
}) {
  const id = useMemo(() => _get(match, 'params.id'), [match]);

  const [invoiceNo, setInvoiceNo] = useState('');
  const [discount, setDiscount] = useState();
  const [paid, setPaid] = useState();
  const [customers, setCustomers] = useState([]);
  const [productList, setProductList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    filterCustomers('');
  }, []);

  useEffect(() => {
    const { isAdded, success } = addEditSalesStatus;
    if (!_isNull(isAdded) && !_isNull(success) && isAdded && success) {
      clearAddEditSalesStatus();
      setInvoiceNo('');
      setDiscount(0);
      setPaid(0);
      setSelectedCustomer(null);
      setErrors({});
      setProductList([]);
      setDate(new Date());
    }
  }, [addEditSalesStatus]);

  useEffect(() => {
    let temp = [];
    if (!_isEmpty(customerList)) temp = _map(customerList, (item) => ({ value: item.id, label: `${item.name} - ${item.id}` }));
    setCustomers(temp);
    setIsLoading(false);
  }, [customerList]);

  const onChange = (event) => {
    const { value, name } = event.target;
    setErrors((state) => {
      state[name] = !value;
      return state;
    });
    switch (name) {
      case 'invoiceNo':
        setInvoiceNo(value);
        break;
      case 'discount':
        setDiscount(value);
        break;
      case 'paid':
        setPaid(value);
        break;
      default:
        break;
    }
  };

  const onFilterCustomers = (event) => {
    filterCustomers(event);
    setIsLoading(true);
  };

  const onCustomerChange = (event) => {
    setSelectedCustomer(event);
  };

  const onProductListChange = ({
    isAdded,
    item,
  }) => {
    if (!isAdded) {
      const index = _findIndex(productList, (product) => {
        if (product.id === item.id) return true;
        return false;
      });
      if (index >= 0) {
        setProductList((list) => {
          const temp = _map(list, (product) => JSON.parse(JSON.stringify(product)));
          temp.splice(index, 1);
          return temp;
        });
      }
    } else {
      setProductList((list) => {
        const temp = _map(list, (product) => JSON.parse(JSON.stringify(product)));
        temp.push(item);
        return temp;
      });
    }
  };

  const onChangeQuantity = (
    quantity,
    item,
  ) => {
    const index = _findIndex(productList, (product) => {
      if (product.id === item.id) return true;
      return false;
    });
    if (index >= 0) {
      setProductList((list) => {
        const temp = _map(list, (product) => JSON.parse(JSON.stringify(product)));
        temp[index].quantity = quantity;
        return temp;
      });
    }
  };

  const onSave = () => {
    if (!invoiceNo) {
      showWarningToast('Invoice no is required');
      return;
    }
    if (!selectedCustomer) {
      showWarningToast('Select a customer');
      return;
    }
    if (!date) {
      showWarningToast('Select a sales date');
      return;
    }
    if (discount < 0) {
      showWarningToast('Discount cannot be negetive');
      return;
    }
    if (paid < 0) {
      showWarningToast('Paid amount cannot be negetive');
      return;
    }
    if (productList.length <= 0) {
      showWarningToast('Add at least one cracker');
      return;
    }
    const flag = _find(productList, (product) => !product.quantity || product.quantity <= 0);
    if (flag) {
      showWarningToast(<>
        Check quantity for
        <i>{flag.name}</i>
      </>);
      return;
    }

    if (!id) {
      addSales({
        customer: String(selectedCustomer.value),
        invoice_no: String(invoiceNo),
        date: getServerDate(date),
        discount: discount ? parseInt(discount, 10) : 0,
        paid: paid ? parseInt(paid, 10) : 0,
        products: _map(productList, (product) => ({
          crackerId: String(product.id),
          quantity: parseInt(product.quantity, 10),
        })),
      });
    }
  };

  return (<AddSalesContainer className="container">
    <h3>Add Sales</h3>
    <Form>
      <div className="row">
        <div className="col-6">
          <FormGroup>
            <Label for="invoice-no">Invoice no</Label>
            <Input
              invalid={errors.invoiceNo}
              value={invoiceNo}
              onChange={onChange}
              type="text"
              name="invoiceNo"
              id="invoice-no"
              placeholder="Invoice no"
            />
            <FormFeedback>Invoice no is Required</FormFeedback>
          </FormGroup>
        </div>
        <div className="col-6">
          <FormGroup>
            <Label for="discount">Discount</Label>
            <Input
              invalid={errors.discount}
              value={discount}
              onChange={onChange}
              type="number"
              name="discount"
              id="discount"
              placeholder="Discount"
            />
            <FormFeedback>Discount is Required</FormFeedback>
          </FormGroup>
        </div>
        <div className="col-6">
          <FormGroup>
            <Label>Customer</Label>
            <Select
              className="basic-single"
              classNamePrefix="select"
              defaultValue={selectedCustomer}
              value={selectedCustomer}
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
        <div className="col-6">
          <FormGroup>
            <Label>Date</Label>
            <br />
            <DatePicker
              className="form-control"
              selected={date}
              dateFormat="dd/MM/yyyy"
              onChange={(event) => setDate(event)}
            />
          </FormGroup>
        </div>
        <div className="col-6">
          <FormGroup>
            <Label for="paid">Paid</Label>
            <Input
              invalid={errors.paid}
              value={paid}
              onChange={onChange}
              type="number"
              name="paid"
              id="paid"
              placeholder="Paid"
            />
            <FormFeedback>Paid is Required</FormFeedback>
          </FormGroup>
        </div>
        <div className="col-6">
          <button onClick={onSave} type="button" className="btn btn-primary mt-4">{id ? 'Update' : 'Submit'}</button>
        </div>
      </div>
      <SalesProductListContainer
        selectedProductList={productList}
        onChangeList={onProductListChange}
        onChangeQuantity={onChangeQuantity}
      />
    </Form>
  </AddSalesContainer>);
}
