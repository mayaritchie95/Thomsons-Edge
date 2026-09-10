/* Thomson's Edge — interactions */
(function () {
  "use strict";

  // Sticky header state
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 40) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
      var expanded = nav.classList.contains("open");
      toggle.setAttribute("aria-expanded", expanded);
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Reveal on scroll
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  // Contact form (front-end validation + mailto fallback)
  var form = document.getElementById("contact-form");
  if (form) {
    var status = form.querySelector(".form-status");
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var data = new FormData(form);
      var name = (data.get("name") || "").toString().trim();
      var email = (data.get("email") || "").toString().trim();
      if (!name || !email) {
        setStatus("Please add your name and email so we can reach you.", "err");
        return;
      }
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        setStatus("That email address doesn't look quite right.", "err");
        return;
      }
      // Build a structured email to the studio inboxes
      var lines = [
        "New enquiry from thomsonsedge.com",
        "----------------------------------",
        "Name: " + name,
        "Email: " + email,
        "Phone: " + (data.get("phone") || ""),
        "Service: " + (data.get("service") || ""),
        "Timeframe: " + (data.get("timeframe") || ""),
        "Investment level: " + (data.get("investment") || ""),
        "Project location: " + (data.get("location") || ""),
        "",
        "What they're hoping to achieve:",
        (data.get("message") || "")
      ];
      var subject = "Website enquiry — " + name;
      var body = encodeURIComponent(lines.join("\n"));
      var mailto =
        "mailto:info@thomsonsedge.com?cc=sarah@thomsonsedge.com&subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        body;
      setStatus(
        "Thank you, " + name.split(" ")[0] +
        ". Your email app is opening so you can send this to our team. Prefer to skip it? Email info@thomsonsedge.com directly.",
        "ok"
      );
      window.location.href = mailto;
    });

    function setStatus(msg, type) {
      if (!status) return;
      status.textContent = msg;
      status.className = "form-status " + type;
    }
  }

  // Footer year
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
