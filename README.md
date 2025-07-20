# Alumni Connect

## Catch up with your FET family, make meaningful connections, and stay in the loop with everything happening at Faculty of Engineering & Technology, Jamia Millia Islamia.

A full-featured alumni registration and management system built with Next.js and TypeScript.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Contributing](#contributing)
- [License](#license)

## Overview

The Alumni Portal is a web application designed to connect graduates with their alma mater and fellow alumni. It provides registration and login functionality for alumni, allowing them to create profiles, share their professional information, and stay connected with the institution.

## Features

- **User Authentication**
  - Registration for new alumni
  - Secure login with JWT authentication

- **Profile Management**
  - Personal information
  - Academic history
  - Professional details
  - Skills and expertise
  - Social media links

- **Responsive Design**
  - Mobile-friendly interface
  - Consistent styling across devices

## Technologies Used

- **Frontend**
  - Next.js
  - TypeScript
  - React Hooks
  - Tailwind CSS
  - Axios for API requests
  - Lucide React for icons

- **Backend** (API Integration)
  - RESTful API endpoints
  - JWT authentication
  -Express

## Getting Started


### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/AlumniConnect.git
   cd alumni-portal
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Environment Setup

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=https://your-backend-api.com
NEXT_PUBLIC_APP_URL=http://localhost:3000
```



## API Endpoints

Get All Alumni Data
router.get('/api/alumni', getAllUsers)

 Creating User Account
router.post('/alumni/register', handleUserSignUp)

Contact Us
router.post('/contactus', Sendcontactmail)

 Login User Account
router.post('/alumni/login', handleUserLogin)

filtering users
router.get('/alumni/filter',filterUsers)

//get alumni by name 
router.get('/alumni/search',searchUsersByName)

Update Alumni Data
router.patch('/alumni/:id', updateUserById)

 Delete Alumni Data
router.delete('/alumni/:id', deleteUserById)

 Get Alumni Data by ID
router.get('/alumni/:id', getAlumniById)

Log Out
router.get('/alumni/logout', logoutUser)

