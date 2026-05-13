import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  SafeAreaView, StatusBar, TextInput, Alert, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../Styles';
import FooterReceptor from './FooterReceptor';

export default function T16_ConfirmarSolicitacao({ navigation, route }) {
  const doacao = route?.params?.doacao ?? {
    nome: 'Marmita Caseira',
    tipo: 'Pronto para consumo',
    disponivel: 'Hoje, 20:00',
    endereco: 'Rua das Flores, 123',
    doador: 'Restaurante Sabor & Arte',
    icone: '🍽️',
  };

  const [quantidade, setQuantidade] = useState('1');
  const [observacao, setObservacao] = useState('');
  const [enviando, setEnviando] = useState(false);

  const incrementar = () => setQuantidade((q) => String(Math.min(99, Number(q) + 1)));
  const decrementar = () => setQuantidade((q) => String(Math.max(1, Number(q) - 1)));

  const handleSolicitar = () => {
    setEnviando(true);
    setTimeout(() => {
      setEnviando(false);
      Alert.alert(
        '✅ Solicitação enviada!',
        `Sua solicitação de ${quantidade} unidade(s) de "${doacao.nome}" foi enviada ao doador.`,
        [{ text: 'Ver meus pedidos', onPress: () => navigation.navigate('MeusPedidos') }]
      );
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#006B14" />

      {/* Header */}
      <View style={[styles.header, {
        height: 70, flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between', paddingTop: Platform.OS === 'android' ? 12 : 8,
      }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={[styles.saudacao, { fontSize: 18, paddingBottom: 0 }]}>Confirmar Solicitação</Text>
        <View style={{ width: 38 }} />
      </View>

      <ScrollView
        style={styles.conteudo}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Card resumo */}
        <View style={[styles.cardSolicitacao, { flexDirection: 'row', alignItems: 'center', gap: 14, borderLeftWidth: 4, borderLeftColor: '#DA4A02' }]}>
          <View style={[styles.infoIcone, { width: 60, height: 60, borderRadius: 14, backgroundColor: '#FFF3E0' }]}>
            <Text style={{ fontSize: 32 }}>{doacao.icone}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardLabel}>Selecionado</Text>
            <Text style={styles.nomeOng}>{doacao.nome}</Text>
            <Text style={styles.descricaoSolicitacao}>{doacao.tipo}</Text>
          </View>
        </View>

        {/* Detalhes */}
        <Text style={styles.secaoTitulo}>DETALHES</Text>
        <View style={styles.cardSolicitacao}>
          <View style={styles.infoRow}>
            <View style={styles.infoIcone}><Ionicons name="storefront-outline" size={17} color="#006B14" /></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.infoLabel}>Doador</Text>
              <Text style={styles.infoValor}>{doacao.doador}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.infoIcone}><Ionicons name="location-outline" size={17} color="#006B14" /></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.infoLabel}>Endereço de retirada</Text>
              <Text style={styles.infoValor}>{doacao.endereco}</Text>
            </View>
          </View>
          <View style={[styles.infoRow, { borderBottomWidth: 0, paddingBottom: 0 }]}>
            <View style={styles.infoIcone}><Ionicons name="time-outline" size={17} color="#006B14" /></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.infoLabel}>Disponível até</Text>
              <Text style={styles.infoValor}>{doacao.disponivel}</Text>
            </View>
          </View>
        </View>

        {/* Quantidade */}
        <Text style={styles.secaoTitulo}>QUANTIDADE</Text>
        <View style={styles.cardSolicitacao}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.infoValor}>Quantas unidades?</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <TouchableOpacity
                style={[styles.botaoRecusar, { width: 38, height: 38, flex: undefined, paddingVertical: 0, justifyContent: 'center' }]}
                onPress={decrementar}
              >
                <Ionicons name="remove" size={20} color="#DA4A02" />
              </TouchableOpacity>
              <TextInput
                style={styles.inputPequeno}
                value={quantidade}
                onChangeText={(v) => setQuantidade(v.replace(/[^0-9]/g, ''))}
                keyboardType="numeric"
                maxLength={2}
                textAlign="center"
              />
              <TouchableOpacity
                style={[styles.botaoRecusar, { width: 38, height: 38, flex: undefined, paddingVertical: 0, justifyContent: 'center' }]}
                onPress={incrementar}
              >
                <Ionicons name="add" size={20} color="#DA4A02" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Observação */}
        <Text style={styles.secaoTitulo}>OBSERVAÇÃO (OPCIONAL)</Text>
        <View style={styles.cardSolicitacao}>
          <TextInput
            style={styles.inputGrande}
            placeholder="Ex: Tenho alergia a amendoim, preciso de 5 sem carne..."
            placeholderTextColor="#888888"
            multiline
            numberOfLines={3}
            value={observacao}
            onChangeText={setObservacao}
            textAlignVertical="top"
          />
        </View>

        {/* Aviso */}
        <View style={[styles.cardSolicitacao, { flexDirection: 'row', gap: 10, alignItems: 'flex-start', backgroundColor: '#E8F5E9', borderColor: '#C8E6C9' }]}>
          <Ionicons name="information-circle-outline" size={18} color="#006B14" />
          <Text style={[styles.infoValor, { flex: 1, color: '#006B14', lineHeight: 19 }]}>
            Ao solicitar, o doador receberá uma notificação e poderá aceitar ou recusar seu pedido.
          </Text>
        </View>

        {/* Botão */}
        <TouchableOpacity
          style={[styles.botaoAceitar, { paddingVertical: 16, borderRadius: 14, flexDirection: 'row', justifyContent: 'center', gap: 8, opacity: enviando ? 0.6 : 1 }]}
          onPress={handleSolicitar}
          disabled={enviando}
          activeOpacity={0.85}
        >
          <Text style={styles.botaoAceitarTexto}>{enviando ? 'Enviando...' : 'Confirmar Solicitação'}</Text>
          {!enviando && <Ionicons name="checkmark-circle-outline" size={20} color="#FFFFFF" />}
        </TouchableOpacity>

      </ScrollView>

      <FooterReceptor navigation={navigation} abaAtual="Mapa" />
    </SafeAreaView>
  );
}