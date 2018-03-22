import React from 'react';
import Loadable from 'react-loadable';

import Loading from '../Loading';

export default Loadable({
  loader: () => import('./Overview'),
  loading: () => <Loading />,
  delay: 300
});
