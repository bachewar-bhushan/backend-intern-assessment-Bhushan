require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./src/models/user"); // adjust if path differs

const indianNames = [
  "Aarav Sharma",
  "Vivaan Patil",
  "Aditya Kulkarni",
  "Rohan Deshmukh",
  "Siddharth Joshi",
  "Kunal Mehta",
  "Rahul Verma",
  "Amit Singh",
  "Nikhil Bansal",
  "Ankit Agarwal",
  "Piyush Jain",
  "Saurabh Mishra",
  "Abhishek Pandey",
  "Manish Yadav",
  "Vikas Choudhary",
  "Deepak Kumar",
  "Pranav Shinde",
  "Akash Pawar",
  "Tejas Kulkarni",
  "Swapnil Patil",
  "Neha Sharma",
  "Pooja Patil",
  "Anjali Kulkarni",
  "Sneha Joshi",
  "Ritu Verma",
  "Kavita Singh",
  "Shreya Mishra",
  "Nisha Yadav",
  "Aishwarya Chavan",
  "Priya Deshpande",
  "Rashmi Jadhav",
  "Sonali Pawar",
  "Pallavi Kulkarni",
  "Vaishali Patil",
  "Komal Jain",
  "Riya Mehta",
  "Sakshi Bansal",
  "Isha Gupta",
  "Tanvi Kulkarni",
  "Mayuri Patil",
  "Arjun Malhotra",
  "Mohit Kapoor",
  "Harsh Vardhan",
  "Varun Khanna",
  "Rajat Arora",
  "Tarun Saxena",
  "Shubham Tiwari",
  "Gaurav Tripathi",
  "Naveen Rawat",
  "Kartik Ahuja",
  "Yash Goel",
  "Nitin Saini",
  "Sandeep Chauhan",
  "Rakesh Solanki",
  "Ashish Rathore",
  "Pankaj Thakur",
  "Sunil Negi",
  "Rohit Bisht",
  "Manoj Rana",
  "Aman Panwar",
  "Anurag Nautiyal",
  "Deepanshu Gusain",
  "Himanshu Bhatt",
  "Vishal Joshi",
  "Alok Semwal",
  "Ravi Kandari",
  "Shashank Rawat",
  "Sachin Bhandari",
  "Akhil Bohra",
  "Satyam Uniyal",
  "Pradeep Karki",
  "Dinesh Pokhriyal",
  "Mahesh Chamoli",
  "Pawan Bisht",
  "Umesh Lohani",
  "Naresh Dimri",
  "Bhupesh Tolia",
  "Kundan Nainwal",
  "Mohan Singh",
  "Rajesh Pal",
  "Hemant Kandpal",
  "Chetan Negi",
  "Devendra Rawat",
  "Lokesh Mehra",
  "Ajay Joshi",
  "Narendra Singh",
  "Satish Bhandari",
  "Jitendra Bisht",
  "Anil Paneru",
];

async function seedUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    // OPTIONAL: clear existing user-role users
    await User.deleteMany({ role: "user" });

    const SALT_ROUNDS = 10;
    const hashedPassword = await bcrypt.hash("Password@123", SALT_ROUNDS);

    const users = indianNames.map((name, index) => {
      const email = `${name
        .toLowerCase()
        .replace(/ /g, ".")}${index}@example.com`;

      return {
        fullName: name,
        email,
        password: hashedPassword, // 🔐 HASHED
        role: "user",
        status: "active",
      };
    });

    await User.insertMany(users, { ordered: false });

    console.log(`✅ ${users.length} users seeded successfully`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  }
}

seedUsers();
