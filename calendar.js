document.addEventListener('DOMContentLoaded', function() {
    const events = [
        { date: 5, month: 8, year: 2024, title: 'Assignment Deadline' },
        { date: 15, month: 8, year: 2024, title: 'Project Due' },
        { date: 20, month: 8, year: 2024, title: 'Exam' }
    ];

    const calendarDiv = document.getElementById('calendar');
    const currentMonthYearSpan = document.getElementById('currentMonthYear');
    let currentDate = new Date();

    function renderCalendar(month, year) {
        calendarDiv.innerHTML = '';

        // Display month and year
        currentMonthYearSpan.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

        // Create headers for days of the week
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        daysOfWeek.forEach(day => {
            const header = document.createElement('div');
            header.className = 'header';
            header.innerText = day;
            calendarDiv.appendChild(header);
        });

        // Get first day of the month and number of days in month
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Create empty cells for days before the first of the month
        for (let i = 0; i < firstDay; i++) {
            const emptyDiv = document.createElement('div');
            calendarDiv.appendChild(emptyDiv);
        }

        // Create calendar days
        for (let i = 1; i <= daysInMonth; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.innerText = i;
            calendarDiv.appendChild(dayDiv);
        }

        // Add events to specific days
        events.forEach(event => {
            if (event.month === month && event.year === year) {
                const dayDiv = calendarDiv.children[firstDay + event.date - 1]; // Adjust for header row
                if (dayDiv) {
                    const eventDiv = document.createElement('div');
                    eventDiv.className = 'event';
                    eventDiv.innerHTML = `<span class="event-marker"></span>${event.title}`;
                    dayDiv.classList.add('event-day');
                    dayDiv.appendChild(eventDiv);
                }
            }
        });
    }

    function updateCalendar(offset) {
        currentDate.setMonth(currentDate.getMonth() + offset);
        renderCalendar(currentDate.getMonth(), currentDate.getFullYear());
    }

    document.getElementById('prevMonth').addEventListener('click', function() {
        updateCalendar(-1);
    });

    document.getElementById('nextMonth').addEventListener('click', function() {
        updateCalendar(1);
    });

    // Initial render
    renderCalendar(currentDate.getMonth(), currentDate.getFullYear());
});
