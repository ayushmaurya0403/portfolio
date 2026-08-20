// ========================================
// PORTFOLIO DATA
// ========================================

const portfolioData = {
    name: "Ayush Maurya",

    role:
        "Computer Science Graduate & Aspiring Python Developer",

    description:
        "I am a Computer Science graduate passionate about software development, problem solving, Data Structures & Algorithms, and building real-world applications.",

    email:
        "ayushmaurya.dev04@gmail.com",

    github:
        "https://github.com/ayushmaurya0403",

    linkedin:
        "https://www.linkedin.com/in/ayush-maurya-a0b4b8244/",

    profileImage:
        "assests/profile.jpeg",

    leetcode:
        "https://leetcode.com/u/fledglingperson/",

    resume:
        "assests/ayush-maurya resume.pdf",

    instagram:
        "https://www.instagram.com/ayushmaurya0403/",

    whatsapp:
        "https://wa.me/918755874646"
};


// ========================================
// PROJECT DATA
// ========================================

const projectsData = [

    {
        title: "Coming Soon",
        image: "",
        description: "Project coming soon...",
        technologies: [],
        features: [],
        github: "#",
        liveDemo: "#"
    },

    {
        title: "Coming Soon",
        image: "",
        description: "Project coming soon...",
        technologies: [],
        features: [],
        github: "#",
        liveDemo: "#"
    },

    {
        title: "Coming Soon",
        image: "",
        description: "Project coming soon...",
        technologies: [],
        features: [],
        github: "#",
        liveDemo: "#"
    }

];


// ========================================
// HELPER FUNCTIONS
// ========================================

const $ = id =>
    document.getElementById(id);


const setText = (id, value) => {

    const element = $(id);

    if (element) {
        element.textContent = value;
    }

};


const setHref = (id, value) => {

    const element = $(id);

    if (element) {
        element.href = value;
    }

};


// ========================================
// HOME SECTION
// ========================================

function loadPortfolioData() {

    setText(
        "userName",
        portfolioData.name
    );

    setText(
        "userRole",
        portfolioData.role
    );

    setText(
        "userDescription",
        portfolioData.description
    );


    const profileImage =
        $("profileImage");

    if (profileImage) {

        profileImage.src =
            portfolioData.profileImage;

        profileImage.alt =
            portfolioData.name;
    }


    setHref(
        "resumeLink",
        portfolioData.resume
    );

    setHref(
        "githubLink",
        portfolioData.github
    );

    setHref(
        "linkedinLink",
        portfolioData.linkedin
    );

    setHref(
        "LeetcodeLink",
        portfolioData.leetcode
    );


    setHref(
        "emailLink",
        `https://mail.google.com/mail/?view=cm&fs=1&to=${portfolioData.email}`
    );

}


// ========================================
// THEME TOGGLE
// ========================================

function updateThemeIcon(button) {

    button.innerHTML =
        document.body.classList.contains(
            "light-theme"
        )
            ? '<i class="bi bi-moon"></i>'
            : '<i class="bi bi-brightness-high"></i>';

}


function setupTheme() {

    const themeToggle =
        $("themeToggle");

    if (!themeToggle) {
        return;
    }


    const savedTheme =
        localStorage.getItem(
            "portfolio-theme"
        );


    if (savedTheme === "light") {

        document.body.classList.add(
            "light-theme"
        );

    }


    updateThemeIcon(
        themeToggle
    );


    themeToggle.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "light-theme"
            );


            localStorage.setItem(
                "portfolio-theme",
                document.body.classList.contains(
                    "light-theme"
                )
                    ? "light"
                    : "dark"
            );


            updateThemeIcon(
                themeToggle
            );

        }
    );

}


// ========================================
// SKILLS - FLOATING ANIMATION
// ========================================

