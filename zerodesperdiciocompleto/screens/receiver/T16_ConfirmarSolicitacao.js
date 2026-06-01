import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getGlobalStyles } from '../../Styles';
import { useTheme } from '../../ThemeContext';

export default function T16_ConfirmarSolicitacao({ navigation, route }) {
  const { theme } = useTheme();
  const styles = getGlobalStyles(theme);
  
  const [quantidade, setQuantidade] = useState('1');
  const [observacao, setObservacao] = useState('');
  const [enviando, setEnviando] = useState(false);

  const incrementar = () => setQuantidade((q) => String(Math.min(99, Number(q) + 1)));
  const decrementar = () => setQuantidade((q) => String(Math.max(1, Number(q) - 1)));

  const handleSolicitar = () => {
    setEnviando(true);
    setTimeout(() => {
      setEnviando(false);
      Alert.alert('✅ Sucesso!', 'Sua solicitação foi enviada ao doador.');
      navigation.navigate('MeusPedidos');
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={theme.headerBackground} />
      
      <View style={[styles.header, { height: 70, justifyContent: 'center' }]}>
        <View style={[styles.headerTop, { justifyContent: 'space-between', width: '100%', paddingHorizontal: 10 }]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={26} color={theme.headerTextInverse} />
          </TouchableOpacity>
          <Text style={[styles.headerTitulo, { fontSize: 22 }]}>Confirmar Pedido</Text>
          <View style={{ width: 26 }} />
        </View>
      </View>

      <ScrollView style={styles.conteudo} contentContainerStyle={styles.scrollContent}>
        <View style={styles.cardSolicitacao}>
          <Text style={[styles.infoLabel, { marginBottom: 10 }]}>Quantas unidades você precisa?</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
            <TouchableOpacity onPress={decrementar} style={[styles.infoIcone, { backgroundColor: theme.mode === 'dark' ? '#333' : '#EEE' }]}><Text style={{fontSize:20, color: theme.textPrimary}}>-</Text></TouchableOpacity>
            <TextInput style={[styles.inputPequeno, { borderColor: theme.secondary, color: theme.textPrimary }]} value={quantidade} onChangeText={setQuantidade} keyboardType="numeric" maxLength={2} />
            <TouchableOpacity onPress={incrementar} style={[styles.infoIcone, { backgroundColor: theme.mode === 'dark' ? '#333' : '#EEE' }]}><Text style={{fontSize:20, color: theme.textPrimary}}>+</Text></TouchableOpacity>
          </View>
        </View>

        <View style={styles.cardSolicitacao}>
          <Text style={[styles.infoLabel, { marginBottom: 10 }]}>Observação (Opcional)</Text>
          <TextInput
            style={[styles.inputGrande, { borderColor: theme.secondary, color: theme.textPrimary }]}
            placeholder="Ex: Chego em 10 minutos..."
            placeholderTextColor={theme.textMuted}
            multiline
            numberOfLines={3}
            value={observacao}
            onChangeText={setObservacao}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity
          style={[styles.botaoAceitar, { backgroundColor: theme.secondary, paddingVertical: 16, borderRadius: 14, opacity: enviando ? 0.6 : 1 }]}
          onPress={handleSolicitar}
          disabled={enviando}
        >
          <Text style={styles.botaoAceitarTexto}>{enviando ? 'Enviando...' : 'Confirmar Solicitação'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}