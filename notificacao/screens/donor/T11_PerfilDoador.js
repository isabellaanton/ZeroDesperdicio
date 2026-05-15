import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  SafeAreaView, StatusBar, StyleSheet, Platform, Switch,
} from 'react-native';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import FooterDoador from './FooterDoador'; 
import ResumoPerfil from './ResumoPerfil'; // <-- Importando o componente

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
  { icone: 'user',                  lib: 'feather',   texto: 'Editar Perfil',    rota: 'EditarPerfil' },
  { icone: 'key',                   lib: 'feather',   texto: 'Alterar Senha',    rota: 'RecuperarSenha' },
  { icone: 'notifications-outline', lib: 'ionicons',  texto: 'Notificações',     rota: 'NotificacaoDoador' },
  { icone: 'help-circle-outline',   lib: 'ionicons',  texto: 'Ajuda e Suporte',  rota: 'NotificacaoReceptor' },
];

export default function T11_PerfilDoador({ navigation }) {
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

      {/* ── RESUMO REUTILIZÁVEL ── */}
      <ResumoPerfil 
        emoji="🧑‍🍳"
        nome="Maria Aparecida"
        subtitulo="Doador · Fortaleza, CE"
        stats={[
          { valor: '53', label: 'Doações' },
          { valor: '4,9 ⭐', label: 'Avaliação' },
          { valor: '210kg', label: 'Doados' }
        ]}
      />

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

        <Text style={s.versaoTexto}>ZeroDesperdício v1.0.0</Text>
        <View style={{ height: 20 }} />
      </ScrollView>

      {/* ── FOOTER ── */}
      <FooterDoador navigation={navigation} abaAtual="Perfil" />

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
    borderRadius: 10,
    backgroundColor: VERDE_LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTexto: { flex: 1, fontSize: 15, color: TEXTO, fontWeight: '500' },

  versaoTexto: {
    textAlign: 'center',
    fontSize: 12,
    color: CINZA,
    marginTop: 8,
    marginBottom: 4,
  },
});