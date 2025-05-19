const Contact = require("../models/contact");

const contact = async (req, res) => {
  try {
    // Assuming the logged-in user's email is available via req.user.email
    const userEmail = req.user.email;

    const { institutionName, phone, message } = req.body;

    
    const existingContact = await Contact.findOne({ email: userEmail });

    if (existingContact) {
      // Update the existing contact
      existingContact.institutionName = institutionName;
      existingContact.phone = phone;
      existingContact.message = message;

      await existingContact.save();
      return res.status(200).json({ message: 'Contact form updated successfully.' });
    } else {
      // Create a new contact form
      const newContact = new Contact({
        institutionName,
        phone,
        email: userEmail,
        message
      });

      await newContact.save();
      return res.status(201).json({ message: 'Contact form submitted successfully.' });
    }
  } catch (err) {
    console.error('Error handling contact form:', err);
    res.status(500).json({ error: 'Failed to submit or update contact form.' });
  }
};

module.exports = { contact };
