import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Weather.scss";

function Weather() {
	const [weather, setWeather] = useState(null);

	useEffect(() => {
		getWeather();
	}, []);

	const getWeather = async () => {
		navigator.permissions.query({ name: "geolocation" }).then(() => {
			navigator.geolocation.getCurrentPosition(
				async (pos) => {
					let crd = pos.coords;
					let getzipcode = await axios.get(
						`http://api.geonames.org/findNearbyPostalCodesJSON?lat=${crd.latitude}&lng=${crd.longitude}&username=rdelrio`
					);
					let myZipCode = getzipcode.data.postalCodes[0].postalCode;
					let myCountryCode = getzipcode.data.postalCodes[0].countryCode;
					let myWeather = await axios.get(
						`https://api.openweathermap.org/data/2.5/weather?zip=${myZipCode},${myCountryCode}&units=metric&lang=es&appid=4d86a2006f4a10d56dbdde6d7ec8f48e`
					);
					console.log(myWeather.data);
					setWeather(myWeather.data);
				},
				(err) => console.warn("ERROR(" + err.code + "): " + err.message),
				{ enableHighAccuracy: true }
			);
		});
	};

	return (
		<div className="weatherC">
			{weather && (
				<>
					<div className="smallWidget">
						<span>{Math.round(weather.main.temp)}°C</span>
						<img
							src={`https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather.weather[0]["icon"]}.svg`}
							alt="icon"
						/>
					</div>
					<div className="bigWidget">
						<b className="cityTemp">{weather.name}</b>
						<div className="temps">
							<span>{Math.round(weather.main.temp_min) + " °C"}</span>
							<span className="mainTemp">
								{Math.round(weather.main.temp) + " °C"}
							</span>
							<span>{Math.round(weather.main.temp_max) + " °C"}</span>
							<b>min</b>
							<b className="mainTemp"></b>
							<b>max</b>
						</div>
						<div className="tempIcon">
							<img
								src={`https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather.weather[0]["icon"]}.svg`}
								alt="icon"
							/>
							<p>{weather.weather[0].description} </p>
						</div>
						<div className="moreWeatherData">
							<span>
								<strong>Feels Like: </strong>
								{Math.round(weather.main.feels_like) + "°C"}
							</span>
							<span>
								<strong>Humidity: </strong> {weather.main.humidity + "%"}
							</span>
							<span>
								<strong>Wind: </strong>
								{Math.round(weather.wind.speed * 3.6) + "km/hr"}
							</span>
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default Weather;
