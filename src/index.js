import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import AppStack from './routes';
import Parse from 'parse/react-native.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Keys } from './constants';
import { Block } from './component';
import Toast from 'react-native-toast-message';
import { RealmProvider, Realm, useRealm } from '@realm/react';
import { useQuery } from '@realm/react';
import { fetchPOS, fetchRecords } from './utility';
import { PartsOfSpeechSchema, WordSchema } from './models';
import { BSON } from 'realm';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

Parse.initialize(Keys.APPLICATION_ID, Keys.JAVASCRIPT_KEYS);
Parse.serverURL = Keys.SERVER_URL;
Parse.setAsyncStorage(AsyncStorage);

function App() {
  // const realm = useRealm();

  useEffect(() => {
    fetchPOS().then(res => { });
    fetchRecords();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 5 * 1000);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RealmProvider schema={[PartsOfSpeechSchema, WordSchema]} inMemory={true}>
        <AppStack />
        <Toast />
      </RealmProvider>
    </GestureHandlerRootView>
  );
}

export default App;
