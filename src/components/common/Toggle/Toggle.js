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
    // eslint-disable-next-line react/destructuring-assignment
    isOpen: this.props.openByDefault,
  };

  toggle = () => {
    this.setState(state => ({ isOpen: !state.isOpen }));
  };

  open = () => {
    this.setState({ isOpen: true });
  };

  close = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { children } = this.props;
    const { isOpen } = this.state;

    return children(isOpen, this.toggle, this.open, this.close);
  }
}

export default Toggle;
