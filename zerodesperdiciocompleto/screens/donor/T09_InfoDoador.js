import React from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  SafeAreaView, StatusBar, Platform,
} from 'react-native';

import { getGlobalStyles } from '../../Styles';
import { useTheme } from '../../ThemeContext';
import FooterDoador from './FooterDoador';
import ResumoPerfil from '../../ResumoPerfil';

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
    { id: 3, icone: '🍞', nome: 'Pães artesanais',     detalhe: '20 unidades · expira hoje',   status: 'Ativa' },
  ]
};

// Componente modificado para receber os estilos
function InfoRow({ icone, label, valor, ultimo, styles }) {
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

export default function T09_InfoDoador({ navigation }) {
  const { theme, isDarkMode } = useTheme();
  const styles = getGlobalStyles(theme);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={theme.headerBackground} />

      <View style={styles.headerTop}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backBtnTexto}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuIcone}>
          <Text style={styles.menuIconeTexto}>≡</Text>
        </TouchableOpacity>
      </View>

      <ResumoPerfil
        emoji="👨‍🍳"
        nome={DOADOR.nome}
        subtitulo={`Doador ativo desde ${DOADOR.membro_desde}`}
        stats={[
          { valor: DOADOR.stats.doacoes, label: 'Doações' },
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
          <InfoRow icone="📍" label="Endereço de retirada" valor={DOADOR.endereco} styles={styles} />
          <InfoRow icone="🕐" label="Horário disponível"   valor={DOADOR.horario} styles={styles} />
          <InfoRow icone="📱" label="Telefone"             valor={DOADOR.telefone} styles={styles} />
          <InfoRow icone="✉️" label="E-mail"               valor={DOADOR.email} ultimo styles={styles} />
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
          <TouchableOpacity key={item.id} style={[styles.cardSolicitacao, styles.doacaoCard]} activeOpacity={0.8}>
            <View style={styles.doacaoIconeBox}>
              <Text style={{ fontSize: 20 }}>{item.icone}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.nomeOng}>{item.nome}</Text>
              <Text style={[styles.descricaoSolicitacao, { marginBottom: 0 }]}>{item.detalhe}</Text>
            </View>
            <View style={styles.badgeAtiva}>
              <Text style={styles.badgeAtivaTexto}>{item.status}</Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: 20 }} />
      </ScrollView>

      <FooterDoador navigation={navigation} abaAtual="Info" />
    </SafeAreaView>
  );
}