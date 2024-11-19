import { StatusBar } from "expo-status-bar";
import { searchWeatherByLatAndLong} from "./src/services/api";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Keyboard,
} from "react-native";
import React, { useState, useRef } from "react";

export default function App() {
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [dataWheather,setDataWeather] = useState(null)
  const inputLatRef = useRef(null);
  const inputLongRef = useRef(null);

  async function searchWeather() {
    const api_key = '4ec578c257d735aa19b30d5833f810f0'
    if (lat === "" || long === "") {
      alert("Informe os dados corretamente");
      setLat("")
      setLong("")
      inputLatRef.current.focus()
      inputLongRef.current.focus()
      return;
    }
    try {
      const response = await searchWeatherByLatAndLong(lat,long);
      console.log(response);
      setDataWeather(response)
      setLat("")
      setLong("")
      inputLatRef.current.focus()
      inputLongRef.current.focus()
      Keyboard.dismiss();
    } catch (erro) {
      console.log("Error", erro);
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleInfo}>Consulta de Clima</Text>
      </View>
      <View style={styles.formWeather}>
        <TextInput
          keyboardType="numeric"
          style={styles.inputWeather}
          placeholder="Digite a latitude "
          value={lat}
          onChangeText={(textLat) => {
            setLat(textLat);
          }}
          ref={inputLatRef}
        ></TextInput>
        <TextInput
          keyboardType="numeric"
          style={styles.inputWeather}
          placeholder="Digite a longitude"
          value={long}
          onChangeText={(textLong) => {
            setLong(textLong);
          }}
          ref={inputLongRef}
        ></TextInput>
        <TouchableOpacity
          style={[styles.btns, { backgroundColor: "blue" }]}
          onPress={searchWeather}
        >
          <Text style={styles.textBtn}>BUSCAR CLIMA</Text>
        </TouchableOpacity>
      </View>
      {
        dataWheather !== null ? 
<View style={styles.outWeather}>

 <Text style={styles.textOut}>Temperatura:{dataWheather.main.temp}</Text>
 <Text style={styles.textOut}>Umidade:{dataWheather.main.humidity}</Text>
 <Text style={styles.textOut}>Descrição:{dataWheather.weather[0].description}</Text>
 
       
      </View> : <Text></Text>
      }
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
  },
  title: {
    marginTop: 50,
    marginBottom: 20,
  },
  titleInfo: {
    fontSize: 25,
    fontWeight: "bold",
  },
  btns: {
    height: 50,
    borderRadius: 5,
    padding: 5,
    width: 345,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    backgroundColor: "#3375F2",
  },
  textBtn: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  inputWeather: {
    width: 340,
    height: 50,
    borderWidth: 1,
    borderColor: "#DDD",
    shadowOpacity: 0.2,
    margin: 4,
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
  },
  outWeather: {
    backgroundColor: "white",
    width: "90%",
    marginTop: 20,
    borderRadius: 10,
  },
  textOut: {
    margin: 5,
    fontSize: 15,
  },
});
