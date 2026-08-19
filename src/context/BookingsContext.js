import React, { createContext, useContext, useState } from 'react';

const BookingsContext = createContext({});

export function BookingsProvider({ children }) {
  const [bookings, setBookings] = useState([
    {
      id: 'b1',
      listingId: '1',
      listingTitle: 'Modern Sofa',
      customerId: 'mock-user-001',
      customerName: 'Demo User',
      ownerId: 'user-1',
      ownerName: 'Alice',
      startDate: '2026-08-20',
      endDate: '2026-08-22',
      totalPrice: 50,
      status: 'confirmed',
      createdAt: '2026-08-18',
    },
    {
      id: 'b2',
      listingId: '2',
      listingTitle: 'MacBook Pro 14"',
      customerId: 'other-user',
      customerName: 'Jane',
      ownerId: 'mock-user-001',
      ownerName: 'Demo User',
      startDate: '2026-08-25',
      endDate: '2026-08-27',
      totalPrice: 100,
      status: 'pending',
      createdAt: '2026-08-19',
    },
  ]);

  const createBooking = (booking) => {
    const newBooking = {
      ...booking,
      id: 'b' + Date.now(),
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setBookings((prev) => [...prev, newBooking]);
    return newBooking;
  };

  const updateStatus = (id, status) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
  };

  const getBookingsForUser = (userId) =>
    bookings.filter((b) => b.customerId === userId || b.ownerId === userId);

  const getBookingsForListing = (listingId) =>
    bookings.filter((b) => b.listingId === listingId);

  const getIncomingRequests = (ownerId) =>
    bookings.filter((b) => b.ownerId === ownerId);

  const getMyRentals = (customerId) =>
    bookings.filter((b) => b.customerId === customerId);

  return (
    <BookingsContext.Provider
      value={{
        bookings, createBooking, updateStatus,
        getBookingsForUser, getBookingsForListing,
        getIncomingRequests, getMyRentals,
      }}
    >
      {children}
    </BookingsContext.Provider>
  );
}

export const useBookings = () => useContext(BookingsContext);
