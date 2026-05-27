import React, { useState, useEffect } from 'react';
import { 
  View, Text, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, 
} from 'react-native';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../../config/firebaseConfig';
import { getGlobalStyles } from '../../Styles';
import { useTheme } from '../../ThemeContext';
import FooterDoador from './FooterDoador';
import ResumoPerfil from '../../ResumoPerfil';

const staticStatsAndActiveDonations = {
  membro_desde: 'jan/2024',
  endereco: 'R. das Flores, 142 — Meireles, Fortaleza',
  horario: 'Seg – Sex, das 18h às 20h',
  stats: { doacoes: 34, receptores: 12, avaliacao: '4.9' },
  doacoes_ativas: [
    { id: 1, icone: '🍚', nome: 'Marmitas de frango',  detalhe: '10 unidades · expira às 20h', status: 'Ativa' },
    { id: 2, icone: '🥦', nome: 'Legumes variados',     detalhe: '~3 kg · expira amanhã',       status: 'Ativa' },
    { id: 3, icone: '🍞', nome: 'Pães artesanais',     detalhe: '20 unidades · expira hoje',   status: 'Ativa' },
  ]
};

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
  const { theme } = useTheme();
  const styles = getGlobalStyles(theme);

  const [nome, setNome] = useState('Restaurante Sabor & Arte');
  const [telefone, setTelefone] = useState('(85) 9 8765-4321');
  const [email, setEmail] = useState('contato@saborarte.com.br');
  const [sobre, setSobre] = useState('Restaurante familiar com 10 anos de experiência. Doamos refeições prontas e ingredientes excedentes toda semana para ajudar quem precisa.');

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const docRef = doc(db, 'usuarios', user.uid);
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        if (data.nome) setNome(data.nome);
        if (data.telefone) setTelefone(data.telefone);
        if (data.email) setEmail(data.email);
        if (data.sobre) setSobre(data.sobre);
      }
    }, (error) => {
      console.error("Erro no listener da T09_InfoDoador:", error);
    });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.headerBackground }}>
      <StatusBar barStyle="light-content" backgroundColor={theme.headerBackground} />

      <View style={{ flex: 1, backgroundColor: theme.background }}>
        
        <ScrollView 
          style={{ flex: 1 }} 
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* BLOCO SUPERIOR VERDE */}
          <View style={{ 
            backgroundColor: theme.headerBackground, 
            width: '100%', 
            paddingTop: 10, 
            paddingBottom: 30 
          }}>
            
            {/* Header: Botões e Título na mesma linha */}
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              paddingHorizontal: 20,
              width: '100%'
            }}>
              <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                <Text style={styles.backBtnTexto}>←</Text>
              </TouchableOpacity>
              
              {/* O título agora é flex: 1 para ocupar o centro e fica na mesma linha */}
              <Text style={[styles.saudacao, { fontSize: 22, paddingBottom: 0, textAlign: 'center', flex: 1 }]}>
                Perfil do Doador
              </Text>
              
              <TouchableOpacity style={styles.menuIcone}>
                <Text style={styles.menuIconeTexto}>≡</Text>
              </TouchableOpacity>
            </View>

            <View style={{ width: '100%', marginTop: 20 }}>
              <ResumoPerfil
                emoji="👨‍🍳"
                nome={nome}
                subtitulo={`Doador ativo desde ${staticStatsAndActiveDonations.membro_desde}`}
                stats={[
                  { valor: staticStatsAndActiveDonations.stats.doacoes, label: 'Doações' },
                  { valor: staticStatsAndActiveDonations.stats.receptores, label: 'Receptores' },
                  { valor: `${staticStatsAndActiveDonations.stats.avaliacao}⭐`, label: 'Avaliação' },
                ]}
              />
            </View>
          </View>

          {/* BLOCO INFERIOR */}
          <View style={{ paddingHorizontal: 20, paddingTop: 25 }}>
            <Text style={styles.secaoTitulo}>Informações de contato</Text>
            <View style={styles.cardSolicitacao}>
              <InfoRow icone="📍" label="Endereço de retirada" valor={staticStatsAndActiveDonations.endereco} styles={styles} />
              <InfoRow icone="🕐" label="Horário disponível"   valor={staticStatsAndActiveDonations.horario} styles={styles} />
              <InfoRow icone="📱" label="Telefone"              valor={telefone} styles={styles} />
              <InfoRow icone="✉️" label="E-mail"                valor={email} ultimo styles={styles} />
            </View>

            <Text style={styles.secaoTitulo}>Sobre o doador</Text>
            <View style={styles.cardSolicitacao}>
              <View style={styles.sobreRow}>
                <View style={styles.infoIcone}>
                  <Text style={styles.infoIconeTexto}>ℹ️</Text>
                </View>
                <Text style={[styles.descricaoSolicitacao, { flex: 1, marginBottom: 0 }]}>
                  {sobre}
                </Text>
              </View>
            </View>

            <Text style={styles.secaoTitulo}>Doações disponíveis agora</Text>
            {staticStatsAndActiveDonations.doacoes_ativas.map((item) => (
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
          </View>

        </ScrollView>
      </View>

      <FooterDoador navigation={navigation} abaAtual="Info" />
    </SafeAreaView>
  );
}