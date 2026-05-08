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
  // Etapa 1 = e-mail, Etapa 2 = nova senha
  const [etapa, setEtapa] = useState(1);

  // Campos
  const [email, setEmail]         = useState('');
  const [senha, setSenha]         = useState('');
  const [confirma, setConfirma]   = useState('');
  const [verSenha, setVerSenha]   = useState(false);
  const [verConfirma, setVerConfirma] = useState(false);

  // Validações em tempo real
  const temOito     = senha.length >= 8;
  const temMaiuscula = /[A-Z]/.test(senha);
  const temNumOuSim  = /[0-9!@#$%^&*(),.?":{}|<>]/.test(senha);
  const senhasIguais = senha === confirma && confirma.length > 0;
  const senhaValida  = temOito && temMaiuscula && temNumOuSim;

  // Progresso visual dos requisitos (0-3)
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
    if (!senhaValida) {
      alert('Sua senha não atende aos requisitos.');
      return;
    }
    if (!senhasIguais) {
      alert('As senhas não coincidem.');
      return;
    }
    alert('Senha alterada com sucesso!');
    navigation.navigate('Login', { email }); // devolve o e-mail preenchido
  };

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="light-content" backgroundColor={VERDE} />

      {/* ── HEADER ── */}
      <View style={s.header}>
        <TouchableOpacity style={s.backBtn} onPress={() => etapa === 2 ? setEtapa(1) : navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={22} color={BRANCO} />
        </TouchableOpacity>
        <Text style={s.headerTitulo}>Recuperar senha</Text>
        <View style={{ width: 38 }} />
      </View>

      {/* ── STEPS ── */}
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

      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* ════════════════ ETAPA 1 ════════════════ */}
        {etapa === 1 && (
          <View>
            <Text style={s.titulo}>Esqueceu sua senha?</Text>
            <Text style={s.descricao}>
              Digite o e-mail cadastrado e enviaremos um link para você criar uma nova senha.
            </Text>

            <Text style={s.label}>E-mail</Text>
            <View style={s.inputBox}>
              <MaterialCommunityIcons name="email-outline" size={20} color={CINZA} style={s.inputIcone} />
              <TextInput
                style={s.inputTexto}
                placeholder="seu@email.com"
                placeholderTextColor={CINZA}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <TouchableOpacity
              style={[s.botao, !email.includes('@') && s.botaoDesabilitado]}
              onPress={handleEnviarEmail}
              activeOpacity={0.85}
            >
              <Text style={s.botaoTexto}>Enviar link de recuperação</Text>
            </TouchableOpacity>

            <TouchableOpacity style={s.voltarLink} onPress={() => navigation.navigate('Login')}>
              <MaterialCommunityIcons name="arrow-left" size={16} color={VERDE} />
              <Text style={s.voltarTexto}>Voltar para o login</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ════════════════ ETAPA 2 ════════════════ */}
        {etapa === 2 && (
          <View>
            <Text style={s.titulo}>Crie sua nova senha</Text>
            <Text style={s.descricao}>
              Escolha uma senha forte para proteger sua conta.
            </Text>

            {/* Nova senha */}
            <Text style={s.label}>Nova senha</Text>
            <View style={s.inputBox}>
              <MaterialCommunityIcons name="lock-outline" size={20} color={CINZA} style={s.inputIcone} />
              <TextInput
                style={s.inputTexto}
                placeholder="Digite a nova senha"
                placeholderTextColor={CINZA}
                secureTextEntry={!verSenha}
                value={senha}
                onChangeText={setSenha}
              />
              <TouchableOpacity onPress={() => setVerSenha(!verSenha)}>
                <MaterialCommunityIcons
                  name={verSenha ? 'eye-outline' : 'eye-off-outline'}
                  size={20} color={CINZA}
                />
              </TouchableOpacity>
            </View>

            {/* Barra de força */}
            {senha.length > 0 && (
              <View style={s.forcaContainer}>
                <View style={s.forcaBarras}>
                  {[1, 2, 3].map((n) => (
                    <View
                      key={n}
                      style={[s.forcaBarra, { backgroundColor: score >= n ? scoreCor : BORDA }]}
                    />
                  ))}
                </View>
                <Text style={[s.forcaTexto, { color: scoreCor }]}>
                  {score === 1 ? 'Fraca' : score === 2 ? 'Média' : 'Forte'}
                </Text>
              </View>
            )}

            {/* Requisitos */}
            <View style={s.requisitosBox}>
              <Text style={s.requisitosTitulo}>Sua senha deve conter:</Text>
              <Requisito texto="Mínimo 8 caracteres"          validado={temOito} />
              <Requisito texto="Pelo menos uma letra maiúscula" validado={temMaiuscula} />
              <Requisito texto="Um número ou símbolo"          validado={temNumOuSim} />
            </View>

            {/* Confirmar senha */}
            <Text style={s.label}>Confirmar senha</Text>
            <View style={[s.inputBox, confirma.length > 0 && (senhasIguais ? s.inputOk : s.inputErro)]}>
              <MaterialCommunityIcons name="lock-check-outline" size={20} color={CINZA} style={s.inputIcone} />
              <TextInput
                style={s.inputTexto}
                placeholder="Repita a nova senha"
                placeholderTextColor={CINZA}
                secureTextEntry={!verConfirma}
                value={confirma}
                onChangeText={setConfirma}
              />
              <TouchableOpacity onPress={() => setVerConfirma(!verConfirma)}>
                <MaterialCommunityIcons
                  name={verConfirma ? 'eye-outline' : 'eye-off-outline'}
                  size={20} color={CINZA}
                />
              </TouchableOpacity>
            </View>
            {confirma.length > 0 && !senhasIguais && (
              <Text style={s.erroTexto}>As senhas não coincidem</Text>
            )}

            <TouchableOpacity
              style={[s.botao, (!senhaValida || !senhasIguais) && s.botaoDesabilitado]}
              onPress={handleSalvarSenha}
              activeOpacity={0.85}
            >
              <Text style={s.botaoTexto}>Salvar nova senha</Text>
            </TouchableOpacity>

            <TouchableOpacity style={s.voltarLink} onPress={() => navigation.navigate('Login')}>
              <MaterialCommunityIcons name="arrow-left" size={16} color={VERDE} />
              <Text style={s.voltarTexto}>Voltar para o login</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// ── Estilos ──────────────────────────────────────────────
const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F5F5F5' },

  // Header
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

  // Steps
  stepsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BRANCO,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderBottomWidth: 1,
    borderBottomColor: BORDA,
    gap: 8,
  },
  stepItem: { alignItems: 'center', gap: 4 },
  stepCirculo: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: '#E0E0E0',
    alignItems: 'center', justifyContent: 'center',
  },
  stepCirculoAtivo: { backgroundColor: VERDE },
  stepNum: { fontSize: 14, fontWeight: '700', color: CINZA },
  stepNumAtivo: { color: BRANCO },
  stepLabel: { fontSize: 11, color: CINZA },
  stepLabelAtivo: { color: LARANJA, fontWeight: '600' },
  stepLinha: { flex: 1, height: 2, backgroundColor: BORDA, marginBottom: 16 },
  stepLinhaAtiva: { backgroundColor: VERDE },

  // Scroll
  scroll: { flex: 1 },
  scrollContent: { padding: 24, paddingBottom: 48 },

  // Textos
  titulo: { fontSize: 22, fontWeight: '800', color: TEXTO, marginBottom: 8 },
  descricao: { fontSize: 14, color: CINZA, lineHeight: 20, marginBottom: 28 },
  label: { fontSize: 13, fontWeight: '600', color: TEXTO, marginBottom: 8 },

  // Input
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BRANCO,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: BORDA,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    marginBottom: 16,
  },
  inputOk:   { borderColor: VERDE },
  inputErro: { borderColor: LARANJA },
  inputIcone: { marginRight: 10 },
  inputTexto: { flex: 1, fontSize: 15, color: TEXTO },

  // Força da senha
  forcaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: -8,
    marginBottom: 12,
  },
  forcaBarras: { flexDirection: 'row', gap: 4, flex: 1 },
  forcaBarra: { flex: 1, height: 4, borderRadius: 2 },
  forcaTexto: { fontSize: 12, fontWeight: '600', width: 40 },

  // Requisitos
  requisitosBox: {
    backgroundColor: VERDE_LIGHT,
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  requisitosTitulo: {
    fontSize: 12, fontWeight: '700', color: VERDE,
    marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5,
  },
  requisitoRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  requisitoIcone: {
    width: 18, height: 18, borderRadius: 9,
    backgroundColor: '#E0E0E0',
    alignItems: 'center', justifyContent: 'center',
  },
  requisitoIconeOk:  { backgroundColor: VERDE },
  requisitoTexto:    { fontSize: 13, color: CINZA },
  requisitoTextoOk:  { color: VERDE, fontWeight: '600' },

  // Erro
  erroTexto: { fontSize: 12, color: LARANJA, marginTop: -12, marginBottom: 12, marginLeft: 4 },

  // Botão
  botao: {
    backgroundColor: LARANJA,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
    elevation: 3,
    shadowColor: VERDE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  botaoDesabilitado: { backgroundColor: '#A5D6A7', elevation: 0, shadowOpacity: 0 },
  botaoTexto: { color: BRANCO, fontSize: 16, fontWeight: '700' },

  // Voltar
  voltarLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
  },
  voltarTexto: { color: VERDE, fontSize: 14, fontWeight: '600' },
});