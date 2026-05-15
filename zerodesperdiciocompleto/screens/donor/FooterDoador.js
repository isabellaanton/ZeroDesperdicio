import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

// 1. Importando a função de estilos globais e o hook do contexto
import { getGlobalStyles } from '../../Styles';
import { useTheme } from '../../ThemeContext';

export default function FooterDoador({ navigation, abaAtual }) {
  // 2. Consumindo o tema atual
  const { theme } = useTheme();
  // 3. Injetando o tema nos estilos
  const styles = getGlobalStyles(theme);

  return (
    <View style={styles.navBar}>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation?.navigate('HomeDoador')} activeOpacity={0.7}>
        <Text style={abaAtual === 'Inicio' ? styles.navIconeAtivo : styles.navIcone}>🏠</Text>
        <Text style={abaAtual === 'Inicio' ? styles.navLabelAtivo : styles.navLabel}>Início</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => navigation?.navigate('MinhasDoacoes')} activeOpacity={0.7}>
        <Text style={abaAtual === 'Doacoes' ? styles.navIconeAtivo : styles.navIcone}>📦</Text>
        <Text style={abaAtual === 'Doacoes' ? styles.navLabelAtivo : styles.navLabel}>Doações</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => navigation?.navigate('HistoricoDoador')} activeOpacity={0.7}>
        <Text style={abaAtual === 'Historico' ? styles.navIconeAtivo : styles.navIcone}>📊</Text>
        <Text style={abaAtual === 'Historico' ? styles.navLabelAtivo : styles.navLabel}>Histórico</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => navigation?.navigate('InfoDoador')} activeOpacity={0.7}>
        <Text style={abaAtual === 'Info' ? styles.navIconeAtivo : styles.navIcone}>ℹ️</Text>
        <Text style={abaAtual === 'Info' ? styles.navLabelAtivo : styles.navLabel}>Info</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => navigation?.navigate('PerfilDoador')} activeOpacity={0.7}>
        <Text style={abaAtual === 'Perfil' ? styles.navIconeAtivo : styles.navIcone}>👤</Text>
        <Text style={abaAtual === 'Perfil' ? styles.navLabelAtivo : styles.navLabel}>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}