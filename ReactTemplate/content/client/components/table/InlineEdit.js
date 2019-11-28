import React from 'react';
import EditIcon from '@material-ui/icons/create';
import TextField from '@material-ui/core/TextField';
import grey from '@material-ui/core/colors/grey';

class InlineEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      edit: false,
      value: this.props.children
    };
  }
  render() {
    let { hover, edit, value } = this.state;
    const originalValue = this.props.children;

    const styles = {
      label: { minHeight: '2em', marginTop: '10px' },
      editIcon: { width: 20, height: 20, fill: grey[400], marginLeft: 8 },
      editIconHidden: { width: 20, height: 20, fill: 'none', marginLeft: 8 }
    };

    const handleClick = event => {
      event.stopPropagation();
      if (!edit) {
        this.setState({ value: originalValue });
        this.setState({ edit: true, hover: false });
      }
    };

    const handleBlur = event => {
      this.setState({ edit: false });
      if (value.length > 0 && value != originalValue) this.props.onChange(value);
      else this.setState({ value: originalValue });
    };

    const handleMouseEnter = _ => this.setState({ hover: true });
    const handleMouseLeave = _ => this.setState({ hover: false });
    const setFocus = input => input && input.focus();

    if (!edit)
      return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <span onClick={handleClick}>{originalValue}</span>
          {hover ? <EditIcon style={styles.editIcon} /> : <EditIcon style={styles.editIconHidden} />}
        </div>
      );
    else
      return (
        <TextField
          id="EditField"
          inputRef={input => setFocus(input)}
          value={this.state.value}
          onClick={handleClick}
          onBlur={handleBlur}
          onChange={event => this.setState({ value: event.target.value })}
        />
      );
  }
}

export default InlineEdit;
