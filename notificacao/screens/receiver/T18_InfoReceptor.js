import React from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  SafeAreaView, StatusBar, StyleSheet, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FooterReceptor from './FooterReceptor'; 

const VERDE       = '#006B14';
const VERDE_LIGHT = '#E8F5E9';
const LARANJA     = '#DA4A02';
const CINZA       = '#888888';
const BORDA       = '#EEEEEE';
const BRANCO      = '#FFFFFF';
const TEXTO       = '#1A1A1A';
const BG          = '#FFDDAE';

const RECEPTOR = {
  nome: 'ONG Vida Nova',
  tipo: 'Instituição Beneficiária',
  membro_desde: 'mar/2023',
  stats: { recebidas: 152, avaliacao: '4.9' },
  endereco: 'Rua das Flores, 123 — Centro',
  telefone: '(11) 98765-4321',
  email: 'contato@vidanova.org.br',
  horario: 'Seg – Sex, das 08h às 17h',
  sobre:
    'Atuamos há mais de 10 anos no combate à fome na região central, distribuindo marmitas e cestas básicas para famílias em situação de vulnerabilidade social. Nosso foco é o aproveitamento total de alimentos.',
};

export default function T18_InfoReceptor({ navigation }) {
  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="light-content" backgroundColor={VERDE} />

      {/* ── HEADER ── */}
      <View style={s.header}>
        <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={BRANCO} />
        </TouchableOpacity>
        <Text style={s.headerTitulo}>Info do Receptor</Text>
        <View style={{ width: 38 }} />
      </View>

      {/* ── AVATAR SECTION ── */}
      <View style={s.avatarSection}>
        <View style={s.avatarCirculo}>
          <Text style={s.avatarEmoji}>🏘️</Text>
        </View>
        <Text style={s.nomeTexto}>{RECEPTOR.nome}</Text>
        <Text style={s.subTexto}>{RECEPTOR.tipo}</Text>
        <Text style={s.membroTexto}>Membro desde {RECEPTOR.membro_desde}</Text>

        {/* Stats */}
        <View style={s.statsRow}>
          <View style={s.statItem}>
            <Text style={s.statNum}>{RECEPTOR.stats.recebidas}</Text>
            <Text style={s.statLabel}>Recebidas</Text>
          </View>
          <View style={s.statDivisor} />
          <View style={s.statItem}>
            <Text style={s.statNum}>{RECEPTOR.stats.avaliacao} ⭐</Text>
            <Text style={s.statLabel}>Avaliação</Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── CONTATO ── */}
        <Text style={s.secaoTitulo}>DADOS DE CONTATO</Text>
        <View style={s.card}>
          <InfoRow icone="location-outline"  label="Endereço"   valor={RECEPTOR.endereco} />
          <InfoRow icone="call-outline"       label="Telefone"   valor={RECEPTOR.telefone} />
          <InfoRow icone="mail-outline"       label="E-mail"     valor={RECEPTOR.email} />
          <InfoRow icone="time-outline"       label="Horário"    valor={RECEPTOR.horario} ultimo />
        </View>

        {/* ── SOBRE ── */}
        <Text style={s.secaoTitulo}>SOBRE A INSTITUIÇÃO</Text>
        <View style={s.card}>
          <View style={s.sobreRow}>
            <View style={s.sobreIconeBox}>
              <Ionicons name="information-circle-outline" size={20} color={VERDE} />
            </View>
            <Text style={s.sobreTexto}>{RECEPTOR.sobre}</Text>
          </View>
        </View>

    

        <View style={{ height: 20 }} />
      </ScrollView>


      {/* ── FOOTER ── */}
      <FooterReceptor navigation={navigation} abaAtual="Info" />

    </SafeAreaView>
  );
}

function InfoRow({ icone, label, valor, ultimo }) {
  return (
    <View style={[s.infoRow, ultimo && { borderBottomWidth: 0, paddingBottom: 0 }]}>
      <View style={s.infoIconeBox}>
        <Ionicons name={icone} size={17} color={VERDE} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={s.infoLabel}>{label}</Text>
        <Text style={s.infoValor}>{valor}</Text>
      </View>
    </View>
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
  headerTitulo: { color: BRANCO, fontSize: 18, fontWeight: '700' },

  avatarSection: {
    backgroundColor: VERDE,
    alignItems: 'center',
    paddingBottom: 28,
    paddingHorizontal: 20,
  },
  avatarCirculo: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 10,
  },
  avatarEmoji: { fontSize: 34 },
  nomeTexto: { fontSize: 22, fontWeight: '800', color: BRANCO, marginBottom: 4 },
  subTexto: { fontSize: 13, color: 'rgba(255,255,255,0.75)' },
  membroTexto: { fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 18, marginTop: 2 },

  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statItem: { flex: 1, alignItems: 'center' },
  statNum: { fontSize: 20, fontWeight: '800', color: BRANCO },
  statLabel: { fontSize: 11, color: 'rgba(255,255,255,0.75)', marginTop: 2 },
  statDivisor: { width: 1, height: 36, backgroundColor: 'rgba(255,255,255,0.25)' },

  scroll: { flex: 1 },
  scrollContent: { padding: 16 },

  secaoTitulo: {
    fontSize: 11, fontWeight: '700', color: CINZA,
    textTransform: 'uppercase', letterSpacing: 1,
    marginBottom: 10, marginLeft: 2,
  },

  card: {
    backgroundColor: BRANCO,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: BORDA,
  },
  infoIconeBox: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: VERDE_LIGHT,
    alignItems: 'center', justifyContent: 'center',
  },
  infoLabel: {
    fontSize: 11, color: CINZA, fontWeight: '600',
    textTransform: 'uppercase', letterSpacing: 0.4,
  },
  infoValor: { fontSize: 14, color: TEXTO, fontWeight: '500', marginTop: 1 },

  sobreRow: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  sobreIconeBox: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: VERDE_LIGHT,
    alignItems: 'center', justifyContent: 'center',
    marginTop: 2,
  },
  sobreTexto: { flex: 1, fontSize: 14, color: TEXTO, lineHeight: 22 },
  
});