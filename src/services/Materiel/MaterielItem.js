/**
 * Created by MingYin Lv on 2017/11/12 下午3:49.
 */

import React, { PropTypes, PureComponent } from 'react';

import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

export default class MaterielItem extends PureComponent {

  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  render() {
    const { data } = this.props;
    return (
      <TableRow>
        <TableRowColumn>{data.get('id')}</TableRowColumn>
        <TableRowColumn>{data.get('name')}</TableRowColumn>
        <TableRowColumn>{data.get('number')}</TableRowColumn>
        <TableRowColumn>{data.get('description')}</TableRowColumn>
      </TableRow>
    );
  }
}
