'use client';

import type { ComponentProps } from 'react';
import { Button as ShadcnButton } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

type ShadcnButtonProps = ComponentProps<typeof ShadcnButton>;
type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

type ButtonProps = Omit<ShadcnButtonProps, 'variant' | 'size'> & {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
};

const variantConfig: Record<
  Variant,
  { shadcnVariant: ShadcnButtonProps['variant']; className: string }
> = {
  primary: {
    shadcnVariant: 'default',
    className:
      'bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold shadow-[0_0_20px_rgba(139,92,246,0.35)] hover:shadow-[0_0_28px_rgba(139,92,246,0.55)] hover:brightness-110 border-transparent disabled:shadow-none disabled:brightness-100',
  },
  secondary: {
    shadcnVariant: 'outline',
    className: '',
  },
  ghost: {
    shadcnVariant: 'ghost',
    className: 'text-muted-foreground',
  },
  danger: {
    shadcnVariant: 'destructive',
    className:
      'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:brightness-110 border-transparent',
  },
};

const sizeMap: Record<Size, ShadcnButtonProps['size']> = {
  sm: 'sm',
  md: 'default',
  lg: 'lg',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className,
  children,
  ...rest
}: ButtonProps) {
  const { shadcnVariant, className: variantClass } = variantConfig[variant];
  return (
    <ShadcnButton
      variant={shadcnVariant}
      size={sizeMap[size]}
      disabled={disabled || loading}
      className={cn(variantClass, className)}
      {...rest}
    >
      {loading && <Loader2 className="size-4 animate-spin" />}
      {children}
    </ShadcnButton>
  );
}
