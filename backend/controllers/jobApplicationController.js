const JobApplication = require("../models/jobApplicationModel");
const ErrorHandler = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const nodemailer = require("nodemailer");

// Create transporter for sending emails
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });
};

// Send email notification
const sendApplicationEmail = async (application) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: "aniketkhillare172002@gmail.com",
    subject: `New Job Application - ${application.designation}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
          New Job Application Received
        </h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #2c3e50; margin-top: 0;">Applicant Information</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${application.firstName} ${
      application.lastName
    }</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${application.email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${application.countryCode} ${
      application.phone
    }</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Applied For:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${application.designation}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Qualification:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${application.qualification}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Experience:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${application.experience} years</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Location:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${application.location}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>Resume:</strong></td>
              <td style="padding: 8px 0;"><a href="${
                application.resumeUrl
              }" style="color: #3498db;">Download Resume</a></td>
            </tr>
          </table>
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background-color: #e8f4f8; border-left: 4px solid #3498db;">
          <p style="margin: 0; color: #2c3e50;">
            <strong>Application Date:</strong> ${new Date(application.appliedDate).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        
        <div style="margin-top: 30px; text-align: center; color: #7f8c8d;">
          <p>Please review this application in the admin dashboard.</p>
          <p style="font-size: 12px;">This is an automated email from Progressive Galaxy Career Portal.</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Application email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send notification email");
  }
};

// Submit job application
exports.submitJobApplication = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    qualification,
    experience,
    designation,
    location,
    countryCode,
    phone,
    resumeUrl,
    resumeOriginalName,
  } = req.body;

  const application = await JobApplication.create({
    firstName,
    lastName,
    email,
    qualification,
    experience,
    designation,
    location,
    countryCode,
    phone,
    resumeUrl,
    resumeOriginalName,
  });

  // Send email notification
  try {
    await sendApplicationEmail(application);
  } catch (emailError) {
    console.error("Email sending failed:", emailError);
    // Don't fail the application submission if email fails
  }

  res.status(201).json({
    success: true,
    message: "Application submitted successfully",
    application: {
      id: application._id,
      firstName: application.firstName,
      lastName: application.lastName,
      designation: application.designation,
      appliedDate: application.appliedDate,
    },
  });
});

// Get all job applications (Admin only)
exports.getAllJobApplications = catchAsyncErrors(async (req, res, next) => {
  const { status, designation, page = 1, limit = 10 } = req.query;

  const query = {};
  if (status && status !== "all") query.status = status;
  if (designation && designation !== "all") query.designation = designation;

  const applications = await JobApplication.find(query)
    .sort({ appliedDate: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await JobApplication.countDocuments(query);

  res.status(200).json({
    success: true,
    count: applications.length,
    total,
    applications,
    pagination: {
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1,
    },
  });
});

// Get single job application (Admin only)
exports.getJobApplication = catchAsyncErrors(async (req, res, next) => {
  const application = await JobApplication.findById(req.params.id);

  if (!application) {
    return next(new ErrorHandler("Job application not found", 404));
  }

  res.status(200).json({
    success: true,
    application,
  });
});

// Update job application status (Admin only)
exports.updateJobApplicationStatus = catchAsyncErrors(async (req, res, next) => {
  let application = await JobApplication.findById(req.params.id);

  if (!application) {
    return next(new ErrorHandler("Job application not found", 404));
  }

  const { status, notes, reviewedBy } = req.body;

  application = await JobApplication.findByIdAndUpdate(
    req.params.id,
    {
      status,
      notes,
      reviewedBy,
      reviewedAt: status !== "pending" ? Date.now() : application.reviewedAt,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    message: "Application status updated successfully",
    application,
  });
});

// Delete job application (Admin only)
exports.deleteJobApplication = catchAsyncErrors(async (req, res, next) => {
  const application = await JobApplication.findById(req.params.id);

  if (!application) {
    return next(new ErrorHandler("Job application not found", 404));
  }

  await application.deleteOne();

  res.status(200).json({
    success: true,
    message: "Job application deleted successfully",
  });
});

// Get application statistics (Admin only)
exports.getApplicationStats = catchAsyncErrors(async (req, res, next) => {
  const stats = await JobApplication.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  const designationStats = await JobApplication.aggregate([
    {
      $group: {
        _id: "$designation",
        count: { $sum: 1 },
      },
    },
    {
      $sort: { count: -1 },
    },
    {
      $limit: 10,
    },
  ]);

  const totalApplications = await JobApplication.countDocuments();
  const thisMonthApplications = await JobApplication.countDocuments({
    appliedDate: {
      $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    },
  });

  res.status(200).json({
    success: true,
    stats: {
      total: totalApplications,
      thisMonth: thisMonthApplications,
      byStatus: stats,
      byDesignation: designationStats,
    },
  });
});
