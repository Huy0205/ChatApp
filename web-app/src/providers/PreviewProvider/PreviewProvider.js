import { useState } from 'react';
import React from 'react';
export const PreviewContext = React.createContext();
export default function PreviewProvider({ children }) {
    const [previewFile, setPreviewFile] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    return (
        <PreviewContext.Provider value={{ previewFile, setPreviewFile, previewImage, setPreviewImage }}>
            {children}
        </PreviewContext.Provider>
    );
}
