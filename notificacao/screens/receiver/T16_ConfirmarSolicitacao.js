import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  SafeAreaView, StatusBar, TextInput, StyleSheet, Platform, Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import FooterReceptor from './FooterReceptor'; 

const VERDE       = '#006B14';
const VERDE_LIGHT = '#E8F5E9';
const LARANJA     = '#DA4A02';
const CINZA       = '#888888';
const BORDA       = '#EEEEEE';
const BRANCO      = '#FFFFFF';
const TEXTO       = '#1A1A1A';
const BG          = '#FFDDAE';

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
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="light-content" backgroundColor={VERDE} />

      {/* ── HEADER ── */}
      <View style={s.header}>
        <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={BRANCO} />
        </TouchableOpacity>
        <Text style={s.headerTitulo}>Confirmar Solicitação</Text>
        <View style={{ width: 38 }} />
      </View>

      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* ── CARD RESUMO DA DOAÇÃO ── */}
        <View style={s.cardResumo}>
          <View style={s.cardResumoIcone}>
            <Text style={{ fontSize: 32 }}>{doacao.icone}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.cardResumoLabel}>Selecionado</Text>
            <Text style={s.cardResumoNome}>{doacao.nome}</Text>
            <Text style={s.cardResumoSub}>{doacao.tipo}</Text>
          </View>
        </View>

        {/* ── INFORMAÇÕES ── */}
        <Text style={s.secaoTitulo}>DETALHES</Text>
        <View style={s.card}>
          <View style={s.infoRow}>
            <View style={s.infoIconeBox}>
              <Ionicons name="storefront-outline" size={17} color={VERDE} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.infoLabel}>Doador</Text>
              <Text style={s.infoValor}>{doacao.doador}</Text>
            </View>
          </View>
          <View style={s.infoRow}>
            <View style={s.infoIconeBox}>
              <Ionicons name="location-outline" size={17} color={VERDE} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.infoLabel}>Endereço de retirada</Text>
              <Text style={s.infoValor}>{doacao.endereco}</Text>
            </View>
          </View>
          <View style={[s.infoRow, { borderBottomWidth: 0, paddingBottom: 0 }]}>
            <View style={s.infoIconeBox}>
              <Ionicons name="time-outline" size={17} color={VERDE} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.infoLabel}>Disponível até</Text>
              <Text style={s.infoValor}>{doacao.disponivel}</Text>
            </View>
          </View>
        </View>

        {/* ── QUANTIDADE ── */}
        <Text style={s.secaoTitulo}>QUANTIDADE</Text>
        <View style={s.card}>
          <View style={s.quantidadeRow}>
            <Text style={s.quantidadeLabel}>Quantas unidades?</Text>
            <View style={s.quantidadeControle}>
              <TouchableOpacity style={s.qtdBtn} onPress={decrementar} activeOpacity={0.8}>
                <Ionicons name="remove" size={20} color={LARANJA} />
              </TouchableOpacity>
              <TextInput
                style={s.qtdInput}
                value={quantidade}
                onChangeText={(v) => setQuantidade(v.replace(/[^0-9]/g, ''))}
                keyboardType="numeric"
                maxLength={2}
                textAlign="center"
              />
              <TouchableOpacity style={s.qtdBtn} onPress={incrementar} activeOpacity={0.8}>
                <Ionicons name="add" size={20} color={LARANJA} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* ── OBSERVAÇÃO ── */}
        <Text style={s.secaoTitulo}>OBSERVAÇÃO (OPCIONAL)</Text>
        <View style={s.card}>
          <TextInput
            style={s.inputObservacao}
            placeholder="Ex: Tenho alergia a amendoim, preciso de 5 sem carne..."
            placeholderTextColor={CINZA}
            multiline
            numberOfLines={3}
            value={observacao}
            onChangeText={setObservacao}
            textAlignVertical="top"
          />
        </View>

        {/* ── AVISO ── */}
        <View style={s.avisoBox}>
          <Ionicons name="information-circle-outline" size={18} color={VERDE} />
          <Text style={s.avisoTexto}>
            Ao solicitar, o doador receberá uma notificação e poderá aceitar ou recusar seu pedido.
          </Text>
        </View>

        {/* ── BOTÃO ── */}
        <TouchableOpacity
          style={[s.btnSolicitar, enviando && s.btnEnviando]}
          onPress={handleSolicitar}
          activeOpacity={0.85}
          disabled={enviando}
        >
          {enviando ? (
            <Text style={s.btnSolicitarTexto}>Enviando...</Text>
          ) : (
            <>
              <Text style={s.btnSolicitarTexto}>Confirmar Solicitação</Text>
              <Ionicons name="checkmark-circle-outline" size={20} color={BRANCO} />
            </>
          )}
        </TouchableOpacity>

      {/* Fechamos o ScrollView aqui no lugar daquelas Views antigas! */}
      </ScrollView>

      {/* ── FOOTER ── */}
      <FooterReceptor navigation={navigation} abaAtual="Mapa" />

    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },

  header: {
    backgroundColor: VERDE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 12 : 8,
    paddingBottom: 14,
  },
  backBtn: {
    width: 38, height: 38,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 19,
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitulo: { color: BRANCO, fontSize: 18, fontWeight: '700' },

  scroll: { flex: 1 },
  scrollContent: { padding: 16 },

  // Card resumo
  cardResumo: {
    backgroundColor: BRANCO,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: LARANJA,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  cardResumoIcone: {
    width: 60, height: 60, borderRadius: 14,
    backgroundColor: '#FFF3E0',
    alignItems: 'center', justifyContent: 'center',
  },
  cardResumoLabel: { fontSize: 11, color: LARANJA, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  cardResumoNome: { fontSize: 18, fontWeight: '800', color: TEXTO, marginTop: 2 },
  cardResumoSub: { fontSize: 12, color: CINZA, marginTop: 2 },

  secaoTitulo: {
    fontSize: 11, fontWeight: '700', color: CINZA,
    textTransform: 'uppercase', letterSpacing: 1,
    marginBottom: 10, marginLeft: 2,
  },

  card: {
    backgroundColor: BRANCO,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: BORDA,
  },
  infoIconeBox: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: VERDE_LIGHT,
    alignItems: 'center', justifyContent: 'center',
  },
  infoLabel: { fontSize: 11, color: CINZA, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.4 },
  infoValor: { fontSize: 14, color: TEXTO, fontWeight: '500', marginTop: 1 },

  // Quantidade
  quantidadeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantidadeLabel: { fontSize: 15, color: TEXTO, fontWeight: '500' },
  quantidadeControle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  qtdBtn: {
    width: 38, height: 38,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: LARANJA,
    alignItems: 'center', justifyContent: 'center',
  },
  qtdInput: {
    width: 52, height: 38,
    borderWidth: 2, borderColor: BORDA,
    borderRadius: 10,
    fontSize: 18, fontWeight: '700', color: TEXTO,
  },

  // Observação
  inputObservacao: {
    fontSize: 14, color: TEXTO,
    minHeight: 80,
    lineHeight: 22,
  },

  // Aviso
  avisoBox: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
    backgroundColor: VERDE_LIGHT,
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  avisoTexto: { flex: 1, fontSize: 13, color: VERDE, lineHeight: 19 },

  // Botão
  btnSolicitar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: VERDE,
    borderRadius: 14,
    paddingVertical: 16,
    elevation: 3,
    shadowColor: VERDE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  btnEnviando: { backgroundColor: '#A5D6A7', elevation: 0 },
  btnSolicitarTexto: { fontSize: 16, fontWeight: '700', color: BRANCO },
});