import React, { useState, useRef } from 'react';
import {
  View, Text, TouchableOpacity,
  SafeAreaView, StyleSheet, Platform,
  Animated,
} from 'react-native';
import WebView from 'react-native-webview';
import FooterReceptor from './FooterReceptor';

/* ── Coordenadas reais na região de Edson Queiroz / arredores ─────── */
const DOACOES = [
  {
    id: 1,
    nome: 'Marmita Caseira',
    endereco: 'R. Murará, 340 – Edson Queiroz',
    horario: 'Hoje, 20:00',
    categoria: 'Refeição',
    cor: '#DA4A02',
    lat: -3.7897,
    lng: -38.4750,
  },
  {
    id: 2,
    nome: 'Pães e Doces',
    endereco: 'Av. Washington Soares, 1321 – Edson Queiroz',
    horario: 'Hoje, 18:30',
    categoria: 'Padaria',
    cor: '#C8860A',
    lat: -3.7872,
    lng: -38.4690,
  },
  {
    id: 3,
    nome: 'Legumes Frescos',
    endereco: 'R. Cel. de Queirós, 88 – Sapiranga',
    horario: 'Amanhã, 09:00',
    categoria: 'Hortifruti',
    cor: '#006B14',
    lat: -3.7940,
    lng: -38.4820,
  },
  {
    id: 4,
    nome: 'Frutas Variadas',
    endereco: 'Av. Eng. Santana Jr., 210 – Cocó',
    horario: 'Hoje, 17:00',
    categoria: 'Frutas',
    cor: '#B5360B',
    lat: -3.7830,
    lng: -38.4770,
  },
  {
    id: 5,
    nome: 'Refeição Completa',
    endereco: 'Av. Padre Antônio Tomás, 950 – Água Fria',
    horario: 'Hoje, 19:30',
    categoria: 'Refeição',
    cor: '#7B3FA0',
    lat: -3.7910,
    lng: -38.4650,
  },
];

const VERDE      = '#006B14';
const LARANJA    = '#DA4A02';
const LARANJA_BG = '#FFF3EE';
const BEGE       = '#FDF5E6';
const BRANCO     = '#FFFFFF';
const TEXTO      = '#1A1A1A';
const MUTED      = '#6B6B6B';

/* ── HTML injetado no WebView ─────────────────────────────────────── */
const mapaHTML = (doacoes) => `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    html, body, #map { width:100%; height:100%; }
    body { background:#f5f0e8; }
    .leaflet-control-attribution,
    .leaflet-control-zoom { display:none !important; }
  </style>
</head>
<body>
<div id="map"></div>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script>
  var DOACOES    = ${JSON.stringify(doacoes)};
  var marcadores = {};
  var ativoId    = DOACOES[0].id;

  function pinSVG(cor, ativo) {
    var s     = ativo ? 44 : 34;
    var cx    = s / 2;
    var rHead = s * 0.38;
    var cy    = rHead + 2;
    var ptY   = s - 2;
    var sRx   = s * 0.28, sRy = s * 0.09;
    var sCY   = ptY + sRy * 0.5;
    var riW   = rHead * 0.48;
    var rcW   = rHead * 0.25;
    var bCor  = ativo ? '#fff' : cor;
    var bW    = ativo ? 2.5 : 1.8;

    return '<svg xmlns="http://www.w3.org/2000/svg" width="'+s+'" height="'+s+'" viewBox="0 0 '+s+' '+s+'">'
      + '<ellipse cx="'+cx+'" cy="'+sCY+'" rx="'+sRx+'" ry="'+sRy+'" fill="rgba(0,0,0,'+(ativo?0.22:0.13)+')"/>'
      + '<path d="M'+cx+','+(cy-rHead)+' A'+rHead+','+rHead+' 0 1 1 '+(cx-0.01)+','+(cy-rHead)+' L'+cx+','+ptY+' Z"'
      +   ' fill="'+cor+'" stroke="'+bCor+'" stroke-width="'+bW+'" stroke-linejoin="round"/>'
      + '<circle cx="'+cx+'" cy="'+cy+'" r="'+riW+'" fill="white" opacity="0.95"/>'
      + '<circle cx="'+cx+'" cy="'+cy+'" r="'+rcW+'" fill="'+cor+'"/>'
      + '</svg>';
  }

  function makeIcon(cor, ativo) {
    var s = ativo ? 44 : 34;
    return L.divIcon({
      html:       pinSVG(cor, ativo),
      iconSize:   [s, s],
      iconAnchor: [s / 2, s - 2],
      className:  '',
    });
  }

  function atualizarIcones() {
    DOACOES.forEach(function(d) {
      var m = marcadores[d.id];
      if (!m) return;
      m.setIcon(makeIcon(d.cor, d.id === ativoId));
      m.setZIndexOffset(d.id === ativoId ? 1000 : 0);
    });
  }

  var map = L.map('map', {
    center:             [${doacoes[0].lat}, ${doacoes[0].lng}],
    zoom:               15,
    zoomControl:        false,
    attributionControl: false,
  });

  /* CartoDB Positron – mapa limpo e moderno, sem API key */
  L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    { subdomains: 'abcd', maxZoom: 19 }
  ).addTo(map);

  DOACOES.forEach(function(d) {
    var ativo  = d.id === ativoId;
    var marker = L.marker([d.lat, d.lng], {
      icon:         makeIcon(d.cor, ativo),
      zIndexOffset: ativo ? 1000 : 0,
    }).addTo(map);

    marcadores[d.id] = marker;

    marker.on('click', function() {
      ativoId = d.id;
      atualizarIcones();
      map.panTo([d.lat, d.lng]);
      window.ReactNativeWebView.postMessage(JSON.stringify(d));
    });
  });
</script>
</body>
</html>
`;

