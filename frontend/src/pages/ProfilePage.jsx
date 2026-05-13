import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { userService } from '../services/api';
import '../styles/Profile.css';

const ProfilePage = () => {
  const { user, token, refreshUser } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [subscription, setSubscription] = useState('free');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setProfilePicture(user.profilePicture || '');
      setSubscription(user.subscription || 'free');
    }
  }, [user]);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setMessage('Name is required');
      return;
    }

    setLoading(true);
    try {
      await userService.updateProfile(token, { name, profilePicture });
      await refreshUser();
      setMessage('✅ Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('❌ Failed to update profile');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpgradePremium = async () => {
    setLoading(true);
    try {
      await userService.upgradePremium(token, 1);
      await refreshUser();
      setSubscription('premium');
      setMessage('🎉 Successfully upgraded to Premium!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('❌ Failed to upgrade subscription');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>My Profile</h2>

        {message && <div className="profile-message">{message}</div>}

        <form onSubmit={handleSaveProfile} className="profile-form">
          <div className="profile-picture-section">
            <div className="picture-preview">
              {profilePicture ? (
                <img src={profilePicture} alt="Profile" />
              ) : (
                <div className="placeholder">
                  <span>📷</span>
                  <p>Add Photo</p>
                </div>
              )}
            </div>
            <label className="file-input-label">
              Change Picture
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
              />
            </label>
          </div>

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="subscription-info">
            <h3>Subscription Status</h3>
            <div className={`status-badge ${subscription}`}>
              {subscription === 'premium' ? '⭐ Premium' : '🆓 Free'}
            </div>
            {subscription === 'free' && (
              <button
                type="button"
                className="btn-upgrade"
                onClick={handleUpgradePremium}
                disabled={loading}
              >
                {loading ? 'Processing...' : '✨ Upgrade to Premium'}
              </button>
            )}
            {subscription === 'premium' && (
              <p className="premium-info">
                Enjoy unlimited access to all premium templates!
              </p>
            )}
          </div>

          <button
            type="submit"
            className="btn-save"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
