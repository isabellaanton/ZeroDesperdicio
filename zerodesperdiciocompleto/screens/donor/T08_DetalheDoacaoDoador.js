import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image,
  Alert
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getGlobalStyles } from '../../Styles';
import { useTheme } from '../../ThemeContext';
import FooterDoador from './FooterDoador';

export default function T08_DetalheDoacaoDoador({ route, navigation }) {
  const { theme } = useTheme();
  const styles = getGlobalStyles(theme);

  const { doacaoId, titulo, descricao, img } = route.params || {};

  // Agora as solicitações ficam em um estado
  const [solicitacoes, setSolicitacoes] = useState([
    {
      id: '1',
      nome: 'ONG Vida Nova',
      distancia: '2.5km de distância',
      mensagem:
        'Gostaríamos dessas marmitas para o projeto de jantar comunitário hoje à noite.',
    },
    {
      id: '2',
      nome: 'Instituto Esperança',
      distancia: '4.1km de distância',
      mensagem:
        'Temos famílias cadastradas que precisam de alimentos perecíveis.',
    },
  ]);

  // Remove visualmente um card
  const removerSolicitacao = (solicitacaoId) => {
    setSolicitacoes((prev) =>
      prev.filter((item) => item.id !== solicitacaoId)
    );
  };

  // RECUSAR
  const handleRecusar = (solicitacaoId) => {
    removerSolicitacao(solicitacaoId);

    Alert.alert(
      'Solicitação recusada',
      'A solicitação foi removida com sucesso.'
    );
  };

  // ACEITAR
  const handleAceitar = async (solicitacaoId) => {
    try {
      // Remove o card da tela
      removerSolicitacao(solicitacaoId);

      // Busca doações salvas
      const dados = await AsyncStorage.getItem('@minhas_doacoes');

      if (dados) {
        const lista = JSON.parse(dados);

        // Atualiza apenas a doação correta
        const novaLista = lista.map((item) => {
          if (item.id === doacaoId) {
            return {
              ...item,
              status: 'concluido',
            };
          }

          return item;
        });

        // Salva novamente
        await AsyncStorage.setItem(
          '@minhas_doacoes',
          JSON.stringify(novaLista)
        );
      }

      Alert.alert(
        'Solicitação aceita',
        'A doação foi concluída com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      console.log(error);

      Alert.alert(
        'Erro',
        'Não foi possível aceitar a solicitação.'
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.headerBackground}
      />

      {/* Header */}
      <View
        style={[
          styles.header,
          { height: 70, justifyContent: 'center' },
        ]}
      >
        <View
          style={[
            styles.headerTop,
            {
              justifyContent: 'space-between',
              width: '100%',
              paddingHorizontal: 15,
            },
          ]}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back"
              size={26}
              color={theme.headerTextInverse}
            />
          </TouchableOpacity>

          <Text
            style={[styles.headerTitulo, { fontSize: 20 }]}
          >
            Gerenciar Doação
          </Text>

          <View style={{ width: 26 }} />
        </View>
      </View>

      <ScrollView
        style={styles.conteudoHomeDoador}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Resumo da Doação */}
        <View
          style={{
            padding: 20,
            backgroundColor: theme.cardBackground,
            marginBottom: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Image
            source={{ uri: img }}
            style={{
              width: 60,
              height: 60,
              borderRadius: 10,
              marginRight: 15,
            }}
          />

          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: theme.textPrimary,
              }}
            >
              {titulo || 'Doação'}
            </Text>

            <Text style={{ color: theme.textSecondary }}>
              {descricao}
            </Text>
          </View>
        </View>

        <Text
          style={[
            styles.secaoTitulo,
            { marginLeft: 20, marginTop: 10 },
          ]}
        >
          SOLICITAÇÕES RECEBIDAS
        </Text>

        {/* Lista dinâmica */}
        {solicitacoes.map((solicitacao) => (
          <View
            key={solicitacao.id}
            style={[
              styles.cardSolicitacao,
              {
                marginHorizontal: 20,
                padding: 15,
                borderRadius: 15,
                elevation: 3,
                marginBottom: 15,
              },
            ]}
          >
            <View style={styles.cardHeader}>
              <View>
                <Text
                  style={[
                    styles.nomeOng,
                    { fontSize: 18 },
                  ]}
                >
                  {solicitacao.nome}
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    color: theme.textMuted,
                  }}
                >
                  📍 {solicitacao.distancia}
                </Text>
              </View>

              <View
                style={[
                  styles.badgePendente,
                  { backgroundColor: '#fff3cd' },
                ]}
              >
                <Text
                  style={[
                    styles.badgePendenteTexto,
                    { color: '#856404' },
                  ]}
                >
                  pendente
                </Text>
              </View>
            </View>

            <Text
              style={[
                styles.descricaoSolicitacao,
                { marginVertical: 10 },
              ]}
            >
              "{solicitacao.mensagem}"
            </Text>

            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                marginTop: 5,
              }}
            >
              {/* ACEITAR */}
              <TouchableOpacity
                style={[
                  styles.botaoAceitar,
                  {
                    flex: 1,
                    backgroundColor: '#28a745',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}
                onPress={() =>
                  handleAceitar(solicitacao.id)
                }
              >
                <Ionicons
                  name="checkmark-circle"
                  size={18}
                  color="#fff"
                />

                <Text
                  style={[
                    styles.botaoAceitarTexto,
                    { marginLeft: 5 },
                  ]}
                >
                  Aceitar
                </Text>
              </TouchableOpacity>

              {/* RECUSAR */}
              <TouchableOpacity
                style={[
                  styles.botaoRecusar,
                  {
                    flex: 1,
                    borderColor: '#dc3545',
                    borderWidth: 1,
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}
                onPress={() =>
                  handleRecusar(solicitacao.id)
                }
              >
                <Ionicons
                  name="close-circle"
                  size={18}
                  color="#dc3545"
                />

                <Text
                  style={[
                    styles.botaoRecusarTexto,
                    {
                      color: '#dc3545',
                      marginLeft: 5,
                    },
                  ]}
                >
                  Recusar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Caso todas sejam removidas */}
        {solicitacoes.length === 0 && (
          <View
            style={{
              alignItems: 'center',
              marginTop: 40,
            }}
          >
            <Ionicons
              name="checkmark-done-circle-outline"
              size={60}
              color={theme.textMuted}
            />

            <Text
              style={{
                color: theme.textMuted,
                marginTop: 10,
              }}
            >
              Nenhuma solicitação restante.
            </Text>
          </View>
        )}
      </ScrollView>

      <FooterDoador
        navigation={navigation}
        abaAtual="Doacoes"
      />
    </SafeAreaView>
  );
}