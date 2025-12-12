import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './stack';
import { Colors } from '../theme';

function AppStack() {
    return (
        <NavigationContainer theme={{ colors: { background: Colors.BLACK } }}>
            <MainStack />
        </NavigationContainer>
    );
}

export default AppStack;