import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Validate from './validade.routes';
const Routes: React.FC = () => {
    
    return (
        <BrowserRouter>
            <Validate />
        </BrowserRouter>
    );
}

export default Routes;