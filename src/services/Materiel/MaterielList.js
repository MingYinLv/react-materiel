/**
 * Created by MingYin Lv on 2017/11/14 下午3:12.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from 'material-ui/Table';
import MaterielItem from './MaterielItem';
import classes from './Materiel.less';

const MaterielList = ({ materielList }) => (
  <div className={classes.listContainer}>
    <Table style={{ background: 'transparent' }}>
      <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
        <TableRow className={classes.row}>
          <TableHeaderColumn>ID</TableHeaderColumn>
          <TableHeaderColumn>名称</TableHeaderColumn>
          <TableHeaderColumn>数量</TableHeaderColumn>
          <TableHeaderColumn>描述</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        {
          materielList.map((n, i) => (
            <MaterielItem i={i} key={n.get('id')} data={n} />
          ))
        }
      </TableBody>
    </Table>
  </div>
);

MaterielList.propTypes = {
  materielList: PropTypes.object.isRequired,
};

export default MaterielList;
