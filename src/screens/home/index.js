import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { Text } from '../../component';
import { FlatList } from 'react-native';
import { getPartsOfSpeech } from '../../utility';
import Item from './item';
import styles from './styles';
import { useCameraPermission } from 'react-native-vision-camera';


const Home = ({ navigation, route }) => {
  const { hasPermission, requestPermission } = useCameraPermission()
  const [PartsOfSpeech, setPartsOfSpeech] = useState([]);
  const _headerRight = () => {
    if (route.params?.isFromAddWord) return null;
    if (route.params?.isFromImagePicker) return null;
    return (
      <Text
        onPress={() => navigation.navigate('AddWords')}
        size={18}>{`Add +`}</Text>
    );
  };

  useEffect(() => {
    
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({ headerRight: _headerRight });
  }, [route.params]);

  useEffect(() => {
    getPartsOfSpeech().then(res => setPartsOfSpeech(res));
  }, []);

  const onItemPress = x => {
    if (route.params?.isFromAddWord) {
      navigation.navigate('AddWords', { selectedPOS: x });
      return;
    }

    if(!hasPermission) {
      requestPermission().then(() => {
        navigation.navigate('ImagePicker', {
          objectId: x.objectId,
          heading: x.type,
        });
      })
      return
    }

    navigation.navigate('ImagePicker', {
      objectId: x.objectId,
      heading: x.type,
    });
  };

  const _renderItem = useCallback(
    ({ item, index }) => {
      const { objectId, type } = item;
      return (
        <Item onPress={() => onItemPress(item)} id={objectId} type={type} />
      );
    },
    [route.params],
  );

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
      data={PartsOfSpeech}
      renderItem={_renderItem}
    />
  );
};

export default Home;
