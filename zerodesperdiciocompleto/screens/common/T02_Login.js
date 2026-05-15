import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StatusBar } from 'react-native';

// 1. Importando a função de estilos globais e o hook do contexto
import { getGlobalStyles } from '../../Styles';
import { useTheme } from '../../ThemeContext';

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
  // 2. Consumindo o tema atual
  const { theme, isDarkMode } = useTheme();
  // 3. Injetando o tema nos estilos
  const styles = getGlobalStyles(theme);

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
      {/* 4. StatusBar dinâmica */}
      <StatusBar 
        barStyle={isDarkMode ? "light-content" : "dark-content"} 
        backgroundColor={theme.background} 
      />

      <Text style={styles.texto_bem_vindo}>Bem-vindo de volta</Text>
      <Text style={styles.texto_acesso_conta}>Acesse sua conta</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor={theme.textMuted} // Substituído '#888'
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        placeholderTextColor={theme.textMuted} // Substituído '#888'
      />

      <TouchableOpacity 
        onPress={() => navigation.navigate('RecuperarSenha')}
        activeOpacity={0.7}
      >
        <Text style={{ color: theme.secondary, textAlign: 'right', marginTop: 10, marginRight: 15 }}>
          Esqueci minha senha
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao_entrar}
        onPress={() => navigation.navigate('HomeDoador')}
        activeOpacity={0.8}
      >
        <Text style={styles.texto_botao_entrar}>Entrar</Text>
      </TouchableOpacity>

      <Text style={{ textAlign: 'center', marginVertical: 20, color: theme.textMuted }}>
        ────────────  ou  ────────────
      </Text>

      <TouchableOpacity
        style={[
          styles.botao2, 
          { 
            backgroundColor: theme.inputBackground, 
            alignSelf: 'center', 
            borderWidth: 1, 
            borderColor: theme.filtroBorder // Limpo do inline
          }
        ]}
        onPress={handleGoogleLogin}
        activeOpacity={0.8}
      >
        <Text style={styles.texto_botao2}>G  Continuar com o Google</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Cadastro')}
        style={{ marginTop: 30 }}
        activeOpacity={0.7}
      >
        <Text style={{ textAlign: 'center', color: theme.textSecondary }}>
          Não tem conta?{' '}
          <Text style={{ color: theme.primary, fontWeight: 'bold' }}>Cadastre-se</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}