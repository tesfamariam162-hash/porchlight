import {
  Camera,
  Car,
  Refrigerator,
  Shield,
  Shirt,
  Wifi,
  Wind,
  Zap,
  type LucideIcon,
} from 'lucide-react';

const MAP: Record<string, LucideIcon> = {
  car: Car,
  wifi: Wifi,
  zap: Zap,
  shield: Shield,
  camera: Camera,
  shirt: Shirt,
  refrigerator: Refrigerator,
  wind: Wind,
};

export function getAmenityIcon(slugOrIcon: string | null | undefined): LucideIcon {
  if (!slugOrIcon) return Shield;
  const key = slugOrIcon.toLowerCase();
  return MAP[key] ?? MAP[key.replace(/-/g, '')] ?? Shield;
}
