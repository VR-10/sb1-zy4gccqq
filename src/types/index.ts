export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Attendee {
  name: string;
  age: number;
  dob: string;
  nationality: string;
  contactNumber: string;
  email: string;
}

export interface Hall {
  id: string;
  name: string;
  capacity: number;
  hallCode: string;
  rows: string[];
  seatsPerRow: number;
}

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  label: string;
}

export interface Booking {
  id: string;
  hallId: string;
  date: string;
  timeSlotId: string;
  seats: string[];
  attendees: Attendee[];
  userId: string;
  createdAt: string;
}