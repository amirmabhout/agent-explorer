export interface Shop {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: number;
  label: string;
  type: 'yield' | 'otc' | 'bridge' | 'swap' | 'lending';
  speechBubble?: string;
}

export interface GameEvents {
  scrollLeft: () => void;
  scrollRight: () => void;
}
