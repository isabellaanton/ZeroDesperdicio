import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StatusBar, Alert, ActivityIndicator } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebaseConfig';
import { getGlobalStyles } from '../../Styles';
import { useTheme } from '../../ThemeContext';

export default function T03_Cadastro({ navigation }) {
  const [perfil, setPerfil] = useState('doador');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  const { theme, isDarkMode } = useTheme();
  const styles = getGlobalStyles(theme);

  const handleCadastro = async () => {
    if (!nome || !email || !telefone || !senha || !confirmarSenha) {
      Alert.alert('Campos incompletos', 'Por favor, preencha todos os campos do formulário.');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Senhas incorretas', 'A senha e a confirmação digitadas não conferem.');
      return;
    }

    if (senha.length < 6) {
      Alert.alert('Senha Fraca', 'A senha de segurança precisa ter no mínimo 6 caracteres.');
      return;
    }

    setCarregando(true);
    
    try {
      console.log("================ DIAGNÓSTICO DE CADASTRO ================");
      console.log("=> PASSO 1: Iniciando requisição no Firebase Auth...");
      console.log(`=> Enviando Email: [${email}]`);
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;
      
      console.log("=> PASSO 1 SUCESSO: Usuário Auth criado!");
      console.log(`=> UID gerado pelo Firebase: ${user.uid}`);

      console.log("=> PASSO 2: Tentando gravar o documento na coleção 'usuarios' do Firestore...");
      console.log(`=> Dados da gravação: { uid: "${user.uid}", nome: "${nome}", perfil: "${perfil}" }`);

      await setDoc(doc(db, 'usuarios', user.uid), {
        uid: user.uid,
        nome: nome,
        email: email,
        telefone: telefone,
        perfil: perfil,
        sobre: ''
      });

      console.log("=> PASSO 2 SUCESSO: Documento persistido no Cloud Firestore.");
      console.log("========================================================");

      Alert.alert('Sucesso', 'Sua conta foi criada perfeitamente!');
      
      if (perfil === 'doador') {
        navigation.navigate('HomeDoador');
      } else {
        navigation.navigate('HomeReceptor');
      }
      
    } catch (error) {
      console.log("❌ ERRO CAPTURADO NO CATCH:");
      console.log("=> Código do Erro:", error.code);
      console.log("=> Mensagem do Erro:", error.message);
      console.log("========================================================");
      
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('E-mail Duplicado', 'Este endereço de e-mail já está em uso por outro usuário.');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('E-mail Inválido', 'O formato do e-mail digitado está incorreto.');
      } else if (error.code === 'auth/weak-password') {
        Alert.alert('Senha Insegura', 'Escolha uma combinação de senha mais robusta.');
      } else if (error.code === 'auth/network-request-failed') {
        Alert.alert('Falha na Conexão', 'Não há internet estável para acessar o servidor do Auth.');
      } else {
        Alert.alert('Erro Operacional', `Não conseguimos processar seu registro. Detalhes: ${error.code}`);
      }
    } finally {
      console.log("=> Bloco FINALLY: Finalizando estado de carregamento do botão.");
      setCarregando(false);
    }
  };

  return (
    <ScrollView style={styles.safeArea}>
      <StatusBar 
        barStyle={isDarkMode ? "light-content" : "dark-content"} 
        backgroundColor={theme.background} 
      />

      <View style={[styles.container, { paddingTop: 50 }]}>
        <Text style={styles.title}>Criar conta</Text>
        <Text style={styles.subtitle}>Você é:</Text>

        <View style={styles.tipoContainer}>
          <TouchableOpacity
            style={[styles.tipoBtn, perfil === 'doador' && styles.tipoSelecionado]}
            onPress={() => setPerfil('doador')}
            activeOpacity={0.8}
            disabled={carregando}
          >
            <Text style={{ fontSize: 30 }}>🏢</Text>
            <Text style={{ color: theme.primary, fontWeight: 'bold' }}>Doador</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tipoBtn, perfil === 'receptor' && styles.tipoSelecionado]}
            onPress={() => setPerfil('receptor')}
            activeOpacity={0.8}
            disabled={carregando}
          >
            <Text style={{ fontSize: 30 }}>🤝</Text>
            <Text style={{ color: theme.primary, fontWeight: 'bold' }}>Receptor</Text>
          </TouchableOpacity>
        </View>

        <TextInput 
          style={styles.input} 
          placeholder="Nome completo" 
          placeholderTextColor={theme.textMuted}
          value={nome}
          onChangeText={setNome}
          editable={!carregando}
        />
        <TextInput 
          style={styles.input} 
          placeholder="Digite seu email" 
          keyboardType="email-address" 
          autoCapitalize="none" 
          placeholderTextColor={theme.textMuted}
          value={email}
          onChangeText={setEmail}
          editable={!carregando}
        />
        <TextInput 
          style={styles.input} 
          placeholder="Digite seu telefone" 
          keyboardType="phone-pad" 
          placeholderTextColor={theme.textMuted}
          value={telefone}
          onChangeText={setTelefone}
          editable={!carregando}
        />
        <TextInput 
          style={styles.input} 
          placeholder="Digite sua senha" 
          secureTextEntry 
          placeholderTextColor={theme.textMuted}
          value={senha}
          onChangeText={setSenha}
          editable={!carregando}
        />
        <TextInput 
          style={styles.input} 
          placeholder="Confirme sua senha" 
          secureTextEntry 
          placeholderTextColor={theme.textMuted}
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          editable={!carregando}
        />

        <TouchableOpacity
          style={styles.botao_entrar}
          onPress={handleCadastro}
          activeOpacity={0.8}
          disabled={carregando}
        >
          {carregando ? (
            <ActivityIndicator color={theme.buttonTextInverse || '#FFF'} />
          ) : (
            <Text style={styles.texto_botao_entrar}>Cadastrar</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}