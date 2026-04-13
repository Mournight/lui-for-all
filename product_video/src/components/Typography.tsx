import React from 'react';

export const Title: React.FC<{ children: React.ReactNode; style?: React.CSSProperties; className?: string }> = ({ children, style, className = "" }) => (
  <h1 className={`title-font ${className}`} style={{ fontSize: 80, fontWeight: 700, margin: 0, lineHeight: 1.1, ...style }}>
    {children}
  </h1>
);

export const SubTitle: React.FC<{ children: React.ReactNode; style?: React.CSSProperties; className?: string }> = ({ children, style, className = "" }) => (
  <h2 className={`title-font ${className}`} style={{ fontSize: 50, fontWeight: 500, color: '#737373', margin: 0, lineHeight: 1.2, ...style }}>
    {children}
  </h2>
);

export const Text: React.FC<{ children: React.ReactNode; style?: React.CSSProperties; className?: string }> = ({ children, style, className = "" }) => (
  <p className={className} style={{ fontSize: 36, margin: 0, lineHeight: 1.4, ...style }}>
    {children}
  </p>
);

export const MonoText: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <span className="mono-font" style={{ padding: '4px 8px', background: '#f4f4f4', borderRadius: 0, border: '1px solid #e5e5e5', fontSize: 28, ...style }}>
    {children}
  </span>
);

export const CaptionText: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <p style={{ fontSize: 24, margin: 0, color: '#737373', lineHeight: 1.4, ...style }}>
    {children}
  </p>
);
