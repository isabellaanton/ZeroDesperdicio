import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet, Platform, StatusBar
} from 'react-native';
import styles from '../../Styles'; // Mantemos para o scroll e cards
import FooterDoador from './FooterDoador';
import ResumoPerfil from './ResumoPerfil'; 

// ---------- dados mock ----------
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
    { id: 1, icone: '🍚', nome: 'Marmitas de frango', detalhe: '10 unidades · expira às 20h', status: 'Ativa' },
    { id: 2, icone: '🥦', nome: 'Legumes variados', detalhe: '~3 kg · expira amanhã', status: 'Ativa' },
    { id: 3, icone: '🍞', nome: 'Pães do dia', detalhe: '20 unidades · expira 19h', status: 'Pendente' },
  ],
};
// --------------------------------

export default function InfoDoador({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#006B14" />

      {/* ── HEADER SLIM CORRIGIDO ── */}
      <View style={sLocal.headerSlim}>
        <TouchableOpacity style={sLocal.btnVoltar} onPress={() => navigation.goBack()}>
          <Text style={sLocal.txtVoltar}>←</Text>
        </TouchableOpacity>
        <Text style={sLocal.headerTitulo}>Info do Doador</Text>
        <View style={{ width: 38 }} />
      </View>

      {/* ── RESUMO COMPACTO ── */}
      <ResumoPerfil 
        compacto={true} 
        emoji="🧑‍🍳"
        nome={DOADOR.nome}
        subtitulo={`Doador desde ${DOADOR.membro_desde}`}
        stats={[
          { valor: DOADOR.stats.doacoes, label: 'Doações' },
          { valor: DOADOR.stats.receptores, label: 'Receptores' },
          { valor: `${DOADOR.stats.avaliacao}⭐`, label: 'Avaliação' }
        ]}
      />

      {/* ── CONTEÚDO ── */}
      <ScrollView
        style={styles.conteudo}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.secaoTitulo}>Informações de contato</Text>
        <View style={styles.cardSolicitacao}>
          <InfoRow icone="📍" label="Endereço de retirada" valor={DOADOR.endereco} />
          <InfoRow icone="🕐" label="Horário disponível" valor={DOADOR.horario} />
          <InfoRow icone="📱" label="Telefone" valor={DOADOR.telefone} />
          <InfoRow icone="✉️" label="E-mail" valor={DOADOR.email} ultimo />
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

      {/* ── FOOTER ── */}
      <FooterDoador navigation={navigation} abaAtual="Info" />
    </SafeAreaView>
  );
}

/* ── Sub-componentes ── */
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

/* Estilos Locais para substituir o header gigante antigo */
const sLocal = StyleSheet.create({
  headerSlim: {
    backgroundColor: '#006B14',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 12 : 8,
    paddingBottom: 14,
  },
  btnVoltar: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },
  txtVoltar: { color: '#FFFFFF', fontSize: 22, fontWeight: 'bold' },
  headerTitulo: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
});