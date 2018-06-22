import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform
} from "react-native";
import MapView, { Marker, AnimatedRegion, Polyline } from "react-native-maps";
import haversine from "haversine";
import markerImage from './marker.png';

const LATITUDE = -23.534104;
const LONGITUDE = -46.574130;
const LATITUDE_DELTA = 0.010; //Zoom Map
const LONGITUDE_DELTA = 0.010; //Zoom Map

class AnimatedMarkers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tile: '[Piata-Shopping Paralela]',
      lastUpDate: 'Última atualização 21/06/2018 19:15:32',
      latitude: LATITUDE,
      longitude: LONGITUDE,
      prevLatLng: {},
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE
      })
    };
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      position => {},
      error => alert(error.message),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      }
    );
  }

  //invoked immediately after a component is mounted (inserted into the tree).
  componentDidMount() {
    this.watchID = navigator
                  .geolocation
                  .watchPosition(
                    position => {
                      const { coordinate } = this.state;
                      const { latitude, longitude } = position.coords;
                      // get latitude and longitude of the position.coords;
                      const newCoordinate = {
                        latitude,
                        longitude
                      };

                      //pass newCoordinate to marker
                      if (Platform.OS === "android") {
                        if (this.marker) {
                          this.marker._component.animateMarkerToCoordinate(
                            newCoordinate,
                            500
                          );
                        }
                      } else {
                        coordinate.timing(newCoordinate).start();
                      }

                      this.setState({
                        latitude,
                        longitude,
                        prevLatLng: newCoordinate
                      });
                    },
                    error => console.log(error),
                    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  calcDistance = newLatLng => {
    const { prevLatLng } = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
  };

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          showUserLocation
          followUserLocation
          loadingEnabled
          region={this.getMapRegion()}
        >
            <Marker.Animated 
              title = {this.state.tile}
              image = {markerImage}
              ref={marker => {
                this.marker = marker;
              }}
              coordinate={this.state.coordinate} 
            />
        </MapView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.bubble, styles.button]}>
            <Text style={styles.bottomBarContent}> 
            {this.state.lastUpDate}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  bubble: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  latlng: {
    width: 200,
    alignItems: "stretch"
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent"
  }
});

export default AnimatedMarkers;
