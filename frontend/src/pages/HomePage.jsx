import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { templateService } from '../services/api';
import TemplateGrid from '../components/TemplateGrid';
import '../styles/Home.css';

const HomePage = () => {
//   const { user, token } = useContext(AuthContext);
const { user } = useContext(AuthContext);
  const [templates, setTemplates] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [templatesData, categoriesData] = await Promise.all([
          templateService.getTemplates(selectedCategory),
          templateService.getCategories()
        ]);
        
        setTemplates(templatesData);
        setCategories(categoriesData);
        setError('');
      } catch (err) {
        setError('Failed to load templates');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>ClassPlus Greeting Cards</h1>
        <p>Welcome, {user?.name || 'Guest'}!</p>
      </header>

      <div className="category-filter">
        <h3>Categories</h3>
        <div className="category-buttons">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading">Loading templates...</div>}

      {!loading && <TemplateGrid templates={templates} />}
    </div>
  );
};

export default HomePage;
