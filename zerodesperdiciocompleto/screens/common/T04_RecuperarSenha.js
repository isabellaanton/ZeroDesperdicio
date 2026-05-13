import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  SafeAreaView, StatusBar, ScrollView, Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../../Styles';

// ── Componente de Requisito ──────────────────────────────────────────
const Requisito = ({ texto, validado }) => (
  <View style={styles.infoRow}>
    <View style={[styles.infoIcone, validado && { backgroundColor: '#006B14' }]}>
      <MaterialCommunityIcons
        name={validado ? 'check' : 'minus'}
        size={12}
        color={validado ? '#FFFFFF' : '#888888'}
      />
    </View>
    <Text style={[styles.infoValor, validado && { color: '#006B14', fontWeight: '600' }]}>
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
      <StatusBar barStyle="light-content" backgroundColor="#006B14" />

      {/* Header */}
      <View style={[styles.header, { height: 70, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingTop: Platform.OS === 'android' ? 12 : 8 }]}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => (etapa === 2 ? setEtapa(1) : navigation.goBack())}
        >
          <MaterialCommunityIcons name="arrow-left" size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={[styles.saudacao, { fontSize: 18, paddingBottom: 0 }]}>Recuperar senha</Text>
        <View style={{ width: 38 }} />
      </View>

      {/* Steps */}
      <View style={{
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        backgroundColor: '#FFFFFF', paddingVertical: 16, paddingHorizontal: 40,
        borderBottomWidth: 1, borderBottomColor: '#DDDDDD',
      }}>
        {/* Step 1 */}
        <View style={{ alignItems: 'center' }}>
          <View style={[styles.infoIcone, etapa >= 1 && { backgroundColor: '#006B14', width: 32, height: 32, borderRadius: 16 }]}>
            <Text style={{ fontSize: 14, fontWeight: '700', color: etapa >= 1 ? '#FFFFFF' : '#888888' }}>1</Text>
          </View>
          <Text style={[styles.infoLabel, etapa >= 1 && { color: '#DA4A02' }]}>E-mail</Text>
        </View>

        <View style={{ flex: 1, height: 2, backgroundColor: etapa === 2 ? '#006B14' : '#DDDDDD', marginHorizontal: 10 }} />

        {/* Step 2 */}
        <View style={{ alignItems: 'center' }}>
          <View style={[styles.infoIcone, etapa === 2 && { backgroundColor: '#006B14', width: 32, height: 32, borderRadius: 16 }]}>
            <Text style={{ fontSize: 14, fontWeight: '700', color: etapa === 2 ? '#FFFFFF' : '#888888' }}>2</Text>
          </View>
          <Text style={[styles.infoLabel, etapa === 2 && { color: '#DA4A02' }]}>Nova senha</Text>
        </View>
      </View>

      <ScrollView style={styles.conteudo} contentContainerStyle={styles.conteudoFormulario}>
        {etapa === 1 ? (
          <View>
            <Text style={styles.title}>Esqueceu sua senha?</Text>
            <Text style={styles.subtitle}>Digite o e-mail cadastrado para criar uma nova senha.</Text>

            <Text style={styles.labelCadastro}>E-mail</Text>
            <View style={styles.inputCadastroIcone}>
              <MaterialCommunityIcons name="email-outline" size={20} color="#888888" style={{ marginRight: 10 }} />
              <TextInput
                style={styles.inputSemBorda}
                placeholder="seu@email.com"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <TouchableOpacity
              style={[styles.botao_entrar, !email.includes('@') && { backgroundColor: '#CCC', elevation: 0 }]}
              onPress={handleEnviarEmail}
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
              />
              <TouchableOpacity onPress={() => setVerSenha(!verSenha)}>
                <MaterialCommunityIcons name={verSenha ? 'eye-off' : 'eye'} size={20} color="#888888" />
              </TouchableOpacity>
            </View>

            {/* Requisitos */}
            <View style={{ backgroundColor: '#E8F5E9', borderRadius: 12, padding: 14, marginBottom: 20 }}>
              <Requisito texto="Mínimo 8 caracteres" validado={temOito} />
              <Requisito texto="Uma letra maiúscula" validado={temMaiuscula} />
              <Requisito texto="Número ou símbolo"   validado={temNumOuSim} />
            </View>

            <Text style={styles.labelCadastro}>Confirmar Senha</Text>
            <View style={[styles.inputCadastroIcone, confirma && !senhasIguais && { borderColor: '#DA4A02' }]}>
              <TextInput
                style={styles.inputSemBorda}
                secureTextEntry={!verConfirma}
                value={confirma}
                onChangeText={setConfirma}
                placeholder="Confirme a nova senha"
              />
              <TouchableOpacity onPress={() => setVerConfirma(!verConfirma)}>
                <MaterialCommunityIcons name={verConfirma ? 'eye-off' : 'eye'} size={20} color="#888888" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.botao_entrar, (!senhaValida || !senhasIguais) && { backgroundColor: '#CCC', elevation: 0 }]}
              onPress={handleSalvarSenha}
            >
              <Text style={styles.texto_botao_entrar}>Salvar Nova Senha</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}