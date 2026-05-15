import { StyleSheet, Platform, Dimensions } from 'react-native';


// PALETA DE CORES UNIFICADA (ZeroDesperdício)
const VERDE_ESCURO = '#006B14';
const LARANJA = '#DA4A02';
const FUNDO = '#FFDDAE';
const BEGE_CARD = '#FFD2AE';
const TEXTO_ESCURO = '#1A1A1A';
const TEXTO_MEDIO = '#555555';
const TEXTO_CLARO = '#888888';
const BRANCO = '#FFFFFF';
const PRETO = '#000000';

export const styles = StyleSheet.create({
  // --- ESTRUTURAS GERAIS --- //
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 25,
    paddingTop: 40,
    backgroundColor: FUNDO,
  },
  safeArea: {
    flex: 1,
    backgroundColor: FUNDO,
  },
  conteudo: {
    flex: 1,
    backgroundColor: FUNDO,
  },
  conteudoContainer: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
  },

  // T01_Splash - Padronizada com a Home
  containerSplash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: FUNDO, // Mesmo fundo da Home
  },

  // Estilo de texto principal (similar ao 'saudacao' da Home)
  texto2: {
    fontSize: 18,
    color: VERDE_ESCURO,
    fontWeight: '700',
    marginHorizontal: 40,
    marginBottom: 20,
  },

  // Estilo dos tópicos (similar ao 'descricaoSolicitacao' da Home)
  texto3: {
    fontSize: 15,
    color: TEXTO_ESCURO,
    lineHeight: 24,
    marginBottom: 40,
    paddingLeft: 60,
    paddingRight: 60,
    paddingHorizontal: 30,
  },

  imagem: {
    marginBottom: 30,
    width: 300,
    height: 200,
    resizeMode: 'contain',
  },

  // Botão Entrar (Igual ao 'botaoNovaDoacao' da Home)

  texto_botao: {
    color: BRANCO,
    fontSize: 17,
    fontWeight: '700',
  },

  // Botão Criar Conta (Igual ao 'botaoRecusar' da Home)
  botao2: {
    backgroundColor: BRANCO,
    width: '80%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: LARANJA,
  },

  texto_botao2: {
    color: LARANJA,
    fontSize: 17,
    fontWeight: '700',
  },


  // --- TEXTOS E TÍTULOS (Login/Cadastro/Redefinir) //
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: VERDE_ESCURO,
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    color: TEXTO_MEDIO,
    marginBottom: 15,
  },
  texto_bem_vindo: {
    color: VERDE_ESCURO,
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center',
    marginTop: 40,
  },
  texto_acesso_conta: {
    color: TEXTO_CLARO,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10,
    paddingBottom: 50,
  },

  // --- INPUTS PADRONIZADOS ---
  input: {
    backgroundColor: BRANCO,
    borderWidth: 1.5,
    borderColor: TEXTO_MEDIO,
    borderRadius: 15,
    paddingHorizontal: 20,
    height: 55,
    width: '95%',
    alignSelf: 'center',
    marginTop: 15,
  },
  inputContainer: { // Para telas com ícone de olho
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BRANCO,
    borderWidth: 1.5,
    borderColor: TEXTO_MEDIO,
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 55,
    width: '95%',
    alignSelf: 'center',
    marginTop: 15,
  },

  // --- BOTÕES ---
  botao_entrar: { // Usado no Login e Redefinir
    backgroundColor: LARANJA,
    height: 55,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    width: '90%',
    alignSelf: 'center',
    elevation: 3,
  },
  buttonPrimary: { // Alias para o botão padrão
    backgroundColor: LARANJA,
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: BRANCO,
    fontWeight: 'bold',
    fontSize: 18,
  },
  texto_botao_entrar: {
    color: BRANCO,
    fontSize: 18,
    fontWeight: 'bold',
  },

  // --- COMPONENTES ESPECÍFICOS (Cadastro) --- //
  tipoContainer: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: 'center'
  },
  tipoBtn: {
    flex: 1,
    padding: 10,
    borderWidth: 1.5,
    borderColor: TEXTO_CLARO,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
    backgroundColor: BRANCO
  },
  tipoSelecionado: {
    borderColor: VERDE_ESCURO,
    backgroundColor: '#C8F7C5'
  },

  // --- COMPONENTES ESPECÍFICOS (Home Doador) ---

  // Header
  header: {
    backgroundColor: VERDE_ESCURO,
    paddingHorizontal: 20,
    paddingBottom: 14,
    flexDirection: 'column', 
    alignItems: 'center',    
    justifyContent: 'center',  
    height: 260,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center',
    width: '95%',
  },
  saudacao: {
  fontSize: 25,
  fontWeight: '700',
  color: BRANCO,
  letterSpacing: 0.2,
  paddingBottom: 25, 
},

  nomeRestaurante: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.75)',
    paddingBottom: 5,
  },
  menuIcone: {
    padding: 4,
  },
  menuIconeTexto: {
    fontSize: 35,
    color: BRANCO,
  },

  // Cards de resumo
  resumoContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  resumoCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  resumoCardDestaque: {
    backgroundColor: LARANJA,
  },
  resumoNumero: {
    fontSize: 28,
    fontWeight: '700',
    color: TEXTO_MEDIO,
    alignItems: 'center',

  },
  resumoLabel: {
    fontSize: 13,
    color: TEXTO_MEDIO,
    marginTop: 2,
    alignItems: 'center',
  },
  resumoNumeroDestaque: {
    fontSize: 28,
    fontWeight: '700',
    color: BRANCO,
    alignItems: 'center',

  },
  resumoLabelDestaque: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 2,
    alignItems: 'center',

  },

  // Conteúdo
  conteudoHomeDoador: {
  flex: 1,
  backgroundColor: FUNDO,
  marginTop: -1,
},
  conteudoContainerHomeDoador: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
    
  },

  // Botão Nova Doação
  botaoNovaDoacao: {
    backgroundColor: LARANJA,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 28,
    elevation: 4,
  },
  botaoNovaDoacaoTexto: {
    fontSize: 17,
    fontWeight: '700',
    color: BRANCO,
    letterSpacing: 0.3,
  },

  // Seção título
  secaoTitulo: {
    fontSize: 11,
    fontWeight: '700',
    color: TEXTO_CLARO,
    letterSpacing: 1.2,
    marginBottom: 12,
  },

  // Card de solicitação
  cardSolicitacao: {
    backgroundColor: BEGE_CARD,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#DA4A02',
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  nomeOng: {
    fontSize: 15,
    fontWeight: '700',
    color: TEXTO_ESCURO,
    flex: 1,
    marginRight: 8,
  },
  descricaoSolicitacao: {
    fontSize: 13,
    color: TEXTO_MEDIO,
    marginBottom: 14,
  },

  // Badge
  badgePendente: {
    backgroundColor: '#FDEBD8',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: '#F0C49A',
  },
  badgePendenteTexto: {
    fontSize: 11,
    fontWeight: '600',
    color: '#A0511A',
  },

  // Botões do card
  botoesCard: {
    flexDirection: 'row',
    gap: 10,
  },
  botaoAceitar: {
    flex: 1,
    backgroundColor: VERDE_ESCURO,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  botaoAceitarTexto: {
    fontSize: 14,
    fontWeight: '600',
    color: BRANCO,
  },
  botaoRecusar: {
    flex: 1,
    backgroundColor: FUNDO,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: LARANJA,
  },
  botaoRecusarTexto: {
    fontSize: 14,
    fontWeight: '600',
    color: LARANJA,
  },

  // Empty state
  emptyState: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyStateTexto: {
    fontSize: 14,
    color: TEXTO_CLARO,
  },

  // Barra de navegação
  navBar: {
    flexDirection: 'row',
    backgroundColor: BRANCO,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.08)',
    paddingBottom: 30,
    paddingHorizontal: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
  },
  navIcone: {
    fontSize: 20,
    marginBottom: 2,
    opacity: 0.5,
  },
  navIconeAtivo: {
    fontSize: 20,
    marginBottom: 2,
    color: VERDE_ESCURO,
  },
  navLabel: {
    fontSize: 10,
    color: TEXTO_CLARO,
    fontWeight: '500',
  },
  navLabelAtivo: {
    fontSize: 10,
    color: VERDE_ESCURO,
    fontWeight: '700',
  },
backBtn: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 18,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtnTexto: {
    color: BRANCO,
    fontSize: 18,
    fontWeight: '700',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitulo: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.75)',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarArea: {
    alignItems: 'center',
    marginBottom: 6,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  avatarEmoji: {
    fontSize: 30,
  },
 
  // Stats
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
    marginTop: 5,
    marginBottom: 4,
  },
 
  // Scroll
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
 
  // Info rows dentro do card
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: TEXTO_CLARO,
  },
  infoIcone: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(0,107,20,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoIconeTexto: {
    fontSize: 16,
  },
  infoLabel: {
    fontSize: 11,
    color: TEXTO_CLARO,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  infoValor: {
    fontSize: 14,
    color: TEXTO_ESCURO,
    fontWeight: '500',
    marginTop: 2,
  },
 
  // Sobre
  sobreRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
 
  // Card doação
  doacaoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  doacaoIconeBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: 'rgba(0,107,20,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
 
  // Badge ativa
  badgeAtiva: {
    backgroundColor: '#D4EDDA',
    borderColor: '#A8D5B5',
  },
  badgeAtivaTexto: {
    color: '#1A6E35',
  },

cardSelecionado: {
    position: 'absolute',
    bottom: 12, left: 16, right: 16,
    backgroundColor: BEGE_CARD,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(218,74,2,0.3)',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  cardLabel: {
    fontSize: 10, fontWeight: '700',
    color: LARANJA, letterSpacing: 1,
    textTransform: 'uppercase', marginBottom: 4,
  },
  cardNome: {
    fontSize: 22, fontWeight: '700',
    color: TEXTO_ESCURO, marginBottom: 8, lineHeight: 26,
  },
  cardInfoRow: {
    flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 2,
  },
  cardInfoIcone: { 
    fontSize: 13,
  },

  //T10//

    content: {
    padding: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F9D1A5',
    borderWidth: 1,
    borderColor: '#D35400',
    borderRadius: 10,
    paddingVertical: 15,
    marginBottom: 25,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#333',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#F9D1A5',
    borderWidth: 1,
    borderColor: '#D35400',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  cardInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  statusButton: {
    backgroundColor: '#1CB800',
    borderRadius: 15,
    paddingVertical: 5,
    alignItems: 'center',
  },
  statusText: {
    color: 'white',
    fontWeight: 'bold',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FDE3B7',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#CCC',
  },
  tabItem: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: 10,
  },

//T11//
    menuIcon: {
    position: 'absolute',
    right: 20,
    top: 20,
  },

  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },

  stat: {
    alignItems: 'center',
    marginHorizontal: 20,
  },

  menu: {
    marginTop: 20,
    paddingHorizontal: 20,
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#999',
  },

  menuText: {
    marginLeft: 15,
    fontSize: 16,
  },

  deleteText: {
    textAlign: 'center',
    color: 'red',
    marginTop: 10,
  },

  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#E7C79E',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#999',
    marginTop: 'auto',
  },

  navText: {
    fontSize: 12,
  },

