import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, TextInput,
  SafeAreaView, StatusBar, Switch, Platform, Alert, KeyboardAvoidingView
} from 'react-native';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';

import { getGlobalStyles } from '../../Styles';
import { useTheme } from '../../ThemeContext';
import FooterReceptor from './FooterReceptor';
import ResumoPerfil from '../../ResumoPerfil';

// Componente FAQ Reintegrado
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

export default function T20_PerfilReceptor({ navigation }) {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const styles = getGlobalStyles(theme);

  const [exibirAjuda, setExibirAjuda] = useState(false);
  const [editando, setEditando] = useState(false);
  const [notificacoesAtivas, setNotificacoesAtivas] = useState(false);

  // --- ESTADOS DOS DADOS ---
  const [nome, setNome] = useState('Maria de Lourdes');
  const [telefone, setTelefone] = useState('(85) 9 9988-7766');
  const [email, setEmail] = useState('maria.lourdes@email.com');
  const [sobre, setSobre] = useState('Faço parte de uma rede de apoio comunitário que ajuda 20 famílias no bairro.');

  const faqs = [
    {
      pergunta: "Como aceito uma doação?",
      resposta: "Navegue pela tela inicial, escolha um item disponível e clique em 'Tenho Interesse'. O doador será notificado."
    },
    {
      pergunta: "Quem pode retirar o alimento?",
      resposta: "O titular da conta ou alguém autorizado. Combine sempre os detalhes de data e horário pelo chat após a aceitação."
    },
    {
      pergunta: "O que fazer se o alimento estiver ruim?",
      resposta: "Você deve avaliar o doador no sistema. Em casos graves, entre em contato com o suporte oficial."
    },
    {
      pergunta: "A plataforma é gratuita?",
      resposta: "Sim! Somos uma rede de solidariedade. É proibida qualquer venda ou cobrança pelos itens doados."
    }
  ];

  // Lógica de Notificações Completa
  const gerenciarNotificacoes = async () => {
    if (!notificacoesAtivas) {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === 'granted') {
        setNotificacoesAtivas(true);
        Alert.alert('Notificações Ativadas', 'Avisaremos quando surgirem doações perto de si!');
      } else {
        Alert.alert('Erro', 'As notificações foram negadas nas configurações do telemóvel.');
      }
    } else {
      Alert.alert(
        'Desativar Alertas',
        'Deseja parar de receber avisos de novas doações?',
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
      <View style={[styles.infoIcone, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : '#E3F2FD' }]}>
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
                  emoji="🏘️"
                  nome={nome}
                  subtitulo="Receptor desde mar/2023"
                  stats={[
                    { valor: '63', label: 'Recebidas' },
                    { valor: '4,3⭐', label: 'Avaliação' },
                    { valor: '180kg', label: 'Alimentos' },
                  ]}
                />
              )}

              {editando ? (
                /* --- MODO EDIÇÃO --- */
                <View style={{ marginTop: 10 }}>
                  <Text style={styles.secaoTitulo}>Informações Pessoais</Text>
                  <View style={styles.cardSolicitacao}>
                    <InfoRow icone="person-outline" label="Nome Completo" valor={nome} onChange={setNome} />
                    <InfoRow icone="call-outline" label="Telemóvel / WhatsApp" valor={telefone} onChange={setTelefone} />
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
                      <View style={[styles.infoIcone, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : '#E3F2FD' }]}>
                        <Feather name="user" size={22} color={theme.primary} />
                      </View>
                      <Text style={[styles.menuText, { flex: 1, marginLeft: 15 }]}>Editar Perfil</Text>
                      <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.menuItem, styles.menuItemBorda]} onPress={() => navigation.navigate('RecuperarSenha')}>
                      <View style={[styles.infoIcone, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : '#E3F2FD' }]}>
                        <Feather name="key" size={22} color={theme.primary} />
                      </View>
                      <Text style={[styles.menuText, { flex: 1, marginLeft: 15 }]}>Alterar Senha</Text>
                      <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
                    </TouchableOpacity>

                    <View style={styles.menuItem}>
                      <View style={[styles.infoIcone, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : '#E3F2FD' }]}>
                        <Ionicons name={notificacoesAtivas ? "notifications" : "notifications-outline"} size={22} color={theme.primary} />
                      </View>
                      <Text style={[styles.menuText, { flex: 1, marginLeft: 15 }]}>Notificações</Text>
                      <Switch value={notificacoesAtivas} onValueChange={gerenciarNotificacoes} trackColor={{ true: theme.primary }} thumbColor="#FFF" />
                    </View>
                  </View>

                  <Text style={styles.secaoTitulo}>Sistema</Text>
                  <View style={styles.cardSolicitacao}>
                    <View style={[styles.menuItem, styles.menuItemBorda]}>
                      <View style={[styles.infoIcone, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : '#E3F2FD' }]}>
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

      <FooterReceptor navigation={navigation} abaAtual="Perfil" />
    </SafeAreaView>
  );
}