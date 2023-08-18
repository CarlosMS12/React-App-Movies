import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import CustomIcon from './CustomIcon';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const genres: any ={
    28:'Action',
    12:'Adventure',
    16:'Animation',
    35:'Comedy',
    80:'Crime',
    99:'Documentry',
    18:'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystry',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',

}

const MovieCard = (props: any) => {
  return (
      <TouchableOpacity onPress={() => {}}>
        <View 
            style={[
                styles.container,
                props.shoudlMarginatedAtEnd
                    ? props.isFirst
                        ? {marginLeft: SPACING.space_36}
                        : props.isLast
                        ? {marginRight: SPACING.space_36}
                        :{}
                    :{},
                props.shoudlMarginatedAround ? {margin: SPACING.space_12} : {},
                {maxWidth: props.cardWidth},
                ]}>
            <Image 
                style={[styles.cardImage, {width: props.cardWidth}]}
                source={{uri: props.imagePath}} />
            
            <View>
                <View style={styles.rateContainer}>
                    <CustomIcon name='star' style={styles.starIcon}/>
                    <Text style={styles.votText}>
                    {props.vote_average}  ({props.vote_count})
                    </Text>
                </View>
            </View>
        </View>
      </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: COLORS.Black,
    },
    cardImage: {
        aspectRatio: 2 / 3,
        borderRadius: BORDERRADIUS.radius_20,
        
    },
    textTitle: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize:FONTSIZE.size_14,
        color:COLORS.White,
        textAlign: 'center',
        paddingVertical: SPACING.space_10,
    },
    rateContainer: {
        flexDirection:'row',
        gap:SPACING.space_10,
        alignItems:'center',
        justifyContent:'center',
        marginTop:SPACING.space_10,
    },
    starIcon:{
        fontSize:FONTSIZE.size_20,
        color:COLORS.Yellow
    },
    votText:{
        fontFamily:FONTFAMILY.poppins_medium,
        fontSize:FONTSIZE.size_14,
        color:COLORS.White,
    },
});

export default MovieCard;