function startFloatingSkills() {

    const playground =
        $("skillsPlayground");

    if (!playground) {
        return;
    }


    const skills =
        playground.querySelectorAll(
            ".skill-icon"
        );


    if (!skills.length) {
        return;
    }


    const padding = 25;
    const gap = 20;

    let objects = [];
    let animationFrame;
    let resizeTimer;


    // ========================================
    // CREATE SKILL OBJECTS
    // ========================================

    function createObjects() {

        const width =
            playground.clientWidth;

        const height =
            playground.clientHeight;


        if (!width || !height) {
            return;
        }


        const skillWidth =
            skills[0].offsetWidth;

        const skillHeight =
            skills[0].offsetHeight;


        const positions = [];

        objects = [];


        function isOverlapping(x, y) {

            return positions.some(
                position =>

                    x <
                        position.x +
                        skillWidth +
                        gap &&

                    x +
                        skillWidth +
                        gap >
                        position.x &&

                    y <
                        position.y +
                        skillHeight +
                        gap &&

                    y +
                        skillHeight +
                        gap >
                        position.y
            );

        }


        skills.forEach(skill => {

            let x;
            let y;
            let attempts = 0;


            do {

                x =
                    Math.random() *
                        Math.max(
                            0,
                            width -
                                skillWidth -
                                padding * 2
                        ) +
                    padding;


                y =
                    Math.random() *
                        Math.max(
                            0,
                            height -
                                skillHeight -
                                padding * 2
                        ) +
                    padding;


                attempts++;


            } while (
                isOverlapping(x, y) &&
                attempts < 200
            );


            positions.push({
                x,
                y
            });


            const speed =
                0.15 +
                Math.random() * 0.25;


            const angle =
                Math.random() *
                Math.PI *
                2;


            objects.push({

                element: skill,

                x,
                y,

                vx:
                    Math.cos(angle) *
                    speed,

                vy:
                    Math.sin(angle) *
                    speed,

                width:
                    skillWidth,

                height:
                    skillHeight

            });


            skill.style.left =
                `${x}px`;

            skill.style.top =
                `${y}px`;

        });

    }


    // ========================================
    // ANIMATION
    // ========================================

    function animate() {

        const width =
            playground.clientWidth;

        const height =
            playground.clientHeight;


        objects.forEach(object => {

            object.x += object.vx;

            object.y += object.vy;


            const maxX =
                width -
                object.width -
                padding;


            const maxY =
                height -
                object.height -
                padding;


            // Horizontal collision

            if (
                object.x <= padding ||
                object.x >= maxX
            ) {

                object.vx *= -1;

            }


            // Vertical collision

            if (
                object.y <= padding ||
                object.y >= maxY
            ) {

                object.vy *= -1;

            }


            // Keep inside playground

            object.x =
                Math.max(
                    padding,
                    Math.min(
                        object.x,
                        maxX
                    )
                );


            object.y =
                Math.max(
                    padding,
                    Math.min(
                        object.y,
                        maxY
                    )
                );


            object.element.style.left =
                `${object.x}px`;


            object.element.style.top =
                `${object.y}px`;

        });


        // ========================================
        // SKILL COLLISION
        // ========================================

        for (
            let i = 0;
            i < objects.length;
            i++
        ) {

            for (
                let j = i + 1;
                j < objects.length;
                j++
            ) {

                const a =
                    objects[i];

                const b =
                    objects[j];


                const collision =

                    a.x <
                        b.x + b.width &&

                    a.x + a.width >
                        b.x &&

                    a.y <
                        b.y + b.height &&

                    a.y + a.height >
                        b.y;


                if (!collision) {
                    continue;
                }


                [
                    a.vx,
                    b.vx
                ] = [
                    b.vx,
                    a.vx
                ];


                [
                    a.vy,
                    b.vy
                ] = [
                    b.vy,
                    a.vy
                ];


                if (a.x < b.x) {

                    a.x -= 1;
                    b.x += 1;

                } else {

                    a.x += 1;
                    b.x -= 1;

                }

            }

        }


        animationFrame =
            requestAnimationFrame(
                animate
            );

    }


    // ========================================
    // RESIZE
    // ========================================

    function handleResize() {

        clearTimeout(
            resizeTimer
        );


        cancelAnimationFrame(
            animationFrame
        );


        resizeTimer =
            setTimeout(
                () => {

                    createObjects();

                    animate();

                },
                150
            );

    }


    window.addEventListener(
        "resize",
        handleResize
    );


    createObjects();

    animate();

}


