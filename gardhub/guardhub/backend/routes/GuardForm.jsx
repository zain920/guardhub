import React, { useState } from 'react';
import { useNotification } from '../../context/NotificationContext';
import './Guards.css';

const GuardForm = ({ onClose, onGuardCreated }) => {
  const { showNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // User account fields
    name: '',
    email: '',
    password: '',
    role: 'guard',
    
    // Guard profile fields
    badgeNumber: '',
    phone: '',
    shift: 'day',
    status: 'active',
    assignedSite: '',
    
    // Address
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    },
    
    // Emergency contact
    emergencyContact: {
      name: '',
      phone: '',
      relationship: ''
    },
    
    notes: '',
    certifications: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle nested objects (address, emergencyContact)
    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value
        }
      }));
    } else if (name.startsWith('emergency.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        emergencyContact: {
          ...prev.emergencyContact,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/guards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        showNotification('✅ Guard created successfully', 'success');
        onGuardCreated(data.data);
        onClose();
      } else {
        showNotification(`❌ Error: ${data.message}`, 'error');
      }
    } catch (error) {
      showNotification('❌ Network error. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="guard-form-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <span className="modal-icon">👥</span>
          <h2>Add New Guard</h2>
        </div>

        <form onSubmit={handleSubmit} className="guard-form">
          <div className="form-section">
            <h3>Account Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                />
              </div>

              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@guardhub.com"
                />
              </div>

              <div className="form-group">
                <label>Password *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  minLength="6"
                />
              </div>

              <div className="form-group">
                <label>Role</label>
                <select name="role" value={formData.role} onChange={handleChange}>
                  <option value="guard">Guard</option>
                  <option value="supervisor">Supervisor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Guard Details</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Badge Number *</label>
                <input
                  type="text"
                  name="badgeNumber"
                  value={formData.badgeNumber}
                  onChange={handleChange}
                  required
                  placeholder="G-1001"
                />
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="(555) 123-4567"
                />
              </div>

              <div className="form-group">
                <label>Shift</label>
                <select name="shift" value={formData.shift} onChange={handleChange}>
                  <option value="day">Day Shift</option>
                  <option value="night">Night Shift</option>
                  <option value="swing">Swing Shift</option>
                </select>
              </div>

              <div className="form-group">
                <label>Status</label>
                <select name="status" value={formData.status} onChange={handleChange}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="on-leave">On Leave</option>
                </select>
              </div>

              <div className="form-group full-width">
                <label>Assigned Site</label>
                <input
                  type="text"
                  name="assignedSite"
                  value={formData.assignedSite}
                  onChange={handleChange}
                  placeholder="Downtown Plaza"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Address</h3>
            <div className="form-grid">
              <div className="form-group full-width">
                <label>Street Address</label>
                <input
                  type="text"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleChange}
                  placeholder="123 Main St"
                />
              </div>

              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleChange}
                  placeholder="Los Angeles"
                />
              </div>

              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  name="address.state"
                  value={formData.address.state}
                  onChange={handleChange}
                  placeholder="CA"
                />
              </div>

              <div className="form-group">
                <label>ZIP Code</label>
                <input
                  type="text"
                  name="address.zipCode"
                  value={formData.address.zipCode}
                  onChange={handleChange}
                  placeholder="90001"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Emergency Contact</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Contact Name</label>
                <input
                  type="text"
                  name="emergency.name"
                  value={formData.emergencyContact.name}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                />
              </div>

              <div className="form-group">
                <label>Contact Phone</label>
                <input
                  type="tel"
                  name="emergency.phone"
                  value={formData.emergencyContact.phone}
                  onChange={handleChange}
                  placeholder="(555) 987-6543"
                />
              </div>

              <div className="form-group">
                <label>Relationship</label>
                <input
                  type="text"
                  name="emergency.relationship"
                  value={formData.emergencyContact.relationship}
                  onChange={handleChange}
                  placeholder="Spouse"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Additional Information</h3>
            <div className="form-group">
              <label>Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                placeholder="Any additional notes about the guard..."
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Guard'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GuardForm;
