import React from 'react';
import { Text } from './Text';

export function Display({ 
  size = 1,
  color = 'text',
  align,
  children,
  ...props 
}) {
  return (
    <Text
      variant={`display${size}`}
      color={color}
      align={align}
      {...props}
    >
      {children}
    </Text>
  );
}