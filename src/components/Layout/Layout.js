import React from 'react';
import Aux from '../../hoc/Aux';
import pt from 'prop-types';
import classes from './Layout.css';

const layout = props => (
  <Aux>
    <div>Toolbar, Sidedrawer, Backdrop</div>
    <main className={classes.Content}>{props.children}</main>
  </Aux>
);

layout.propTypes = {
  children: pt.element,
};

export default layout;
