import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StatusBar } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { ResponseType } from 'expo-auth-session';
import { auth, GoogleAuthProvider, signInWithCredential } from '../../config/firebaseConfig'; // ajuste o caminho se necessário
import { getGlobalStyles } from '../../Styles';
import { useTheme } from '../../ThemeContext';

// Necessário para fechar o navegador após o login no Expo Go
WebBrowser.maybeCompleteAuthSession();

export default function T02_Login({ navigation }) {
  const { theme, isDarkMode } = useTheme();
  const styles = getGlobalStyles(theme);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // ✅ CORREÇÃO 1: responseType: 'id_token' é obrigatório para o Google retornar
  // o token que o Firebase precisa. Sem isso, a autenticação não funciona.
  const [request, response, promptAsync] = Google.useAuthRequest({
    responseType: ResponseType.IdToken,
    androidClientId: "283415695775-android.apps.googleusercontent.com",
    iosClientId: "283415695775-ios.apps.googleusercontent.com",
    expoClientId: "283415695775-expo.apps.googleusercontent.com",
    // webClientId é necessário para gerar o id_token no Android
    webClientId: "283415695775-web.apps.googleusercontent.com",
    scopes: ['profile', 'email'],
  });

  useEffect(() => {
    if (response?.type === 'success') {
      // ✅ CORREÇÃO 2: Usar o SDK do Firebase em vez de chamar a REST API manualmente.
      // O id_token vem direto de response.params quando responseType é 'id_token'.
      const { id_token } = response.params;

      // Cria a credencial do Google com o token recebido
      const credential = GoogleAuthProvider.credential(id_token);

      // ✅ CORREÇÃO 3: signInWithCredential delega tudo ao Firebase SDK —
      // gerenciamento de sessão, refresh de token e erros são tratados automaticamente.
      signInWithCredential(auth, credential)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('Login Google realizado:', user.email);
          navigation.navigate('HomeDoador');
        })
        .catch((error) => {
          console.error('Erro Firebase:', error.code, error.message);

          // Mensagens de erro amigáveis para os casos mais comuns
          if (error.code === 'auth/account-exists-with-different-credential') {
            Alert.alert(
              'E-mail já cadastrado',
              'Este e-mail já está associado a outro método de login. Tente entrar com e-mail e senha.'
            );
          } else if (error.code === 'auth/network-request-failed') {
            Alert.alert('Sem conexão', 'Verifique sua internet e tente novamente.');
          } else {
            Alert.alert('Erro no login', `Código: ${error.code}`);
          }
        });
    }

    // Caso o usuário cancele ou ocorra erro na etapa do Google (antes do Firebase)
    if (response?.type === 'error') {
      Alert.alert('Erro', 'Não foi possível autenticar com o Google. Tente novamente.');
    }
  }, [response, navigation]);

  // Login com e-mail e senha — conecte ao Firebase Auth se quiser ativar
  const handleEmailLogin = () => {
    if (!email || !senha) {
      Alert.alert('Campos obrigatórios', 'Preencha o e-mail e a senha.');
      return;
    }
    // TODO: signInWithEmailAndPassword(auth, email, senha)
    navigation.navigate('HomeDoador');
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />

      <Text style={styles.texto_bem_vindo}>Bem-vindo de volta</Text>
      <Text style={styles.texto_acesso_conta}>Acesse sua conta</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor={theme.textMuted}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        placeholderTextColor={theme.textMuted}
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity onPress={() => navigation.navigate('RecuperarSenha')}>
        <Text style={{ color: theme.secondary, textAlign: 'right', marginTop: 10, marginRight: 15 }}>
          Esqueci minha senha
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao_entrar} onPress={handleEmailLogin}>
        <Text style={styles.texto_botao_entrar}>Entrar</Text>
      </TouchableOpacity>

      <Text style={{ textAlign: 'center', marginVertical: 20, color: theme.textMuted }}>
        ────────────  ou  ────────────
      </Text>

      {/* ✅ CORREÇÃO 4: disabled enquanto o request não está pronto,
          e loading state para feedback visual */}
      <TouchableOpacity
        style={[
          styles.botao2,
          {
            backgroundColor: theme.inputBackground,
            alignSelf: 'center',
            borderWidth: 1,
            borderColor: theme.filtroBorder,
            opacity: !request ? 0.6 : 1,
          },
        ]}
        disabled={!request}
        onPress={() => promptAsync()}
      >
        <Text style={styles.texto_botao2}>G  Continuar com o Google</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')} style={{ marginTop: 30 }}>
        <Text style={{ textAlign: 'center', color: theme.textSecondary }}>
          Não tem conta?{' '}
          <Text style={{ color: theme.primary, fontWeight: 'bold' }}>Cadastre-se</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}