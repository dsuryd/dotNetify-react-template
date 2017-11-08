import React from 'react';
import dotnetify from 'dotnetify';
import { RouteLink } from 'dotnetify/dist/dotnetify-react.router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import IconRemove from 'material-ui/svg-icons/content/clear';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { pink500, grey200, grey500 } from 'material-ui/styles/colors';
import BasePage from '../components/BasePage';
import Pagination from '../components/table/Pagination';
import InlineEdit from '../components/table/InlineEdit';
import ThemeDefault from '../styles/theme-default';

class TablePage extends React.Component {

  constructor(props) {
    super(props);
    this.vm = dotnetify.react.connect("Table", this);
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

    const styles = {
      addButton: { margin: '1em' },
      removeIcon: { fill: grey500 },
      columns: {
        id: { width: '10%' },
        firstName: { width: '35%' },
        lastName: { width: '35%' },
        remove: { width: '15%' }
      },
      pagination: { marginTop: '1em' }
    };

    const handleAdd = _ => {
      if (addName) {
        this.dispatch({ Add: addName });
        this.setState({ addName: '' });
      }
    };

    const handleUpdate = employee => {
      let newState = Employees.map(item => item.Id === employee.Id ? Object.assign(item, employee) : item);
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
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <BasePage title="Table Page" navigation="Application / Table Page">
          <div>
            <div>
              <FloatingActionButton onClick={handleAdd}
                style={styles.addButton}
                backgroundColor={pink500}
                mini={true}
              >
                <ContentAdd />
              </FloatingActionButton>
              <TextField id="AddName" floatingLabelText="Add" hintText="Type full name here"
                floatingLabelFixed={true}
                value={addName}
                onKeyPress={event => event.key === "Enter" ? handleAdd() : null}
                onChange={event => this.setState({ addName: event.target.value })} />
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderColumn style={styles.columns.id}>ID</TableHeaderColumn>
                  <TableHeaderColumn style={styles.columns.firstName}>First Name</TableHeaderColumn>
                  <TableHeaderColumn style={styles.columns.lastName}>Last Name</TableHeaderColumn>
                  <TableHeaderColumn style={styles.columns.remove}>Remove</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Employees.map(item =>
                  <TableRow key={item.Id}>
                    <TableRowColumn style={styles.columns.id}>{item.Id}</TableRowColumn>
                    <TableRowColumn style={styles.columns.firstName}>
                      <InlineEdit onChange={value => handleUpdate({ Id: item.Id, FirstName: value })}>{item.FirstName}</InlineEdit>
                    </TableRowColumn>
                    <TableRowColumn style={styles.columns.lastName}>
                      <InlineEdit onChange={value => handleUpdate({ Id: item.Id, LastName: value })}>{item.LastName}</InlineEdit>
                    </TableRowColumn>
                    <TableRowColumn style={styles.columns.remove}>
                      <FloatingActionButton onClick={_ => this.dispatch({ Remove: item.Id })}
                        zDepth={0}
                        mini={true}
                        backgroundColor={grey200}
                        iconStyle={styles.removeIcon}
                      >
                        <IconRemove />
                      </FloatingActionButton>
                    </TableRowColumn>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <Pagination style={styles.pagination}
              pages={Pages}
              select={SelectedPage}
              onSelect={handleSelectPage} />

            <Snackbar open={ShowNotification} message="Changes saved" autoHideDuration={1000}
              onRequestClose={hideNotification} />
          </div>
        </BasePage>
      </MuiThemeProvider>
    )
  };
}

export default TablePage;
