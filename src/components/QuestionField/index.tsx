import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./QuestionField'),
  loading: () => null,
  delay: 300
});
