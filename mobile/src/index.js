import React from 'react';
import { View } from 'react-native';
import Routes from './routes';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['Unrecognized WebSocket']);
const App = () => <Routes />;

export default App;
