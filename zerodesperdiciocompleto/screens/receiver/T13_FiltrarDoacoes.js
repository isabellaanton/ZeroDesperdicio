import React from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// 1. Importando a função de estilos globais e o hook do contexto
import { getGlobalStyles } from '../../Styles';
import { useTheme } from '../../ThemeContext';

import FooterReceptor from './FooterReceptor';

export default function T13_FiltrarDoacoes({ navigation }) {
  // 2. Consumindo o tema atual
  const { theme, isDarkMode } = useTheme();
  // 3. Injetando o tema nos estilos
  const styles = getGlobalStyles(theme);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 4. StatusBar dinâmica */}
      <StatusBar 
        barStyle={isDarkMode ? "light-content" : "dark-content"} 
        backgroundColor={theme.headerBackground} 
      />

      <ScrollView style={styles.conteudo} contentContainerStyle={styles.conteudoFormulario}>

        <View style={styles.container_icone_voltar_contato}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
            {/* Removido o color="black" fixo */}
            <MaterialCommunityIcons name="keyboard-backspace" size={25} color={theme.textPrimary} />
          </TouchableOpacity>
          <Text style={[styles.titulo, { marginLeft: 10 }]}>Filtrar doações</Text>
        </View>

        <Text style={styles.label}>Categoria</Text>
        <View style={styles.linha}>
          <Text style={styles.tag}>Todos</Text>
          <Text style={styles.tag}>Perecíveis</Text>
          <Text style={styles.tag}>Grãos</Text>
          <Text style={styles.tag}>Prontos</Text>
          <Text style={styles.tag}>Hortifruti</Text>
          <Text style={styles.tag}>Verduras</Text>
        </View>

        <Text style={styles.label}>Distância Máxima</Text>
        <TextInput
          placeholder="Digite a distância..."
          style={styles.label_input}
          placeholderTextColor={theme.textMuted} // Adicionado contraste dinâmico
        />

        <Text style={styles.label}>Disponibilidade</Text>
        <View style={styles.linha}>
          <Text style={styles.tag}>Agora</Text>
          <Text style={styles.tag}>Hoje</Text>
          <Text style={styles.tag}>Esta semana</Text>
        </View>

        <Text style={styles.label}>Ordenar por</Text>
        <TextInput
          placeholder="Mais próximo"
          style={styles.label_input}
          placeholderTextColor={theme.textMuted} // Adicionado contraste dinâmico
        />

        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate('HomeReceptor')}
          activeOpacity={0.8}
        >
          <Text style={styles.texto_botao}>Aplicar</Text>
        </TouchableOpacity>

      </ScrollView>

      <FooterReceptor navigation={navigation} abaAtual="Inicio" />
    </SafeAreaView>
  );
}