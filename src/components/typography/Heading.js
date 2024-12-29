import React from 'react';
import { Text } from './Text';

export function Heading({ 
  level = 1,
  color = 'text',
  align,
  children,
  ...props 
}) {
  return (
    <Text
      variant={`h${level}`}
      color={color}
      align={align}
      {...props}
    >
      {children}
    </Text>
  );
}