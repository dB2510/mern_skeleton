import React from 'react';
import MainRouter from './MainRouter';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import { hot } from 'react-hot-loader';
import Home from './core/Home';

const App = () => {
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Home/>
            </ThemeProvider>
        </BrowserRouter>
    );
}
 
export default hot(module)(App);