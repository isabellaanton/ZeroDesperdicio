import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  SafeAreaView, StatusBar, ScrollView, Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// 1. Importando a função de estilos globais e o hook do contexto
import { getGlobalStyles } from '../../Styles';
import { useTheme } from '../../ThemeContext';

// ── Componente de Requisito ──────────────────────────────────────────
// Recebendo theme e styles como props para aplicar as cores dinâmicas
const Requisito = ({ texto, validado, theme, styles }) => (
  <View style={styles.infoRow}>
    <View style={[styles.infoIcone, validado && { backgroundColor: theme.primary }]}>
      <MaterialCommunityIcons
        name={validado ? 'check' : 'minus'}
        size={12}
        color={validado ? theme.buttonTextInverse : theme.textMuted}
      />
    </View>
    <Text style={[styles.infoValor, validado && { color: theme.primary, fontWeight: '600' }]}>
      {texto}
    </Text>
  </View>
);

export default function T04_RecuperarSenha({ navigation }) {
  const [etapa, setEtapa] = useState(1);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirma, setConfirma] = useState('');
  const [verSenha, setVerSenha] = useState(false);
  const [verConfirma, setVerConfirma] = useState(false);

  // 2. Consumindo o tema atual
  const { theme, isDarkMode } = useTheme();
  // 3. Injetando o tema nos estilos
  const styles = getGlobalStyles(theme);

  const temOito       = senha.length >= 8;
  const temMaiuscula  = /[A-Z]/.test(senha);
  const temNumOuSim   = /[0-9!@#$%^&*(),.?":{}|<>]/.test(senha);
  const senhasIguais  = senha === confirma && confirma.length > 0;
  const senhaValida   = temOito && temMaiuscula && temNumOuSim;

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
    <SafeAreaView style={styles.safeArea}>
      {/* 4. StatusBar dinâmica */}
      <StatusBar 
        barStyle={isDarkMode ? "light-content" : "dark-content"} 
        backgroundColor={theme.headerBackground} 
      />

      {/* Header */}
      <View style={[styles.header, { height: 70, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingTop: Platform.OS === 'android' ? 12 : 8 }]}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => (etapa === 2 ? setEtapa(1) : navigation.goBack())}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons name="arrow-left" size={22} color={theme.headerTextInverse} />
        </TouchableOpacity>
        <Text style={[styles.saudacao, { fontSize: 18, paddingBottom: 0 }]}>Recuperar senha</Text>
        <View style={{ width: 38 }} />
      </View>

      {/* Steps */}
      <View style={{
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        backgroundColor: theme.cardBackground, paddingVertical: 16, paddingHorizontal: 40,
        borderBottomWidth: 1, borderBottomColor: theme.gray,
      }}>
        {/* Step 1 */}
        <View style={{ alignItems: 'center' }}>
          <View style={[styles.infoIcone, etapa >= 1 && { backgroundColor: theme.primary, width: 32, height: 32, borderRadius: 16 }]}>
            <Text style={{ fontSize: 14, fontWeight: '700', color: etapa >= 1 ? theme.buttonTextInverse : theme.textMuted }}>1</Text>
          </View>
          <Text style={[styles.infoLabel, etapa >= 1 && { color: theme.secondary }]}>E-mail</Text>
        </View>

        <View style={{ flex: 1, height: 2, backgroundColor: etapa === 2 ? theme.primary : theme.gray, marginHorizontal: 10 }} />

        {/* Step 2 */}
        <View style={{ alignItems: 'center' }}>
          <View style={[styles.infoIcone, etapa === 2 && { backgroundColor: theme.primary, width: 32, height: 32, borderRadius: 16 }]}>
            <Text style={{ fontSize: 14, fontWeight: '700', color: etapa === 2 ? theme.buttonTextInverse : theme.textMuted }}>2</Text>
          </View>
          <Text style={[styles.infoLabel, etapa === 2 && { color: theme.secondary }]}>Nova senha</Text>
        </View>
      </View>

      <ScrollView style={styles.conteudo} contentContainerStyle={styles.conteudoFormulario}>
        {etapa === 1 ? (
          <View>
            <Text style={styles.title}>Esqueceu sua senha?</Text>
            <Text style={styles.subtitle}>Digite o e-mail cadastrado para criar uma nova senha.</Text>

            <Text style={styles.labelCadastro}>E-mail</Text>
            <View style={styles.inputCadastroIcone}>
              <MaterialCommunityIcons name="email-outline" size={20} color={theme.textMuted} style={{ marginRight: 10 }} />
              <TextInput
                style={styles.inputSemBorda}
                placeholder="seu@email.com"
                placeholderTextColor={theme.textMuted}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <TouchableOpacity
              style={[styles.botao_entrar, !email.includes('@') && { backgroundColor: theme.gray, elevation: 0 }]}
              onPress={handleEnviarEmail}
              activeOpacity={0.8}
            >
              <Text style={styles.texto_botao_entrar}>Enviar link</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text style={styles.title}>Nova senha</Text>

            <Text style={styles.labelCadastro}>Senha</Text>
            <View style={styles.inputCadastroIcone}>
              <TextInput
                style={styles.inputSemBorda}
                secureTextEntry={!verSenha}
                value={senha}
                onChangeText={setSenha}
                placeholder="Digite a nova senha"
                placeholderTextColor={theme.textMuted}
              />
              <TouchableOpacity onPress={() => setVerSenha(!verSenha)} activeOpacity={0.7}>
                <MaterialCommunityIcons name={verSenha ? 'eye-off' : 'eye'} size={20} color={theme.textMuted} />
              </TouchableOpacity>
            </View>

            {/* Requisitos (O Fundo reage ao Dark Mode usando badgeAtivaBg) */}
            <View style={{ backgroundColor: theme.badgeAtivaBg, borderRadius: 12, padding: 14, marginBottom: 20 }}>
              <Requisito texto="Mínimo 8 caracteres" validado={temOito} theme={theme} styles={styles} />
              <Requisito texto="Uma letra maiúscula" validado={temMaiuscula} theme={theme} styles={styles} />
              <Requisito texto="Número ou símbolo"   validado={temNumOuSim} theme={theme} styles={styles} />
            </View>

            <Text style={styles.labelCadastro}>Confirmar Senha</Text>
            <View style={[styles.inputCadastroIcone, confirma && !senhasIguais && { borderColor: theme.secondary }]}>
              <TextInput
                style={styles.inputSemBorda}
                secureTextEntry={!verConfirma}
                value={confirma}
                onChangeText={setConfirma}
                placeholder="Confirme a nova senha"
                placeholderTextColor={theme.textMuted}
              />
              <TouchableOpacity onPress={() => setVerConfirma(!verConfirma)} activeOpacity={0.7}>
                <MaterialCommunityIcons name={verConfirma ? 'eye-off' : 'eye'} size={20} color={theme.textMuted} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.botao_entrar, (!senhaValida || !senhasIguais) && { backgroundColor: theme.gray, elevation: 0 }]}
              onPress={handleSalvarSenha}
              activeOpacity={0.8}
            >
              <Text style={styles.texto_botao_entrar}>Salvar Nova Senha</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}