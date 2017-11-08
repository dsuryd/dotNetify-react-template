import React from 'react';
import dotnetify from 'dotnetify';
import { RouteLink } from 'dotnetify/dist/dotnetify-react.router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import { grey400, pink400 } from 'material-ui/styles/colors';
import BasePage from '../components/BasePage';
import ThemeDefault from '../styles/theme-default';

class FormPage extends React.Component {

  constructor(props) {
    super(props);
    this.vm = dotnetify.react.connect("Form", this);
    this.dispatch = state => this.vm.$dispatch(state);
    this.routeTo = route => this.vm.$routeTo(route);

    this.state = {
      dirty: false,
      Employees: [],
      FirstName: '',
      LastName: ''
    };
  }

  componentWillUnmount() {
    this.vm.$destroy();
  }

  render() {
    let { dirty, Employees, Id, FirstName, LastName } = this.state;

    const styles = {
      selectLabel: { color: pink400 },
      toggleDiv: {
        maxWidth: 300,
        marginTop: 40,
        marginBottom: 5
      },
      toggleLabel: {
        color: grey400,
        fontWeight: 100
      },
      buttons: {
        marginTop: 30,
        float: 'right'
      },
      saveButton: { marginLeft: 5 }
    };

    const handleSelectFieldChange = (event, idx, value) => this.routeTo(Employees.find(i => i.Id == value).Route);

    const handleCancel = _ => {
      this.dispatch({ Cancel: Id });
      this.setState({ dirty: false });
    }

    const handleSave = _ => {
      this.dispatch({ Save: { Id: Id, FirstName: FirstName, LastName: LastName } });
      this.setState({ dirty: false });
    }

    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <BasePage title="Form Page" navigation="Application / Form Page">
          <form>
            <SelectField
              value={Id}
              onChange={handleSelectFieldChange}
              floatingLabelText="Select to edit"
              floatingLabelStyle={styles.selectLabel}
            >
              {Employees.map(item =>
                <MenuItem key={item.Id} value={item.Id} primaryText={item.Name} />
              )}
            </SelectField>

            <TextField
              hintText="Enter first name"
              floatingLabelText="First Name"
              fullWidth={true}
              value={FirstName}
              onChange={event => this.setState({ FirstName: event.target.value, dirty: true })} />

            <TextField
              hintText="Enter last name"
              floatingLabelText="Last Name"
              fullWidth={true}
              value={LastName}
              onChange={event => this.setState({ LastName: event.target.value, dirty: true })} />

            <div style={styles.buttons}>
              <RaisedButton label="Cancel"
                onClick={handleCancel}
                disabled={!dirty} />

              <RaisedButton label="Save"
                onClick={handleSave}
                disabled={!dirty}
                style={styles.saveButton}
                primary={true} />
            </div>
          </form>
        </BasePage>
      </MuiThemeProvider>
    );
  }
}

export default FormPage;
