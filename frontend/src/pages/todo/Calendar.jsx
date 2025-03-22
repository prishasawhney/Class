import React, { useState, useEffect, useMemo } from "react";
import dayjs from "dayjs";
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Eventcalendar, setOptions } from '@mobiscroll/react';

setOptions({
    theme: 'material',
    themeVariant: 'light'
});

const Calendar = ({ tasks, dueDate, setDueDate }) => {
    const [highlightedDays, setHighlightedDays] = useState([]);
    const [selectedDate, setSelectedDate] = useState(dueDate || dayjs().format("YYYY-MM-DD")); // Default to dueDate or today

    useEffect(() => {
        const pendingTasks = tasks.filter(task => !task.isCompleted);
        const labelDates = pendingTasks.map(task => ({
            date: dayjs(task.dueDate).format("YYYY-MM-DD"),
            text: "", // No text, just a dot
            color: "#F3729C" // Pink dot for tasks
        }));

        setHighlightedDays(labelDates);
    }, [tasks]);

    useEffect(() => {
        if (dueDate) {
            setSelectedDate(dueDate); // Update selected date when dueDate changes
        }
    }, [dueDate]);

    const myView = useMemo(() => ({
        calendar: { type: 'month' },
    }), []);

    // Function to handle date click
    const handleDateClick = (event) => {
        const newDate = dayjs(event.date).format("YYYY-MM-DD");
        setDueDate(newDate); // Update external dueDate state
        setSelectedDate(newDate); // Update local selected date
    };

    return (
        // <Eventcalendar
        //     view={myView}
        //     labels={highlightedDays}
        //     selectedDate={selectedDate} 
        //     clickToCreate={false}
        //     dragToCreate={false}
        //     dragToMove={false}
        //     dragToResize={false}
        //     eventDelete={false}
        //     showEventTooltip={false}
        //     onCellClick={handleDateClick} 
        // />
        <div>print calendar here</div>
    );
};

export default Calendar;
