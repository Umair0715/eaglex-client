import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import './utilities.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

import DrawerContextProvider from 'context/DrawerContext';
import store from 'redux/store';
import { Provider } from 'react-redux';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import NotificationContextProvider from 'context/NotificationContext';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <NotificationContextProvider>
        <DrawerContextProvider>
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <Router>
                        <App />
                    </Router>
                {/* <ReactQueryDevtools />  */}
                </QueryClientProvider>
            </Provider>
        </DrawerContextProvider>
    </NotificationContextProvider>
);