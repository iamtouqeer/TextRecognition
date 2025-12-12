import React, {useEffect, useRef, useState} from 'react';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../../theme';
import {takePhoto, openGallery} from './utils';
import Actions from './actions';
import CameraView from './camera';
import {Block, Text} from '../../component';
import ImageViewer from './image-viewer';
import TextRecognition from 'react-native-text-recognition';

const ImagePicker = ({navigation, route}) => {
  const {objectId, heading = ''} = route.params;

  const [isBack, setIsBack] = useState(true);
  const [media, setMedia] = useState(null);
  const [flashOn, setFlashOn] = useState(false);
  const [result, setResult] = useState([]);
  const [id, setId] = useState('');

  const cameraRef = useRef(null);
  const _onFlashChange = () => {
    setFlashOn(!flashOn);
  };

  const _takePhoto = async () => {
    const photo = await takePhoto(cameraRef, flashOn);
    if (Platform.OS == 'android') {
      photo.path = `file://${photo?.path}`;
    }

    if (photo?.path) {
      setMedia(photo);
    }

    const result = await TextRecognition.recognize(media.path);
    const str = result.toString().replaceAll(',', ' ');
    const strArray = str.split(' ');
    setResult(strArray);
  };

  const _onIsBack = () => {
    setIsBack(!isBack);
  };

  const _onPickFromGallery = () => {
    openGallery().then(async media => {
      setMedia(media);
      const result = await TextRecognition.recognize(media.path);
      const str = result.toString().replaceAll(',', ' ');
      const strArray = str.split(' ');
      setResult(strArray);
    });
  };

  const _renderRight = () => {
    return (
      <TouchableOpacity
        onPress={() => navigation.push('Home', {isFromImagePicker: true})}>
        <Text size={16} color={Colors.WHITE}>
          {`${heading}s >`}
        </Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (media != null) {
      navigation.setOptions({
        headerRight: _renderRight,
        headerTransparent: false,
        headerStyle: {backgroundColor: Colors.BLACK},
      });
      return;
    }

    navigation.setOptions({
      headerRight: _renderRight,
    });
  }, [result, heading]);

  useEffect(() => {
    setId(objectId);
  }, [objectId]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'space-between',
      }}>
      {media !== null && (
        <ImageViewer source={media?.path} result={result} objectId={id} />
      )}

      {media == null && <CameraView ref={cameraRef} isBack={isBack} />}

      <Block style={styles.container} row space={'between'}></Block>

      {media == null && (
        <Actions
          onIsBack={_onIsBack}
          takePhoto={_takePhoto}
          onFlashChange={_onFlashChange}
          onPickFromGallery={_onPickFromGallery}
        />
      )}
    </SafeAreaView>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
