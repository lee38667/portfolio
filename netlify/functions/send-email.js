const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    const { name, email, message } = JSON.parse(event.body);

    // Validate required fields
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing required fields' }),
      };
    }

    // Create transporter with Gmail SMTP
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // Your Gmail address
        pass: process.env.GMAIL_APP_PASSWORD, // Gmail App Password
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.RECIPIENT_EMAIL, // Where you want to receive emails
      subject: `New Contact Form Message from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ message: 'Email sent successfully!' }),
    };

  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to send email' }),
    };
  }
};
