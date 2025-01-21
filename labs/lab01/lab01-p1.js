import lodash from "lodash";
const holidays = [
    { name: "Christmas", date: new Date("2025-12-25") },
    { name: "Canada Day", date: new Date("2025-07-01") },
    { name: "April Fools", date: new Date("2025-04-01") },
]
let today = new Date();

holidays.forEach(holiday => {
    let dateDIfference = holiday.date - today;
    console.log(holiday.name + " is " + 
        Math.ceil(dateDIfference / (1000 * 60 * 60 * 24)) + // convert to days 
        " days away.") 
});

let random_holiday = lodash.sample(holidays);
console.log("\nRandom Holiday: ")
console.log ( random_holiday);

console.log("\nThe Index for Christmas is " + lodash.findIndex(holidays, {name: "Christmas"}))
console.log("The Index for Canada Day is " + lodash.findIndex(holidays, {name: "Canada Day"}))