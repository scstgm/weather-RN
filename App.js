import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Dimensions,
} from 'react-native';

export default function App() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState([]);

  const pic = {
    uri: 'https://i.pinimg.com/originals/7f/63/1e/7f631e577ed5e5ffbbce726f8ec03489.jpg',
  };

  const API = {
    key: 'e1a0751f24c4ec62f22a43a4d5720fe0',
    url: 'https://api.openweathermap.org/data/2.5/weather?q=',
  };

  //https://openweathermap.org/current

  /* API example call
  api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=e1a0751f24c4ec62f22a43a4d5720fe0
 */

  const fetchWeatherData = () => {
    const url = `${API.url}${location}&units=metric&appid=${API.key}`;
    fetch(url)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })

      .then(data => {
        setWeatherData(data);
      })

      .catch(error => {
        console.error('There was a problem while fetching the data.', error);
        setError(error);
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={pic} resizeMode="cover" style={styles.image}>
        <View>
          <TextInput
            placeholder="Search by location name..."
            onChangeText={input => setLocation(input)}
            value={location}
            style={styles.textInput}
            onSubmitEditing={fetchWeatherData}
          />
        </View>

        {typeof weatherData?.name === 'undefined' ? (
          <View style={styles.weatherDataView}>
            <Text style={[styles.empty, styles.moreVisibleText]}>
              Such empty...
            </Text>
          </View>
        ) : (
          <View style={styles.weatherDataView}>
            <Text style={[styles.cityCountry, styles.moreVisibleText]}>
              {`${weatherData?.name}, ${weatherData?.sys?.country}`}
            </Text>
            <Text style={[styles.date, styles.moreVisibleText]}>
              {new Date().toLocaleString()}
            </Text>
            <Text style={[styles.temp, styles.moreVisibleText]}>
              {Math.round(weatherData?.main?.temp)}
              {'°C'}
            </Text>
            <Text
              style={[
                styles.description,
                styles.moreVisibleText,
              ]}>{`Humidity: ${weatherData?.main?.humidity}%`}</Text>
            <Text
              style={[
                styles.description,
                styles.moreVisibleText,
              ]}>{`Wind: ${weatherData?.wind?.speed}km/h`}</Text>
          </View>
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  empty: {
    color: 'white',
    fontSize: 20,
    alignItems: 'center',
  },
  textInput: {
    borderBottomWidth: 3,
    paddingHorizontal: 12,
    paddingVertical: 18,
    marginVertical: 58,
    marginHorizontal: 20,
    backgroundColor: 'white',
    fontSize: 20,
    borderRadius: 20,
    borderBottomColor: '#209DFF',
  },
  weatherDataView: {
    alignItems: 'center',
  },
  cityCountry: {
    color: 'white',
    fontSize: 34,
    fontWeight: 'bold',
  },
  date: {
    color: 'white',
    fontsize: 24,
    marginVertical: 6,
  },
  temp: {
    color: 'white',
    fontSize: 46,
    marginVertical: 10,
  },
  description: {
    color: 'white',
    fontSize: 18,
  },
  moreVisibleText: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
});
