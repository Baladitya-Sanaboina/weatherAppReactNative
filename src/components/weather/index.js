import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Image,
  ActivityIndicator,
} from "react-native";
import { Component } from "react";
const weatherPng = require("./weather.png");
import React from "react";
const clearPng = require("./clear.png");
const cloudyPng = require("./cloudy.png");
const fogPng = require("./fog.png");
const overcastPng = require("./overcast.png");
const partyCloudPng = require("./party_cloudy.png");
const rainyPng = require("./rainy.png");
const snowPng = require("./snow.png");
const windyPng = require("./windy.png");
const searchCityPng = require("./searchCity.png");
const notFoundPng = require("./notFound.png");
const weatherStatusList = {
  intial: "intial",
  progress: "progress",
  finish: "finish",
  failed: "failed",
};

class Weather extends Component {
  state = {
    location: "",
    weatherStatus: weatherStatusList.intial,
    weatherData: [],
  };
  changeLocation = (event) => {
    this.setState({ location: event });
  };

  getWeatherStatus = async () => {
    const { location } = this.state;
    this.setState({ weatherStatus: weatherStatusList.progress });
    const apiId = "fcc8de7015bbb202209bbf0261babf4c";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=${apiId}`;
    const options = {
      method: "GET",
    };
    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();

      this.setState({
        weatherStatus: weatherStatusList.finish,
        weatherData: data,
      });
    } else {
      this.setState({
        weatherStatus: weatherStatusList.failed,
      });
    }
  };
  renderImage = () => {
    const { weatherData } = this.state;
    const weatherStatus = weatherData.weather[0].main.toLowerCase();
    switch (weatherStatus) {
      case "clear":
        return <Image source={clearPng} style={styles.weatherImage} />;
      case "clouds":
        return <Image source={cloudyPng} style={styles.weatherImage} />;
      case "fog":
        return <Image source={fogPng} style={styles.weatherImage} />;
      case "over casting":
        return <Image source={overcastPng} style={styles.weatherImage} />;
      case "party cloud":
        return <Image source={partyCloudPng} style={styles.weatherImage} />;
      case "rain":
        return <Image source={rainyPng} style={styles.weatherImage} />;
      case "snow":
        return <Image source={snowPng} style={styles.weatherImage} />;
      case "windy":
        return <Image source={windyPng} style={styles.weatherImage} />;
      default:
        return <Image source={weatherPng} style={styles.weatherImage} />;
    }
  };
  renderWeatherCard = () => {
    const { weatherStatus, weatherData } = this.state;
    switch (weatherStatus) {
      case weatherStatusList.failed:
        return (
          <View style={styles.searchCard}>
            <Image source={notFoundPng} style={styles.searchImage} />
            <Text>City Not Found</Text>
          </View>
        );
      case weatherStatusList.progress:
        return <ActivityIndicator size="large" />;
      case weatherStatusList.finish:
        return (
          <View style={styles.searchCard}>
            {this.renderImage()}
            <Text style={styles.mainTemp}>{weatherData.main.temp}°C</Text>
            <Text>
              {weatherData.name}, {weatherData.sys.country}
            </Text>
            <Text>Status: {weatherData.weather[0].main}</Text>
            <Text>Description: {weatherData.weather[0].description}</Text>
            <Text>
              Lat: {weatherData.coord.lat} Log: {weatherData.coord.lon}
            </Text>
            <Text>
              Sunrise: {weatherData.sys.sunrise}, Sunset:{" "}
              {weatherData.sys.sunset}
            </Text>
          </View>
        );
      default:
        return (
          <View style={styles.searchCard}>
            <Image source={searchCityPng} style={styles.searchImage} />
            <Text>Search a city to the see the weather</Text>
          </View>
        );
    }
  };
  render() {
    const { location, weatherStatus } = this.state;

    return (
      <View>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter the city"
          onChangeText={this.changeLocation}
        />
        <View>
          <Button title="submit" onPress={this.getWeatherStatus} />
        </View>
        <View style={styles.weatherCard}>{this.renderWeatherCard()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputBox: {
    backgroundColor: "#edf0f5",
    padding: 15,
    width: 300,
    borderRadius: 8,
    borderBottomLeftRadius: 25,
    borderTopRightRadius: 25,
    marginBottom: 8,
  },
  weatherImage: {
    height: 150,
    width: 150,
  },
  weatherCard: {
    backgroundColor: "#edf0f5",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    alignItems: "center",
    height: 350,
    justifyContent: "center",
  },
  searchCard: {
    alignItems: "center",
  },
  searchImage: {
    width: 280,
    height: 220,
  },
  mainTemp: {
    fontSize: 36,
    fontWeight: "bold",
  },
});

export default Weather;
