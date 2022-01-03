import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import pink from "@material-ui/core/colors/pink";
import globalStyles from "../../styles/styles";

ChartJS.register(CategoryScale, LinearScale, ArcElement, BarElement, Title, Tooltip, Legend);

const useStyles = makeStyles({
  card: {
    backgroundColor: pink[600],
    height: 150
  },
  header: {
    color: "white",
    backgroundColor: pink[500],
    padding: 10
  },
  body: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "95%",
    height: 85
  }
});

const chartOptions = {
  plugins: {
    legend: { display: false },
    tooltips: { enabled: false }
  },
  scales: {
    x: { ticks: { color: "white" }, grid: { display: false } },
    y: { ticks: { display: false } }
  },
  layout: { padding: { bottom: 5 } },
  maintainAspectRatio: false
};

export interface IServerUsageProps {
  labels: string[];
  data: number[];
}

export default function ServerUsage(props: IServerUsageProps) {
  const classes = useStyles({});
  const data = {
    labels: props.labels,
    datasets: [
      {
        data: props.data,
        backgroundColor: pink[400],
        borderColor: pink[500]
      }
    ]
  };

  const titleStyle = { ...globalStyles.title };

  return (
    <Card className={classes.card}>
      <div className={classes.header} style={titleStyle}>
        Server Usage
      </div>
      <div className={classes.body}>
        <Bar data={data} options={chartOptions} />
      </div>
    </Card>
  );
}
