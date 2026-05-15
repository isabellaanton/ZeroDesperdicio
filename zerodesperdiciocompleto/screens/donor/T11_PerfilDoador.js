import React from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  SafeAreaView, StatusBar, Switch, Platform,
} from 'react-native';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { getGlobalStyles } from '../../Styles'; 
import { useTheme } from '../../ThemeContext'; // <-- HOOK IMPORTADO
import FooterDoador from './FooterDoador';
import ResumoPerfil from './ResumoPerfil';

const MENU_ITEMS = [
  { icone: 'user', lib: 'feather', texto: 'Editar Perfil', rota: null },
  { icone: 'key', lib: 'feather', texto: 'Alterar Senha', rota: 'RecuperarSenha' }, 
  { icone: 'notifications-outline', lib: 'ionicons', texto: 'Notificações', rota: null },
  { icone: 'help-circle-outline', lib: 'ionicons', texto: 'Ajuda e Suporte', rota: null },
];

export default function T11_PerfilDoador({ navigation }) {
  // Puxando estado e função global de tema!
  const { theme, isDarkMode, toggleTheme } = useTheme(); 
  const styles = getGlobalStyles(theme); // Estilos dinâmicos gerados

  const renderIcone = (item) => {
    if (item.lib === 'feather') return <Feather name={item.icone} size={20} color={theme.primary} />;
    return <Ionicons name={item.icone} size={20} color={theme.primary} />;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={theme.headerBackground} />

      <View style={[styles.header, { height: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: Platform.OS === 'android' ? 12 : 8 }]}>
        <TouchableOpacity style={styles.menuIcone}>
          <Ionicons name="menu" size={24} color={theme.mode === 'dark' ? theme.textPrimary : '#FFFFFF'} />
        </TouchableOpacity>
        <Text style={[styles.saudacao, { fontSize: 20, paddingBottom: 0 }]}>Meu Perfil</Text>
        <View style={{ width: 38 }} />
      </View>

      <ScrollView style={styles.conteudo} showsVerticalScrollIndicator={false}>
        <ResumoPerfil
          emoji="🧑‍🍳"
          nome="Maria Aparecida"
          subtitulo="Doador · Fortaleza, CE"
          stats={[
            { valor: '53', label: 'Doações' },
            { valor: '4,9 ⭐', label: 'Avaliação' },
            { valor: '210kg', label: 'Doados' },
          ]}
          theme={theme} // Passar theme caso o ResumoPerfil não consuma o Context diretamente
        />

        <Text style={styles.secaoTitulo}>CONTA</Text>
        <View style={styles.cardSolicitacao}>
          {MENU_ITEMS.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={[styles.menuItem, idx < MENU_ITEMS.length - 1 && styles.menuItemBorda]}
              onPress={() => item.rota && navigation.navigate(item.rota)}
            >
              <View style={styles.infoIcone}>{renderIcone(item)}</View>
              <Text style={[styles.menuText, { flex: 1, color: theme.textPrimary }]}>{item.texto}</Text>
              <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.secaoTitulo}>PREFERÊNCIAS</Text>
        <View style={styles.cardSolicitacao}>
          <View style={styles.menuItem}>
            <View style={styles.infoIcone}><Feather name="moon" size={20} color={theme.primary} /></View>
            <Text style={[styles.menuText, { flex: 1, color: theme.textPrimary }]}>Modo Escuro</Text>
            {/* TOGGLE REAL CONECTADO AO CONTEXT API */}
            <Switch 
              value={isDarkMode} 
              onValueChange={toggleTheme} 
              trackColor={{ false: '#EEEEEE', true: theme.primary }} 
              thumbColor={isDarkMode ? '#FFF' : '#FFF'}
            />
          </View>
        </View>

        <Text style={styles.secaoTitulo}>SESSÃO</Text>
        <View style={styles.cardSolicitacao}>
          <TouchableOpacity style={[styles.menuItem, styles.menuItemBorda]} onPress={() => navigation.navigate('Login')}>
            <View style={[styles.infoIcone, { backgroundColor: isDarkMode ? '#4A2A1A' : '#FFF3E0' }]}><MaterialIcons name="logout" size={20} color={theme.secondary} /></View>
            <Text style={[styles.menuText, { flex: 1, color: theme.secondary }]}>Sair da Conta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <FooterDoador navigation={navigation} abaAtual="Perfil" />
    </SafeAreaView>
  );
}