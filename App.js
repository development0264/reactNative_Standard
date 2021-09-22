import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/store /store';
import axios from 'axios';
import {View} from 'react-native';
import MainNavigator from './src/providers/auth.provider';
import {ThemeProvider} from 'react-native-elements';
import theme from './src/styles/theme';
import {apiUrl} from './config';
import ErrorCaches  from "./src/components /errors/ErrorCatch";
/**
 * Main enter in app
 * @type {string}
 */
axios.defaults.baseURL = apiUrl;
axios.defaults.headers.common['Content-type'] = 'application/json';
axios.defaults.headers.common.Accept = 'application/json';
axios.interceptors.response.use(
    async response => response,
    error => Promise.reject(error),
);
const App = () => (
    <ThemeProvider theme={theme}>
        <View style={{flex: 1}}>
            <Provider store={store}>
                <MainNavigator />
                <ErrorCaches/>
            </Provider>
        </View>
    </ThemeProvider>
);
export default App;
