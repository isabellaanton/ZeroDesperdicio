import React, { useState, useRef } from 'react';
import {
  View, Text, TouchableOpacity,
  SafeAreaView, Platform, Animated, StatusBar
} from 'react-native';
import WebView from 'react-native-webview';

// 1. Importando a função de estilos globais e o hook do contexto
import { getGlobalStyles } from '../../Styles';
import { useTheme } from '../../ThemeContext';

import FooterReceptor from './FooterReceptor';

const DOACOES = [
  { id: 1, nome: 'Marmita Caseira',   endereco: 'R. Murará, 340 – Edson Queiroz',              horario: 'Hoje, 20:00',   categoria: 'Refeição',  cor: '#DA4A02', lat: -3.7897, lng: -38.4750 },
  { id: 2, nome: 'Pães e Doces',      endereco: 'Av. Washington Soares, 1321 – Edson Queiroz', horario: 'Hoje, 18:30',     categoria: 'Padaria',   cor: '#C8860A', lat: -3.7872, lng: -38.4690 },
  { id: 3, nome: 'Legumes Frescos',   endereco: 'R. Cel. de Queirós, 88 – Sapiranga',          horario: 'Amanhã, 09:00',   categoria: 'Hortifruti',cor: '#006B14', lat: -3.7940, lng: -38.4820 },
  { id: 4, nome: 'Frutas Variadas',   endereco: 'Av. Eng. Santana Jr., 210 – Cocó',            horario: 'Hoje, 17:00',     categoria: 'Frutas',    cor: '#B5360B', lat: -3.7830, lng: -38.4770 },
  { id: 5, nome: 'Refeição Completa', endereco: 'Av. Padre Antônio Tomás, 950 – Água Fria',   horario: 'Hoje, 19:30',     categoria: 'Refeição',  cor: '#7B3FA0', lat: -3.7910, lng: -38.4650 },
];

// 2. O HTML agora recebe isDarkMode para trocar a camada base do mapa
const mapaHTML = (doacoes, isDarkMode) => `
<!DOCTYPE html><html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
  <style>* { margin:0; padding:0; box-sizing:border-box; } html,body,#map { width:100%; height:100%; }</style>
</head>
<body><div id="map"></div>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script>
  var DOACOES = ${JSON.stringify(doacoes)};
  var marcadores = {}; var ativoId = DOACOES[0].id;
  function pinSVG(cor, ativo) {
    var s=ativo?44:34, cx=s/2, rHead=s*0.38, cy=rHead+2, ptY=s-2;
    var sRx=s*0.28,sRy=s*0.09,sCY=ptY+sRy*0.5,riW=rHead*0.48,rcW=rHead*0.25;
    var bCor=ativo?'#fff':cor, bW=ativo?2.5:1.8;
    return '<svg xmlns="http://www.w3.org/2000/svg" width="'+s+'" height="'+s+'" viewBox="0 0 '+s+' '+s+'">'
      +'<ellipse cx="'+cx+'" cy="'+sCY+'" rx="'+sRx+'" ry="'+sRy+'" fill="rgba(0,0,0,'+(ativo?0.22:0.13)+')"/>'
      +'<path d="M'+cx+','+(cy-rHead)+' A'+rHead+','+rHead+' 0 1 1 '+(cx-0.01)+','+(cy-rHead)+' L'+cx+','+ptY+' Z"'
      +' fill="'+cor+'" stroke="'+bCor+'" stroke-width="'+bW+'" stroke-linejoin="round"/>'
      +'<circle cx="'+cx+'" cy="'+cy+'" r="'+riW+'" fill="white" opacity="0.95"/>'
      +'<circle cx="'+cx+'" cy="'+cy+'" r="'+rcW+'" fill="'+cor+'"/></svg>';
  }
  function makeIcon(cor,ativo){var s=ativo?44:34;return L.divIcon({html:pinSVG(cor,ativo),iconSize:[s,s],iconAnchor:[s/2,s-2],className:''});}
  function atualizarIcones(){DOACOES.forEach(function(d){var m=marcadores[d.id];if(!m)return;m.setIcon(makeIcon(d.cor,d.id===ativoId));m.setZIndexOffset(d.id===ativoId?1000:0);});}
  var map=L.map('map',{center:[${doacoes[0].lat},${doacoes[0].lng}],zoom:15,zoomControl:false,attributionControl:false});
  
  // Troca dinâmica do tema do mapa com base no isDarkMode
  L.tileLayer('https://{s}.basemaps.cartocdn.com/${isDarkMode ? 'dark_all' : 'light_all'}/{z}/{x}/{y}{r}.png',{subdomains:'abcd',maxZoom:19}).addTo(map);
  
  DOACOES.forEach(function(d){var ativo=d.id===ativoId;var marker=L.marker([d.lat,d.lng],{icon:makeIcon(d.cor,ativo),zIndexOffset:ativo?1000:0}).addTo(map);
  marcadores[d.id]=marker;marker.on('click',function(){ativoId=d.id;atualizarIcones();map.panTo([d.lat,d.lng]);window.ReactNativeWebView.postMessage(JSON.stringify(d));});});
</script></body></html>`;

