import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {
  // eslint-disable-next-line react/display-name
  return props => {
    // running something before the return statement and inside this components body,
    // effectively simulates the lifecycle hook componentWillMount
    // running something inside useEffect is like simulating componentDidMount - important difference
    const [error, clearError] = useHttpErrorHandler(axios);

    return (
      <Aux>
        <Modal show={error} modalClosed={clearError}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />;
      </Aux>
    );
  };
};

export default withErrorHandler;
