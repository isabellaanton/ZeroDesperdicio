import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar, SafeAreaView, TextInput } from 'react-native';
import styles from '../../Styles';
import FooterDoador from './FooterDoador'; 


export default function T06_CadastrarDoacao({ navigation }) {
  // Estado para armazenar o valor do input de data
  const [dataExpiracao, setDataExpiracao] = useState('');

  // Função para aplicar a máscara de Data e Hora (DD/MM/AAAA HH:MM)
  const handleDataChange = (texto) => {
    // Remove tudo que não for número
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
      <StatusBar barStyle="light-content" backgroundColor="#006B14" />

      {/* Header */}
      <View style={styles.header_cadastro}> 
        <View style={styles.headerTituloCentralizado}>
           <Text style={styles.tituloCadastro}>Cadastrar doação</Text>
        </View>
        <TouchableOpacity style={styles.menuIconeAbsoluto} activeOpacity={0.7}>
            <Text style={styles.menuIconeTexto}>≡</Text>
        </TouchableOpacity>
      </View>

      {/* Conteúdo principal (Formulário) */}
      <ScrollView style={styles.conteudo} contentContainerStyle={styles.conteudoFormulario}>
        
        {/* Tipo de Alimento */}
        <Text style={styles.labelCadastro}>Tipo de alimento</Text>
        <TextInput 
            style={styles.inputCadastro} 
            placeholder="Pronto para consumo" 
            placeholderTextColor="#888" 
        />

        {/* Descrição */}
        <Text style={styles.labelCadastro}>Descrição</Text>
        <TextInput 
            style={styles.inputCadastro} 
            placeholder="Ex: Marmitas de frango com" 
            placeholderTextColor="#888" 
        />

        {/* Quantidade */}
        <Text style={styles.labelCadastro}>Quantidade</Text>
        <View style={styles.rowCadastro}>
            <TextInput 
                style={[styles.inputCadastro, styles.inputMetade]} 
                placeholder="10" 
                placeholderTextColor="#888" 
                keyboardType="numeric"
            />
            <View style={styles.espacoEntreInputs} />
            <TextInput 
                style={[styles.inputCadastro, styles.inputMetade]} 
                placeholder="Unidades" 
                placeholderTextColor="#888" 
                keyboardType="text"
            />
        </View>

        {/* Disponível até */}
        <Text style={styles.labelCadastro}>Disponível até</Text>
        <View style={styles.inputCadastroIcone}>
            <TextInput 
                style={styles.inputSemBorda} 
                placeholder="dd/mm/aaaa hh:mm" 
                placeholderTextColor="#888" 
                keyboardType="numeric"
                maxLength={16} // Limita o tamanho máximo da string formatada
                value={dataExpiracao}
                onChangeText={handleDataChange}
            />
            <Text style={{fontSize: 20}}>📅</Text>
        </View>

        {/* Local de retirada */}
        <Text style={styles.labelCadastro}>Local de retirada</Text>
        <View style={styles.inputCadastroIcone}>
            <Text style={{fontSize: 20, marginRight: 10}}>📍</Text>
            <TextInput 
                style={styles.inputSemBorda} 
                placeholder="Usar localização atual" 
                placeholderTextColor="#333" 
            />
        </View>

        {/* Foto */}
        <Text style={styles.labelCadastro}>Foto (opcional)</Text>
        <TouchableOpacity style={styles.inputFoto} activeOpacity={0.7}>
            <Text style={styles.textoFoto}>+ Adicionar foto</Text>
        </TouchableOpacity>

      </ScrollView>

      <FooterDoador navigation={navigation} abaAtual="Inicio" />
      
    </SafeAreaView>
  );
}