import * as ics from 'ics';

export function generateCalendarEvent(details: {
  start: Date;
  duration: number;
  title: string;
  description: string;
  url: string;
  organizer: { name: string, email: string };
  attendee: { name: string, email: string };
}): string {
  const { start, duration, title, description, url, organizer, attendee } = details;
  
  const event: ics.EventAttributes = {
    start: [start.getUTCFullYear(), start.getUTCMonth() + 1, start.getUTCDate(), start.getUTCHours(), start.getUTCMinutes()],
    startInputType: 'utc',
    duration: { minutes: duration },
    title,
    description,
    url,
    status: 'CONFIRMED',
    busyStatus: 'BUSY',
    organizer,
    attendees: [
      { name: attendee.name, email: attendee.email, rsvp: true, partstat: 'ACCEPTED', role: 'REQ-PARTICIPANT' }
    ]
  };

  const { error, value } = ics.createEvent(event);
  
  if (error || !value) {
    console.error("Failed to generate ICS file", error);
    return "";
  }
  
  return value;
}
