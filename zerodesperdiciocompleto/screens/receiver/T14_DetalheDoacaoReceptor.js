import React from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  SafeAreaView, StatusBar, Image, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../Styles';
import FooterReceptor from './FooterReceptor';

function InfoRow({ icone, label, valor, ultimo }) {
  return (
    <View style={[styles.infoRow, ultimo && { borderBottomWidth: 0, paddingBottom: 0 }]}>
      <View style={styles.infoIcone}>
        <Ionicons name={icone} size={17} color="#006B14" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValor}>{valor}</Text>
      </View>
    </View>
  );
}

export default function T14_DetalheDoacaoReceptor({ navigation, route }) {
  const doacao = route?.params?.doacao ?? {
    nome: 'Marmita Caseira',
    tipo: 'Pronto para consumo',
    quantidade: '10 unidades',
    disponivel: 'Hoje, 20:00',
    distancia: '1,2 km',
    endereco: 'Rua das Flores, 123 — Meireles',
    doador: 'Restaurante Sabor & Arte',
    avaliacao: '4.9',
    imagem: 'https://img.freepik.com/fotos-premium/a-autentica-marmita-brasileira-mais-conhecida-como-marmitex-feita-com-comida-tradicional-do-brasil_496782-2496.jpg',
    status: 'Disponível',
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#006B14" />

      {/* Header */}
      <View style={[styles.header, {
        height: 70, flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between', paddingTop: Platform.OS === 'android' ? 12 : 8,
      }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={[styles.saudacao, { fontSize: 18, paddingBottom: 0 }]}>Detalhes da Doação</Text>
        <View style={{ width: 38 }} />
      </View>

      <ScrollView
        style={styles.conteudo}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Imagem */}
        <View style={{ borderRadius: 18, overflow: 'hidden', marginBottom: 16, position: 'relative' }}>
          <Image source={{ uri: doacao.imagem }} style={{ width: '100%', height: 220 }} />
          <View style={{
            position: 'absolute', top: 12, right: 12,
            flexDirection: 'row', alignItems: 'center', gap: 6,
            backgroundColor: 'rgba(0,0,0,0.55)',
            borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5,
          }}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#4CAF50' }} />
            <Text style={{ color: '#FFF', fontSize: 12, fontWeight: '600' }}>{doacao.status}</Text>
          </View>
        </View>

        {/* Título */}
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.nome}>{doacao.nome}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Ionicons name="location-outline" size={15} color="#DA4A02" />
            <Text style={styles.disponivel}>{doacao.distancia} de distância</Text>
          </View>
        </View>

        {/* Informações */}
        <Text style={styles.secaoTitulo}>INFORMAÇÕES</Text>
        <View style={styles.cardSolicitacao}>
          <InfoRow icone="fast-food-outline"  label="Tipo"           valor={doacao.tipo} />
          <InfoRow icone="layers-outline"     label="Quantidade"     valor={doacao.quantidade} />
          <InfoRow icone="time-outline"       label="Disponível até" valor={doacao.disponivel} />
          <InfoRow icone="location-outline"   label="Endereço"       valor={doacao.endereco} ultimo />
        </View>

        {/* Doador */}
        <Text style={styles.secaoTitulo}>DOADOR</Text>
        <View style={[styles.cardSolicitacao, { flexDirection: 'row', alignItems: 'center', gap: 12 }]}>
          <View style={[styles.infoIcone, { width: 48, height: 48, borderRadius: 24 }]}>
            <Text style={{ fontSize: 22 }}>🧑‍🍳</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.nomeOng}>{doacao.doador}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
              {[1, 2, 3, 4, 5].map((n) => (
                <Ionicons key={n} name="star" size={13} color="#FFC107" />
              ))}
              <Text style={{ fontSize: 12, color: '#888888', marginLeft: 4 }}>{doacao.avaliacao}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={{ borderWidth: 1.5, borderColor: '#006B14', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6 }}
            onPress={() => navigation.navigate('InfoDoador')}
            activeOpacity={0.8}
          >
            <Text style={{ fontSize: 12, color: '#006B14', fontWeight: '600' }}>Ver perfil</Text>
          </TouchableOpacity>
        </View>

        {/* Botões */}
        <TouchableOpacity
          style={[styles.botaoRecusar, { flexDirection: 'row', justifyContent: 'center', gap: 8, marginBottom: 12 }]}
          onPress={() => navigation.navigate('MapaDoacoes')}
          activeOpacity={0.85}
        >
          <Ionicons name="map-outline" size={18} color="#006B14" />
          <Text style={[styles.botaoRecusarTexto, { color: '#006B14' }]}>Ver no Mapa</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botaoNovaDoacao, { flexDirection: 'row', justifyContent: 'center', gap: 8 }]}
          onPress={() => navigation.navigate('ConfirmarSolicitacao', { doacao })}
          activeOpacity={0.85}
        >
          <Text style={styles.botaoNovaDoacaoTexto}>Solicitar Doação</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={{ height: 20 }} />
      </ScrollView>

      <FooterReceptor navigation={navigation} abaAtual="Pedidos" />
    </SafeAreaView>
  );
}