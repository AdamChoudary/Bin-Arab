// Sticky Navbar Effect
window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// Auto close mobile menu when clicked
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        document.querySelector(".navbar-collapse").classList.remove("show");
    });
});

// ================= CUSTOM CURSOR =================

const cursor = document.querySelector(".cursor-circle");

document.addEventListener("mousemove", function(e) {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
});