import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const VERDE = '#006B14';
const BRANCO = '#FFFFFF';

export default function ResumoPerfil({ emoji, nome, subtitulo, stats, compacto }) {
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

const s = StyleSheet.create({
  avatarSection: {
    backgroundColor: VERDE,
    alignItems: 'center',
    paddingBottom: 28,
    paddingHorizontal: 20,
  },
  avatarSectionCompacto: {
    paddingBottom: 16, // Menos espaço sobrando na versão compacta
  },
  
  avatarCirculo: {
    width: 84, height: 84, borderRadius: 42,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 3, borderColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 12,
  },
  avatarCirculoCompacto: {
    width: 60, height: 60, borderRadius: 30, // Foto menor
    marginBottom: 8,
  },
  
  avatarEmoji: { fontSize: 36 },
  avatarEmojiCompacto: { fontSize: 28 }, // Emoji menor
  
  nomeTexto: { fontSize: 22, fontWeight: '800', color: BRANCO, marginBottom: 4, textAlign: 'center' },
  nomeTextoCompacto: { fontSize: 18 }, // Nome menor
  
  subTexto: { fontSize: 13, color: 'rgba(255,255,255,0.75)', marginBottom: 20, textAlign: 'center' },
  subTextoCompacto: { marginBottom: 14, fontSize: 12 },

  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
  },
  statItem: { flex: 1, alignItems: 'center' },
  statNum: { fontSize: 18, fontWeight: '800', color: BRANCO },
  statLabel: { fontSize: 11, color: 'rgba(255,255,255,0.75)', marginTop: 2 },
  statDivisor: { width: 1, height: 36, backgroundColor: 'rgba(255,255,255,0.25)' },
});