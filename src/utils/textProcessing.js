export function cleanText(text) {
  return text
    .replace(/[^\w\s.$]/g, '') // Remove special characters except dots and $
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
}

export function groupLines(lines) {
  // Sort lines by vertical position
  const sortedLines = lines.sort((a, b) => {
    const aY = averageY(a.bounds);
    const bY = averageY(b.bounds);
    return aY - bY;
  });

  // Group lines that are close together
  const groups = [];
  let currentGroup = [];
  let lastY = null;

  for (const line of sortedLines) {
    const currentY = averageY(line.bounds);
    
    if (lastY === null || currentY - lastY < 20) {
      currentGroup.push(line);
    } else {
      if (currentGroup.length > 0) {
        groups.push(mergeGroup(currentGroup));
      }
      currentGroup = [line];
    }
    
    lastY = currentY;
  }

  if (currentGroup.length > 0) {
    groups.push(mergeGroup(currentGroup));
  }

  return groups;
}

function averageY(vertices) {
  return vertices.reduce((sum, v) => sum + v.y, 0) / vertices.length;
}

function mergeGroup(lines) {
  // Merge lines in the same group
  const text = lines
    .sort((a, b) => averageX(a.bounds) - averageX(b.bounds))
    .map(line => line.text)
    .join(' ');

  const bounds = {
    top: Math.min(...lines.flatMap(l => l.bounds.map(v => v.y))),
    bottom: Math.max(...lines.flatMap(l => l.bounds.map(v => v.y))),
    left: Math.min(...lines.flatMap(l => l.bounds.map(v => v.x))),
    right: Math.max(...lines.flatMap(l => l.bounds.map(v => v.x))),
  };

  return { text, bounds };
}

function averageX(vertices) {
  return vertices.reduce((sum, v) => sum + v.x, 0) / vertices.length;
}