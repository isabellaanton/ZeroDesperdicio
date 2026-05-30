import React from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getGlobalStyles } from '../../Styles';
import { useTheme } from '../../ThemeContext';

export default function T13_FiltrarDoacoes({ navigation }) {
  const { theme, isDarkMode } = useTheme();
  const styles = getGlobalStyles(theme);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={theme.headerBackground} />

      <ScrollView style={styles.conteudo} contentContainerStyle={styles.conteudoFormulario}>
        <View style={styles.container_icone_voltar_contato}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="keyboard-backspace" size={25} color={theme.textPrimary} />
          </TouchableOpacity>
          <Text style={[styles.titulo, { marginLeft: 10, color: theme.secondary }]}>Filtrar doações</Text>
        </View>

        <Text style={styles.label}>Categoria</Text>
        <View style={[styles.linha, { backgroundColor: theme.cardBackground, borderColor: theme.secondary }]}>
          {['Todos', 'Perecíveis', 'Grãos', 'Prontos', 'Hortifruti', 'Verduras'].map(tag => (
             <Text key={tag} style={[styles.tag, { backgroundColor: theme.background, color: theme.textPrimary }]}>{tag}</Text>
          ))}
        </View>

        <Text style={styles.label}>Distância Máxima</Text>
        <TextInput
          placeholder="Digite a distância..."
          placeholderTextColor={theme.textMuted}
          style={[styles.label_input, { backgroundColor: theme.inputBackground, color: theme.textPrimary }]}
        />

        <Text style={styles.label}>Disponibilidade</Text>
        <View style={[styles.linha, { backgroundColor: theme.cardBackground, borderColor: theme.secondary }]}>
          {['Agora', 'Hoje', 'Esta semana'].map(tag => (
             <Text key={tag} style={[styles.tag, { backgroundColor: theme.background, color: theme.textPrimary }]}>{tag}</Text>
          ))}
        </View>

        <Text style={styles.label}>Ordenar por</Text>
        <TextInput
          placeholder="Mais próximo"
          placeholderTextColor={theme.textMuted}
          style={[styles.label_input, { backgroundColor: theme.inputBackground, color: theme.textPrimary }]}
        />

        <TouchableOpacity
          style={[styles.botao, { backgroundColor: theme.secondary }]}
          onPress={() => navigation.navigate('HomeReceptor')}
          activeOpacity={0.8}
        >
          <Text style={styles.texto_botao_entrar}>Aplicar Filtros</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}