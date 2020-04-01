import React, { useEffect, useRef, useContext } from 'react';
import classes from './Cockpit.css';
import pt from 'prop-types';
import AuthContext from '../../context/auth-context';

const cockpit = props => {
  const toggleButtonRef = useRef(null);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    // this part runs is the equivalent of componentDidMount
    // if an empty array is passed as a second argument
    console.log('[Cockpit.js] useEffect');
    toggleButtonRef.current.click();
    return () => {
      console.log('[Cockpit.js] cleanup work in useEffect');
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

  useEffect(() => {
    console.log('[Cockpit.js] second useEffect');
    return () => {
      console.log('[Cockpit.js] cleanup work in second useEffect');
    };
  });

  let btnClass = '';
  if (props.showPersons) {
    btnClass = classes.Red;
  }
  const assignedClasses = [];
  if (props.personsLength <= 2) {
    assignedClasses.push(classes.red);
  }

  if (props.personsLength <= 1) {
    assignedClasses.push(classes.bold);
  }

  return (
    <div className={classes.Cockpit}>
      <h1>{props.title}</h1>
      <p className={assignedClasses.join(' ')}>This is really working!</p>

      <button ref={toggleButtonRef} className={btnClass} onClick={props.click}>
        Toggle persons
      </button>
      <button onClick={authContext.login}>Log in</button>
    </div>
  );
};

cockpit.propTypes = {
  personsLength: pt.number,
  showPersons: pt.bool,
  click: pt.func,
  title: pt.string,
  login: pt.any,
};

export default React.memo(cockpit);
