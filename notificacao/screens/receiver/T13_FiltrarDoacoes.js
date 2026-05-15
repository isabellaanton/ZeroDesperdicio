import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../../Styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FooterReceptor from './FooterReceptor'; 

function TelaFiltro({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.container_icone_voltar_contato}>
        <TouchableOpacity onPress={() => navigation.navigate('DetalheDoacaoReceptor')}>
          <MaterialCommunityIcons name='keyboard-backspace' size={25} color='black'/>
        </TouchableOpacity>
        <Text style={styles.titulo}>Filtrar doações</Text>
      </View>

      <Text style={styles.label}>Categoria</Text>
      <View>
        <View style={styles.linha}>
          <Text style={styles.tag}>Todos</Text>
          <Text style={styles.tag}>Perecíveis</Text>
          <Text style={styles.tag}>Grãos</Text>
          <Text style={styles.tag}>Prontos</Text>
          <Text style={styles.tag}>Hortifruti</Text>
          <Text style={styles.tag}>Verduras</Text>
        </View>
      </View>

      <Text style={styles.label}>Distância Máxima</Text>
      <TextInput placeholder="Digite a distância..." style={styles.label_input} />

      <Text style={styles.label}>Disponibilidade</Text>
      <View style={styles.linha}>
        <Text style={styles.tag}>Agora</Text>
        <Text style={styles.tag}>Hoje</Text>
        <Text style={styles.tag}>Esta semana</Text>
      </View>

      <Text style={styles.label}>Ordenar por</Text>
      <TextInput placeholder="Mais próximo" style={styles.label_input} />

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate("DetalheDoacaoReceptor")}
      >
        <Text style={styles.texto_botao}>Aplicar</Text>
      </TouchableOpacity>

      {/* Coloque o Footer aqui, logo antes de fechar a View principal! */}
      <FooterReceptor navigation={navigation} abaAtual="Inicio" />

    </View>
  );
}

export default TelaFiltro;