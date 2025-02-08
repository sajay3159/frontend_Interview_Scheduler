import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Box, Snackbar, Alert  } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const Calendar = () => {
    const { user } = useContext(AuthContext);
    const [events, setEvents] = useState([]);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    useEffect(() => {
        if (!user) return;
        axios.get("http://localhost:4000/api/timeslots", { headers: { Authorization: `Bearer ${user.token}` } })
            .then(res => {
                setEvents(res.data.map(slot => ({
                    id: slot._id,
                    title: slot.title || "Interview",
                    start: slot.startTime,
                    end: slot.endTime
                })));
            });
    }, [user]);

    const handleDateClick = async (selection) => {
        if (!user) return;
        const startTime = selection.startStr;
        const endTime = new Date(new Date(startTime).getTime() + 30 * 60 * 1000).toISOString();

        try {
            const res = await axios.post("http://localhost:4000/api/timeslots", { startTime, endTime, hrEmail: user.email },
                { headers: { Authorization: `Bearer ${user.token}` } });
            setEvents([...events, { id: res.data._id, title: res.data.title, start: res.data.startTime, end: res.data.endTime }]);
            setSnackbar({ open: true, message: "Slot booked successfully!", severity: "success" });
        } catch (error) {
            setSnackbar({ open: true, message: error.response?.data?.message || "Error booking slot", severity: "error" });
        }
    };

    const handleEventClick = async (clickInfo) => {
        if (window.confirm("Delete this interview slot?")) {
            try {
                await axios.delete(`http://localhost:4000/api/timeslots/${clickInfo.event.id}`, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                setEvents(events.filter(event => event.id !== clickInfo.event.id));
                setSnackbar({ open: true, message: "Slot deleted successfully!", severity: "success" });
            } catch (error) {
                setSnackbar({ open: true, message: "Error deleting slot", severity: "error" });
            }
        }
    };

    return (
        <>
            <Navbar />
            <Box sx={{ mt: 3 }}>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="timeGridWeek"
                    selectable={true}
                    select={handleDateClick}
                    events={events}
                    eventClick={handleEventClick}
                />
                <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                    <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
                </Snackbar>
            </Box>
        </>
    );
};

export default Calendar;