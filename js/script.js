document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize floating icons
    const iconsContainer = document.getElementById("floating-icons-container");

    // Creative studio software tools
    const icons = [
        { text: "Ps", color: "#31a8ff", bg: "rgba(0, 30, 54, 0.4)" }, // Photoshop
        { text: "Ai", color: "#ff9a00", bg: "rgba(51, 0, 0, 0.4)" },   // Illustrator
        { text: "Ae", color: "#9999ff", bg: "rgba(0, 0, 92, 0.4)" },   // After Effects
        { text: "Pr", color: "#ea77ff", bg: "rgba(0, 0, 92, 0.4)" },   // Premiere Pro
        { icon: "fa-brands fa-figma", color: "#f24e1e", bg: "rgba(255, 255, 255, 0.05)" } // Figma
    ];

    // Generate elements with random positions and delays
    icons.forEach(item => {
        const el = document.createElement("div");
        el.className = "floating-icon";

        if (item.icon) {
            const i = document.createElement("i");
            i.className = item.icon;
            el.appendChild(i);
        } else {
            el.textContent = item.text;
            el.style.fontFamily = "var(--font-heading)";
            el.style.fontWeight = "bold";
        }

        // Apply custom colors if specified
        if (item.color) {
            el.style.color = item.color;
        }
        if (item.bg) {
            el.style.background = item.bg;
        }

        // Randomize placement
        const posX = Math.random() * 90; // 0 to 90vw
        const posY = Math.random() * 90; // 0 to 90vh
        
        el.style.left = `${posX}%`;
        el.style.top = `${posY}%`;

        // Randomize animation parameters
        const delay = Math.random() * 5; // 0s to 5s delay
        const duration = 15 + Math.random() * 15; // 15s to 30s duration
        
        // CSS drift animation (defined in inner styles or from our CSS, we'll override property)
        el.style.animation = `floatAnimation ${duration}s infinite alternate ease-in-out`;
        el.style.animationDelay = `-${delay}s`; // start at random point in animation
        
        // Random scale
        const scale = 0.7 + Math.random() * 0.8; // 0.7 to 1.5
        el.style.transform = `scale(${scale})`; // Initial scale, although animation overwrites transform.
        // We can wrap it in an inner div to keep scaling if animation uses transform, 
        // but for simplicity, we let the animation handle transform.
        
        // We'll wrap in another div to apply the scale separately from the animation
        const wrapper = document.createElement("div");
        wrapper.style.position = "absolute";
        wrapper.style.left = `${posX}%`;
        wrapper.style.top = `${posY}%`;
        wrapper.style.transform = `scale(${scale})`;
        
        // Reset top/left on inner element since wrapper handles position
        el.style.left = "0";
        el.style.top = "0";
        el.style.position = "relative";

        wrapper.appendChild(el);
        iconsContainer.appendChild(wrapper);
    });

    // 2. Add subtle hover effect for 3D card perspective
    const glassCard = document.querySelector('.glass-card');
    
    document.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
        
        if (window.innerWidth > 768) { // Only on larger screens
            glassCard.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg) translateY(-5px)`;
        }
    });

    // Reset card on mouse leave
    document.addEventListener('mouseleave', () => {
        if (window.innerWidth > 768) {
            glassCard.style.transform = `rotateY(0deg) rotateX(0deg) translateY(0px)`;
        }
    });
});
