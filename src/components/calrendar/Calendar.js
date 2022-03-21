import FullCalendar from "@fullcalendar/react";
import React from "react";
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import ApiCalendar from 'react-google-calendar-api';

// let calendario = new FullCalendarCore (calendarEl, {
//     plugins: [googleCalendarPlugin],
//     googleCalendarApiKey: 'AIzaSyBq3VCKdLfhCPEYeKDPGN3wqWDez8O6i0s',
//     events: {
//       googleCalendarId: '20203tn155@utez.edu.mx'
//     }
// })
const Calendar = () => {
  return (
    <>
    <FullCalendar
       plugins={[ dayGridPlugin ]}
       initialView="dayGridMonth"
     />
    </>
  );
};
export default Calendar;