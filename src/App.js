import React from 'react';
import './App.css';
import Weather from './Components/Weather';
import Form from './Components/Form';

import 'weather-icons/css/weather-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_KEY = 'put your api key from https://openweathermap.org/';

class App extends React.Component {
  constructor() {
    super();
    // this.getWeather();
    this.weatherIcon = {
      Thunderstorm: 'wi-thunderstorm',
      Drizzle: 'wi-drizzle',
      Rain: 'wi-rain',
      Snow: 'wi-snow',
      Atmosphere: 'wi-fog',
      Clear: 'wi-day-sunny',
      Clouds: 'wi-day-fog'
    };
  }

  state = {
    city: '',
    country: '',
    icon: '',
    main: '',
    celsius: '',
    temp_max: '',
    temp_min: '',
    description: '',
    error: false
  };

  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }

  getWeatherIcon(icon, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId <= 233:
        this.setState({ icon: this.weatherIcon.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: this.weatherIcon.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 531:
        this.setState({ icon: this.weatherIcon.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: this.weatherIcon.Snow });
        break;
      case rangeId >= 700 && rangeId <= 781:
        this.setState({ icon: this.weatherIcon.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: this.weatherIcon.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: this.weatherIcon.Clouds });
        break;
      default:
        this.setState({ icon: this.weatherIcon.Clouds });
        break;
    }
  }

  getWeather = async e => {
    e.preventDefault();
    const cityEle = e.target.elements.city.value;
    const countryEle = e.target.elements.country.value;

    if (cityEle && countryEle) {
      const api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${cityEle},${countryEle}&appid=${API_KEY}`
      );

      const response = await api_call.json();
      console.log(response);
      if (!response) {
        this.setState({ erro: true });
        return;
      }
      const {
        name,
        sys: { country },
        main: { temp_min, temp_max, temp }
      } = response;

      this.setState({
        city: `${name} ${country}`,
        celsius: this.calCelsius(temp),
        temp_max: this.calCelsius(temp_max),
        temp_min: this.calCelsius(temp_min),
        description: response.weather[0].description
      });
      this.getWeatherIcon(this.weatherIcon, response.weather[0].id);
    } else {
      this.setState({ erro: true });
    }
  };

  render() {
    return (
      <div className='App'>
        <Form loadWeather={this.getWeather} error={this.state.error} />
        <Weather
          city={this.state.city}
          country={this.state.country}
          celsius={this.state.celsius}
          temp_min={this.state.temp_min}
          temp_max={this.state.temp_max}
          description={this.state.description}
          icon={this.state.icon}
        />
      </div>
    );
  }
}

export default App;
