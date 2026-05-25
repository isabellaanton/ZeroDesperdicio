import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StatusBar, SafeAreaView, TextInput, Image, Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../../config/firebaseConfig';
import { getGlobalStyles } from '../../Styles';
import { useTheme } from '../../ThemeContext';
import FooterReceptor from './FooterReceptor';

const CATEGORIAS = ['Todos', 'Cestas Básicas', 'Refeições', 'Hortifruti', 'Outros'];

const DOACOES_DISPONIVEIS = [
  { 
    id: '1', 
    titulo: 'Cesta Básica Completa', 
    doador: 'ONG Alimento Solidário', 
    distancia: '1.2 km', 
    categoria: 'Cestas Básicas',
    imagem: 'https://www.fw.uri.br/storage/blogs/20250110101524_cestas-basicas-atacado-sp-3.jpg' 
  },
  { 
    id: '2', 
    titulo: 'Sopa de Legumes', 
    doador: 'Restaurante Bom Sabor', 
    distancia: '800 m', 
    categoria: 'Refeições',
    imagem: 'https://msabores.com/wp-content/uploads/2025/10/Sopa-de-Legumes-com-Macarrao.webp'
  },
  { 
    id: '3', 
    titulo: 'Frutas e Verduras', 
    doador: 'Mercado Central', 
    distancia: '2.5 km', 
    categoria: 'Hortifruti',
    imagem: 'https://revistavitrineibiuna.com.br/wp-content/uploads/2015/06/DOIS.jpg'
  }
];

export default function T12_HomeReceptor({ navigation }) {
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');
  const [textoBusca, setTextoBusca] = useState('');
  const [nomeUsuario, setNomeUsuario] = useState('Maria');

  const { theme, isDarkMode } = useTheme();
  const styles = getGlobalStyles(theme);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const userDocRef = doc(db, 'usuarios', user.uid);
    const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        if (data.nome) {
          setNomeUsuario(data.nome);
        }
      }
    }, (error) => {
      console.error("Erro escutando perfil na T12_HomeReceptor:", error);
    });

    return () => unsubscribe();
  }, []);

  const itensFiltrados = DOACOES_DISPONIVEIS.filter((item) => {
    const matchCategoria = categoriaAtiva === 'Todos' || item.categoria === categoriaAtiva;
    const matchBusca = item.titulo.toLowerCase().includes(textoBusca.toLowerCase()) || 
                       item.doador.toLowerCase().includes(textoBusca.toLowerCase());
    return matchCategoria && matchBusca;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={theme.headerBackground} />

      {/* HEADER ALTO */}
      <View style={styles.header}>
        <View style={[styles.headerTop, { justifyContent: 'space-between', marginBottom: 20 }]}>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={20} color={theme.headerTextInverse} />
            <Text style={styles.locationText}>Fortaleza, CE</Text>
          </View>
          <TouchableOpacity style={styles.menuIcone}>
            <Ionicons name="notifications-outline" size={26} color={theme.headerTextInverse} />
          </TouchableOpacity>
        </View>

        <Text style={[styles.saudacao, { paddingBottom: 15 }]}>Olá, {nomeUsuario}!</Text>

        <View style={styles.resumoContainer}>
          <View style={[styles.resumoCard, styles.resumoCardDestaque, { backgroundColor: theme.secondary }]}>
            <Text style={styles.resumoNumeroDestaque}>12</Text>
            <Text style={styles.resumoLabelDestaque}>Pedidos</Text>
          </View>
          <View style={styles.resumoCard}>
            <Text style={styles.resumoNumero}>4.8</Text>
            <Text style={styles.resumoLabel}>Nota</Text>
          </View>
          <View style={styles.resumoCard}>
            <Text style={styles.resumoNumero}>24kg</Text>
            <Text style={styles.resumoLabel}>Salvos</Text>
          </View>
        </View>
      </View>

      <ScrollView 
        style={styles.conteudoHomeDoador} 
        contentContainerStyle={styles.conteudoContainerHomeDoador}
        showsVerticalScrollIndicator={false}
      >
        {/* BUSCA INTEGRADA FUNCIONAL */}
        <View style={[styles.searchContainer, { marginBottom: 20 }]}>
          <Ionicons name="search" size={20} color={theme.textMuted} style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="O que você procura hoje?"
            placeholderTextColor={theme.textMuted}
            value={textoBusca}
            onChangeText={setTextoBusca}
          />
          {textoBusca.length > 0 && (
            <TouchableOpacity onPress={() => setTextoBusca('')}>
               <Ionicons name="close-circle" size={18} color={theme.textMuted} />
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.secaoTitulo}>Categorias</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 25 }}>
          {CATEGORIAS.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.filterBtn, 
                { borderColor: theme.secondary, marginRight: 8 },
                categoriaAtiva === cat && [styles.filterBtnActive, { backgroundColor: theme.secondary, borderColor: theme.secondary }]
              ]}
              onPress={() => setCategoriaAtiva(cat)}
            >
              <Text style={[styles.filterText, categoriaAtiva === cat && styles.filterTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.secaoTitulo}>
            {itensFiltrados.length > 0 ? 'Alimentos Disponíveis Próximos' : 'Nenhum resultado encontrado'}
        </Text>
        
        {/* LISTAGEM DINÂMICA */}
        {itensFiltrados.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.cardReceptor, { borderColor: theme.secondary }]}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('DetalheDoacaoReceptor', { doacao: item })}
          >
            <Image source={{ uri: item.imagem }} style={styles.cardImage} />
            
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.titulo}</Text>
              <Text style={styles.textoCard}>Doador: {item.doador}</Text>
              
              <View style={[styles.cardLocationRow, { marginTop: 5 }]}>
                <Ionicons name="location" size={14} color={theme.secondary} />
                <Text style={[styles.cardDistanceText, { color: theme.secondary }]}>{item.distancia}</Text>
              </View>

              <View style={{ alignSelf: 'flex-end', marginTop: -10 }}>
                <View style={[styles.btnDetalhes, { backgroundColor: theme.secondary }]}>
                  <Text style={styles.btnDetalhesText}>Ver Mais</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FooterReceptor navigation={navigation} abaAtual="Inicio" />
    </SafeAreaView>
  );
}