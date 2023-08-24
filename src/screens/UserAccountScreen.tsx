import { Text, View, StyleSheet, StatusBar, ScrollView, Image } from 'react-native';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import AppHeader from '../components/AppHeader';
import SettingComponent from '../components/SettingComponent';


const UserAccountScreen = ({ navigation }: any) => {
  return (
    <ScrollView style={styles.container} bounces={false} showsVerticalScrollIndicator={false}>
      <StatusBar hidden />
      <View style={styles.appHeaderContainer}>
        <AppHeader 
          header={'My Profile'} 
          name="close" 
          action={() => navigation.goBack()} 
        />
      </View>

      <View style={styles.profileContainer}>
        <Image source={require('../assets/image/avatar.png')} style={styles.avatarImage}/>
        <Text style={styles.avatarText}>Bugs Bunny</Text>
      </View>

      <View style={styles.profileContainer}>
        <SettingComponent 
          icon='user'
          heading="Account"
          subheading="Edit Profile"
          subtitle="Change Password"
        />
        <SettingComponent 
          icon='setting'
          heading="Settings"
          subheading="Theme"
          subtitle="Permissions"
        />
        <SettingComponent 
          icon='dollar'
          heading="Offers & Refferrals"
          subheading="Offer"
          subtitle="Refferrals"
        />
        <SettingComponent 
          icon='info'
          heading="About"
          subheading="About Movies"
          subtitle="more"
        />
      </View>


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  appHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_20 * 2,
  },
  profileContainer:{
    alignItems:'center',
    padding: SPACING.space_36,

  },
  avatarText:{
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    marginTop: SPACING.space_16,
    color: COLORS.White,
  },
  avatarImage:{
    height: 80,
    width: 80,
    borderRadius: 80,
    
  }
  
});

export default UserAccountScreen;
