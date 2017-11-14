/**
 * Created by MingYin Lv on 2017/11/12 下午3:49.
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import classes from './Materiel.less';

export default class MaterielItem extends PureComponent {

  static propTypes = {
    data: PropTypes.object.isRequired,
    i: PropTypes.number.isRequired,
  };

  render() {
    const { data, i } = this.props;
    return (
      <TableRow
        hoverable
        style={{
          animationDelay: `${(i + 1) * 200}ms`,
        }}
        className={classes.row}
      >
        <TableRowColumn>{data.get('id')}</TableRowColumn>
        <TableRowColumn>{data.get('name')}</TableRowColumn>
        <TableRowColumn>{data.get('number')}</TableRowColumn>
        <TableRowColumn>{data.get('description')}</TableRowColumn>
      </TableRow>
    );
  }
}
