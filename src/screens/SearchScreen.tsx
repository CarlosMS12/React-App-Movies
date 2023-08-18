import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { COLORS } from '../theme/theme';




const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textColor}>HomeScreen</Text>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {

    },
    textColor: {
      color: COLORS.Black,
    }
});

export default SearchScreen;