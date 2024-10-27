import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './PersonalInfoForm.css';
import nitLogo from "./WhatsApp Image 2024-10-27 at 10.47.46_b6111c96.jpg";

// Sample JSON data - you can move this to a separate JSON file and import it
const usersData = [
  {
    email: "something@gmail.com",
    name: "John Doe",
    fatherName: "John Doe Sr",
    motherName: "Jane Doe",
    phoneNumber: "1234567890",
    jeeRank: "123456",
    aadhaarNumber: "1234-5678-9012" // Added Aadhaar Number
  },
  {
    email: "sanchitsingh2@gmail.com",
    name: "Alice Smith",
    fatherName: "Bob Smith",
    motherName: "Carol Smith",
    phoneNumber: "9876543210",
    jeeRank: "654321",
    aadhaarNumber: "2345-6789-0123" // Added Aadhaar Number
  },
  {
    email: "john.doe@example.com",
    name: "John Doe",
    fatherName: "Robert Doe",
    motherName: "",
    phoneNumber: "1234567890",
    jeeRank: "234567",
    aadhaarNumber: "3456-7890-1234" // Added Aadhaar Number
  },
  {
    email: "jane.smith@example.com",
    name: "Jane Smith",
    fatherName: "Michael Smith",
    motherName: "",
    phoneNumber: "9876543210",
    jeeRank: "345678",
    aadhaarNumber: "4567-8901-2345" // Added Aadhaar Number
  },
  {
    email: "alice.j@example.com",
    name: "Alice Johnson",
    fatherName: "Edward Johnson",
    motherName: "",
    phoneNumber: "5551234567",
    jeeRank: "456789",
    aadhaarNumber: "5678-9012-3456" // Added Aadhaar Number
  }
];

function ApplicationWidget() {
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    motherName: '',
    phoneNumber: '',
    email: '',
    jeeRank: '',
    aadhaarNumber: '' // Added aadhaarNumber field
  });

  const userEmail = useSelector((state) => state.user.email);

  const findUserInJSON = (email) => {
    const user = usersData.find(user => user.email.toLowerCase() === email.toLowerCase());
    return user || null;
  };

  const getUserData = () => {
    if (userEmail) {
      const userData = findUserInJSON(userEmail);
      if (userData) {
        setFormData({
          name: userData.name || '',
          fatherName: userData.fatherName || '',
          motherName: userData.motherName || '',
          phoneNumber: userData.phoneNumber || '',
          email: userData.email || '',
          jeeRank: userData.jeeRank || '',
          aadhaarNumber: userData.aadhaarNumber || '' // Set aadhaarNumber field from user data
        });
      } else {
        console.log("User not found in JSON data");
      }
    }
  };

  useEffect(() => {
    getUserData();
  }, [userEmail]);

  const autofillForm = () => {
    const userData = findUserInJSON(userEmail);
    if (userData) {
      setFormData({
        name: userData.name,
        fatherName: userData.fatherName,
        motherName: userData.motherName,
        phoneNumber: userData.phoneNumber,
        email: userData.email,
        jeeRank: userData.jeeRank,
        aadhaarNumber: userData.aadhaarNumber // Set aadhaarNumber from user data
      });
    } else {
      // Fallback sample data if user not found
      const displayData = {
        name: 'default name',
        fatherName: 'Father Name',
        motherName: 'Mother Name',
        phoneNumber: '1234567890',
        email: 'samplemail@gmail.com',
        jeeRank: '000000', // Default JEE Rank
        aadhaarNumber: '0000-0000-0000' // Default Aadhaar Number
      };
      setFormData(displayData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    alert('Form submitted successfully!');
  };

  return (
    <div className="form-container">
      <img src={nitLogo} alt="NIT Raipur Logo" className="logo" />
      <h2>NIT Raipur Application Form</h2>
      <form onSubmit={handleSubmit}>
        {['name', 'fatherName', 'motherName', 'phoneNumber', 'email', 'jeeRank', 'aadhaarNumber'].map((field) => ( // Added 'aadhaarNumber' field
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
            <input
              type={field === 'phoneNumber' || field === 'aadhaarNumber' ? 'tel' : 'text'}
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              pattern={field === 'phoneNumber' ? '[0-9]{10}' : field === 'aadhaarNumber' ? '[0-9]{4}-[0-9]{4}-[0-9]{4}' : undefined}
              required
            />
          </div>
        ))}
        <div className="button-container">
          <button type="submit" className="submit-button">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default ApplicationWidget;
