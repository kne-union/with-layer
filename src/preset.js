import React from 'react';

export const global = {
  withInstall: (WrappedComponent) => (props) => <WrappedComponent {...props} />
};

export const preset = (options) => {
  return Object.assign(global, options);
};

export default preset;
