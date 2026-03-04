document.addEventListener('DOMContentLoaded', () => {
    const clockElement = document.getElementById('clock');
    const dateElement = document.getElementById('date');

    function updateTime() {
        const currentTime = new Date();

        const hours = currentTime.getHours().toString().padStart(2, '0');
        const minutes = currentTime.getMinutes().toString().padStart(2, '0');
        const seconds = currentTime.getSeconds().toString().padStart(2, '0');

        if (clockElement) {
            clockElement.textContent = `${hours}:${minutes}:${seconds}`;
        }

        if (dateElement) {
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            dateElement.textContent = currentTime.toLocaleDateString(undefined, options);
        }
    }

    // Initial call and update every second
    updateTime();
    setInterval(updateTime, 1000);
});
