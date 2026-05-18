import React from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  SafeAreaView, StatusBar, Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getGlobalStyles } from '../../Styles';
import { useTheme } from '../../ThemeContext';

function InfoRow({ icone, label, valor, ultimo, styles, theme }) {
  return (
    <View style={[styles.infoRow, ultimo && { borderBottomWidth: 0, paddingBottom: 0 }]}>
      <View style={[styles.infoIcone, { backgroundColor: theme.mode === 'dark' ? 'rgba(255,255,255,0.1)' : '#FFF3E0' }]}>
        <Ionicons name={icone} size={17} color={theme.secondary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValor}>{valor}</Text>
      </View>
    </View>
  );
}

export default function T14_DetalheDoacaoReceptor({ navigation, route }) {
  const { theme, isDarkMode } = useTheme();
  const styles = getGlobalStyles(theme);

  const doacao = route?.params?.doacao ?? {
    nome: 'Marmita Caseira',
    tipo: 'Pronto para consumo',
    quantidade: '10 unidades',
    disponivel: 'Hoje, 20:00',
    distancia: '1,2 km',
    endereco: 'Rua das Flores, 123 — Meireles',
    doador: 'Restaurante Sabor & Arte',
    avaliacao: '4.9',
    imagem: 'https://img.freepik.com/fotos-premium/a-autentica-marmita-brasileira-mais-conhecida-como-marmitex-feita-com-comida-tradicional-do-brasil_496782-2496.jpg'
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={theme.headerBackground} />
      
      <View style={[styles.header, { height: 70, justifyContent: 'center' }]}>
        <View style={[styles.headerTop, { justifyContent: 'space-between', width: '100%', paddingHorizontal: 10 }]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={26} color={theme.headerTextInverse} />
          </TouchableOpacity>
          <Text style={[styles.headerTitulo, { fontSize: 22 }]}>Detalhes da Doação</Text>
          <View style={{ width: 26 }} />
        </View>
      </View>

      <ScrollView style={styles.conteudo} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Image source={{ uri: doacao.imagem }} style={{ width: '100%', height: 200, borderRadius: 16, marginBottom: 20 }} />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 15 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.textPrimary }}>{doacao.nome}</Text>
            <Text style={{ fontSize: 14, color: theme.secondary, fontWeight: '600', marginTop: 4 }}>
              {doacao.quantidade} • {doacao.tipo}
            </Text>
          </View>
        </View>

        <View style={styles.cardSolicitacao}>
          <InfoRow icone="time-outline" label="Retirar até" valor={doacao.disponivel} styles={styles} theme={theme} />
          <InfoRow icone="location-outline" label={`Endereço (${doacao.distancia})`} valor={doacao.endereco} styles={styles} theme={theme} />
          <InfoRow icone="restaurant-outline" label="Doador" valor={`${doacao.doador} • ⭐ ${doacao.avaliacao}`} ultimo styles={styles} theme={theme} />
        </View>

        <TouchableOpacity
          style={[styles.botaoRecusar, { flexDirection: 'row', justifyContent: 'center', gap: 8, marginBottom: 12, borderColor: theme.secondary }]}
          onPress={() => navigation.navigate('MapaDoacoes')}
        >
          <Ionicons name="map-outline" size={18} color={theme.secondary} />
          <Text style={[styles.botaoRecusarTexto, { color: theme.secondary }]}>Ver no Mapa</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botaoNovaDoacao, { flexDirection: 'row', justifyContent: 'center', gap: 8, backgroundColor: theme.secondary }]}
          onPress={() => navigation.navigate('ConfirmarSolicitacao', { doacao })}
        >
          <Text style={styles.botaoNovaDoacaoTexto}>Solicitar Doação</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFF" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}