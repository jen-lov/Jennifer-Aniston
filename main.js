
      // PREMIUM DYNAMIC PRICING, VALIDATIONS, MODAL, LOADING ANIMATIONS
      (function () {
        // DOM Elements
        const voiceRadio = document.querySelector('input[value="voice"]');
        const videoRadio = document.querySelector('input[value="video"]');
        const priceSpan = document.getElementById("dynamicPrice");
        const form = document.getElementById("celebrityBookingForm");
        const submitBtn = document.getElementById("submitBookingBtn");
        const modal = document.getElementById("successModal");
        const closeModal = document.getElementById("closeModalBtn");
        const scrollBtn = document.getElementById("scrollToBookingBtn");
        const bookingSection = document.getElementById("bookingSection");

        // Price mapping
        const pricing = { voice: 120, video: 220 };

        // Update total price dynamically
        function updateTotalPrice() {
          let selected = "voice";
          if (videoRadio && videoRadio.checked) selected = "video";
          const amount = pricing[selected];
          priceSpan.innerHTML = `$${amount}<span> USD</span>`;
        }

        if (voiceRadio && videoRadio) {
          voiceRadio.addEventListener("change", updateTotalPrice);
          videoRadio.addEventListener("change", updateTotalPrice);
        }
        updateTotalPrice();

        // Set min date for call date to today
        const datePicker = document.getElementById("callDate");
        if (datePicker) {
          const today = new Date().toISOString().split("T")[0];
          datePicker.setAttribute("min", today);
        }

        // Smooth scroll to booking section
        if (scrollBtn && bookingSection) {
          scrollBtn.addEventListener("click", (e) => {
            e.preventDefault();
            bookingSection.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          });
        }

        // Loading state handler
        function setLoading(isLoading, originalText) {
          if (isLoading) {
            submitBtn.disabled = true;
            submitBtn.innerHTML =
              '<span class="loader-spin"></span> Processing Request...';
          } else {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText || "Secure My Experience →";
          }
        }

        // Modal controls
        function showSuccessModal() {
          modal.classList.add("active");
          document.body.style.overflow = "hidden";
        }

        function hideModal() {
          modal.classList.remove("active");
          document.body.style.overflow = "";
        }

        if (closeModal) closeModal.addEventListener("click", hideModal);
        modal.addEventListener("click", (e) => {
          if (e.target === modal) hideModal();
        });

        // Validation function with user-friendly alerts
        function validateBookingForm() {
          const fullName = document.getElementById("fullName")?.value.trim();
          const email = document.getElementById("email")?.value.trim();
          const phone = document.getElementById("phone")?.value.trim();
          const callDate = document.getElementById("callDate")?.value;
          const callTime = document.getElementById("callTime")?.value;
          const terms = document.getElementById("termsCheck")?.checked;
          const paymentMethod = document.getElementById("paymentMethod")?.value;

          if (!fullName) {
            alert("Please enter your full name to connect with Jennifer.");
            return false;
          }
          if (!email) {
            alert("Email address is required for confirmation.");
            return false;
          }
          if (!email.includes("@") || !email.includes(".")) {
            alert("Please provide a valid email address.");
            return false;
          }
          if (!phone) {
            alert("Phone number is essential for coordination.");
            return false;
          }
          if (!callDate) {
            alert("Select your preferred call date — make it special.");
            return false;
          }
          if (!callTime) {
            alert("Choose a time for your exclusive moment.");
            return false;
          }
          if (!terms) {
            alert("You must accept the Terms & Conditions to proceed.");
            return false;
          }
          if (!paymentMethod) {
            alert(
              "Please select a payment method (Apple Pay or Gold Raza Card).",
            );
            return false;
          }
          return true;
        }

        // Extract selected call type for confirmation (optional bonus)
        function getSelectedCallTypeText() {
          if (videoRadio && videoRadio.checked) return "Video Call";
          return "Voice Call";
        }

        // Form submission (simulate async request, loading, modal)
        form.addEventListener("submit", async (event) => {
          event.preventDefault();

          if (!validateBookingForm()) return;

          const originalButtonText = submitBtn.innerHTML;
          setLoading(true, originalButtonText);

          // Simulate network request (premium delay with elegant loading)
          try {
            await new Promise((resolve) => setTimeout(resolve, 1700));
            // After successful simulation, show Hollywood style modal
            showSuccessModal();
            // Optionally reset the form? No - fan might want data visible. We keep fields.
            // However clear loading state.
            setLoading(false, originalButtonText);
            // optional: tiny micro reset if needed? but premium UX keeps filled.
            // We can also automatically reset only the checkbox? not required.
          } catch (err) {
            console.error("Submission error", err);
            alert("A rare glitch occurred. Please try again.");
            setLoading(false, originalButtonText);
          }
        });

        // Additional Micro-interactions: Input glow effect (already in CSS)
        // 3D card effect on hover for glass card (cinematic)
        const glassCard = document.querySelector(".glass-booking");
        if (glassCard) {
          glassCard.addEventListener("mousemove", (e) => {
            const rect = glassCard.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            glassCard.style.transform = `perspective(1400px) rotateY(${x * 5}deg) rotateX(${y * -3}deg)`;
            glassCard.style.transition = "transform 0.15s";
          });
          glassCard.addEventListener("mouseleave", () => {
            glassCard.style.transform =
              "perspective(1400px) rotateY(0deg) rotateX(0deg)";
            glassCard.style.transition = "transform 0.5s ease";
          });
        }

        // floating placeholder animation (add fade on load)
        window.addEventListener("load", () => {
          const allInputs = document.querySelectorAll(
            "input, select, textarea",
          );
          allInputs.forEach((el, idx) => {
            el.style.animation = `fadeUp 0.4s ease ${idx * 0.02}s backwards`;
          });
          // extra cinematic: set some random placeholder glow (no functional impact)
          console.log("✨ Jennifer Aniston exclusive platform ready");
        });

        // Force dynamic pricing if any radio change
        // Already listener, but re-trigger safety
        window.updateTotalPrice = updateTotalPrice;

        // Additional handling for gold card style but nothing else needed
        const paymentSelect = document.getElementById("paymentMethod");
        if (paymentSelect) {
          paymentSelect.addEventListener("change", () => {
            // subtle micro: no price change, only extra luxurious feeling
          });
        }
      })();
   