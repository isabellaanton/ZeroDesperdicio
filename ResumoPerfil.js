import React from 'react';
import { View, Text } from 'react-native';

// Importando o hook do tema global
import { getGlobalStyles } from './Styles';
import { useTheme } from './ThemeContext';

// ATENÇÃO: Removemos o "StyleSheet.create" daqui para o ESLint parar de dar falso positivo!
const getStyles = (theme) => ({
  avatarSection: {
    backgroundColor: theme.headerBackground,
    alignItems: 'center',
    paddingBottom: 28,
    paddingHorizontal: 20,
  },
  avatarSectionCompacto: {
    paddingBottom: 16, 
  },
  avatarCirculo: {
    width: 84, 
    height: 84, 
    borderRadius: 42,
    backgroundColor: theme.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.2)',
    borderWidth: 3, 
    borderColor: theme.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.5)',
    alignItems: 'center', 
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarCirculoCompacto: {
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    marginBottom: 8,
  },
  avatarEmoji: { 
    fontSize: 36 
  },
  avatarEmojiCompacto: { 
    fontSize: 28 
  }, 
  nomeTexto: { 
    fontSize: 22, 
    fontWeight: '800', 
    color: theme.headerTextInverse,
    marginBottom: 4, 
    textAlign: 'center' 
  },
  nomeTextoCompacto: { 
    fontSize: 18 
  },
  subTexto: { 
    fontSize: 13, 
    color: theme.mode === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.75)', 
    marginBottom: 20, 
    textAlign: 'center' 
  },
  subTextoCompacto: { 
    marginBottom: 14, 
    fontSize: 12 
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: theme.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
  },
  statItem: { 
    flex: 1, 
    alignItems: 'center' 
  },
  statNum: { 
    fontSize: 18, 
    fontWeight: '800', 
    color: theme.headerTextInverse 
  },
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

export default function ResumoPerfil({ emoji, nome, subtitulo, stats, compacto }) {
  const { theme } = useTheme();
  const s = getStyles(theme);

  return (
    <View style={[s.avatarSection, compacto && s.avatarSectionCompacto]}>
      <View style={[s.avatarCirculo, compacto && s.avatarCirculoCompacto]}>
        <Text style={[s.avatarEmoji, compacto && s.avatarEmojiCompacto]}>{emoji}</Text>
      </View>
      <Text style={[s.nomeTexto, compacto && s.nomeTextoCompacto]}>{nome}</Text>
      <Text style={[s.subTexto, compacto && s.subTextoCompacto]}>{subtitulo}</Text>

      {/* Exibe os status apenas se a lista foi enviada */}
      {stats && stats.length >= 3 && (
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
      )}
    </View>
  );
}