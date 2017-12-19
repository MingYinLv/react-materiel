/**
 * Created by MingYin Lv on 2017/11/12 下午3:48.
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import className from 'classname';
import classes from './Materiel.scss';
import MaterielList from './MaterielList';
import MaterielModal from './MaterielModal';

class Materiel extends PureComponent {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    materielList: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'materiel/loadList',
      page: 1,
    });
  }

  delMateriel = (id) => {
    this.props.dispatch({
      type: 'materiel/delMateriel',
      id,
    });
  };

  editMateriel = id => () => this.props.dispatch({ type: 'materiel/showModalByEdit', id });

  render() {
    const { materielList, location } = this.props;
    return (
      <div
        className={className(classes.container, {
          [classes.scale]: location.pathname !== '/',
        })}
      >
        <div className={classes.box}>
          <MaterielList
            onDel={this.delMateriel}
            materielList={materielList}
            editMateriel={this.editMateriel}
          />
        </div>
        <MaterielModal />
      </div>
    );
  }
}


export default connect(state => ({
  materielList: state.materiel.get('materielList'),
}))(Materiel);

