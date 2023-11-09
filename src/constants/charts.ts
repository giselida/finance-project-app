import { ApexOptions } from "apexcharts";

export const OPTIONS_PAYMENT: ApexOptions = {
  chart: {
    height: 250,
    type: "bar",
  },
  series: [],
  colors: ["#FFD700", "#006400", "#3CB371", "#48D1CC"],
  xaxis: {
    categories: [],
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
