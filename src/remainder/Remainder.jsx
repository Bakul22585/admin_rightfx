import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list';

const Remainder = () => {
    const handleDateSelect = (selectInfo) => {
        let title = prompt('Please enter a new title for your event')
        let calendarApi = selectInfo.view.calendar

        calendarApi.unselect() // clear date selection

        if (title) {
            calendarApi.addEvent({
                id: '',
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay
            })
        }
    }

    const handleEventClick = (clickInfo) => {
        // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        //     clickInfo.event.remove()
        // }
    }

    const handleEvents = (events) => {
        // this.setState({
        //   currentEvents: events
        // })
    }

    const addNewEvent = () => {
        console.log('new event addede');
    }

    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
                }}
                events={[
                    { title: "event 1", date: "2022-04-03" },
                    { title: "event 2", date: "2022-04-12" },
                    { title: "My Event", date: "2022-03-29", url: "http://google.com/" },
                ]}
                eventColor="red"
                eventClick={(e) => {
                    console.log(e.event.title, e.event.start);
                    // let str = formatDate(e.event.start, {
                    //     month: "numeric",
                    //     year: "numeric",
                    //     day: "numeric",
                    // });
                    console.log("event date", e);
                    // navigate(`/dashboard/${str}`)
                }}
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                select={(e) => handleDateSelect(e)}
                // eventContent={renderEventContent} // custom render function
                // eventClick={() => handleEventClick}
                eventsSet={(e) => handleEvents(e)}
                eventAdd={(e) => addNewEvent(e)}
            />
        </div>
    )
}

export default Remainder