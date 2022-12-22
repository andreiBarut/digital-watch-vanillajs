const allTimeZones = fetch(
	"http://api.timezonedb.com/v2.1/list-time-zone?key=83ZJ170FGGYI&format=json"
)
	.then((response) => response.json())
	.then((data) => {
		return data;
	});

export { allTimeZones };
