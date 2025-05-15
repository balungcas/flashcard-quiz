import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Analytics({ quizAttempts }) {
  const data = {
    labels: quizAttempts.map((_, index) => `Attempt ${index + 1}`),
    datasets: [
      {
        label: 'Quiz Scores',
        data: quizAttempts.map(attempt => attempt.score),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Performance Over Time'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    }
  };

  return (
    <div className="analytics-container">
      <Line data={data} options={options} />
      <div className="stats-summary">
        <h3>Performance Summary</h3>
        <p>Average Score: {
          (quizAttempts.reduce((acc, curr) => acc + curr.score, 0) / quizAttempts.length).toFixed(2)
        }%</p>
        <p>Total Attempts: {quizAttempts.length}</p>
      </div>
    </div>
  );
}

Analytics.propTypes = {
  quizAttempts: PropTypes.arrayOf(
    PropTypes.shape({
      score: PropTypes.number.isRequired,
      topic: PropTypes.string.isRequired,
      cognitive_level: PropTypes.string.isRequired
    })
  ).isRequired
};

export default Analytics;