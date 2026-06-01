import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, Image, Platform, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getGlobalStyles } from '../../Styles';
import { useTheme } from '../../ThemeContext';
import FooterReceptor from './FooterReceptor';

// IMPORTAÇÕES DO FIREBASE
import { db, auth } from '../../config/firebaseConfig';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export default function T19_HistoricoReceptor({ navigation }) {
  const [abaAtiva, setAbaAtiva] = useState('Todas');
  const [historico, setHistorico] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const { theme } = useTheme();
  const styles = getGlobalStyles(theme);

  useEffect(() => {
    const usuarioLogado = auth.currentUser;
    if (!usuarioLogado) return;

    // Filtra apenas itens CONCLUÍDOS do usuário receptor logado
    const q = query(
      collection(db, 'pedidos'),
      where('idReceptor', '==', usuarioLogado.uid),
      where('status', '==', 'Concluído')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const listaHistorico = [];
      snapshot.forEach((doc) => {
        listaHistorico.push({ id: doc.id, ...doc.data() });
      });
      setHistorico(listaHistorico);
      setCarregando(false);
    }, (error) => {
      console.error("Erro ao puxar histórico do Firebase:", error);
      setCarregando(false);
    });

    return () => unsubscribe();
  }, []);

  // CÁLCULOS TOTAIS EM TEMPO REAL BASEADO NO BANCO DE DADOS
  const totalItensRecebidos = historico.reduce((acc, curr) => acc + (curr.quantidadePedida || 0), 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={theme.headerBackground} />

      {/* Header */}
      <View style={[styles.header, {
        height: 70, flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between', paddingTop: Platform.OS === 'android' ? 12 : 8,
      }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.8}>
          <Ionicons name="arrow-back" size={22} color={theme.headerTextInverse} />
        </TouchableOpacity>
        <Text style={[styles.saudacao, { fontSize: 20, paddingBottom: 0 }]}>Histórico</Text>
        <TouchableOpacity style={styles.menuIcone} activeOpacity={0.7}>
          <Ionicons name="menu" size={24} color={theme.headerTextInverse} />
        </TouchableOpacity>
      </View>

      {/* Estatísticas Dinâmicas baseadas no Firestore */}
      <View style={styles.statsContainer}>
        <View style={[styles.statBox, { flex: 1, backgroundColor: theme.secondary, borderRadius: 14, paddingVertical: 14, alignItems: 'center' }]}>
          <Text style={[styles.statNumber, { color: theme.buttonTextInverse }]}>{historico.length}</Text>
          <Text style={[styles.statLabel, { color: 'rgba(255,255,255,0.8)' }]}>Resgates</Text>
        </View>
        <View style={[styles.statBox, { flex: 1, backgroundColor: theme.mode === 'dark' ? '#252525' : '#FFF3E0', borderRadius: 14, paddingVertical: 14, alignItems: 'center', marginHorizontal: 10 }]}>
          <Text style={[styles.statNumber, { color: theme.textPrimary }]}>{totalItensRecebidos}</Text>
          <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Itens Salvos</Text>
        </View>
        <View style={[styles.statBox, { flex: 1, backgroundColor: theme.mode === 'dark' ? '#252525' : '#FFF3E0', borderRadius: 14, paddingVertical: 14, alignItems: 'center' }]}>
          <Text style={[styles.statNumber, { color: theme.textPrimary }]}>Ativo</Text>
          <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Status Perfil</Text>
        </View>
      </View>

      {/* Lista de Itens Concluídos */}
      {carregando ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={theme.secondary} />
        </View>
      ) : (
        <ScrollView style={styles.conteudo} contentContainerStyle={styles.conteudoContainer} showsVerticalScrollIndicator={false}>
          <Text style={[styles.secaoTitulo, { color: theme.textMuted }]}>{historico.length} doações recebidas e encerradas</Text>

          {historico.map((item) => {
            const dataFm = item.dataCriacao?.toDate() ? item.dataCriacao.toDate().toLocaleDateString('pt-BR') : 'Concluído';
            return (
              <View key={item.id} style={[styles.cardHistorico, { backgroundColor: theme.cardBackground, borderColor: theme.mode === 'dark' ? '#333' : '#EEE', borderWidth: 1 }]}>
                <Image source={{ uri: item.imgDoacao || 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=300' }} style={[styles.cardImage, { width: 100, height: 110, borderRadius: 0 }]} />
                <View style={[styles.cardContentHistorico, { padding: 12 }]}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Text style={[styles.cardTitle, { fontWeight: '700', flex: 1, marginRight: 6, color: theme.textPrimary }]}>{item.tituloDoacao}</Text>
                    <View style={[styles.btnConcluido, { backgroundColor: theme.badgeAtivaBg }]}>
                      <Text style={[styles.btnConcluidoText, { color: theme.badgeAtivaText }]}>Recebido</Text>
                    </View>
                  </View>

                  <Text style={[styles.descricaoSolicitacao, { color: theme.textSecondary, marginBottom: 4 }]}>Qtd total: {item.quantidadePedida} unidades</Text>
                  
                  <View style={{ flexDirection: 'row', gap: 12, marginTop: 6, flexWrap: 'wrap' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                      <Ionicons name="storefront-outline" size={13} color={theme.secondary} />
                      <Text style={{ fontSize: 11, color: theme.textMuted }}>{item.nomeDoador}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                      <Ionicons name="calendar-outline" size={13} color={theme.textMuted} />
                      <Text style={{ fontSize: 11, color: theme.textMuted }}>{dataFm}</Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
          <View style={{ height: 20 }} />
        </ScrollView>
      )}

      <FooterReceptor navigation={navigation} abaAtual={null} />
    </SafeAreaView>
  );
}