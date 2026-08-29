import React from 'react';
import {
  Server,
  Bot,
  Palette,
  Smartphone,
  Globe,
  Globe2,
  ShieldAlert,
  Crown,
  Zap,
  Briefcase,
  Layers,
  Sparkles,
  ShoppingBag,
  CreditCard,
  Settings,
  HelpCircle,
  LucideIcon
} from 'lucide-react';

interface DynamicIconProps {
  name: string;
  className?: string;
  size?: number;
}

const iconMap: Record<string, LucideIcon> = {
  Server,
  Bot,
  Palette,
  Smartphone,
  Globe,
  Globe2,
  ShieldAlert,
  Crown,
  Zap,
  Briefcase,
  Layers,
  Sparkles,
  ShoppingBag,
  CreditCard,
  Settings,
  HelpCircle,
};

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name, className = 'w-5 h-5', size }) => {
  const IconComponent = iconMap[name] || Server;
  return <IconComponent className={className} size={size} />;
};
