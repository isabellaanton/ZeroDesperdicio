import React, { useState } from 'react';
import { 
  View, Text, ScrollView, TouchableOpacity, 
  StatusBar, SafeAreaView, Image, StyleSheet, Platform 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FooterReceptor from './FooterReceptor'; 

// --- DADOS FALSOS PARA TESTAR O FILTRO ---
const MEUS_PEDIDOS = [
  { 
    id: 1, 
    titulo: 'Marmita Caseira', 
    doador: 'Restaurante Sabor & Arte',
    status: 'Concluído', 
    data: 'Hoje, 12:30',
    img: 'https://img.freepik.com/fotos-premium/a-autentica-marmita-brasileira-mais-conhecida-como-marmitex-feita-com-comida-tradicional-do-brasil_496782-2496.jpg' 
  },
  { 
    id: 2, 
    titulo: 'Pães Frescos', 
    doador: 'Padaria Pão de Ouro',
    status: 'Pendente', 
    data: 'Amanhã, 08:00',
    img: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?q=80&w=250&auto=format&fit=crop' 
  },
  { 
    id: 3, 
    titulo: 'Legumes Variados', 
    doador: 'Hortifruti da Praça',
    status: 'Concluído', 
    data: 'Ontem, 18:00',
    img: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?q=80&w=250&auto=format&fit=crop' 
  },
];
// -----------------------------------------

export default function MeusPedidos({ navigation }) {
  const [abaAtiva, setAbaAtiva] = useState('Todos');

  // Lógica para filtrar a lista de acordo com a aba selecionada
  const pedidosFiltrados = MEUS_PEDIDOS.filter(pedido => {
    if (abaAtiva === 'Todos') return true;
    return pedido.status === abaAtiva;
  });

  return (
    <SafeAreaView style={s.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#006B14" />

      {/* ── HEADER SLIM ── */}
      <View style={s.headerSlim}>
        <TouchableOpacity style={s.btnVoltar} onPress={() => navigation?.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={s.headerTitulo}>Meus Pedidos</Text>
        <TouchableOpacity style={s.btnVoltar}>
          <Ionicons name="menu" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* ── FILTROS (ABAS) ── */}
      <View style={s.filtrosContainer}>
        {['Todos', 'Pendentes', 'Concluídos'].map((aba) => (
          <TouchableOpacity 
            key={aba}
            style={[s.filtroBotao, abaAtiva === aba && s.filtroBotaoAtivo]}
            onPress={() => setAbaAtiva(aba)}
            activeOpacity={0.7}
          >
            <Text style={[s.filtroTexto, abaAtiva === aba && s.filtroTextoAtivo]}>
              {aba}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ── CONTEÚDO / LISTA DE PEDIDOS ── */}
      <ScrollView 
        style={s.conteudo} 
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {pedidosFiltrados.length === 0 ? (
          <View style={s.vazioContainer}>
            <Ionicons name="receipt-outline" size={48} color="#CCC" />
            <Text style={s.vazioTexto}>Nenhum pedido encontrado nessa categoria.</Text>
          </View>
        ) : (
          pedidosFiltrados.map((item) => {
            const isConcluido = item.status === 'Concluído';

            return (
              <TouchableOpacity key={item.id} style={s.card} activeOpacity={0.9}>
                <Image source={{ uri: item.img }} style={s.cardImage} />
                
                <View style={s.cardContent}>
                  <Text style={s.cardTitle} numberOfLines={1}>{item.titulo}</Text>
                  <Text style={s.cardDoador} numberOfLines={1}>{item.doador}</Text>
                  <Text style={s.cardData}>{item.data}</Text>
                  
                  {/* Badge de Status */}
                  <View style={[s.badge, isConcluido ? s.badgeVerde : s.badgeLaranja]}>
                    <Text style={[s.badgeTexto, isConcluido ? s.badgeTextoVerde : s.badgeTextoLaranja]}>
                      {item.status}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          })
        )}
      </ScrollView>

      {/* ── FOOTER ── */}
      <FooterReceptor navigation={navigation} abaAtual="Pedidos" />

    </SafeAreaView>
  );
}

// ── ESTILOS LOCAIS ──
const s = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFDDAE',
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
  btnVoltar: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },
  headerTitulo: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },

  // Filtros
  filtrosContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFDDAE',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    gap: 8,
  },
  filtroBotao: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
  },
  filtroBotaoAtivo: {
    backgroundColor: '#E8F5E9',
    borderWidth: 1,
    borderColor: '#006B14',
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

  // Card do Pedido
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
    marginBottom: 4,
  },
  cardData: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 8,
  },

  // Badges de Status
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeVerde: {
    backgroundColor: '#E8F5E9',
  },
  badgeTextoVerde: {
    color: '#006B14',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  badgeLaranja: {
    backgroundColor: '#FFF3E0',
  },
  badgeTextoLaranja: {
    color: '#DA4A02',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});