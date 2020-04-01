import React, { Component } from 'react';
import classes from './App.css';
import '../components/Persons/Person/Person.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import pt from 'prop-types';
import Aux from '../hoc/Aux';
import AuthContext from '../context/auth-context';
// import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [
        { id: 'asjkldh', name: 'Max', age: 28 },
        { id: 'w3er', name: 'Manu', age: 29 },
        { id: 'w4esrth', name: 'Stephanie', age: 26 },
      ],
      otherState: 'some other value',
      showPersons: false,
      changeCounter: 0,
      authenticated: false,
    };
  }

  shouldComponentUpdate() {
    return true;
  }

  togglePersonsHandler = () => {
    this.setState(prevState => {
      return {
        showPersons: !prevState.showPersons,
      };
    });
  };

  deletePersonHandler = personIndex => {
    this.setState(prevState => {
      const { persons } = prevState;
      const personsCopy = [...persons];
      personsCopy.splice(personIndex, 1);
      return {
        persons: personsCopy,
      };
    });
  };

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex],
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState(prevState => {
      return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1,
      };
    });
  };

  loginHandler = () => {
    this.setState({ authenticated: true });
  };

  render() {
    const { showPersons, persons, authenticated } = this.state;
    let personsData = null;

    if (showPersons) {
      personsData = (
        <div>
          <Persons
            persons={persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler}></Persons>
        </div>
      );
    }

    return (
      <Aux>
        <AuthContext.Provider
          value={{ authenticated, login: this.loginHandler }}>
          <Cockpit
            title={this.props.appTitle}
            click={this.togglePersonsHandler}
            showPersons={showPersons}
            personsLength={persons.length}></Cockpit>
          {personsData}
        </AuthContext.Provider>
      </Aux>
    );
  }
}

App.propTypes = {
  appTitle: pt.string,
};

export default withClass(App, classes.App);
