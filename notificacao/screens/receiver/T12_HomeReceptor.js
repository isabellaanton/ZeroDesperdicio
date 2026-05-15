import React, { useState } from 'react';
import { 
  View, Text, ScrollView, TouchableOpacity, 
  StatusBar, SafeAreaView, TextInput, Image, StyleSheet, Platform 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FooterReceptor from './FooterReceptor'; 

// ── 1. DADOS FALSOS PARA TESTAR A TELA ──
const DOACOES_DISPONIVEIS = [
  { 
    id: 1, 
    titulo: 'Marmita Caseira', 
    distancia: '1,2km', 
    categoria: 'Prontos',
    doador: 'Restaurante Sabor & Arte',
    imagem: 'https://img.freepik.com/fotos-premium/a-autentica-marmita-brasileira-mais-conhecida-como-marmitex-feita-com-comida-tradicional-do-brasil_496782-2496.jpg' 
  },
  { 
    id: 2, 
    titulo: 'Pães Frescos', 
    distancia: '3km', 
    categoria: 'Padaria', 
    doador: 'Padaria Pão de Ouro',
    imagem: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=250&auto=format&fit=crop' 
  },
  { 
    id: 3, 
    titulo: 'Cesta de HortiFruti', 
    distancia: '5km', 
    categoria: 'Verduras', 
    doador: 'Hortifruti da Praça',
    imagem: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=250&auto=format&fit=crop' 
  },
];

const CATEGORIAS = ['Todos', 'Verduras', 'Prontos', 'Padaria'];

export default function T12_HomeReceptor({ navigation }) {
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');
  const [textoBusca, setTextoBusca] = useState('');

  // Lógica de Filtragem (Busca + Categoria)
  const doacoesFiltradas = DOACOES_DISPONIVEIS.filter((item) => {
    const bateCategoria = categoriaAtiva === 'Todos' || item.categoria === categoriaAtiva;
    const bateBusca = item.titulo.toLowerCase().includes(textoBusca.toLowerCase());
    return bateCategoria && bateBusca;
  });

  return (
    <SafeAreaView style={s.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#006B14" />

      {/* ── HEADER SLIM ── */}
      <View style={s.headerSlim}>
        <View style={s.locationContainer}>
          <Ionicons name="location-outline" size={20} color="#FFF" />
          <Text style={s.locationText}>Fortaleza, CE</Text>
        </View>
        <TouchableOpacity style={s.btnMenu} activeOpacity={0.7}>
          <Ionicons name="menu" size={28} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* ── BARRA DE BUSCA ── */}
      <View style={s.searchContainerWrapper}>
        <View style={s.searchContainer}>
          <Ionicons name="search" size={20} color="#888" style={{ marginRight: 8 }} />
          <TextInput 
            style={s.searchInput}
            placeholder="Buscar alimentos..."
            placeholderTextColor="#888"
            value={textoBusca}
            onChangeText={setTextoBusca}
          />
        </View>
      </View>

      {/* ── FILTROS (ABAS) ── */}
      <View>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={s.filtrosContainer}
        >
          {/* Botão de Filtro Avançado */}
          <TouchableOpacity 
            style={s.filtroBotao} 
            activeOpacity={0.7}
            onPress={() => navigation.navigate("TelaFiltro")}
          >
            <Ionicons name="options-outline" size={16} color="#666" style={{ marginRight: 4 }} />
            <Text style={s.filtroTexto}>Filtrar</Text>
          </TouchableOpacity>

          {/* Categorias */}
          {CATEGORIAS.map((cat) => {
            const isAtivo = categoriaAtiva === cat;
            return (
              <TouchableOpacity 
                key={cat}
                style={[s.filtroBotao, isAtivo && s.filtroBotaoAtivo]}
                onPress={() => setCategoriaAtiva(cat)}
                activeOpacity={0.7}
              >
                <Text style={[s.filtroTexto, isAtivo && s.filtroTextoAtivo]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* ── CONTEÚDO / LISTA DE DOAÇÕES ── */}
      <ScrollView 
        style={s.conteudo} 
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {doacoesFiltradas.length === 0 ? (
          <View style={s.vazioContainer}>
            <Ionicons name="sad-outline" size={48} color="#CCC" />
            <Text style={s.vazioTexto}>Nenhum alimento encontrado.</Text>
          </View>
        ) : (
          doacoesFiltradas.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={s.card} 
              activeOpacity={0.9}
              onPress={() => navigation.navigate("DetalheDoacaoReceptor")}
            >
              <Image source={{ uri: item.imagem }} style={s.cardImage} />
              
              <View style={s.cardContent}>
                <Text style={s.cardTitle} numberOfLines={1}>{item.titulo}</Text>
                <Text style={s.cardDoador} numberOfLines={1}>{item.doador}</Text>
                
                <View style={s.cardLocationRow}>
                  <Ionicons name="location" size={14} color="#DA4A02" />
                  <Text style={s.cardDistanceText}>{item.distancia}</Text>
                </View>
                
                {/* Botãozinho de Ver Detalhes (Estilo Badge) */}
                <View style={s.badgeVerde}>
                  <Text style={s.badgeTextoVerde}>Ver Detalhes</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* ── FOOTER ── */}
      <FooterReceptor navigation={navigation} abaAtual="Inicio" />

    </SafeAreaView>
  );
}

// ── ESTILOS LOCAIS ──
const s = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFDDAE', // Cor de fundo solicitada!
  },
  
  // Header
  headerSlim: {
    backgroundColor: '#006B14',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 12 : 8,
    paddingBottom: 14,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 6,
  },
  btnMenu: { 
    width: 38, height: 38, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },

  // Search Bar
  searchContainerWrapper: {
    backgroundColor: '#FFDDAE',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 16,
    height: 46,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },

  // Filtros
  filtrosContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  filtroBotao: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#FFFFFF', // Fundo branco para destacar no Bege
    elevation: 1,
  },
  filtroBotaoAtivo: {
    backgroundColor: '#E8F5E9',
    borderWidth: 1,
    borderColor: '#006B14',
    elevation: 0,
  },
  filtroTexto: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666666',
  },
  filtroTextoAtivo: {
    color: '#006B14',
  },

  // Conteúdo
  conteudo: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 30,
    gap: 16,
  },

  // Estado Vazio
  vazioContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  vazioTexto: {
    marginTop: 12,
    color: '#888',
    fontSize: 15,
    textAlign: 'center',
  },

  // Card
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  cardImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
    backgroundColor: '#EEEEEE',
  },
  cardContent: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  cardDoador: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 6,
  },
  cardLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardDistanceText: {
    fontSize: 12,
    color: '#DA4A02',
    fontWeight: '600',
    marginLeft: 4,
  },

  // Botão "Ver Detalhes"
  badgeVerde: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeTextoVerde: {
    color: '#006B14',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});