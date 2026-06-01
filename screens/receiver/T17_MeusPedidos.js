import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getGlobalStyles } from '../../Styles';
import { useTheme } from '../../ThemeContext';
import FooterReceptor from './FooterReceptor';

const MEUS_PEDIDOS = [
  { id: 1, titulo: 'Marmita Caseira', doador: 'Sabor & Arte', status: 'Concluído', data: 'Hoje, 12:30', img: 'https://img.freepik.com/fotos-premium/a-autentica-marmita-brasileira-mais-conhecida-como-marmitex-feita-com-comida-tradicional-do-brasil_496782-2496.jpg' },
  { id: 2, titulo: 'Pães Frescos', doador: 'Padaria', status: 'Pendente', data: 'Amanhã, 08:00', img: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?q=80&w=250&auto=format&fit=crop' },
];

export default function T17_MeusPedidos({ navigation }) {
  const [abaAtiva, setAbaAtiva] = useState('Todos');
  const { theme } = useTheme();
  const styles = getGlobalStyles(theme);

  const pedidosFiltrados = MEUS_PEDIDOS.filter((item) => {
    if (abaAtiva === 'Todos') return true;
    return item.status === abaAtiva;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={theme.headerBackground} />

      <View style={[styles.header, { height: 70, justifyContent: 'center' }]}>
        <Text style={[styles.headerTitulo, { fontSize: 20, textAlign: 'center' }]}>Minhas Solicitações</Text>
      </View>

      <View style={styles.filtrosContainer}>
        {['Todos', 'Pendente', 'Concluído'].map((aba) => (
          <TouchableOpacity
            key={aba}
            style={[styles.filtroBotao, abaAtiva === aba && { backgroundColor: theme.secondary, borderColor: theme.secondary }]}
            onPress={() => setAbaAtiva(aba)}
          >
            <Text style={[styles.filtroTexto, abaAtiva === aba && styles.filtroTextoAtivo]}>{aba}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.conteudo} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}>
        {pedidosFiltrados.map((item) => {
          const isConcluido = item.status === 'Concluído';
          return (
            <TouchableOpacity key={item.id} style={styles.cardHistorico} activeOpacity={0.9}>
              <Image source={{ uri: item.img }} style={styles.cardImage} />
              <View style={styles.cardContentHistorico}>
                <Text style={styles.cardTitle}>{item.titulo}</Text>
                <Text style={styles.textoCard}>{item.doador}</Text>
                <Text style={{ fontSize: 12, color: theme.textMuted, marginBottom: 8 }}>{item.data}</Text>
                <View style={[styles.badgePendente, isConcluido ? { backgroundColor: theme.badgeAtivaBg, borderColor: theme.badgeAtivaBorder } : {}]}>
                  <Text style={[styles.badgePendenteTexto, isConcluido ? { color: theme.badgeAtivaText } : {}]}>{item.status}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <FooterReceptor navigation={navigation} abaAtual="Pedidos" />
    </SafeAreaView>
  );
}