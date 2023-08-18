import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet,Dimensions,TouchableOpacity,ActivityIndicator,ScrollView,StatusBar, FlatList } from 'react-native';
import { COLORS, SPACING } from '../theme/theme';
import { upComingMovies,nowPlayingMovies,popularMovies,baseImageUrl, searchMovies } from '../api/apicalls';
import InputHeader from '../components/InputHeader';
import CategoryHeader from '../components/CategoryHeader';
import SubMovieCard from '../components/SubMovieCard';
import MovieCard from '../components/MovieCard';

const {width,height} = Dimensions.get('window');

const getNowPlayingMoviesList = async () => {
  try{
    let response = await fetch(nowPlayingMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error('Algo salió mal en la funcion getNowPlayingMoviesList',
    error,
    );
  }

};

const getUpComingMoviesList = async () => {
  try{
    let response = await fetch(upComingMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error('Algo salió mal en la funcion getUpComingMoviesList',
    error,
    );
  }

};

const getPopularMoviesList = async () => {
  try{
    let response = await fetch(popularMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error('Algo salió mal en la funcion getPopularMoviesList',
    error,
    );
  }

};


const HomeScreen = ({navigation}: any) => {
  const [nowPlayingMoviesList, setNowPlayingMoviesList] = useState<any>(undefined);
    const [popularMoviesList,setPopularMoviesList] = useState<any>(undefined);
    const [upcomingMoviesList,setUpcomingMoviesList] = useState<any>(undefined);

    useEffect(()=> {
      (async() => {
        let tempNowPlaying = await getNowPlayingMoviesList();
        setNowPlayingMoviesList([
          {id: 'dummy1'},
          ...tempNowPlaying.results,
          {id: 'dummy2'},
        ]);

        let tempPopular = await getPopularMoviesList();
        setPopularMoviesList(tempPopular.results);
        
        let tempUpcoming= await getUpComingMoviesList();
        setUpcomingMoviesList(tempUpcoming.results);

      })();
    },[]);

    const searchMoviesFunction = () => {
      navigation.navigate('Search');
    };

    if(
      nowPlayingMoviesList == undefined && 
      nowPlayingMoviesList == null && 
      popularMoviesList == undefined && 
      popularMoviesList == null &&
      upcomingMoviesList == undefined &&
      upcomingMoviesList == null
    ) {
      return (
          <ScrollView 
            style={styles.container} 
            bounces={false}
            contentContainerStyle={styles.scrollViewContainer}>
            <StatusBar hidden/>

            <View style={styles.InputHeaderContainer}>
              <InputHeader searchFunction={searchMoviesFunction}/>
            </View>

            <View style={styles.loadingContainer}>
              <ActivityIndicator  size={'large'} color={COLORS.Blue}/>  
            </View>
          </ScrollView>
        );
    }
    return (
      <ScrollView 
            style={styles.container} 
            bounces={false}>
            
            <StatusBar hidden/>

            <View style={styles.InputHeaderContainer}>
              <InputHeader searchFunction={searchMoviesFunction}/>
            </View>
            <CategoryHeader title={'Now Playing'}/>
            <FlatList 
              data={nowPlayingMoviesList}
              keyExtractor={(item:any) => item.id}
              bounces={false}
              snapToInterval={width * 0.7 + SPACING.space_36}
              horizontal
              decelerationRate={0}
              contentContainerStyle={styles.containerGap36}
              renderItem={({item,index}) => {
                if(!item.title) {
                  return (
                    <View style={{width: (width-(width*0.7 + SPACING.space_36*2)) /2,
                  }}></View>
                  )
                }
                return(
                <MovieCard
                  shoudlMarginatedAtEnd={true}
                  cardFunction={() => {
                    navigation.push('MovieDetails', {movieid: item.id})
                  }}
                  cardWidth={width * 0.7}
                  isFirst={index == 0 ? true:false}
                  isLast={index == upcomingMoviesList?.length - 1 ? true : false}
                  title={item.title} 
                  imagePath={baseImageUrl('w780',item.poster_path)}
                  genre={item.genre_ids.slice(1,4)}
                  vote_average={item.vote_average}
                  vote_count={item.vote_count}
                />
                )
                
              }}
            />
            <CategoryHeader title={'Popular'}/>
            <FlatList 
              data={popularMoviesList}
              keyExtractor={(item:any) => item.id}
              bounces={false}
              horizontal
              contentContainerStyle={styles.containerGap36}
              renderItem={({item,index}) => (
                <SubMovieCard 
                  shoudlMarginatedAtEnd={true}
                  cardFunction={() => {
                    navigation.push('MovieDetails', {movieid: item.id})
                  }}
                  cardWidth={width / 3}
                  isFirst={index == 0 ? true:false}
                  isLast={index == upcomingMoviesList?.length - 1 ? true : false}
                  title={item.title} 
                  imagePath={baseImageUrl('w342',item.poster_path)}
                />
              )}
            />
            <CategoryHeader title={'Upcoming'}/>
            <FlatList 
              data={upcomingMoviesList}
              keyExtractor={(item:any) => item.id}
              bounces={false}
              horizontal
              contentContainerStyle={styles.containerGap36}
              renderItem={({item,index}) => (
                <SubMovieCard 
                  shoudlMarginatedAtEnd={true}
                  cardFunction={() => {
                    navigation.push('MovieDetails', {movieid: item.id})
                  }}
                  cardWidth={width / 3}
                  isFirst={index == 0 ? true:false}
                  isLast={index == upcomingMoviesList?.length - 1 ? true : false}
                  title={item.title} 
                  imagePath={baseImageUrl('w342',item.poster_path)}
                />
              )}
            />
          </ScrollView>
    )
};


const styles = StyleSheet.create({
    container: {
      display: 'flex',
      backgroundColor: COLORS.Black,
      
      
    },
    scrollViewContainer:{
      flex: 1,
      
      
      
    },
    loadingContainer: {
      flex: 1,
      alignSelf: 'center',
      justifyContent: 'center',
      
    },
    InputHeaderContainer:{
      marginHorizontal:SPACING.space_36,
      marginTop:SPACING.space_28,
      
    },
    containerGap36: {
      gap: SPACING.space_36,
      
    },
    
});

export default HomeScreen;