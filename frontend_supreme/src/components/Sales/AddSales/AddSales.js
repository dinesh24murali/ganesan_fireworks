import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';

import AddSalesContainer from './AddSales.style';

export default function AddSales({
  addSales,
}) {

  const [invoiceNo, setInvoiceNo] = useState('');
  const [discount, setDiscount] = useState();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // addSales({
    //   customer: '1',
    //   invoice_no: '2',
    //   date: '2020-11-1',
    //   discount: 45,
    //   products: [{
    //     crackerId: '1',
    //     quantity: 1
    //   }],
    // });
  }, []);

  const onChange = (event) => {
    const { value, name } = event.target;
    switch (name) {
      case 'invoiceNo':
        setInvoiceNo(value);
        setErrors((state) => {
          state.name = false;
          return state;
        });
        break;
      case 'discount':
        setDiscount(value);
        setErrors((state) => {
          state.discount = false;
          return state;
        });
        break;
      default:
        break;
    }
  };

  return (<AddSalesContainer className="container">
    <h3>Add Sales</h3>
    <Form>
      <div className="row">
        <div className="col-6">
          <FormGroup>
            <Label for="invoice-no">Invoice no</Label>
            <Input invalid={errors.invoiceNo} value={invoiceNo}
              onChange={onChange} type="text" name="invoiceNo"
              id="invoice-no" placeholder="Invoice no" />
            <FormFeedback>Invoice no is Required</FormFeedback>
          </FormGroup>
        </div>
        <div className="col-6">
          <FormGroup>
            <Label for="discount">Discount</Label>
            <Input invalid={errors.discount} value={discount}
              onChange={onChange} type="number" name="discount"
              id="discount" placeholder="Discount" />
            <FormFeedback>Discount is Required</FormFeedback>
          </FormGroup>
        </div>
      </div>
    </Form>
  </AddSalesContainer>);
}
