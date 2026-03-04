document.addEventListener('DOMContentLoaded', () => {
    const clockElement = document.getElementById('clock');
    const dateElement = document.getElementById('date');
    const cursorDot = document.getElementById('cursor-dot');
    
    // Custom cursor logic for a dynamic feel
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        
        // Smooth cursor following
        requestAnimationFrame(() => {
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            // Remove translate since we are using fixed positioning and exact coordinates
            cursorDot.style.transform = `translate(-50%, -50%)`;
        });
    });

    // Expand cursor on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .time-display');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.style.width = '50px';
            cursorDot.style.height = '50px';
            cursorDot.style.backgroundColor = 'rgba(209, 191, 174, 0.1)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorDot.style.width = '20px';
            cursorDot.style.height = '20px';
            cursorDot.style.backgroundColor = 'transparent';
        });
    });

    // Subtly pulse the clock time
    let scale = 1;
    let growing = true;
    setInterval(() => {
        if(growing) {
            scale += 0.001;
            if(scale >= 1.02) growing = false;
        } else {
            scale -= 0.001;
            if(scale <= 1) growing = true;
        }
        clockElement.style.transform = `scale(${scale})`;
    }, 50);

    // Time logic based on the user's provided exact current time
    // Base time: 2026-03-04T12:23:35+08:00
    const baseTime = new Date('2026-03-04T12:23:35+08:00').getTime();
    const startTimeStamp = Date.now();

    function updateTime() {
        // Calculate the simulated current time based on the elapsed time since script load
        const elapsed = Date.now() - startTimeStamp;
        const currentTime = new Date(baseTime + elapsed);

        // Format time (HH:MM:SS)
        const hours = currentTime.getHours().toString().padStart(2, '0');
        const minutes = currentTime.getMinutes().toString().padStart(2, '0');
        const seconds = currentTime.getSeconds().toString().padStart(2, '0');
        
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;

        // Format date string
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = currentTime.toLocaleDateString(undefined, options);
    }

    // Initial call and update every second
    updateTime();
    setInterval(updateTime, 1000);
});
