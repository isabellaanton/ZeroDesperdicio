import React from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from "../../Styles"; 

function T01_Splash({ navigation }) {
  return (
    <ScrollView 
      style={styles.safeArea} 
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={styles.containerSplash}>
        
        <View style={{ marginTop: 50 }}>
          <Image 
            style={styles.imagem} 
            source={require('../../logo.png')}
          />
        </View>

        <Text style={styles.texto3}>
          Menos desperdício. Mais pessoas alimentadas
        </Text>

        <View style={{ width: '100%', paddingHorizontal: 10 }}>
          <Text style={styles.texto2}>
            • O app que conecta sobra {"\n"}   com necessidade{"\n"}
            • Cadastre uma doação em {"\n"}   2 minutos{"\n"}
            • Veja doações disponíveis {"\n"}   perto de você{"\n"}
            • Combine a retirada pelo chat
          </Text>
        </View>

        <TouchableOpacity 
          style={[
            styles.botao, 
            { 
              width: '80%', // Ajuste a largura (pode usar % ou um número fixo como 300)
              height: 50,   // Ajuste a altura
              justifyContent: 'center', // Centraliza o texto verticalmente
              alignItems: 'center',     // Centraliza o texto horizontalmente
              marginVertical: 10        // Dá um espaço entre os botões
            }
          ]} 
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.texto_botao}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.botao2}
          onPress={() => navigation.navigate('Cadastro')}
        >
          <Text style={styles.texto_botao2}>Criar conta</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
        
      </View>
    </ScrollView>
  );
}

export default T01_Splash;