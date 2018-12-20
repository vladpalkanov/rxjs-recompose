import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { setObservableConfig } from 'recompose';
import { from } from 'rxjs';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

import App from './App';

setObservableConfig({
  fromESObservable: from
});

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
