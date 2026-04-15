import { StyleSheet } from 'react-native';
const VERDE_ESCURO = '#006B14';
const LARANJA = '#DA4A02';
const FUNDO = '#FFDDAE';
const BEGE_CARD = '#FFD2AE';
const TEXTO_ESCURO = '#1A1A1A';
const TEXTO_MEDIO = '#555555';
const TEXTO_CLARO = '#888888';
const BRANCO = '#FFFFFF';
const PRETO = '#000000';
const styles = StyleSheet.create({
container: {
 flex: 1,
 justifyContent: 'center',
 paddingHorizontal: 25,
 backgroundColor: FUNDO,
 },
 texto_bem_vindo: {
  color: VERDE_ESCURO,
  fontWeight: 'bold',
  fontSize: 24,
  textAlign: 'center',
  marginTop: 40,
},
texto_acesso_conta: {
  color: TEXTO_CLARO,
  fontSize: 15,
  textAlign: 'center',
  marginTop: 10,
  fontWeight: '400',
  paddingBottom: 50,
},
input: {
  backgroundColor: BEGE_CARD,
  borderWidth: 1.5,
  borderColor: TEXTO_MEDIO,
  borderRadius: 15,
  paddingHorizontal: 20,
  height: 55,
  width: '90%',
  alignContent: 'center',
  alignSelf: 'center',
  marginTop: 15,
},
esqueci_senha: {
  color: VERDE_ESCURO,
  fontSize: 14,
  textAlign: 'right',
  marginTop: 10,
  textDecorationLine: 'underline',
  width: '95%',
},
botao_entrar: {
  backgroundColor: LARANJA,
  height: 55,
  borderRadius: 15,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 25,
  width: '90%',
  alignSelf: 'center',
  shadowColor: PRETO,
  shadowOpacity: 0.2,
  shadowRadius: 5,
  shadowOffset: { width: 0, height: 2 },
},
texto_botao_entrar: {
  color: BRANCO,
  fontSize: 18,
  fontWeight: 'bold',

},
linha_ou_container: {
  flexDirection: 'row',
  alignItems: 'center',
  marginVertical: 20,
},

linha: {
  flex: 1,
  height: 1,
  backgroundColor: TEXTO_CLARO,
},

texto_ou: {
  marginHorizontal: 10,
  color: TEXTO_CLARO,
  fontSize: 14,
},

botao_google: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: BRANCO,
  height: 55,
  width: '90%',
  alignSelf: 'center',
  borderRadius: 15,
  marginTop: 15,
  elevation: 3,
  shadowColor: PRETO,
  shadowOpacity: 0.1,
  shadowRadius: 5,
  shadowOffset: { width: 0, height: 2 },
  borderColor: LARANJA,
  borderWidth: 1.5,
},

texto_google: {
  marginLeft: 10,
  fontSize: 16,
  color: TEXTO_MEDIO,
},

container_cadastro: {
  flexDirection: 'row',
  justifyContent: 'center',
  marginTop: 20,
},

texto_normal: {
  color: TEXTO_CLARO,
  fontSize: 14,
},

texto_cadastro: {
  color: VERDE_ESCURO,
  fontSize: 14,
  fontWeight: 'bold',
  marginLeft: 5,
  textDecorationLine: 'underline',
}


});
export default styles;