export function formatNumber(n: number): string {
  if (n >= 10000) {
    const wan = n / 10000;
    return wan % 1 === 0 ? `${wan}万` : `${wan.toFixed(1)}万`;
  }
  if (n >= 1000) {
    return n.toLocaleString('zh-CN');
  }
  return String(n);
}

export function formatKcal(n: number): string {
  return `${Math.round(n)}千卡`;
}

export function formatSteps(n: number): string {
  return n.toLocaleString('zh-CN');
}

export function formatMinutes(n: number): string {
  return `${n}min`;
}

export function formatWeight(kg: number): string {
  return `${kg.toFixed(1)}kg`;
}

export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}月${d.getDate()}日`;
}

export function intensityLabel(intensity: 'low' | 'medium' | 'high'): string {
  const map: Record<string, string> = { low: '低', medium: '中等', high: '高' };
  return map[intensity];
}

export function difficultyLabel(d: 'beginner' | 'intermediate' | 'advanced'): string {
  const map: Record<string, string> = { beginner: '初级', intermediate: '中级', advanced: '高级' };
  return map[d];
}
