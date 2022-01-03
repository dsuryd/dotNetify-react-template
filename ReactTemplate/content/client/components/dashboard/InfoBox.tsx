import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import grey from "@material-ui/core/colors/grey";

const useStyles = makeStyles({
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
    color: grey[800]
  },
  text: {
    fontSize: 18,
    fontWeight: "lighter",
    color: grey[600]
  },
  iconBox: {
    float: "left",
    height: 90,
    width: 90,
    textAlign: "center",
    color: "white",
    backgroundColor: (props: any) => props.color
  },
  icon: {
    height: 48,
    width: 48,
    marginTop: 20,
    maxWidth: "100%"
  }
});

export interface IInfoBoxProps {
  icon: React.ComponentType;
  color: string;
  title: string;
  value: any;
}

export default function InfoBox({ icon, color, title, value }: IInfoBoxProps) {
  const classes = useStyles({ color });
  const Icon: any = icon;

  return (
    <Card>
      <span className={classes.iconBox}>
        <Icon className={classes.icon} />
      </span>

      <div className={classes.content}>
        <span className={classes.text}>{title}</span>
        <span className={classes.number}>{value}</span>
      </div>
    </Card>
  );
}
