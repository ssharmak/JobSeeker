const mongoose = require('mongoose');
const XLSX = require('xlsx');
const jwt = require('jsonwebtoken');
const { Candidate } = require('../models/candidates');
require('dotenv').config({ path: `${process.cwd()}/.env` });

// File upload API to handle Excel file and insert data into MongoDB
const fileUpload = async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  try {
    // Get the token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from Bearer <token>
    
    if (!token) {
      return res.status(403).send('No token provided');
    }

    // Decode the token to get the user ID
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure JWT_SECRET is in your .env file
    } catch (err) {
      return res.status(401).send('Invalid or expired token');
    }

    const userId = decoded.id; // Assuming 'id' is the field in your JWT payload that stores the user ObjectId

    // Read the Excel file from memory
    const workbook = XLSX.read(req.file.buffer);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convert the sheet data to JSON
    const jsonData = XLSX.utils.sheet_to_json(sheet);

    // Loop through the rows and insert them into MongoDB
    for (const row of jsonData) {
      await insertData(row, userId); // Pass the userId to insertData
    }

    // Return success response
    res.status(200).json({ message: 'Data imported successfully' });
  } catch (err) {
    console.error('Error processing file:', err);
    res.status(500).send('Error processing the file');
  } finally {
    // Close the MongoDB connection
    mongoose.disconnect();
  }
};

// Insert data function for MongoDB
const insertData = async (row, userId) => {
  try {
    // Validate and clean up row data
    const first_name = row['first_name'] ? row['first_name'].toString().trim() : '';
    const last_name = row['last_name'] ? row['last_name'].toString().trim() : '';
    const email = row['email'] ? row['email'].toString().trim() : '';
    const phone = row['phone'] ? row['phone'].toString().trim() : '';
    const date_of_birth = row['date_of_birth'] ? new Date(row['date_of_birth']) : null;
    const status = row['status'] ? row['status'].toString().trim() : '';
    const email_verified = row['email_verified'] === 'TRUE';
    const phone_verified = row['phone_verified'] === 'TRUE';
    const admin_verified = row['admin_verified'] === 'TRUE';

    // Ensure address is an object and not a string or incorrect value
    const address = {
      street: row['street'] || '',
      city: row['city'] || '',
      state: row['state'] || '',
      postal_code: row['postal_code'] || '',
      country: row['country'] || '',
    };

    // Handle Education as an array of objects
    const education = row['education'] ? [{
      degree: row['education'].toString().trim(),
      field_of_study: row['field_of_study'] || '',
      university: row['university'] || '',
      start_date: row['start_date'] ? new Date(row['start_date']) : null,
      end_date: row['end_date'] ? new Date(row['end_date']) : null,
      grade: row['grade'] || '',
    }] : [];

    // Handle Work Experience as an array of objects
    const work_experience = row['work_experience'] ? [{
      company: row['company'] || '',
      position: row['position'] || '',
      start_date: row['work_start_date'] ? new Date(row['work_start_date']) : null,
      end_date: row['work_end_date'] ? new Date(row['work_end_date']) : null,
      responsibilities: row['responsibilities'] ? row['responsibilities'].split(',').map(responsibility => responsibility.trim()) : [],
      technologies_used: row['technologies_used'] ? row['technologies_used'].split(',').map(tech => tech.trim()) : [],
    }] : [];

    // Handle Certifications as an array of objects
    const certifications = row['certifications'] ? [{
      name: row['certifications'].split(',').map(cert => cert.trim()),
      issuer: row['issuer'] || '',
      issue_date: row['issue_date'] ? new Date(row['issue_date']) : null,
      certificate_url: row['certificate_url'] || '',
    }] : [];

    // Handle Resume (object format)
    const resume = row['resume_file'] ? {
      file_name: row['resume_file'],
      file_url: row['resume_url'] || '',
      uploaded_at: row['resume_uploaded_at'] ? new Date(row['resume_uploaded_at']) : new Date(),
    } : {};

    // Handle Applications (array of objects)
    const applications = row['applications'] ? [{
      job_id: row['job_id'] || null,
      job_title: row['job_title'] || '',
      applied_date: row['applied_date'] ? new Date(row['applied_date']) : new Date(),
      Status: row['application_status'] || '',
      recruiter_comments: row['recruiter_comments'] || '',
    }] : [];

    // Construct the candidate object
    const newCandidate = new Candidate({
      main_user: userId, // Set the main_user to the decoded userId
      first_name,
      last_name,
      email,
      phone,
      date_of_birth,
      address,
      linkedin_profile: row['linkedin_profile'] || '',
      portfolio_website: row['portfolio_website'] || '',
      education,  
      work_experience, 
      certifications,  
      resume,  
      applications,  
      skills: row['skills'] ? row['skills'].split(',').map(skill => skill.trim()) : [],
      status,
      email_verified,
      phone_verified,
      admin_verified,
    });

    // Save the new candidate to MongoDB
    await newCandidate.save();
  } catch (err) {
    console.error('Error inserting data for row:', err);
  }
};

module.exports = { fileUpload };
