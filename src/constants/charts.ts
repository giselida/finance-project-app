import { ApexOptions } from "apexcharts";

export const OPTIONS_PAYMENT: ApexOptions = {
  series: [],
  chart: {
    type: "bar",
    height: 350,
    stacked: true,
  },
  stroke: {
    width: 1,
    colors: ["#fff"],
  },

  plotOptions: {
    bar: {
      horizontal: false,
    },
  },
  xaxis: {
    type: "datetime",
    categories: [],
  },
  fill: {
    opacity: 1,
  },
  colors: ["#BC3A3A", "#D9A3A3", "#FFBFBF", "#D06767"],
  yaxis: {
    labels: {
      formatter: (val) => {
        const options = {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        };
        return new Intl.NumberFormat("pt-BR", options).format(val);
      },
    },
  },
  legend: {
    position: "top",
    horizontalAlign: "left",
  },
};

export const OPTIONS_CURRENCY: ApexOptions = {
  colors: ["#D0E8FFB2", "#FEC6C6"],
  series: [100, 20],
  chart: {
    height: 450,
    type: "pie",
  },
  labels: ["USD", "BRL"],
  responsive: [],
  legend: {
    fontWeight: 700,
    position: "top",
  },
};
