//*request imports
import { timeZones } from "./requestModule.js";
import { allTimeZones } from "./requestTimeZones.js";

//*dom variables imports
import { zonesDataList } from "./domVariablesModule.js";
import { selectZoneButton } from "./domVariablesModule.js";
import { selectedTimeZone } from "./domVariablesModule.js";
import { alertInfoParagraph } from "./domVariablesModule.js";
import { changeColorButton } from "./domVariablesModule.js";
import { changeTimeFormatButton } from "./domVariablesModule.js";
import { timeParagraph } from "./domVariablesModule.js";

//*request results
//^WE MAKE USE OF ANOTHER IMPORT, WHICH IMPORTS ALL THE TIMEZONES, WE WILL RENDER THE OPTIONS IN AN INPUT FIELD
allTimeZones.then((result) => {
	result.zones.map((zone) => {
		console.log(zone.countryName.toString());
		const option = document.createElement("option");
		option.setAttribute("value", `${zone.countryName.toString()}`);
		zonesDataList.appendChild(option);
	});
});

//^THE IMPORT RETURNS A PROMISE OBJECT, WE CALL THE THEN METHOD ON THE PROMISE, IN ORDER TO GET OUR RESULT
timeZones.then((result) => {
	console.log(result);
	//todo the challenge will be : how do I pass the user input as a parameter in the requestModule.js module file
	//todo make the request to the specified timezone, in order to get the time in the form of a date like new Date(result,formatted)
	//todo store that date in a variable, and pass it to the setInterval function, or just take advantage of closures
	//todo, also you will probably need one request module for the timezones, and one for making the request to the user-selected time zone
	console.log(new Date(result.formatted));
});

//*digital watch

window.onload = () => {
	//^CONDITIONS FOR DISPLAYING AM OR MILITARY TIME, AS ARROW FUNCTIONS TO BE PASSED AND CALLED INSIDE THE IF STATEMENTS FROM THE SET INTERVAL FUNCTION WHICH DISPLAYS AND CHANGES TIME FORMAT

	//? function params are bool, hours; functions to be called with isMilitary, and date.getHours();
	const subtractTwelve = (bool, hours) =>
		!bool && hours > 12 && !bool && hours <= 24;
	const notSubtractTwelve = (bool, hours) => !bool && hours <= 12;

	//^ VARIABLE DECLARATIONS
	const colors = ["red", "orange", "green", "blue", "indigo", "violet", "white"];
	let isMilitary = true;
	let increment = 0;

	//^CHANGE TIME BUTTON METHODS
	changeTimeFormatButton.innerText = "AM/PM";
	changeTimeFormatButton.addEventListener("click", () => {
		if (isMilitary) {
			isMilitary = false;
			changeTimeFormatButton.innerText = "24:00";
		} else {
			isMilitary = true;
			changeTimeFormatButton.innerText = "AM/PM";
		}
	});

	//^CHANGE COLOR BUTTON METHOD
	changeColorButton.addEventListener("click", () => {
		timeParagraph.style = `color:${colors[increment]}`;
		increment++;
		if (increment == colors.length) {
			increment = 0;
		}
		changeColorButton.style = `color:${colors[increment]}`;
	});

	//^DISPLAYING TIME METHODS (SETINTERVAL)
	setInterval(() => {
		const date = new Date();
		let time = "";
		if (subtractTwelve(isMilitary, date.getHours())) {
			time = `${
				date.getHours() - 12
			} : ${date.getMinutes()} : ${date.getSeconds()} PM`;
			alertInfoParagraph.innerText = "AM/PM Time Format Selected!";
			timeParagraph.innerText = time;
		} else if (notSubtractTwelve(isMilitary, date.getHours())) {
			time = `${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()} AM`;
			timeParagraph.innerText = time;
		} else {
			time = `${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}`;
			console.log(time); //! THIS LOGS THE TIME, FOR TESTING ONLY
			alertInfoParagraph.innerText = "Military Time Format Selected!";
			timeParagraph.innerText = time;
		}
	}, 1000);
};

// TODO - add timezone api that returns date Object depending on the time zone. Use fetch and get method
// TODO - recreate the same app in react, using axios

//^ the following section gets the value from the input which stores the zone, and then prints it in console on the click of the selectZoneButton
function printZone(input) {
	console.log(input.value);
}

selectZoneButton.addEventListener("click", () => {
	printZone(selectedTimeZone);
});
