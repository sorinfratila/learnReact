import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
  // eslint-disable-next-line react/display-name
  return class extends Component {
    constructor(props) {
      super(props);

      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error: error });
        }
      );

      this.state = {
        error: null,
      };
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />;
        </Aux>
      );
    }
  };
};

export default withErrorHandler;

/**
 * stateless version, cannot use something like constructor or componentWillMount
 * to simulate that behaviour with hooks
 */
// return props => {
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axios.interceptors.request.use(req => {
//       setError(null);
//       return req;
//     });
//     axios.interceptors.response.use(
//       res => res,
//       error => {
//         setError(error);
//       }
//     );
//   });

//   return (
//     <Aux>
//       <Modal show={error} modalClosed={() => setError(null)}>
//         {error ? error.message : null}
//       </Modal>
//       <WrappedComponent {...props} />;
//     </Aux>
//   );
// };
