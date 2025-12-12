import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from 'parse/react-native.js';
import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';
import { Keys } from '../constants';

async function addWord(posId, value) {
  const newWord = new Parse.Object('Words');
  newWord.set('type', {
    __type: 'Pointer',
    className: 'PartsOfSpeech',
    objectId: posId,
  });
  newWord.set('value', value.toLowerCase());
  try {
    await newWord.save();
  } catch (error) {
    Alert.alert('Error!', error);
  }
}

async function fetchPOS() {
  const parseQuery = new Parse.Query('PartsOfSpeech');
  try {
    let results = await parseQuery.find();
    if (results?.length > 0) {
      await saveArrayAS(
        Keys.PARTS_OF_SPEECH,
        JSON.parse(JSON.stringify(results)),
      );
    }
    return results;
  } catch (error) {
    Alert.alert('Error!', error.message);
    return false;
  }
}

async function getPartsOfSpeech() {
  const response = await getArrayAS(Keys.PARTS_OF_SPEECH);
  return response ?? [];
}

async function fetchRecords() {
  const parseQuery = new Parse.Query('Words');
  try {
    let results = await parseQuery.find();
    if (results?.length > 0) {
      await saveArrayAS(Keys.WORDS, JSON.parse(JSON.stringify(results)));
    }
    return JSON.parse(JSON.stringify(results));
  } catch (error) {
    Alert.alert('Error!', error.message);
    return false;
  }
}

async function getWordsByObjectId(objId) {
  const response = await getArrayAS(Keys.WORDS);
  if (objId) {
    let filteredData = response.filter(x => objId === x.type.objectId);
    return filteredData;
  }
  return response ?? [];
}

function showToast({ message, type = 'success' }) {
  Toast.show({
    type: type,
    text1: message,
  });
}

async function saveArrayAS(key, array) {
  await AsyncStorage.setItem(key, JSON.stringify(array));
}
async function getArrayAS(key) {
  return JSON.parse(await AsyncStorage.getItem(key)) ?? [];
}
async function saveObjectAS(key, obj) {
  await AsyncStorage.setItem(key, JSON.stringify(obj));
}
async function getObjectAS(key) {
  return JSON.parse(await AsyncStorage.getItem(key)) ?? {};
}

async function removeObjectAS(key) {
  await AsyncStorage.multiRemove(key);
}
async function getAnyAS(key) {
  return (await AsyncStorage.getItem(key)) ?? '';
}
async function saveAnyAS(key, val = '') {
  await AsyncStorage.setItem(key, val.toString());
}
async function removeAS(key) {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (exception) {
    return false;
  }
}

export {
  fetchPOS,
  fetchRecords,
  addWord,
  showToast,
  saveArrayAS,
  getArrayAS,
  saveObjectAS,
  getObjectAS,
  removeObjectAS,
  getAnyAS,
  saveAnyAS,
  removeAS,
  getPartsOfSpeech,
  getWordsByObjectId,
};
