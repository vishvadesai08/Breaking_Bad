import React from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';

export default AppLoader = ({
  size = 'large',

  isLoading = false,
  style = {},
}) => {
  if (isLoading) {
    return (
      <ActivityIndicator
        size={size}
        color={'green'}
        style={[styles.appLoader, style ? style : {}]}
      />
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  appLoader: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    zIndex: 99,
  },
});
