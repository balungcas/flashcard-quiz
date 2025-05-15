import { useState } from 'react';
import { extractTextFromPDF } from '../utils/pdfProcessor';
import PropTypes from 'prop-types';

function PDFUploader({ onTextExtracted }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const extractedText = await extractTextFromPDF(file);
      onTextExtracted(extractedText);
    } catch (err) {
      setError('Failed to process PDF');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pdf-uploader">
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileUpload}
        disabled={isLoading}
      />
      {isLoading && <p>Processing PDF...</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

PDFUploader.propTypes = {
  onTextExtracted: PropTypes.func.isRequired
};

export default PDFUploader;