import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { templateService, shareService } from '../services/api';
import html2canvas from 'html2canvas';
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  EmailShareButton,
  TelegramShareButton,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
  LinkedinIcon,
  EmailIcon,
  TelegramIcon
} from 'react-share';
import '../styles/Editor.css';

const EditorPage = () => {
  const { templateId } = useParams();
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [shareLoading, setShareLoading] = useState(false);
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
      setShareLoading(true);
      const canvas = await html2canvas(canvasRef.current);
      const imageData = canvas.toDataURL('image/png');

      const shareData = await shareService.generateShareLink(
        token,
        templateId,
        user?.name || 'User',
        imageData
      );

      setShareUrl(shareData.shareLink || window.location.href);
      setShowShareModal(true);
      setShareLoading(false);
    } catch (err) {
      console.error(err);
      alert('Failed to generate share link');
      setShareLoading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    alert('Share link copied to clipboard!');
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
          <button className="btn-primary" onClick={handleShareCard} disabled={shareLoading}>
            {shareLoading ? 'Generating...' : '🔗 Share Card'}
          </button>
          <button className="btn-secondary" onClick={handleDownloadCard}>
            ⬇️ Download
          </button>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="share-modal-overlay" onClick={() => setShowShareModal(false)}>
          <div className="share-modal" onClick={(e) => e.stopPropagation()}>
            <div className="share-modal-header">
              <h3>Share Your Greeting Card</h3>
              <button className="close-btn" onClick={() => setShowShareModal(false)}>✕</button>
            </div>

            <div className="share-modal-content">
              {/* Share Link Section */}
              <div className="share-link-section">
                <label>Direct Link:</label>
                <div className="share-input-group">
                  <input 
                    type="text" 
                    value={shareUrl} 
                    readOnly 
                    onClick={(e) => e.target.select()}
                  />
                  <button className="copy-btn" onClick={handleCopyLink}>Copy</button>
                </div>
              </div>

              {/* Social Sharing Options */}
              <div className="social-share-section">
                <p className="share-label">Share on Social Media:</p>
                <div className="social-buttons">
                  <FacebookShareButton
                    url={shareUrl}
                    quote={`Check out my beautiful greeting card - ${user?.name || 'My'} created with ClassPlus!`}
                    className="share-button facebook"
                  >
                    <FacebookIcon size={40} round />
                  </FacebookShareButton>

                  <WhatsappShareButton
                    url={shareUrl}
                    title={`Check out my beautiful greeting card! Created with ClassPlus 🎉`}
                    className="share-button whatsapp"
                  >
                    <WhatsappIcon size={40} round />
                  </WhatsappShareButton>

                  <TwitterShareButton
                    url={shareUrl}
                    title={`Just created an amazing greeting card with ClassPlus! Check it out 🎨`}
                    className="share-button twitter"
                  >
                    <TwitterIcon size={40} round />
                  </TwitterShareButton>

                  <LinkedinShareButton
                    url={shareUrl}
                    title="Check out my greeting card"
                    className="share-button linkedin"
                  >
                    <LinkedinIcon size={40} round />
                  </LinkedinShareButton>

                  <TelegramShareButton
                    url={shareUrl}
                    title={`Check out my beautiful greeting card!`}
                    className="share-button telegram"
                  >
                    <TelegramIcon size={40} round />
                  </TelegramShareButton>

                  <EmailShareButton
                    url={shareUrl}
                    subject="Check out my greeting card!"
                    body="I created a beautiful greeting card with ClassPlus. Check it out:"
                    className="share-button email"
                  >
                    <EmailIcon size={40} round />
                  </EmailShareButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditorPage;
