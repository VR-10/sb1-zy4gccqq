import React, { useState, useEffect } from 'react';
import { LoginPage } from './components/LoginPage';
import { SeatSelection } from './components/SeatSelection';
import { BookingCard } from './components/BookingCard';
import { HallCard } from './components/HallCard';
import { Toast } from './components/Toast';
import { BookingDetails } from './components/BookingDetails';
import { HALLS, TIME_SLOTS } from './data';
import { Booking, User, TimeSlot } from './types';

type View = 'halls' | 'bookings' | 'booking-details';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<View>('halls');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [showSeatSelection, setShowSeatSelection] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error' | null>(null);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const bookingId = params.get('booking');
    if (bookingId) {
      setSelectedBookingId(bookingId);
      setView('booking-details');
    }
  }, []);

  const getBookedSeatsForTimeSlot = (date: string, timeSlotId: string): string[] => {
    return bookings
      .filter(booking => booking.date === date && booking.timeSlotId === timeSlotId)
      .flatMap(booking => booking.seats);
  };

  const handleCancelBooking = (bookingId: string, seatsToCancel: string[]) => {
    setBookings(prevBookings => {
      const booking = prevBookings.find(b => b.id === bookingId);
      if (!booking) return prevBookings;

      if (seatsToCancel.length === booking.seats.length) {
        return prevBookings.filter(b => b.id !== bookingId);
      }

      return prevBookings.map(b => {
        if (b.id !== bookingId) return b;

        const remainingSeats = b.seats.filter(seat => !seatsToCancel.includes(seat));
        const remainingAttendees = b.attendees.filter((_, index) =>
          !seatsToCancel.includes(b.seats[index])
        );

        return {
          ...b,
          seats: remainingSeats,
          attendees: remainingAttendees,
        };
      });
    });

    setToastMessage('Booking canceled successfully!');
    setToastType('error');
    setTimeout(() => {
      setToastMessage(null);
      setToastType(null);
    }, 3000);
  };

  const handleLogin = (email: string, password: string) => {
    setUser({
      id: '1',
      email,
      name: 'Test User',
    });
  }

  const handleBookingComplete = (seats: string[], attendees: any[]) => {
    const newBooking: Booking = {
      id: Math.random().toString(36).substr(2, 9),
      hallId: HALLS[0].id,
      date: selectedDate,
      timeSlotId: selectedTimeSlot!.id,
      seats,
      attendees,
      userId: user!.id,
      createdAt: new Date().toISOString(),
    };
    setBookings([...bookings, newBooking]);
    setShowSeatSelection(false);

    setToastMessage('Booking completed successfully!');
    setToastType('success');
    setView('bookings');

    setTimeout(() => {
      setToastMessage(null);
      setToastType(null);
    }, 3000);
  };

  if (!user && view !== 'booking-details') {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (view === 'booking-details' && selectedBookingId) {
    const booking = bookings.find(b => b.id === selectedBookingId);
    if (booking) {
      return (
        <BookingDetails
          booking={booking}
          hall={HALLS.find(h => h.id === booking.hallId)!}
          timeSlot={TIME_SLOTS.find(t => t.id === booking.timeSlotId)!}
        />
      );
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              TAWJEEH Training Center Booking System
            </h1>
            <div className="flex space-x-2 lg:space-x-4 mx-2">
  <button
    onClick={() => setView('halls')}
    className={`px-6 py-3 rounded-md text-base font-medium transition-all duration-200 ${
      view === 'halls'
        ? 'bg-yellow-700 text-white hover:ring-2 hover:ring-yellow-900 focus:outline-none focus:ring-2 focus:ring-yellow-900 focus:ring-offset-2'
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    }`}
  >
    Book a Slot
  </button>
  <button
    onClick={() => setView('bookings')}
    className={`px-6 py-3 rounded-md text-base font-medium transition-all duration-200 ${
      view === 'bookings'
        ? 'bg-yellow-700 text-white hover:ring-2 hover:ring-yellow-900 focus:outline-none focus:ring-2 focus:ring-yellow-900 focus:ring-offset-2'
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    }`}
  >
    My Bookings
  </button>
</div>

          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {view === 'halls' ? (
          <div className="max-w-2xl mx-auto">
            <HallCard
              hall={HALLS[0]}
              date={selectedDate}
              occupiedSeats={
                getBookedSeatsForTimeSlot(
                  selectedDate,
                  selectedTimeSlot?.id || ''
                ).length
              }
              timeSlots={TIME_SLOTS}
              selectedTimeSlot={selectedTimeSlot}
              onDateChange={setSelectedDate}
              onTimeSlotSelect={setSelectedTimeSlot}
              onBookClick={() => setShowSeatSelection(true)}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              hall={HALLS.find((h) => h.id === booking.hallId)!}
              timeSlot={TIME_SLOTS.find((t) => t.id === booking.timeSlotId)!}
              onCancelBooking={handleCancelBooking}
            />
          ))}
        </div>
        )}
      </main>

      {showSeatSelection && selectedTimeSlot && (
        <SeatSelection
          hall={HALLS[0]}
          date={selectedDate}
          timeSlot={selectedTimeSlot}
          bookedSeats={getBookedSeatsForTimeSlot(
            selectedDate,
            selectedTimeSlot.id
          )}
          onSubmit={handleBookingComplete}
          onClose={() => setShowSeatSelection(false)}
        />
      )}
      {toastMessage && <Toast message={toastMessage} type={toastType!} onClose={() => setToastMessage(null)} />}
    </div>
  );
}

export default App;
