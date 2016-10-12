import * as React from 'react';
import * as ReactDOM from 'react-dom';
import LazyLoadImg from '../src';

class App extends React.Component<any, any> {
  render() {
    return (
      <div>
        <div style={{ width: '200px', height: '1200px' }}></div>
        <div style={{ position: 'relative' }}>
          <LazyLoadImg
            src="http://tse3.mm.bing.net/th?id=OIP.Mf3e5922525e98319b09a0007df59fa34o0&pid=15.1"
            placeholder="http://tse4.mm.bing.net/th?id=OIP.M3e464a0c02bc83f4f5ed732c5eab77efo0&pid=15.1"
            width="300px"
            style={{ position: 'absolute', top: '0' }}
            offset={{
              max: -200,
            }}
            />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);