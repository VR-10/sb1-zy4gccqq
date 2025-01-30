import React from 'react';
import { Booking, Hall, TimeSlot } from '../types';

interface BookingDetailsProps {
  booking: Booking;
  hall: Hall;
  timeSlot: TimeSlot;
}

export function BookingDetails({ booking, hall, timeSlot }: BookingDetailsProps) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-2xl w-full">
        <div className="bg-blue-600 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">Booking Details</h1>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Hall Information</h2>
              <div className="space-y-2">
                <p><span className="text-gray-600">Hall Name:</span> {hall.name}</p>
                <p><span className="text-gray-600">Hall Code:</span> {hall.hallCode}</p>
                <p><span className="text-gray-600">Date:</span> {new Date(booking.date).toLocaleDateString()}</p>
                <p><span className="text-gray-600">Time:</span> {timeSlot.label}</p>
                <p><span className="text-gray-600">Seats:</span> {booking.seats.join(', ')}</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Booking Information</h2>
              <div className="space-y-2">
                <p><span className="text-gray-600">Booking ID:</span> {booking.id}</p>
                <p><span className="text-gray-600">Created:</span> {new Date(booking.createdAt).toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Attendees</h2>
            <div className="space-y-4">
              {booking.attendees.map((attendee, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <p><span className="text-gray-600">Name:</span> {attendee.name}</p>
                    <p><span className="text-gray-600">Age:</span> {attendee.age}</p>
                    <p><span className="text-gray-600">Email:</span> {attendee.email}</p>
                    <p><span className="text-gray-600">Contact:</span> {attendee.contactNumber}</p>
                    <p><span className="text-gray-600">Nationality:</span> {attendee.nationality}</p>
                    <p><span className="text-gray-600">DOB:</span> {attendee.dob}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}