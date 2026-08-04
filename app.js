/*=========================================
Picker Shop BD
Main JavaScript
Version : 1.0
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==========================
    Preloader
    ==========================*/

    const preloader = document.getElementById("preloader");

    window.addEventListener("load", () => {

        if (preloader) {

            preloader.style.opacity = "0";

            setTimeout(() => {

                preloader.style.display = "none";

            }, 500);

        }

    });

    /*==========================
    Mobile Menu
    ==========================*/

    const menuToggle = document.querySelector(".menu-toggle");

    const navbar = document.querySelector(".navbar");

    const overlay = document.querySelector(".mobile-menu-overlay");

    if (menuToggle) {

        menuToggle.addEventListener("click", () => {

            navbar.classList.toggle("active");

            overlay.classList.toggle("active");

        });

    }

    if (overlay) {

        overlay.addEventListener("click", () => {

            navbar.classList.remove("active");

            overlay.classList.remove("active");

        });

    }

    /*==========================
    Sticky Header
    ==========================*/

    const header = document.querySelector(".header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 100) {

            header.classList.add("sticky");

        } else {

            header.classList.remove("sticky");

        }

    });

    /*==========================
    Back To Top
    ==========================*/

    const backTop = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {

            backTop.classList.add("show");

        } else {

            backTop.classList.remove("show");

        }

    });

    if (backTop) {

        backTop.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }

});
/*==========================
Active Navigation
==========================*/

const navLinks = document.querySelectorAll(".navbar a");

const currentPage = window.location.pathname.split("/").pop() || "index.html";

navLinks.forEach(link => {

    const href = link.getAttribute("href");

    if (href === currentPage) {

        link.classList.add("active");

    } else {

        link.classList.remove("active");

    }

});

/*==========================
Smooth Scroll
==========================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    });

});

/*==========================
Scroll Animation
==========================*/

const revealElements = document.querySelectorAll(

".category-card, .product-card, .feature-box, .testimonial-card"

);

function revealOnScroll() {

    const windowHeight = window.innerHeight;

    revealElements.forEach(item => {

        const elementTop = item.getBoundingClientRect().top;

        if (elementTop < windowHeight - 80) {

            item.classList.add("fade-up");

        }

    });

}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();

/*==========================
Hero Image Effect
==========================*/

const heroImage = document.querySelector(".hero-image img");

if (heroImage) {

    heroImage.addEventListener("mousemove", () => {

        heroImage.style.transform = "scale(1.03)";

    });

    heroImage.addEventListener("mouseleave", () => {

        heroImage.style.transform = "scale(1)";

    });

}

/*==========================
Button Ripple Effect
==========================*/

document.querySelectorAll(".btn").forEach(button => {

    button.addEventListener("click", function (e) {

        const circle = document.createElement("span");

        const diameter = Math.max(this.clientWidth, this.clientHeight);

        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;

        circle.style.left = `${e.clientX - this.offsetLeft - radius}px`;

        circle.style.top = `${e.clientY - this.offsetTop - radius}px`;

        circle.classList.add("ripple");

        const ripple = this.getElementsByClassName("ripple")[0];

        if (ripple) {

            ripple.remove();

        }

        this.appendChild(circle);

    });

});

/*==========================
Product Card Hover
==========================*/

document.querySelectorAll(".product-card").forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-10px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0)";

    });

});
