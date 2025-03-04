export const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';
 
export const geoApiOptions = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '3e93217d19mshf97bf55f678e2a9p195982jsnd3f6c95f16e3',
		'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
	}
};


// fetch(`${GEO_API_URL}/cities?minPopulation=10000000&namePrefix=${Belgrade}`, geoApiOptions)
//     .then((response) => response.json())
//     .then((response) => console.log(response))
//     .catch(err => console.log(err))

