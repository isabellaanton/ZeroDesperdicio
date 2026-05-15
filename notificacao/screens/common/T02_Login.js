import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../../Styles';

export default function T02_Login({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.texto_bem_vindo}>Bem-vindo de volta</Text>
      <Text style={styles.texto_acesso_conta}>Acesse sua conta</Text>

      <TextInput style={styles.input} placeholder="Digite seu E-mail" placeholderTextColor="#888" />
      <TextInput style={styles.input} placeholder="Digite a senha" secureTextEntry placeholderTextColor="#888" />

      <TouchableOpacity onPress={() => navigation.navigate('RecuperarSenha')}>
        <Text style={{color: '#DA4A02', textAlign: 'right', marginTop: 10, marginRight: 15}}>Esqueci minha senha</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao_entrar} onPress={() => navigation.navigate('HomeDoador')}>
        <Text style={styles.texto_botao_entrar}>Entrar</Text>
      </TouchableOpacity>

      <Text style={{textAlign: 'center', marginVertical: 20, color: '#888'}}>────────────  ou  ────────────</Text>

      <TouchableOpacity style={[styles.botao2, {backgroundColor: '#FFF', alignSelf: 'center'}]}>
        <Text style={styles.texto_botao2}>G Continuar com o google</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')} style={{marginTop: 30}}>
        <Text style={{textAlign: 'center', color: '#555'}}>Não tem conta? <Text style={{color: '#006B14', fontWeight: 'bold'}}>Cadastre-se</Text></Text>
      </TouchableOpacity>
    </View>
  );
}