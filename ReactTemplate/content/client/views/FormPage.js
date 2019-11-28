import React from 'react';
import dotnetify from 'dotnetify';
import { ThemeProvider } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import pink from '@material-ui/core/colors/pink';
import BasePage from '../components/BasePage';
import defaultTheme from '../styles/theme-default';

const styles = {
  selectLabel: {
    color: pink[400],
    padding: '10px 0'
  },
  buttons: {
    marginTop: 30,
    float: 'right'
  },
  textField: {
    marginTop: 20
  },
  saveButton: { marginLeft: 5 }
};

class FormPage extends React.Component {
  constructor(props) {
    super(props);
    this.vm = dotnetify.react.connect('Form', this);
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

    const handleSelectChange = e => this.routeTo(Employees.find(i => i.Id == e.target.value).Route);

    const handleCancel = _ => {
      this.dispatch({ Cancel: Id });
      this.setState({ dirty: false });
    };

    const handleSave = _ => {
      this.dispatch({ Save: { Id: Id, FirstName: FirstName, LastName: LastName } });
      this.setState({ dirty: false });
    };

    return (
      <ThemeProvider theme={defaultTheme}>
        <BasePage title="Form Page" navigation="Application / Form Page">
          <form>
            <InputLabel id="select-label" style={styles.selectLabel}>
              Select to edit
            </InputLabel>
            {Id && (
              <Select labelId="select-label" value={Id} onChange={handleSelectChange}>
                {Employees.map(item => (
                  <MenuItem key={item.Id} value={item.Id}>
                    {item.Name}
                  </MenuItem>
                ))}
              </Select>
            )}

            <TextField
              style={styles.textField}
              label="First Name"
              fullWidth={true}
              value={FirstName}
              onChange={event => this.setState({ FirstName: event.target.value, dirty: true })}
            />

            <TextField
              style={styles.textField}
              label="Last Name"
              fullWidth={true}
              value={LastName}
              onChange={event => this.setState({ LastName: event.target.value, dirty: true })}
            />

            <div style={styles.buttons}>
              <Button variant="contained" onClick={handleCancel} disabled={!dirty}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleSave} disabled={!dirty} style={styles.saveButton} color="primary">
                Save
              </Button>
            </div>
          </form>
        </BasePage>
      </ThemeProvider>
    );
  }
}

export default FormPage;
