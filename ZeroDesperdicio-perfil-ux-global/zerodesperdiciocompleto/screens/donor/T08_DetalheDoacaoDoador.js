import React from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  SafeAreaView, StatusBar, Image, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { getGlobalStyles } from '../../Styles';
import { useTheme } from '../../ThemeContext';
import FooterDoador from './FooterDoador';

export default function T08_DetalheDoacaoDoador({ route, navigation }) {
  const { theme } = useTheme();
  const styles = getGlobalStyles(theme);

  // 1. Pegar os dados que vieram da tela anterior (T07)
  const { doacaoId, titulo, descricao, img } = route.params || {};

  const handleAcao = (tipo) => {
    Alert.alert("Sucesso", `Solicitação ${tipo === 'aceitar' ? 'aceita' : 'recusada'} com sucesso!`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={theme.headerBackground} />

      {/* Header */}
      <View style={[styles.header, { height: 70, justifyContent: 'center' }]}>
        <View style={[styles.headerTop, { justifyContent: 'space-between', width: '100%', paddingHorizontal: 15 }]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={26} color={theme.headerTextInverse} />
          </TouchableOpacity>
          <Text style={[styles.headerTitulo, { fontSize: 20 }]}>Gerenciar Doação</Text>
          <View style={{ width: 26 }} />
        </View>
      </View>

      <ScrollView 
        style={styles.conteudoHomeDoador} 
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        
        {/* Resumo da Doação que você cadastrou */}
        <View style={{ padding: 20, backgroundColor: theme.cardBackground, marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
            <Image source={{ uri: img }} style={{ width: 60, height: 60, borderRadius: 10, marginRight: 15 }} />
            <View style={{flex: 1}}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.textPrimary }}>{titulo || "Doação"}</Text>
                <Text style={{ color: theme.textSecondary }}>{descricao}</Text>
            </View>
        </View>

        <Text style={[styles.secaoTitulo, { marginLeft: 20, marginTop: 10 }]}>SOLICITAÇÕES RECEBIDAS</Text>

        {/* Card de Solicitação 01 */}
        <View style={[styles.cardSolicitacao, { marginHorizontal: 20, padding: 15, borderRadius: 15, elevation: 3 }]}>
          <View style={styles.cardHeader}>
            <View>
                <Text style={[styles.nomeOng, { fontSize: 18 }]}>ONG Vida Nova</Text>
                <Text style={{ fontSize: 12, color: theme.textMuted }}>📍 2.5km de distância</Text>
            </View>
            <View style={[styles.badgePendente, { backgroundColor: '#fff3cd' }]}>
              <Text style={[styles.badgePendenteTexto, { color: '#856404' }]}>pendente</Text>
            </View>
          </View>
          
          <Text style={[styles.descricaoSolicitacao, { marginVertical: 10 }]}>"Gostaríamos dessas marmitas para o projeto de jantar comunitário hoje à noite."</Text>
          
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 5 }}>
            <TouchableOpacity 
                style={[styles.botaoAceitar, { flex: 1, backgroundColor: '#28a745', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}
                onPress={() => handleAcao('aceitar')}
            >
              <Ionicons name="checkmark-circle" size={18} color="#fff" />
              <Text style={[styles.botaoAceitarTexto, { marginLeft: 5 }]}>Aceitar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={[styles.botaoRecusar, { flex: 1, borderColor: '#dc3545', borderWidth: 1, backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}
                onPress={() => handleAcao('recusar')}
            >
              <Ionicons name="close-circle" size={18} color="#dc3545" />
              <Text style={[styles.botaoRecusarTexto, { color: '#dc3545', marginLeft: 5 }]}>Recusar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Card de Solicitação 02 */}
        <View style={[styles.cardSolicitacao, { marginHorizontal: 20, padding: 15, borderRadius: 15, elevation: 3 }]}>
          <View style={styles.cardHeader}>
            <View>
                <Text style={[styles.nomeOng, { fontSize: 18 }]}>Instituto Esperança</Text>
                <Text style={{ fontSize: 12, color: theme.textMuted }}>📍 4.1km de distância</Text>
            </View>
            <View style={[styles.badgePendente, { backgroundColor: '#fff3cd' }]}>
              <Text style={[styles.badgePendenteTexto, { color: '#856404' }]}>pendente</Text>
            </View>
          </View>
          
          <Text style={[styles.descricaoSolicitacao, { marginVertical: 10 }]}>"Temos famílias cadastradas que precisam de alimentos perecíveis."</Text>
          
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 5 }}>
            <TouchableOpacity 
                style={[styles.botaoAceitar, { flex: 1, backgroundColor: '#28a745', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}
                onPress={() => handleAcao('aceitar')}
            >
              <Ionicons name="checkmark-circle" size={18} color="#fff" />
              <Text style={[styles.botaoAceitarTexto, { marginLeft: 5 }]}>Aceitar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={[styles.botaoRecusar, { flex: 1, borderColor: '#dc3545', borderWidth: 1, backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}
                onPress={() => handleAcao('recusar')}
            >
              <Ionicons name="close-circle" size={18} color="#dc3545" />
              <Text style={[styles.botaoRecusarTexto, { color: '#dc3545', marginLeft: 5 }]}>Recusar</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>

      <FooterDoador navigation={navigation} abaAtual="Doacoes" />
    </SafeAreaView>
  );
}