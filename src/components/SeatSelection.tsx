import React, { useState } from 'react';
import { Hall, TimeSlot, Attendee } from '../types';

interface SeatSelectionProps {
  hall: Hall;
  date: string;
  timeSlot: TimeSlot;
  bookedSeats: string[];
  onSubmit: (seats: string[], attendees: Attendee[]) => void;
  onClose: () => void;
}

export function SeatSelection({
  hall,
  date,
  timeSlot,
  bookedSeats,
  onSubmit,
  onClose,
}: SeatSelectionProps) {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [attendees, setAttendees] = useState<Attendee[]>([]);

  const handleSeatClick = (seatId: string) => {
    if (bookedSeats.includes(seatId)) return;

    setSelectedSeats((prev) => {
      if (prev.includes(seatId)) {
        const newSeats = prev.filter((s) => s !== seatId);
        setAttendees((prev) => prev.slice(0, newSeats.length));
        return newSeats;
      } else {
        return [...prev, seatId];
      }
    });
  };

  const handleAttendeeChange = (
    index: number,
    field: keyof Attendee,
    value: string | number
  ) => {
    setAttendees((prev) => {
      const newAttendees = [...prev];
      newAttendees[index] = { ...newAttendees[index], [field]: value };
      return newAttendees;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (attendees.length === selectedSeats.length) {
      onSubmit(selectedSeats, attendees);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Select Seats - {hall.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="mb-8">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-full max-w-3xl">
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                  <div className="flex justify-center mb-4">
                    <div className="bg-gray-300 text-center p-2 rounded-t-lg w-48">
                      Screen
                    </div>
                  </div>
                  {hall.rows.map((row) => (
                    <div key={row} className="flex items-center mb-4 last:mb-0">
                      <div className="w-8 font-bold text-center">{row}</div>
                      <div className="flex-1 grid grid-cols-[repeat(auto-fit,minmax(40px,1fr))] gap-2 sm:gap-3 md:gap-4">
  {Array.from({ length: hall.seatsPerRow }).map((_, index) => {
    const seatId = `${row}${index + 1}`;
    const isBooked = bookedSeats.includes(seatId);
    const isSelected = selectedSeats.includes(seatId);

    return (
      <div key={seatId} className="flex flex-col items-center">
        {/* Backrest */}
        <div className={`w-6 sm:w-8 h-2 sm:h-3 rounded-t bg-gray-400 ${isBooked ? 'bg-gray-500' : isSelected ? 'bg-yellow-700' : 'bg-gray-300'}`} />

        {/* Seat */}
        <button
          onClick={() => handleSeatClick(seatId)}
          className={`
            w-10 h-12 sm:w-12 sm:h-14 rounded-b-lg flex items-center justify-center text-sm font-medium transition-colors
            shadow-md
            ${
              isBooked
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : isSelected
                ? 'bg-yellow-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }
          `}
          disabled={isBooked}
        >
          {index + 1}
        </button>
      </div>
    );
  })}
</div>

                      <div className="w-8"></div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-white border border-gray-300"></div>
                    <span>Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-600"></div>
                    <span>Selected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-300"></div>
                    <span>Booked</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {selectedSeats.length > 0 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-xl font-bold">Enter Attendee Details</h3>
              {selectedSeats.map((seat, index) => (
                <div key={seat} className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-4">Attendee for Seat {seat}</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter full name"
                        required
                        className="mt-1 px-4 py-2 block w-full rounded-md border-gray-300 shadow-sm placeholder:text-gray-400
                        focus:border-yellow-600 focus:ring-yellow-600 transition-colors duration-200"
                        onChange={(e) =>
                          handleAttendeeChange(index, 'name', e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Age
                      </label>
                      <input
                        type="number"
                        placeholder="Enter age"
                        required
                        className="mt-1 px-4 py-2 block w-full rounded-md border-gray-300 shadow-sm placeholder:text-gray-400
                        focus:border-yellow-600 focus:ring-yellow-600 transition-colors duration-200"
                        onChange={(e) =>
                          handleAttendeeChange(
                            index,
                            'age',
                            parseInt(e.target.value)
                          )
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        required
                        className="mt-1 px-4 py-2 block w-full rounded-md border-gray-300 shadow-sm
                        focus:border-yellow-600 focus:ring-yellow-600 transition-colors duration-200"
                        onChange={(e) =>
                          handleAttendeeChange(index, 'dob', e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Nationality
                      </label>
                      <input
                        type="text"
                        placeholder="Enter nationality"
                        required
                        className="mt-1 px-4 py-2 block w-full rounded-md border-gray-300 shadow-sm placeholder:text-gray-400
                        focus:border-yellow-600 focus:ring-yellow-600 transition-colors duration-200"
                        onChange={(e) =>
                          handleAttendeeChange(
                            index,
                            'nationality',
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Contact Number
                      </label>
                      <input
                        type="tel"
                        placeholder="Enter contact number"
                        required
                        className="mt-1 px-4 py-2 block w-full rounded-md border-gray-300 shadow-sm placeholder:text-gray-400
                        focus:border-yellow-600 focus:ring-yellow-600 transition-colors duration-200"
                        onChange={(e) =>
                          handleAttendeeChange(
                            index,
                            'contactNumber',
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="Enter email address"
                        required
                        className="mt-1 px-4 py-2 block w-full rounded-md border-gray-300 shadow-sm placeholder:text-gray-400
                        focus:border-yellow-600 focus:ring-yellow-600 transition-colors duration-200"
                        onChange={(e) =>
                          handleAttendeeChange(index, 'email', e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="submit"
                className="w-full bg-yellow-700 text-white py-2 px-4 rounded-md
                    hover:ring-2 hover:ring-yellow-600
                    focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2
                    transition-all duration-200"
              >
                Complete Booking
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
