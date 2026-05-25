import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../../config/firebaseConfig';
import { getGlobalStyles } from '../../Styles';
import { useTheme } from '../../ThemeContext';
import FooterReceptor from './FooterReceptor';
import ResumoPerfil from '../../ResumoPerfil';

const staticProfileMetadata = {
  tipo: 'Receptor Individual',
  membro_desde: 'mar/2023',
  stats: { recebidas: 63, avaliacao: '4.3' },
  endereco: 'Bairro de Fátima, Fortaleza - CE',
};

const InfoRow = ({ icone, label, valor, ultimo, styles, theme, isDarkMode }) => (
  <View style={[styles.infoRow, ultimo && { borderBottomWidth: 0, paddingBottom: 0 }]}>
    <View style={[styles.infoIcone, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : '#E3F2FD' }]}>
      <Ionicons name={icone} size={18} color={theme.primary} />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValor}>{valor}</Text>
    </View>
  </View>
);

export default function T18_InfoReceptor({ navigation }) {
  const { theme, isDarkMode } = useTheme();
  const styles = getGlobalStyles(theme);

  const [nome, setNome] = useState('Maria de Lourdes');
  const [telefone, setTelefone] = useState('(85) 9 9988-7766');
  const [email, setEmail] = useState('maria.lourdes@email.com');
  const [sobre, setSobre] = useState('Faço parte de uma rede de apoio comunitário que ajuda 20 famílias no bairro. Busco doações para complementar as refeições dessas pessoas.');

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
      console.error("Erro no listener da T18_InfoReceptor:", error);
    });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={theme.headerBackground} />

      {/* Header Padronizado */}
      <View style={[styles.headerTop, { backgroundColor: theme.headerBackground, height: 60, paddingHorizontal: 15 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.headerTextInverse} />
        </TouchableOpacity>
        
        <Text style={{ color: theme.headerTextInverse, fontSize: 18, fontWeight: 'bold' }}>
          Detalhes do Receptor
        </Text>

        <TouchableOpacity>
          <Ionicons name="share-social-outline" size={24} color={theme.headerTextInverse} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.conteudo} 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        <ResumoPerfil
          emoji="🏘️"
          nome={nome}
          subtitulo={`${staticProfileMetadata.tipo} desde ${staticProfileMetadata.membro_desde}`}
          stats={[
            { valor: staticProfileMetadata.stats.recebidas, label: 'Recebidas' },
            { valor: '4,3⭐', label: 'Avaliação' },
            { valor: '180kg', label: 'Alimentos' },
          ]}
        />

        <Text style={styles.secaoTitulo}>Informações Pessoais</Text>
        <View style={styles.cardSolicitacao}>
          <InfoRow 
            icone="location-outline" 
            label="Localização" 
            valor={staticProfileMetadata.endereco} 
            styles={styles} 
            theme={theme} 
            isDarkMode={isDarkMode} 
          />
          <InfoRow 
            icone="call-outline" 
            label="Telefone / WhatsApp" 
            valor={telefone} 
            styles={styles} 
            theme={theme} 
            isDarkMode={isDarkMode} 
          />
          <InfoRow 
            icone="mail-outline" 
            label="E-mail de Contato" 
            valor={email} 
            ultimo 
            styles={styles} 
            theme={theme} 
            isDarkMode={isDarkMode} 
          />
        </View>

        <Text style={styles.secaoTitulo}>Sobre o Receptor</Text>
        <View style={styles.cardSolicitacao}>
          <View style={{ flexDirection: 'row', padding: 5 }}>
            <Text style={[styles.descricaoSolicitacao, { color: theme.text, lineHeight: 22 }]}>
              {sobre}
            </Text>
          </View>
        </View>
      </ScrollView>

      <FooterReceptor navigation={navigation} abaAtual="Info" />
    </SafeAreaView>
  );
}