/* ── Componente ──────────────────────────────────────────────────────── */
export default function MapaDoacoes({ navigation }) {
  const [selecionado, setSelecionado] = useState(DOACOES[0]);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleMensagem = (e) => {
    const doacao = JSON.parse(e.nativeEvent.data);
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0.5, duration: 100, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1,   duration: 200, useNativeDriver: true }),
    ]).start();
    setSelecionado(doacao);
  };

  return (
    <SafeAreaView style={s.safe}>

      {/* HEADER */}
      <View style={s.header}>
        <TouchableOpacity style={s.headerBtn} onPress={() => navigation.goBack()}>
          <Text style={s.headerBtnTexto}>←</Text>
        </TouchableOpacity>
        <View style={s.headerCenter}>
          <Text style={s.headerTitulo}>Mapa de Doações</Text>
          <Text style={s.headerSub}>Edson Queiroz · {DOACOES.length} disponíveis</Text>
        </View>
        <View style={s.headerBadge}>
          <Text style={s.headerBadgeTexto}>{DOACOES.length}</Text>
        </View>
      </View>

      {/* MAPA */}
      <View style={{ flex: 1 }}>
        <WebView
          style={StyleSheet.absoluteFillObject}
          source={{ html: mapaHTML(DOACOES) }}
          onMessage={handleMensagem}
          javaScriptEnabled
          domStorageEnabled
          originWhitelist={['*']}
        />
      </View>

      {/* CARD INFERIOR */}
      <View style={s.cardArea}>
        <View style={s.handle} />

        <Animated.View style={{ opacity: fadeAnim }}>
          {selecionado && (
            <View style={s.card}>

              {/* Categoria + Horário */}
              <View style={s.cardMeta}>
                <View style={[s.pill, { backgroundColor: selecionado.cor + '1A' }]}>
                  <View style={[s.pillDot, { backgroundColor: selecionado.cor }]} />
                  <Text style={[s.pillTexto, { color: selecionado.cor }]}>
                    {selecionado.categoria}
                  </Text>
                </View>
                <View style={s.chipHorario}>
                  <Text style={s.chipHorarioTexto}>⏰  {selecionado.horario}</Text>
                </View>
              </View>

              {/* Nome */}
              <Text style={s.cardNome}>{selecionado.nome}</Text>

              {/* Endereço */}
              <View style={s.detalheRow}>
                <View style={s.detalheIcone}>
                  <Text style={s.detalheEmoji}>📍</Text>
                </View>
                <Text style={s.detalheTexto}>{selecionado.endereco}</Text>
              </View>

              {/* Botão — cor dinâmica por categoria */}
              <TouchableOpacity
                style={[s.botao, { backgroundColor: selecionado.cor }]}
                activeOpacity={0.85}
                onPress={() =>
                  navigation.navigate('ConfirmarSolicitacao', { doacao: selecionado })
                }
              >
                <Text style={s.botaoTexto}>Solicitar esta doação</Text>
                <Text style={s.botaoSeta}>→</Text>
              </TouchableOpacity>

            </View>
          )}
        </Animated.View>

        {/* Paginação por pontos */}
        <View style={s.paginacao}>
          {DOACOES.map((d) => (
            <View
              key={d.id}
              style={[
                s.ponto,
                selecionado?.id === d.id && [s.pontoAtivo, { backgroundColor: d.cor }],
              ]}
            />
          ))}
        </View>
      </View>

      {/* FOOTER */}
      <FooterReceptor navigation={navigation} abaAtual="Mapa" />

    </SafeAreaView>
  );
}

