import React from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../../Styles';
import FooterReceptor from './FooterReceptor';

export default function T13_FiltrarDoacoes({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#006B14" />

      <ScrollView style={styles.conteudo} contentContainerStyle={styles.conteudoFormulario}>

        <View style={styles.container_icone_voltar_contato}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="keyboard-backspace" size={25} color="black" />
          </TouchableOpacity>
          <Text style={[styles.titulo, { marginLeft: 10 }]}>Filtrar doações</Text>
        </View>

        <Text style={styles.label}>Categoria</Text>
        <View style={styles.linha}>
          <Text style={styles.tag}>Todos</Text>
          <Text style={styles.tag}>Perecíveis</Text>
          <Text style={styles.tag}>Grãos</Text>
          <Text style={styles.tag}>Prontos</Text>
          <Text style={styles.tag}>Hortifruti</Text>
          <Text style={styles.tag}>Verduras</Text>
        </View>

        <Text style={styles.label}>Distância Máxima</Text>
        <TextInput
          placeholder="Digite a distância..."
          style={styles.label_input}
        />

        <Text style={styles.label}>Disponibilidade</Text>
        <View style={styles.linha}>
          <Text style={styles.tag}>Agora</Text>
          <Text style={styles.tag}>Hoje</Text>
          <Text style={styles.tag}>Esta semana</Text>
        </View>

        <Text style={styles.label}>Ordenar por</Text>
        <TextInput
          placeholder="Mais próximo"
          style={styles.label_input}
        />

        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate('HomeReceptor')}
        >
          <Text style={styles.texto_botao}>Aplicar</Text>
        </TouchableOpacity>

      </ScrollView>

      <FooterReceptor navigation={navigation} abaAtual="Inicio" />
    </SafeAreaView>
  );
}