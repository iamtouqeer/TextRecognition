import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AddWords, Home, ImagePicker} from '../../screens';
import {backButton, screenOptions} from './options';
import {Colors} from '../../theme';

const Stack = createNativeStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="ImagePicker"
        component={ImagePicker}
        options={({navigation}) => {
          return {
            title: '',
            headerTransparent: true,
            headerStyle: {backgroundColor: Colors.TRANSPARENT},
            headerLeft: () => backButton(navigation),
          };
        }}
      />
      <Stack.Screen
        name="AddWords"
        component={AddWords}
        options={{title: ''}}
      />
    </Stack.Navigator>
  );
}

export default MainStack;