// ========================================
// PROJECTS
// ========================================

function loadProjects() {

    const projectsGrid =
        $("projectsGrid");


    if (!projectsGrid) {
        return;
    }


    projectsGrid.innerHTML =
        projectsData
            .map(
                (project, index) => `

                    <article class="project-card">

                        <div class="project-image">

                            ${
                                project.image
                                    ? `
                                        <img
                                            src="${project.image}"
                                            alt="${project.title}"
                                            loading="lazy"
                                        >
                                      `
                                    : `
                                        <div class="project-placeholder">
                                            Coming Soon
                                        </div>
                                      `
                            }

                        </div>


                        <div class="project-content">

                            <h3 class="project-title">
                                ${project.title}
                            </h3>


                            <p class="project-description">
                                ${project.description}
                            </p>


                            <div class="project-technologies">

                                ${project.technologies
                                    .map(
                                        technology =>
                                            `<span>${technology}</span>`
                                    )
                                    .join("")}

                            </div>


                            <button
                                type="button"
                                class="project-details-btn"
                                data-project="${index}"
                            >
                                View Details →
                            </button>

                        </div>

                    </article>

                `
            )
            .join("");

}


// ========================================
// SHOW PROJECT DETAILS
// ========================================

function showProjectDetails(index) {

    const project =
        projectsData[index];

    const details =
        $("projectDetails");


    if (!project || !details) {
        return;
    }


    setText(
        "detailsTitle",
        project.title
    );


    setText(
        "detailsDescription",
        project.description
    );


    const technologies =
        $("detailsTechnologies");


    if (technologies) {

        technologies.innerHTML =
            project.technologies
                .map(
                    technology =>
                        `<span>${technology}</span>`
                )
                .join("");

    }


    const features =
        $("detailsFeatures");


    if (features) {

        features.innerHTML =
            project.features
                .map(
                    feature =>
                        `<li>${feature}</li>`
                )
                .join("");

    }


    setHref(
        "detailsGithub",
        project.github
    );


    setHref(
        "detailsLive",
        project.liveDemo
    );


    details.hidden = false;


    details.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


// ========================================
// PROJECT EVENTS
// ========================================

function setupProjects() {

    const projectsGrid =
        $("projectsGrid");


    const closeButton =
        $("projectCloseBtn");


    const details =
        $("projectDetails");


    if (projectsGrid) {

        projectsGrid.addEventListener(
            "click",
            event => {

                const button =
                    event.target.closest(
                        ".project-details-btn"
                    );


                if (!button) {
                    return;
                }


                showProjectDetails(
                    Number(
                        button.dataset.project
                    )
                );

            }
        );

    }


    if (
        closeButton &&
        details
    ) {

        closeButton.addEventListener(
            "click",
            () => {

                details.hidden = true;

            }
        );

    }

}


// ========================================
// CONTACT MESSAGE
// ========================================

function showFormMessage(
    element,
    message,
    isError = false
) {

    if (!element) {
        return;
    }


    element.textContent =
        message;


    element.classList.toggle(
        "error",
        isError
    );


    element.classList.add(
        "show"
    );


    clearTimeout(
        element.hideTimer
    );


    element.hideTimer =
        setTimeout(
            () => {

                element.classList.remove(
                    "show"
                );

            },
            5000
        );

}


// ========================================
// CONTACT
// ========================================

function setupContact() {

    // ========================================
    // CONTACT LINKS
    // ========================================

    setHref(
        "contactEmailLink",
        `https://mail.google.com/mail/?view=cm&fs=1&to=${portfolioData.email}`
    );


    setHref(
        "contactGithubLink",
        portfolioData.github
    );


    setHref(
        "contactGithubIcon",
        portfolioData.github
    );


    setHref(
        "contactLinkedinLink",
        portfolioData.linkedin
    );


    setHref(
        "contactLinkedinIcon",
        portfolioData.linkedin
    );


    setHref(
        "contactLeetcodeLink",
        portfolioData.leetcode
    );


    setHref(
        "contactLeetcodeIcon",
        portfolioData.leetcode
    );


    // ========================================
    // FOOTER SOCIAL LINKS
    // ========================================

    setHref(
        "footerInstagramLink",
        portfolioData.instagram
    );


    setHref(
        "footerWhatsappLink",
        portfolioData.whatsapp
    );


    // ========================================
    // CONTACT FORM
    // ========================================

    const form =
        $("contactForm");


    const formMessage =
        $("formMessage");


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            const name =
                $("contactName")
                    ?.value
                    .trim();


            const email =
                $("contactEmail")
                    ?.value
                    .trim();


            const message =
                $("contactMessage")
                    ?.value
                    .trim();


            const submitButton =
                form.querySelector(
                    ".contact-submit-btn"
                );


            // ========================================
            // EMPTY FIELDS
            // ========================================

            if (
                !name ||
                !email ||
                !message
            ) {

                showFormMessage(
                    formMessage,
                    "Please fill in all the fields.",
                    true
                );

                return;
            }


            // ========================================
            // EMAIL VALIDATION
            // ========================================

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !emailPattern.test(
                    email
                )
            ) {

                showFormMessage(
                    formMessage,
                    "Please enter a valid email address.",
                    true
                );

                return;
            }


            // ========================================
            // FORMSPREE CHECK
            // ========================================

            const action =
                form.getAttribute(
                    "action"
                );


            if (
                !action ||
                action.includes(
                    "YOUR_FORM_ID"
                )
            ) {

                showFormMessage(
                    formMessage,
                    "Please configure the contact form before sending.",
                    true
                );

                return;
            }


            // ========================================
            // LOADING STATE
            // ========================================

            if (submitButton) {

                submitButton.disabled =
                    true;


                submitButton.innerHTML =
                    'Sending <i class="bi bi-arrow-repeat"></i>';

            }


            try {

                const response =
                    await fetch(
                        action,
                        {
                            method: "POST",

                            body:
                                new FormData(
                                    form
                                ),

                            headers: {
                                Accept:
                                    "application/json"
                            }
                        }
                    );


                if (!response.ok) {

                    throw new Error(
                        "Form submission failed."
                    );

                }


                form.reset();


                showFormMessage(
                    formMessage,
                    "Message sent successfully! I'll get back to you soon."
                );


            } catch {

                showFormMessage(
                    formMessage,
                    "Unable to send the message. Please try again later.",
                    true
                );


            } finally {

                if (submitButton) {

                    submitButton.disabled =
                        false;


                    submitButton.innerHTML =
                        'Send Message <i class="bi bi-arrow-right"></i>';

                }

            }

        }
    );

}


