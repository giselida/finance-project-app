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
  series: [],
  chart: {
    height: 350,
    type: "heatmap",
  },
  dataLabels: {
    enabled: false,
  },
  colors: ["#ff8f16"],
  title: {
    text: "Gráfico mapa de calor",
  },
};
