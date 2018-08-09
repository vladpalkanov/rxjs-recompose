import * as React from 'react';
import { render } from 'react-dom';
import AnotherComponent from './another';

console.log(123);

render(
    <h1>
        <AnotherComponent />
        H1
    </h1>,
    document.getElementById('root'),
);
