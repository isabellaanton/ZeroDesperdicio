import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  SafeAreaView, StatusBar, Switch, Platform,
} from 'react-native';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import styles from '../../Styles'; // Caminho para o seu Styles.js de 1000 linhas
import FooterDoador from './FooterDoador';
import ResumoPerfil from './ResumoPerfil';

const MENU_ITEMS = [
  { icone: 'user', lib: 'feather', texto: 'Editar Perfil', rota: null },
  { icone: 'key', lib: 'feather', texto: 'Alterar Senha', rota: 'RedefinirSenha' }, // Rota T04
  { icone: 'notifications-outline', lib: 'ionicons', texto: 'Notificações', rota: null },
  { icone: 'help-circle-outline', lib: 'ionicons', texto: 'Ajuda e Suporte', rota: null },
];

export default function T11_PerfilDoador({ navigation }) {
  const [modoEscuro, setModoEscuro] = useState(false);

  const renderIcone = (item) => {
    if (item.lib === 'feather') return <Feather name={item.icone} size={20} color="#006B14" />;
    return <Ionicons name={item.icone} size={20} color="#006B14" />;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#006B14" />

      {/* Header Padronizado */}
      <View style={[styles.header, { height: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: Platform.OS === 'android' ? 12 : 8 }]}>
        <TouchableOpacity style={styles.menuIcone}>
          <Ionicons name="menu" size={24} color="#FFFFFF" />
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
              <Text style={[styles.menuText, { flex: 1 }]}>{item.texto}</Text>
              <Ionicons name="chevron-forward" size={18} color="#888888" />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.secaoTitulo}>PREFERÊNCIAS</Text>
        <View style={styles.cardSolicitacao}>
          <View style={styles.menuItem}>
            <View style={styles.infoIcone}><Feather name="moon" size={20} color="#006B14" /></View>
            <Text style={[styles.menuText, { flex: 1 }]}>Modo Escuro</Text>
            <Switch value={modoEscuro} onValueChange={setModoEscuro} trackColor={{ false: '#EEEEEE', true: '#006B14' }} />
          </View>
        </View>

        <Text style={styles.secaoTitulo}>SESSÃO</Text>
        <View style={styles.cardSolicitacao}>
          <TouchableOpacity style={[styles.menuItem, styles.menuItemBorda]} onPress={() => navigation.navigate('Login')}>
            <View style={[styles.infoIcone, { backgroundColor: '#FFF3E0' }]}><MaterialIcons name="logout" size={20} color="#DA4A02" /></View>
            <Text style={[styles.menuText, { flex: 1, color: '#DA4A02' }]}>Sair da Conta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <FooterDoador navigation={navigation} abaAtual="Perfil" />
    </SafeAreaView>
  );
}