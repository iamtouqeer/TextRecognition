import React from 'react';
import {Image, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {Colors, Images} from '../../theme';
import {Block} from '..';

function TextField({
  style,
  title,
  placeholder,
  editable,
  rightIcon,
  onRightPress,
  ...rest
}) {
  const _renderRight = () => {
    return (
      <TouchableOpacity onPress={onRightPress} style={styles.right}>
        <Image source={Images.icRightArrow} />
      </TouchableOpacity>
    );
  };

  return (
    <Block style={styles.mainContainer}>
      <TextInput
        style={styles.container}
        placeholder={placeholder}
        editable={editable}
        placeholderTextColor={'#757575'}
        {...rest}
      />

      {rightIcon && _renderRight()}
    </Block>
  );
}

TextField.defaultProps = {
  styles: {},
  title: 'Click Me',
  placeholder: 'Placeholder',
  editable: true,
  rightIcon: false,
  onRightPress: () => {},
};

TextField.propTypes = {
  styles: PropTypes.any,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  editable: PropTypes.bool,
  rightIcon: PropTypes.bool,
  onRightPress: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    color: Colors.WHITE,
  },
  mainContainer: {
    backgroundColor: Colors.PALE_GREY,
    marginTop: 24,
    marginHorizontal: 16,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
  },
  right: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 16,
  },
});

export default TextField;
