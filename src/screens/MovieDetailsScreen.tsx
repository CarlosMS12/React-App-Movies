import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, ScrollView, ActivityIndicator, StatusBar, ImageBackground, Image } from 'react-native';
import { baseImageUrl, movieCastDetails, movieDetails } from '../api/apicalls';
import { COLORS, SPACING } from '../theme/theme';
import AppHeader from '../components/AppHeader';
import LinearGradient from 'react-native-linear-gradient';

const getMovieDetails = async (movieid:number) => {

  try{
    let response = await fetch(movieDetails(movieid));
    let json = await response.json();
    return json;
  }catch (error){
    console.error("Algo salió mal en la funcion getMoviesDetails",error);
  }
};

const getMovieCastDetails = async (movieid:number) => {
  try{
    let response = await fetch(movieCastDetails(movieid));
    let json = await response.json();
    return json;
  }catch (error){
    console.error("Algo salió mal en la funcion getMovieCastDetails",error);
  }
};

const MovieDetailsScreen = ({navigation,route}:any) => {
  const [movieData,setMovieData] = useState<any>(undefined);
  const [movieCastData,setMovieCastData] = useState<any>(undefined);

  useEffect(()=>{
    (async ()=>{
      const tempMovieData = await getMovieDetails(route.params.movieid);
      setMovieData(tempMovieData);
    })();

    (async ()=>{
      const tempMovieCastData = await getMovieCastDetails(route.params.movieid);
      setMovieCastData(tempMovieCastData);
    })();
  },[]);

  /* console.log(movieData, movieCastData); */
  if(
      movieData == undefined &&
      movieData == null &&
      movieCastData == undefined &&
      movieCastData == null
    ){
      return (
        <ScrollView 
          style={styles.container}
          contentContainerStyle={styles.scrollViewContainer}
          bounces={false}
          showsVerticalScrollIndicator={false}>
          <View style={styles.appHeaderContainer}>
            <AppHeader 
              name="close"
              header={''}
              action={() => navigation.goBack()}/>
          </View>
          <View style={styles.loadingContainer}>
              <ActivityIndicator  size={'large'} color={COLORS.Blue}/>  
            </View>
        </ScrollView>
      )
    }

    return (
      <ScrollView 
        style={styles.container}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <StatusBar hidden/>
        <View >
            <ImageBackground source={{uri:baseImageUrl('w780',movieData?.backdrop_path),
          }}
          style={styles.imageBG}>
          <LinearGradient
            colors={[COLORS.BlackRGB10, COLORS.Black]} 
            style={styles.linearGradient}>
              <View style={styles.appHeaderContainer}>
                <AppHeader 
                  name="close"
                  header={''}
                  action={() => navigation.goBack()}/>
              </View>
            </LinearGradient>
          </ImageBackground>
          <View style={styles.imageBG}>
            <Image
              source={{uri: baseImageUrl('w342', movieData?.poster_path)}}
              style={styles.cardImage}
            />
          </View>
        </View>
      </ScrollView>
    )
}



const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flex:1,
      backgroundColor: COLORS.Black,
    },
    loadingContainer: {
      flex: 1,
      alignSelf: 'center',
      justifyContent: 'center',
      
    },
    scrollViewContainer:{
      flex:1,
    },
    appHeaderContainer: {
      marginHorizontal:SPACING.space_36,
      marginTop: SPACING.space_20 * 2,
    },
    imageBG:{
      width: '100%',
      aspectRatio: 3072 / 1727,
    },
    linearGradient:{
      height: '100%',
    },
    cardImage:{
      width: '60%',
      aspectRatio: 200/300,
      position: 'absolute',
      alignSelf:'center',
      bottom: 0,
      borderRadius: 20,
    }
});

export default MovieDetailsScreen;