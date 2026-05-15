import React from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  SafeAreaView, StatusBar, Image, StyleSheet, Platform,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import FooterReceptor from './FooterReceptor'; 

const VERDE       = '#006B14';
const VERDE_LIGHT = '#E8F5E9';
const LARANJA     = '#DA4A02';
const CINZA       = '#888888';
const BORDA       = '#EEEEEE';
const BRANCO      = '#FFFFFF';
const TEXTO       = '#1A1A1A';
const BG          = '#FFDDAE';
const BEGE_CARD   = '#FFD2AE';

export default function T14_DetalheDoacaoReceptor({ navigation, route }) {
  // Dados via route.params ou mock
  const doacao = route?.params?.doacao ?? {
    nome: 'Marmita Caseira',
    tipo: 'Pronto para consumo',
    quantidade: '10 unidades',
    disponivel: 'Hoje, 20:00',
    distancia: '1,2 km',
    endereco: 'Rua das Flores, 123 — Meireles',
    doador: 'Restaurante Sabor & Arte',
    avaliacao: '4.9',
    imagem: 'https://img.freepik.com/fotos-premium/a-autentica-marmita-brasileira-mais-conhecida-como-marmitex-feita-com-comida-tradicional-do-brasil_496782-2496.jpg',
    status: 'Disponível',
  };

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="light-content" backgroundColor={VERDE} />

      {/* ── HEADER ── */}
      <View style={s.header}>
        <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={BRANCO} />
        </TouchableOpacity>
        <Text style={s.headerTitulo}>Detalhes da Doação</Text>
        <View style={{ width: 38 }} />
      </View>

      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── IMAGEM ── */}
        <View style={s.imagemContainer}>
          <Image source={{ uri: doacao.imagem }} style={s.imagem} />
          <View style={s.badgeStatus}>
            <View style={s.badgePonto} />
            <Text style={s.badgeStatusTexto}>{doacao.status}</Text>
          </View>
        </View>

        {/* ── TÍTULO ── */}
        <View style={s.tituloSection}>
          <Text style={s.nomeDoacaoTexto}>{doacao.nome}</Text>
          <View style={s.distanciaRow}>
            <Ionicons name="location-outline" size={15} color={LARANJA} />
            <Text style={s.distanciaTexto}>{doacao.distancia} de distância</Text>
          </View>
        </View>

        {/* ── CARD DETALHES ── */}
        <Text style={s.secaoTitulo}>INFORMAÇÕES</Text>
        <View style={s.card}>
          <InfoRow icone="fast-food-outline"     lib="ion" label="Tipo"           valor={doacao.tipo} />
          <InfoRow icone="layers-outline"        lib="ion" label="Quantidade"     valor={doacao.quantidade} />
          <InfoRow icone="time-outline"          lib="ion" label="Disponível até" valor={doacao.disponivel} />
          <InfoRow icone="location-outline"      lib="ion" label="Endereço"       valor={doacao.endereco} ultimo />
        </View>

        {/* ── CARD DOADOR ── */}
        <Text style={s.secaoTitulo}>DOADOR</Text>
        <View style={s.cardDoador}>
          <View style={s.doadorAvatar}>
            <Text style={s.doadorAvatarEmoji}>🧑‍🍳</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.doadorNome}>{doacao.doador}</Text>
            <View style={s.avaliacaoRow}>
              {[1,2,3,4,5].map((n) => (
                <Ionicons key={n} name="star" size={13} color="#FFC107" />
              ))}
              <Text style={s.avaliacaoTexto}>{doacao.avaliacao}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={s.btnVerPerfil}
            onPress={() => navigation.navigate('InfoDoador')}
            activeOpacity={0.8}
          >
            <Text style={s.btnVerPerfilTexto}>Ver perfil</Text>
          </TouchableOpacity>
        </View>

        {/* ── BOTÕES DE AÇÃO ── */}
        <TouchableOpacity
          style={s.btnMapa}
          onPress={() => navigation.navigate('MapaDoacoes')}
          activeOpacity={0.85}
        >
          <Ionicons name="map-outline" size={18} color={VERDE} />
          <Text style={s.btnMapaTexto}>Ver no Mapa</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={s.btnSolicitar}
          onPress={() => navigation.navigate('ConfirmarSolicitacao', { doacao })}
          activeOpacity={0.85}
        >
          <Text style={s.btnSolicitarTexto}>Solicitar Doação</Text>
          <Ionicons name="arrow-forward" size={18} color={BRANCO} />
        </TouchableOpacity>

        <View style={{ height: 20 }} />
      </ScrollView>


      {/* ── FOOTER ── */}
      <FooterReceptor navigation={navigation} abaAtual="Pedidos" />

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

  scroll: { flex: 1 },
  scrollContent: { padding: 16 },

  // Imagem
  imagemContainer: { borderRadius: 18, overflow: 'hidden', marginBottom: 16, position: 'relative' },
  imagem: { width: '100%', height: 220 },
  badgeStatus: {
    position: 'absolute', top: 12, right: 12,
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5,
  },
  badgePonto: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#4CAF50' },
  badgeStatusTexto: { color: BRANCO, fontSize: 12, fontWeight: '600' },

  // Título
  tituloSection: { marginBottom: 20 },
  nomeDoacaoTexto: { fontSize: 24, fontWeight: '800', color: TEXTO, marginBottom: 6 },
  distanciaRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  distanciaTexto: { fontSize: 13, color: LARANJA, fontWeight: '600' },

  // Seção título
  secaoTitulo: {
    fontSize: 11, fontWeight: '700', color: CINZA,
    textTransform: 'uppercase', letterSpacing: 1,
    marginBottom: 10, marginLeft: 2,
  },

  // Card infos
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
  infoLabel: { fontSize: 11, color: CINZA, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.4 },
  infoValor: { fontSize: 14, color: TEXTO, fontWeight: '500', marginTop: 1 },

  // Card doador
  cardDoador: {
    backgroundColor: BRANCO,
    borderRadius: 16,
    padding: 14,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  doadorAvatar: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: VERDE_LIGHT,
    alignItems: 'center', justifyContent: 'center',
  },
  doadorAvatarEmoji: { fontSize: 22 },
  doadorNome: { fontSize: 15, fontWeight: '700', color: TEXTO, marginBottom: 4 },
  avaliacaoRow: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  avaliacaoTexto: { fontSize: 12, color: CINZA, marginLeft: 4 },
  btnVerPerfil: {
    borderWidth: 1.5, borderColor: VERDE,
    borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6,
  },
  btnVerPerfilTexto: { fontSize: 12, color: VERDE, fontWeight: '600' },

  // Botões
  btnMapa: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 2,
    borderColor: VERDE,
    borderRadius: 14,
    paddingVertical: 14,
    marginBottom: 12,
    backgroundColor: BRANCO,
  },
  btnMapaTexto: { fontSize: 16, fontWeight: '700', color: VERDE },
  btnSolicitar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: LARANJA,
    borderRadius: 14,
    paddingVertical: 16,
    elevation: 3,
    shadowColor: LARANJA,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  btnSolicitarTexto: { fontSize: 16, fontWeight: '700', color: BRANCO },

});