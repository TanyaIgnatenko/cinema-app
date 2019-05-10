import React from 'react';
import PropTypes from 'prop-types';

class Toggle extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    openByDefault: PropTypes.bool,
  };

  static defaultProps = {
    openByDefault: false,
  };

  state = {
    on: this.props.openByDefault,
  };

  toggle = () => {
    this.setState(state => ({ on: !state.on }));
  };

  open = () => {
    this.setState({ on: true });
  };

  close = () => {
    this.setState({ on: false });
  };

  render() {
    const { children } = this.props;
    const { on } = this.state;

    return children(on, this.toggle, this.open, this.close);
  }
}

export default Toggle;
