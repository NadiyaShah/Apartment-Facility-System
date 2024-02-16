// Facility configuration


let appt = document.getElementById('appt').value


const facilities = [
    { name: "Clubhouse", rate: 30 },
    { name: "Tennis Court", rate: 50 }
];

// Facility booking system
class FacilityBookingSystem {
    constructor() {
        this.bookings = JSON.parse(localStorage.getItem('bookings')) || {};
        for (const facility of facilities) {
            if (!this.bookings[facility.name]) {
                this.bookings[facility.name] = {};
            }
        }
    }

    bookFacility(facilityName, date, startTime, endTime) {
        const facility = facilities.find(f => f.name === facilityName);
        let inputName = document.getElementById('name').value
        let output = document.getElementById('output')
        if (facility) {
            startTime = startTime.getHours();
            endTime = endTime.getHours();
            if (this.isAlreadyBooked(facilityName, date, startTime, endTime)) {

                return output.innerHTML = `${inputName} Sorry!! Booking Failed this ${facilityName} facility on this date ${date}, ${startTime}:00 - ${endTime}:00 , 
          Someone  Already Booked. Try to book on another date `;


            }
            else {
                const hours = endTime - startTime;
                let inputName = document.getElementById('name').value
                let output = document.getElementById('output')
                console.log(inputName)
                const totalCost = facility.rate * hours;
                if (!this.bookings[facilityName][date]) {
                    this.bookings[facilityName][date] = {};
                }
                for (let hour = startTime; hour < endTime; hour++) {
                    this.bookings[facilityName][date][hour] = totalCost;
                }
                localStorage.setItem('bookings', JSON.stringify(this.bookings));
                // return `${inputName} You successfully booked ${facilityName} facility, on ${date}, ${startTime}:00 - ${endTime}:00 , at Rs. ${totalCost} cost Enjoy!!`;
                return output.innerHTML = `${inputName} has been successfully booked the ${facility.name} from ${startTime}:00 to ${endTime}:00 on ${date} At ${totalCost}`
            }
        }
        else {
            return `Facility ${facilityName} not found.`;
        }
    }


    isAlreadyBooked(facilityName, date, startTime, endTime) {
        if (!this.bookings[facilityName][date]) return false;
        for (let hour = startTime; hour < endTime; hour++) {
            if (this.bookings[facilityName][date][hour] && this.bookings[facilityName][date][hour] > 0) {
                return true;
            }
        }
        return false;
    }
}

const bookingSystem = new FacilityBookingSystem();
const bookingForm = document.getElementById('bookingForm');
const outputDiv = document.getElementById('output');

bookingForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const facility = document.getElementById('facility').value;
    const date = document.getElementById('date').value;
    const startTime = new Date(`1970-01-01T${document.getElementById('startTime').value}`);
    const endTime = new Date(`1970-01-01T${document.getElementById('endTime').value}`);
    const output = bookingSystem.bookFacility(facility, date, startTime, endTime);

    if (document.getElementById("endTime").value <= document.getElementById("startTime").value) {
        alert("End time must not be equal to and less then  Start Time")
    }

    else {
        outputDiv.textContent = output;
    }
}
);


var currentDate = new Date();

// Format the current date as YYYY-MM-DD (required by <input type="date">)
var formattedDate = currentDate.toISOString().split('T')[0];

// Set the value of the date input field to the current date
document.getElementById("date").value = formattedDate;


const now = new Date()

const hours = now.getHours()
// console.log(hours)

document.getElementById("startTime").value = `${hours}:00`;