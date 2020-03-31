import React, { useEffect } from 'react';
import classes from './Cockpit.css';
import pt from 'prop-types';

const cockpit = props => {
  useEffect(() => {
    // this part runs is the equivalent of componentDidMount
    // if an empty array is passed as a second argument
    console.log('useEffect');
    setTimeout(() => {
      alert('saved data to cloud');
    }, 1000);
    return () => {
      console.log('cleanup');
    };
    /**
     * if empty array is passed as a second argument
     * then this use effect will run twice, when this func component
     * has mounted and when it is unmounted
     * so the return statement runs when it willUnmount, just like the lifecycle hooks
     * *********************************
     * by passing an empty array without a return, we also telling this useEffect
     * to only run on init
     */
  }, []);

  let btnClass = '';
  if (props.showPersons) {
    btnClass = classes.Red;
  }
  const assignedClasses = [];
  if (props.persons.length <= 2) {
    assignedClasses.push(classes.red);
  }

  if (props.persons.length <= 1) {
    assignedClasses.push(classes.bold);
  }

  return (
    <div className={classes.Cockpit}>
      <h1>{props.title}</h1>
      <p className={assignedClasses.join(' ')}>This is really working!</p>

      <button className={btnClass} onClick={props.click}>
        Toggle persons
      </button>
    </div>
  );
};

cockpit.propTypes = {
  persons: pt.array,
  showPersons: pt.bool,
  click: pt.func,
  title: pt.string,
};

export default cockpit;
