import React from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  SafeAreaView, StatusBar,
} from 'react-native';
import styles from '../../Styles';
import FooterDoador from './FooterDoador';

export default function T07_MinhasDoacoes({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#006B14" />

      {/* Header */}
      <View style={[styles.header, { height: 130 }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.menuIconeTexto}>←</Text>
          </TouchableOpacity>
          <Text style={styles.saudacao}>Minhas Doações</Text>
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
        {/* Filtros */}
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20 }}>
          <TouchableOpacity style={[styles.badgePendente, { backgroundColor: '#006B14' }]}>
            <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Todos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.badgePendente}>
            <Text style={styles.badgePendenteTexto}>Concluídos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.badgePendente}>
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
          >
            <Text style={styles.botaoAceitarTexto}>ver →</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      <FooterDoador navigation={navigation} abaAtual="Doacoes" />
    </SafeAreaView>
  );
}