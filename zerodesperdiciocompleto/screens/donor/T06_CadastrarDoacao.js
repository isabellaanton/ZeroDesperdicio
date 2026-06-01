import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  SafeAreaView, StatusBar, Image, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker'; // Novo componente

import { getGlobalStyles } from '../../Styles';
import { useTheme } from '../../ThemeContext';

export default function T06_CadastrarDoacao({ navigation }) {
  const { theme } = useTheme();
  const styles = getGlobalStyles(theme);

  // Estados dos Campos
  const [categoria, setCategoria] = useState('Padaria');
  const [quantidade, setQuantidade] = useState('1');
  const [unidade, setUnidade] = useState('Unid');
  const [data, setData] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [foto, setFoto] = useState(null);

  // Opções para os seletores
  const categorias = ['Padaria', 'Hortifruti', 'Proteínas', 'Cesta Básica', 'Marmitas', 'Laticínios', 'Bebidas', 'Outros'];
  const unidades = ['Unid', 'Kg', 'Gramas', 'Litros', 'Caixas', 'Pacotes'];
  const quantidades = Array.from({ length: 50 }, (_, i) => (i + 1).toString()); // Gera de 1 a 50

  const tirarFoto = async () => {
    const permissao = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissao.granted) {
      alert("Permissão necessária!");
      return;
    }
    let resultado = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });
    if (!resultado.canceled) {
      setFoto(resultado.assets[0].uri);
    }
  };

  const salvarDoacao = async () => {
    try {
      const novaDoacao = {
        id: Date.now().toString(),
        titulo: categoria, // A categoria vira o título principal
        descricao: `${quantidade} ${unidade} • Expira em ${data.toLocaleDateString('pt-BR')}`,
        status: 'pendente',
        solicitacoes: 0,
        img: foto || 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=250&auto=format&fit=crop' 
      };

      const dadosExistentes = await AsyncStorage.getItem('@minhas_doacoes');
      const doacoesAtuais = dadosExistentes ? JSON.parse(dadosExistentes) : [];
      await AsyncStorage.setItem('@minhas_doacoes', JSON.stringify([novaDoacao, ...doacoesAtuais]));
      
      navigation.navigate('MinhasDoacoes');
    } catch (e) {
      Alert.alert("Erro", "Falha ao publicar.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header_cadastro}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.headerTextInverse} />
        </TouchableOpacity>
        <Text style={styles.tituloCadastro}>Nova Doação</Text>
      </View>

      <ScrollView style={styles.conteudo} contentContainerStyle={{ padding: 20 }}>
        
        {/* Seletor de Categoria */}
        <Text style={styles.labelCadastro}>Categoria do Alimento</Text>
        <View style={{ backgroundColor: theme.mode === 'dark' ? '#333' : '#f0f0f0', borderRadius: 10, marginBottom: 15 }}>
          <Picker
            selectedValue={categoria}
            onValueChange={(itemValue) => setCategoria(itemValue)}
            style={{ color: theme.textPrimary }}
            dropdownIconColor={theme.primary}
          >
            {categorias.map(c => <Picker.Item key={c} label={c} value={c} />)}
          </Picker>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {/* Seletor de Quantidade */}
          <View style={{ flex: 0.45 }}>
            <Text style={styles.labelCadastro}>Qtd.</Text>
            <View style={{ backgroundColor: theme.mode === 'dark' ? '#333' : '#f0f0f0', borderRadius: 10 }}>
              <Picker
                selectedValue={quantidade}
                onValueChange={(v) => setQuantidade(v)}
                style={{ color: theme.textPrimary }}
              >
                {quantidades.map(q => <Picker.Item key={q} label={q} value={q} />)}
              </Picker>
            </View>
          </View>

          {/* Seletor de Unidade */}
          <View style={{ flex: 0.45 }}>
            <Text style={styles.labelCadastro}>Unidade</Text>
            <View style={{ backgroundColor: theme.mode === 'dark' ? '#333' : '#f0f0f0', borderRadius: 10 }}>
              <Picker
                selectedValue={unidade}
                onValueChange={(v) => setUnidade(v)}
                style={{ color: theme.textPrimary }}
              >
                {unidades.map(u => <Picker.Item key={u} label={u} value={u} />)}
              </Picker>
            </View>
          </View>
        </View>

        <Text style={[styles.labelCadastro, { marginTop: 15 }]}>Disponível até</Text>
        <TouchableOpacity 
          style={[styles.inputCadastro, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]} 
          onPress={() => setShowPicker(true)}
        >
          <Text style={{ color: theme.textPrimary }}>{data.toLocaleDateString('pt-BR')}</Text>
          <Ionicons name="calendar" size={20} color={theme.primary} />
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={data}
            mode="date"
            onChange={(e, d) => { setShowPicker(false); if(d) setData(d); }}
          />
        )}

        <Text style={[styles.labelCadastro, { marginTop: 15 }]}>Foto do Alimento</Text>
        <TouchableOpacity 
          style={{ 
            height: 150, backgroundColor: theme.mode === 'dark' ? '#333' : '#eee', 
            borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 20,
            borderWidth: 1, borderStyle: 'dashed', borderColor: theme.textMuted
          }} 
          onPress={tirarFoto}
        >
          {foto ? (
            <Image source={{ uri: foto }} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
          ) : (
            <>
              <Ionicons name="camera" size={40} color={theme.textMuted} />
              <Text style={{ color: theme.textMuted }}>Toque para tirar foto</Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={[styles.botaoNovaDoacao, { backgroundColor: theme.primary }]} onPress={salvarDoacao}>
          <Text style={styles.botaoNovaDoacaoTexto}>Publicar Doação</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}