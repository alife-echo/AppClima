import axios from "axios";

export async function searchWeatherByLatAndLong(latitude, longitude) {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        lat: latitude,
        lon: longitude,
        appid: '4ec578c257d735aa19b30d5833f810f0',
        units: 'metric',
        lang: 'pt_br',
      },
    });
    console.log('response função data',response.data)
    console.log('response função',response)
    return response.data;
  } catch (erro) {
    console.error('Erro ao buscar os dados:', erro);
    throw erro;
  }
}

export default searchWeatherByLatAndLong