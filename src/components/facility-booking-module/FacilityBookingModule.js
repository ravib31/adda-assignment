import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { calculateCost, facilitiesConfig } from "../utils/utils";

const FacilityBookingModule = () => {
  const [bookings, setBookings] = useState([]);
  const [facility, setFacility] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const isFormValid = facility && date && startTime && endTime;

  const handleInputChange = (e, setState) => {
    setState(e.target.value);
  };

  const validateBooking = () => {
    if (!isFormValid) {
      toast.error("Please fill out all fields");
      return false;
    }
    const currentDate = new Date();
    const selectedDate = new Date(date);
    if (selectedDate < currentDate) {
      toast.error("You cannot create a booking in the past date");
      return false;
    }
    const bookingStartTime = new Date(`${date}T${startTime}`);
    const bookingEndTime = new Date(`${date}T${endTime}`);
    const selectedFacility = facilitiesConfig.find((f) => f.name === facility);
    if (!selectedFacility) {
      toast.error("Facility not found");
      return false;
    }
    if (
      selectedFacility.slotBased &&
      !selectedFacility.slots.some(
        (slot) =>
          bookingStartTime.getHours() >= slot.start &&
          bookingEndTime.getHours() <= slot.end
      )
    ) {
      toast.error("Booking not allowed outside of facility hours");
      return false;
    }
    if (
      (bookingEndTime.getTime() - bookingStartTime.getTime()) /
        (1000 * 60 * 60) <
      1
    ) {
      toast.error("Minimum booking duration is 1 hour");
      return false;
    }
    const existingBooking = bookings.find(
      (booking) =>
        booking.facility === facility &&
        booking.date === date &&
        ((startTime >= booking.startTime && startTime < booking.endTime) ||
          (endTime > booking.startTime && endTime <= booking.endTime))
    );

    if (existingBooking) {
      toast.error(
        `${facility}, ${date}, ${startTime} - ${endTime}  Already Booked!Please Choose The Another Slot`
      );
      return false;
    }
    return true;
  };

  const handleBooking = () => {
    if (!validateBooking()) {
      return;
    }
    const cost = calculateCost(facility, startTime, endTime);
    toast.success(
      `Your Booking Is Created Successfully ${facility}, ${date}, ${startTime} - ${endTime} Booked, Rs. ${cost}`
    );
    const newBooking = { facility, date, startTime, endTime, cost };
    setBookings([...bookings, newBooking]);
    setFacility("");
    setDate("");
    setStartTime("");
    setEndTime("");
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg p-8 rounded-lg">
      <h1 className="block text-gray-700 text-3xl font-bold mb-2">
        Adda Booking App
      </h1>
      <ToastContainer position="top-center" />
      <div className="mb-4">
        <label
          htmlFor="facility"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Facility:
        </label>
        <select
          id="facility"
          value={facility}
          onChange={(e) => handleInputChange(e, setFacility)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        >
          <option value="">Select Facility</option>
          {facilitiesConfig.map((f, index) => (
            <option key={index} value={f.name}>
              {f.name}{" "}
              {f.slotBased
                ? "(10am to 4pm: Rs. 100/hour, 4pm to 10pm: Rs. 500/hour)"
                : "(Rs. 50/hour)"}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="date"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Date:
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => handleInputChange(e, setDate)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="startTime"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Start Time:
        </label>
        <input
          type="time"
          id="startTime"
          value={startTime}
          onChange={(e) => handleInputChange(e, setStartTime)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="endTime"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          End Time:
        </label>
        <input
          type="time"
          id="endTime"
          value={endTime}
          onChange={(e) => handleInputChange(e, setEndTime)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      <button
        onClick={handleBooking}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Book Facility
      </button>

      <h2 className="text-xl font-bold mt-8">Bookings:</h2>
      <ul className="list-disc pl-5 mt-2">
        {bookings.map((booking, index) => (
          <li key={index}>
            {booking.facility}, {booking.date}, {booking.startTime} -{" "}
            {booking.endTime}, Rs. {booking.cost}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FacilityBookingModule;
