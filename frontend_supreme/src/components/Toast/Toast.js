import React, { useEffect } from 'react';
import { Alert } from 'reactstrap';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { hideToast } from '../../actions/toast';

const ToastContainer = styled.div`
  position: fixed;
  bottom: 40px;
  left: 40px;
  z-index: 99;
  .alert {
    min-width: 200px;
    padding-right: 50px;
    .alert-inner--text {
      max-width: 300px;
    }
  }
  .alert.alert-danger {
    background-color: #f5365c;
  }
  .alert.alert-success {
    background-color: #2dce89;
  }
`;

export default () => {
  const { toast } = useSelector((state) => state.appStatus);
  const { show, type, message } = toast;
  const dispatch = useDispatch();
  useEffect(() => {
    if (show) {
      setTimeout(() => {
        dispatch(hideToast());
      }, 5000);
    }
  }, [dispatch, show]);

  const toggle = () => {
    dispatch(hideToast());
  };

  return (
    <ToastContainer>
      <Alert color={type} isOpen={show} toggle={toggle}>
        <span className="alert-inner--text">{message}</span>
      </Alert>
    </ToastContainer>
  );
};
