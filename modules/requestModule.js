const timeZones = fetch(
	"http://api.timezonedb.com/v2.1/get-time-zone?key=83ZJ170FGGYI&format=json&by=zone&zone=America/Chicago"
)
	.then((response) => response.json())
	.then((data) => {
		// console.log(data);
		return data;
	});

export { timeZones };

//* THIS FETCH RETURNS A PROMISE OBJECT, THAT WE STORE IN THE TIMEZONES CONST, WE THEN EXPORT THE TIMEZONES CONST TO THE MAIN SCRIPT
