export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function readTime(text) {
  const wordsPerMinute = 160;
  const words = text.trim().split(/\s+/).length;
  const minutes = words / wordsPerMinute;
  const readTime = Math.ceil(minutes);

  return `${readTime} min read`;
}