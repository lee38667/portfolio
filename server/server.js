const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Create Gmail transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.log('❌ Email configuration error:', error);
  } else {
    console.log('✅ Email server is ready to send messages');
  }
});

// Email endpoint
app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'Missing required fields' 
    });
  }

  // Email options
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.RECIPIENT_EMAIL,
    subject: `New Contact Form Message from ${name}`,
    text: `
Name: ${name}
Email: ${email}
Message: ${message}
    `,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Contact Form Submission</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
        <p style="color: #666; font-size: 12px; margin-top: 20px;">
          This email was sent from your Portfolio contact form.
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ 
      success: true, 
      message: 'Email sent successfully!' 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send email' 
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Email server running on port ${PORT}`);
});
