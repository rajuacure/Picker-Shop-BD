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
