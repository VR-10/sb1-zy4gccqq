import React from 'react';
import { QrCode, Calendar, Users, MapPin, Building2 } from 'lucide-react';
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
    <div className="bg-gradient-to-br from-yellow-50 to-white rounded-2xl shadow-lg overflow-hidden border border-yellow-100 p-4 sm:p-6 relative">
      
      {/* 🔹 TOP HEADER SECTION (Logo + QR Code) */}
      <div className="flex flex-col sm:flex-row items-center justify-between bg-gradient-to-r from-yellow-600 to-yellow-500 p-4 sm:p-6 rounded-t-2xl text-center sm:text-left">
        {/* Logo */}
        <img 
          src="https://www.mohre.gov.ae/content/siteimages/logo.png"
          alt="MOHRE Logo" 
          className="h-10 sm:h-12 w-auto"
        />

        {/* QR Code */}
        <div className="bg-white p-2 rounded-lg shadow-md flex-shrink-0 min-w-[90px] mt-3 sm:mt-0">
          <QRCode value={bookingUrl} size={90} className="w-full h-auto" level="H" includeMargin={true} />
        </div>
      </div>

      {/* 🔹 MAIN CONTENT SECTION */}
      <div className="bg-white p-4 sm:p-6 space-y-4 sm:space-y-6 rounded-b-2xl">
        
        {/* 📌 Hall & Booking Reference */}
        <div className="text-center sm:text-left">
          <h3 className="text-2xl font-bold text-yellow-700 flex items-center justify-center sm:justify-start gap-2">
            <Building2 className="w-5 h-5 text-yellow-700" />
            {hall.name}
          </h3>
          <p className="text-gray-500 text-sm">Reference: #{booking.id}</p>
        </div>

        {/* 📌 Booking Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Date & Time */}
          <div className="bg-yellow-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-600">Date & Time</span>
            </div>
            <p className="text-lg font-semibold">{new Date(booking.date).toLocaleDateString()}</p>
            <p className="text-md text-gray-600">{timeSlot.label}</p>
          </div>

          {/* Location & Seat Info */}
          <div className="bg-yellow-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-5 h-5 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-600">Location Details</span>
            </div>
            <p className="text-lg font-semibold">Hall {hall.hallCode}</p>
            <p className="text-md text-gray-600">Seats: {booking.seats.join(', ')}</p>
          </div>
        </div>

        {/* 📌 Attendees Section */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-yellow-600" />
            <h4 className="font-semibold text-lg text-gray-800">Attendees</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {booking.attendees.map((attendee, index) => (
              <div 
                key={index} 
                className="flex items-center p-3 bg-gradient-to-r from-yellow-50 to-white rounded-lg border border-yellow-100"
              >
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{attendee.name}</p>
                  <p className="text-sm text-gray-600">{attendee.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