export default function T15_MapaDoacoes({ navigation }) {
  const [selecionado, setSelecionado] = useState(DOACOES[0]);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // 3. Consumindo o tema atual
  const { theme, isDarkMode } = useTheme();
  // 4. Injetando o tema nos estilos
  const styles = getGlobalStyles(theme);

  const handleMensagem = (e) => {
    const doacao = JSON.parse(e.nativeEvent.data);
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0.5, duration: 100, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1,   duration: 200, useNativeDriver: true }),
    ]).start();
    setSelecionado(doacao);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar 
        barStyle={isDarkMode ? "light-content" : "dark-content"} 
        backgroundColor={theme.headerBackground} 
      />

      {/* Header */}
      <View style={[styles.header, {
        height: 70, flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between', paddingTop: Platform.OS === 'android' ? 12 : 8,
      }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.8}>
          <Text style={styles.backBtnTexto}>←</Text>
        </TouchableOpacity>
        <View style={{ alignItems: 'center' }}>
          <Text style={[styles.saudacao, { fontSize: 17, paddingBottom: 0 }]}>Mapa de Doações</Text>
          <Text style={{ fontSize: 11, color: theme.mode === 'dark' ? theme.textSecondary : 'rgba(255,255,255,0.65)' }}>
            Edson Queiroz · {DOACOES.length} disponíveis
          </Text>
        </View>
        <View style={[styles.resumoCardDestaque, { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' }]}>
          <Text style={{ color: theme.buttonTextInverse, fontSize: 13, fontWeight: '700' }}>{DOACOES.length}</Text>
        </View>
      </View>

      {/* Mapa */}
      <View style={{ flex: 1 }}>
        <WebView
          style={{ flex: 1 }}
          source={{ html: mapaHTML(DOACOES, isDarkMode) }} // Passando a flag para o HTML
          onMessage={handleMensagem}
          javaScriptEnabled
          domStorageEnabled
          originWhitelist={['*']}
        />
      </View>

      {/* Card inferior */}
      <View style={{ backgroundColor: theme.background, paddingTop: 10, paddingBottom: Platform.OS === 'ios' ? 2 : 8 }}>
        {/* Barra indicadora (Pill) */}
        <View style={{ width: 38, height: 4, borderRadius: 2, backgroundColor: theme.textMuted, alignSelf: 'center', marginBottom: 12 }} />

        <Animated.View style={{ opacity: fadeAnim }}>
          {selecionado && (
            <View style={styles.cardSelecionado}>
              {/* Categoria + horário */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5, backgroundColor: selecionado.cor + '1A' }}>
                  <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: selecionado.cor }} />
                  <Text style={{ fontSize: 11, fontWeight: '700', color: selecionado.cor, letterSpacing: 0.5 }}>{selecionado.categoria}</Text>
                </View>
                <View style={{ backgroundColor: theme.badgeBg, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5 }}>
                  <Text style={{ fontSize: 11, fontWeight: '600', color: theme.secondary }}>⏰  {selecionado.horario}</Text>
                </View>
              </View>

              <Text style={styles.cardNome}>{selecionado.nome}</Text>

              <View style={styles.cardInfoRow}>
                <View style={[styles.infoIcone, { width: 28, height: 28, borderRadius: 8, backgroundColor: theme.inputBackground }]}>
                  <Text style={styles.cardInfoIcone}>📍</Text>
                </View>
                <Text style={{ fontSize: 13, color: theme.textSecondary, flex: 1 }}>{selecionado.endereco}</Text>
              </View>

              <TouchableOpacity
                style={[styles.botaoNovaDoacao, { backgroundColor: selecionado.cor, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }]}
                activeOpacity={0.85}
                onPress={() => navigation.navigate('ConfirmarSolicitacao', { doacao: selecionado })}
              >
                <Text style={styles.botaoNovaDoacaoTexto}>Solicitar esta doação</Text>
                <Text style={{ fontSize: 18, color: 'rgba(255,255,255,0.85)' }}>→</Text>
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>

        {/* Paginação */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6, marginTop: 10, marginBottom: 2 }}>
          {DOACOES.map((d) => (
            <View
              key={d.id}
              style={[
                { width: 6, height: 6, borderRadius: 3, backgroundColor: theme.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.13)' },
                selecionado?.id === d.id && { width: 20, height: 6, borderRadius: 3, backgroundColor: d.cor },
              ]}
            />
          ))}
        </View>
      </View>

      <FooterReceptor navigation={navigation} abaAtual="Mapa" />
    </SafeAreaView>
  );
}