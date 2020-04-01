import React, { Component } from 'react';
import pt from 'prop-types';

import Aux from '../../../hoc/Aux';
import withClass from '../../../hoc/withClass';
import classes from './Person.css';
import AuthContext from '../../../context/auth-context';

class Person extends Component {
  constructor(props) {
    super(props);
    this.inputElement = React.createRef();
  }

  static contextType = AuthContext;

  componentDidMount() {
    this.inputElement.current.focus();
    console.log(this.context.authenticated);
  }

  render() {
    return (
      <Aux>
        {this.context.authenticated ? (
          <p>Authenticated</p>
        ) : (
          <p>Please log in</p>
        )}
        <p onClick={this.props.click}>
          I&#39;m {this.props.name} and I am {this.props.age} years old!
        </p>
        <p>{this.props.children}</p>
        <div className="wrapper" onClickCapture={e => e.stopPropagation()}>
          <input
            ref={this.inputElement}
            type="text"
            onChange={this.props.changed}
            value={this.props.name}
          />
        </div>
      </Aux>
    );
  }
}

export default withClass(Person, classes.Person);

Person.propTypes = {
  click: pt.func,
  age: pt.number,
  name: pt.string,
  changed: pt.func,
  children: pt.element,
  inputElement: pt.element,
  isAuth: pt.bool,
};
