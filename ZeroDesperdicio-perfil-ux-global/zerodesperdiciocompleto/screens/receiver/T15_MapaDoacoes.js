import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, Animated, TextInput } from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { getGlobalStyles } from '../../Styles';
import { useTheme } from '../../ThemeContext';
import FooterReceptor from './FooterReceptor';

const CORES_CATEGORIAS = {
  'Padaria': '#FFC107',
  'Hortifruti': '#28A745',
  'Proteínas': '#DA0202',
  'Cesta Básica': '#007BFF',
  'Marmitas': '#E36930',
  'Laticínios': '#9C27B0',
  'Bebidas': '#00BCD4',
  'Outros': '#607D8B',
};

const DOACOES_DATA = [
  { id: 1, nome: 'Marmitas Fit de Frango', endereco: 'R. Murará, 340', horario: '20:00', categoria: 'Marmitas', lat: -3.7897, lng: -38.4750 },
  { id: 2, nome: 'Pães Artesanais e Sonhos', endereco: 'Av. Washington Soares, 1321', horario: '18:30', categoria: 'Padaria', lat: -3.7872, lng: -38.4690 },
  { id: 3, nome: 'Cesta de Frutas da Estação', endereco: 'Rua Desembargador Leite, 50', horario: '17:00', categoria: 'Hortifruti', lat: -3.7910, lng: -38.4720 },
  { id: 4, nome: 'Peito de Frango Congelado', endereco: 'Rua Maestro Lisboa, 1200', horario: '19:00', categoria: 'Proteínas', lat: -3.7950, lng: -38.4780 },
  { id: 5, nome: 'Cesta Básica Completa', endereco: 'Av. Oliveira Paiva, 800', horario: '16:00', categoria: 'Cesta Básica', lat: -3.7935, lng: -38.4820 },
  { id: 6, nome: 'Iogurtes e Queijo Fresco', endereco: 'Rua Edilson Brasil Soares, 450', horario: '18:00', categoria: 'Laticínios', lat: -3.7850, lng: -38.4760 },
  { id: 7, nome: 'Fardos de Água Mineral', endereco: 'Av. Litorânea, 10', horario: '21:00', categoria: 'Bebidas', lat: -3.7820, lng: -38.4710 },
  { id: 8, nome: 'Kits de Higiene Pessoal', endereco: 'Rua Atilano de Moura, 200', horario: '17:30', categoria: 'Outros', lat: -3.7880, lng: -38.4800 },
];

const mapaHTML = (doacoes, dark) => `
<!DOCTYPE html><html><head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
  <style>* { margin:0; padding:0; } html,body,#map { width:100%; height:100%; background: ${dark ? '#121212' : '#f0f0f0'}; }</style>
</head><body><div id="map"></div>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script>
  var DOACOES = ${JSON.stringify(doacoes)};
  var CORES = ${JSON.stringify(CORES_CATEGORIAS)};
  
  var map = L.map('map', { zoomControl: false, attributionControl: false }).setView([${doacoes.length > 0 ? doacoes[0].lat : -3.7897}, ${doacoes.length > 0 ? doacoes[0].lng : -38.4750}], 14);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/${dark ? 'dark_all' : 'light_all'}/{z}/{x}/{y}{r}.png').addTo(map);

  function createIcon(categoria) {
    var cor = CORES[categoria] || CORES['Outros'];
    return L.divIcon({ 
      html: '<svg width="34" height="34" viewBox="0 0 100 100"><path d="M50 0C31.2 0 16 15.2 16 34C16 52.8 50 100 50 100S84 52.8 84 34C84 15.2 68.8 0 50 0Z" fill="'+cor+'" stroke="white" stroke-width="4"/></svg>', 
      iconSize: [34, 34], iconAnchor: [17, 34], className: '' 
    });
  }

  DOACOES.forEach(function(d) {
    L.marker([d.lat, d.lng], { icon: createIcon(d.categoria) }).addTo(map).on('click', function() {
      map.panTo([d.lat, d.lng]);
      window.ReactNativeWebView.postMessage(JSON.stringify(d));
    });
  });
</script></body></html>`;

