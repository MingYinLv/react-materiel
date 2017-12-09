/**
 * Created by MingYin Lv on 2017/11/14 下午3:12.
 */
import React from 'react';
import PropTypes from 'prop-types';
import MaterielItem from './MaterielItem';
import classes from './Materiel.scss';

const MaterielList = ({ materielList, ...props }) => (
  <div className={classes.itemList}>
    {
      materielList.map((n, i) => (
        <MaterielItem i={i} key={n.get('id')} data={n} {...props} />
      ))
    }
  </div>
);

MaterielList.propTypes = {
  materielList: PropTypes.object.isRequired,
};

export default MaterielList;
