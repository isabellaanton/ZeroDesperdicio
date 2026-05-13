import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from '../../Styles'; // Ajuste o caminho do seu arquivo de estilos

export default function FooterDoador({ navigation, abaAtual }) {
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