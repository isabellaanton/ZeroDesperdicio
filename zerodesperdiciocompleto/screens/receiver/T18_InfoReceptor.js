import React from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  SafeAreaView, StatusBar, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../Styles';
import FooterReceptor from './FooterReceptor';

const RECEPTOR = {
  nome: 'ONG Vida Nova',
  tipo: 'Instituição Beneficiária',
  membro_desde: 'mar/2023',
  stats: { recebidas: 152, avaliacao: '4.9' },
  endereco: 'Rua das Flores, 123 — Centro',
  telefone: '(11) 98765-4321',
  email: 'contato@vidanova.org.br',
  horario: 'Seg – Sex, das 08h às 17h',
  sobre: 'Atuamos há mais de 10 anos no combate à fome na região central, distribuindo marmitas e cestas básicas para famílias em situação de vulnerabilidade social. Nosso foco é o aproveitamento total de alimentos.',
};

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

export default function T18_InfoReceptor({ navigation }) {
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
        <Text style={[styles.saudacao, { fontSize: 18, paddingBottom: 0 }]}>Info do Receptor</Text>
        <View style={{ width: 38 }} />
      </View>

      {/* Avatar section */}
      <View style={[styles.header, { height: 'auto', paddingVertical: 28, alignItems: 'center', justifyContent: 'center' }]}>
        <View style={styles.avatar}>
          <Text style={styles.avatarEmoji}>🏘️</Text>
        </View>
        <Text style={[styles.saudacao, { paddingBottom: 4 }]}>{RECEPTOR.nome}</Text>
        <Text style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>{RECEPTOR.tipo}</Text>
        <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 18, marginTop: 2 }}>
          Membro desde {RECEPTOR.membro_desde}
        </Text>

        {/* Stats */}
        <View style={[styles.resumoContainer, { width: '100%' }]}>
          <View style={[styles.resumoCard, { flex: 1, alignItems: 'center' }]}>
            <Text style={styles.resumoNumeroDestaque}>{RECEPTOR.stats.recebidas}</Text>
            <Text style={styles.resumoLabelDestaque}>Recebidas</Text>
          </View>
          <View style={{ width: 1, backgroundColor: 'rgba(255,255,255,0.25)' }} />
          <View style={[styles.resumoCard, { flex: 1, alignItems: 'center' }]}>
            <Text style={styles.resumoNumeroDestaque}>{RECEPTOR.stats.avaliacao} ⭐</Text>
            <Text style={styles.resumoLabelDestaque}>Avaliação</Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.conteudo}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.secaoTitulo}>DADOS DE CONTATO</Text>
        <View style={styles.cardSolicitacao}>
          <InfoRow icone="location-outline" label="Endereço" valor={RECEPTOR.endereco} />
          <InfoRow icone="call-outline"      label="Telefone" valor={RECEPTOR.telefone} />
          <InfoRow icone="mail-outline"      label="E-mail"   valor={RECEPTOR.email} />
          <InfoRow icone="time-outline"      label="Horário"  valor={RECEPTOR.horario} ultimo />
        </View>

        <Text style={styles.secaoTitulo}>SOBRE A INSTITUIÇÃO</Text>
        <View style={styles.cardSolicitacao}>
          <View style={styles.sobreRow}>
            <View style={styles.infoIcone}>
              <Ionicons name="information-circle-outline" size={20} color="#006B14" />
            </View>
            <Text style={[styles.infoValor, { flex: 1, lineHeight: 22 }]}>{RECEPTOR.sobre}</Text>
          </View>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      <FooterReceptor navigation={navigation} abaAtual="Info" />
    </SafeAreaView>
  );
}