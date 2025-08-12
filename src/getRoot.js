export function getRootRelativePath(filename = 'footer.html') {
  const depth = window.location.pathname.split('/').filter(Boolean).length;
  const prefix = depth > 1 ? '../'.repeat(depth - 1) : '';
   console.log(prefix + filename)
  return prefix + filename;
}