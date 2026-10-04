import React from 'react';

export function Badge({ children, variant = 'default', size = 'sm', className = '' }) {
  const baseClasses = 'inline-flex items-center font-medium rounded-full';
  
  const sizeClasses = {
    xs: 'px-2 py-0.5 text-xs',
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  };

  const variantClasses = {
    default: 'bg-slate-100 text-slate-700 border border-slate-200',
    primary: 'bg-teal-50 text-teal-700 border border-teal-200',
    ai: 'bg-gradient-to-r from-teal-500/10 via-indigo-500/10 to-blue-500/10 text-teal-800 border border-teal-300 shadow-sm',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border border-rose-200',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    neutral: 'bg-slate-800 text-slate-100',
  };

  return (
    <span className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}

export function Card({ children, className = '', hover = false, highlighted = false, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-2xl border transition-all duration-200
        ${highlighted ? 'border-teal-400 ring-2 ring-teal-500/10 shadow-md' : 'border-slate-200/90 shadow-sm'}
        ${hover ? 'hover:border-slate-300 hover:shadow-md cursor-pointer' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  className = '',
  onClick,
  icon: Icon,
  ...props
}) {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-150 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none';

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-5 py-3 text-base gap-2.5',
  };

  const variantClasses = {
    primary: 'bg-teal-600 hover:bg-teal-700 text-white shadow-sm hover:shadow shadow-teal-700/20',
    secondary: 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-xs',
    dark: 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-600',
    danger: 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200',
    subtle: 'bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200',
  };

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      {children}
    </button>
  );
}
