/**
 * Created by MingYin Lv on 2017/12/9 下午4:24.
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import RouteContainer from '../../components/RouteContainer';
import classes from './Detail.scss';
import Spinner from '../../components/Spinner';
import request from '../../utils/request';

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
      .then(({ materiel, logs }) => {
        this.setState({
          materiel,
          logs,
          loading: false,
        });
      });
  }

  render() {
    const { loading } = this.state;
    return (
      <RouteContainer history={this.props.history}>
        <div className={classes.container}>
          {
            loading && <Spinner transparent />
          }
        </div>
      </RouteContainer>
    );
  }
}

export default Detail;
