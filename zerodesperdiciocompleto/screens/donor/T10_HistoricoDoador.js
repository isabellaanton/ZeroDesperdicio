import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, Image, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// 1. Importando a função de estilos globais e o hook do contexto
import { getGlobalStyles } from '../../Styles';
import { useTheme } from '../../ThemeContext';

import FooterDoador from './FooterDoador';

const DOACOES = [
  { id: '1', titulo: 'Marmita Caseira', detalhe: '10 unid · Pronto', data: '28 abr 2025', receptor: 'ONG Vida Nova', imagem: 'https://img.freepik.com/fotos-premium/a-autentica-marmita-brasileira-mais-conhecida-como-marmitex-feita-com-comida-tradicional-do-brasil_496782-2496.jpg', avaliacao: 5 },
  { id: '2', titulo: 'Pães Frescos', detalhe: '20 unid · Padaria', data: '22 abr 2025', receptor: 'Instituto Esperança', imagem: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300', avaliacao: 5 },
];

export default function T10_HistoricoDoador({ navigation }) {
  const [abaAtiva, setAbaAtiva] = useState('Todas');

  // 2. Consumindo o tema atual
  const { theme, isDarkMode } = useTheme();
  // 3. Injetando o tema nos estilos
  const styles = getGlobalStyles(theme);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 4. StatusBar dinâmica */}
      <StatusBar 
        barStyle={isDarkMode ? "light-content" : "dark-content"} 
        backgroundColor={theme.headerBackground} 
      />

      <View style={[styles.header, { height: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: Platform.OS === 'android' ? 12 : 8 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
          {/* Hexadecimal branco removido */}
          <Ionicons name="arrow-back" size={22} color={theme.headerTextInverse} />
        </TouchableOpacity>
        <Text style={[styles.saudacao, { fontSize: 20, paddingBottom: 0 }]}>Histórico</Text>
        <TouchableOpacity activeOpacity={0.7}>
          {/* Hexadecimal branco removido */}
          <Ionicons name="menu" size={24} color={theme.headerTextInverse} />
        </TouchableOpacity>
      </View>

      {/* Hexadecimal do fundo substituído por theme.background */}
      <View style={{ flexDirection: 'row', backgroundColor: theme.background, padding: 12, gap: 8 }}>
        {['Todas', 'Este mês', 'Anteriores'].map((aba) => (
          <TouchableOpacity 
            key={aba} 
            style={[styles.filtroBotao, abaAtiva === aba && styles.filtroBotaoAtivo]} 
            onPress={() => setAbaAtiva(aba)}
            activeOpacity={0.8}
          >
            <Text style={[styles.filtroTexto, abaAtiva === aba && styles.filtroTextoAtivo]}>{aba}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.conteudo} showsVerticalScrollIndicator={false}>
        <Text style={styles.secaoTitulo}>{DOACOES.length} doações concluídas</Text>
        {DOACOES.map((item) => (
          <View key={item.id} style={styles.cardHistorico}>
            <Image source={{ uri: item.imagem }} style={[styles.cardImage, { width: 100, height: 110 }]} />
            <View style={[styles.cardContentHistorico, { padding: 12, flex: 1 }]}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.cardTitle}>{item.titulo}</Text>
                <View style={styles.btnConcluido}><Text style={styles.btnConcluidoText}>Concluído</Text></View>
              </View>
              <Text style={styles.descricaoSolicitacao}>{item.detalhe}</Text>
              <View style={{ flexDirection: 'row', gap: 12, marginTop: 6 }}>
                {/* Textos em cinza isolados substituídos pelo theme.textMuted */}
                <Text style={{ fontSize: 11, color: theme.textMuted }}>❤️ {item.receptor}</Text>
                <Text style={{ fontSize: 11, color: theme.textMuted }}>📅 {item.data}</Text>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 4 }}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <Ionicons key={n} name={n <= item.avaliacao ? 'star' : 'star-outline'} size={14} color="#FFC107" />
                ))}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <FooterDoador navigation={navigation} abaAtual="Historico" />
    </SafeAreaView>
  );
}