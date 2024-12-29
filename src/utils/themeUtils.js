// Utility functions for theme manipulation and color operations
export function adjustColor(color, amount) {
  return color
    .replace(/^#/, '')
    .replace(/../g, color => 
      ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount))
        .toString(16))
        .substr(-2)
    );
}

export function getContrastText(backgroundColor) {
  // Convert hex to RGB
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

export function createElevation(elevation) {
  return {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: elevation,
    },
    shadowOpacity: 0.25,
    shadowRadius: elevation * 2,
    elevation,
  };
}