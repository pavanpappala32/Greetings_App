import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { templateService, shareService } from '../services/api';
import html2canvas from 'html2canvas';
import '../styles/Editor.css';

const EditorPage = () => {
  const { templateId } = useParams();
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadTemplate = async () => {
      try {
        const templateData = await templateService.getTemplate(templateId, token);
        setTemplate(templateData);
        setError('');
      } catch (err) {
        setError('Failed to load template');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTemplate();
  }, [templateId, token]);

  const handleShareCard = async () => {
    try {
      const canvas = await html2canvas(canvasRef.current);
      const imageData = canvas.toDataURL('image/png');

      const shareData = await shareService.generateShareLink(
        token,
        templateId,
        user?.name || 'User',
        imageData
      );

      // Copy to clipboard and show notification
      navigator.clipboard.writeText(shareData.shareLink);
      alert('Share link copied to clipboard!');
    } catch (err) {
      alert('Failed to generate share link');
      console.error(err);
    }
  };

  const handleDownloadCard = async () => {
    try {
      const canvas = await html2canvas(canvasRef.current);
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `greeting_card_${Date.now()}.png`;
      link.click();
    } catch (err) {
      alert('Failed to download card');
      console.error(err);
    }
  };

  if (loading) return <div className="loading">Loading template...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!template) return <div className="error-message">Template not found</div>;

  return (
    <div className="editor-container">
      <header className="editor-header">
        <button onClick={() => navigate(-1)}>← Back</button>
        <h2>{template.title}</h2>
      </header>

      <div className="editor-content">
        <div className="canvas-wrapper" ref={canvasRef}>
          <img src={template.imageUrl} alt={template.title} className="template-image" />
          
          {user?.profilePicture && (
            <div
              className="profile-picture"
              style={{
                left: `${template.overlayConfig.photoPosition.x}%`,
                top: `${template.overlayConfig.photoPosition.y}%`,
                width: `${template.overlayConfig.photoSize.width}px`,
                height: `${template.overlayConfig.photoSize.height}px`
              }}
            >
              <img src={user.profilePicture} alt="Profile" />
            </div>
          )}

          <div
            className="overlay-text"
            style={{
              left: `${template.overlayConfig.namePosition.x}%`,
              top: `${template.overlayConfig.namePosition.y}%`,
              color: template.overlayConfig.nameColor,
              fontSize: `${template.overlayConfig.fontSize}px`
            }}
          >
            {user?.name || 'Your Name'}
          </div>
            {/* <div className="greeting-message">
    Wishing you happiness and success always
  </div> */}
        </div>

        <div className="editor-actions">
          <button className="btn-primary" onClick={handleShareCard}>
            Share Card
          </button>
          <button className="btn-secondary" onClick={handleDownloadCard}>
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
