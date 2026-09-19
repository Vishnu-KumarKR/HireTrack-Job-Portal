const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Job = require('../models/Job');

dotenv.config({ path: __dirname + '/../.env' });

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

const users = [
    {
        name: 'Recruiter One',
        email: 'recruiter@test.com',
        password: 'password123',
        phone: '1234567890',
        role: 'recruiter'
    },
    {
        name: 'Seeker One',
        email: 'seeker1@test.com',
        password: 'password123',
        phone: '0987654321',
        role: 'seeker'
    },
    {
        name: 'Seeker Two',
        email: 'seeker2@test.com',
        password: 'password123',
        phone: '1112223333',
        role: 'seeker'
    }
];

const seedData = async () => {
    try {
        await connectDB();

        // Check if destroying data was explicitly requested (e.g. process.argv includes '--clean')
        const cleanRun = process.argv.includes('--clean');

        if (cleanRun) {
            await User.deleteMany();
            await Job.deleteMany();
            console.log('Data Cleared (--clean flag)...');
        }

        // Upsert seed users without wiping custom user accounts
        for (const user of users) {
            const existingUser = await User.findOne({ email: user.email });
            if (!existingUser) {
                await User.create(user);
            }
        }

        const recruiter = await User.findOne({ email: 'recruiter@test.com' });
        const recruiterId = recruiter._id;

        const jobs = [
            {
                title: 'MERN Stack Developer',
                description: 'We are looking for a skilled MERN stack developer...',
                company: 'TCS',
                location: 'Chennai, TN',
                experienceMin: 2,
                experienceMax: 5,
                salaryMin: 600000,
                salaryMax: 1200000,
                employmentType: 'Full Time',
                skills: ['MongoDB', 'Express', 'React', 'Node.js'],
                status: 'Published',
                recruiter: recruiterId
            },
            {
                title: 'Frontend Developer',
                description: 'Looking for a React expert...',
                company: 'Infosys',
                location: 'Bangalore, KA',
                experienceMin: 1,
                experienceMax: 3,
                salaryMin: 500000,
                salaryMax: 900000,
                employmentType: 'Full Time',
                skills: ['React', 'CSS', 'HTML', 'JavaScript'],
                status: 'Published',
                recruiter: recruiterId
            },
            {
                title: 'Backend Developer',
                description: 'Node.js backend developer wanted...',
                company: 'Zoho',
                location: 'Chennai, TN',
                experienceMin: 3,
                experienceMax: 6,
                salaryMin: 800000,
                salaryMax: 1500000,
                employmentType: 'Contract',
                skills: ['Node.js', 'Express', 'PostgreSQL', 'AWS'],
                status: 'Published',
                recruiter: recruiterId
            },
            {
                title: 'Java Developer',
                description: 'Enterprise Java developer...',
                company: 'CTS (Cognizant)',
                location: 'Coimbatore, TN',
                experienceMin: 4,
                experienceMax: 8,
                salaryMin: 900000,
                salaryMax: 1800000,
                employmentType: 'Full Time',
                skills: ['Java', 'Spring Boot', 'Hibernate'],
                status: 'Published',
                recruiter: recruiterId
            },
            {
                title: 'Python Developer',
                description: 'Python backend and data scripts...',
                company: 'Freshworks',
                location: 'Chennai, TN',
                experienceMin: 2,
                experienceMax: 4,
                salaryMin: 750000,
                salaryMax: 1300000,
                employmentType: 'Part Time',
                skills: ['Python', 'Django', 'Pandas'],
                status: 'Published',
                recruiter: recruiterId
            },
            {
                title: 'Software Engineer',
                description: 'Generalist software engineer...',
                company: 'Wipro',
                location: 'Vellore, TN',
                experienceMin: 1,
                experienceMax: 3,
                salaryMin: 450000,
                salaryMax: 800000,
                employmentType: 'Full Time',
                skills: ['C++', 'Python', 'Algorithms'],
                status: 'Published',
                recruiter: recruiterId
            },
            {
                title: 'QA Engineer',
                description: 'Automated testing specialist...',
                company: 'HCL Technologies',
                location: 'Madurai, TN',
                experienceMin: 2,
                experienceMax: 5,
                salaryMin: 550000,
                salaryMax: 1000000,
                employmentType: 'Full Time',
                skills: ['Selenium', 'Cypress', 'Jest'],
                status: 'Published',
                recruiter: recruiterId
            },
            {
                title: 'UI/UX Designer',
                description: 'Creative designer needed...',
                company: 'Mindtree',
                location: 'Thiruvallur, TN',
                experienceMin: 3,
                experienceMax: 6,
                salaryMin: 700000,
                salaryMax: 1400000,
                employmentType: 'Contract',
                skills: ['Figma', 'Adobe XD', 'Sketch'],
                status: 'Published',
                recruiter: recruiterId
            }
        ];

        const existingJobCount = await Job.countDocuments();
        let createdJobs;
        if (existingJobCount === 0 || cleanRun) {
            createdJobs = await Job.create(jobs);
            console.log('Seed Jobs Imported...');
        } else {
            createdJobs = await Job.find();
            console.log('Jobs already exist, preserving existing database data.');
        }

        // Add dummy applications if clean run
        if (cleanRun) {
            const Application = require('../models/Application');
            await Application.deleteMany();
            
            const seeker1 = await User.findOne({ email: 'seeker1@test.com' });
            const seeker2 = await User.findOne({ email: 'seeker2@test.com' });

            const apps = [
                {
                    job: createdJobs[0]._id,
                    applicant: seeker1._id,
                    resume: 'uploads/dummy.pdf',
                    coverLetter: 'I am highly interested in this role!',
                    phone: '9876543210',
                    status: 'Applied'
                },
                {
                    job: createdJobs[1]._id,
                    applicant: seeker2._id,
                    resume: 'uploads/dummy.pdf',
                    phone: '9876543211',
                    status: 'Shortlisted'
                },
                {
                    job: createdJobs[2]._id,
                    applicant: seeker1._id,
                    resume: 'uploads/dummy.pdf',
                    phone: '9876543210',
                    status: 'Interview'
                },
                {
                    job: createdJobs[3]._id,
                    applicant: seeker2._id,
                    resume: 'uploads/dummy.pdf',
                    phone: '9876543211',
                    status: 'Selected'
                },
                {
                    job: createdJobs[4]._id,
                    applicant: seeker1._id,
                    resume: 'uploads/dummy.pdf',
                    phone: '9876543210',
                    status: 'Rejected'
                }
            ];

            const createdApps = await Application.create(apps);
            console.log('Seed Applications Imported...');

            const Notification = require('../models/Notification');
            await Notification.deleteMany();

            const notifications = [
                {
                    user: recruiterId, // Recruiter notification
                    title: 'New Application',
                    message: `New application received for ${createdJobs[0].title} from Seeker One.`,
                    type: 'APPLICATION_STATUS'
                },
                {
                    user: seeker1._id, // Seeker notification
                    title: 'Interview Scheduled',
                    message: `Your application for ${createdJobs[2].title} has been moved to Interview stage!`,
                    type: 'INTERVIEW'
                },
                {
                    user: seeker2._id, // Seeker notification
                    title: 'Application Selected',
                    message: `Congratulations! You have been selected for ${createdJobs[3].title}.`,
                    type: 'APPLICATION_STATUS'
                }
            ];

            await Notification.create(notifications);
            console.log('Seed Notifications Imported...');
        }

        console.log('Seeder completed safely.');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedData();
