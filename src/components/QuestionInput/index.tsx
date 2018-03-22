import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./QuestionInput'),
  loading: () => null,
  delay: 300
});
