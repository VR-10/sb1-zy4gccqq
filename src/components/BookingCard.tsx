import React from 'react';
import { QrCode } from 'lucide-react';
import { Booking, Hall, TimeSlot } from '../types';
import QRCode from 'qrcode.react';

interface BookingCardProps {
  booking: Booking;
  hall: Hall;
  timeSlot: TimeSlot;
}

export function BookingCard({ booking, hall, timeSlot }: BookingCardProps) {
  const bookingUrl = `${window.location.origin}?booking=${booking.id}`;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-blue-600 px-6 py-4">
        <h3 className="text-xl font-bold text-white">{hall.name}</h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-600">Date</p>
            <p className="font-medium">{new Date(booking.date).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Time</p>
            <p className="font-medium">{timeSlot.label}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Hall Code</p>
            <p className="font-medium">{hall.hallCode}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Seats</p>
            <p className="font-medium">{booking.seats.join(', ')}</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-medium mb-2">Attendees</h4>
          {booking.attendees.map((attendee, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <p className="font-medium">{attendee.name}</p>
              <p className="text-sm text-gray-600">{attendee.email}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <QRCode value={bookingUrl} size={120} />
        </div>
      </div>
    </div>
  );
}