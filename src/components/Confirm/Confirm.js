/**
 * Created by MingYin Lv on 2017/12/9 下午3:44.
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import IconButton from 'material-ui/IconButton';
import ActionDone from 'material-ui/svg-icons/action/done';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { Menu, MenuItem } from 'material-ui/Menu';
import classes from './Confirm.scss';
import { primary, accent } from '../../styles/_variable';

class Confirm extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    text: PropTypes.node.isRequired,
    onOk: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
  };

  state = {
    anchorEl: null,
    open: false,
  };

  onOk = () => {
    this.props.onOk();
    this.setState({
      open: false,
    });
  };

  handleRequestOpen = (e) => {
    e.preventDefault();
    this.setState({
      open: true,
      anchorEl: e.currentTarget,
    });
  };

  handleRequestClose = () => {
    // eslint-disable-next-line
    this.props.onCancel && this.props.onCancel();
    this.setState({
      open: false,
    });
  };

  render() {
    const { text, ...props } = this.props;
    return (
      <span>
        <span onClick={this.handleRequestOpen}>{this.props.children}</span>
        <Popover
          {...this.state}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}
          animation={PopoverAnimationVertical}
          {...props}
        >
          <Menu style={{ display: 'none' }}><MenuItem /></Menu>
          <div className={classes.title}>{text}</div>
          <div className={classes.operator}>
            <IconButton onClick={this.onOk}>
              <ActionDone color={primary} />
            </IconButton>
            <IconButton onClick={this.handleRequestClose}>
              <NavigationClose color={accent} />
            </IconButton>
          </div>
        </Popover>
      </span>
    );
  }
}

export default Confirm;
