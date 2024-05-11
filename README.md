Facility Booking App:

1-Overview:
The Facility Booking App allows residents of an apartment complex to book various facilities for their personal use. 
Each facility has a specific booking amount assigned to it, which may be either slot-based or hourly-based.

2-Features:
2.1-Users can select from multiple facilities available in the apartment complex.
2.2-Users can specify the date and time range for their booking.
2.3-The app calculates the booking cost based on the selected facility and time range.
2.4-Slot-based facilities have different rates for different time slots.
2.5-Hourly-based facilities have a fixed rate per hour.
2.6-Users are notified of successful bookings and any booking failures, such as overlapping bookings or attempting to book in the past.
2.7-The configuration of facilities and their booking rates are defined in an array. Each facility object contains the following properties:
            2.7.1-Name: The name of the facility.
            2.7.2-Slot Based: Indicates whether the facility's booking is slot-based or hourly-based.
            2.7.3-Slots (if slot-based): An array of time slots with corresponding rates.
            2.7.4-Rate (if hourly-based): The fixed rate per hour.


3-Usage
3.1-Select the facility from the dropdown menu.
3.2-Choose the desired date for booking.
3.3-Specify the start and end time for the booking.
3.4-Click on the "Book Facility" button to confirm the booking.
3.5-Successful bookings will be displayed with the booking details and cost.
3.6-If a booking fails (e.g.overlapping bookings or booking in the past), an error message will be displayed.


4-Setup Instructions
4.1-Clone the repository to your local machine.
4.2-Install dependencies using npm install or yarn install.
4.3-Run the app using npm start or yarn start.
4.4-Access the app through the provided URL.


5-Technologies Used
5.1-JavaScript
5.2-React
5.3-React Toastify
5.4-Tailwind CSS