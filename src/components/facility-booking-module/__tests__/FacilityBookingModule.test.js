import { render, fireEvent, screen } from "@testing-library/react";
import FacilityBookingModule from "../FacilityBookingModule";

// User selects a facility, date, start time, and end time, and clicks on the 'Book Facility' button, a new booking is created and added to the list of bookings.
it('should create a new booking when all fields are filled and "Book Facility" button is clicked', async () => {
  // Arrange
  render(<FacilityBookingModule />);
  const facilitySelect = screen.getByLabelText("Facility:");
  const dateInput = screen.getByLabelText("Date:");
  const startTimeInput = screen.getByLabelText("Start Time:");
  const endTimeInput = screen.getByLabelText("End Time:");
  const bookButton = screen.getByText("Book Facility");

  // Act
  fireEvent.change(facilitySelect, { target: { value: "Facility A" } });
  fireEvent.change(dateInput, { target: { value: "2022-01-01" } });
  fireEvent.change(startTimeInput, { target: { value: "10:00" } });
  fireEvent.change(endTimeInput, { target: { value: "12:00" } });
  fireEvent.click(bookButton);
});

// User does not select any field and clicks on the 'Book Facility' button, an error message is displayed.
it('should display an error message when no fields are filled and "Book Facility" button is clicked', () => {
  // Arrange
  const { getByText } = render(<FacilityBookingModule />);
  const bookButton = getByText("Book Facility");

  // Act
  fireEvent.click(bookButton);

  // Assert
  expect(getByText("Please fill out all fields")).toBeInTheDocument();
});
