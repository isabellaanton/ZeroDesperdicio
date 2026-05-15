import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  SafeAreaView, StatusBar, StyleSheet, Platform, Switch,
} from 'react-native';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import FooterReceptor from './FooterReceptor'; 

const VERDE       = '#006B14';
const VERDE_LIGHT = '#E8F5E9';
const LARANJA     = '#DA4A02';
const CINZA       = '#888888';
const BORDA       = '#EEEEEE';
const BRANCO      = '#FFFFFF';
const TEXTO       = '#1A1A1A';
const BG          = '#FFDDAE';
const VERMELHO    = '#D32F2F';

const MENU_ITEMS = [
  { icone: 'user',                  lib: 'feather',  texto: 'Editar Perfil',    rota: 'EditarPerfil' },
  { icone: 'key',                   lib: 'feather',  texto: 'Alterar Senha',    rota: 'RecuperarSenha' },
  { icone: 'notifications-outline', lib: 'ionicons', texto: 'Notificações',     rota: 'NotificacaoDoador' },
  { icone: 'help-circle-outline',   lib: 'ionicons', texto: 'Ajuda e Suporte',  rota: 'NotificacaoReceptor' },
];

export default function T20_PerfilReceptor({ navigation }) {
  const [modoEscuro, setModoEscuro] = useState(false);

  const renderIcone = (item) => {
    if (item.lib === 'feather')
      return <Feather name={item.icone} size={20} color={VERDE} />;
    return <Ionicons name={item.icone} size={20} color={VERDE} />;
  };

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="light-content" backgroundColor={VERDE} />

      {/* ── HEADER ── */}
      <View style={s.header}>
        <TouchableOpacity style={s.menuBtn}>
          <Ionicons name="menu" size={24} color={BRANCO} />
        </TouchableOpacity>
        <Text style={s.headerTitulo}>Meu Perfil</Text>
        <View style={{ width: 38 }} />
      </View>

      {/* ── AVATAR + NOME ── */}
      <View style={s.avatarSection}>
        <View style={s.avatarCirculo}>
          <Text style={s.avatarEmoji}>🏘️</Text>
        </View>
        <Text style={s.nomeTexto}>Maria de Lourdes</Text>
        <Text style={s.subTexto}>Receptor · Fortaleza, CE</Text>

        {/* Stats */}
        <View style={s.statsRow}>
          <View style={s.statItem}>
            <Text style={s.statNum}>63</Text>
            <Text style={s.statLabel}>Recebidas</Text>
          </View>
          <View style={s.statDivisor} />
          <View style={s.statItem}>
            <Text style={s.statNum}>4,3 ⭐</Text>
            <Text style={s.statLabel}>Avaliação</Text>
          </View>
          <View style={s.statDivisor} />
          <View style={s.statItem}>
            <Text style={s.statNum}>180kg</Text>
            <Text style={s.statLabel}>Recebidos</Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── MENU ── */}
        <Text style={s.secaoTitulo}>CONTA</Text>
        <View style={s.menuCard}>
          {MENU_ITEMS.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={[s.menuItem, idx < MENU_ITEMS.length - 1 && s.menuItemBorda]}
              onPress={() => item.rota && navigation.navigate(item.rota)}
              activeOpacity={0.7}
            >
              <View style={s.menuIconeBox}>
                {renderIcone(item)}
              </View>
              <Text style={s.menuTexto}>{item.texto}</Text>
              <Ionicons name="chevron-forward" size={18} color={CINZA} />
            </TouchableOpacity>
          ))}
        </View>

        {/* ── MODO ESCURO ── */}
        <Text style={s.secaoTitulo}>PREFERÊNCIAS</Text>
        <View style={s.menuCard}>
          <View style={s.menuItem}>
            <View style={s.menuIconeBox}>
              <Feather name="moon" size={20} color={VERDE} />
            </View>
            <Text style={[s.menuTexto, { flex: 1 }]}>Modo Escuro</Text>
            <Switch
              value={modoEscuro}
              onValueChange={setModoEscuro}
              trackColor={{ false: BORDA, true: VERDE }}
              thumbColor={BRANCO}
            />
          </View>
        </View>

        {/* ── SAIR / EXCLUIR ── */}
        <Text style={s.secaoTitulo}>SESSÃO</Text>
        <View style={s.menuCard}>
          <TouchableOpacity
            style={[s.menuItem, s.menuItemBorda]}
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.7}
          >
            <View style={[s.menuIconeBox, { backgroundColor: '#FFF3E0' }]}>
              <MaterialIcons name="logout" size={20} color={LARANJA} />
            </View>
            <Text style={[s.menuTexto, { color: LARANJA }]}>Sair da Conta</Text>
            <Ionicons name="chevron-forward" size={18} color={LARANJA} />
          </TouchableOpacity>

          <TouchableOpacity style={s.menuItem} activeOpacity={0.7}>
            <View style={[s.menuIconeBox, { backgroundColor: '#FFEBEE' }]}>
              <Feather name="trash-2" size={20} color={VERMELHO} />
            </View>
            <Text style={[s.menuTexto, { color: VERMELHO }]}>Excluir Conta</Text>
            <Ionicons name="chevron-forward" size={18} color={VERMELHO} />
          </TouchableOpacity>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>


      {/* ── FOOTER ── */}
      <FooterReceptor navigation={navigation} abaAtual="Perfil" />

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
  menuBtn: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },
  headerTitulo: { color: BRANCO, fontSize: 20, fontWeight: '700' },

  avatarSection: {
    backgroundColor: VERDE,
    alignItems: 'center',
    paddingBottom: 28,
    paddingHorizontal: 20,
  },
  avatarCirculo: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarEmoji: { fontSize: 36 },
  nomeTexto: { fontSize: 22, fontWeight: '800', color: BRANCO, marginBottom: 4 },
  subTexto: { fontSize: 13, color: 'rgba(255,255,255,0.75)', marginBottom: 20 },

  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
  },
  statItem: { flex: 1, alignItems: 'center' },
  statNum: { fontSize: 18, fontWeight: '800', color: BRANCO },
  statLabel: { fontSize: 11, color: 'rgba(255,255,255,0.75)', marginTop: 2 },
  statDivisor: { width: 1, height: 36, backgroundColor: 'rgba(255,255,255,0.25)' },

  scroll: { flex: 1 },
  scrollContent: { padding: 16 },

  secaoTitulo: {
    fontSize: 11, fontWeight: '700', color: CINZA,
    textTransform: 'uppercase', letterSpacing: 1,
    marginBottom: 8, marginTop: 8, marginLeft: 4,
  },

  menuCard: {
    backgroundColor: BRANCO,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 15,
    gap: 14,
  },
  menuItemBorda: {
    borderBottomWidth: 1,
    borderBottomColor: BORDA,
  },
  menuIconeBox: {
    width: 38, height: 38,
    borderRadius: 10,
    backgroundColor: VERDE_LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTexto: { flex: 1, fontSize: 15, color: TEXTO, fontWeight: '500' },

});