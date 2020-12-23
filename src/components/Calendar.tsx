import React, { useState } from "react";
import {
  Calendar as OrgCalendar,
  dateFnsLocalizer,
  Event,
} from "react-big-calendar";
import format from "date-fns/format";
import set from "date-fns/set";
import add from "date-fns/add";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import svSE from "date-fns/locale/sv";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import EventWrapper from "react-big-calendar/lib/addons/dragAndDrop/EventWrapper";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  "sv-SE": svSE,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
const DnDCalendar = withDragAndDrop(OrgCalendar as any);

function getRelativeDayInWeek(d: Date, dy: number) {
  d = new Date(d);
  var day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : dy); // adjust when day is sunday
  return set(new Date(d.setDate(diff)), { hours: 8, minutes: 0 });
}

interface EventArgs {
  event: any;
  start: Date;
  end: Date;
  allDay?: boolean;
}

interface CalendarEntry extends Event {
  id: string;
}

const monday = getRelativeDayInWeek(new Date(), 1);
const tuesday = getRelativeDayInWeek(new Date(), 2);
const wednesday = getRelativeDayInWeek(new Date(), 3);
const thursday = getRelativeDayInWeek(new Date(), 4);
const friday = getRelativeDayInWeek(new Date(), 5);

export const Calendar = () => {
  const [events, setEvents] = useState<CalendarEntry[]>([
    {
      id: "1",
      start: set(monday, { hours: 14 }),
      end: set(monday, { hours: 16 }),
      title: "Växter och djur",
    },
    {
      id: "2",
      start: set(tuesday, { hours: 8 }),
      end: set(tuesday, { hours: 10 }),
      title: "Geometri",
    },
    {
      id: "3",
      start: set(wednesday, { hours: 11 }),
      end: set(wednesday, { hours: 13 }),
      title: "Mängder & tal",
    },
    {
      id: "4",
      start: set(thursday, { hours: 9 }),
      end: set(thursday, { hours: 12 }),
      title: "Utflykt",
    },
  ]);

  const onEventResize = (args: EventArgs) => {
    console.log(args);
    // const { start, end } = args;
    // setEvents((events) => {
    //   events[0].start = start;
    //   events[0].end = end;
    //   return [...events];
    // });
  };

  const onEventDrop = (args: EventArgs) => {
    const { event, start, end } = args;
    const idx = events.indexOf(events.find((e) => e.id === event.id));
    setEvents((events) => {
      events[idx].start = start;
      events[idx].end = end;
      return [...events];
    });
  };

  return (
    <div>
      <DnDCalendar
        toolbar={false}
        views={{
          work_week: true,
        }}
        step={30}
        min={
          new Date(monday.getFullYear(), monday.getMonth(), monday.getDate(), 8)
        }
        max={
          new Date(
            monday.getFullYear(),
            monday.getMonth(),
            friday.getDate(),
            16
          )
        }
        defaultView="work_week"
        localizer={localizer}
        culture={"sv-SE"}
        events={events}
        style={{ height: "calc(100vh - 20px)", width: "calc(100vw - 40px)" }}
        onEventDrop={onEventDrop as any}
        onEventResize={onEventResize as any}
      />
    </div>
  );
};
