import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import PremiumModal from './PremiumModal';
import '../styles/TemplateGrid.css';

const TemplateGrid = ({ templates }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  if (!templates || templates.length === 0) {
    return <div className="no-templates">No templates found</div>;
  }

  const handleTemplateClick = (template) => {
    if (template.isPremium && user?.subscription !== 'premium') {
      setSelectedTemplate(template);
      setShowPremiumModal(true);
    } else {
      navigate(`/editor/${template._id}`);
    }
  };

  const handleUpgradeSuccess = () => {
    if (selectedTemplate) {
      navigate(`/editor/${selectedTemplate._id}`);
    }
  };

  return (
    <>
      <div className="template-grid">
        {templates.map((template) => (
          <div key={template._id} className="template-card">
            <div className="template-image-wrapper">
              <img src={template.imageUrl} alt={template.title} />
              {template.isPremium && <span className="premium-badge">⭐ Premium</span>}
            </div>
            <h3>{template.title}</h3>
            <p>{template.category}</p>
            <button
              className={`btn-select ${template.isPremium && user?.subscription !== 'premium' ? 'btn-unlock' : ''}`}
              onClick={() => handleTemplateClick(template)}
            >
              {template.isPremium && user?.subscription !== 'premium' ? '🔒 Unlock Premium' : 'Select'}
            </button>
          </div>
        ))}
      </div>

      {showPremiumModal && selectedTemplate && (
        <PremiumModal
          template={selectedTemplate}
          onClose={() => setShowPremiumModal(false)}
          onSuccess={handleUpgradeSuccess}
        />
      )}
    </>
  );
};

export default TemplateGrid;
