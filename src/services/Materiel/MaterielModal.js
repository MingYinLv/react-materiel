/**
 * Created by MingYin Lv on 2017/11/18 下午10:40.
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextFiled from 'material-ui/TextField';

class MaterielModal extends PureComponent {
  static propTypes = {
    modal: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    number: 0,
    description: '',
  };

  onChange = (e) => {
    console.log(e.target.name, e.target.value);
  };

  hideModal = () => {
    this.props.dispatch({
      type: 'materiel/hideMateriel',
    });
  };

  render() {
    const { modal } = this.props;
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onClick={this.hideModal}
      />,
      <FlatButton
        label="Submit"
        primary
        keyboardFocused
        onClick={this.hideModal}
      />,
    ];
    return (
      <Dialog
        title="编辑物料信息"
        actions={actions}
        modal
        open={modal.get('visible')}
        onRequestClose={this.hideModal}
      >
        <TextFiled
          hintText="请填写物料名称"
          floatingLabelText="物料名称"
          onChange={this.onChange}
          name="name"
          fullWidth
        />
        <TextFiled
          hintText="请填写数量，正整数"
          floatingLabelText="数量"
          name="number"
          onChange={this.onChange}
          fullWidth
        />
        <TextFiled
          hintText="物料描述，可不填"
          floatingLabelText="物料描述"
          multiLine
          name="description"
          onChange={this.onChange}
          style={{
            width: '100%',
          }}
        />
      </Dialog>
    );
  }
}

export default connect(state => ({ modal: state.materiel.get('modal') }))(MaterielModal);
