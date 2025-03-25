import * as React from "react";
import dayjs from "dayjs";
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { useTasks } from "../../contexts/TaskContexts";

const initialValue = dayjs();

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  // Get the correct month and year
  const currentMonth = day.month();
  const currentYear = day.year();

  // Find the task for this specific day & month
  const task = highlightedDays.find(
    (t) => t.day === day.date() && t.month === currentMonth && t.year === currentYear
  );

  const isSelected = !!task;
  const badgeColor = task?.color || "transparent";

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      sx={{
        "& .MuiBadge-badge": {
          backgroundColor: isSelected ? badgeColor : "transparent",
          width: "8px",
          height: "8px",
          minWidth: "8px",
          borderRadius: "50%",
          padding: 0,
          transform: "scale(1)",
        },
      }}
      badgeContent={isSelected ? " " : undefined}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}

export default function DateCalendarServerRequest() {
  const requestAbortController = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([]);
  const { tasks } = useTasks();
  const [currentMonth, setCurrentMonth] = React.useState(initialValue);

  const fetchHighlightedDays = (month) => {
    const selectedMonth = dayjs(month).month();
    const selectedYear = dayjs(month).year();

    const daysToHighlight = tasks
      .filter(
        (task) =>
          !task.isCompleted &&
          dayjs(task.dueDate).month() === selectedMonth &&
          dayjs(task.dueDate).year() === selectedYear
      )
      .map((task) => ({
        day: dayjs(task.dueDate).date(),
        month: selectedMonth,
        year: selectedYear,
        color: task.taskColor,
      }));

    setHighlightedDays(daysToHighlight);
    setIsLoading(false);
  };

  React.useEffect(() => {
    fetchHighlightedDays(currentMonth);
  }, [tasks, currentMonth]);

  const handleMonthChange = (newMonth) => {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]); // Temporarily clear until fetched
    setCurrentMonth(newMonth);

    // Fetch new data after state update
    setTimeout(() => fetchHighlightedDays(newMonth), 100);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        defaultValue={initialValue}
        loading={isLoading}
        onMonthChange={handleMonthChange}
        renderLoading={() => <DayCalendarSkeleton />}
        showDaysOutsideCurrentMonth
        fixedWeekNumber={6}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            highlightedDays,
          },
          calendarHeader: {
            sx: {
              backgroundColor: "#f0f0f0", // Change background color
              color: "#333", // Text color
              padding: "10px", // Add padding
              borderRadius: "10px", // Round corners
              marginTop: "0px", // Add margin
            },
          },
        }}
        sx={{
            width: "100%",
        }}
      />
    </LocalizationProvider>
  );
}
