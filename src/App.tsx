import * as React from 'react';
import { Example1 } from './components/Example1';
import { Example2 } from './components/Example2';
import { Example3 } from './components/Example3';
import { Example4 } from './components/Example4';

import './App.css';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <section>
          <h2>Example 1</h2>
          <Example1 />
        </section>
        <section>
          <h2>Example 2</h2>
          <Example2 message={`
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Dolores quibusdam consectetur totam possimus odit quisquam.
            Minus facilis cupiditate harum enim?
          `} />
        </section>
        <section>
          <h2>Example 3</h2>
          <Example3 />
        </section>
        <section>
          <h2>Example 4</h2>
          <Example4 />
        </section>
      </div>
    );
  }
}

export default App;