//T13 e T14//
tag: {
    backgroundColor: BEGE_CARD,
    padding: 6,
    borderRadius: 8,
    marginRight: 5,
    marginBottom: 5,
    color: TEXTO_ESCURO,
  },

  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: VERDE_ESCURO,
  },

  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: TEXTO_ESCURO,
    marginTop: 10,
    marginBottom: 5,
  },
  
  label_input: {
    backgroundColor: BRANCO,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    color: 'gray',
  },

  linha: {
    flexDirection: 'row',
    display: 'flex',
    flexWrap: 'wrap',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#ebdbc4',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: LARANJA,
  },

  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: VERDE_ESCURO,
  },

  disponivel: {
    color: VERDE_ESCURO,
    marginBottom: 10,
  },

  textoCard: {
    color: TEXTO_MEDIO,
  },
  
  container_icone_voltar_contato: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
//Componentes específicos (T06_CadastrarDoacao)'
  header_cadastro: {
    backgroundColor: VERDE_ESCURO,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 16 : 8,
    paddingBottom: 30,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    height: 100,
    flexDirection: 'row',
  },
  headerTituloCentralizado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'left',
    paddingTop: Platform.OS === 'android' ? 5 : 15,
  },
  tituloCadastro: {
    fontSize: 24,
    fontWeight: '700',
    color: BRANCO,
  },
  menuIconeAbsoluto: {
    position: 'absolute',
    right: 20,
    top: Platform.OS === 'android' ? 25 : 35,
    padding: 4,
  },
  conteudoFormulario: {
    paddingHorizontal: 25,
    paddingTop: 10,
    paddingBottom: 40,
  },
  labelCadastro: {
    fontSize: 16,
    color: TEXTO_ESCURO,
    marginBottom: 8,
    marginTop: 15,
  },
  inputCadastro: {
    backgroundColor: '#E8D4BE', // Fundo bege igual ao do protótipo
    borderWidth: 1.5,
    borderColor: LARANJA,
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 55,
    color: TEXTO_ESCURO,
    fontSize: 16,
  },
  rowCadastro: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputMetade: {
    flex: 1,
    textAlign: 'center',
  },
  espacoEntreInputs: {
    width: 15,
  },
  inputCadastroIcone: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8D4BE',
    borderWidth: 1.5,
    borderColor: LARANJA,
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 55,
  },
  inputSemBorda: {
    flex: 1,
    color: TEXTO_ESCURO,
    fontSize: 16,
  },
  inputFoto: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#A8A8A8',
    borderStyle: 'dashed',
    borderRadius: 15,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  textoFoto: {
    color: TEXTO_MEDIO,
    fontSize: 16,
  },
  // --- COMPONENTES ESPECÍFICOS (Home Receptor) --- //
  headerReceptor: {
    backgroundColor: VERDE_ESCURO,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 25 : 15,
    paddingBottom: 25,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcone: {
    fontSize: 22,
    marginRight: 5,
  },
  locationText: {
    fontSize: 22,
    fontWeight: '700',
    color: BRANCO,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDEBD8',
    borderWidth: 1.5,
    borderColor: LARANJA,
    borderRadius: 15,
    marginHorizontal: 20,
    marginTop: 20,
    paddingHorizontal: 15,
    height: 50,
  },
  searchIcon: {
    fontSize: 18,
    color: TEXTO_MEDIO,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: TEXTO_ESCURO,
  },
  filtersRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 15,
    marginBottom: 20,
    gap: 10,
    flexGrow: 1, // Faz o contêiner ocupar a largura total da tela
    justifyContent: 'center', // Centraliza os itens no meio
  },
  filterBtn: {
    borderWidth: 1,
    borderColor: PRETO,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: '#FDEBD8',
    justifyContent: 'center',
  },
  filterBtnActive: {
    backgroundColor: VERDE_ESCURO,
    borderColor: PRETO,
  },
  filterText: {
    color: TEXTO_ESCURO,
    fontSize: 13,
  },
  filterTextActive: {
    color: BRANCO,
    fontSize: 13,
  },
  cardReceptor: {
    flexDirection: 'row',
    backgroundColor: '#FDEBD8',
    borderWidth: 1.2,
    borderColor: PRETO,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 10,
    elevation: 2,
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#E0E0E0', 
  },
  cardContent: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: TEXTO_ESCURO,
    marginBottom: 2,
  },
  cardLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardDistanceIcon: {
    fontSize: 14,
  },
  cardDistanceText: {
    fontSize: 14,
    color: TEXTO_ESCURO,
    marginLeft: 2,
  },
  btnDetalhes: {
    backgroundColor: LARANJA,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
  },
  btnDetalhesText: {
    color: BRANCO,
    fontSize: 14,
  },
    container_contato: {
    flex: 1,
    padding: 30,
    backgroundColor: '#FFE4B5',
    justifyContent: 'center',
    borderRadius: 40,
  },
  view_texto_contato: {
    alignItems: 'center',
    marginBottom: 10,
  },
