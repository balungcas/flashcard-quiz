import { useState } from 'react';
import PropTypes from 'prop-types';

function QuizSettings({ onSettingsChange }) {
  const [settings, setSettings] = useState({
    cognitiveLevel: 'comprehension',
    questionCount: 10,
    timeLimit: 10
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newSettings = { ...settings, [name]: value };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  return (
    <div className="quiz-settings">
      <h3>Quiz Settings</h3>
      <div className="setting-group">
        <label htmlFor="cognitiveLevel">Cognitive Level:</label>
        <select
          id="cognitiveLevel"
          name="cognitiveLevel"
          value={settings.cognitiveLevel}
          onChange={handleChange}
        >
          <option value="recall">Recall</option>
          <option value="comprehension">Comprehension</option>
          <option value="application">Application</option>
          <option value="analysis">Analysis</option>
          <option value="synthesis">Synthesis</option>
          <option value="evaluation">Evaluation</option>
        </select>
      </div>

      <div className="setting-group">
        <label htmlFor="questionCount">Number of Questions:</label>
        <input
          type="number"
          id="questionCount"
          name="questionCount"
          min="5"
          max="50"
          value={settings.questionCount}
          onChange={handleChange}
        />
      </div>

      <div className="setting-group">
        <label htmlFor="timeLimit">Time Limit (minutes):</label>
        <input
          type="number"
          id="timeLimit"
          name="timeLimit"
          min="5"
          max="60"
          value={settings.timeLimit}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

QuizSettings.propTypes = {
  onSettingsChange: PropTypes.func.isRequired
};

export default QuizSettings;