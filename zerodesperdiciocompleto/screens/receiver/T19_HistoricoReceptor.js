import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  SafeAreaView, StatusBar, Image, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../Styles';
import FooterReceptor from './FooterReceptor';

const RECEBIDAS = [
  { id: '1', titulo: 'Marmita Caseira',    detalhe: '10 unid · Pronto para consumo', data: '28 abr 2025', doador: 'Restaurante Sabor & Arte', imagem: 'https://img.freepik.com/fotos-premium/a-autentica-marmita-brasileira-mais-conhecida-como-marmitex-feita-com-comida-tradicional-do-brasil_496782-2496.jpg', avaliacao: 5 },
  { id: '2', titulo: 'Cesta de HortiFruti',detalhe: '~5 kg · Hortifruti',             data: '22 abr 2025', doador: 'Mercado Verde',            imagem: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=300',                                                                                                                                       avaliacao: 5 },
  { id: '3', titulo: 'Pães Frescos',        detalhe: '20 unid · Padaria',              data: '15 abr 2025', doador: 'Padaria Central',          imagem: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300',                                                                                                                                         avaliacao: 4 },
];

const ABAS = ['Todas', 'Este mês', 'Anteriores'];

export default function T19_HistoricoReceptor({ navigation }) {
  const [abaAtiva, setAbaAtiva] = useState('Todas');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#006B14" />

      {/* Header */}
      <View style={[styles.header, {
        height: 70, flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between', paddingTop: Platform.OS === 'android' ? 12 : 8,
      }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={[styles.saudacao, { fontSize: 20, paddingBottom: 0 }]}>Histórico</Text>
        <TouchableOpacity style={styles.menuIcone}>
          <Ionicons name="menu" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={[styles.statBox, { flex: 1, backgroundColor: '#006B14', borderRadius: 14, paddingVertical: 14, alignItems: 'center' }]}>
          <Text style={[styles.statNumber, { color: '#FFFFFF' }]}>23</Text>
          <Text style={[styles.statLabel, { color: 'rgba(255,255,255,0.8)' }]}>recebidas</Text>
        </View>
        <View style={[styles.statBox, { flex: 1, backgroundColor: '#F0F8F1', borderRadius: 14, paddingVertical: 14, alignItems: 'center', marginHorizontal: 10 }]}>
          <Text style={styles.statNumber}>4.8 ⭐</Text>
          <Text style={styles.statLabel}>avaliação</Text>
        </View>
        <View style={[styles.statBox, { flex: 1, backgroundColor: '#F0F8F1', borderRadius: 14, paddingVertical: 14, alignItems: 'center' }]}>
          <Text style={styles.statNumber}>52kg</Text>
          <Text style={styles.statLabel}>recebidos</Text>
        </View>
      </View>

      {/* Abas */}
      <View style={{ flexDirection: 'row', backgroundColor: '#FFDDAE', paddingHorizontal: 16, paddingVertical: 12, gap: 8 }}>
        {ABAS.map((aba) => (
          <TouchableOpacity
            key={aba}
            style={[styles.filtroBotao, abaAtiva === aba && styles.filtroBotaoAtivo]}
            onPress={() => setAbaAtiva(aba)}
            activeOpacity={0.8}
          >
            <Text style={[styles.filtroTexto, abaAtiva === aba && styles.filtroTextoAtivo]}>{aba}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lista */}
      <ScrollView
        style={styles.conteudo}
        contentContainerStyle={styles.conteudoContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.secaoTitulo}>{RECEBIDAS.length} doações recebidas</Text>

        {RECEBIDAS.map((item) => (
          <View key={item.id} style={styles.cardHistorico}>
            <Image source={{ uri: item.imagem }} style={[styles.cardImage, { width: 100, height: 110 }]} />
            <View style={[styles.cardContentHistorico, { padding: 12 }]}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Text style={[styles.cardTitle, { fontWeight: '700', flex: 1, marginRight: 6 }]}>{item.titulo}</Text>
                <View style={styles.btnConcluido}>
                  <Text style={styles.btnConcluidoText}>Recebido</Text>
                </View>
              </View>
              <Text style={styles.descricaoSolicitacao}>{item.detalhe}</Text>
              <View style={{ flexDirection: 'row', gap: 12, marginTop: 6, flexWrap: 'wrap' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Ionicons name="storefront-outline" size={13} color="#DA4A02" />
                  <Text style={{ fontSize: 11, color: '#888888' }}>{item.doador}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Ionicons name="calendar-outline" size={13} color="#888888" />
                  <Text style={{ fontSize: 11, color: '#888888' }}>{item.data}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', gap: 2, marginTop: 4 }}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <Ionicons key={n} name={n <= item.avaliacao ? 'star' : 'star-outline'} size={14} color="#FFC107" />
                ))}
              </View>
            </View>
          </View>
        ))}

        <View style={{ height: 20 }} />
      </ScrollView>

      <FooterReceptor navigation={navigation} abaAtual="Historico" />
    </SafeAreaView>
  );
}