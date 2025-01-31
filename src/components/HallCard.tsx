import React from 'react';
import { Calendar, Clock, Users, Info } from 'lucide-react';
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
  const occupancyPercentage = (occupiedSeats / hall.capacity) * 100;

  const getCapacityColor = (percentage: number) => {
    if (percentage > 66) return 'bg-red-500';
    if (percentage > 33) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getOccupancyInfo = (occupiedCount: number) => {
    if (occupiedCount > 20) {
      return {
        background: 'bg-red-100',
        border: 'border-red-200',
        textColor: 'text-red-700',
        message: 'Going to get housefull',
        icon: <Info className="w-4 h-4 text-red-500" />
      };
    }
    if (occupiedCount > 10) {
      return {
        background: 'bg-yellow-100',
        border: 'border-yellow-200',
        textColor: 'text-yellow-700',
        message: 'Filling faster',
        icon: <Info className="w-4 h-4 text-yellow-500" />
      };
    }
    return {
      background: 'bg-green-100',
      border: 'border-green-200',
      textColor: 'text-green-700',
      message: 'Book sooner to get a place',
      icon: <Info className="w-4 h-4 text-green-500" />
    };
  };

  return (
    <div className="bg-white rounded-xl shadow-xl border border-gray-200 max-h-[800px] flex flex-col">
      {/* Top Section with Header and Progress */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-wrap gap-4 items-start justify-between">
          {/* Hall Info */}
          <div className="flex-1 min-w-[200px]">
            <h2 className="text-xl font-bold text-gray-800">{hall.name}</h2>
            <p className="text-gray-500 text-sm">Hall Code: {hall.hallCode}</p>
            
            {/* Compact Progress Bar */}
            <div className="mt-3">
              <div className="flex justify-between items-center text-sm mb-1">
                <span className="text-gray-600">Current Occupancy</span>
                <span className="font-medium">{occupiedSeats}/{hall.capacity}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getCapacityColor(occupancyPercentage)} transition-all duration-500`}
                  style={{ width: `${occupancyPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Date Selection */}
          <div className="flex-shrink-0 w-auto">
            <label className="flex items-center gap-2 text-gray-700 text-sm mb-1">
              <Calendar className="w-4 h-4 text-yellow-600" />
              Select Date
            </label>
            <input
              type="date"
              value={date}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => onDateChange(e.target.value)}
              className="p-1.5 border border-gray-200 rounded-lg focus:border-yellow-500 
                       focus:ring-1 focus:ring-yellow-200 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Time Slots Section with Fixed Height */}
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="text-gray-800 font-medium flex items-center gap-2 mb-3 sticky top-0 bg-white py-2">
          <Clock className="w-5 h-5 text-yellow-600" />
          Available Time Slots
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {timeSlots.map((slot) => {
            const occupancy = Math.min(occupiedSeats, 30);
            const { background, border, textColor, message, icon } = getOccupancyInfo(occupancy);
            
            return (
              <button
                key={slot.id}
                onClick={() => onTimeSlotSelect(slot)}
                className={`${background} ${border} rounded-lg p-3 text-left transition-all
                  hover:shadow-md focus:outline-none focus:ring-2 
                  focus:ring-yellow-500 focus:ring-offset-1 relative
                  ${selectedTimeSlot?.id === slot.id ? 'ring-2 ring-yellow-500 ring-offset-1' : ''}
                `}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-900">{slot.label}</h4>
                    <p className="text-sm text-gray-600">{slot.startTime} - {slot.endTime}</p>
                    <div className={`flex items-center gap-1 mt-1 ${textColor} text-xs`}>
                      {icon}
                      <span className="font-medium">{message}</span>
                    </div>
                  </div>
                  {selectedTimeSlot?.id === slot.id && (
                    <div className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                      Selected
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sticky Bottom Button */}
      <div className="p-4 border-t border-gray-200 bg-white sticky bottom-0">
        <button
          onClick={onBookClick}
          disabled={!selectedTimeSlot}
          className={`w-full py-3 rounded-lg font-semibold transition-all text-sm
            ${selectedTimeSlot 
              ? 'bg-yellow-500 text-white hover:bg-yellow-600 shadow-md hover:shadow-lg' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
          `}
        >
          {selectedTimeSlot ? 'Book Selected Time Slot' : 'Select a Time Slot to Book'}
        </button>
      </div>
    </div>
  );
}