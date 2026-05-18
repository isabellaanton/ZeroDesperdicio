import React, { useState, useEffect } from 'react';
import { 
  View, Text, TouchableOpacity, ScrollView, 
  SafeAreaView, StatusBar, Image, Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

import { getGlobalStyles } from '../../Styles';
import { useTheme } from '../../ThemeContext';
import FooterDoador from './FooterDoador';

export default function T07_MinhasDoacoes({ navigation }) {
  const [filtroAtivo, setFiltroAtivo] = useState('Todos');
  const [doacoes, setDoacoes] = useState([]);
  const isFocused = useIsFocused();
  const { theme } = useTheme();
  const styles = getGlobalStyles(theme);

  // Carregar doações do armazenamento e mesclar com exemplos
  const carregarDados = async () => {
    try {
      const locais = await AsyncStorage.getItem('@minhas_doacoes');
      const listaLocal = locais ? JSON.parse(locais) : [];
      
      // Dados estáticos (exemplo fixo)
      const estaticos = [
        { 
          id: '1', 
          titulo: 'Marmitas Prontas', 
          descricao: '5 unid • Consumo imediato', 
          status: 'pendente', 
          solicitacoes: 2, 
          img: 'https://img.freepik.com/fotos-premium/a-autentica-marmita-brasileira-mais-conhecida-como-marmitex-feita-com-comida-tradicional-do-brasil_496782-2496.jpg' 
        },
      ];

      setDoacoes([...listaLocal, ...estaticos]);
    } catch (e) {
      console.log("Erro ao carregar doações:", e);
    }
  };

  // Função para deletar uma doação
  const excluirDoacao = (id) => {
    Alert.alert(
      "Excluir Doação",
      "Tem certeza que deseja remover este item?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Excluir", 
          style: "destructive", 
          onPress: async () => {
            try {
              const locais = await AsyncStorage.getItem('@minhas_doacoes');
              if (locais) {
                const lista = JSON.parse(locais);
                const novaLista = lista.filter(item => item.id !== id);
                await AsyncStorage.setItem('@minhas_doacoes', JSON.stringify(novaLista));
                carregarDados(); // Atualiza a tela
              }
            } catch (e) {
              Alert.alert("Erro", "Não foi possível excluir.");
            }
          } 
        }
      ]
    );
  };

  useEffect(() => { if (isFocused) carregarDados(); }, [isFocused]);

  // Lógica de Filtro melhorada
  const filtradas = doacoes.filter(item => {
    if (filtroAtivo === 'Todos') return true;
    const statusLimpo = item.status.toLowerCase();
    if (filtroAtivo === 'Pendentes') return statusLimpo === 'pendente';
    if (filtroAtivo === 'Concluídos') return statusLimpo === 'concluido';
    return true;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      
      {/* Header Melhorado */}
      <View style={[styles.header, { height: 80, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.headerTextInverse} />
        </TouchableOpacity>
        <Text style={[styles.headerTitulo, { fontSize: 20 }]}>Minhas Doações</Text>
        <View style={{ width: 24 }} /> 
      </View>

      <ScrollView 
        style={styles.conteudoHomeDoador} 
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        
        {/* Filtros Estilizados como "Pills" */}
        <View style={{ flexDirection: 'row', padding: 15, gap: 10 }}>
          {['Todos', 'Pendentes', 'Concluídos'].map(f => (
            <TouchableOpacity 
              key={f} 
              onPress={() => setFiltroAtivo(f)} 
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 20,
                backgroundColor: filtroAtivo === f ? theme.primary : (theme.mode === 'dark' ? '#333' : '#f0f0f0'),
                borderWidth: 1,
                borderColor: filtroAtivo === f ? theme.primary : '#ddd'
              }}
            >
              <Text style={{ 
                color: filtroAtivo === f ? '#fff' : theme.textPrimary,
                fontWeight: filtroAtivo === f ? 'bold' : 'normal',
                fontSize: 13
              }}>
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={{ marginHorizontal: 15, marginBottom: 10, fontSize: 12, color: theme.textMuted, fontWeight: 'bold' }}>
          {filtradas.length} ITENS ENCONTRADOS
        </Text>

        {/* Listagem de Cards */}
        {filtradas.map((item) => (
          <View 
            key={item.id} 
            style={{ 
              backgroundColor: theme.cardBackground || (theme.mode === 'dark' ? '#1e1e1e' : '#fff'),
              marginHorizontal: 15,
              marginBottom: 12,
              borderRadius: 15,
              flexDirection: 'row',
              padding: 12,
              elevation: 3,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
            }}
          >
            <Image 
              source={{ uri: item.img }} 
              style={{ width: 85, height: 85, borderRadius: 10 }} 
            />
            
            <View style={{ flex: 1, marginLeft: 12, justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 16, color: theme.textPrimary }} numberOfLines={1}>
                    {item.titulo}
                  </Text>
                  <Text style={{ color: theme.textSecondary, fontSize: 12, marginTop: 2 }}>
                    {item.descricao}
                  </Text>
                </View>
                
                {/* Botão de Excluir */}
                <TouchableOpacity 
                  onPress={() => excluirDoacao(item.id)}
                  style={{ padding: 4 }}
                >
                  <Ionicons name="trash-outline" size={20} color="#ff4444" />
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                <View style={{ 
                  backgroundColor: item.status === 'pendente' ? '#fff3cd' : '#d4edda',
                  paddingHorizontal: 8,
                  paddingVertical: 2,
                  borderRadius: 5
                }}>
                  <Text style={{ 
                    fontSize: 10, 
                    fontWeight: 'bold', 
                    color: item.status === 'pendente' ? '#856404' : '#155724',
                    textTransform: 'uppercase'
                  }}>
                    {item.status}
                  </Text>
                </View>

                <TouchableOpacity 
                  onPress={() => navigation.navigate('DetalheDoacaoDoador', { doacaoId: item.id })}
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                >
                  <Text style={{ color: theme.primary, fontWeight: 'bold', fontSize: 13 }}>Ver mais</Text>
                  <Ionicons name="chevron-forward" size={14} color={theme.primary} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        {filtradas.length === 0 && (
          <View style={{ alignItems: 'center', marginTop: 50 }}>
            <Ionicons name="file-tray-outline" size={60} color={theme.textMuted} />
            <Text style={{ color: theme.textMuted, marginTop: 10 }}>Nenhuma doação encontrada.</Text>
          </View>
        )}
      </ScrollView>

      <FooterDoador navigation={navigation} abaAtual="Doacoes" />
    </SafeAreaView>
  );
}