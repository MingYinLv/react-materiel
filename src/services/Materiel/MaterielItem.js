/**
 * Created by MingYin Lv on 2017/11/12 下午3:49.
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import line from 'd3-shape/src/line';
import min from 'd3-array/src/min';
import max from 'd3-array/src/max';
import TWEEN from '@tweenjs/tween.js';
import scaleLinear from 'd3-scale/src/linear';
import catmullRom from 'd3-shape/src/curve/catmullRom';
import IconButton from 'material-ui/IconButton';
import ActionStore from 'material-ui/svg-icons/action/store';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import classes from './Materiel.scss';

function animate(time) {
  window.requestAnimationFrame(animate);
  TWEEN.update(time);
}

export default class MaterielItem extends PureComponent {

  static propTypes = {
    data: PropTypes.object.isRequired,
    i: PropTypes.number.isRequired,
    editMateriel: PropTypes.func.isRequired,
  };

  svgRef = (ref) => {
    if (ref) {
      const tmpRef = ref;
      const path = ref.getElementsByTagName('path')[0];
      const total = path.getTotalLength();
      tmpRef.style['stroke-dasharray'] = total;
      new TWEEN.Tween({ length: total })
        .to({ length: 0 }, 2000)
        .easing(TWEEN.Easing.Cubic.InOut)
        .onUpdate(({ length }) => {
          tmpRef.style['stroke-dashoffset'] = length;
        })
        .start();
      animate();
    }
  };

  render() {
    const { data, i, editMateriel } = this.props;
    const chartData = data.get('change_log').split(',').reduce((prev, n, j) => {
      prev.push({
        x: (20 * j) + 20,
        y: parseInt(n, 10),
      });
      return prev;
    }, [{
      x: 0,
      y: 0,
    }]);

    const maxY = max(chartData, v => v.y);
    const xScale = scaleLinear()
      .domain([min(chartData, v => v.x), max(chartData, v => v.x)])
      .range([0, 225]);

    const yScale = scaleLinear()
      .domain([min(chartData, v => v.y), maxY])
      .range([0, 36]);

    const lineCall = line()
      .curve(catmullRom.alpha())
      .x(d => xScale(d.x))
      .y(d => yScale(maxY - d.y) + 10);

    const lastData = chartData[chartData.length - 1];

    return (
      <div className={classes.itemWrap} style={{ animationDelay: `${i * 200}ms` }}>
        <div className={classes.item}>
          <div className={classes.header}>
            <span className={classes.title}>{data.get('name')}</span>
            <span className={classes.subtitle}>{data.get('description')}</span>
          </div>
          <svg
            width="240"
            height="46"
            style={{ marginTop: '100px' }}
            ref={this.svgRef}
          >
            <path
              d={lineCall(chartData)}
              className={classes.path}
            />
            <circle
              className={classes.circle}
              r="5"
              cx={xScale(lastData.x) + 5}
              cy={yScale(maxY - lastData.y) + 8}
            />
          </svg>
          <div className={classes.footer}>
            <ActionStore color="#666" style={{ verticalAlign: 'middle' }} />
            <span className={classes.number}>{data.get('number')}</span>
            <div className={classes.action}>
              <IconButton onClick={editMateriel(data.get('id'))}><ActionSettings color="#666" /></IconButton>
              <IconButton><ActionDelete color="#666" /></IconButton>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
