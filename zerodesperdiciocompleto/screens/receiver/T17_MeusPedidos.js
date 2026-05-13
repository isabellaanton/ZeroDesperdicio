import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  SafeAreaView, StatusBar, Image, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../Styles';
import FooterReceptor from './FooterReceptor';

const MEUS_PEDIDOS = [
  { id: 1, titulo: 'Marmita Caseira',   doador: 'Restaurante Sabor & Arte', status: 'Concluído', data: 'Hoje, 12:30',    img: 'https://img.freepik.com/fotos-premium/a-autentica-marmita-brasileira-mais-conhecida-como-marmitex-feita-com-comida-tradicional-do-brasil_496782-2496.jpg' },
  { id: 2, titulo: 'Pães Frescos',       doador: 'Padaria Pão de Ouro',      status: 'Pendente',  data: 'Amanhã, 08:00', img: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?q=80&w=250&auto=format&fit=crop' },
  { id: 3, titulo: 'Legumes Variados',   doador: 'Hortifruti da Praça',      status: 'Concluído', data: 'Ontem, 18:00',  img: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?q=80&w=250&auto=format&fit=crop' },
];

export default function T17_MeusPedidos({ navigation }) {
  const [abaAtiva, setAbaAtiva] = useState('Todos');

  const pedidosFiltrados = MEUS_PEDIDOS.filter((pedido) => {
    if (abaAtiva === 'Todos') return true;
    return pedido.status === abaAtiva;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#006B14" />

      {/* Header */}
      <View style={[styles.header, {
        height: 70, flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between', paddingTop: Platform.OS === 'android' ? 12 : 8,
      }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation?.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={[styles.saudacao, { fontSize: 18, paddingBottom: 0 }]}>Meus Pedidos</Text>
        <TouchableOpacity style={styles.menuIcone}>
          <Ionicons name="menu" size={24} color="#FFF" />
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
            <Ionicons name="receipt-outline" size={48} color="#CCC" />
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
                  <Text style={{ fontSize: 12, color: '#999999', marginBottom: 8 }}>{item.data}</Text>
                  <View style={[
                    styles.badgePendente,
                    isConcluido
                      ? { backgroundColor: '#E8F5E9', borderColor: '#A8D5B5' }
                      : { backgroundColor: '#FFF3E0', borderColor: '#F0C49A' },
                  ]}>
                    <Text style={[
                      styles.badgePendenteTexto,
                      isConcluido ? { color: '#006B14' } : { color: '#A0511A' },
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