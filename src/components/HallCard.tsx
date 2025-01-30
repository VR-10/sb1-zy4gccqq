import React from 'react';
import { Calendar } from 'lucide-react';
import { Hall, TimeSlot } from '../types';

interface HallCardProps {
  hall: Hall;
  date: string;
  occupiedSeats: number;
  timeSlots: TimeSlot[];
  selectedTimeSlot: TimeSlot | null;
  onDateChange: (date: string) => void;
  onTimeSlotSelect: (timeSlot: TimeSlot) => void;
  onBookClick: () => void;
}

export function HallCard({
  hall,
  date,
  occupiedSeats,
  timeSlots,
  selectedTimeSlot,
  onDateChange,
  onTimeSlotSelect,
  onBookClick,
}: HallCardProps) {
  const availableSeats = hall.capacity - occupiedSeats;
  const occupancyPercentage = (occupiedSeats / hall.capacity) * 100;

  const getStatusColor = () => {
    if (availableSeats <= 10) return 'bg-red-100';
    if (availableSeats <= 20) return 'bg-yellow-100';
    return 'bg-green-100';
  };

  return (
    <div className={`rounded-lg shadow-lg overflow-hidden ${getStatusColor()}`}>
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{hall.name}</h3>
            <p className="text-gray-600">Hall Code: {hall.hallCode}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="text-gray-400" size={20} />
            <input
              type="date"
              value={date}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => onDateChange(e.target.value)}
              className="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Capacity</span>
            <span className="font-medium">
              {occupiedSeats}/{hall.capacity} seats occupied
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 rounded-full h-2 transition-all"
              style={{ width: `${occupancyPercentage}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {timeSlots.map((slot) => (
            <button
              key={slot.id}
              onClick={() => onTimeSlotSelect(slot)}
              className={`p-3 rounded-lg border text-left transition-colors
                ${
                  selectedTimeSlot?.id === slot.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
            >
              <div className="font-medium">{slot.label}</div>
              <div className="text-sm text-gray-600">
                {slot.startTime} - {slot.endTime}
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={onBookClick}
          disabled={!selectedTimeSlot}
          className="
          w-full bg-yellow-700 text-white py-2 px-4 rounded-md hover:ring-2 hover:ring-yellow-900 focus:outline-none focus:ring-2 focus:ring-yellow-900 focus:ring-offset-2 transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Book Seats
        </button>
      </div>
    </div>
  );
}
