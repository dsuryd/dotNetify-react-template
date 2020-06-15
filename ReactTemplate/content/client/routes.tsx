import App from './views/App';
import Dashboard from './views/Dashboard';
import FormPage from './views/FormPage';
import TablePage from './views/TablePage';

// Import all the routeable views into the global window variable.
Object.assign(window, {
  Dashboard,
  FormPage,
  TablePage
});

export default App;
