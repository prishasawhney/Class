import React, { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar, DayCalendarSkeleton, PickersDay } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const Calendar = ({ tasks }) => {
    const [highlightedDays, setHighlightedDays] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const initialValue = dayjs(); // Default to today

    useEffect(() => {
        const pendingTasks = tasks.filter(task => !task.isCompleted);
        const highlightDates = pendingTasks.map(task => dayjs(task.dueDate).format("YYYY-MM-DD")); // Store full date
        setHighlightedDays(highlightDates);
    }, [tasks]);

    const handleMonthChange = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 500); // Simulating data fetching delay
    };

    const ServerDay = (props) => {
        const { day, outsideCurrentMonth, ...other } = props;
        const formattedDay = day.format("YYYY-MM-DD"); // Get full date as string
        const isHighlighted = highlightedDays.includes(formattedDay); // Check full date match

        return (
            <PickersDay
                {...other}
                day={day}
                outsideCurrentMonth={outsideCurrentMonth}
                sx={{
                    position: "relative",
                    fontWeight: isHighlighted ? "bold" : "normal",
                    "&::after": isHighlighted
                        ? {
                            content: '""',
                            width: "6px",
                            height: "6px",
                            backgroundColor: "#F2719B", 
                            borderRadius: "50%",
                            position: "absolute",
                            bottom: "2px",
                            left: "50%",
                            transform: "translateX(-50%)",
                        }
                        : {},
                }}
            />
        );
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
                defaultValue={initialValue}
                loading={isLoading}
                onMonthChange={handleMonthChange}
                renderLoading={() => <DayCalendarSkeleton />}
                slots={{
                    day: ServerDay,
                }}
                slotProps={{
                    day: (ownerState) => ({
                        highlightedDays,
                    }),
                }}
            />
        </LocalizationProvider>
    );
};

export default Calendar;
