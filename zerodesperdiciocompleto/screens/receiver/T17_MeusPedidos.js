import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  SafeAreaView, StatusBar, Image, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// 1. Importando a função de estilos globais e o hook do contexto
import { getGlobalStyles } from '../../Styles';
import { useTheme } from '../../ThemeContext';

import FooterReceptor from './FooterReceptor';

const MEUS_PEDIDOS = [
  { id: 1, titulo: 'Marmita Caseira',   doador: 'Restaurante Sabor & Arte', status: 'Concluído', data: 'Hoje, 12:30',    img: 'https://img.freepik.com/fotos-premium/a-autentica-marmita-brasileira-mais-conhecida-como-marmitex-feita-com-comida-tradicional-do-brasil_496782-2496.jpg' },
  { id: 2, titulo: 'Pães Frescos',       doador: 'Padaria Pão de Ouro',      status: 'Pendente',  data: 'Amanhã, 08:00', img: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?q=80&w=250&auto=format&fit=crop' },
  { id: 3, titulo: 'Legumes Variados',   doador: 'Hortifruti da Praça',      status: 'Concluído', data: 'Ontem, 18:00',  img: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?q=80&w=250&auto=format&fit=crop' },
];

export default function T17_MeusPedidos({ navigation }) {
  const [abaAtiva, setAbaAtiva] = useState('Todos');

  // 2. Consumindo o tema atual
  const { theme, isDarkMode } = useTheme();
  // 3. Injetando o tema nos estilos
  const styles = getGlobalStyles(theme);

  const pedidosFiltrados = MEUS_PEDIDOS.filter((pedido) => {
    if (abaAtiva === 'Todos') return true;
    return pedido.status === abaAtiva;
  });

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
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation?.goBack()} activeOpacity={0.8}>
          <Ionicons name="arrow-back" size={24} color={theme.headerTextInverse} />
        </TouchableOpacity>
        <Text style={[styles.saudacao, { fontSize: 18, paddingBottom: 0 }]}>Meus Pedidos</Text>
        <TouchableOpacity style={styles.menuIcone} activeOpacity={0.7}>
          <Ionicons name="menu" size={24} color={theme.headerTextInverse} />
        </TouchableOpacity>
      </View>

      {/* Filtros */}
      <View style={styles.filtrosContainer}>
        {['Todos', 'Pendentes', 'Concluídos'].map((aba) => (
          <TouchableOpacity
            key={aba}
            style={[styles.filtroBotao, { flex: 1 }, abaAtiva === aba && styles.filtroBotaoAtivo]}
            onPress={() => setAbaAtiva(aba)}
            activeOpacity={0.7}
          >
            <Text style={[styles.filtroTexto, abaAtiva === aba && styles.filtroTextoAtivo]}>{aba}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lista */}
      <ScrollView
        style={styles.conteudo}
        contentContainerStyle={styles.conteudoContainer}
        showsVerticalScrollIndicator={false}
      >
        {pedidosFiltrados.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="receipt-outline" size={48} color={theme.textMuted} />
            <Text style={styles.emptyStateTexto}>Nenhum pedido encontrado nessa categoria.</Text>
          </View>
        ) : (
          pedidosFiltrados.map((item) => {
            const isConcluido = item.status === 'Concluído';
            return (
              <TouchableOpacity key={item.id} style={styles.cardHistorico} activeOpacity={0.9}>
                <Image source={{ uri: item.img }} style={styles.cardImage} />
                <View style={styles.cardContentHistorico}>
                  <Text style={styles.cardTitle} numberOfLines={1}>{item.titulo}</Text>
                  <Text style={styles.textoCard} numberOfLines={1}>{item.doador}</Text>
                  <Text style={{ fontSize: 12, color: theme.textMuted, marginBottom: 8 }}>{item.data}</Text>
                  <View style={[
                    styles.badgePendente,
                    isConcluido
                      ? { backgroundColor: theme.badgeAtivaBg, borderColor: theme.badgeAtivaBorder }
                      : { backgroundColor: theme.badgeBg, borderColor: theme.badgeBorder },
                  ]}>
                    <Text style={[
                      styles.badgePendenteTexto,
                      isConcluido ? { color: theme.badgeAtivaText } : { color: theme.badgeText },
                    ]}>
                      {item.status}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>

      <FooterReceptor navigation={navigation} abaAtual="Pedidos" />
    </SafeAreaView>
  );
}