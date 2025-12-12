import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Colors} from '../../../theme';
import {Text} from '../../../component';
import styles from '../styles';

const Item = ({id = 0, type = '', onPress}) => {
  return (
    <TouchableOpacity key={id} onPress={onPress} style={styles.cellContainer}>
      <Text letterSpacing={2.0} extraBold size={36} color={Colors.WHITE}>
        {type.charAt(0)}
        <Text letterSpacing={1.5} color={'#EBEBF5AA'} regular size={24}>
          {type.replace(type.charAt(0), '')}
        </Text>
      </Text>
    </TouchableOpacity>
  );
};

export default Item;
