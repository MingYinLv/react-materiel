/**
 * Created by MingYin Lv on 2017/12/9 下午4:24.
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Detail extends PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired,
  };

  render() {
    return <div>Detail</div>;
  }
}

export default Detail;
