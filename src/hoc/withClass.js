import React from 'react';
import pt from 'prop-types';

const withClass = (WrappedComponent, className) => {
  // eslint-disable-next-line react/display-name
  return props => (
    <div className={className}>
      <WrappedComponent {...props} />
    </div>
  );
  // return <div className={props.classes}>{props.children}</div>;
};

// Alternative HOC which returns the children -> as in the jsx elements
// const withClass = props => {
//  return <div className={props.classes}>{props.children}</div>
// }
//
// };

withClass.propTypes = {
  classes: pt.string,
  // children: pt.any
};

export default withClass;
