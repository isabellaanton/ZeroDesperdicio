import { useEffect } from 'react';
import { Alert, View, StyleSheet } from 'react-native';
import * as Notifications from 'expo-notifications';

export default function T05_Notificacoes({ navigation }) {
  useEffect(() => {
    async function requestPermission() {
      await Notifications.requestPermissionsAsync();
      
      Alert.alert('notificação ligada', '', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    }

    requestPermission();
  }, []);

  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFDDAE',
  },
});