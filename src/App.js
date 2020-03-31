import React, { Component } from 'react';
import classes from './App.css';
import './Person/Person.css';
import Person from './Person/Person';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

class App extends Component {
  state = {
    persons: [
      { id: 'asjkldh', name: 'Max', age: 28 },
      { id: 'w3er', name: 'Manu', age: 29 },
      { id: 'w4esrth', name: 'Stephanie', age: 26 },
    ],
    otherState: 'some other value',
    showPersons: false,
    text: 'Aa',
  };

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

    this.setState({ persons: persons });
  };

  render() {
    const { showPersons, persons } = this.state;
    let btnClass = '';

    let data = null;

    if (showPersons) {
      data = (
        <div>
          {persons.map((person, index) => {
            return (
              <ErrorBoundary key={person.id}>
                <Person
                  name={person.name}
                  age={person.age}
                  click={() => this.deletePersonHandler(index)}
                  changed={event =>
                    this.nameChangedHandler(event, person.id)
                  }></Person>
              </ErrorBoundary>
            );
          })}
        </div>
      );

      btnClass = classes.Red;
    }

    const assignedClasses = [];
    if (persons.length <= 2) {
      assignedClasses.push(classes.red);
    }

    if (persons.length <= 1) {
      assignedClasses.push(classes.bold);
    }

    return (
      <div className={classes.App}>
        <h1>Hi, I&#39;m a React App</h1>
        <p className={assignedClasses.join(' ')}>This is really working!</p>

        <button className={btnClass} onClick={this.togglePersonsHandler}>
          Toggle persons
        </button>
        {data}
      </div>
    );
  }
}

export default App;
