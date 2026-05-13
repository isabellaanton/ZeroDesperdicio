import React from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  SafeAreaView, StatusBar, Platform,
} from 'react-native';
import styles from '../../Styles';
import FooterDoador from './FooterDoador';
import ResumoPerfil from './ResumoPerfil';

const DOADOR = {
  nome: 'Restaurante Sabor & Arte',
  membro_desde: 'jan/2024',
  endereco: 'R. das Flores, 142 — Meireles, Fortaleza',
  horario: 'Seg – Sex, das 18h às 20h',
  telefone: '(85) 9 8765-4321',
  email: 'contato@saborarte.com.br',
  sobre: 'Restaurante familiar com 10 anos de experiência. Doamos refeições prontas e ingredientes excedentes toda semana para ajudar quem precisa.',
  stats: { doacoes: 34, receptores: 12, avaliacao: '4.9' },
  doacoes_ativas: [
    { id: 1, icone: '🍚', nome: 'Marmitas de frango',  detalhe: '10 unidades · expira às 20h', status: 'Ativa' },
    { id: 2, icone: '🥦', nome: 'Legumes variados',    detalhe: '~3 kg · expira amanhã',       status: 'Ativa' },
    { id: 3, icone: '🍞', nome: 'Pães do dia',         detalhe: '20 unidades · expira 19h',    status: 'Pendente' },
  ],
};

function InfoRow({ icone, label, valor, ultimo }) {
  return (
    <View style={[styles.infoRow, ultimo && { borderBottomWidth: 0, paddingBottom: 0 }]}>
      <View style={styles.infoIcone}>
        <Text style={styles.infoIconeTexto}>{icone}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValor}>{valor}</Text>
      </View>
    </View>
  );
}

function DoacaoCard({ item }) {
  const ativa = item.status === 'Ativa';
  return (
    <View style={[styles.cardSolicitacao, styles.doacaoCard]}>
      <View style={styles.doacaoIconeBox}>
        <Text style={{ fontSize: 20 }}>{item.icone}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.nomeOng}>{item.nome}</Text>
        <Text style={styles.descricaoSolicitacao}>{item.detalhe}</Text>
      </View>
      <View style={[styles.badgePendente, ativa && styles.badgeAtiva]}>
        <Text style={[styles.badgePendenteTexto, ativa && styles.badgeAtivaTexto]}>{item.status}</Text>
      </View>
    </View>
  );
}

export default function T09_InfoDoador({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#006B14" />

      {/* Header */}
      <View style={[styles.header, {
        height: 70, flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between', paddingTop: Platform.OS === 'android' ? 12 : 8,
      }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backBtnTexto}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.saudacao, { fontSize: 18, paddingBottom: 0 }]}>Info do Doador</Text>
        <View style={{ width: 38 }} />
      </View>

      {/* Resumo */}
      <ResumoPerfil
        compacto={true}
        emoji="🧑‍🍳"
        nome={DOADOR.nome}
        subtitulo={`Doador desde ${DOADOR.membro_desde}`}
        stats={[
          { valor: DOADOR.stats.doacoes,    label: 'Doações' },
          { valor: DOADOR.stats.receptores, label: 'Receptores' },
          { valor: `${DOADOR.stats.avaliacao}⭐`, label: 'Avaliação' },
        ]}
      />

      <ScrollView
        style={styles.conteudo}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.secaoTitulo}>Informações de contato</Text>
        <View style={styles.cardSolicitacao}>
          <InfoRow icone="📍" label="Endereço de retirada" valor={DOADOR.endereco} />
          <InfoRow icone="🕐" label="Horário disponível"   valor={DOADOR.horario} />
          <InfoRow icone="📱" label="Telefone"             valor={DOADOR.telefone} />
          <InfoRow icone="✉️" label="E-mail"               valor={DOADOR.email} ultimo />
        </View>

        <Text style={styles.secaoTitulo}>Sobre o doador</Text>
        <View style={styles.cardSolicitacao}>
          <View style={styles.sobreRow}>
            <View style={styles.infoIcone}>
              <Text style={styles.infoIconeTexto}>ℹ️</Text>
            </View>
            <Text style={[styles.descricaoSolicitacao, { flex: 1, marginBottom: 0 }]}>
              {DOADOR.sobre}
            </Text>
          </View>
        </View>

        <Text style={styles.secaoTitulo}>Doações disponíveis agora</Text>
        {DOADOR.doacoes_ativas.map((item) => (
          <DoacaoCard key={item.id} item={item} />
        ))}
      </ScrollView>

      <FooterDoador navigation={navigation} abaAtual="Info" />
    </SafeAreaView>
  );
}