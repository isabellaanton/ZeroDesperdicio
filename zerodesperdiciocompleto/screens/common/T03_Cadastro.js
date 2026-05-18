import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StatusBar } from 'react-native';

// 1. Importando a função de estilos globais e o hook do contexto
import { getGlobalStyles } from '../../Styles';
import { useTheme } from '../../ThemeContext';

export default function T03_Cadastro({ navigation }) {
  const [perfil, setPerfil] = useState('doador');

  // 2. Consumindo o tema atual
  const { theme, isDarkMode } = useTheme();
  // 3. Injetando o tema nos estilos
  const styles = getGlobalStyles(theme);

  return (
    <ScrollView style={styles.safeArea}>
      {/* 4. StatusBar dinâmica */}
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
          >
            <Text style={{ fontSize: 30 }}>🏢</Text>
            {/* 5. Substituído o Hexadecimal isolado pelo theme.primary */}
            <Text style={{ color: theme.primary, fontWeight: 'bold' }}>Doador</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tipoBtn, perfil === 'receptor' && styles.tipoSelecionado]}
            onPress={() => setPerfil('receptor')}
            activeOpacity={0.8}
          >
            <Text style={{ fontSize: 30 }}>🤝</Text>
            {/* 5. Substituído o Hexadecimal isolado pelo theme.primary */}
            <Text style={{ color: theme.primary, fontWeight: 'bold' }}>Receptor</Text>
          </TouchableOpacity>
        </View>

        {/* 6. Adicionado placeholderTextColor dinâmico em todos os inputs */}
        <TextInput 
          style={styles.input} 
          placeholder="Nome completo" 
          placeholderTextColor={theme.textMuted}
        />
        <TextInput 
          style={styles.input} 
          placeholder="Digite seu email" 
          keyboardType="email-address" 
          autoCapitalize="none" 
          placeholderTextColor={theme.textMuted}
        />
        <TextInput 
          style={styles.input} 
          placeholder="Digite seu telefone" 
          keyboardType="phone-pad" 
          placeholderTextColor={theme.textMuted}
        />
        <TextInput 
          style={styles.input} 
          placeholder="Digite sua senha" 
          secureTextEntry 
          placeholderTextColor={theme.textMuted}
        />
        <TextInput 
          style={styles.input} 
          placeholder="Confirme sua senha" 
          secureTextEntry 
          placeholderTextColor={theme.textMuted}
        />

        <TouchableOpacity
          style={styles.botao_entrar}
          onPress={() => navigation.navigate(perfil === 'doador' ? 'HomeDoador' : 'HomeReceptor')}
          activeOpacity={0.8}
        >
          <Text style={styles.texto_botao_entrar}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}