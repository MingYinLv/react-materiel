/**
 * Created by MingYin Lv on 2017/11/18 下午10:40.
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import Dialog from 'material-ui/Dialog';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import FlatButton from 'material-ui/FlatButton';
import TextFiled from 'material-ui/TextField';
import { LogType } from '../../utils/Constant';
import IntField from '../../components/IntField';

class MaterielModal extends PureComponent {
  static propTypes = {
    modal: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    searchList: PropTypes.object.isRequired,
    materielList: PropTypes.object.isRequired,
  };

  state = {
    name: '',
    number: '',
    description: '',
    remark: '',
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.modal.get('materiel_id') !== 0 &&
      nextProps.modal.get('materiel_id') !== this.props.modal.get('materiel_id')) {
      const { searchList, materielList, modal } = nextProps;
      const findData = materielList.find(n => n.get('id') === modal.get('materiel_id')) ||
        searchList.find(n => n.get('id') === modal.get('materiel_id'));
      this.setState({
        name: findData.get('name'),
        number: findData.get('number'),
        description: findData.get('description'),
        type: '2',
      });
    }
  }

  onSubmit = () => {
    const { dispatch, modal } = this.props;
    const { name, number, description, remark } = this.state;
    dispatch({
      type: 'materiel/editMateriel',
      id: modal.get('materiel_id'),
      name,
      number,
      description,
      remark,
    });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  hideModal = () => {
    this.props.dispatch({
      type: 'materiel/hideMateriel',
    });
  };

  render() {
    const { modal } = this.props;
    const { name, number, description, type, remark } = this.state;

    const actions = [
      <FlatButton
        label="取消"
        primary
        onClick={this.hideModal}
      />,
      <FlatButton
        label="提交"
        primary
        keyboardFocused
        onClick={this.onSubmit}
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
        <RadioButtonGroup
          name="type"
          onChange={this.onChange}
          valueSelected={type}
          style={{
            marginTop: '12px',
          }}
        >
          <RadioButton
            value={`${LogType.CHANGE}`}
            label="数量变更"
            style={{
              width: '132px',
              display: 'inline-block',
            }}
          />
          <RadioButton
            value={`${LogType.PUSH}`}
            label="入库"
            style={{
              width: '100px',
              display: 'inline-block',
            }}
          />
          <RadioButton
            value={`${LogType.POP}`}
            label="出库"
            style={{
              width: '100px',
              display: 'inline-block',
            }}
          />
        </RadioButtonGroup>
        <TextFiled
          hintText="请填写物料名称"
          floatingLabelText="物料名称"
          onChange={this.onChange}
          name="name"
          value={name}
          fullWidth
        />
        <IntField
          hintText="请填写数量，正整数"
          floatingLabelText="数量"
          name="number"
          onChange={this.onChange}
          value={number}
          fullWidth
        />
        <TextFiled
          hintText="物料描述，可不填"
          floatingLabelText="物料描述"
          multiLine
          name="description"
          onChange={this.onChange}
          value={description}
          style={{
            width: '100%',
          }}
        />
        <TextFiled
          hintText="备注，可不填"
          floatingLabelText="备注"
          multiLine
          name="remark"
          onChange={this.onChange}
          value={remark}
          style={{
            width: '100%',
          }}
        />
      </Dialog>
    );
  }
}

export default connect(state => ({
  modal: state.materiel.get('modal'),
  materielList: state.materiel.get('materielList'),
  searchList: state.materiel.get('searchList'),
}))(MaterielModal);
