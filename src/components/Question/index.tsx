import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./Question'),
  loading: () => null,
  delay: 300
});
