import React from 'react';
import Person from './Person/Person';
import pt from 'prop-types';

const persons = props => {
  return props.persons.map((person, index) => {
    return (
      <Person
        key={person.id}
        name={person.name}
        age={person.age}
        click={() => props.clicked(index)}
        changed={event => props.changed(event, person.id)}></Person>
    );
  });
};

persons.propTypes = {
  persons: pt.array,
};

export default persons;
