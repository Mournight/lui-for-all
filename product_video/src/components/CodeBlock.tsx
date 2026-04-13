import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

/* 代码展示块，带打字机效果 */
export const CodeBlock: React.FC<{
  code: string;
  language?: string;
  style?: React.CSSProperties;
  typewriter?: boolean;
  typewriterSpeed?: number;
}> = ({ code, language = '', style, typewriter = false, typewriterSpeed = 2 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const displayCode = typewriter
    ? code.slice(0, Math.floor(frame * typewriterSpeed))
    : code;

  const opacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div style={{
      background: '#0f0f0f',
      color: '#e5e5e5',
      padding: '20px 24px',
      fontFamily: 'var(--font-mono)',
      fontSize: 22,
      lineHeight: 1.6,
      border: '1px solid #3f3f3f',
      opacity,
      position: 'relative',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-all',
      ...style,
    }}>
      {language && (
        <div style={{
          position: 'absolute',
          top: 8,
          right: 12,
          fontSize: 14,
          color: '#737373',
          fontFamily: 'var(--font-mono)',
        }}>
          {language}
        </div>
      )}
      {displayCode}
      {typewriter && frame * typewriterSpeed < code.length && (
        <span style={{ borderRight: '2px solid #00d2ff', marginLeft: 2 }}>​</span>
      )}
    </div>
  );
};
