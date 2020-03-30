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
    const text = { ...this.state.text };
    const textArr = text.split('');
    textArr.splice(index, 1);
    const newText = textArr.join('');
    newText = 'asdf';

    this.setState({ text: newText });
  };

  nameChangedHandler = (event, id) => {
    console.log('event', event);
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

  onTextChange = event => {
    this.setState({
      text: event.target.value,
    });
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
                changed={event => this.nameChangedHandler(event, person.id)}
              ></Person>
            );
          })}
        </div>
      );
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>

        <input
          type="text"
          value={text}
          onChange={event => this.onTextChange(event)}
        />
        <div>
          {text.split('').map((letter, index) => {
            return (
              <Char
                letter={letter}
                click={() => this.deleteLetterHandler(index)}
              ></Char>
            );
          })}
        </div>

        <button style={style} onClick={this.togglePersonsHandler}>
          Toggle persons
        </button>
        {data}
      </div>
    );
  }
}

export default App;
