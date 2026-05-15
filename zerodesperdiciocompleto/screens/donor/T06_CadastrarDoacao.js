import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  SafeAreaView, StatusBar, TextInput,
} from 'react-native';

// 1. Importando a função de estilos globais e o hook do contexto
import { getGlobalStyles } from '../../Styles';
import { useTheme } from '../../ThemeContext';

import FooterDoador from './FooterDoador';

export default function T06_CadastrarDoacao({ navigation }) {
  const [dataExpiracao, setDataExpiracao] = useState('');

  // 2. Consumindo o tema atual
  const { theme, isDarkMode } = useTheme();
  // 3. Injetando o tema nos estilos
  const styles = getGlobalStyles(theme);

  const handleDataChange = (texto) => {
    let num = texto.replace(/\D/g, '');
    let formatado = num;

    if (num.length > 10) {
      formatado = num.replace(/^(\d{2})(\d{2})(\d{4})(\d{2})(\d{0,2}).*/, '$1/$2/$3 $4:$5');
    } else if (num.length > 8) {
      formatado = num.replace(/^(\d{2})(\d{2})(\d{4})(\d{0,2}).*/, '$1/$2/$3 $4');
    } else if (num.length > 4) {
      formatado = num.replace(/^(\d{2})(\d{2})(\d{0,4}).*/, '$1/$2/$3');
    } else if (num.length > 2) {
      formatado = num.replace(/^(\d{2})(\d{0,2}).*/, '$1/$2');
    }

    setDataExpiracao(formatado);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 4. StatusBar dinâmica */}
      <StatusBar 
        barStyle={isDarkMode ? "light-content" : "dark-content"} 
        backgroundColor={theme.headerBackground} 
      />

      {/* Header */}
      <View style={styles.header_cadastro}>
        <View style={styles.headerTituloCentralizado}>
          <Text style={styles.tituloCadastro}>Cadastrar doação</Text>
        </View>
        <TouchableOpacity style={styles.menuIconeAbsoluto} activeOpacity={0.7}>
          <Text style={styles.menuIconeTexto}>≡</Text>
        </TouchableOpacity>
      </View>

      {/* Formulário */}
      <ScrollView style={styles.conteudo} contentContainerStyle={styles.conteudoFormulario}>

        <Text style={styles.labelCadastro}>Tipo de alimento</Text>
        <TextInput
          style={styles.inputCadastro}
          placeholder="Pronto para consumo"
          placeholderTextColor={theme.textMuted} // Removido '#888'
        />

        <Text style={styles.labelCadastro}>Descrição</Text>
        <TextInput
          style={styles.inputCadastro}
          placeholder="Ex: Marmitas de frango com arroz"
          placeholderTextColor={theme.textMuted} // Removido '#888'
        />

        <Text style={styles.labelCadastro}>Quantidade</Text>
        <View style={styles.rowCadastro}>
          <TextInput
            style={[styles.inputCadastro, styles.inputMetade]}
            placeholder="10"
            placeholderTextColor={theme.textMuted} // Removido '#888'
            keyboardType="numeric"
          />
          <View style={styles.espacoEntreInputs} />
          <TextInput
            style={[styles.inputCadastro, styles.inputMetade]}
            placeholder="Unidades"
            placeholderTextColor={theme.textMuted} // Removido '#888'
          />
        </View>

        <Text style={styles.labelCadastro}>Disponível até</Text>
        <View style={styles.inputCadastroIcone}>
          <TextInput
            style={styles.inputSemBorda}
            placeholder="dd/mm/aaaa hh:mm"
            placeholderTextColor={theme.textMuted} // Removido '#888'
            keyboardType="numeric"
            maxLength={16}
            value={dataExpiracao}
            onChangeText={handleDataChange}
          />
          <Text style={{ fontSize: 20 }}>📅</Text>
        </View>

        <Text style={styles.labelCadastro}>Local de retirada</Text>
        <View style={styles.inputCadastroIcone}>
          <Text style={{ fontSize: 20, marginRight: 10 }}>📍</Text>
          <TextInput
            style={styles.inputSemBorda}
            placeholder="Usar localização atual"
            placeholderTextColor={theme.textMuted} // Removido '#333'
          />
        </View>

        <Text style={styles.labelCadastro}>Foto (opcional)</Text>
        <TouchableOpacity style={styles.inputFoto} activeOpacity={0.7}>
          <Text style={styles.textoFoto}>+ Adicionar foto</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botaoNovaDoacao, { marginTop: 10 }]}
          onPress={() => navigation.navigate('MinhasDoacoes')}
          activeOpacity={0.8}
        >
          <Text style={styles.botaoNovaDoacaoTexto}>Publicar Doação</Text>
        </TouchableOpacity>

      </ScrollView>

      <FooterDoador navigation={navigation} abaAtual="Inicio" />
    </SafeAreaView>
  );
}