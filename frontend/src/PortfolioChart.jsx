import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042',
    '#FF6666', '#FF3399', '#33CCFF', '#669900',
    '#CC33FF', '#FF9933', '#FF6699', '#99FF33',
    '#FF33CC', '#33FF66', '#CC66FF', '#66FF33',
    '#33FF99', '#9966FF', '#FF3399', '#FF6633',
    '#00FF66', '#3366FF', '#FF0066', '#6600FF',
    '#FF33FF', '#33FF33', '#66CCFF', '#00FF33',
    '#FF99CC', '#33FFCC', '#FF6600', '#3399FF',
    '#9966CC', '#FF0066', '#66FFCC', '#CCCCFF',
    '#99CC33', '#FF3333', '#3366CC', '#6600CC',
    '#FF6600', '#33CC66', '#CCFF33', '#FFCC66',
    '#33CC33', '#66CC33', '#FF99FF', '#FF3366',
    '#336699', '#99FF66', '#6666FF', '#33CC99'
  ];

const PortfolioChart = ({ portfolio, prices }) => {
  const data = portfolio.map(item => ({
    name: item.coinId,
    value: (prices[item.coinId]?.usd || 0) * item.quantity
  }));

  return (
    <PieChart width={300} height={300}>
      <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};
export default PortfolioChart;