import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StatusBar, SafeAreaView, TextInput, Image, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// 1. Importando a função de estilos globais e o hook do contexto
import { getGlobalStyles } from '../../Styles';
import { useTheme } from '../../ThemeContext';

import FooterReceptor from './FooterReceptor';

const DOACOES_DISPONIVEIS = [
  {
    id: 1,
    titulo: 'Marmita Caseira',
    distancia: '1,2km',
    categoria: 'Prontos',
    doador: 'Restaurante Sabor & Arte',
    imagem: 'https://img.freepik.com/fotos-premium/a-autentica-marmita-brasileira-mais-conhecida-como-marmitex-feita-com-comida-tradicional-do-brasil_496782-2496.jpg',
  },
  {
    id: 2,
    titulo: 'Pães Frescos',
    distancia: '3km',
    categoria: 'Padaria',
    doador: 'Padaria Pão de Ouro',
    imagem: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=250&auto=format&fit=crop',
  },
  {
    id: 3,
    titulo: 'Cesta de HortiFruti',
    distancia: '5km',
    categoria: 'Verduras',
    doador: 'Hortifruti da Praça',
    imagem: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=250&auto=format&fit=crop',
  },
];

const CATEGORIAS = ['Todos', 'Verduras', 'Prontos', 'Padaria'];

export default function T12_HomeReceptor({ navigation }) {
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');
  const [textoBusca, setTextoBusca] = useState('');

  // 2. Consumindo o tema atual
  const { theme, isDarkMode } = useTheme();
  // 3. Injetando o tema nos estilos
  const styles = getGlobalStyles(theme);

  // Lógica de Filtro (Requisito RF06)
  const doacoesFiltradas = DOACOES_DISPONIVEIS.filter((item) => {
    const bateCategoria = categoriaAtiva === 'Todos' || item.categoria === categoriaAtiva;
    const bateBusca = item.titulo.toLowerCase().includes(textoBusca.toLowerCase());
    return bateCategoria && bateBusca;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 4. StatusBar dinâmica */}
      <StatusBar 
        barStyle={isDarkMode ? "light-content" : "dark-content"} 
        backgroundColor={theme.headerBackground} 
      />

      {/* Header com Localização (RF08) */}
      <View style={[styles.header, {
        height: 70, flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between', paddingTop: Platform.OS === 'android' ? 12 : 8,
      }]}>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={20} color={theme.headerTextInverse} />
          <Text style={styles.locationText}>Fortaleza, CE</Text>
        </View>
        <TouchableOpacity style={styles.menuIcone} activeOpacity={0.7}>
          <Ionicons name="menu" size={28} color={theme.headerTextInverse} />
        </TouchableOpacity>
      </View>

      {/* Barra de Busca - Fundo usando theme.background em vez de fixo */}
      <View style={{ backgroundColor: theme.background, paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 }}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={theme.textMuted} style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar alimentos..."
            placeholderTextColor={theme.textMuted}
            value={textoBusca}
            onChangeText={setTextoBusca}
          />
        </View>
      </View>

      {/* Filtros Horizontais */}
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.filtersRow, { paddingVertical: 15 }]}
        >
          <TouchableOpacity
            style={styles.filterBtn}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('FiltrarDoacoes')}
          >
            <Ionicons name="options-outline" size={16} color={theme.textSecondary} style={{ marginRight: 4 }} />
            <Text style={styles.filterText}>Filtrar</Text>
          </TouchableOpacity>

          {CATEGORIAS.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.filterBtn, categoriaAtiva === cat && styles.filterBtnActive]}
              onPress={() => setCategoriaAtiva(cat)}
              activeOpacity={0.7}
            >
              <Text style={[styles.filterText, categoriaAtiva === cat && styles.filterTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Feed de Doações (RF03) */}
      <ScrollView
        style={styles.conteudo}
        contentContainerStyle={styles.conteudoContainer}
        showsVerticalScrollIndicator={false}
      >
        {doacoesFiltradas.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="sad-outline" size={48} color={theme.textMuted} />
            <Text style={styles.emptyStateTexto}>Nenhum alimento encontrado.</Text>
          </View>
        ) : (
          doacoesFiltradas.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.cardReceptor}
              activeOpacity={0.9}
              onPress={() => navigation.navigate('DetalheDoacaoReceptor')}
            >
              <Image source={{ uri: item.imagem }} style={styles.cardImage} />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle} numberOfLines={1}>{item.titulo}</Text>
                <Text style={styles.textoCard} numberOfLines={1}>{item.doador}</Text>
                
                <View style={styles.cardLocationRow}>
                  <Ionicons name="location" size={14} color={theme.secondary} />
                  <Text style={styles.cardDistanceText}>{item.distancia}</Text>
                </View>

                <View style={styles.btnDetalhes}>
                  <Text style={styles.btnDetalhesText}>Ver Detalhes</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
        <View style={{ height: 30 }} />
      </ScrollView>

      {/* Footer exclusivo do Receptor */}
      <FooterReceptor navigation={navigation} abaAtual="Inicio" />
    </SafeAreaView>
  );
}