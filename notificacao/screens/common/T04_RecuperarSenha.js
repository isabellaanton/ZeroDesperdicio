import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  SafeAreaView, StatusBar, ScrollView, StyleSheet, Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// ── Paleta ──────────────────────────────────────────────
const VERDE       = '#006B14';
const VERDE_LIGHT = '#E8F5E9';
const LARANJA     = '#DA4A02';
const CINZA       = '#888888';
const BORDA       = '#DDDDDD';
const BRANCO      = '#FFFFFF';
const TEXTO       = '#1A1A1A';

// ── Componente de Requisito ──────────────────────────────
const Requisito = ({ texto, validado }) => (
  <View style={s.requisitoRow}>
    <View style={[s.requisitoIcone, validado && s.requisitoIconeOk]}>
      <MaterialCommunityIcons
        name={validado ? 'check' : 'minus'}
        size={12}
        color={validado ? BRANCO : CINZA}
      />
    </View>
    <Text style={[s.requisitoTexto, validado && s.requisitoTextoOk]}>
      {texto}
    </Text>
  </View>
);

// ── Tela Principal ───────────────────────────────────────
export default function T04_RecuperarSenha({ navigation }) {
  const [etapa, setEtapa] = useState(1);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirma, setConfirma] = useState('');
  const [verSenha, setVerSenha] = useState(false);
  const [verConfirma, setVerConfirma] = useState(false);

  // Validações
  const temOito = senha.length >= 8;
  const temMaiuscula = /[A-Z]/.test(senha);
  const temNumOuSim = /[0-9!@#$%^&*(),.?":{}|<>]/.test(senha);
  const senhasIguais = senha === confirma && confirma.length > 0;
  const senhaValida = temOito && temMaiuscula && temNumOuSim;

  const score = [temOito, temMaiuscula, temNumOuSim].filter(Boolean).length;
  const scoreCor = score === 0 ? BORDA : score === 1 ? LARANJA : score === 2 ? '#FFC107' : VERDE;

  const handleEnviarEmail = () => {
    if (!email.includes('@')) {
      alert('Digite um e-mail válido.');
      return;
    }
    setEtapa(2);
  };

  const handleSalvarSenha = () => {
    if (!senhaValida || !senhasIguais) {
      alert('Verifique os requisitos da senha.');
      return;
    }
    alert('Senha alterada com sucesso!');
    navigation.navigate('Login', { email });
  };

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="light-content" backgroundColor={VERDE} />

      <View style={s.header}>
        <TouchableOpacity style={s.backBtn} onPress={() => etapa === 2 ? setEtapa(1) : navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={22} color={BRANCO} />
        </TouchableOpacity>
        <Text style={s.headerTitulo}>Recuperar senha</Text>
        <View style={{ width: 38 }} />
      </View>

      <View style={s.stepsRow}>
        <View style={s.stepItem}>
          <View style={[s.stepCirculo, etapa >= 1 && s.stepCirculoAtivo]}>
            <Text style={[s.stepNum, etapa >= 1 && s.stepNumAtivo]}>1</Text>
          </View>
          <Text style={[s.stepLabel, etapa >= 1 && s.stepLabelAtivo]}>E-mail</Text>
        </View>
        <View style={[s.stepLinha, etapa === 2 && s.stepLinhaAtiva]} />
        <View style={s.stepItem}>
          <View style={[s.stepCirculo, etapa === 2 && s.stepCirculoAtivo]}>
            <Text style={[s.stepNum, etapa === 2 && s.stepNumAtivo]}>2</Text>
          </View>
          <Text style={[s.stepLabel, etapa === 2 && s.stepLabelAtivo]}>Nova senha</Text>
        </View>
      </View>

      <ScrollView style={s.scroll} contentContainerStyle={s.scrollContent}>
        {etapa === 1 ? (
          <View>
            <Text style={s.titulo}>Esqueceu sua senha?</Text>
            <Text style={s.descricao}>Digite o e-mail cadastrado para criar uma nova senha.</Text>
            
            <Text style={s.label}>E-mail</Text>
            <View style={s.inputBox}>
              <MaterialCommunityIcons name="email-outline" size={20} color={CINZA} style={s.inputIcone} />
              <TextInput
                style={s.inputTexto}
                placeholder="seu@email.com"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity style={[s.botao, !email.includes('@') && s.botaoDesabilitado]} onPress={handleEnviarEmail}>
              <Text style={s.botaoTexto}>Enviar link</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text style={s.titulo}>Nova senha</Text>
            <Text style={s.label}>Senha</Text>
            <View style={s.inputBox}>
              <TextInput
                style={s.inputTexto}
                secureTextEntry={!verSenha}
                value={senha}
                onChangeText={setSenha}
              />
              <TouchableOpacity onPress={() => setVerSenha(!verSenha)}>
                <MaterialCommunityIcons name={verSenha ? "eye-off" : "eye"} size={20} color={CINZA} />
              </TouchableOpacity>
            </View>

            <View style={s.requisitosBox}>
              <Requisito texto="Mínimo 8 caracteres" validado={temOito} />
              <Requisito texto="Uma letra maiúscula" validado={temMaiuscula} />
              <Requisito texto="Número ou símbolo" validado={temNumOuSim} />
            </View>

            <Text style={s.label}>Confirmar Senha</Text>
            <View style={[s.inputBox, confirma && !senhasIguais && s.inputErro]}>
              <TextInput
                style={s.inputTexto}
                secureTextEntry={!verConfirma}
                value={confirma}
                onChangeText={setConfirma}
              />
            </View>

            <TouchableOpacity 
                style={[s.botao, (!senhaValida || !senhasIguais) && s.botaoDesabilitado]} 
                onPress={handleSalvarSenha}
            >
              <Text style={s.botaoTexto}>Salvar Nova Senha</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BRANCO },
  header: {
    backgroundColor: VERDE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 40 : 10,
    paddingBottom: 14,
  },
  backBtn: {
    width: 38, height: 38,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 19,
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitulo: { color: BRANCO, fontSize: 18, fontWeight: '700' },
  stepsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BRANCO,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderBottomWidth: 1,
    borderBottomColor: BORDA,
  },
  stepItem: { alignItems: 'center' },
  stepCirculo: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: '#E0E0E0',
    alignItems: 'center', justifyContent: 'center',
  },
  stepCirculoAtivo: { backgroundColor: VERDE },
  stepNum: { fontSize: 14, fontWeight: '700', color: CINZA },
  stepNumAtivo: { color: BRANCO },
  stepLabel: { fontSize: 11, color: CINZA, marginTop: 4 },
  stepLabelAtivo: { color: LARANJA, fontWeight: '600' },
  stepLinha: { flex: 1, height: 2, backgroundColor: BORDA, marginHorizontal: 10, alignSelf: 'center', marginTop: -15 },
  stepLinhaAtiva: { backgroundColor: VERDE },
  scroll: { flex: 1 },
  scrollContent: { padding: 24 },
  titulo: { fontSize: 22, fontWeight: '800', color: TEXTO, marginBottom: 8 },
  descricao: { fontSize: 14, color: CINZA, marginBottom: 28 },
  label: { fontSize: 13, fontWeight: '600', color: TEXTO, marginBottom: 8 },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: BORDA,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    marginBottom: 16,
  },
  inputErro: { borderColor: LARANJA },
  inputIcone: { marginRight: 10 },
  inputTexto: { flex: 1, fontSize: 15, color: TEXTO },
  requisitosBox: {
    backgroundColor: VERDE_LIGHT,
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
  },
  requisitoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  requisitoIcone: {
    width: 18, height: 18, borderRadius: 9,
    backgroundColor: '#E0E0E0',
    alignItems: 'center', justifyContent: 'center',
    marginRight: 10
  },
  requisitoIconeOk: { backgroundColor: VERDE },
  requisitoTexto: { fontSize: 13, color: CINZA },
  requisitoTextoOk: { color: VERDE, fontWeight: '600' },
  botao: {
    backgroundColor: LARANJA,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  botaoDesabilitado: { backgroundColor: '#CCC' },
  botaoTexto: { color: BRANCO, fontSize: 16, fontWeight: '700' },
});