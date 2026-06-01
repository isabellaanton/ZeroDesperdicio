import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// ── ESTILOS DINÂMICOS (Modo Claro e Escuro) ──────────────────────────
// Agora exportamos a função que injeta as cores do tema em todas as telas
export const getGlobalStyles = (theme) => StyleSheet.create({

  // ═══════════════════════════════════════════════════════════════════
  // ESTRUTURAS GERAIS
  // ═══════════════════════════════════════════════════════════════════

  safeArea: {
    flex: 1,
    backgroundColor: theme.background,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 25,
    paddingTop: 40,
    backgroundColor: theme.background,
  },

  conteudo: {
    flex: 1,
    backgroundColor: theme.background,
  },

  conteudoContainer: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },

  // ═══════════════════════════════════════════════════════════════════
  // T01 — SPLASH
  // ═══════════════════════════════════════════════════════════════════

  containerSplash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.background,
  },

  imagem: {
    marginBottom: 30,
    width: 300,
    height: 200,
    resizeMode: 'contain',
  },

  texto2: {
    fontSize: 18,
    color: theme.primary,
    fontWeight: '700',
    marginHorizontal: 40,
    marginBottom: 20,
  },

  texto3: {
    fontSize: 15,
    color: theme.textPrimary,
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 30,
    textAlign: 'center',
  },

  texto_botao: {
    color: theme.buttonTextInverse,
    fontSize: 17,
    fontWeight: '700',
  },

  botao2: {
    backgroundColor: theme.inputBackground,
    width: '80%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.secondary,
  },

  texto_botao2: {
    color: theme.secondary,
    fontSize: 17,
    fontWeight: '700',
  },

  // ═══════════════════════════════════════════════════════════════════
  // T02 — LOGIN / T03 — CADASTRO / T04 — RECUPERAR SENHA
  // ═══════════════════════════════════════════════════════════════════

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: theme.primary,
  },

  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    color: theme.textSecondary,
    marginBottom: 15,
  },

  texto_bem_vindo: {
    color: theme.primary,
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center',
    marginTop: 40,
  },

  texto_acesso_conta: {
    color: theme.textMuted,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10,
    paddingBottom: 50,
  },

  // Inputs
  input: {
    backgroundColor: theme.inputBackground,
    borderWidth: 1.5,
    borderColor: theme.mode === 'dark' ? '#444444' : '#555555',
    borderRadius: 15,
    paddingHorizontal: 20,
    height: 55,
    width: '95%',
    alignSelf: 'center',
    marginTop: 15,
    color: theme.textPrimary,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.inputBackground,
    borderWidth: 1.5,
    borderColor: theme.mode === 'dark' ? '#444444' : '#555555',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 55,
    width: '95%',
    alignSelf: 'center',
    marginTop: 15,
  },

  // Botões de autenticação
  botao_entrar: {
    backgroundColor: theme.secondary,
    height: 55,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    width: '90%',
    alignSelf: 'center',
    elevation: 3,
  },

  texto_botao_entrar: {
    color: theme.buttonTextInverse,
    fontSize: 18,
    fontWeight: 'bold',
  },

  buttonPrimary: {
    backgroundColor: theme.secondary,
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: theme.buttonTextInverse,
    fontWeight: 'bold',
    fontSize: 18,
  },

  // Seletor de perfil (Doador / Receptor)
  tipoContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'center',
  },

  tipoBtn: {
    flex: 1,
    padding: 10,
    borderWidth: 1.5,
    borderColor: theme.textMuted,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: theme.inputBackground,
  },

  tipoSelecionado: {
    borderColor: theme.primary,
    backgroundColor: theme.mode === 'dark' ? 'rgba(76, 175, 80, 0.15)' : '#C8F7C5',
  },

  // ═══════════════════════════════════════════════════════════════════
  // HEADER PRINCIPAL (Home Doador e telas com header alto)
  // ═══════════════════════════════════════════════════════════════════

  header: {
    backgroundColor: theme.headerBackground,
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
    color: theme.headerTextInverse,
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
    color: theme.headerTextInverse,
  },

  // Botão voltar do header
  backBtn: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 18,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },

  backBtnTexto: {
    color: theme.headerTextInverse,
    fontSize: 18,
    fontWeight: '700',
  },

  headerTitulo: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.headerTextInverse,
  },

  // ═══════════════════════════════════════════════════════════════════
  // CARDS DE RESUMO DO HEADER (Home Doador)
  // ═══════════════════════════════════════════════════════════════════

  resumoContainer: {
    flexDirection: 'row',
    gap: 12,
  },

  resumoCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
  },

  resumoCardDestaque: {
    backgroundColor: theme.secondary,
  },

  resumoNumero: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.headerTextInverse,
  },

  resumoLabel: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 2,
  },

  resumoNumeroDestaque: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.headerTextInverse,
  },

  resumoLabelDestaque: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 2,
  },

  // ═══════════════════════════════════════════════════════════════════
  // CONTEÚDO HOME DOADOR
  // ═══════════════════════════════════════════════════════════════════

  conteudoHomeDoador: {
    flex: 1,
    backgroundColor: theme.background,
    marginTop: -1,
  },

  conteudoContainerHomeDoador: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
  },

  botaoNovaDoacao: {
    backgroundColor: theme.secondary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 28,
    elevation: 4,
  },

  botaoNovaDoacaoTexto: {
    fontSize: 17,
    fontWeight: '700',
    color: theme.buttonTextInverse,
    letterSpacing: 0.3,
  },

  secaoTitulo: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.textMuted,
    letterSpacing: 1.2,
    marginBottom: 12,
    textTransform: 'uppercase',
  },

  // ═══════════════════════════════════════════════════════════════════
  // CARDS DE SOLICITAÇÃO (Home Doador, Detalhes)
  // ═══════════════════════════════════════════════════════════════════

  cardSolicitacao: {
    backgroundColor: theme.cardBackground,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.secondary,
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
    color: theme.textPrimary,
    flex: 1,
    marginRight: 8,
  },

  descricaoSolicitacao: {
    fontSize: 13,
    color: theme.textSecondary,
    marginBottom: 14,
  },

  // Badges
  badgePendente: {
    backgroundColor: theme.badgeBg,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: theme.badgeBorder,
  },

  badgePendenteTexto: {
    fontSize: 11,
    fontWeight: '600',
    color: theme.badgeText,
  },

  badgeAtiva: {
    backgroundColor: theme.badgeAtivaBg,
    borderColor: theme.badgeAtivaBorder,
  },

  badgeAtivaTexto: {
    color: theme.badgeAtivaText,
  },

  // Botões do card
  botoesCard: {
    flexDirection: 'row',
    gap: 10,
  },

  botaoAceitar: {
    flex: 1,
    backgroundColor: theme.primary,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },

  botaoAceitarTexto: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.buttonTextInverse,
  },

  botaoRecusar: {
    flex: 1,
    backgroundColor: theme.background,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: theme.secondary,
  },

  botaoRecusarTexto: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.secondary,
  },

  // Empty state
  emptyState: {
    paddingVertical: 40,
    alignItems: 'center',
  },

  emptyStateTexto: {
    fontSize: 14,
    color: theme.textMuted,
    marginTop: 12,
    textAlign: 'center',
  },

  // ═══════════════════════════════════════════════════════════════════
  // BARRA DE NAVEGAÇÃO (Footer)
  // ═══════════════════════════════════════════════════════════════════

  navBar: {
    flexDirection: 'row',
    backgroundColor: theme.cardBackground,
    borderTopWidth: 1,
    borderTopColor: theme.mode === 'dark' ? '#333333' : 'rgba(0,0,0,0.08)',
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
    color: theme.textPrimary,
  },

  navIconeAtivo: {
    fontSize: 20,
    marginBottom: 2,
    color: theme.primary,
  },

  navLabel: {
    fontSize: 10,
    color: theme.textMuted,
    fontWeight: '500',
  },

  navLabelAtivo: {
    fontSize: 10,
    color: theme.primary,
    fontWeight: '700',
  },

  // ═══════════════════════════════════════════════════════════════════
  // AVATAR E PERFIL (ResumoPerfil, T11, T18, T20)
  // ═══════════════════════════════════════════════════════════════════

  avatarArea: {
    alignItems: 'center',
    marginBottom: 6,
  },

  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: theme.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  avatarEmoji: {
    fontSize: 30,
  },

  // ═══════════════════════════════════════════════════════════════════
  // INFO ROWS (T09, T14, T16, T18)
  // ═══════════════════════════════════════════════════════════════════

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.mode === 'dark' ? '#333333' : '#EEEEEE',
  },

  infoIcone: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: theme.mode === 'dark' ? 'rgba(76, 175, 80, 0.2)' : '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  infoIconeTexto: {
    fontSize: 16,
  },

  infoLabel: {
    fontSize: 11,
    color: theme.textMuted,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },

  infoValor: {
    fontSize: 14,
    color: theme.textPrimary,
    fontWeight: '500',
    marginTop: 2,
  },

  sobreRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },

  // ═══════════════════════════════════════════════════════════════════
  // CARD DE DOAÇÃO ATIVA (T09_InfoDoador)
  // ═══════════════════════════════════════════════════════════════════

  doacaoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  doacaoIconeBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: theme.mode === 'dark' ? 'rgba(76, 175, 80, 0.2)' : '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ═══════════════════════════════════════════════════════════════════
  // MENU ITENS (T11_PerfilDoador, T20_PerfilReceptor)
  // ═══════════════════════════════════════════════════════════════════

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 15,
    gap: 14,
  },

  menuItemBorda: {
    borderBottomWidth: 1,
    borderBottomColor: theme.mode === 'dark' ? '#333333' : '#EEEEEE',
  },

  menuText: {
    fontSize: 15,
    color: theme.textPrimary,
    fontWeight: '500',
  },

  // ═══════════════════════════════════════════════════════════════════
  // HEADER DE CADASTRO (T06_CadastrarDoacao)
  // ═══════════════════════════════════════════════════════════════════

  header_cadastro: {
    backgroundColor: theme.headerBackground,
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
    alignItems: 'flex-start',
    paddingTop: Platform.OS === 'android' ? 5 : 15,
  },

  tituloCadastro: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.headerTextInverse,
  },

  menuIconeAbsoluto: {
    position: 'absolute',
    right: 20,
    top: Platform.OS === 'android' ? 25 : 35,
    padding: 4,
  },

  // Formulário de cadastro
  conteudoFormulario: {
    paddingHorizontal: 25,
    paddingTop: 10,
    paddingBottom: 40,
  },

  labelCadastro: {
    fontSize: 16,
    color: theme.textPrimary,
    marginBottom: 8,
    marginTop: 15,
  },

  inputCadastro: {
    backgroundColor: theme.inputBackground,
    borderWidth: 1.5,
    borderColor: theme.secondary,
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 55,
    color: theme.textPrimary,
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
    backgroundColor: theme.inputBackground,
    borderWidth: 1.5,
    borderColor: theme.secondary,
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 55,
  },

  inputSemBorda: {
    flex: 1,
    color: theme.textPrimary,
    fontSize: 16,
  },

  inputFoto: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: theme.textMuted,
    borderStyle: 'dashed',
    borderRadius: 15,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  textoFoto: {
    color: theme.textSecondary,
    fontSize: 16,
  },

  // ═══════════════════════════════════════════════════════════════════
  // HOME RECEPTOR (T12)
  // ═══════════════════════════════════════════════════════════════════

  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  locationText: {
    fontSize: 22,
    fontWeight: '700',
    color: theme.headerTextInverse,
    marginLeft: 6,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.inputBackground,
    borderRadius: 24,
    paddingHorizontal: 16,
    height: 46,
    elevation: 2,
    shadowColor: theme.mode === 'dark' ? '#000000' : '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: theme.mode === 'dark' ? 0.3 : 0.1,
    shadowRadius: 3,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    color: theme.textPrimary,
  },

  filtersRow: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },

  filterBtn: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: theme.mode === 'dark' ? '#555555' : '#000000',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: theme.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },

  filterBtnActive: {
    backgroundColor: theme.primary,
    borderColor: theme.primary,
  },

  filterText: {
    color: theme.textPrimary,
    fontSize: 13,
  },

  filterTextActive: {
    color: theme.buttonTextInverse,
    fontSize: 13,
  },

  cardReceptor: {
    flexDirection: 'row',
    backgroundColor: theme.cardBackground,
    borderWidth: 1.2,
    borderColor: theme.mode === 'dark' ? '#444444' : '#000000',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    elevation: 2,
  },

  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: theme.mode === 'dark' ? '#333333' : '#EEEEEE',
  },

  cardContent: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.textPrimary,
    marginBottom: 2,
  },

  cardLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  cardDistanceText: {
    fontSize: 14,
    color: theme.secondary,
    fontWeight: '600',
    marginLeft: 4,
  },

  btnDetalhes: {
    backgroundColor: theme.secondary,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
  },

  btnDetalhesText: {
    color: theme.buttonTextInverse,
    fontSize: 14,
  },

  textoCard: {
    color: theme.textSecondary,
    fontSize: 13,
  },

  // ═══════════════════════════════════════════════════════════════════
  // T13 — FILTRAR DOAÇÕES
  // ═══════════════════════════════════════════════════════════════════

  container_icone_voltar_contato: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },

  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.primary,
  },

  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.textPrimary,
    marginTop: 10,
    marginBottom: 5,
  },

  label_input: {
    backgroundColor: theme.inputBackground,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    color: theme.textMuted,
  },

  linha: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    marginBottom: 10,
    backgroundColor: theme.cardBackground,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: theme.secondary,
  },

  tag: {
    backgroundColor: theme.background,
    padding: 6,
    borderRadius: 8,
    marginRight: 5,
    marginBottom: 5,
    color: theme.textPrimary,
  },

  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.primary,
  },

  disponivel: {
    color: theme.secondary,
    fontWeight: '600',
    marginBottom: 10,
  },

  botao: {
    backgroundColor: theme.secondary,
    width: '100%',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginTop: 10,
    elevation: 5,
    shadowColor: theme.mode === 'dark' ? '#000000' : '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: theme.mode === 'dark' ? 0.4 : 0.3,
  },

  // ═══════════════════════════════════════════════════════════════════
  // MAPA (T15) — Card selecionado
  // ═══════════════════════════════════════════════════════════════════

  cardSelecionado: {
    position: 'absolute',
    bottom: 12,
    left: 16,
    right: 16,
    backgroundColor: theme.cardBackground,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(218,74,2,0.3)',
    elevation: 8,
    shadowColor: theme.mode === 'dark' ? '#000000' : '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: theme.mode === 'dark' ? 0.4 : 0.15,
    shadowRadius: 10,
  },

  cardLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: theme.secondary,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 4,
  },

  cardNome: {
    fontSize: 22,
    fontWeight: '700',
    color: theme.textPrimary,
    marginBottom: 8,
    lineHeight: 26,
  },

  cardInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },

  cardInfoIcone: {
    fontSize: 13,
  },

  // ═══════════════════════════════════════════════════════════════════
  // T16 — CONFIRMAR SOLICITAÇÃO (inputs específicos)
  // ═══════════════════════════════════════════════════════════════════

  inputPequeno: {
    borderWidth: 2,
    borderColor: theme.secondary,
    borderRadius: 10,
    padding: 10,
    width: 80,
    textAlign: 'center',
    color: theme.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },

  inputGrande: {
    borderWidth: 2,
    borderColor: theme.secondary,
    borderRadius: 10,
    padding: 10,
    color: theme.textPrimary,
    fontSize: 14,
    minHeight: 80,
    lineHeight: 22,
  },

  // ═══════════════════════════════════════════════════════════════════
  // T17 — MEUS PEDIDOS / FILTROS
  // ═══════════════════════════════════════════════════════════════════

  filtrosContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: 25,
    marginBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: theme.background,
    borderBottomWidth: 1,
    borderBottomColor: theme.mode === 'dark' ? '#333333' : '#EEEEEE',
    paddingVertical: 12,
  },

  filtroBotao: {
    borderWidth: 1,
    borderColor: theme.mode === 'dark' ? '#555555' : '#000000',
    borderRadius: 20,
    paddingVertical: 7,
    paddingHorizontal: 16,
    backgroundColor: theme.cardBackground,
  },

  filtroBotaoAtivo: {
    backgroundColor: theme.primary,
    borderColor: theme.primary,
  },

  filtroTexto: {
    color: theme.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },

  filtroTextoAtivo: {
    color: theme.buttonTextInverse,
  },

  // ═══════════════════════════════════════════════════════════════════
  // T10 / T19 — HISTÓRICO (stats + cards)
  // ═══════════════════════════════════════════════════════════════════

  statsContainer: {
    flexDirection: 'row',
    backgroundColor: theme.background,
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.mode === 'dark' ? '#333333' : '#EEEEEE',
  },

  statBox: {
    flex: 1,
    backgroundColor: theme.mode === 'dark' ? '#252525' : '#F0F8F1',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.textPrimary,
  },

  statLabel: {
    fontSize: 12,
    color: theme.textMuted,
    marginTop: 2,
  },

  cardHistorico: {
    flexDirection: 'row',
    backgroundColor: theme.cardBackground,
    borderRadius: 16,
    marginBottom: 14,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: theme.mode === 'dark' ? '#000000' : '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: theme.mode === 'dark' ? 0.3 : 0.07,
    shadowRadius: 6,
  },

  cardContentHistorico: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
    padding: 12,
  },

  btnConcluido: {
    backgroundColor: theme.badgeAtivaBg,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
  },

  btnConcluidoText: {
    color: theme.badgeAtivaText,
    fontSize: 10,
    fontWeight: '700',
  },

  // ═══════════════════════════════════════════════════════════════════
  // UTILITÁRIOS GERAIS
  // ═══════════════════════════════════════════════════════════════════

  textoBotao: {
    color: theme.buttonTextInverse,
    fontWeight: 'bold',
  },

  unidades: {
    borderWidth: 2,
    borderColor: theme.secondary,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
  },

});