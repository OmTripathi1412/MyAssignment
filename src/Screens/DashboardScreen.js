import {
  Animated,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign';

const MoviesData = [
  {
    index: 1,
    image: require('../assets/Avengers.jpg'),
    movieName: 'Spider-Man: No way Home',
    date: 'Dec 15, 2021',
    // rate : 5,
  },
  {
    index: 2,
    image: require('../assets/Thor.jpg'),
    movieName: 'Spider-Man: No way Home',
    date: 'Dec 15, 2021',
  },
  {
    index: 3,
    image: require('../assets/Hulk.jpg'),
    movieName: 'Spider-Man: No way Home',
    date: 'Dec 15, 2021',
  },
  {
    index: 4,
    image: require('../assets/Ironan2.jpg'),
    movieName: 'Spider-Man: No way Home',
    date: 'Dec 15, 2021',
  },
  {
    index: 5,
    image: require('../assets/SpiderMan.jpg'),
    movieName: 'Spider-Man: No way Home',
    date: 'Dec 15, 2021',
  },
];

const DashboardScreen = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const apiCall = () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: '570bb6e9c6805370e4bcbd42a4cfb32b',
      },
    };

    fetch(
      'https://api.themoviedb.org/3/570bb6e9c6805370e4bcbd42a4cfb32b',
      options,
    )
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
  };
  return (
    <SafeAreaView stye={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../assets/Hamburger.png')}
          />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.textStyle}>Hello Sunshine</Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            apiCall();
          }}
          style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../assets/search.png')}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{backgroundColor: 'white', marginBottom: 16}}
        // style = {{flex:1,width:'100%'}}
      >
        <ScrollView
          // contentContainerStyle={{ marginBottom: 64 }}
          horizontal={false}
          style={{width: '100%', height: '100%', flexGrow: 1}}>
          <View style={styles.PopularHeader}>
            <View style={styles.PopularView}>
              <Text style={styles.textStyle}>What's Popular</Text>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  width: '100%',
                  top: 2,
                }}>
                <View style={styles.viewAllContainer}>
                  <Text style={[{fontSize: 16}, styles.textStyle]}>
                    View All
                  </Text>
                </View>
                <AntDesign
                  name="right"
                  style={{top: 3, left: 4}}
                  size={20}
                  color="#000"
                />
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal={true}
              style={{
                flexDirection: 'row',
                // justifyContent: 'space-between',
                // alignItems: 'flex-start',
              }}>
              {MoviesData.map((item, index) => {
                return (
                  <View style={styles.PopularMovieContainer}>
                    <TouchableOpacity
                      style={{
                        // flexDirection: 'row',
                        // justifyContent: 'space-between',
                        borderRadius: 32,
                        margin: 12,
                        justifyContent: 'center',
                        // alignItems: 'center',
                        // backgroundColor: 'red',
                        // marginHorizontal:4
                      }}>
                      <Image
                        style={{height: 250, width: 150, borderRadius: 12}}
                        source={item.image}
                      />
                      <Text style={styles.movieDate}>{item.movieName}</Text>
                      <Text style={styles.MovieDate}>{item.date}</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
          </View>

          <View style={styles.PopularHeader}>
            <View style={styles.PopularView}>
              <Text style={styles.textStyle}>Playing In Theater's</Text>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  width: '90%',
                  top: 2,
                }}>
                <View style={styles.viewAllContainer}>
                  <Text style={[{fontSize: 16}, styles.textStyle]}>
                    View All
                  </Text>
                </View>
                <AntDesign
                  name="right"
                  style={{top: 3, left: 4}}
                  size={20}
                  color="#000"
                />
              </TouchableOpacity>
            </View>
            <ScrollView
              scrollEventThrottle={16}
              horizontal={true}
              pagingEnabled
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: scrollX}}}],
                {
                  useNativeDriver: false,
                },
              )}
              style={{
                flexDirection: 'row',
                // justifyContent: 'space-between',
                // alignItems: 'flex-start',
              }}>
              {MoviesData.map((item, index) => {
                return (
                  <View style={styles.PopularMovieContainer}>
                    <TouchableOpacity
                      style={{
                        // flexDirection: 'row',
                        // justifyContent: 'space-between',
                        borderRadius: 32,
                        margin: 12,
                        justifyContent: 'center',
                        // alignItems: 'center',
                        // backgroundColor: 'red',
                        // marginHorizontal:4
                      }}>
                      <Image
                        style={{height: 180, width: 300, borderRadius: 12}}
                        source={item.image}
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
            <View style={styles.indicator}>
              {MoviesData.map((item, index) => {
                const {width} = scrollX.interpolate({
                  inputRange: [
                    Dimensions.get('screen').width * (index - 1),
                    Dimensions.get('screen').width * index,
                    Dimensions.get('screen').width * (index + 1),
                  ],
                  outputRange: [8, 16, 8],
                  extrapolate: 'clamp',
                });
                return (
                  <Animated.View
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: 'yellow',
                      marginHorizontal: 4,
                      width: width,
                    }}
                  />
                );
              })}
            </View>
          </View>

          <View style={styles.PopularHeader}>
            <View style={styles.PopularView}>
              <Text style={styles.textStyle}>Trending Popular</Text>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  width: '100%',
                  top: 2,
                }}>
                <View style={styles.viewAllContainer}>
                  <Text style={[{fontSize: 16}, styles.textStyle]}>
                    View All
                  </Text>
                </View>
                <AntDesign
                  name="right"
                  style={{top: 3, left: 4}}
                  size={20}
                  color="#000"
                />
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal={true}
              style={{
                flexDirection: 'row',
                // justifyContent: 'space-between',
                // alignItems: 'flex-start',
              }}>
              {MoviesData.map((item, index) => {
                return (
                  <View style={styles.PopularMovieContainer}>
                    <TouchableOpacity
                      style={{
                        // flexDirection: 'row',
                        // justifyContent: 'space-between',
                        borderRadius: 32,
                        margin: 12,
                        justifyContent: 'center',
                        // alignItems: 'center',
                        // backgroundColor: 'red',
                        // marginHorizontal:4
                      }}>
                      <Image
                        style={{height: 250, width: 150, borderRadius: 12}}
                        source={item.image}
                      />
                      <Text style={styles.movieDate}>{item.movieName}</Text>
                      <Text style={styles.MovieDate}>{item.date}</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
          </View>

          <View style={styles.PopularHeader}>
            <View style={styles.PopularView}>
              <Text style={styles.textStyle}>Top Rated</Text>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  width: '70%',
                  top: 2,
                  //   backgroundColor:'yellow',
                  justifyContent: 'flex-end',
                }}>
                <View style={styles.viewAllContainer}>
                  <Text style={[{fontSize: 16}, styles.textStyle]}>
                    View All
                  </Text>
                </View>
                <AntDesign
                  name="right"
                  style={{top: 3, left: 4}}
                  size={20}
                  color="#000"
                />
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal={true}
              style={{
                flexDirection: 'row',
                // justifyContent: 'space-between',
                // alignItems: 'flex-start',
              }}>
              {MoviesData.map((item, index) => {
                return (
                  <View style={styles.PopularMovieContainer}>
                    <TouchableOpacity
                      style={{
                        // flexDirection: 'row',
                        // justifyContent: 'space-between',
                        borderRadius: 16,
                        margin: 12,
                        justifyContent: 'center',
                        // alignItems: 'center',
                        backgroundColor: 'lightgray',
                        // marginHorizontal:4
                        // height:200
                      }}>
                      <Image
                        style={{height: 160, width: 220, borderRadius: 16}}
                        source={item.image}
                      />
                      {/* <View style={{flexDirection: 'row'}}> */}
                      <Text style={[styles.movieDate, {width: '70%'}]}>
                        {item.movieName}
                      </Text>

                      {/* </View> */}
                      {/* <Text style={styles.MovieDate}>{item.date}</Text> */}
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
          </View>

          <View style={styles.PopularHeader}>
            <View style={styles.PopularView}>
              <Text style={styles.textStyle}>Upcoming</Text>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  width: '80%',
                  justifyContent: 'flex-end',
                  top: 2,
                }}>
                <View style={styles.viewAllContainer}>
                  <Text style={[{fontSize: 16}, styles.textStyle]}>
                    View All
                  </Text>
                </View>
                <AntDesign
                  name="right"
                  style={{top: 3, left: 4}}
                  size={20}
                  color="#000"
                />
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal={true}
              style={{
                flexDirection: 'row',
                // justifyContent: 'space-between',
                // alignItems: 'flex-start',
              }}>
              {MoviesData.map((item, index) => {
                return (
                  <View style={styles.PopularMovieContainer}>
                    <TouchableOpacity
                      style={{
                        // flexDirection: 'row',
                        // justifyContent: 'space-between',
                        borderRadius: 32,
                        margin: 12,
                        justifyContent: 'center',
                        // alignItems: 'center',
                        // backgroundColor: 'red',
                        // marginHorizontal:4
                      }}>
                      <Image
                        style={{height: 250, width: 150, borderRadius: 12}}
                        source={item.image}
                      />
                      <Text style={styles.movieDate}>{item.movieName}</Text>
                      <Text style={styles.MovieDate}>{item.date}</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
          </View>

          <View style={{height: '40%', padding: 60}}></View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#FFF',
    height: Dimensions.get('screen').height * 1,
  },
  headerContainer: {
    width: Dimensions.get('screen').width * 1,
    height: Dimensions.get('screen').height * 0.06,
    backgroundColor: '#FFF',
    elevation: 1,
    shadowColor: '#000',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    height: 40,
    width: 40,
  },
  imageContainer: {
    height: Dimensions.get('screen').height * 0.05,
    marginHorizontal: 8,
    width: Dimensions.get('screen').width * 0.12,
  },
  textContainer: {
    // backgroundColor: 'green',
    width: Dimensions.get('screen').width * 0.7,
  },
  textStyle: {
    fontWeight: '600',
    fontSize: 18,
    fontFamily: 'poppins',
  },
  PopularHeader: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    width: '100%',
    backgroundColor: '#FFF',
  },
  PopularView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 16,
  },
  viewAllContainer: {
    justifyContent: 'flex-end',
    // backgroundColor:'yellow',
    width: '60%',
    alignItems: 'flex-end',
  },
  PopularMovieContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  MovieDate: {
    width: '60%',
    marginVertical: 16,
    left: 4,
    color: 'gray',
    fontWeight: '600',
    fontSize: 16,
    //   backgroundColor: 'yellow',
  },
  movieDate: {
    width: '80%',
    marginVertical: 16,
    // backgroundColor:'yellow',
    left: 4,
    color: 'gray',
    fontWeight: '600',
    fontSize: 16,
  },
  indicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
