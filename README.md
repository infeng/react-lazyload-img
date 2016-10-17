# react-lazyload-img

lazyload image component

## Installation

```bash
npm install react-lazyload-img --save
```

## Usage

```javascript
import * as React from 'react';
import LazyLoadImg from 'react-lazyload-img';

class App extends React.Component<any, any> {
  render() {
    <div>
      <LazyLoadImg
      src=""
      placeholder=""
      />
    </div>
  }
}
```

## Props

| props       | type         | default | description                 | required |
|-------------|--------------|---------|-----------------------------|----------|
| src         | string       |         | img source                  | false |
| placeholder | string       |         | when img unload, img`s source is placeholder | false |
| offset      | {{ min?: number, max?: number }} | { min: 0, max: 0 } | viewport offset | false |
| img tag attributes | any   | - | img tag attributes | false |

## License

MIT