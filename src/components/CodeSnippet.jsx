import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { highlightLines, languageLabel } from '../utils/highlight';

export function CodeSnippet({ snippet }) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef(0);
  const label = languageLabel(snippet.language);
  const lines = useMemo(
    () => highlightLines(snippet.code, snippet.language),
    [snippet.code, snippet.language],
  );
  const accessibleName = snippet.title || snippet.filename || label;

  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(snippet.code);
    } catch {
      const area = document.createElement('textarea');
      area.value = snippet.code;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.left = '-9999px';
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      area.remove();
    }

    setCopied(true);
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <figure className="code-snippet">
      <figcaption>
        <div className="code-snippet-heading">
          {snippet.filename ? <span className="code-snippet-file">{snippet.filename}</span> : null}
          {snippet.title ? <span className="code-snippet-title">{snippet.title}</span> : null}
        </div>
        <div className="code-snippet-actions">
          <span className="code-snippet-lang">{label}</span>
          <button
            type="button"
            className={copied ? 'is-copied' : ''}
            onClick={copyCode}
            aria-label={copied ? t('project.copiedSnippet', { title: accessibleName }) : t('project.copySnippet', { title: accessibleName })}
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
            <span aria-live="polite">{copied ? t('project.copied') : t('project.copyCode')}</span>
          </button>
        </div>
      </figcaption>
      {snippet.caption ? <p className="code-snippet-caption">{snippet.caption}</p> : null}
      <pre tabIndex={0} spellCheck={false}>
        <code aria-label={accessibleName}>
          {lines.map((line, lineIndex) => (
            <span className="code-line" key={lineIndex}>
              {line.map((token, tokenIndex) => (
                <span key={tokenIndex} className={token.type === 'plain' ? undefined : `tok-${token.type}`}>
                  {token.value}
                </span>
              ))}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}
