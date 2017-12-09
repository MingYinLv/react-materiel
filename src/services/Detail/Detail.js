/**
 * Created by MingYin Lv on 2017/12/9 下午4:24.
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import line from 'd3-shape/src/line';
import min from 'd3-array/src/min';
import max from 'd3-array/src/max';
import TWEEN from '@tweenjs/tween.js';
import scaleLinear from 'd3-scale/src/linear';
import catmullRom from 'd3-shape/src/curve/catmullRom';
import RouteContainer from '../../components/RouteContainer';
import classes from './Detail.scss';
import Spinner from '../../components/Spinner';
import request from '../../utils/request';

function animate(time) {
  window.requestAnimationFrame(animate);
  TWEEN.update(time);
}

class Detail extends PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  state = {
    loading: true,
    size: 10,
    materiel: {},
    logs: [],
  };

  componentDidMount() {
    request(`/materiels/${this.props.match.params.id}?with=log&size=${this.state.size}`)
      .then(({ data: { materiel, logs } }) => {
        this.setState({
          materiel,
          logs,
          loading: false,
        });
      });
  }

  chartRef = (ref) => {
    if (ref) {
      const tmpRef = ref;
      const path = ref.getElementsByTagName('path')[0];
      const total = path.getTotalLength();
      tmpRef.style['stroke-dasharray'] = total;
      new TWEEN.Tween({ length: total })
        .to({ length: 0 }, 4000)
        .easing(TWEEN.Easing.Cubic.InOut)
        .onUpdate(({ length }) => {
          tmpRef.style['stroke-dashoffset'] = length;
        })
        .start();
      animate();
    }
  };

  render() {
    const { loading, materiel, logs } = this.state;

    const chartData = logs.reduce((prev, n, j) => {
      prev.push({
        x: (20 * j) + 20,
        y: parseInt(n.quantity, 10),
      });
      return prev;
    }, [{
      x: 0,
      y: 0,
    }]);

    const maxY = max(chartData, v => v.y);
    const xScale = scaleLinear()
      .domain([min(chartData, v => v.x), max(chartData, v => v.x)])
      .range([0, 945]);

    const yScale = scaleLinear()
      .domain([min(chartData, v => v.y), maxY])
      .range([0, 395]);

    const lineCall = line()
      .curve(catmullRom.alpha())
      .x(d => xScale(d.x))
      .y(d => yScale(maxY - d.y) + 10);

    const lastData = chartData[chartData.length - 1];

    return (
      <RouteContainer history={this.props.history}>
        <div className={classes.container}>
          {
            !loading && (
              <div className={classes.main}>
                <svg
                  width="960"
                  height="400"
                  className={classes.svg}
                  ref={this.chartRef}
                >
                  <path
                    d={lineCall(chartData)}
                    className={classes.path}
                  />
                  <circle
                    className={classes.circle}
                    r="5"
                    cx={xScale(lastData.x) + 5}
                    cy={yScale(maxY - lastData.y) + 10}
                  />
                </svg>
                <h2 className={classes.title}>{materiel.name}</h2>
                <p className={classes.lead}>{materiel.description}</p>
              </div>
            )
          }
          {
            loading && <Spinner transparent />
          }
        </div>
      </RouteContainer>
    );
  }
}

export default Detail;
