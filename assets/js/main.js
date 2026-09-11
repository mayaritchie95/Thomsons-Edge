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

  // Contact form: posts to a form endpoint when configured, else falls back to mailto.
  var form = document.getElementById("contact-form");
  if (form) {
    var status = form.querySelector(".form-status");
    var submitBtn = form.querySelector("button[type=submit]");

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var data = new FormData(form);

      // Honeypot: if a bot filled the hidden "company" field, silently drop it.
      if ((data.get("company") || "").toString().trim() !== "") {
        setStatus("Thank you — your enquiry has been sent.", "ok");
        form.reset();
        return;
      }

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

      var endpoint = (form.getAttribute("data-endpoint") || "").trim();

      // Build a plain-text version used for the mailto fallback / readability.
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

      if (endpoint) {
        // Submit in the background via Formspree-style JSON endpoint.
        var url = /^https?:\/\//.test(endpoint)
          ? endpoint
          : "https://formspree.io/f/" + endpoint;

        data.append("_subject", subject);
        data.delete("company"); // don't forward the honeypot

        setBusy(true);
        setStatus("Sending your enquiry…", "");

        fetch(url, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" }
        })
          .then(function (res) {
            if (res.ok) {
              setStatus(
                "Thank you, " + name.split(" ")[0] +
                  ". Your enquiry is on its way — we'll be in touch shortly.",
                "ok"
              );
              form.reset();
            } else {
              return res.json().then(function () {
                throw new Error("bad status");
              });
            }
          })
          .catch(function () {
            // Network / endpoint error → fall back to mailto so nothing is lost.
            openMailto(subject, lines);
            setStatus(
              "We couldn't send that automatically, so your email app is opening instead. " +
                "Or email info@thomsonsedge.com directly.",
              "err"
            );
          })
          .finally(function () {
            setBusy(false);
          });
      } else {
        // No endpoint configured yet → open the visitor's email app.
        openMailto(subject, lines);
        setStatus(
          "Thank you, " + name.split(" ")[0] +
            ". Your email app is opening so you can send this to our team. " +
            "Prefer to skip it? Email info@thomsonsedge.com directly.",
          "ok"
        );
      }
    });

    function openMailto(subject, lines) {
      var mailto =
        "mailto:info@thomsonsedge.com?cc=sarah@thomsonsedge.com&subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(lines.join("\n"));
      window.location.href = mailto;
    }

    function setBusy(on) {
      if (!submitBtn) return;
      submitBtn.disabled = on;
      submitBtn.textContent = on ? "Sending…" : "Send Enquiry";
    }

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
