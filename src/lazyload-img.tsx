import * as React from 'react';
import * as ReactDOM from 'react-dom';
import splitObject from './util/splitObject';

export interface OffsetDecorator {
  min?: number;
  max?: number;
}

export interface LazyLoadImgProps {
  src: string;
  placeholder: string;
  offset?: OffsetDecorator,
  [key: string]: any;
}

export interface LazyLoadImgState {
  visible?: boolean;
  viewport?: {
    top: number,
    height: number,
  },
}

export default class LazyLoadImg extends React.Component<LazyLoadImgProps, LazyLoadImgState> {
  static defaultProps = {
    placeholder: '',
    offset: {
      min: 0,
      max: 0,
    },
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

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll, false);
    document.addEventListener('resize', this.handleScroll, false);
    this.checkVisible();
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
    document.removeEventListener('resize', this.handleScroll);
  }

  componentDidUpdate(prevProps, prevState: LazyLoadImgState) {
    if (!this.state.visible && prevState.viewport) {
      this.checkVisible();
    }
  }

  checkVisible() {
    let ele = ReactDOM.findDOMNode(this.refs['img']) as HTMLElement;
    let top = ele['y'];
    let height = ele.offsetHeight;

    let min = this.state.viewport.top;
    let max = this.state.viewport.top + this.state.viewport.height;

    let offset = height * 0.2;

    if (((min + this.props.offset.min || 0) <= (top + height - offset)) && top <= (max + this.props.offset.max || 0 - offset)) {
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