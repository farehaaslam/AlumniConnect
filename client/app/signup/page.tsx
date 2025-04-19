"use client"
// components/AlumniRegistrationForm.tsx
import { useState, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';
import { Send, Loader2 } from 'lucide-react';

// Type definitions
interface FormData {
  fullName: string;
  email: string;
  rollNo: string;
  password: string;
  confirmPassword: string;
  jobRole: string;
  city: string;
  state: string;
  passOutYear: string;
  department: string;
  gender: string;
  github: string;
  linkedin: string;
  currentCompany: string;
  skills: string;
}

interface ApiData extends Omit<FormData, 'confirmPassword' | 'skills'> {
  skills: string[];
}

interface Message {
  text: string;
  type: 'success' | 'error' | '';
}

const AlumniRegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    rollNo: '',
    password: '',
    confirmPassword: '',
    jobRole: '',
    city: '',
    state: '',
    passOutYear: '',
    department: '',
    gender: '',
    github: '',
    linkedin: '',
    currentCompany: '',
    skills: ''
  });
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<Message>({ text: '', type: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setMessage({ text: 'Passwords do not match', type: 'error' });
      return;
    }

    setIsLoading(true);
    setMessage({ text: '', type: '' });

    try {
      // Prepare data for API (excluding confirmPassword)
      const apiData: ApiData = {
        ...formData,
        skills: formData.skills.split(',').map(skill => skill.trim()).filter(Boolean)
      };
      
      // Remove confirmPassword as it's not needed for the API
      delete (apiData as any).confirmPassword;
      
      // Make the API call
      await axios.post('/alumni/register', apiData);
      
      setMessage({ text: 'Registration successful!', type: 'success' });
      
      // Optional: Reset form after successful submission
      // setFormData({ fullName: '', email: '', ... });
      
    } catch (error: any) {
      setMessage({ 
        text: error.response?.data?.message || 'Registration failed. Please try again.', 
        type: 'error' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const departmentOptions = [
    'Computer Science & Engineering',
    'Information Technology',
    'Electronics & Communication',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Chemical Engineering',
    'Other'
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">Alumni Registration</h1>
      
      {message.text && (
        <div className={`p-4 mb-6 rounded-lg ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Personal Information</h2>
            
            <div>
              <label className="block text-gray-700 mb-1">Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Roll Number *</label>
              <input
                type="text"
                name="rollNo"
                value={formData.rollNo}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your roll number"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Gender *</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Create a password"
                minLength={8}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Confirm Password *</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm your password"
                minLength={8}
              />
            </div>
          </div>
          
          {/* Academic & Professional Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Academic & Professional Information</h2>
            
            <div>
              <label className="block text-gray-700 mb-1">Department *</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Department</option>
                {departmentOptions.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Year of Passing *</label>
              <input
                type="number"
                name="passOutYear"
                value={formData.passOutYear}
                onChange={handleChange}
                required
                min="1950"
                max="2030"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter passing year"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Current Job Role</label>
              <input
                type="text"
                name="jobRole"
                value={formData.jobRole}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your current job role"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Current Company</label>
              <input
                type="text"
                name="currentCompany"
                value={formData.currentCompany}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your current company"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your city"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your state"
              />
            </div>
          </div>
        </div>
        
        {/* Social & Skills */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Social Profiles & Skills</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-1">LinkedIn Profile</label>
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://linkedin.com/in/yourusername"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">GitHub Profile</label>
              <input
                type="url"
                name="github"
                value={formData.github}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://github.com/yourusername"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1">Skills (comma-separated)</label>
            <textarea
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="JavaScript, React, Node.js, etc."
              rows={3}
            />
          </div>
        </div>
        
        <div className="flex justify-center pt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-70 transition duration-300"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} />
                Processing...
              </>
            ) : (
              <>
                <Send className="mr-2" size={20} />
                Register Now
              </>
            )}
          </button>
        </div>
      </form>
      
      <p className="text-center text-gray-500 mt-8">
        Fields marked with * are required
      </p>
    </div>
  );
};

export default AlumniRegistrationForm;