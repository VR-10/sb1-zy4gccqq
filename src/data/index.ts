import { Hall, TimeSlot } from '../types';

export const HALLS: Hall[] = [
  {
    id: '1',
    name: 'Main Training Hall',
    capacity: 50,
    hallCode: 'MTH-001',
    rows: ['A', 'B', 'C', 'D', 'E'],
    seatsPerRow: 10
  },
  {
    id: '2',
    name: 'Executive Training Room',
    capacity: 50,
    hallCode: 'ETR-002',
    rows: ['A', 'B', 'C', 'D', 'E'],
    seatsPerRow: 10
  }
];

export const TIME_SLOTS: TimeSlot[] = [
  { id: '1', startTime: '09:00', endTime: '12:00', label: 'Morning Session (9 AM - 12 PM)' },
  { id: '2', startTime: '12:00', endTime: '15:00', label: 'Afternoon Session 1 (12 PM - 3 PM)' },
  { id: '3', startTime: '15:00', endTime: '18:00', label: 'Afternoon Session 2 (3 PM - 6 PM)' },
  { id: '4', startTime: '18:00', endTime: '21:00', label: 'Evening Session (6 PM - 9 PM)' }
];