import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  SafeAreaView, StatusBar, ScrollView, Platform, Alert, ActivityIndicator
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// 1. IMPORTAÇÕES DO FIREBASE ADICIONADAS AQUI
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';

import { getGlobalStyles } from '../../Styles';
import { useTheme } from '../../ThemeContext';

export default function T04_RecuperarSenha({ navigation }) {
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const { theme, isDarkMode } = useTheme();
  const styles = getGlobalStyles(theme);

  const handleEnviarEmail = async () => {
    if (!email || !email.includes('@')) {
      const msg = 'Digite um e-mail válido para receber o link.';
      Platform.OS === 'web' ? alert(msg) : Alert.alert('Erro', msg);
      return;
    }
    
    setCarregando(true);
    
    try {
      // 2. CHAMADA REAL AO FIREBASE
      await sendPasswordResetEmail(auth, email);
      setEnviado(true);
    } catch (error) {
      console.log("Erro ao recuperar senha:", error);
      
      let titulo = "Falha no Envio";
      let mensagem = "Não foi possível enviar o link de redefinição.";
      
      if (error.code === 'auth/user-not-found') {
        mensagem = "Não localizamos nenhuma conta com este e-mail.";
      } else if (error.code === 'auth/invalid-email') {
        mensagem = "Formato de e-mail inválido.";
      } else if (error.code === 'auth/too-many-requests') {
        mensagem = "Muitas tentativas. Aguarde um momento e tente novamente.";
      }

      if (Platform.OS === 'web') {
        alert(`${titulo}: ${mensagem}`);
      } else {
        Alert.alert(titulo, mensagem);
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar 
        barStyle={isDarkMode ? "light-content" : "dark-content"} 
        backgroundColor={theme.headerBackground} 
      />

      {/* Header */}
      <View style={[styles.header, { height: 70, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingTop: Platform.OS === 'android' ? 12 : 8 }]}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
          disabled={carregando}
        >
          <MaterialCommunityIcons name="arrow-left" size={22} color={theme.headerTextInverse} />
        </TouchableOpacity>
        <Text style={[styles.saudacao, { fontSize: 18, paddingBottom: 0 }]}>Recuperar senha</Text>
        <View style={{ width: 38 }} />
      </View>

      <ScrollView style={styles.conteudo} contentContainerStyle={styles.conteudoFormulario}>
        {!enviado ? (
          <View>
            <Text style={styles.title}>Esqueceu sua senha?</Text>
            <Text style={styles.subtitle}>Digite o e-mail cadastrado. Enviaremos um link para você redefinir sua senha com segurança.</Text>

            <Text style={styles.labelCadastro}>E-mail</Text>
            <View style={styles.inputCadastroIcone}>
              <MaterialCommunityIcons name="email-outline" size={20} color={theme.textMuted} style={{ marginRight: 10 }} />
              <TextInput
                style={[styles.inputSemBorda, {flex: 1, outlineStyle: 'none'}]}
                placeholder="seu@email.com"
                placeholderTextColor={theme.textMuted}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                editable={!carregando}
              />
            </View>

            <TouchableOpacity
              style={[styles.botao_entrar, (!email.includes('@') || carregando) && { backgroundColor: theme.gray, elevation: 0 }]}
              onPress={handleEnviarEmail}
              activeOpacity={0.8}
              disabled={carregando}
            >
              {carregando ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.texto_botao_entrar}>Enviar link de recuperação</Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <View style={{ 
                backgroundColor: theme.primary + '20', 
                width: 80, height: 80, 
                borderRadius: 40, 
                justifyContent: 'center', 
                alignItems: 'center',
                marginBottom: 20 
            }}>
                <MaterialCommunityIcons name="email-check-outline" size={45} color={theme.primary} />
            </View>
            
            <Text style={[styles.title, { textAlign: 'center' }]}>E-mail enviado!</Text>
            <Text style={[styles.subtitle, { textAlign: 'center' }]}>
                Enviamos instruções de recuperação para o endereço:{"\n"}
                <Text style={{ fontWeight: 'bold', color: theme.textPrimary }}>{email}</Text>
            </Text>

            <Text style={[styles.subtitle, { textAlign: 'center', fontSize: 12, marginTop: 10 }]}>
                Não esqueça de verificar sua pasta de spam caso não encontre o e-mail na caixa de entrada.
            </Text>

            <TouchableOpacity
              style={[styles.botao_entrar, { marginTop: 30, width: '100%' }]}
              onPress={() => navigation.navigate('Login')}
              activeOpacity={0.8}
            >
              <Text style={styles.texto_botao_entrar}>Voltar para o Login</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={() => setEnviado(false)}
              style={{ marginTop: 20 }}
            >
                <Text style={{ color: theme.primary, fontWeight: '600' }}>Tentar outro e-mail</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}