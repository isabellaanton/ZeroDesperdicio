import React from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  SafeAreaView, StatusBar,
} from 'react-native';
import styles from '../../Styles';
import FooterDoador from './FooterDoador';

export default function T08_DetalheDoacaoDoador({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#006B14" />

      {/* Header */}
      <View style={[styles.header, { height: 110 }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.menuIconeTexto}>←</Text>
          </TouchableOpacity>
          <Text style={[styles.saudacao, { fontSize: 20, paddingBottom: 0 }]}>Detalhes da Doação</Text>
          <TouchableOpacity style={styles.menuIcone}>
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
        <View style={[styles.cardSolicitacao, { backgroundColor: '#FFE4C4' }]}>
          <Text style={[styles.nomeOng, { fontSize: 20 }]}>Marmitas</Text>
          <Text style={styles.descricaoSolicitacao}>10 unid • Prontas para Consumo</Text>
          <View style={{ height: 1, backgroundColor: '#555', marginVertical: 10, opacity: 0.2 }} />
          <Text style={styles.descricaoSolicitacao}>Local: Rua Das Flores, 123</Text>
          <Text style={styles.descricaoSolicitacao}>Disponível até: Hoje, 20:00</Text>
          <Text style={styles.descricaoSolicitacao}>
            Status: <Text style={{ color: 'green', fontWeight: 'bold' }}>Ativa</Text>
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
            <TouchableOpacity style={styles.botaoAceitar}>
              <Text style={styles.botaoAceitarTexto}>✓ Aceitar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botaoRecusar}>
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
            <TouchableOpacity style={styles.botaoAceitar}>
              <Text style={styles.botaoAceitarTexto}>✓ Aceitar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botaoRecusar}>
              <Text style={styles.botaoRecusarTexto}>× Recusar</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>

      <FooterDoador navigation={navigation} abaAtual="Doacoes" />
    </SafeAreaView>
  );
}