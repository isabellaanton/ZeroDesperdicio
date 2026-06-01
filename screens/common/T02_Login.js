import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StatusBar, ActivityIndicator } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { ResponseType, makeRedirectUri } from 'expo-auth-session';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db, GoogleAuthProvider, signInWithCredential } from '../../config/firebaseConfig'; 
import { getGlobalStyles } from '../../Styles';
import { useTheme } from '../../ThemeContext';


WebBrowser.maybeCompleteAuthSession();

export default function T02_Login({ navigation }) {
  const { theme, isDarkMode } = useTheme();
  const styles = getGlobalStyles(theme);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

const clientIdVerdadeiro = "283415695775-kn3auvuanh27ss6d2ighdlkb9fdoft3u.apps.googleusercontent.com";

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: clientIdVerdadeiro,
    androidClientId: clientIdVerdadeiro,
    iosClientId: clientIdVerdadeiro,
    expoClientId: clientIdVerdadeiro,
    webClientId: clientIdVerdadeiro,
    redirectUri: makeRedirectUri({
      useProxy: true, 
    }),
    scopes: ['profile', 'email'],
  });

  const checarPerfilENavegar = async (uid) => {
    try {
      const docRef = doc(db, 'usuarios', uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const dadosUsuario = docSnap.data();
        if (dadosUsuario.perfil === 'doador') {
          navigation.navigate('HomeDoador');
        } else if (dadosUsuario.perfil === 'receptor') {
          navigation.navigate('HomeReceptor');
        } else {
          Alert.alert('Erro de Perfil', 'Tipo de perfil não identificado no sistema.');
        }
      } else {
        // Se a conta Google for nova e não existir no banco, 
        // idealmente você mandaria para uma tela de completar perfil. 
        // Aqui vou mandar um alerta e ir para a HomeDoador como fallback.
        Alert.alert('Aviso', 'Conta nova do Google identificada. Finalize seu cadastro em breve.');
        navigation.navigate('HomeDoador'); 
      }
    } catch (error) {
      Alert.alert('Erro no Banco', 'Falha ao buscar as configurações de perfil do usuário.');
    }
  };

  useEffect(() => {
  
    if (response?.type === 'success') {
      setCarregando(true);
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);

      signInWithCredential(auth, credential)
        .then(async (userCredential) => {
          const user = userCredential.user;
          console.log('Login Google realizado:', user.email);
          await checarPerfilENavegar(user.uid);
        })
        .catch((error) => {
          console.error('Erro Firebase:', error.code, error.message);
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
        })
        .finally(() => {
          setCarregando(false);
        });
    }

    if (response?.type === 'error') {
      Alert.alert('Erro', 'Não foi possível autenticar com o Google. Tente novamente.');
    }
  }, [response, navigation]);

  const handleEmailLogin = () => { // O resto do arquivo continua a partir daqui...
    if (!email || !senha) {
      Alert.alert('Campos obrigatórios', 'Preencha o e-mail e a senha.');
      return;
    }
    
    setCarregando(true);
    signInWithEmailAndPassword(auth, email, senha)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await checarPerfilENavegar(user.uid);
      })
      .catch((error) => {
        console.error('Erro de login por email:', error);
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
          Alert.alert('Acesso Negado', 'E-mail ou senha incorretos. Verifique os dados inseridos.');
        } else if (error.code === 'auth/invalid-email') {
          Alert.alert('Formato Inválido', 'Insira um formato de e-mail válido (ex: nome@email.com).');
        } else if (error.code === 'auth/network-request-failed') {
          Alert.alert('Sem Conexão', 'Não foi possível conectar ao servidor. Verifique sua rede de dados.');
        } else {
          Alert.alert('Erro no Acesso', 'Ocorreu um problema ao processar seu login.');
        }
      })
      .finally(() => {
        setCarregando(false);
      });
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
        editable={!carregando}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        placeholderTextColor={theme.textMuted}
        value={senha}
        onChangeText={setSenha}
        editable={!carregando}
      />

      <TouchableOpacity onPress={() => navigation.navigate('RecuperarSenha')} disabled={carregando}>
        <Text style={{ color: theme.secondary, textAlign: 'right', marginTop: 10, marginRight: 15 }}>
          Esqueci minha senha
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao_entrar} onPress={handleEmailLogin} disabled={carregando}>
        {carregando ? (
          <ActivityIndicator color={theme.buttonTextInverse || '#FFF'} />
        ) : (
          <Text style={styles.texto_botao_entrar}>Entrar</Text>
        )}
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
            borderColor: theme.filtroBorder,
            opacity: !request || carregando ? 0.6 : 1,
          },
        ]}
        disabled={!request || carregando}
        onPress={() => promptAsync()}
      >
        <Text style={styles.texto_botao2}>G  Continuar com o Google</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')} style={{ marginTop: 30 }} disabled={carregando}>
        <Text style={{ textAlign: 'center', color: theme.textSecondary }}>
          Não tem conta?{' '}
          <Text style={{ color: theme.primary, fontWeight: 'bold' }}>Cadastre-se</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}