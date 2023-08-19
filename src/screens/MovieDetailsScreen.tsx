import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { movieCastDetails, movieDetails } from '../api/apicalls';
import { COLORS } from '../theme/theme';

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
      setMovieData(tempMovieCastData);
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
          <View>
            
          </View>
          <View style={styles.loadingContainer}>
              <ActivityIndicator  size={'large'} color={COLORS.Blue}/>  
            </View>
        </ScrollView>
      )
    }

  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
    </View>
  );
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
    }
});

export default MovieDetailsScreen;