export default function T15_MapaDoacoes({ navigation }) {
  const { theme, isDarkMode } = useTheme();
  const styles = getGlobalStyles(theme);
  
  const [busca, setBusca] = useState('');
  const [doacoesFiltradas, setDoacoesFiltradas] = useState(DOACOES_DATA);
  const [selecionado, setSelecionado] = useState(DOACOES_DATA[0]);

  // Lógica de Busca em tempo real
  useEffect(() => {
    const filtrados = DOACOES_DATA.filter(item => 
      item.nome.toLowerCase().includes(busca.toLowerCase()) || 
      item.categoria.toLowerCase().includes(busca.toLowerCase())
    );
    setDoacoesFiltradas(filtrados);
    if (filtrados.length > 0) setSelecionado(filtrados[0]);
  }, [busca]);

  const getCor = (cat) => CORES_CATEGORIAS[cat] || CORES_CATEGORIAS['Outros'];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.headerBackground }}>
      <StatusBar barStyle="light-content" backgroundColor={theme.headerBackground} />

      {/* Header Compacto */}
      <View style={[styles.header, { height: 60, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.headerTextInverse} />
        </TouchableOpacity>
        <Text style={{ flex: 1, textAlign: 'center', color: theme.headerTextInverse, fontSize: 18, fontWeight: 'bold' }}>Mapa de Doações</Text>
        <View style={{ width: 24 }} /> 
      </View>

      <View style={{ flex: 1, backgroundColor: theme.background }}>
        
        {/* BARRA DE BUSCA FLUTUANTE */}
        <View style={{
          position: 'absolute',
          top: 15,
          left: 15,
          right: 15,
          zIndex: 10,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: theme.cardBackground,
          borderRadius: 15,
          paddingHorizontal: 15,
          height: 50,
          elevation: 5,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 5,
        }}>
          <Ionicons name="search" size={20} color={theme.textMuted} />
          <TextInput
            placeholder="Buscar por alimento ou categoria..."
            placeholderTextColor={theme.textMuted}
            style={{ flex: 1, marginLeft: 10, color: theme.textPrimary, fontSize: 14 }}
            value={busca}
            onChangeText={setBusca}
          />
          {busca !== '' && (
            <TouchableOpacity onPress={() => setBusca('')}>
              <Ionicons name="close-circle" size={20} color={theme.textMuted} />
            </TouchableOpacity>
          )}
        </View>

        <WebView 
          key={doacoesFiltradas.length} // Força o reload do mapa ao filtrar
          source={{ html: mapaHTML(doacoesFiltradas, isDarkMode) }} 
          onMessage={(e) => setSelecionado(JSON.parse(e.nativeEvent.data))} 
          style={{ flex: 1 }} 
        />

        {/* Card de Informações */}
        {selecionado && (
          <Animated.View style={[styles.cardSelecionado, { 
              backgroundColor: theme.cardBackground, 
              padding: 20, 
              borderTopLeftRadius: 30, 
              borderTopRightRadius: 30,
              bottom: 0,
              elevation: 20,
              shadowColor: '#000',
              shadowOpacity: 0.3,
              shadowRadius: 10,
              paddingBottom: 20
          }]}>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <View style={{ backgroundColor: getCor(selecionado.categoria) + '25', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 10 }}>
                  <Text style={{ color: getCor(selecionado.categoria), fontWeight: 'bold', fontSize: 11, textTransform: 'uppercase' }}>
                    {selecionado.categoria}
                  </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="time-outline" size={14} color={theme.textSecondary} />
                <Text style={{ color: theme.textSecondary, fontSize: 12, marginLeft: 4 }}>Até {selecionado.horario}</Text>
              </View>
            </View>
            
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: theme.textPrimary, marginBottom: 5 }}>{selecionado.nome}</Text>
            
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
              <Ionicons name="location-outline" size={16} color={theme.textMuted} />
              <Text style={{ color: theme.textMuted, fontSize: 14, marginLeft: 5 }} numberOfLines={1}>{selecionado.endereco}</Text>
            </View>

            <TouchableOpacity
              style={{ 
                backgroundColor: getCor(selecionado.categoria), 
                paddingVertical: 16, 
                borderRadius: 18, 
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 60 // Ajustado para dar respiro ao Footer
              }}
              onPress={() => navigation.navigate('ConfirmarSolicitacao', { doacao: selecionado })}
            >
              <Ionicons name="checkmark-circle-outline" size={20} color="#FFF" style={{ marginRight: 8 }} />
              <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 16 }}>Solicitar esta Doação</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>

      <FooterReceptor navigation={navigation} abaAtual="Mapa" />
    </SafeAreaView>
  );
}