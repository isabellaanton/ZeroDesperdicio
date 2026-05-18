import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, TextInput,
  SafeAreaView, StatusBar, Switch, Platform, Alert, KeyboardAvoidingView
} from 'react-native';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';

import { getGlobalStyles } from '../../Styles';
import { useTheme } from '../../ThemeContext';
import FooterDoador from './FooterDoador';
import ResumoPerfil from '../../ResumoPerfil';

// Componente FAQ
const FAQItem = ({ pergunta, resposta, theme, styles }) => {
  const [expandido, setExpandido] = useState(false);
  return (
    <TouchableOpacity 
      style={[styles.cardSolicitacao, { marginBottom: 12, borderColor: theme.primary, borderWidth: 0.5 }]} 
      onPress={() => setExpandido(!expandido)}
      activeOpacity={0.7}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ color: theme.primary, fontWeight: 'bold', flex: 1, fontSize: 15 }}>{pergunta}</Text>
        <Ionicons name={expandido ? "chevron-up" : "chevron-down"} size={20} color={theme.secondary} />
      </View>
      {expandido && (
        <View style={{ marginTop: 10, borderTopWidth: 0.5, borderTopColor: theme.mode === 'dark' ? '#333' : '#EEEEEE', paddingTop: 10 }}>
          <Text style={[styles.descricaoSolicitacao, { color: theme.textMuted, marginBottom: 0, lineHeight: 20 }]}>{resposta}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default function T11_PerfilDoador({ navigation }) {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const styles = getGlobalStyles(theme);

  const [exibirAjuda, setExibirAjuda] = useState(false);
  const [editando, setEditando] = useState(false);
  const [notificacoesAtivas, setNotificacoesAtivas] = useState(false);

  // --- ESTADOS DOS DADOS ---
  const [nome, setNome] = useState('Restaurante Sabor & Arte');
  const [telefone, setTelefone] = useState('(85) 9 8765-4321');
  const [email, setEmail] = useState('contato@saborarte.com.br');
  const [sobre, setSobre] = useState('Doamos refeições excedentes toda semana focando em evitar o desperdício.');

  const faqs = [
    {
      pergunta: "Como faço uma doação?",
      resposta: "Clique no botão 'Nova Doação' na sua tela inicial, preencha os dados do alimento e aguarde um receptor aceitar."
    },
    {
      pergunta: "Quais alimentos são aceitos?",
      resposta: "Alimentos dentro do prazo de validade e em boas condições de higiene. Evite alimentos prontos que estragam muito rápido."
    },
    {
      pergunta: "Como entro em contato com o receptor?",
      resposta: "Após o receptor aceitar sua doação, um chat ou botão de contato será liberado nos detalhes da doação."
    },
    {
      pergunta: "A plataforma é segura?",
      resposta: "Sim! Utilizamos um sistema de avaliações (estrelas) para que a comunidade mantenha a confiança mútua."
    }
  ];

  // Lógica de Notificações com Alertas
  const gerenciarNotificacoes = async () => {
    if (!notificacoesAtivas) {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === 'granted') {
        setNotificacoesAtivas(true);
        Alert.alert('Notificação ligada', 'Você receberá avisos quando suas doações forem aceitas.');
      } else {
        Alert.alert('Aviso', 'As notificações foram negadas nas configurações.');
      }
    } else {
      Alert.alert(
        'Desativar Notificações',
        'Deseja realmente parar de receber alertas?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Desativar', onPress: () => setNotificacoesAtivas(false), style: 'destructive' },
        ]
      );
    }
  };

  const handleSalvarEdicao = () => {
    setEditando(false);
    Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
  };

  const InfoRow = ({ icone, label, valor, onChange, ultimo }) => (
    <View style={[styles.infoRow, ultimo && { borderBottomWidth: 0, paddingBottom: 0 }]}>
      <View style={[styles.infoIcone, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : '#E8F5E9' }]}>
        <Ionicons name={icone} size={18} color={theme.primary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.infoLabel}>{label}</Text>
        {editando ? (
          <TextInput 
            style={[styles.infoValor, { color: theme.primary, borderBottomWidth: 0.5, borderBottomColor: theme.primary, paddingVertical: 2 }]} 
            value={valor} 
            onChangeText={onChange}
          />
        ) : (
          <Text style={styles.infoValor}>{valor}</Text>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={theme.headerBackground} />

      {/* HEADER DINÂMICO */}
      <View style={[styles.headerTop, { backgroundColor: theme.headerBackground, height: 60, paddingHorizontal: 15 }]}>
        <TouchableOpacity onPress={() => {
          if (editando) setEditando(false);
          else if (exibirAjuda) setExibirAjuda(false);
          else navigation.goBack();
        }}>
          <Ionicons name={(exibirAjuda || editando) ? "arrow-back" : "menu"} size={24} color={theme.headerTextInverse} />
        </TouchableOpacity>
        
        <Text style={{ color: theme.headerTextInverse, fontSize: 18, fontWeight: 'bold' }}>
          {editando ? "Editar Perfil" : exibirAjuda ? "Ajuda e Suporte" : "Meu Perfil"}
        </Text>

        <TouchableOpacity onPress={() => editando ? handleSalvarEdicao() : setEditando(true)}>
          <Ionicons name={editando ? "checkmark-sharp" : "ellipsis-vertical"} size={24} color={theme.headerTextInverse} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView style={styles.conteudo} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {exibirAjuda ? (
            /* --- TELA DE AJUDA --- */
            <View style={{ padding: 20 }}>
              <Text style={[styles.secaoTitulo, { marginBottom: 20 }]}>PERGUNTAS FREQUENTES</Text>
              {faqs.map((item, index) => (
                <FAQItem key={index} pergunta={item.pergunta} resposta={item.resposta} theme={theme} styles={styles} />
              ))}
              <View style={{ marginTop: 30, paddingBottom: 40 }}>
                <Text style={[styles.secaoTitulo, { textAlign: 'center' }]}>CANAIS DE CONTATO</Text>
                <View style={[styles.cardSolicitacao, { borderColor: theme.secondary, alignItems: 'center', padding: 20 }]}>
                  <Text style={[styles.nomeOng, { color: theme.primary, marginBottom: 5 }]}>Suporte Zero Desperdício</Text>
                  <Text style={[styles.descricaoSolicitacao, { color: theme.textMuted }]}>ajuda@zerodesperdicio.com.br</Text>
                </View>
              </View>
            </View>
          ) : (
            <>
              {!editando && (
                <ResumoPerfil
                  emoji="👨‍🍳"
                  nome={nome}
                  subtitulo="Doador Prata · Fortaleza"
                  stats={[
                    { valor: '34', label: 'Doações' },
                    { valor: '4,9⭐', label: 'Avaliação' },
                    { valor: '125kg', label: 'Doados' },
                  ]}
                />
              )}

              {editando ? (
                /* --- MODO EDIÇÃO --- */
                <View style={{ marginTop: 10 }}>
                  <Text style={styles.secaoTitulo}>Informações Pessoais</Text>
                  <View style={styles.cardSolicitacao}>
                    <InfoRow icone="storefront-outline" label="Nome do Estabelecimento" valor={nome} onChange={setNome} />
                    <InfoRow icone="call-outline" label="Telefone / WhatsApp" valor={telefone} onChange={setTelefone} />
                    <InfoRow icone="mail-outline" label="E-mail" valor={email} onChange={setEmail} ultimo />
                  </View>

                  <Text style={styles.secaoTitulo}>Sobre Você</Text>
                  <View style={styles.cardSolicitacao}>
                    <TextInput 
                      style={[styles.descricaoSolicitacao, { color: theme.text, minHeight: 80, padding: 10 }]} 
                      value={sobre} 
                      onChangeText={setSobre} 
                      multiline 
                    />
                  </View>

                  <TouchableOpacity style={[styles.botao_entrar, { marginTop: 20 }]} onPress={handleSalvarEdicao}>
                    <Text style={styles.texto_botao_entrar}>Confirmar Alterações</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                /* --- MODO VISUALIZAÇÃO --- */
                <>
                  <Text style={styles.secaoTitulo}>Configurações de Conta</Text>
                  <View style={styles.cardSolicitacao}>
                    <TouchableOpacity style={[styles.menuItem, styles.menuItemBorda]} onPress={() => setEditando(true)}>
                      <View style={[styles.infoIcone, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : '#E8F5E9' }]}>
                        <Feather name="user" size={22} color={theme.primary} />
                      </View>
                      <Text style={[styles.menuText, { flex: 1, marginLeft: 15 }]}>Editar Perfil</Text>
                      <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.menuItem, styles.menuItemBorda]} onPress={() => navigation.navigate('RecuperarSenha')}>
                      <View style={[styles.infoIcone, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : '#E8F5E9' }]}>
                        <Feather name="key" size={22} color={theme.primary} />
                      </View>
                      <Text style={[styles.menuText, { flex: 1, marginLeft: 15 }]}>Alterar Senha</Text>
                      <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
                    </TouchableOpacity>

                    <View style={styles.menuItem}>
                      <View style={[styles.infoIcone, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : '#E8F5E9' }]}>
                        <Ionicons name={notificacoesAtivas ? "notifications" : "notifications-outline"} size={22} color={theme.primary} />
                      </View>
                      <Text style={[styles.menuText, { flex: 1, marginLeft: 15 }]}>Notificações</Text>
                      <Switch value={notificacoesAtivas} onValueChange={gerenciarNotificacoes} trackColor={{ true: theme.primary }} thumbColor="#FFF" />
                    </View>
                  </View>

                  <Text style={styles.secaoTitulo}>Sistema</Text>
                  <View style={styles.cardSolicitacao}>
                    <View style={[styles.menuItem, styles.menuItemBorda]}>
                      <View style={[styles.infoIcone, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : '#E8F5E9' }]}>
                        <Feather name="moon" size={20} color={theme.primary} />
                      </View>
                      <Text style={[styles.menuText, { flex: 1, marginLeft: 15 }]}>Modo Escuro</Text>
                      <Switch value={isDarkMode} onValueChange={toggleTheme} trackColor={{ true: theme.primary }} thumbColor="#FFF" />
                    </View>

                    <TouchableOpacity style={[styles.menuItem, styles.menuItemBorda]} onPress={() => setExibirAjuda(true)}>
                      <View style={[styles.infoIcone, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : '#E3F2FD' }]}>
                        <Feather name="help-circle" size={22} color={theme.primary} />
                      </View>
                      <Text style={[styles.menuText, { flex: 1, marginLeft: 15 }]}>Ajuda e Suporte</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Login')}>
                      <View style={[styles.infoIcone, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : '#FFF3E0' }]}>
                        <MaterialIcons name="logout" size={20} color={theme.secondary} />
                      </View>
                      <Text style={[styles.menuText, { flex: 1, marginLeft: 15, color: theme.secondary }]}>Sair da Conta</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </>
          )}
          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>

      <FooterDoador navigation={navigation} abaAtual="Perfil" />
    </SafeAreaView>
  );
}