const Job = require('../models/Job');

// @desc    Get all jobs (with search, filter, pagination)
// @route   GET /api/jobs
// @access  Public
exports.getJobs = async (req, res, next) => {
    try {
        const { search, location, employmentType, experienceMax, salaryMin, sortBy, sortOrder, page = 1, limit = 6, myJobs } = req.query;

        let queryObj = {};

        // Status check & recruiter ownership
        if (myJobs === 'true') {
            if (req.user) {
                queryObj.recruiter = req.user.id;
            } else {
                return res.status(401).json({
                    success: false,
                    message: 'Not authorized to view recruiter jobs'
                });
            }
        } else {
            queryObj.status = 'Published';
        }

        // Flexible regex search across title, company, description, skills
        if (search) {
            const regex = new RegExp(search, 'i');
            queryObj.$or = [
                { title: regex },
                { company: regex },
                { description: regex },
                { skills: regex }
            ];
        }

        // Location filter (case-insensitive partial match)
        if (location) {
            queryObj.location = new RegExp(location, 'i');
        }

        // Employment type filter
        if (employmentType && employmentType !== 'All') {
            queryObj.employmentType = employmentType;
        }

        // Max experience filter (experienceMin <= experienceMax)
        if (experienceMax) {
            queryObj.experienceMin = { $lte: Number(experienceMax) };
        }

        // Min salary filter (salaryMax >= salaryMin)
        if (salaryMin) {
            queryObj.salaryMax = { $gte: Number(salaryMin) };
        }

        // Build query
        let query = Job.find(queryObj);

        // Sorting
        let sortOption = { createdAt: -1 };
        if (sortBy) {
            const order = sortOrder === 'asc' ? 1 : -1;
            if (sortBy === 'salary') sortOption = { salaryMax: order };
            else if (sortBy === 'title') sortOption = { title: order };
            else if (sortBy === 'createdAt') sortOption = { createdAt: order };
            else sortOption = { [sortBy]: order };
        }
        query = query.sort(sortOption);

        // Pagination
        const pageNum = parseInt(page, 10) || 1;
        const limitNum = parseInt(limit, 10) || 6;
        const skip = (pageNum - 1) * limitNum;

        query = query.skip(skip).limit(limitNum);

        const jobs = await query;
        const totalJobs = await Job.countDocuments(queryObj);

        res.status(200).json({
            success: true,
            data: {
                jobs,
                pagination: {
                    page: pageNum,
                    limit: limitNum,
                    totalJobs,
                    totalPages: Math.ceil(totalJobs / limitNum)
                }
            }
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
exports.getJob = async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.id).populate('recruiter', 'name email company');

        if (!job) {
            return res.status(404).json({
                success: false,
                message: `Job not found with id of ${req.params.id}`
            });
        }

        // Non-recruiters can only see published jobs or closed jobs
        if (job.status === 'Draft' && (!req.user || req.user.id !== job.recruiter.toString())) {
             return res.status(403).json({
                success: false,
                message: `Not authorized to access this job`
            });
        }

        res.status(200).json({
            success: true,
            data: job
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Create new job
// @route   POST /api/jobs
// @access  Private (Recruiter only)
exports.createJob = async (req, res, next) => {
    try {
        // Add user to req.body
        req.body.recruiter = req.user.id;

        const job = await Job.create(req.body);

        res.status(201).json({
            success: true,
            data: job
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private (Recruiter only)
exports.updateJob = async (req, res, next) => {
    try {
        let job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: `Job not found with id of ${req.params.id}`
            });
        }

        // Make sure user is job owner
        if (job.recruiter.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: `User ${req.user.id} is not authorized to update this job`
            });
        }

        job = await Job.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: job
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Update job status
// @route   PATCH /api/jobs/:id/status
// @access  Private (Recruiter only)
exports.updateJobStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        let job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: `Job not found with id of ${req.params.id}`
            });
        }

        if (job.recruiter.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: `Not authorized to update this job`
            });
        }

        job.status = status;
        await job.save();

        res.status(200).json({
            success: true,
            data: job
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private (Recruiter only)
exports.deleteJob = async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: `Job not found with id of ${req.params.id}`
            });
        }

        if (job.recruiter.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: `User ${req.user.id} is not authorized to delete this job`
            });
        }

        await job.deleteOne();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get dashboard stats
// @route   GET /api/jobs/dashboard/stats
// @access  Private (Recruiter only)
exports.getDashboardStats = async (req, res, next) => {
    try {
        const Application = require('../models/Application');
        
        const jobs = await Job.find({ recruiter: req.user.id });
        const jobIds = jobs.map(j => j._id);
        
        const totalJobs = jobs.length;
        const publishedJobs = jobs.filter(j => j.status === 'Published').length;
        const closedJobs = jobs.filter(j => j.status === 'Closed').length;
        
        const totalApplications = await Application.countDocuments({ job: { $in: jobIds } });
        const applied = await Application.countDocuments({ job: { $in: jobIds }, status: 'Applied' });
        const shortlisted = await Application.countDocuments({ job: { $in: jobIds }, status: 'Shortlisted' });
        const interviews = await Application.countDocuments({ job: { $in: jobIds }, status: 'Interview' });
        const selected = await Application.countDocuments({ job: { $in: jobIds }, status: 'Selected' });
        const rejected = await Application.countDocuments({ job: { $in: jobIds }, status: 'Rejected' });
        
        res.status(200).json({
            success: true,
            data: {
                totalJobs,
                publishedJobs,
                closedJobs,
                totalApplications,
                applied,
                shortlisted,
                interviews,
                selected,
                rejected
            }
        });
    } catch (err) {
        next(err);
    }
};
