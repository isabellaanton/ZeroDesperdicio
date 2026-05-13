import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  SafeAreaView, StatusBar, Switch, Platform,
} from 'react-native';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import styles from '../../Styles';
import FooterReceptor from './FooterReceptor';

const MENU_ITEMS = [
  { icone: 'user',                  lib: 'feather',  texto: 'Editar Perfil',   rota: null },
  { icone: 'key',                   lib: 'feather',  texto: 'Alterar Senha',   rota: 'RecuperarSenha' },
  { icone: 'notifications-outline', lib: 'ionicons', texto: 'Notificações',    rota: null },
  { icone: 'help-circle-outline',   lib: 'ionicons', texto: 'Ajuda e Suporte', rota: null },
];

export default function T20_PerfilReceptor({ navigation }) {
  const [modoEscuro, setModoEscuro] = useState(false);

  const renderIcone = (item) => {
    if (item.lib === 'feather') return <Feather name={item.icone} size={20} color="#006B14" />;
    return <Ionicons name={item.icone} size={20} color="#006B14" />;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#006B14" />

      {/* Header */}
      <View style={[styles.header, {
        height: 70, flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between', paddingTop: Platform.OS === 'android' ? 12 : 8,
      }]}>
        <TouchableOpacity style={styles.menuIcone}>
          <Ionicons name="menu" size={24} color="#FFFFFF" />
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
        <Text style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', marginBottom: 20 }}>Receptor · Fortaleza, CE</Text>

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
              <Text style={[styles.menuText, { flex: 1 }]}>{item.texto}</Text>
              <Ionicons name="chevron-forward" size={18} color="#888888" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Modo escuro */}
        <Text style={styles.secaoTitulo}>PREFERÊNCIAS</Text>
        <View style={styles.cardSolicitacao}>
          <View style={styles.menuItem}>
            <View style={styles.infoIcone}>
              <Feather name="moon" size={20} color="#006B14" />
            </View>
            <Text style={[styles.menuText, { flex: 1 }]}>Modo Escuro</Text>
            <Switch
              value={modoEscuro}
              onValueChange={setModoEscuro}
              trackColor={{ false: '#EEEEEE', true: '#006B14' }}
              thumbColor="#FFFFFF"
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
            <View style={[styles.infoIcone, { backgroundColor: '#FFF3E0' }]}>
              <MaterialIcons name="logout" size={20} color="#DA4A02" />
            </View>
            <Text style={[styles.menuText, { flex: 1, color: '#DA4A02' }]}>Sair da Conta</Text>
            <Ionicons name="chevron-forward" size={18} color="#DA4A02" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <View style={[styles.infoIcone, { backgroundColor: '#FFEBEE' }]}>
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