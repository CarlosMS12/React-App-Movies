import * as React from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import AppHeader from '../components/AppHeader';


const UserAccountScreen = ({navigation}:any) => {
  return (
    <View style={styles.container}>
      <StatusBar hidden/>
      <View style={styles.appHeaderContainer}>
        <AppHeader
          name="close"
          action={() => navigation.goBack()}/> 

      </View>
      <Text style={styles.headerText}>My Profile</Text>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flex:1,
      backgroundColor: COLORS.Black,
      
    },
    appHeaderContainer: {
      marginHorizontal: SPACING.space_36,
      marginTop: SPACING.space_20 * 2,
    },
    headerText: {
      flex: 1,
      fontFamily: FONTFAMILY.poppins_medium,
      fontSize:FONTSIZE.size_20,
      textAlign: 'center',
      color:COLORS.White,
      marginTop: -SPACING.space_12,
      
  },

});

export default UserAccountScreen;