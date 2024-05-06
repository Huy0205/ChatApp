import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './stack';

const MainNavigation = () => {
    return (
        <NavigationContainer>
            <StackNavigation />
        </NavigationContainer>
    );
};

export default MainNavigation;
