// add text fields for user input of latitude and longitude coordinates
// implement weather forecast
//
// display results


import React, {useState } from "react";
import { Text, View, TextInput, Button, StyleSheet, ScrollView } from "react-native";

export default function Index() {
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [forecast, setForecast] = useState("")
    
    const fetchForecast = async() => {
        const lat = parseFloat(latitude);
        const lon = parseFloat(longitude);
        
        if(isNaN(lat)) || isNaN(lon){
            setForecast("Invalid Latitude or longitude");
            return;
        }
        try {
            const pointRes = await
        }
    }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
    </View>
  );
}
