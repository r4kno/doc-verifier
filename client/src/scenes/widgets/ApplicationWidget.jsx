import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './PersonalInfoForm.css';
import nitLogo from "./WhatsApp Image 2024-10-27 at 10.47.46_b6111c96.jpg";


// Sample users data
const usersData = [
  {
    email: "krishagrawal@gmail.com",
    name: "Krish Agrawal",
    fatherName: "Raj Agrawal",
    motherName: "Sunita Agrawal",
    phoneNumber: "9876543210",
    jeeRank: "45231",
    aadhaarNumber: "4525-5878-6840"
  },
  {
    email: "sanchitsingh2@gmail.com",
    name: "Sanchit Singh",
    fatherName: "Ravindra Nath Singh",
    motherName: "Sunita Singh",
    phoneNumber: "9876543210",
    jeeRank: "48261",
    aadhaarNumber: "2345-6789-0123"
  },
  {
    email: "onkargupta2@gmail.com",
    name: "Onkar Gupta",
    fatherName: "Vijay Kumar Gupta",
    motherName: "Hemlata Gupta",
    phoneNumber: "7876543421",
    jeeRank: "43211",
    aadhaarNumber: "7654-9705-1377"
  },
  
  
  // Add more sample users as needed
];

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
        <button className="modal-close" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

const ApplicationWidget = () => {
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    motherName: '',
    phoneNumber: '',
    email: '',
    jeeRank: '',
    aadhaarNumber: ''
  });

  const [originalData, setOriginalData] = useState({});
  const [editedFields, setEditedFields] = useState({});
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [currentField, setCurrentField] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState({});
  
  const userEmail = useSelector((state) => state.user.email);

  // Document requirements mapping
  const documentRequirements = {
    aadhaarNumber: "Aadhaar Card",
    name: "Government ID Proof",
    fatherName: "Father's ID Proof",
    motherName: "Mother's ID Proof",
    jeeRank: "JEE Score Card",
    phoneNumber: "Address Proof"
  };

  const findUserInJSON = (email) => {
    const user = usersData.find(user => user.email.toLowerCase() === email.toLowerCase());
    return user || null;
  };

  const getUserData = () => {
    if (userEmail) {
      const userData = findUserInJSON(userEmail);
      if (userData) {
        const data = {
          name: userData.name || '',
          fatherName: userData.fatherName || '',
          motherName: userData.motherName || '',
          phoneNumber: userData.phoneNumber || '',
          email: userData.email || '',
          jeeRank: userData.jeeRank || '',
          aadhaarNumber: userData.aadhaarNumber || ''
        };
        setFormData(data);
        setOriginalData(data);
      }
    }
  };

  useEffect(() => {
    getUserData();
  }, [userEmail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Check if the value is different from original
    if (value !== originalData[name]) {
      setEditedFields(prev => ({
        ...prev,
        [name]: true
      }));
      setCurrentField(name);
      setShowUploadModal(true);
    } else {
      setEditedFields(prev => ({
        ...prev,
        [name]: false
      }));
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFiles(prev => ({
        ...prev,
        [currentField]: file
      }));
      setShowUploadModal(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if any edited fields are missing document uploads
    const missingDocuments = Object.keys(editedFields)
      .filter(field => editedFields[field] && !uploadedFiles[field])
      .map(field => documentRequirements[field]);

    if (missingDocuments.length > 0) {
      alert(`Please upload the following documents:\n${missingDocuments.join('\n')}`);
      return;
    }

    console.log('Form Data Submitted:', formData);
    console.log('Uploaded Files:', uploadedFiles);
    alert('Form submitted successfully!');
  };

  return (
    <div className="form-container">
      <img src={nitLogo} alt="NIT Raipur Logo" className="logo" />
      <h2>NIT Raipur Application Form</h2>
      
      {Object.keys(editedFields).length > 0 && (
        <div className="alert">
          <p>Please upload verification documents for the edited fields:</p>
          {Object.keys(editedFields)
            .filter(field => editedFields[field])
            .map(field => (
              <div key={field}>
                • {documentRequirements[field]}
                {uploadedFiles[field] && ' (✓)'}
              </div>
            ))}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {['name', 'fatherName', 'motherName', 'phoneNumber', 'email', 'jeeRank', 'aadhaarNumber'].map((field) => (
          <div key={field} className="form-row">
            <label htmlFor={field}>
              {field === 'name' ? 'Name' : 
               field === 'fatherName' ? "Father's Name" : 
               field === 'motherName' ? "Mother's Name" : 
               field === 'phoneNumber' ? 'Phone Number' : 
               field === 'jeeRank' ? 'JEE Rank' : 
               field === 'aadhaarNumber' ? 'Aadhaar Number' : 
               'Email'}:
            </label>
            <div className="input-group">
              <input
                type={field === 'phoneNumber' || field === 'aadhaarNumber' ? 'tel' : 'text'}
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                pattern={field === 'phoneNumber' ? '[0-9]{10}' : field === 'aadhaarNumber' ? '[0-9]{4}-[0-9]{4}-[0-9]{4}' : undefined}
                required
                className={editedFields[field] ? 'edited-field' : ''}
              />
              {editedFields[field] && (
                <button
                  type="button"
                  className="upload-button"
                  onClick={() => {
                    setCurrentField(field);
                    setShowUploadModal(true);
                  }}
                >
                  {uploadedFiles[field] ? '📎' : '📤'}
                </button>
              )}
            </div>
          </div>
        ))}
        <div className="button-container">
          <button type="submit" className="submit-button">Submit</button>
        </div>
      </form>

      <Modal 
        isOpen={showUploadModal} 
        onClose={() => setShowUploadModal(false)}
      >
        <h3>Upload Verification Document</h3>
        <p>Please upload {documentRequirements[currentField]} for verification</p>
        
      </Modal>
    </div>
  );
};

export default ApplicationWidget;