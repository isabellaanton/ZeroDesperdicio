import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity,
  SafeAreaView, StyleSheet, Platform,
} from 'react-native';
import WebView from 'react-native-webview';
import styles from '../../Styles';
import FooterReceptor from './FooterReceptor'; 

const DOACOES = [
  { id: 1, nome: 'Marmita Caseira',   endereco: 'Rua das Flores, 123',      horario: 'Hoje, 20:00',   icone: '🍽️', lat: -3.7172, lng: -38.5434 },
  { id: 2, nome: 'Pães e Doces',      endereco: 'Av. Beira Mar, 45',        horario: 'Hoje, 18:30',   icone: '🍞', lat: -3.7140, lng: -38.5460 },
  { id: 3, nome: 'Legumes Frescos',   endereco: 'R. Dragão do Mar, 88',     horario: 'Amanhã, 09:00', icone: '🥦', lat: -3.7200, lng: -38.5400 },
  { id: 4, nome: 'Frutas Variadas',   endereco: 'R. Monsenhor Tabosa, 210', horario: 'Hoje, 17:00',   icone: '🍎', lat: -3.7190, lng: -38.5450 },
  { id: 5, nome: 'Refeição Completa', endereco: 'Av. Santos Dumont, 1200',  horario: 'Hoje, 19:30',   icone: '🥘', lat: -3.7155, lng: -38.5415 },
];
 
const VERDE_ESCURO = '#006B14';
const LARANJA = '#DA4A02';
const BEGE_CARD = '#FFD2AE';
const BRANCO = '#FFFFFF';
const TEXTO_ESCURO = '#1A1A1A';
 
const local = StyleSheet.create({
  header: {
    backgroundColor: VERDE_ESCURO,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 16 : 8,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 18,
    width: 34, height: 34,
    alignItems: 'center', justifyContent: 'center',
  },
  backBtnTexto: { color: BRANCO, fontSize: 16, fontWeight: '700' },
  headerTitulo: { fontSize: 20, fontWeight: '700', color: BRANCO },
  mapaContainer: { flex: 1, position: 'relative' },
  cardSelecionado: {
    position: 'absolute',
    bottom: 12, left: 16, right: 16,
    backgroundColor: BEGE_CARD,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(218,74,2,0.3)',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  cardLabel: {
    fontSize: 10, fontWeight: '700',
    color: LARANJA, letterSpacing: 1,
    textTransform: 'uppercase', marginBottom: 4,
  },
  cardNome: {
    fontSize: 22, fontWeight: '700',
    color: TEXTO_ESCURO, marginBottom: 8, lineHeight: 26,
  },
  cardInfoRow: {
    flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 2,
  },
  cardInfoIcone: { fontSize: 13 },
});
 
export default function MapaDoacoes({ navigation }) {
  const [selecionado, setSelecionado] = useState(DOACOES[0]);
 
  const mapaHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
        * { margin:0; padding:0; box-sizing:border-box; }
        body { width:100vw; height:100vh; }
        #map { width:100%; height:100%; }
      </style>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    </head>
    <body>
      <div id="map"></div>
      <script>
        var map = L.map('map').setView([-3.7172, -38.5434], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
 
        var doacoes = ${JSON.stringify(DOACOES)};
 
        doacoes.forEach(function(d) {
          L.marker([d.lat, d.lng])
            .addTo(map)
            .on('click', function() {
              window.ReactNativeWebView.postMessage(JSON.stringify(d));
            });
        });
      </script>
    </body>
    </html>
  `;
 
  return (
    <SafeAreaView style={styles.safeArea}>
 
      {/* HEADER */}
      <View style={local.header}>
        <TouchableOpacity style={local.backBtn} onPress={() => navigation.goBack()}>
          <Text style={local.backBtnTexto}>←</Text>
        </TouchableOpacity>
        <Text style={local.headerTitulo}>Mapa</Text>
        <View style={{ width: 34 }} />
      </View>
 
      {/* MAPA */}
      <View style={local.mapaContainer}>
        <WebView
          style={StyleSheet.absoluteFillObject}
          source={{ html: mapaHTML }}
          onMessage={(e) => setSelecionado(JSON.parse(e.nativeEvent.data))}
        />
 
        {/* Card selecionado */}
        {selecionado && (
          <View style={local.cardSelecionado}>
            <Text style={local.cardLabel}>Selecionado</Text>
            <Text style={local.cardNome}>{selecionado.nome}</Text>
            <View style={local.cardInfoRow}>
              <Text style={local.cardInfoIcone}>📍</Text>
              <Text style={styles.descricaoSolicitacao}>{selecionado.endereco}</Text>
            </View>
            <View style={local.cardInfoRow}>
              <Text style={local.cardInfoIcone}>🕐</Text>
              <Text style={styles.descricaoSolicitacao}>{selecionado.horario}</Text>
            </View>
            <TouchableOpacity
              style={styles.botaoNovaDoacao}
              onPress={() => navigation.navigate('ConfirmarSolicitacao', { doacao: selecionado })}
            >
              <Text style={styles.botaoNovaDoacaoTexto}>Solicitar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
 

      {/* ── FOOTER ── */}
      <FooterReceptor navigation={navigation} abaAtual="Mapa" />

    </SafeAreaView>
  );
}