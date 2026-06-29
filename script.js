document.addEventListener("DOMContentLoaded", function () {
    
    // --- 1. Content Unveiling and Music Playback Trigger ---
    const openCardBtn = document.getElementById("open-card-btn");
    const overlay = document.getElementById("invitation-overlay");
    const mainContent = document.getElementById("main-content");
    const bgMusic = document.getElementById("bg-music");
    const musicBtn = document.getElementById("music-btn");

    openCardBtn.addEventListener("click", function () {
        // Softly fade out original presentation card overlay
        overlay.style.opacity = "0";
        overlay.style.visibility = "hidden";
        
        // Expose main dynamic target layout
        mainContent.classList.add("show-content");
        
        // Play Audio with browser clearance reassurance fallback
        bgMusic.play().then(() => {
            musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }).catch(error => {
            console.log("Audio auto-play interaction constraint managed safely.");
        });
    });

    // Dedicated Play/Pause Toggle System
    musicBtn.addEventListener("click", function () {
        if (bgMusic.paused) {
            bgMusic.play();
            musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            bgMusic.pause();
            musicBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });

    // --- 2. Live Countdown Timer Setup ---
    const targetDate = new Date("July 19, 2026 14:00:00").getTime();

    const countdownTimer = setInterval(function () {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference < 0) {
            clearInterval(countdownTimer);
            document.querySelector(".timer-container").innerHTML = "<p style='color: #d4af37;'>Mubarak Ho! Nikah Ka Waqt Aa Gaya Hai.</p>";
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = String(days).padStart(2, '0');
        document.getElementById("hours").innerText = String(hours).padStart(2, '0');
        document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
        document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
    }, 1000);

    // --- 3. Interactive Scratch Card System ---
    const canvas = document.getElementById("scratch-canvas");
    const ctx = canvas.getContext("2d");
    const container = document.getElementById("scratch-card-box");

    // Initialize dimensions explicitly matching container dimensions
    function initCanvas() {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        
        // Fill Canvas layer with premium Gold metallic textured color mask
        ctx.fillStyle = "#c5a028";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Apply text instruction sign inside mask frame overlay
        ctx.fillStyle = "#022c22";
        ctx.font = "bold 14px Montserrat, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("SCRATCH HERE", canvas.width / 2, canvas.height / 2);
    }

    // Call layout mapping init
    initCanvas();
    window.addEventListener('resize', initCanvas);

    let isDrawing = false;

    function scratch(e) {
        if (!isDrawing) return;

        // Extract accurate dynamic positioning vector across device topologies
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        // Composite operations setup to scratch out destination pixels away
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 24, 0, Math.PI * 2);
        ctx.fill();
        
        handleScratchCompletion();
    }

    // Checking completion ratio percentage 
    function handleScratchCompletion() {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        let clearPixels = 0;

        for (let i = 3; i < pixels.length; i += 4) {
            if (pixels[i] === 0) clearPixels++;
        }

        // If 45% or more cleared, drop mask for accessibility clarity
        if ((clearPixels / (pixels.length / 4)) > 0.45) {
            canvas.style.transition = "opacity 0.6s ease";
            canvas.style.opacity = "0";
            setTimeout(() => {
                canvas.style.display = "none";
            }, 600);
        }
    }

    // Event Registration Configurations across Mobile and Desktop Devices
    canvas.addEventListener("mousedown", () => isDrawing = true);
    canvas.addEventListener("mouseup", () => isDrawing = false);
    canvas.addEventListener("mousemove", scratch);

    canvas.addEventListener("touchstart", () => isDrawing = true);
    canvas.addEventListener("touchend", () => isDrawing = false);
    canvas.addEventListener("touchmove", scratch);
});