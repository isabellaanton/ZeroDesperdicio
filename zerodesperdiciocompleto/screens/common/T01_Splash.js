import React from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';

// 1. Importando a função de estilos globais e o hook do contexto
import { getGlobalStyles } from '../../Styles';
import { useTheme } from '../../ThemeContext';

export default function T01_Splash({ navigation }) {
  // 2. Consumindo o tema atual e a flag de dark mode
  const { theme, isDarkMode } = useTheme(); 
  
  // 3. Injetando o tema para gerar os estilos dinâmicos
  const styles = getGlobalStyles(theme);

  return (
    <ScrollView
      style={styles.safeArea}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      {/* 4. StatusBar dinâmica adicionada para melhorar o visual no topo da tela */}
      <StatusBar 
        barStyle={isDarkMode ? "light-content" : "dark-content"} 
        backgroundColor={theme.background} 
      />

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
          style={[styles.botaoNovaDoacao, { width: '80%', marginVertical: 10 }]}
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.8}
        >
          <Text style={styles.botaoNovaDoacaoTexto}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botao2}
          onPress={() => navigation.navigate('Cadastro')}
          activeOpacity={0.8}
        >
          <Text style={styles.texto_botao2}>Criar conta</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />

      </View>
    </ScrollView>
  );
}