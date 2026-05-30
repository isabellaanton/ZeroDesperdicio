import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import { getGlobalStyles } from '../../Styles';
import { useTheme } from '../../ThemeContext';

export default function FooterReceptor({ navigation, abaAtual }) {
  const { theme } = useTheme();
  const styles = getGlobalStyles(theme);

  return (
    <View style={styles.navBar}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation?.navigate('HomeReceptor')}
        activeOpacity={0.7}
      >
        <Text style={abaAtual === 'Inicio' ? styles.navIconeAtivo : styles.navIcone}>🏠</Text>
        <Text style={abaAtual === 'Inicio' ? styles.navLabelAtivo : styles.navLabel}>Início</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation?.navigate('MapaDoacoes')}
        activeOpacity={0.7}
      >
        <Text style={abaAtual === 'Mapa' ? styles.navIconeAtivo : styles.navIcone}>📍</Text>
        <Text style={abaAtual === 'Mapa' ? styles.navLabelAtivo : styles.navLabel}>Mapa</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation?.navigate('MeusPedidos')}
        activeOpacity={0.7}
      >
        <Text style={abaAtual === 'Pedidos' ? styles.navIconeAtivo : styles.navIcone}>🛍️</Text>
        <Text style={abaAtual === 'Pedidos' ? styles.navLabelAtivo : styles.navLabel}>Solicitações</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation?.navigate('InfoReceptor')}
        activeOpacity={0.7}
      >
        <Text style={abaAtual === 'Info' ? styles.navIconeAtivo : styles.navIcone}>ℹ️</Text>
        <Text style={abaAtual === 'Info' ? styles.navLabelAtivo : styles.navLabel}>Info</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation?.navigate('PerfilReceptor')}
        activeOpacity={0.7}
      >
        <Text style={abaAtual === 'Perfil' ? styles.navIconeAtivo : styles.navIcone}>👤</Text>
        <Text style={abaAtual === 'Perfil' ? styles.navLabelAtivo : styles.navLabel}>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}