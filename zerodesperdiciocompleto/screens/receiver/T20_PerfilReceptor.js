import React from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  SafeAreaView, StatusBar, Switch, Platform,
} from 'react-native';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';

// 1. Importando a função de estilos globais e o hook do contexto
import { getGlobalStyles } from '../../Styles';
import { useTheme } from '../../ThemeContext';

import FooterReceptor from './FooterReceptor';

const MENU_ITEMS = [
  { icone: 'user',                  lib: 'feather',  texto: 'Editar Perfil',   rota: null },
  { icone: 'key',                   lib: 'feather',  texto: 'Alterar Senha',   rota: 'RecuperarSenha' },
  { icone: 'notifications-outline', lib: 'ionicons', texto: 'Notificações',    rota: null },
  { icone: 'help-circle-outline',   lib: 'ionicons', texto: 'Ajuda e Suporte', rota: null },
];

export default function T20_PerfilReceptor({ navigation }) {
  // 2. Consumindo o tema atual e a função global de toggle
  const { theme, isDarkMode, toggleTheme } = useTheme();
  // 3. Injetando o tema nos estilos
  const styles = getGlobalStyles(theme);

  const renderIcone = (item) => {
    if (item.lib === 'feather') return <Feather name={item.icone} size={20} color={theme.primary} />;
    return <Ionicons name={item.icone} size={20} color={theme.primary} />;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 4. StatusBar dinâmica */}
      <StatusBar 
        barStyle={isDarkMode ? "light-content" : "dark-content"} 
        backgroundColor={theme.headerBackground} 
      />

      {/* Header */}
      <View style={[styles.header, {
        height: 70, flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between', paddingTop: Platform.OS === 'android' ? 12 : 8,
      }]}>
        <TouchableOpacity style={styles.menuIcone} activeOpacity={0.7}>
          <Ionicons name="menu" size={24} color={theme.headerTextInverse} />
        </TouchableOpacity>
        <Text style={[styles.saudacao, { fontSize: 20, paddingBottom: 0 }]}>Meu Perfil</Text>
        <View style={{ width: 38 }} />
      </View>

      {/* Avatar + stats */}
      <View style={[styles.header, { height: 'auto', paddingVertical: 28, alignItems: 'center', justifyContent: 'center' }]}>
        <View style={[styles.avatar, { width: 84, height: 84, borderRadius: 42, marginBottom: 12 }]}>
          <Text style={[styles.avatarEmoji, { fontSize: 36 }]}>🏘️</Text>
        </View>
        <Text style={[styles.saudacao, { paddingBottom: 4 }]}>Maria de Lourdes</Text>
        <Text style={{ fontSize: 13, color: isDarkMode ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.75)', marginBottom: 20 }}>
          Receptor · Fortaleza, CE
        </Text>

        <View style={[styles.resumoContainer, { width: '100%' }]}>
          <View style={[styles.resumoCard, { flex: 1, alignItems: 'center' }]}>
            <Text style={styles.resumoNumeroDestaque}>63</Text>
            <Text style={styles.resumoLabelDestaque}>Recebidas</Text>
          </View>
          <View style={{ width: 1, backgroundColor: 'rgba(255,255,255,0.25)' }} />
          <View style={[styles.resumoCard, { flex: 1, alignItems: 'center' }]}>
            <Text style={styles.resumoNumeroDestaque}>4,3 ⭐</Text>
            <Text style={styles.resumoLabelDestaque}>Avaliação</Text>
          </View>
          <View style={{ width: 1, backgroundColor: 'rgba(255,255,255,0.25)' }} />
          <View style={[styles.resumoCard, { flex: 1, alignItems: 'center' }]}>
            <Text style={styles.resumoNumeroDestaque}>180kg</Text>
            <Text style={styles.resumoLabelDestaque}>Recebidos</Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.conteudo}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Menu conta */}
        <Text style={styles.secaoTitulo}>CONTA</Text>
        <View style={styles.cardSolicitacao}>
          {MENU_ITEMS.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={[styles.menuItem, idx < MENU_ITEMS.length - 1 && styles.menuItemBorda]}
              onPress={() => item.rota && navigation.navigate(item.rota)}
              activeOpacity={0.7}
            >
              <View style={styles.infoIcone}>{renderIcone(item)}</View>
              <Text style={[styles.menuText, { flex: 1, color: theme.textPrimary }]}>{item.texto}</Text>
              <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Modo escuro */}
        <Text style={styles.secaoTitulo}>PREFERÊNCIAS</Text>
        <View style={styles.cardSolicitacao}>
          <View style={styles.menuItem}>
            <View style={styles.infoIcone}>
              <Feather name="moon" size={20} color={theme.primary} />
            </View>
            <Text style={[styles.menuText, { flex: 1, color: theme.textPrimary }]}>Modo Escuro</Text>
            <Switch
              value={isDarkMode} 
              onValueChange={toggleTheme} 
              trackColor={{ false: '#EEEEEE', true: theme.primary }}
              thumbColor={isDarkMode ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>
        </View>

        {/* Sessão */}
        <Text style={styles.secaoTitulo}>SESSÃO</Text>
        <View style={styles.cardSolicitacao}>
          <TouchableOpacity
            style={[styles.menuItem, styles.menuItemBorda]}
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.7}
          >
            <View style={[styles.infoIcone, { backgroundColor: isDarkMode ? 'rgba(218, 74, 2, 0.15)' : '#FFF3E0' }]}>
              <MaterialIcons name="logout" size={20} color={theme.secondary} />
            </View>
            <Text style={[styles.menuText, { flex: 1, color: theme.secondary }]}>Sair da Conta</Text>
            <Ionicons name="chevron-forward" size={18} color={theme.secondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <View style={[styles.infoIcone, { backgroundColor: isDarkMode ? 'rgba(211, 47, 47, 0.15)' : '#FFEBEE' }]}>
              <Feather name="trash-2" size={20} color="#D32F2F" />
            </View>
            <Text style={[styles.menuText, { flex: 1, color: '#D32F2F' }]}>Excluir Conta</Text>
            <Ionicons name="chevron-forward" size={18} color="#D32F2F" />
          </TouchableOpacity>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      <FooterReceptor navigation={navigation} abaAtual="Perfil" />
    </SafeAreaView>
  );
}