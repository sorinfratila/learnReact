import React from 'react';
import PropTypes from 'prop-types';
import classes from './Modal.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

const Modal = props => {
  return (
    <Aux>
      <Backdrop clicked={props.modalClosed} show={props.show}>
        {' '}
      </Backdrop>
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0',
        }}>
        {props.children}
      </div>
    </Aux>
  );
};

Modal.propTypes = {
  children: PropTypes.any,
  show: PropTypes.any,
  modalClosed: PropTypes.func,
};

// React.memo is used here in a functional component to replace shouldComponentUpdate lifecycle hook
// we can provide to MEMO our own function to check whether this component should update,
// but the logic is the opposite to that from the lifecycle hook,
// so we are checking if nextProps are the same as prevProps
export default React.memo(Modal, (prevProps, nextProps) => {
  nextProps.show === prevProps.show ||
    nextProps.children === prevProps.children;
});
