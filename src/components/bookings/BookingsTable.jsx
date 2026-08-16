import { parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import DataSlider from "../common/DateSlider";



const BookingsTable = ({ bookingInfo, handleBookingCancellation }) => {
    const [filteredBookings, setFilteredBookings] = useState(bookingInfo);

    const filterBookings = (startDate, endDate) => {
        let filtered = bookingInfo;
        if (startDate && endDate) {
            filtered = bookingInfo.filter((booking) => {
                const bookingStarDate = parseISO(booking.checkInDate);
                const bookingEndDate = parseISO(booking.checkOutDate);
                return bookingStarDate >= startDate && bookingEndDate <= endDate &&
                    bookingEndDate > startDate
            })
        }
        setFilteredBookings(filtered);
    }

    useEffect(() => {
        setFilteredBookings(bookingInfo);
    }, [bookingInfo])



    return (
        <section className="p-4">
            <DataSlider onDateChange={filterBookings} onFilterChange={filterBookings} />
            <table className="table table-bordered table-hover shadow">
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Booking ID</th>
                        <th>Room ID</th>
                        <th>Room Type</th>
                        <th>check-In Date</th>
                        <th>check-Out Date</th>
                        <th>Guest Full Name</th>
                        <th>Guest Email</th>
                        <th>Adults</th>
                        <th>Children</th>
                        <th>Total Guest</th>
                        <th>Confirmation Code</th>
                        <th colSpan={2}>Actions</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {filteredBookings.map((booking, index) => (
                        <tr key={booking.id}>
                            <td>{index + 1}</td>
                            <td>{booking.id}</td>
                            <td>{booking.room.id}</td>
                            <td>{booking.room.roomType}</td>
                            <td>{booking.checkInDate}</td>
                            <td>{booking.checkOutDate}</td>
                            <td>{booking.guestFullName}</td>
                            <td>{booking.guestName}</td>
                            <td>{booking.numOfAdults}</td>
                            <td>{booking.numOfChildren}</td>
                            <td>{booking.totalNumOfGuest}</td>
                            <td>{booking.bookingConfirmationCode}</td>
                            <td>
                                <button className="btn btn-danger btn-sm" onClick={() => {
                                    handleBookingCancellation(booking.id)

                                }}>
                                    Cancel
                                </button>

                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
            {filterBookings.length === 0 && <p>No booking found for the selected dates.</p>}



        </section>
    )

}
export default BookingsTable;