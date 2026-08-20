// ========================================
// PORTFOLIO DATA
// ========================================

const portfolioData = {

    name: "Ayush Maurya",
    role: "Computer Science Graduate & Aspiring Python Developer",
    description:
        "I am a Computer Science graduate passionate about software development, problem solving, Data Structures & Algorithms, and building real-world applications.",
    email: "ayushmaurya.dev04@gmail.com",
    github: "https://github.com/ayushmaurya0403",
    linkedin: "https://www.linkedin.com/in/ayush-maurya-a0b4b8244/",
    profileImage: "assests/profile.jpeg",
    leetcode:"https://leetcode.com/u/fledglingperson/",
    resume: "assests/ayush-maurya resume.pdf"
};


// ========================================
// HOME SECTION
// ========================================


// Name
document.getElementById("userName").textContent =
    portfolioData.name;


// Role
document.getElementById("userRole").textContent =
    portfolioData.role;


// Description
document.getElementById("userDescription").textContent =
    portfolioData.description;


// Profile Image
const profileImage =
    document.getElementById("profileImage");

profileImage.src =
    portfolioData.profileImage;

profileImage.alt =
    portfolioData.name;


// Resume
document.getElementById("resumeLink").href =
    portfolioData.resume;


// GitHub
document.getElementById("githubLink").href =
    portfolioData.github;


// LinkedIn
document.getElementById("linkedinLink").href =
    portfolioData.linkedin;

//Leetcode

document.getElementById("LeetcodeLink").href =
    portfolioData.leetcode;


// Email
document.getElementById("emailLink").href =
    "https://mail.google.com/mail/?view=cm&fs=1&to=" +
    portfolioData.email;


// ========================================
// NAVBAR RESUME BUTTON
// ========================================

document
    .getElementById("navbarResumeButton")
    .addEventListener("click", function () {

        const link = document.createElement("a");

        link.href = portfolioData.resume;

        link.download = "";

        link.click();
    });