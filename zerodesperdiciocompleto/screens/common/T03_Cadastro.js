import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../../Styles';

export default function T03_Cadastro({ navigation }) {
  const [perfil, setPerfil] = useState('doador');

  return (
    <ScrollView style={styles.safeArea}>
      <View style={[styles.container, { paddingTop: 50 }]}>
        <Text style={styles.title}>Criar conta</Text>
        <Text style={styles.subtitle}>Você é:</Text>

        <View style={styles.tipoContainer}>
          <TouchableOpacity
            style={[styles.tipoBtn, perfil === 'doador' && styles.tipoSelecionado]}
            onPress={() => setPerfil('doador')}
          >
            <Text style={{ fontSize: 30 }}>🏢</Text>
            <Text style={{ color: '#006B14', fontWeight: 'bold' }}>Doador</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tipoBtn, perfil === 'receptor' && styles.tipoSelecionado]}
            onPress={() => setPerfil('receptor')}
          >
            <Text style={{ fontSize: 30 }}>🤝</Text>
            <Text style={{ color: '#006B14', fontWeight: 'bold' }}>Receptor</Text>
          </TouchableOpacity>
        </View>

        <TextInput style={styles.input} placeholder="Nome completo" />
        <TextInput style={styles.input} placeholder="Digite seu email" keyboardType="email-address" autoCapitalize="none" />
        <TextInput style={styles.input} placeholder="Digite seu telefone" keyboardType="phone-pad" />
        <TextInput style={styles.input} placeholder="Digite sua senha" secureTextEntry />
        <TextInput style={styles.input} placeholder="Confirme sua senha" secureTextEntry />

        <TouchableOpacity
          style={styles.botao_entrar}
          onPress={() => navigation.navigate(perfil === 'doador' ? 'HomeDoador' : 'HomeReceptor')}
        >
          <Text style={styles.texto_botao_entrar}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}