const mongoose = require('mongoose');
const XLSX = require('xlsx');
const { jobs } = require('../models/job.js');
require('dotenv').config({ path: `${process.cwd()}/.env` });

// File upload API to handle Excel file and insert data into MongoDB
const RequirementUpload = async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  try {
    // Read the Excel file from memory
    const workbook = XLSX.read(req.file.buffer);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convert the sheet data to JSON
    const jsonData = XLSX.utils.sheet_to_json(sheet);

    // Loop through the rows and insert them into MongoDB
    for (const row of jsonData) {
      await insertData(row);
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
const insertData = async (row) => {
  try {
    // Validate and clean up row data
    const title = row['title'] ? row['title'].toString().trim() : '';
    const department = row['department'] ? row['department'].toString().trim() : '';
    const location = {
      city: row['city'] || '',
      state: row['state'] || '',
      country: row['country'] || '',
      remote: row['remote'] === 'TRUE', // Assuming remote is either 'TRUE' or 'FALSE'
    };
    const category = row['category'] || null; // Assuming category is an ObjectId or null
    const employment_type = row['employment_type'] || '';
    const experience_level = row['experience_level'] || '';
    const min_experience = row['min_experience'] ? Number(row['min_experience']) : 0;
    const max_experience = row['max_experience'] ? Number(row['max_experience']) : null;
    const description = row['description'] || '';
    const requirements = row['requirements'] ? row['requirements'].split(',').map(req => req.trim()) : [];
    const prefered_qualifications = row['prefered_qualifications'] ? row['prefered_qualifications'].split(',').map(pq => pq.trim()) : [];
    const responsibilities = row['responsibilities'] ? row['responsibilities'].split(',').map(res => res.trim()) : [];
    const benefits = row['benefits'] ? row['benefits'].split(',').map(benefit => benefit.trim()) : [];
    const posted_date = row['posted_date'] ? new Date(row['posted_date']) : new Date();
    const closing_date = row['closing_date'] ? new Date(row['closing_date']) : new Date();
    const status = row['status'] || 'open'; // Default status is 'open'
    const max_applications = row['max_applications'] ? Number(row['max_applications']) : null;
    const is_active = row['is_active'] === 'TRUE';
    const allow_multiple_applications = row['allow_multiple_applications'] === 'TRUE';
    const salary_range = row['salary_range'] ? {
      min: row['min_salary'] ? Number(row['min_salary']) : 0,
      max: row['max_salary'] ? Number(row['max_salary']) : null,
      currency: row['currency'] || '',
      is_visible_to_applicants: row['salary_visible'] === 'TRUE',
    } : null;

    const hiring_manager = {
      name: row['hiring_manager_name'] || '',
      email: row['hiring_manager_email'] || '',
      department: row['hiring_manager_department'] || '',
    };

    const recruiters = row['recruiters'] ? row['recruiters'].split(',').map(recruiterEmail => ({
      name: row['recruiter_name'] || '',
      email: recruiterEmail.trim(),
    })) : [];

    // Construct the job object
    const newJob = new jobs({
      title,
      department,
      location,
      category,
      employment_type,
      experience_level,
      min_experience,
      max_experience,
      description,
      requirements,
      prefered_qualifications,
      responsibilities,
      benefits,
      posted_date,
      closing_date,
      status,
      hiring_manager,
      recruiters,
      max_applications,
      is_active,
      allow_multiple_applications,
      salary_range,
    });

    // Save the new job to MongoDB
    await newJob.save();
  } catch (err) {
    console.error('Error inserting data for row:', err);
  }
};

module.exports = { RequirementUpload };
