
const express = require('express');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const Blog = require('../../../backend/model/Blog')
const Comment = require('../../../backend/model/Comment')
const mongoose = require("mongoose");
const authMiddleware = require('../../../backend/middleware/authMiddleware');

const router = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage: storage });


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,

});
router.post("/blog", upload.single('fileAvatar',), async (req, res) => {
    try {
        // Check if the file is uploaded
        if (!req.file) {
            return res.status(400).json({ message: "file Avatar Required" });
        }

        const fileAvatar = req.file;
        const allowedFormats = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

        // Check if the file type is allowed
        if (!allowedFormats.includes(fileAvatar.mimetype)) {
            return res.status(400).json({ message: "File format not supported. Only PNG, JPEG, and WEBP are allowed." });
        }


        const { title, description, category, date, author } = req.body;

        // Validate fields
        if (!title ||
            !description ||
            !category ||
            !author ||
            !date
            ) {
            return res.status(400).json({ message: "Please Provide Full Details!" });
        }

        // Upload image to Cloudinary
        const cloudinaryResponse = await cloudinary.uploader.upload(fileAvatar.path);


        if (!cloudinaryResponse || cloudinaryResponse.error) {
            console.error("Cloudinary Error:", cloudinaryResponse.error || "Unknown Cloudinary Error");
            return res.status(500).json({ message: "Error uploading image to Cloudinary" });
        }


        // Create About record
        const blog = await Blog.create({

            title,
            description,
            category,
            date,
            author,
            fileAvatar: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url,
            },
        });
        await blog.save()
        res.status(200).json({ message: 'success' });

    } catch (error) {
        // Log the error to understand what's causing the issue
        console.error("Error in /blog/blog:", error.message);
        console.error("Error in about-post route:", error);
        res.status(500).json({ message: 'System Error' });
    }
});


/////----////
router.get('/total-blogs', async (req, res) => {
    try {
        const totalBlogs = await Blog.countDocuments();
        res.json({ totalBlogs });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
////----total blog per day---////
router.get('/perdaytotal', async (req, res) => {
    try {
       
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0); 
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999); 

       
        const totalBlogsToday = await Blog.countDocuments({
            createdAt: { $gte: todayStart, $lt: todayEnd }
        });

        res.json({ totalBlogsToday });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'System Error' });
    }
});
////---yesterday total post ---///
router.get('/yesterday', async (req, res) => {
    try {
        
        const yesterdayStart = new Date();
        yesterdayStart.setDate(yesterdayStart.getDate() - 1);
        yesterdayStart.setHours(0, 0, 0, 0); 

        const yesterdayEnd = new Date();
        yesterdayEnd.setDate(yesterdayEnd.getDate() - 1); 
        yesterdayEnd.setHours(23, 59, 59, 999);

        
        const totalBlogsYesterday = await Blog.countDocuments({
            createdAt: { $gte: yesterdayStart, $lt: yesterdayEnd }
        });

        res.json({ totalBlogsYesterday });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'System Error' });
    }
});

router.get("/blog-get", async (req, res) => {
    try {
        const blog = await Blog.find({})
        res.json(blog)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'System Error' });
    }
})

router.get('/blog/:id', authMiddleware, async (req, res) => {
    try {
        const id = req.params.id;
        const blog = await Blog.findById(id);
        if (blog) {
            res.json(blog)
        } else {
            res.status(404).json({ message: "kew nai" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'areh kaj kn kore na' })
    }

})

router.put('/blog/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        console.log('Update request received with data:', body);

        const blog = await Blog.findByIdAndUpdate(id, body, { new: true });
        if (blog) {
            console.log('Updated data:', blog);
            res.json(blog);
        } else {
            console.log('No document found for id:', id);  // যদি কিছু না পাওয়া যায়
            res.status(404).json({ message: "No data found for the given ID" });
        }
    } catch (error) {
        console.error('Error during update:', error);  // ত্রুটি লগ করুন
        res.status(500).json({ message: 'System error', error: error.message });  // Error message সহ
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const blog = await Blog.findByIdAndDelete(id)
        if (blog) {

            res.json(blog)
        } else {
            res.status(404).json({ message: "success" })
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: 'top code a somossa' })
    }

})
////Comment section ///

// একটি ব্লগের সব কমেন্ট পেতে
//
router.get('/:blogId/comments', async (req, res) => {
    try {
        //const id = req.params.id;
        const comments = await Comment.find({ blogId: req.params.blogId }).sort({ createdAt: -1 });
        res.status(200).json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.post('/:blogId/comments', async (req, res) => {
    try {
        const { text, author } = req.body;
        const newComment = new Comment({
            text,
            author: author || 'Anonymous',
            blogId: req.params.blogId,
        });
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        console.error('Error posting comment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
//////////admin login ////////
// Login route for admin authentication
router.post('/loginadmin', (req, res) => {
    const { email, password } = req.body; 
    if (email === process.env.Email && password === process.env.Password) {
      return res.status(200).json({ message: 'Login successful' });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  });
  

module.exports = router;
