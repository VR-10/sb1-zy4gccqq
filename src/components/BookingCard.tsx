// BookingCard.tsx
import React, { useState } from 'react';
import { QrCode, Calendar, Users, MapPin, Building2, X } from 'lucide-react';
import { Booking, Hall, TimeSlot } from '../types';
import QRCode from 'qrcode.react';

interface BookingCardProps {
  booking: Booking;
  hall: Hall;
  timeSlot: TimeSlot;
  onCancelBooking: (bookingId: string, seats: string[]) => void;
}

// CancellationModal Component
const CancellationModal = ({ 
  booking, 
  onCancel, 
  onClose 
}: { 
  booking: Booking; 
  onCancel: (seats: string[]) => void; 
  onClose: () => void;
}) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const toggleSeatSelection = (seat: string) => {
    setSelectedSeats(prev => 
      prev.includes(seat) 
        ? prev.filter(s => s !== seat)
        : [...prev, seat]
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Cancel Booking</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <p className="text-gray-600 mb-4">Select the seats you want to cancel:</p>
        
        <div className="grid grid-cols-3 gap-3 mb-6">
          {booking.seats.map(seat => (
            <button
              key={seat}
              onClick={() => toggleSeatSelection(seat)}
              className={`p-3 rounded-lg border ${
                selectedSeats.includes(seat)
                  ? 'bg-red-50 border-red-500 text-red-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              Seat {seat}
            </button>
          ))}
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onCancel(selectedSeats);
              onClose();
            }}
            disabled={selectedSeats.length === 0}
            className={`px-4 py-2 rounded-lg ${
              selectedSeats.length === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-red-600 text-white hover:bg-red-700'
            }`}
          >
            Confirm Cancellation
          </button>
        </div>
      </div>
    </div>
  );
};

// BookingCard Component
export function BookingCard({ booking, hall, timeSlot, onCancelBooking }: BookingCardProps) {
  const [showCancellationModal, setShowCancellationModal] = useState(false);
  const bookingUrl = `${window.location.origin}?booking=${booking.id}`;

  const handleCancelClick = () => {
    if (booking.seats.length === 1) {
      // If only one seat, cancel immediately
      onCancelBooking(booking.id, booking.seats);
    } else {
      // If multiple seats, show selection modal
      setShowCancellationModal(true);
    }
  };

  return (
    <div className="bg-gradient-to-br from-yellow-50 to-white rounded-2xl shadow-lg overflow-hidden border border-yellow-100 p-4 sm:p-6 relative">
      {/* Cancel Button */}
      <button
        onClick={handleCancelClick}
        className="absolute top-4 right-4 p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-700 rounded-full hover:text-red-600 transition-colors"
        title="Cancel Booking"
      >
        <X className="w-5 h-5" />
      </button>
      
      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between bg-gradient-to-r from-yellow-600 to-yellow-500 p-4 sm:p-6 rounded-t-2xl text-center sm:text-left">
        <img 
          src="https://www.mohre.gov.ae/content/siteimages/logo.png"
          alt="MOHRE Logo" 
          className="h-10 sm:h-12 w-auto"
        />
        <div className="bg-white p-2 rounded-lg shadow-md flex-shrink-0 min-w-[90px] mt-3 sm:mt-0">
          <QRCode value={bookingUrl} size={90} className="w-full h-auto" level="H" includeMargin={true} />
        </div>
      </div>

      {/* Main Content Section */}
      <div className="bg-white p-4 sm:p-6 space-y-4 sm:space-y-6 rounded-b-2xl">
        {/* Hall & Booking Reference */}
        <div className="text-center sm:text-left">
          <h3 className="text-2xl font-bold text-yellow-700 flex items-center justify-center sm:justify-start gap-2">
            <Building2 className="w-5 h-5 text-yellow-700" />
            {hall.name}
          </h3>
          <p className="text-gray-500 text-sm">Reference: #{booking.id}</p>
        </div>

        {/* Booking Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-yellow-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-600">Date & Time</span>
            </div>
            <p className="text-lg font-semibold">{new Date(booking.date).toLocaleDateString()}</p>
            <p className="text-md text-gray-600">{timeSlot.label}</p>
          </div>

          <div className="bg-yellow-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-5 h-5 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-600">Location Details</span>
            </div>
            <p className="text-lg font-semibold">Hall {hall.hallCode}</p>
            <p className="text-md text-gray-600">Seats: {booking.seats.join(', ')}</p>
          </div>
        </div>

        {/* Attendees Section */}
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

      {/* Cancellation Modal */}
      {showCancellationModal && (
        <CancellationModal
          booking={booking}
          onCancel={(seats) => onCancelBooking(booking.id, seats)}
          onClose={() => setShowCancellationModal(false)}
        />
      )}
    </div>
  );
}