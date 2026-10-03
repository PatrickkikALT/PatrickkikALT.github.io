const ALIASES = {
  'c#': 'csharp',
  cs: 'csharp',
  csharp: 'csharp',
  'c++': 'cpp',
  cpp: 'cpp',
  cc: 'cpp',
  cxx: 'cpp',
  c: 'c',
  hlsl: 'hlsl',
  shader: 'hlsl',
  js: 'javascript',
  javascript: 'javascript',
  jsx: 'javascript',
  node: 'javascript',
  'node.js': 'javascript',
  py: 'python',
  python: 'python',
  json: 'json',
  text: 'text',
  plaintext: 'text',
  txt: 'text',
};

const LABELS = {
  csharp: 'C#',
  cpp: 'C++',
  c: 'C',
  hlsl: 'HLSL',
  javascript: 'JavaScript',
  python: 'Python',
  json: 'JSON',
  text: 'Text',
};

const KEYWORDS = {
  csharp: ['abstract', 'as', 'async', 'await', 'base', 'bool', 'break', 'byte', 'case', 'catch', 'char', 'checked', 'class', 'const', 'continue', 'decimal', 'default', 'delegate', 'do', 'double', 'else', 'enum', 'event', 'explicit', 'extern', 'false', 'finally', 'fixed', 'float', 'for', 'foreach', 'get', 'goto', 'if', 'implicit', 'in', 'init', 'int', 'interface', 'internal', 'is', 'lock', 'long', 'namespace', 'new', 'null', 'object', 'operator', 'out', 'override', 'params', 'partial', 'private', 'protected', 'public', 'readonly', 'record', 'ref', 'return', 'sbyte', 'sealed', 'set', 'short', 'sizeof', 'stackalloc', 'static', 'string', 'struct', 'switch', 'this', 'throw', 'true', 'try', 'typeof', 'uint', 'ulong', 'unchecked', 'unsafe', 'ushort', 'using', 'var', 'virtual', 'void', 'volatile', 'while', 'yield'],
  cpp: ['alignas', 'alignof', 'and', 'auto', 'bool', 'break', 'case', 'catch', 'char', 'class', 'const', 'constexpr', 'continue', 'default', 'delete', 'do', 'double', 'else', 'enum', 'explicit', 'export', 'extern', 'false', 'float', 'for', 'friend', 'goto', 'if', 'inline', 'int', 'long', 'mutable', 'namespace', 'new', 'noexcept', 'nullptr', 'operator', 'private', 'protected', 'public', 'register', 'return', 'short', 'signed', 'sizeof', 'static', 'struct', 'switch', 'template', 'this', 'throw', 'true', 'try', 'typedef', 'typename', 'union', 'unsigned', 'using', 'virtual', 'void', 'volatile', 'while'],
  c: ['auto', 'break', 'case', 'char', 'const', 'continue', 'default', 'do', 'double', 'else', 'enum', 'extern', 'float', 'for', 'goto', 'if', 'inline', 'int', 'long', 'register', 'return', 'short', 'signed', 'sizeof', 'static', 'struct', 'switch', 'typedef', 'union', 'unsigned', 'void', 'volatile', 'while'],
  hlsl: ['bool', 'break', 'cbuffer', 'column_major', 'const', 'continue', 'discard', 'do', 'dot', 'else', 'extern', 'false', 'float', 'float2', 'float3', 'float4', 'for', 'half', 'if', 'in', 'inline', 'inout', 'int', 'length', 'lerp', 'matrix', 'max', 'min', 'mul', 'normalize', 'out', 'pow', 'precise', 'reflect', 'return', 'row_major', 'sampler', 'saturate', 'static', 'struct', 'switch', 'texture', 'true', 'uint', 'uniform', 'vector', 'void', 'volatile', 'while'],
  javascript: ['async', 'await', 'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do', 'else', 'export', 'extends', 'false', 'finally', 'for', 'from', 'function', 'if', 'import', 'in', 'instanceof', 'let', 'new', 'null', 'of', 'return', 'static', 'super', 'switch', 'this', 'throw', 'true', 'try', 'typeof', 'undefined', 'var', 'void', 'while', 'yield'],
  python: ['and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'False', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'None', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'True', 'try', 'while', 'with', 'yield'],
  json: ['true', 'false', 'null'],
};

export function normalizeLanguage(language) {
  const key = String(language || '').trim().toLowerCase();
  return ALIASES[key] || key || 'text';
}

export function languageLabel(language) {
  const normalized = normalizeLanguage(language);
  return LABELS[normalized] || String(language || 'Text');
}

function pushToken(tokens, type, value) {
  if (!value) return;
  const last = tokens[tokens.length - 1];
  if (last && last.type === type) last.value += value;
  else tokens.push({ type, value });
}

function readQuoted(text, start, quote, verbatim) {
  let index = start + 1;
  while (index < text.length) {
    if (!verbatim && text[index] === '\\') {
      index += 2;
      continue;
    }
    if (verbatim && text[index] === '"' && text[index + 1] === '"') {
      index += 2;
      continue;
    }
    if (text[index] === quote) return index + 1;
    if (text[index] === '\n' && quote !== '`' && !verbatim) break;
    index += 1;
  }
  return index;
}

export function highlightCode(source, language) {
  const lang = normalizeLanguage(language);
  const keywords = new Set(KEYWORDS[lang] ?? []);
  const hashComments = lang === 'python';
  const slashComments = lang !== 'python' && lang !== 'json';
  const blockComments = lang !== 'python' && lang !== 'json';
  const preprocessor = lang === 'c' || lang === 'cpp' || lang === 'hlsl';
  const text = String(source).replace(/\r\n/g, '\n');
  const tokens = [];
  let index = 0;

  while (index < text.length) {
    const current = text[index];
    const next = text[index + 1];

    if (slashComments && current === '/' && next === '/') {
      const end = text.indexOf('\n', index);
      const stop = end === -1 ? text.length : end;
      pushToken(tokens, 'comment', text.slice(index, stop));
      index = stop;
      continue;
    }

    if (blockComments && current === '/' && next === '*') {
      const end = text.indexOf('*/', index + 2);
      const stop = end === -1 ? text.length : end + 2;
      pushToken(tokens, 'comment', text.slice(index, stop));
      index = stop;
      continue;
    }

    if (hashComments && current === '#') {
      const end = text.indexOf('\n', index);
      const stop = end === -1 ? text.length : end;
      pushToken(tokens, 'comment', text.slice(index, stop));
      index = stop;
      continue;
    }

    if (preprocessor && current === '#' && (index === 0 || text[index - 1] === '\n')) {
      const end = text.indexOf('\n', index);
      const stop = end === -1 ? text.length : end;
      pushToken(tokens, 'meta', text.slice(index, stop));
      index = stop;
      continue;
    }

    if (lang === 'csharp' && (text.startsWith('@"', index) || text.startsWith('$@"', index) || text.startsWith('@$"', index))) {
      const quoteAt = text.indexOf('"', index);
      const stop = readQuoted(text, quoteAt, '"', true);
      pushToken(tokens, 'string', text.slice(index, stop));
      index = stop;
      continue;
    }

    if (current === '"' || current === '\'' || (lang === 'javascript' && current === '`') || (lang === 'csharp' && current === '$' && next === '"')) {
      const quoteIndex = current === '$' ? index + 1 : index;
      const quote = text[quoteIndex];
      const stop = readQuoted(text, quoteIndex, quote, false);
      pushToken(tokens, 'string', text.slice(index, stop));
      index = stop;
      continue;
    }

    if (/[0-9]/.test(current) && (index === 0 || !/[A-Za-z_]/.test(text[index - 1]))) {
      const match = text.slice(index).match(/^(?:0[xX][\da-fA-F]+|0[bB][01_]+|\d[\d_]*(?:\.\d+)?(?:[fFdDlLuU])?)/);
      if (match) {
        pushToken(tokens, 'number', match[0]);
        index += match[0].length;
        continue;
      }
    }

    if (/[A-Za-z_]/.test(current)) {
      const word = text.slice(index).match(/^[A-Za-z_]\w*/)[0];
      pushToken(tokens, keywords.has(word) ? 'keyword' : 'plain', word);
      index += word.length;
      continue;
    }

    pushToken(tokens, 'plain', current);
    index += 1;
  }

  return tokens;
}

export function highlightLines(source, language) {
  const lines = [[]];
  highlightCode(source, language).forEach((token) => {
    const parts = token.value.split('\n');
    parts.forEach((part, partIndex) => {
      if (partIndex > 0) lines.push([]);
      if (part) lines[lines.length - 1].push({ type: token.type, value: part });
    });
  });
  return lines;
}
