import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import ApiCalendar from "react-google-calendar-api";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import Swal from "sweetalert2";
import { Button, Card } from "react-bootstrap";
const App = () => {
  const [events, setEvents] = useState([]);
  const handleClick = (event, name) => {
    if (name === "sign-in") {
      ApiCalendar.handleAuthClick()
        .then(() => {
          googleCalendarEvents();
        })
        .catch((e) => {
          console.error(`sign in failed ${e}`);
        });
    } else if (name === "sign-out") {
      ApiCalendar.handleSignoutClick();
    }
  };

  const auth = () => {
    ApiCalendar.handleAuthClick()
      .then(() => {
        googleCalendarEvents();
      })
      .catch((e) => {
        console.error(`sign in failed ${e}`);
      });
  };

  useEffect(() => {
    ApiCalendar.handleAuthClick()
      .then(() => {
        console.log("sign in succesful!");
      })
      .catch((e) => {
        console.error(`sign in failed ${e}`);
      });
  }, []);

  const googleCalendarEvents = () => {
    ApiCalendar.listEvents({
      timeMin: new Date("2022-03-01").toISOString(),
      timeMax: new Date().toISOString(),
    }).then((result) => {
      console.log(result.result);
      let events = [];
      result.result.items.map((event) => {
        console.log(event.start.dateTime);
        let start = event.start.dateTime.split("T")[0];
        let end = event.end.dateTime.split("T")[0];
        // let start = event.start.dateTime;
        // let end = event.end.dateTime;
        events.push({
          start: start,
          end: end,
          title: event.summary,
          GoogleEvent: event,
        });
      });
      console.log(events);
      setEvents(events);
    });
  };
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        //dateClick selecciona un día del calendario
        dateClick={handleDateClick}
      />
      <button onClick={(e) => handleClick(e, "sign-in")}>sign-in</button>
      <button onClick={(e) => handleClick(e, "sign-out")}>sign-out</button>
      <button onClick={(e) => googleCalendarEvents(e)}>
        Google Calendar Events
      </button>
    </>
  );
};
const handleDateClick = () => {
  Swal.fire("Dia seleccionado");
  //Crear eventos de Ahora
     const eventFromNow = {
       summary: 'Poc Dev From Now',
       description:"Hola",
       attendees: [{ email: "20203tn128@utez.edu.mx" }, {email: "20203tn145@utez.edu.mx"}],
      time:480
     };
   ApiCalendar.createEventFromNow(eventFromNow)
     .then((result) => {
     console.log(result);
     })
     .catch((error) => {
     console.log(error);
   });

  //Crear eventos en un día especifico
  //Solo crea el evento en google calendar, en full calendar no

  // const eventDay = {
  //   summary: "new event created",
  //   description: "demo of create event function",
  //   start: {
  //     dateTime: "2022-03-25T12:00:00+05:30",
  //   },
  //   end: {
  //     dateTime: "2022-03-25T12:00:00+05:30",
  //   },
  //   attendees: [{ email: "20203tn128@utez.edu.mx" }],
  // };

  // ApiCalendar.createEvent(eventDay)
  //   .then((result) => {
  //     console.log(result);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
};
export default App;
