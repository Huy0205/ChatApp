import { I18nProvider, ThemeProvider, ConversationProvider, AuthProvider, SocketProvider } from './providers';
import './providers/GlobalStyle/globalStyle.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import i18n from './i18n/I18n';
import ViewPortProvider from './providers/ViewPort/ViewPortProvider';
import PreviewProvider from './providers/PreviewProvider/PreviewProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <I18nProvider>
        <AuthProvider>
            <ConversationProvider>
                <SocketProvider>
                    <ThemeProvider>
                        <ViewPortProvider>
                            <PreviewProvider>
                                <App />
                            </PreviewProvider>
                        </ViewPortProvider>
                    </ThemeProvider>
                </SocketProvider>
            </ConversationProvider>
        </AuthProvider>
    </I18nProvider>,
);
