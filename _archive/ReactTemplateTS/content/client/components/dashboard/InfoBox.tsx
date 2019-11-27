import * as React from "react";
import Paper from "material-ui/Paper";
import { white, grey800 } from "material-ui/styles/colors";
import { typography } from "material-ui/styles";

type Props = {
  color: string;
  title: string;
  value: number;
  Icon: any;
};
class InfoBox extends React.Component<Props, any> {
  render() {
    const { color, title, value, Icon } = this.props;

    const styles = {
      content: {
        padding: "5px 10px",
        marginLeft: 90,
        height: 80
      },
      number: {
        display: "block",
        fontWeight: "bold",
        fontSize: 18,
        paddingTop: 10,
        color: grey800
      },
      text: {
        fontSize: 18,
        fontWeight: typography.fontWeightLight,
        color: grey800
      },
      iconSpan: {
        float: "left",
        height: 90,
        width: 90,
        textAlign: "center",
        backgroundColor: color
      },
      icon: {
        height: 48,
        width: 48,
        marginTop: 20,
        maxWidth: "100%"
      }
    } as any;

    return (
      <Paper>
        <span style={styles.iconSpan}>
          <Icon color={white} style={styles.icon} />
        </span>

        <div style={styles.content}>
          <span style={styles.text}>{title}</span>
          <span style={styles.number}>{value}</span>
        </div>
      </Paper>
    );
  }
}

export default InfoBox;