/* ── Estilos ─────────────────────────────────────────────────────────── */
const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BEGE },

  header: {
    backgroundColor: VERDE,
    paddingHorizontal: 20,
    paddingTop:     Platform.OS === 'android' ? 18 : 10,
    paddingBottom:  16,
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'space-between',
  },
  headerBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center', justifyContent: 'center',
  },
  headerBtnTexto: { color: BRANCO, fontSize: 18, fontWeight: '600' },
  headerCenter:   { alignItems: 'center' },
  headerTitulo:   { fontSize: 17, fontWeight: '700', color: BRANCO, letterSpacing: 0.2 },
  headerSub:      { fontSize: 11, color: 'rgba(255,255,255,0.65)', marginTop: 1 },
  headerBadge: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: LARANJA,
    alignItems: 'center', justifyContent: 'center',
  },
  headerBadgeTexto: { color: BRANCO, fontSize: 13, fontWeight: '700' },

  cardArea: {
    backgroundColor: BEGE,
    paddingTop:    10,
    paddingBottom: Platform.OS === 'ios' ? 2 : 8,
  },
  handle: {
    width: 38, height: 4, borderRadius: 2,
    backgroundColor: 'rgba(0,0,0,0.13)',
    alignSelf: 'center', marginBottom: 12,
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 6,
    backgroundColor: BRANCO,
    borderRadius: 20,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.06)',
  },

  cardMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  pill: {
    flexDirection: 'row', alignItems: 'center',
    gap: 5, borderRadius: 20,
    paddingHorizontal: 10, paddingVertical: 5,
  },
  pillDot:   { width: 6, height: 6, borderRadius: 3 },
  pillTexto: { fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
  chipHorario: {
    backgroundColor: LARANJA_BG, borderRadius: 10,
    paddingHorizontal: 10, paddingVertical: 5,
  },
  chipHorarioTexto: { fontSize: 11, fontWeight: '600', color: LARANJA },

  cardNome: {
    fontSize: 20, fontWeight: '700',
    color: TEXTO, marginBottom: 10, lineHeight: 24,
  },
  detalheRow: {
    flexDirection: 'row', alignItems: 'center',
    gap: 8, marginBottom: 14,
  },
  detalheIcone: {
    width: 28, height: 28, borderRadius: 8,
    backgroundColor: '#F3F3F3',
    alignItems: 'center', justifyContent: 'center',
  },
  detalheEmoji: { fontSize: 13 },
  detalheTexto: { fontSize: 13, color: MUTED, flex: 1 },

  botao: {
    borderRadius: 14,
    paddingVertical: 13,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  botaoTexto: { fontSize: 15, fontWeight: '700', color: BRANCO },
  botaoSeta:  { fontSize: 18, color: 'rgba(255,255,255,0.65)' },

  paginacao: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6, marginTop: 10, marginBottom: 2,
  },
  ponto:      { width: 6,  height: 6, borderRadius: 3, backgroundColor: 'rgba(0,0,0,0.13)' },
  pontoAtivo: { width: 20, height: 6, borderRadius: 3 },
});