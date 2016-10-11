import * as React from 'react';
import * as ReactDOM from 'react-dom';
import splitObject from './util/splitObject';

export interface LazyLoadImgProps {
  src: string;
  placeholder: string;
  [key: string]: string;
}

export interface LazyLoadImgState {
  visible: boolean;
  viewport: {
    top: number,
    height: number,
  },
}

export default class LazyLoadImg extends React.Component<LazyLoadImgProps, LazyLoadImgState> {
  static defaultProps = {
    placeholder: '',
  };

  constructor() {
    super();

    this.state = {
      visible: false,
      viewport: {
        top: window.pageYOffset,
        height: window.innerHeight,
      },
    };
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll.bind(this), false);
    window.addEventListener('resize', this.handleScroll, false);
    this.checkVisible();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleScroll);
  }

  componentDidUpdate(prevProps, prevState: LazyLoadImgState) {
    if (!this.state.visible && prevState.viewport) {
      this.checkVisible();
    }
  }

  checkVisible() {
    let ele = ReactDOM.findDOMNode(this.refs['img']) as HTMLElement;
    let top = ele.offsetTop;
    let height = ele.offsetHeight;

    let min = this.state.viewport.top;
    let max = this.state.viewport.top + this.state.viewport.height;

    let offset = height * 0.2;

    if ((min <= (top + height - offset)) && top <= (max - offset)) {
      this.setState({
        viewport: this.state.viewport,
        visible: true,
      });
    }
  }

  handleScroll(e) {
    this.setState({
      visible: this.state.visible,
      viewport: {
        top: window.pageYOffset,
        height: window.innerHeight,
      },
    });
  }

  render() {
    if (!this.props.src) {
      console.error('LazyLoadImg props "src" is required');
    }
    if (!this.props.placeholder) {
      console.error('LazyLoadImg props "placeholder" is required');
    }

    let src = this.state.visible ? this.props.src : this.props.placeholder;

    let [rest, imgProps] = splitObject(this.props, ['src', 'placeholder']);

    return (
      <img
        ref="img"
        src={src}
        {...imgProps}
        />
    );
  }
}