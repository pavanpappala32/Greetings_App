import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { userService } from '../services/api';
import '../styles/PremiumModal.css';

const PremiumModal = ({ template, onClose, onSuccess }) => {
//   const { token, user, refreshUser } = useContext(AuthContext);
const { token, refreshUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      await userService.upgradePremium(token, 1);
      await refreshUser();
      setMessage('✅ Successfully upgraded to Premium!');
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 2000);
    } catch (error) {
      setMessage('❌ Failed to upgrade. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="premium-overlay" onClick={onClose}>
      <div className="premium-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>

        <div className="premium-header">
          <span className="premium-icon">⭐</span>
          <h2>Unlock Premium</h2>
        </div>

        <div className="template-preview">
          <img src={template.imageUrl} alt={template.title} />
          <p className="template-name">{template.title}</p>
        </div>

        <div className="premium-benefits">
          <h3>Premium Benefits:</h3>
          <ul>
            <li>✅ Access all premium templates</li>
            <li>✅ High-resolution downloads</li>
            <li>✅ Advanced editing features</li>
            <li>✅ Priority support</li>
            <li>✅ Ad-free experience</li>
          </ul>
        </div>

        <div className="pricing-section">
          <div className="price">
            <span className="amount">₹299</span>
            <span className="period">/month</span>
          </div>
          <p className="trial">Cancel anytime. First 7 days free!</p>
        </div>

        {message && <div className="premium-message">{message}</div>}

        <button
          className="btn-subscribe"
          onClick={handleUpgrade}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Start Free Trial'}
        </button>

        <button className="btn-later" onClick={onClose}>
          Maybe Later
        </button>

        <p className="disclaimer">
          Your subscription will auto-renew. You can cancel anytime from your profile.
        </p>
      </div>
    </div>
  );
};

export default PremiumModal;
