import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import ErrorWeather from "./ErrorWeather";
import RenderImage from "./RenderImage";

function Weather(props) {
  const [location, setLocation] = useState();
  const [data, setData] = useState();
  const lat = location ? location.latitude : null;
  const lon = location ? location.longitude : null;

  useEffect(() => {
    getLocation();
    getData();
  }, [lat, lon]);

  const getData = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${lon}&units=metric&APPID=15381c50cf1f9331c933a24675c1c91e`;
      // const url = `https://api.openweathermap.org/data/2.5/weather/?lat=34.8021&lon=38.9968&units=metric&APPID=15381c50cf1f9331c933a24675c1c91e`;
      const respone = await axios.get(url);
      setData(respone.data);
      console.log("data ", data);
    } catch (error) {
      console.log("eeeeeeeeee", error);
    }
  };
  const getLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;
      const {
        coords: { latitude, longitude },
      } = await Location.getLastKnownPositionAsync();
      setLocation({ latitude, longitude });
    } catch (error) {
      console.log(error);
    }
  };
  if (!data) return <ErrorWeather error={!data} />;
  console.log("weather : ", data.weather[0].description);
  return (
    <LinearGradient colors={["#8875EF", "#43D9F9"]} style={styles.container}>
      <View style={styles.main}>
        <View style={styles.city}>
          <Text style={[styles.white, styles.cityName]}>
            {data.sys.country} -{" "}
          </Text>

          <Text style={[styles.white, styles.cityName]}>{data.name}</Text>
        </View>
        <Text style={[styles.white, styles.temp]}>{data.main.temp}°</Text>

        <Text style={[styles.white, styles.feels]}>
          feels like {data.main.feels_like}°
        </Text>
        {/* <Image
          style={[styles.img]}
          source={require("./assets/mostly-clousy.png")}
        /> */}
        <RenderImage desc={data.weather[0].description} />
        <Text style={[styles.white, styles.desc]}>
          {data.weather[0].description}
        </Text>
      </View>
      <View style={styles.eclipse}>
        <View style={styles.minMax}>
          <Text style={[styles.white, styles.eclipseFont]}>
            min : {data.main.temp_min}
          </Text>
          <Text style={[styles.white, styles.eclipseFont]}>
            max : {data.main.temp_max}
          </Text>
        </View>
        <View style={styles.other}>
          <Text style={[styles.white, styles.eclipseFont]}>
            wind speed : {data.wind.speed}
          </Text>
          <Text style={[styles.white, styles.eclipseFont]}>
            humidity : {data.main.humidity}
          </Text>
          <Text style={[styles.white, styles.eclipseFont]}>
            visibility : {data.visibility}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
  white: {
    color: "#fff",
  },
  main: {
    alignItems: "center",
    justifyContent: "space-evenly",
    flex: 1.5,
  },
  city: {
    flexDirection: "row",
    justifyContent: "center",
  },
  cityName: {
    fontSize: 30,
    fontWeight: "bold",
  },
  temp: {
    fontSize: 33,
  },
  feels: {
    fontSize: 20,
  },
  img: {
    width: 230,
    height: 230,
  },
  desc: {
    fontSize: 20,
  },
  minMax: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  eclipseFont: {
    fontSize: 20,
  },
  eclipse: {
    paddingLeft: 130,
    paddingRight: 130,
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    backgroundColor: "#8775EF",
    flex: 1,
    opacity: 0.8,
    width: "120%",
    height: "40%",
    borderTopEndRadius: 150,
    borderTopStartRadius: 150,
    shadowOffset: {
      width: 0,
      height: -30,
    },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 10,
    shadowColor: "red",
  },
  other: {},
});
export default Weather;
