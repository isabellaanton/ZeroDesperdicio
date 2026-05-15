import React from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  SafeAreaView, StatusBar,
} from 'react-native';

// 1. Importando a função de estilos globais e o hook do contexto
import { getGlobalStyles } from '../../Styles';
import { useTheme } from '../../ThemeContext';

import FooterDoador from './FooterDoador';

export default function T08_DetalheDoacaoDoador({ navigation }) {
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
      <View style={[styles.header, { height: 110 }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Text style={styles.menuIconeTexto}>←</Text>
          </TouchableOpacity>
          <Text style={[styles.saudacao, { fontSize: 20, paddingBottom: 0 }]}>Detalhes da Doação</Text>
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
        {/* Card da doação */}
        <View style={[styles.cardSolicitacao, { backgroundColor: theme.badgeBg }]}>
          <Text style={[styles.nomeOng, { fontSize: 20 }]}>Marmitas</Text>
          <Text style={styles.descricaoSolicitacao}>10 unid • Prontas para Consumo</Text>
          <View style={{ height: 1, backgroundColor: theme.gray, marginVertical: 10, opacity: 0.2 }} />
          <Text style={styles.descricaoSolicitacao}>Local: Rua Das Flores, 123</Text>
          <Text style={styles.descricaoSolicitacao}>Disponível até: Hoje, 20:00</Text>
          <Text style={styles.descricaoSolicitacao}>
            Status: <Text style={{ color: theme.badgeAtivaText, fontWeight: 'bold' }}>Ativa</Text>
          </Text>
        </View>

        <Text style={styles.secaoTitulo}>SOLICITAÇÕES RECEBIDAS (2)</Text>

        {/* Solicitação 1 */}
        <View style={styles.cardSolicitacao}>
          <View style={styles.cardHeader}>
            <Text style={styles.nomeOng}>ONG Vida Nova</Text>
            <View style={styles.badgePendente}>
              <Text style={styles.badgePendenteTexto}>pendente</Text>
            </View>
          </View>
          <Text style={styles.descricaoSolicitacao}>Marmitas 5 unid.</Text>
          <View style={styles.botoesCard}>
            <TouchableOpacity style={styles.botaoAceitar} activeOpacity={0.8}>
              <Text style={styles.botaoAceitarTexto}>✓ Aceitar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botaoRecusar} activeOpacity={0.8}>
              <Text style={styles.botaoRecusarTexto}>× Recusar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Solicitação 2 */}
        <View style={styles.cardSolicitacao}>
          <View style={styles.cardHeader}>
            <Text style={styles.nomeOng}>Instituto Esperança</Text>
            <View style={styles.badgePendente}>
              <Text style={styles.badgePendenteTexto}>pendente</Text>
            </View>
          </View>
          <Text style={styles.descricaoSolicitacao}>Marmitas 3 unid.</Text>
          <View style={styles.botoesCard}>
            <TouchableOpacity style={styles.botaoAceitar} activeOpacity={0.8}>
              <Text style={styles.botaoAceitarTexto}>✓ Aceitar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botaoRecusar} activeOpacity={0.8}>
              <Text style={styles.botaoRecusarTexto}>× Recusar</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>

      <FooterDoador navigation={navigation} abaAtual="Doacoes" />
    </SafeAreaView>
  );
}