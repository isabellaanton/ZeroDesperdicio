import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  SafeAreaView, StatusBar, Image, StyleSheet, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FooterDoador from './FooterDoador'; 

const VERDE       = '#006B14';
const VERDE_LIGHT = '#E8F5E9';
const LARANJA     = '#DA4A02';
const BEGE        = '#FFD2AE';
const CINZA       = '#888888';
const BORDA       = '#EEEEEE';
const BRANCO      = '#FFFFFF';
const TEXTO       = '#1A1A1A';
const BG          = '#FFDDAE';

const DOACOES = [
  {
    id: '1',
    titulo: 'Marmita Caseira',
    detalhe: '10 unid · Pronto para consumo',
    data: '28 abr 2025',
    receptor: 'ONG Vida Nova',
    imagem: 'https://img.freepik.com/fotos-premium/a-autentica-marmita-brasileira-mais-conhecida-como-marmitex-feita-com-comida-tradicional-do-brasil_496782-2496.jpg',
    avaliacao: 5,
  },
  {
    id: '2',
    titulo: 'Pães Frescos',
    detalhe: '20 unid · Padaria',
    data: '22 abr 2025',
    receptor: 'Instituto Esperança',
    imagem: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300',
    avaliacao: 5,
  },
  {
    id: '3',
    titulo: 'Cesta de Legumes',
    detalhe: '~5 kg · Hortifruti',
    data: '15 abr 2025',
    receptor: 'Casa do Menor',
    imagem: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=300',
    avaliacao: 4,
  },
  {
    id: '4',
    titulo: 'Arroz e Feijão',
    detalhe: '10 kg · Grãos',
    data: '10 abr 2025',
    receptor: 'ONG Vida Nova',
    imagem: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300',
    avaliacao: 5,
  },
];

const ABAS = ['Todas', 'Este mês', 'Anteriores'];

export default function T10_HistoricoDoador({ navigation }) {
  const [abaAtiva, setAbaAtiva] = useState('Todas');

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="light-content" backgroundColor={VERDE} />

      {/* ── HEADER ── */}
      <View style={s.header}>
        <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={BRANCO} />
        </TouchableOpacity>
        <Text style={s.headerTitulo}>Histórico</Text>
        <TouchableOpacity style={s.menuBtn}>
          <Ionicons name="menu" size={24} color={BRANCO} />
        </TouchableOpacity>
      </View>

      {/* ── STATS ── */}
      <View style={s.statsContainer}>
        <View style={[s.statCard, { backgroundColor: VERDE }]}>
          <Text style={s.statNumDestaque}>34</Text>
          <Text style={s.statLabelDestaque}>doações</Text>
        </View>
        <View style={s.statCard}>
          <Text style={s.statNum}>4.9 ⭐</Text>
          <Text style={s.statLabel}>avaliação</Text>
        </View>
        <View style={s.statCard}>
          <Text style={s.statNum}>128kg</Text>
          <Text style={s.statLabel}>doados</Text>
        </View>
      </View>

      {/* ── ABAS ── */}
      <View style={s.abasRow}>
        {ABAS.map((aba) => (
          <TouchableOpacity
            key={aba}
            style={[s.abaBtn, abaAtiva === aba && s.abaBtnAtiva]}
            onPress={() => setAbaAtiva(aba)}
            activeOpacity={0.8}
          >
            <Text style={[s.abaTexto, abaAtiva === aba && s.abaTextoAtivo]}>
              {aba}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ── LISTA ── */}
      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={s.secaoTitulo}>{DOACOES.length} doações encontradas</Text>

        {DOACOES.map((item) => (
          <View key={item.id} style={s.card}>
            <Image source={{ uri: item.imagem }} style={s.cardImagem} />
            <View style={s.cardBody}>
              <View style={s.cardTopo}>
                <Text style={s.cardTitulo}>{item.titulo}</Text>
                <View style={s.badgeConcluido}>
                  <Text style={s.badgeConcluidoTexto}>Concluído</Text>
                </View>
              </View>
              <Text style={s.cardDetalhe}>{item.detalhe}</Text>
              <View style={s.cardRodape}>
                <View style={s.cardRodapeItem}>
                  <Ionicons name="heart-outline" size={13} color={LARANJA} />
                  <Text style={s.cardRodapeTexto}>{item.receptor}</Text>
                </View>
                <View style={s.cardRodapeItem}>
                  <Ionicons name="calendar-outline" size={13} color={CINZA} />
                  <Text style={s.cardRodapeTexto}>{item.data}</Text>
                </View>
              </View>
              {/* Estrelas */}
              <View style={s.estrelasRow}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <Ionicons
                    key={n}
                    name={n <= item.avaliacao ? 'star' : 'star-outline'}
                    size={14}
                    color="#FFC107"
                  />
                ))}
              </View>
            </View>
          </View>
        ))}

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* ── FOOTER CORRIGIDO AQUI ── */}
      <FooterDoador navigation={navigation} abaAtual="Historico" />

    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },

  header: {
    backgroundColor: VERDE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 12 : 8,
    paddingBottom: 14,
  },
  backBtn: {
    width: 38, height: 38,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 19,
    alignItems: 'center', justifyContent: 'center',
  },
  menuBtn: {
    width: 38, height: 38,
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitulo: { color: BRANCO, fontSize: 20, fontWeight: '700' },

  statsContainer: {
    flexDirection: 'row',
    backgroundColor: BG,
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: BORDA,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#F0F8F1',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statNum: { fontSize: 18, fontWeight: '800', color: TEXTO },
  statNumDestaque: { fontSize: 18, fontWeight: '800', color: BRANCO },
  statLabel: { fontSize: 11, color: CINZA, marginTop: 2 },
  statLabelDestaque: { fontSize: 11, color: 'rgba(255,255,255,0.8)', marginTop: 2 },

  abasRow: {
    flexDirection: 'row',
    backgroundColor: BG,
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 4,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: BORDA,
  },
  abaBtn: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
  },
  abaBtnAtiva: { backgroundColor: VERDE },
  abaTexto: { fontSize: 13, color: CINZA, fontWeight: '600' },
  abaTextoAtivo: { color: BRANCO },

  scroll: { flex: 1 },
  scrollContent: { padding: 16 },
  secaoTitulo: {
    fontSize: 12, fontWeight: '700', color: CINZA,
    textTransform: 'uppercase', letterSpacing: 0.8,
    marginBottom: 14,
  },

  card: {
    backgroundColor: BRANCO,
    borderRadius: 16,
    marginBottom: 14,
    overflow: 'hidden',
    flexDirection: 'row',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
  },
  cardImagem: { width: 100, height: 110 },
  cardBody: { flex: 1, padding: 12, justifyContent: 'space-between' },
  cardTopo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  cardTitulo: { fontSize: 15, fontWeight: '700', color: TEXTO, flex: 1, marginRight: 6 },
  cardDetalhe: { fontSize: 12, color: CINZA, marginTop: 2 },
 
  badgeConcluido: {
    backgroundColor: VERDE_LIGHT,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeConcluidoTexto: { fontSize: 10, fontWeight: '700', color: VERDE },

  cardRodape: { flexDirection: 'row', gap: 12, marginTop: 6 },
  cardRodapeItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  cardRodapeTexto: { fontSize: 11, color: CINZA },

  estrelasRow: { flexDirection: 'row', gap: 2, marginTop: 4 },
});