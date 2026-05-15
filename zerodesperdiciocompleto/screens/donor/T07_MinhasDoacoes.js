import React from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  SafeAreaView, StatusBar,
} from 'react-native';

// 1. Importando a função de estilos globais e o hook do contexto
import { getGlobalStyles } from '../../Styles';
import { useTheme } from '../../ThemeContext';

import FooterDoador from './FooterDoador';

export default function T07_MinhasDoacoes({ navigation }) {
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

      {/* Header */}
      <View style={[styles.header, { height: 130 }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Text style={styles.menuIconeTexto}>←</Text>
          </TouchableOpacity>
          <Text style={styles.saudacao}>Minhas Doações</Text>
          <TouchableOpacity style={styles.menuIcone} activeOpacity={0.7}>
            <Text style={styles.menuIconeTexto}>≡</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.conteudoHomeDoador}
        contentContainerStyle={styles.conteudoContainerHomeDoador}
        showsVerticalScrollIndicator={false}
      >
        {/* Filtros */}
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20 }}>
          {/* Hexadecimais isolados substituídos pelo Theme */}
          <TouchableOpacity 
            style={[styles.badgePendente, { backgroundColor: theme.primary }]} 
            activeOpacity={0.8}
          >
            <Text style={{ color: theme.buttonTextInverse, fontWeight: 'bold' }}>Todos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.badgePendente} activeOpacity={0.8}>
            <Text style={styles.badgePendenteTexto}>Concluídos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.badgePendente} activeOpacity={0.8}>
            <Text style={styles.badgePendenteTexto}>Pendentes</Text>
          </TouchableOpacity>
        </View>

        {/* Card exemplo */}
        <View style={styles.cardSolicitacao}>
          <View style={styles.cardHeader}>
            <Text style={styles.nomeOng}>Marmitas Prontas</Text>
            <View style={styles.badgePendente}>
              <Text style={styles.badgePendenteTexto}>pendente</Text>
            </View>
          </View>
          <Text style={styles.descricaoSolicitacao}>5 unid • Prontas para Consumo</Text>
          <Text style={[styles.descricaoSolicitacao, { fontWeight: 'bold' }]}>2 Solicitações</Text>
          <TouchableOpacity
            style={[styles.botaoAceitar, { alignSelf: 'flex-end', paddingHorizontal: 20 }]}
            onPress={() => navigation.navigate('DetalheDoacaoDoador')}
            activeOpacity={0.8}
          >
            <Text style={styles.botaoAceitarTexto}>ver →</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      <FooterDoador navigation={navigation} abaAtual="Doacoes" />
    </SafeAreaView>
  );
}