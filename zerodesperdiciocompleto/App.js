import 'react-native-gesture-handler'; // Sempre na linha 1
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importação das 5 Telas Criadas
import T01_Splash from './screens/common/T01_Splash';
import T02_Login from './screens/common/T02_Login';
import T03_Cadastro from './screens/common/T03_Cadastro';
import T04_RecuperarSenha from './screens/common/T04_RecuperarSenha';
import T05_HomeDoador from './screens/donor/T05_HomeDoador';
import T06_CadastrarDoacao from './screens/donor/T06_CadastrarDoacao';
import T07_MinhasDoacoes from './screens/donor/T07_MinhasDoacoes';
import T08_DetalheDoacaoDoador from './screens/donor/T08_DetalheDoacaoDoador';
import T09_InfoDoador from './screens/donor/T09_InfoDoador';
import T10_HistoricoDoador from './screens/donor/T10_HistoricoDoador';
import T11_PerfilDoador from './screens/donor/T11_PerfilDoador';
import T12_HomeReceptor from './screens/receiver/T12_HomeReceptor';
import T13_FiltrarDoacoes from './screens/receiver/T13_FiltrarDoacoes';
import T14_DetalheDoacaoReceptor from './screens/receiver/T14_DetalheDoacaoReceptor';
import T15_MapaDoacoes from './screens/receiver/T15_MapaDoacoes';
import T16_ConfirmarSolicitacao from './screens/receiver/T16_ConfirmarSolicitacao';
import T17_MeusPedidos from './screens/receiver/T17_MeusPedidos';
import T18_InfoReceptor from './screens/receiver/T18_InfoReceptor';
import T19_HistoricoReceptor from './screens/receiver/T19_HistoricoReceptor';
import T20_PerfilReceptor from './screens/receiver/T20_PerfilReceptor';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Inicio" 
        screenOptions={{ headerShown: false }}
      >
        {/* Fluxo de Autenticação */}
        <Stack.Screen name="Inicio" component={T01_Splash} />
        <Stack.Screen name="Login" component={T02_Login} />
        <Stack.Screen name="Cadastro" component={T03_Cadastro} />
        <Stack.Screen name="RecuperarSenha" component={T04_RecuperarSenha} />
        
        {/* Fluxo do Doador */}
        <Stack.Screen name="HomeDoador" component={T05_HomeDoador} />
        <Stack.Screen name="CadastrarDoacao" component={T06_CadastrarDoacao} />        
        <Stack.Screen name="MinhasDoacoes" component={T07_MinhasDoacoes} />
        <Stack.Screen name="DetalheDoacaoDoador" component={T08_DetalheDoacaoDoador} />
        <Stack.Screen name="InfoDoador" component={T09_InfoDoador} />
        <Stack.Screen name="HistoricoDoador" component={T10_HistoricoDoador} />
        <Stack.Screen name="PerfilDoador" component={T11_PerfilDoador} />
        
        {/* Fluxo do Receptor */}
        <Stack.Screen name="HomeReceptor" component={T12_HomeReceptor} />
        <Stack.Screen name="FiltrarDoacoes" component={T13_FiltrarDoacoes} />
        <Stack.Screen name="DetalheDoacaoReceptor" component={T14_DetalheDoacaoReceptor} />
        <Stack.Screen name="MapaDoacoes" component={T15_MapaDoacoes} />
        <Stack.Screen name="ConfirmarSolicitacao" component={T16_ConfirmarSolicitacao} />
        <Stack.Screen name="MeusPedidos" component={T17_MeusPedidos} />
        <Stack.Screen name="InfoReceptor" component={T18_InfoReceptor} />
        <Stack.Screen name="HistoricoReceptor" component={T19_HistoricoReceptor} />
        <Stack.Screen name="PerfilReceptor" component={T20_PerfilReceptor} />

        
      </Stack.Navigator>
    </NavigationContainer>
  );
}