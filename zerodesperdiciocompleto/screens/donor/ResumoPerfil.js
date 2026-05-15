import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// 1. Importando o hook do tema global
import { useTheme } from '../../ThemeContext';

export default function ResumoPerfil({ emoji, nome, subtitulo, stats, compacto }) {
  // 2. Consumindo o tema atual
  const { theme } = useTheme();
  // 3. Injetando o tema para gerar os estilos dinâmicos locais
  const s = getStyles(theme);

  return (
    <View style={[s.avatarSection, compacto && s.avatarSectionCompacto]}>
      <View style={[s.avatarCirculo, compacto && s.avatarCirculoCompacto]}>
        <Text style={[s.avatarEmoji, compacto && s.avatarEmojiCompacto]}>{emoji}</Text>
      </View>
      <Text style={[s.nomeTexto, compacto && s.nomeTextoCompacto]}>{nome}</Text>
      <Text style={[s.subTexto, compacto && s.subTextoCompacto]}>{subtitulo}</Text>

      <View style={s.statsRow}>
        <View style={s.statItem}>
          <Text style={s.statNum}>{stats[0].valor}</Text>
          <Text style={s.statLabel}>{stats[0].label}</Text>
        </View>
        <View style={s.statDivisor} />
        <View style={s.statItem}>
          <Text style={s.statNum}>{stats[1].valor}</Text>
          <Text style={s.statLabel}>{stats[1].label}</Text>
        </View>
        <View style={s.statDivisor} />
        <View style={s.statItem}>
          <Text style={s.statNum}>{stats[2].valor}</Text>
          <Text style={s.statLabel}>{stats[2].label}</Text>
        </View>
      </View>
    </View>
  );
}

// 4. Transformando o StyleSheet estático numa função dinâmica
const getStyles = (theme) => StyleSheet.create({
  avatarSection: {
    backgroundColor: theme.headerBackground, // Substitui o VERDE isolado
    alignItems: 'center',
    paddingBottom: 28,
    paddingHorizontal: 20,
  },
  avatarSectionCompacto: {
    paddingBottom: 16, 
  },
  
  avatarCirculo: {
    width: 84, height: 84, borderRadius: 42,
    // Ajuste de transparência para não ficar tão claro no Dark Mode
    backgroundColor: theme.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.2)',
    borderWidth: 3, 
    borderColor: theme.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.5)',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 12,
  },
  avatarCirculoCompacto: {
    width: 60, height: 60, borderRadius: 30, 
    marginBottom: 8,
  },
  
  avatarEmoji: { fontSize: 36 },
  avatarEmojiCompacto: { fontSize: 28 }, 
  
  nomeTexto: { 
    fontSize: 22, 
    fontWeight: '800', 
    color: theme.headerTextInverse, // Substitui o BRANCO isolado
    marginBottom: 4, 
    textAlign: 'center' 
  },
  nomeTextoCompacto: { fontSize: 18 },
  
  subTexto: { 
    fontSize: 13, 
    color: theme.mode === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.75)', 
    marginBottom: 20, 
    textAlign: 'center' 
  },
  subTextoCompacto: { marginBottom: 14, fontSize: 12 },

  statsRow: {
    flexDirection: 'row',
    backgroundColor: theme.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
  },
  statItem: { flex: 1, alignItems: 'center' },
  statNum: { fontSize: 18, fontWeight: '800', color: theme.headerTextInverse },
  statLabel: { 
    fontSize: 11, 
    color: theme.mode === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.75)', 
    marginTop: 2 
  },
  statDivisor: { 
    width: 1, 
    height: 36, 
    backgroundColor: theme.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.25)' 
  },
});