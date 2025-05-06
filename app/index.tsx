// add text fields for user input of latitude and longitude coordinates
// implement weather forecast
//
// display results


import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,

} from "react-native";
 import MapView, { Marker } from "react-native-maps";
// downloaded the package using this command in terminal: "npx expo install react-native-maps"

export default function Index() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [forecast, setForecast] = useState("");
  const [locationName, setLocationName] = useState("");
  const [showMap, setShowMap] = useState(false);

  const fetchForecast = async () => {
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lon)) {
      setForecast("Invalid latitude or longitude");
      return;
    }

    try {
      const pointRes = await fetch(`https://api.weather.gov/points/${lat},${lon}`);
      const pointData = await pointRes.json();

      const forecastUrl = pointData.properties?.forecast;
      const city = pointData.properties?.relativeLocation?.properties?.city;
      const state = pointData.properties?.relativeLocation?.properties?.state;

      if (forecastUrl) {
        setLocationName(`${city}, ${state}`);

        const forecastRes = await fetch(forecastUrl);
        const forecastData = await forecastRes.json();
        const firstPeriod = forecastData.properties?.periods?.[0];

        if (firstPeriod) {
          setForecast(`${firstPeriod.name}: ${firstPeriod.detailedForecast}`);
        } else {
          setForecast("No forecast data available.");
        }
      } else {
        setForecast("Couldn't find forecast URL");
      }
    } catch (error) {
      console.error("Error:", error);
      setForecast("Error fetching forecast");
    }
      setShowMap(true);
  };

  const isCoordsValid = !isNaN(parseFloat(latitude)) && !isNaN(parseFloat(longitude));


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Weather Forecast</Text>

      <TextInput
        style={styles.input}
        placeholder="Latitude"
        keyboardType="decimal-pad"
        value={latitude}
        onChangeText={setLatitude}
      />
      <TextInput
        style={styles.input}
        placeholder="Longitude"
        keyboardType="decimal-pad"
        value={longitude}
        onChangeText={setLongitude}
      />

      <Button title="Get Forecast" onPress={fetchForecast} />
      {showMap && isCoordsValid && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker
            coordinate={{
              latitude: parseFloat(latitude),
              longitude: parseFloat(longitude),
            }}
            title={locationName || "Selected Location"}
          />
        </MapView>
      )}
      {forecast !== "" && (
        <View style={styles.forecastContainer}>
          <Text style={styles.location}>{locationName}</Text>
          <Text style={styles.forecastLabel}>Forecast:</Text>
          <Text>{forecast}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  forecastContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  location: {
    fontSize: 18,
    fontWeight: "bold",
  },
  forecastLabel: {
    fontWeight: "bold",
    marginTop: 10,
  },
  map: {
    width: "90%",
    height: 300,
    marginTop: 20,
    borderRadius: 10,
},
});
