//*request imports
// import { timeZones } from "./requestModule.js";
import { allTimeZones } from "./requestTimeZones.js";

//*dom variables imports
import { zoneName } from "./domVariablesModule.js";
import { zonesDataList } from "./domVariablesModule.js";
import { selectZoneButton } from "./domVariablesModule.js";
import { selectedTimeZone } from "./domVariablesModule.js";
import { alertInfoParagraph } from "./domVariablesModule.js";
import { changeColorButton } from "./domVariablesModule.js";
import { changeTimeFormatButton } from "./domVariablesModule.js";
import { timeParagraph } from "./domVariablesModule.js";

//! WE STORE THE USER TIME ZONE HERE

let userTimeZone;
let date = new Date();
let userDate;

//*request results
//&
//WE MAKE USE OF ANOTHER IMPORT, WHICH IMPORTS ALL THE TIMEZONES, WE WILL RENDER THE OPTIONS IN AN INPUT FIELD
allTimeZones.then((result) => {
	result.zones.map((zone) => {
		// console.log(zone.zoneName.toString());
		const option = document.createElement("option");
		option.setAttribute("value", `${zone.zoneName.toString()}`);
		zonesDataList.appendChild(option);
	});
});

//THE IMPORT RETURNS A PROMISE OBJECT, WE CALL THE THEN METHOD ON THE PROMISE, IN ORDER TO GET OUR RESULT

//*digital watch

window.onload = () => {
	//CONDITIONS FOR DISPLAYING AM OR MILITARY TIME, AS ARROW FUNCTIONS TO BE PASSED AND CALLED INSIDE THE IF STATEMENTS FROM THE SET INTERVAL FUNCTION WHICH DISPLAYS AND CHANGES TIME FORMAT

	//? function params are bool, hours; functions to be called with isMilitary, and date.getHours();
	const subtractTwelve = (bool, hours) =>
		!bool && hours > 12 && !bool && hours <= 24;
	const notSubtractTwelve = (bool, hours) => !bool && hours <= 12;

	// VARIABLE DECLARATIONS
	const colors = ["red", "orange", "green", "blue", "indigo", "violet", "white"];
	let isMilitary = true;
	let increment = 0;

	//CHANGE TIME BUTTON METHODS
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

	//CHANGE COLOR BUTTON METHOD
	changeColorButton.addEventListener("click", () => {
		timeParagraph.style = `color:${colors[increment]}`;
		increment++;
		if (increment == colors.length) {
			increment = 0;
		}
		changeColorButton.style = `color:${colors[increment]}`;
	});

	//DISPLAYING TIME METHODS (SETINTERVAL)
	setInterval(() => {
		date.setSeconds(date.getSeconds() + 1);
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

//*get user-selected timezone

function printZone(input) {
	return input.value;
}

selectZoneButton.addEventListener("click", () => {
	userTimeZone = printZone(selectedTimeZone);
	zoneName.innerText = userTimeZone;
	console.log(userTimeZone);
	const timeZones = fetch(
		`http://api.timezonedb.com/v2.1/get-time-zone?key=83ZJ170FGGYI&format=json&by=zone&zone=${userTimeZone}
		`
	)
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			return data;
		});

	timeZones.then((result) => {
		console.log(result);
		userDate = result.formatted;
		date = new Date(userDate);
		console.log(new Date(result.formatted));
	});
	printZone(selectedTimeZone);
});

// TODO - recreate the same app in react, using axios
