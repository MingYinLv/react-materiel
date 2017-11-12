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
import MaterielItem from './MaterielItem';

class Materiel extends PureComponent {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    materielList: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'materiel/loadList',
      page: 1,
    });
  }

  render() {
    const { materielList } = this.props;
    return (
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
    );
  }
}


export default connect(state => ({
  materielList: state.materiel.get('materielList'),
}))(Materiel);

