/**
 * Created by MingYin Lv on 2017/11/12 下午3:48.
 */

import React, { PropTypes, PureComponent } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from 'material-ui/Table';
import { connect } from 'dva';
import className from 'classname';
import key from 'keymaster';
import MaterielItem from './MaterielItem';
import classes from './Materiel.less';

class Materiel extends PureComponent {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    materielList: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'materiel/loadList',
      page: 1,
    });
    [{
      keyboard: 'esc',
      pathname: '/',
    }, {
      keyboard: 's',
      pathname: '/search',
    }].forEach(({ keyboard, pathname }) => {
      key(keyboard, () => {
        const { history, location } = this.props;
        if (location.pathname !== pathname) {
          setTimeout(() => {
            history.replace(pathname);
          }, 0);
        }
      });
    });
  }

  render() {
    const { materielList, location } = this.props;
    return (
      <div
        className={className(classes.container, {
          [classes.scale]: location.pathname !== '/',
        })}
      >
        <div className={classes.listContainer}>
          <Table>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn>ID</TableHeaderColumn>
                <TableHeaderColumn>名称</TableHeaderColumn>
                <TableHeaderColumn>数量</TableHeaderColumn>
                <TableHeaderColumn>描述</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {
                materielList.map(n => (
                  <MaterielItem key={n.get('id')} data={n} />
                ))
              }
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}


export default connect(state => ({
  materielList: state.materiel.get('materielList'),
}))(Materiel);