texto_contato: {
    color: '#228B22',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
  },
  subtitulo: {
    textAlign: 'center',
    color: '#8B7355',
    marginBottom: 30,
    fontSize: 16,
  },
  input_contato: {
    flex: 1,
    fontSize: 16,
  },
  botao: {
    backgroundColor: '#D34800',
    width: '100%',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginTop: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
  },
  view_requisitos: {
    marginTop: 30,
  },
  texto_requisito_titulo: {
    color: '#8B7355',
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 16,
  },
  item_requisito: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  texto_item: {
    color: '#666',
    fontSize: 15,
  },
  footer_texto: {
    marginTop: 40,
    fontSize: 12,
    color: '#8B7355',
    textAlign: 'center',
  },
inputPequeno: {
    borderWidth: 2,
    borderColor: LARANJA,
    borderRadius: 10,
    padding: 10,
    width: 80,
    textAlign: 'center',
    color: TEXTO_ESCURO,
  },

  unidades: {
    borderWidth: 2,
    borderColor: LARANJA,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
  },

  inputGrande: {
    borderWidth: 2,
    borderColor: LARANJA,
    borderRadius: 10,
    padding: 10,
    color: TEXTO_ESCURO,
  },

  textoBotao: {
    color: BRANCO,
    fontWeight: 'bold',
  },
  // --- COMPONENTES ESPECÍFICOS (T19_HistoricoReceptor) --- //
  headerHistorico: {
    backgroundColor: VERDE_ESCURO,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 25 : 15,
    paddingBottom: 25,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTituloContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 26,
    color: BRANCO,
  },
  tituloHistorico: {
    fontSize: 24,
    fontWeight: '700',
    color: BRANCO,
    marginLeft: 15,
  },
  cardResumoHistorico: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FDEBD8', // Bege similar aos cards
    borderWidth: 1.5,
    borderColor: LARANJA,
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 25,
    paddingVertical: 18,
  },
  resumoHistoricoItem: {
    alignItems: 'center',
  },
  resumoHistoricoValor: {
    fontSize: 26,
    color: TEXTO_ESCURO,
  },
  resumoHistoricoLabel: {
    fontSize: 14,
    color: TEXTO_ESCURO,
    marginTop: 2,
  },
  cardHistorico: {
    flexDirection: 'row',
    backgroundColor: '#FDEBD8',
    borderWidth: 1.5,
    borderColor: LARANJA,
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 10,
  },
  cardContentHistorico: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  btnConcluido: {
    backgroundColor: '#0FA918', // Verde mais claro/vibrante conforme protótipo
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
    marginTop: 15,
  },
  btnConcluidoText: {
    color: BRANCO,
    fontSize: 14,
    fontWeight: '500',
  },

  //Tela 17 Meus pedidos
  filtrosContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: 25,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  filtroBotao: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: 'transparent',
  },
  filtroBotaoAtivo: {
    backgroundColor: '#327d35', // Fundo verde para a aba ativa
  },
  filtroTexto: {
    color: '#000',
    fontSize: 14,
  },
  filtroTextoAtivo: {
    color: '#FFF',
  },
  cardAzul: {
    borderWidth: 2,
    borderColor: '#2196F3', // Borda azul
  },
  cardLaranja: {
    borderWidth: 1,
    borderColor: '#D85D10', // Borda laranja
  },
  btnAceito: {
    backgroundColor: '#1DB954', // Verde claro
    borderRadius: 20,
    paddingVertical: 6,
    alignItems: 'center',
    marginRight: 10,
  },
  btnPendente: {
    backgroundColor: '#A9A9A9', // Cinza
    borderRadius: 20,
    paddingVertical: 6,
    alignItems: 'center',
    marginRight: 10,
  },
  btnTextoBranco: {
    color: '#FFF',
    fontSize: 14,
  },
});

export default styles;