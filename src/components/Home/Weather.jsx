import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Weather.scss";

function Weather() {
	const [weather, setWeather] = useState(null);

	useEffect(() => {
		getWeather();
		let runWeather = setInterval(() => getWeather(), 3600000);
		return function cleanup() {
			clearInterval(runWeather);
		};
	}, []);

	const getWeather = async () => {
		navigator.permissions.query({ name: "geolocation" }).then(() => {
			navigator.geolocation.getCurrentPosition(
				async (pos) => {
					let crd = pos.coords;

					let myWeather = await axios.get("http://localhost:4000/api/weather", {
						params: { lat: crd.latitude, lon: crd.longitude },
					});
					console.log(myWeather.data.data);
					setWeather(myWeather.data.data);
				},
				(err) => console.warn("ERROR(" + err.code + "): " + err.message),
				{ enableHighAccuracy: true }
			);
		});
	};

	return (
		<div className="weatherC">
			<div className="weatherContainer">
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
		</div>
	);
}

export default Weather;
