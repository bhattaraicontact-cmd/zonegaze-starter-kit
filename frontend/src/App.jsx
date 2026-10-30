import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    projectName: '',
    email: '',
    needs: '',
    isCommercial: false
  });
  
  const [kit, setKit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setKit(null);

    // Client-side validation
    if (!formData.projectName || !formData.email || !formData.needs) {
      setError('Please fill in all required fields.');
      return;
    }

    const needsArray = formData.needs.split(',').map(n => n.trim()).filter(n => n);
    
    if (needsArray.length < 2 || needsArray.length > 6) {
      setError('Please provide between 2 and 6 needs, separated by commas.');
      return;
    }

    setLoading(true);

    try {
      // Saving project to LocalStorage (as allowed: "Any storage is fine")
      localStorage.setItem('zonegaze_project', JSON.stringify(formData));

      const response = await axios.post('http://localhost:5001/api/kit', {
        needs: needsArray,
        isCommercial: formData.isCommercial
      });

      setKit(response.data.kit);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong fetching the kit.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>ZoneGaze Starter Kit</h1>
        <p>Generate your validated dependencies.</p>
      </header>

      {!kit ? (
        <form onSubmit={handleSubmit} className="project-form">
          <div className="form-group">
            <label>Project Name:</label>
            <input type="text" name="projectName" value={formData.projectName} onChange={handleInputChange} placeholder="e.g., Nexus API" />
          </div>
          
          <div className="form-group">
            <label>Your Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="dev@example.com" />
          </div>

          <div className="form-group">
            <label>Project Needs (comma-separated):</label>
            <input type="text" name="needs" value={formData.needs} onChange={handleInputChange} placeholder="validation, testing, auth" />
            <small>Provide 2 to 6 needs.</small>
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input type="checkbox" name="isCommercial" checked={formData.isCommercial} onChange={handleInputChange} />
              Is this closed-source commercial work? (Enforces strict license checks)
            </label>
          </div>

          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" disabled={loading}>
            {loading ? 'Building Kit...' : 'Generate Kit'}
          </button>
        </form>
      ) : (
        <div className="dashboard">
          <h2>Your Dependency Kit</h2>
          <button onClick={() => setKit(null)} className="back-btn">Start Over</button>
          
          <div className="kit-results">
            {Object.entries(kit).map(([need, packages]) => (
              <div key={need} className="need-card">
                <h3>Need: {need}</h3>
                {packages.length === 0 ? (
                  <p className="no-pkg">No safe packages found or fetch failed.</p>
                ) : (
                  packages.map((pkg, idx) => (
                    <div key={idx} className="package-item">
                      <h4>{pkg.name} <span className="version">v{pkg.version}</span></h4>
                      <p><strong>License:</strong> {pkg.license}</p>
                      <p><strong>Downloads:</strong> {pkg.weeklyDownloads}</p>
                      <p><strong>Why:</strong> {pkg.reason}</p>
                      <p><strong>Prod Usage:</strong> {pkg.companiesUsingInProduction}</p>
                    </div>
                  ))
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;