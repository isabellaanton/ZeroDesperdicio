import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  SafeAreaView, StatusBar, Image, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { getGlobalStyles } from '../../Styles';
import { useTheme } from '../../ThemeContext';
import FooterDoador from './FooterDoador';

const ABAS = ['Todas', 'Este mês', 'Anteriores'];

// 1. Array de dados (Mock) que estava faltando
const DOACOES = [
  { id: '1', titulo: 'Pães Variados', detalhe: '3kg de pães do dia', receptor: 'ONG Esperança', data: '15/05/2026', avaliacao: 5, mesAtual: true, imagem: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&q=80' },
  { id: '2', titulo: 'Bolo de Cenoura', detalhe: '2 unidades inteiras', receptor: 'Lar de Idosos', data: '02/05/2026', avaliacao: 4, mesAtual: true, imagem: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200&q=80' },
  { id: '3', titulo: 'Sopa de Legumes', detalhe: '5 litros', receptor: 'Comunidade Local', data: '20/04/2026', avaliacao: 5, mesAtual: false, imagem: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=200&q=80' },
];

export default function T10_HistoricoDoador({ navigation }) {
  const [abaAtiva, setAbaAtiva] = useState('Todas');
  const { theme, isDarkMode } = useTheme();
  const styles = getGlobalStyles(theme);

  // 2. Lógica de Filtragem que estava faltando
  const doacoesFiltradas = DOACOES.filter(item => {
    if (abaAtiva === 'Todas') return true;
    if (abaAtiva === 'Este mês') return item.mesAtual === true;
    if (abaAtiva === 'Anteriores') return item.mesAtual === false;
    return true;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={theme.headerBackground} />

      {/* Header */}
      <View style={[styles.header, {
        height: 70, flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between', paddingTop: Platform.OS === 'android' ? 12 : 8,
        backgroundColor: theme.headerBackground
      }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={theme.headerTextInverse} />
        </TouchableOpacity>
        <Text style={[styles.saudacao, { fontSize: 20, paddingBottom: 0, color: theme.headerTextInverse }]}>Histórico</Text>
        <TouchableOpacity style={styles.menuIcone}>
          <Ionicons name="menu" size={24} color={theme.headerTextInverse} />
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={[styles.statsContainer, { paddingHorizontal: 16, marginVertical: 15, flexDirection: 'row' }]}>
        <View style={[styles.statBox, { flex: 1, backgroundColor: theme.primary, borderRadius: 14, paddingVertical: 14, alignItems: 'center' }]}>
          <Text style={[styles.statNumber, { color: theme.buttonTextInverse, fontSize: 20, fontWeight: '700' }]}>34</Text>
          <Text style={[styles.statLabel, { color: 'rgba(255,255,255,0.8)', fontSize: 12 }]}>doações</Text>
        </View>
        <View style={[styles.statBox, { flex: 1, backgroundColor: theme.cardBackground, borderRadius: 14, paddingVertical: 14, alignItems: 'center', marginHorizontal: 10 }]}>
          <Text style={[styles.statNumber, { fontSize: 20, fontWeight: '700', color: theme.textPrimary }]}>4.9 ⭐</Text>
          <Text style={[styles.statLabel, { fontSize: 12, color: theme.textSecondary }]}>avaliação</Text>
        </View>
        <View style={[styles.statBox, { flex: 1, backgroundColor: theme.cardBackground, borderRadius: 14, paddingVertical: 14, alignItems: 'center' }]}>
          <Text style={[styles.statNumber, { fontSize: 20, fontWeight: '700', color: theme.textPrimary }]}>128kg</Text>
          <Text style={[styles.statLabel, { fontSize: 12, color: theme.textSecondary }]}>doados</Text>
        </View>
      </View>

      {/* Abas */}
      <View style={{ flexDirection: 'row', backgroundColor: theme.background, paddingHorizontal: 16, paddingVertical: 12, gap: 8 }}>
        {ABAS.map((aba) => (
          <TouchableOpacity
            key={aba}
            style={[
                styles.filtroBotao, 
                { paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, backgroundColor: theme.cardBackground },
                abaAtiva === aba && { backgroundColor: theme.primary, borderColor: theme.primary }
            ]}
            onPress={() => setAbaAtiva(aba)}
            activeOpacity={0.8}
          >
            <Text style={[
                styles.filtroTexto, 
                { color: theme.textSecondary },
                abaAtiva === aba && { color: theme.buttonTextInverse, fontWeight: 'bold' }
            ]}>
                {aba}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lista */}
      <ScrollView style={styles.conteudo} contentContainerStyle={[styles.conteudoContainer, { paddingHorizontal: 16, paddingTop: 10 }]} showsVerticalScrollIndicator={false}>
        <Text style={[styles.secaoTitulo, { marginBottom: 15, color: theme.textMuted, textTransform: 'uppercase', fontSize: 12 }]}>
            {doacoesFiltradas.length} doações encontradas
        </Text>

        {doacoesFiltradas.map((item) => (
          <View key={item.id} style={[styles.cardHistorico, { flexDirection: 'row', backgroundColor: theme.cardBackground, borderRadius: 15, marginBottom: 15, overflow: 'hidden', elevation: 2 }]}>
            <Image source={{ uri: item.imagem }} style={{ width: 100, height: '100%', minHeight: 110 }} />
            <View style={{ flex: 1, padding: 12 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Text style={{ fontWeight: '700', fontSize: 16, flex: 1, marginRight: 6, color: theme.textPrimary }}>{item.titulo}</Text>
                <View style={[styles.badgeAtiva, { backgroundColor: theme.secondary, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 }]}>
                  <Text style={{ color: theme.buttonTextInverse, fontSize: 10, fontWeight: '700' }}>Concluído</Text>
                </View>
              </View>
              
              <Text style={{ fontSize: 13, color: theme.textSecondary, marginVertical: 4 }}>{item.detalhe}</Text>
              
              <View style={{ flexDirection: 'row', gap: 10, marginTop: 4 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Ionicons name="heart" size={13} color={theme.secondary} />
                  <Text style={{ fontSize: 11, color: theme.textMuted }}>{item.receptor}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Ionicons name="calendar-outline" size={13} color={theme.textMuted} />
                  <Text style={{ fontSize: 11, color: theme.textMuted }}>{item.data}</Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', gap: 2, marginTop: 8 }}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <Ionicons
                    key={n}
                    name={n <= item.avaliacao ? 'star' : 'star-outline'}
                    size={14}
                    color="#FFC107"
                  />
                ))}
              </View>
            </View>
          </View>
        ))}

        {/* Empty State caso o array fique vazio no filtro */}
        {doacoesFiltradas.length === 0 && (
          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <Ionicons name="folder-open-outline" size={48} color={theme.textMuted} />
            <Text style={{ color: theme.textSecondary, marginTop: 10 }}>Nenhuma doação encontrada.</Text>
          </View>
        )}
        
        <View style={{ height: 30 }} />
      </ScrollView>

      <FooterDoador navigation={navigation} abaAtual="Historico" />
    </SafeAreaView>
  );
}