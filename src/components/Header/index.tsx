import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./Header'),
  loading: () => null,
  delay: 300
});
