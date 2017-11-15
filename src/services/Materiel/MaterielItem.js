/**
 * Created by MingYin Lv on 2017/11/12 下午3:49.
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import ActionStore from 'material-ui/svg-icons/action/store';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import classes from './Materiel.less';

const styles = {
  item: {
    background: '#fff',
    animation: 'rowIn 1s',
    animationFillMode: 'forwards',
  },
};

export default class MaterielItem extends PureComponent {

  static propTypes = {
    data: PropTypes.object.isRequired,
    i: PropTypes.number.isRequired,
  };

  render() {
    const { data, i } = this.props;
    return (
      <div className={classes.itemWrap} style={{ animationDelay: `${i * 200}ms` }}>
        <div className={classes.item}>
          <div className={classes.header}>
            <span className={classes.title}>{data.get('name')}</span>
            <span className={classes.subtitle}>{data.get('description')}</span>
          </div>
          <svg width="230" height="45" style={{ marginTop: '100px' }}>
            <path
              d="M0,46C0,46,20.683453237410074,30.666666666666668,31.43884892086331,29.272727272727273C42.19424460431655,27.87878787878788,53.50119904076739,40.42424242424243,64.53237410071942,37.63636363636364C75.56354916067146,34.84848484848485,86.5947242206235,11.848484848484848,97.62589928057554,12.545454545454545C108.65707434052757,13.242424242424242,119.68824940047963,36.93939393939394,130.71942446043167,41.81818181818182C141.7505995203837,46.6969696969697,152.78177458033574,43.21212121212122,163.81294964028777,41.81818181818182C174.8441247002398,40.42424242424242,185.87529976019187,40.42424242424242,196.9064748201439,33.45454545454545C207.93764988009593,26.484848484848484,230,0,230,0"
              stroke="#e9e9e9"
              strokeWidth="2"
              fill="none"
            />
          </svg>
          <div className={classes.footer}>
            <ActionStore color="#666" style={{ verticalAlign: 'middle' }} />
            <span className={classes.number}>{data.get('number')}</span>
            <div className={classes.action}>
              <IconButton><ActionSettings color="#666" /></IconButton>
              <IconButton><ActionDelete color="#666" /></IconButton>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
