import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StatusBar, SafeAreaView, FlatList, Alert,
} from 'react-native';

// 1. Importando a função de estilos globais e o hook do contexto
import { getGlobalStyles } from '../../Styles';
import { useTheme } from '../../ThemeContext';

import FooterDoador from './FooterDoador';

const solicitacoesIniciais = [
  { id: '1', ong: 'ONG Vida Nova',       descricao: 'Marmitas prontas · 5 unid.',  status: 'pendente' },
  { id: '2', ong: 'Instituto Esperança', descricao: 'Arroz e feijão · 10 kg',       status: 'pendente' },
  { id: '3', ong: 'Casa do Menor',       descricao: 'Pães e frios · 20 unid.',      status: 'pendente' },
];

export default function T05_HomeDoador({ navigation }) {
  const [solicitacoes, setSolicitacoes] = useState(solicitacoesIniciais);
  const [ativas, setAtivas] = useState(3);

  // 2. Consumindo o tema atual
  const { theme, isDarkMode } = useTheme();
  // 3. Injetando o tema nos estilos
  const styles = getGlobalStyles(theme);

  const pendentes = solicitacoes.filter((s) => s.status === 'pendente').length;

  const handleAceitar = (id) => {
    setSolicitacoes((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'aceita' } : s))
    );
    setAtivas((prev) => prev + 1);
    Alert.alert('Doação aceita!', 'A ONG foi notificada.');
  };

  const handleRecusar = (id) => {
    Alert.alert('Recusar solicitação', 'Tem certeza que deseja recusar?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Recusar',
        style: 'destructive',
        onPress: () =>
          setSolicitacoes((prev) =>
            prev.map((s) => (s.id === id ? { ...s, status: 'recusada' } : s))
          ),
      },
    ]);
  };

  const renderSolicitacao = ({ item }) => {
    if (item.status !== 'pendente') return null;
    return (
      <View style={styles.cardSolicitacao}>
        <View style={styles.cardHeader}>
          <Text style={styles.nomeOng}>{item.ong}</Text>
          <View style={styles.badgePendente}>
            <Text style={styles.badgePendenteTexto}>pendente</Text>
          </View>
        </View>
        <Text style={styles.descricaoSolicitacao}>{item.descricao}</Text>
        <View style={styles.botoesCard}>
          <TouchableOpacity
            style={styles.botaoAceitar}
            onPress={() => handleAceitar(item.id)}
            activeOpacity={0.8}
          >
            <Text style={styles.botaoAceitarTexto}>✓ Aceitar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.botaoRecusar}
            onPress={() => handleRecusar(item.id)}
            activeOpacity={0.8}
          >
            <Text style={styles.botaoRecusarTexto}>✕ Recusar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 4. StatusBar dinâmica */}
      <StatusBar 
        barStyle={isDarkMode ? "light-content" : "dark-content"} 
        backgroundColor={theme.headerBackground} 
      />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.saudacao}>Olá, Nome 👋</Text>
            <Text style={styles.nomeRestaurante}>Restaurante Nome</Text>
          </View>
          <TouchableOpacity style={styles.menuIcone} activeOpacity={0.7}>
            <Text style={styles.menuIconeTexto}>≡</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.resumoContainer}>
          <View style={styles.resumoCard}>
            <Text style={styles.resumoNumero}>{ativas}</Text>
            <Text style={styles.resumoLabel}>ativas</Text>
          </View>
          <View style={[styles.resumoCard, styles.resumoCardDestaque]}>
            <Text style={styles.resumoNumeroDestaque}>{pendentes}</Text>
            <Text style={styles.resumoLabelDestaque}>pendentes</Text>
          </View>
        </View>
      </View>

      {/* Conteúdo */}
      <ScrollView
        style={styles.conteudoHomeDoador}
        contentContainerStyle={styles.conteudoContainerHomeDoador}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.botaoNovaDoacao}
          onPress={() => navigation.navigate('CadastrarDoacao')}
          activeOpacity={0.8}
        >
          <Text style={styles.botaoNovaDoacaoTexto}>+ Nova doação</Text>
        </TouchableOpacity>

        <Text style={styles.secaoTitulo}>SOLICITAÇÕES RECENTES</Text>

        {pendentes === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTexto}>Nenhuma solicitação pendente</Text>
          </View>
        ) : (
          <FlatList
            data={solicitacoes}
            keyExtractor={(item) => item.id}
            renderItem={renderSolicitacao}
            scrollEnabled={false}
          />
        )}
      </ScrollView>

      <FooterDoador navigation={navigation} abaAtual="Inicio" />
    </SafeAreaView>
  );
}