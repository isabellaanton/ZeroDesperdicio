import React, { useState } from 'react';
import {View, TextInput, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './Styles';


function App(){
  const [text_email, setText_email] = useState ('');
  const [text_senha, setText_senha] = useState ('');
 return (

   <View style={styles.container}>

   <View>
   {/* Bem vindo de volta! */}
   <Text style={styles.texto_bem_vindo}>Bem vindo de volta</Text>
   </View>

   <View>
   {/*Acesse sua conta*/}
   <Text style={styles.texto_acesso_conta}>Acesse sua conta</Text>
   </View>

   <View>
   {/*Digite seu email*/}
   {/*Digite sua senha*/}
   <TextInput style={styles.input}
   placeholder = "Digite seu email"
   placeholderTextColor = 'gray'
   value = {text_email}
   onChangeText = {setText_email}
   />

   <TextInput style={styles.input}
   placeholder = "Digite sua senha"
   placeholderTextColor = 'gray'
   value = {text_senha}
   onChangeText = {setText_senha}
   secureTextEntry = {true}
   />
   </View>

   <View>
   {/*Esqueci a senha*/}
   <Text style={styles.esqueci_senha} onPress={ () => alert ('Abrindo redefinição de senha!')}>Esqueci a senha</Text>
   </View>

   <View>
   {/*Botão Entrar*/}
   <TouchableOpacity style={styles.botao_entrar} onPress={() => alert('Entrando')}>

   <Text style={styles.texto_botao_entrar}>Entrar</Text>
   
   </TouchableOpacity>
   </View>

   {/* Linha com ou */}
  <View style={styles.linha_ou_container}>
  <View style={styles.linha} />
  <Text style={styles.texto_ou}>ou</Text>
  <View style={styles.linha} />
  </View>

  <View>
   {/*Botão Google*/}
  <TouchableOpacity style={styles.botao_google}>
  <Icon name="google" size={22} color="#DB4437" />

  <Text style={styles.texto_google}>
    Continuar com o Google
  </Text>
  </TouchableOpacity>
  </View>

   

   <View>
   <View style={styles.container_cadastro}>
  <Text style={styles.texto_normal}>
    Não tem conta?
  </Text>

  <TouchableOpacity>
    <Text style={styles.texto_cadastro}>
      Cadastre-se
    </Text>
  </TouchableOpacity>
</View>
   </View>
   
   </View>

 );
 
 }
export default App;