// ========================================
// NAVIGATION
// ========================================

function setupNavigation() {

    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );


    const navbarCollapse =
        $("navbarNav");


    navLinks.forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    navLinks.forEach(
                        item => {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    link.classList.add(
                        "active"
                    );


                    // ========================================
                    // MOBILE NAVBAR CLOSE
                    // ========================================

                    if (
                        navbarCollapse &&
                        navbarCollapse.classList.contains(
                            "show"
                        ) &&
                        window.bootstrap?.Collapse
                    ) {

                        window.bootstrap.Collapse
                            .getOrCreateInstance(
                                navbarCollapse
                            )
                            .hide();

                    }

                }
            );

        }
    );


    // ========================================
    // LET'S CONNECT BUTTON
    // ========================================

    const connectButton =
        document.querySelector(
            ".connect-btn"
        );


    if (connectButton) {

        connectButton.addEventListener(
            "click",
            () => {

                const contact =
                    $("contact");


                if (contact) {

                    contact.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    }

}


// ========================================
// FOOTER
// ========================================

function setupFooter() {

    const year =
        $("footerYear");


    const backToTop =
        $("backToTop");


    // ========================================
    // CURRENT YEAR
    // ========================================

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


    // ========================================
    // BACK TO TOP
    // ========================================

    if (backToTop) {

        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }

}


// ========================================
// INITIALIZE EVERYTHING
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadPortfolioData();

        setupTheme();

        startFloatingSkills();

        loadProjects();

        setupProjects();

        setupContact();

        setupNavigation();

        setupFooter();

    }
);