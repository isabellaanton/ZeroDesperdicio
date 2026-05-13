import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../../Styles';

let GoogleSignin = {
  configure: () => {},
  hasPlayServices: () => Promise.resolve(true),
  signIn: () => Promise.reject('Ambiente nativo não detectado'),
};
let statusCodes = { SIGN_IN_CANCELLED: '1', IN_PROGRESS: '2', DEVELOPER_ERROR: '3' };

try {
  const GoogleModule = require('@react-native-google-signin/google-signin');
  if (GoogleModule.GoogleSignin) {
    GoogleSignin = GoogleModule.GoogleSignin;
    statusCodes = GoogleModule.statusCodes;
  }
} catch (e) {
  console.log('Aviso: Rodando sem suporte nativo do Google (Modo Layout)');
}

export default function T02_Login({ navigation }) {

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('Sucesso:', userInfo);
      navigation.navigate('HomeDoador');
    } catch (error) {
      Alert.alert(
        'Login Google',
        'O login real exige um APK/AAB compilado. No Expo Go, use o login comum para testar as outras telas.'
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.texto_bem_vindo}>Bem-vindo de volta</Text>
      <Text style={styles.texto_acesso_conta}>Acesse sua conta</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#888"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        placeholderTextColor="#888"
      />

      <TouchableOpacity onPress={() => navigation.navigate('RecuperarSenha')}>
        <Text style={{ color: '#DA4A02', textAlign: 'right', marginTop: 10, marginRight: 15 }}>
          Esqueci minha senha
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao_entrar}
        onPress={() => navigation.navigate('HomeDoador')}
      >
        <Text style={styles.texto_botao_entrar}>Entrar</Text>
      </TouchableOpacity>

      <Text style={{ textAlign: 'center', marginVertical: 20, color: '#888' }}>
        ────────────  ou  ────────────
      </Text>

      <TouchableOpacity
        style={[styles.botao2, { backgroundColor: '#FFF', alignSelf: 'center', borderWidth: 1, borderColor: '#ddd' }]}
        onPress={handleGoogleLogin}
      >
        <Text style={styles.texto_botao2}>G  Continuar com o Google</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Cadastro')}
        style={{ marginTop: 30 }}
      >
        <Text style={{ textAlign: 'center', color: '#555' }}>
          Não tem conta?{' '}
          <Text style={{ color: '#006B14', fontWeight: 'bold' }}>Cadastre-se</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}