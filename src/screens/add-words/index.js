import React, {useEffect, useState} from 'react';
import {Block, Button, TextField} from '../../component';
import {StyleSheet} from 'react-native';
import {Image} from 'moti';
import {Images} from '../../theme';
import {addWord, fetchRecords, showToast} from '../../utility';

const AddWords = ({navigation, route}) => {
  const [selectedPOS, setSelectedPOS] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    if (!!route.params?.selectedPOS) {
      setSelectedPOS(route.params?.selectedPOS);
    }
  }, [route.params]);

  const onRightPress = () => {
    navigation.push('Home', {isFromAddWord: true});
  };

  const onAddWord = () => {
    const {objectId = null} = selectedPOS;
    if (!!text && !!objectId) {
      addWord(objectId, text).then(res => {
        setText('');
        showToast({message: 'Record created successfully!'});

        fetchRecords();
      });
      return;
    }
  };

  return (
    <Block style={styles.container}>
      <Block flex center>
        <Image
          style={{margin: 16, alignSelf: 'center'}}
          source={Images.icLogo}
        />
      </Block>
      <Block scroll>
        <TextField
          onChangeText={val => setText(val)}
          value={text}
          placeholder={'Enter Word'}
        />
        <TextField
          value={selectedPOS.type}
          onRightPress={onRightPress}
          editable={false}
          rightIcon
          placeholder={'Select Part of Speech'}
        />
        <Button
          onPress={onAddWord}
          style={{marginTop: 48}}
          title={'Add Word'}
        />
      </Block>
    </Block>
  );
};

export default AddWords;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 16,
  },
  cellContainer: {
    justifyContent: 'center',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    backgroundColor: '#1C1C1E',
  },
});
