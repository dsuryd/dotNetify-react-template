import React from 'react';
import dotnetify from 'dotnetify';
import { ThemeProvider } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import BasePage from '../components/BasePage';
import Pagination from '../components/table/Pagination';
import InlineEdit from '../components/table/InlineEdit';
import defaultTheme from '../styles/theme-default';

const styles = {
  addButton: { margin: '1em' },
  columns: {
    id: { width: '10%' },
    firstName: { width: '35%' },
    lastName: { width: '35%' },
    remove: { width: '15%' }
  },
  pagination: { marginTop: '1em' }
};

export default class TablePage extends React.Component {
  constructor(props) {
    super(props);
    this.vm = dotnetify.react.connect('Table', this);
    this.dispatch = state => this.vm.$dispatch(state);

    this.state = {
      addName: '',
      Employees: [],
      Pages: [],
      ShowNotification: false
    };
  }

  componentWillUnmount() {
    this.vm.$destroy();
  }

  render() {
    let { addName, Employees, Pages, SelectedPage, ShowNotification } = this.state;

    const handleAdd = _ => {
      if (addName) {
        this.dispatch({ Add: addName });
        this.setState({ addName: '' });
      }
    };

    const handleUpdate = employee => {
      let newState = Employees.map(item => (item.Id === employee.Id ? Object.assign(item, employee) : item));
      this.setState({ Employees: newState });
      this.dispatch({ Update: employee });
    };

    const handleSelectPage = page => {
      const newState = { SelectedPage: page };
      this.setState(newState);
      this.dispatch(newState);
    };

    const hideNotification = _ => this.setState({ ShowNotification: false });

    return (
      <ThemeProvider theme={defaultTheme}>
        <BasePage title="Table Page" navigation="Application / Table Page">
          <div>
            <div>
              <Fab onClick={handleAdd} style={styles.addButton} color="secondary">
                <AddIcon />
              </Fab>
              <TextField
                id="AddName"
                label="Add"
                helperText="Type full name here"
                value={addName}
                onKeyPress={event => (event.key === 'Enter' ? handleAdd() : null)}
                onChange={event => this.setState({ addName: event.target.value })}
              />
            </div>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={styles.columns.id}>ID</TableCell>
                  <TableCell style={styles.columns.firstName}>First Name</TableCell>
                  <TableCell style={styles.columns.lastName}>Last Name</TableCell>
                  <TableCell style={styles.columns.remove}>Remove</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Employees.map(item => (
                  <TableRow key={item.Id}>
                    <TableCell style={styles.columns.id}>{item.Id}</TableCell>
                    <TableCell style={styles.columns.firstName}>
                      <InlineEdit onChange={value => handleUpdate({ Id: item.Id, FirstName: value })}>{item.FirstName}</InlineEdit>
                    </TableCell>
                    <TableCell style={styles.columns.lastName}>
                      <InlineEdit onChange={value => handleUpdate({ Id: item.Id, LastName: value })}>{item.LastName}</InlineEdit>
                    </TableCell>
                    <TableCell style={styles.columns.remove}>
                      <IconButton onClick={_ => this.dispatch({ Remove: item.Id })}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Pagination style={styles.pagination} pages={Pages} select={SelectedPage} onSelect={handleSelectPage} />

            <Snackbar open={ShowNotification} message="Changes saved" autoHideDuration={1000} onClose={hideNotification} />
          </div>
        </BasePage>
      </ThemeProvider>
    );
  }
}
