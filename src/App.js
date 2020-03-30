import React, { Component } from 'react';
import './App.css';
import './Person/Person.css';
import Person from './Person/Person';
import Char from './Char/Char';

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
      const persons = [...prevState.persons];
      persons.splice(personIndex, 1);
      return {
        persons,
      };
    });
  };

  deleteLetterHandler = index => {
    const text = this.state.text;
    const textArr = text.split('');
    textArr.splice(index, 1);
    const newText = textArr.join('');

    this.setState({ text: newText });
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
    const { showPersons, persons, text } = this.state;

    let data = null;
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
    };

    if (showPersons) {
      data = (
        <div>
          {persons.map((person, index) => {
            return (
              <Person
                key={person.id}
                name={person.name}
                age={person.age}
                click={() => this.deletePersonHandler(index)}
                changed={event =>
                  this.nameChangedHandler(event, person.id)
                }></Person>
            );
          })}
        </div>
      );
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>

        <button style={style} onClick={this.togglePersonsHandler}>
          Toggle persons
        </button>
        {data}
      </div>
    );
  }
}

export default App;
