import React from 'react';
import ReactDOM from 'react-dom/client';

import { Processing } from './processing';

import 'normalize.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Processing />
    </React.StrictMode>
);
