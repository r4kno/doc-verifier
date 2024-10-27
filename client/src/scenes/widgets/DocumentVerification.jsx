import React, { useState } from 'react';

const DocumentVerification = () => {
  const [originalFile, setOriginalFile] = useState(null);
  const [testFile, setTestFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerification = async (e) => {
    e.preventDefault();
    
    if (!testFile) {
      alert('Please select the file');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('original', originalFile);
    formData.append('test', testFile);
    console.log(originalFile, testFile);
    try {
      const response = await fetch('http://localhost:5000/verify-document', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      setResult({ error: 'Failed to process documents' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Document Verification</h2>
      
      <form onSubmit={handleVerification}>
        
    
        <div style={{ marginBottom: '15px' }}>
          <label>Upload Document: </label>
          <input
            type="file"
            onChange={(e) => setTestFile(e.target.files[0])}
            accept="image/*"
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          {loading ? 'Processing...' : 'Verify Documents'}
        </button>
      </form>

      {result && (
        <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '4px' }}>
          <h3>Results:</h3>
          <p>{result.message}</p>
          
          {result.alterations && result.alterations.length > 0 && (
            <div>
              <h4>Alterations Found:</h4>
              {result.alterations.map((alt, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                  <p>Original Text: {alt.original_text} (size: {alt.original_size})</p>
                  <p>Modified Text: {alt.test_text} (size: {alt.test_size})</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DocumentVerification;