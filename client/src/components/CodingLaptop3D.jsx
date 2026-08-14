import { useEffect, useRef } from 'react';

const SNIPPETS = [
  {
    name: 'app.js',
    lines: [
      [['kw', 'function'], [' '], ['fn', 'render'], ['pn', '('], ['vv', 'state'], ['pn', ') {']],
      [['pn', '  const'], [' '], ['vv', ' node'], [' '], ['pn', '='], [' '], ['fn', 'createElement'], ['pn', '('], ['str', '"div"'], ['pn', ');']],
      [['cm', '  // sync virtual tree']],
      [['vv', '  node'], ['pn', '.'], ['vv', 'props'], [' '], ['pn', '='], [' '], ['vv', 'state'], ['pn', '.'], ['vv', 'props'], ['pn', ';']],
      [['kw', '  for'], [' '], ['pn', '('], ['kw', 'const'], [' '], ['vv', 'child'], [' '], ['kw', 'of'], [' '], ['vv', 'state'], ['pn', '.'], ['vv', 'children'], ['pn', ') {']],
      [['vv', '    node'], ['pn', '.'], ['fn', 'append'], ['pn', '('], ['fn', 'render'], ['pn', '('], ['vv', 'child'], ['pn', '));']],
      [['pn', '  }']],
      [['kw', '  return'], [' '], ['vv', ' node'], ['pn', ';']],
      [['pn', '}']],
      [['pn', '']],
      [['vv', 'const'], [' '], ['vv', ' count'], [' '], ['pn', '='], [' '], ['num', '0'], ['pn', ';']],
      [['fn', 'mount'], ['pn', '('], ['fn', 'render'], ['pn', '('], ['pn', '{ count } '], ['pn', ')'], [', '], ['vv', 'root'], ['pn', ');']],
    ],
  },
  {
    name: 'api.py',
    lines: [
      [['kw', 'class'], [' '], ['fn', ' Server'], ['pn', ':']],
      [['kw', '    def'], [' '], ['fn', ' __init__'], ['pn', '('], ['vv', 'self'], ['pn', '):']],
      [['vv', '        self'], ['pn', '.'], ['vv', 'routes'], [' '], ['pn', '='], [' '], ['pn', '{}']],
      [['pn', '']],
      [['kw', '    def'], [' '], ['fn', ' get'], ['pn', '('], ['vv', 'self'], [', '], ['vv', 'path'], ['pn', '):']],
      [['kw', '        def'], [' '], ['fn', ' wrap'], ['pn', '('], ['vv', 'fn'], ['pn', '):']],
      [['vv', '            self'], ['pn', '.'], ['vv', 'routes'], ['pn', '['], ['vv', 'path'], ['pn', '] '], ['pn', '='], [' '], ['vv', 'fn']],
      [['kw', '            return'], [' '], ['vv', ' fn']],
      [['kw', '        return'], [' '], ['vv', ' wrap']],
      [['pn', '']],
      [['vv', 'app'], [' '], ['pn', '='], [' '], ['fn', ' Server'], ['pn', '()']],
      [['cm', '# register a health check']],
      [['vv', '@app'], ['pn', '.'], ['fn', 'get'], ['pn', '('], ['str', '"/health"'], ['pn', ')']],
    ],
  },
  {
    name: 'schema.ts',
    lines: [
      [['kw', 'interface'], [' '], ['fn', ' User'], [' '], ['pn', '{']],
      [['vv', '  id'], ['pn', ':'], [' '], ['kw', ' string'], ['pn', ';']],
      [['vv', '  name'], ['pn', ':'], [' '], ['kw', ' string'], ['pn', ';']],
      [['vv', '  age'], ['pn', ':'], [' '], ['kw', ' number'], ['pn', ';']],
      [['pn', '}']],
      [['pn', '']],
      [['kw', 'const'], [' '], ['vv', ' users'], ['pn', ':'], [' '], ['kw', ' User'], ['pn', '[] '], ['pn', '='], [' '], ['pn', '[];']],
      [['pn', '']],
      [['kw', 'function'], [' '], ['fn', 'addUser'], ['pn', '('], ['vv', 'u'], ['pn', ':'], [' '], ['kw', ' User'], ['pn', ') {']],
      [['vv', '  users'], ['pn', '.'], ['fn', 'push'], ['pn', '('], ['vv', 'u'], ['pn', ');']],
      [['kw', '  console'], ['pn', '.'], ['fn', 'log'], ['pn', '('], ['str', '`added ${u.name}`'], ['pn', ');']],
      [['pn', '}']],
    ],
  },
];

function flatten(tokens) {
  let s = '';
  for (const t of tokens) s += t[t.length - 1];
  return s;
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderPartial(tokens, chars) {
  let out = '';
  let remaining = chars;
  for (const t of tokens) {
    const cls = t.length === 2 ? t[0] : null;
    const text = t[t.length - 1];
    if (remaining <= 0) break;
    const take = Math.min(remaining, text.length);
    const chunk = text.slice(0, take);
    remaining -= take;
    out += cls ? `<span class="lt3d-${cls}">${escapeHtml(chunk)}</span>` : escapeHtml(chunk);
  }
  return out;
}

export default function CodingLaptop3D() {
  const wrapRef = useRef(null);
  const rigRef = useRef(null);
  const codeOutRef = useRef(null);
  const gutterRef = useRef(null);
  const fnameRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const rig = rigRef.current;
    const baseX = 14;
    const baseY = -18;

    function onMove(e) {
      const r = wrap.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      const rx = baseX - py * 12;
      const ry = baseY + px * 20;
      rig.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    }
    function onLeave() {
      rig.style.transform = `rotateX(${baseX}deg) rotateY(${baseY}deg)`;
    }
    wrap.addEventListener('mousemove', onMove);
    wrap.addEventListener('mouseleave', onLeave);

    let snippetIdx = 0;
    let lineIdx = 0;
    let charIdx = 0;
    let builtLines = [];
    let timer;
    let cancelled = false;

    function updateGutter(n) {
      let g = '';
      for (let i = 1; i <= n; i++) g += i + '\n';
      if (gutterRef.current) gutterRef.current.textContent = g;
    }

    function tick() {
      if (cancelled) return;
      const snip = SNIPPETS[snippetIdx];
      const lineTokens = snip.lines[lineIdx];
      const fullLine = flatten(lineTokens);

      if (charIdx <= fullLine.length) {
        let html = '';
        for (const l of builtLines) html += l + '\n';
        html += renderPartial(lineTokens, charIdx) + '<span class="lt3d-caret"></span>';
        if (codeOutRef.current) codeOutRef.current.innerHTML = html;
        updateGutter(builtLines.length + 1);
        charIdx += 2;
        timer = setTimeout(tick, 22 + Math.random() * 35);
        return;
      }

      builtLines.push(renderPartial(lineTokens, fullLine.length));
      lineIdx++;
      charIdx = 0;

      if (lineIdx >= snip.lines.length) {
        timer = setTimeout(() => {
          snippetIdx = (snippetIdx + 1) % SNIPPETS.length;
          lineIdx = 0;
          charIdx = 0;
          builtLines = [];
          if (fnameRef.current) fnameRef.current.textContent = SNIPPETS[snippetIdx].name;
          if (codeOutRef.current) codeOutRef.current.innerHTML = '';
          tick();
        }, 1600);
        return;
      }

      if (builtLines.length > 9) builtLines.shift();
      timer = setTimeout(tick, 90);
    }

    if (fnameRef.current) fnameRef.current.textContent = SNIPPETS[0].name;
    tick();

    return () => {
      cancelled = true;
      clearTimeout(timer);
      wrap.removeEventListener('mousemove', onMove);
      wrap.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div className="lt3d-wrap" ref={wrapRef}>
      <style>{`
        .lt3d-wrap{
          --lt3d-scale:0.65;
          width:calc(640px * var(--lt3d-scale));height:calc(460px * var(--lt3d-scale));
          max-width:100%;position:relative;font-family:'JetBrains Mono','Fira Code',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;z-index:1;
        }
        .lt3d-wrap::before{
          content:'';position:absolute;left:50%;top:50%;
          width:calc(520px * var(--lt3d-scale) * 1.35);height:calc(420px * var(--lt3d-scale) * 1.35);
          transform:translate(-50%,-50%);border-radius:50%;
          background:radial-gradient(circle, rgba(139,92,246,0.45) 0%, rgba(139,92,246,0.18) 45%, transparent 72%);
          filter:blur(18px);z-index:-1;pointer-events:none;
        }
        .lt3d-scene{position:absolute;top:50%;left:50%;width:640px;height:460px;perspective:1600px;transform:translate(-50%,-50%) scale(var(--lt3d-scale));}
        @media(max-width:960px){.lt3d-wrap{--lt3d-scale:0.55;}}
        @media(max-width:600px){.lt3d-wrap{--lt3d-scale:0.46;}}
        @media(max-width:420px){.lt3d-wrap{--lt3d-scale:0.36;}}
        @media(max-width:340px){.lt3d-wrap{--lt3d-scale:0.3;}}
        .lt3d-rig{width:100%;height:100%;position:relative;transform-style:preserve-3d;transform:rotateX(14deg) rotateY(-18deg);animation:lt3d-float 6s ease-in-out infinite;transition:transform .15s ease-out;}
        @keyframes lt3d-float{0%,100%{translate:0 0;}50%{translate:0 -14px;}}
        .lt3d-lid{position:absolute;left:50%;top:6%;width:520px;height:330px;margin-left:-260px;transform-style:preserve-3d;transform-origin:bottom center;}
        .lt3d-lid-back{position:absolute;inset:0;border-radius:14px 14px 4px 4px;background:linear-gradient(155deg,#565d6b,#33383f 55%,#16181c);transform:translateZ(-10px);box-shadow:0 30px 60px -20px rgba(0,0,0,.6);}
        .lt3d-lid-front{position:absolute;inset:0;border-radius:12px;background:#05060a;border:10px solid #05060a;box-sizing:border-box;overflow:hidden;}
        .lt3d-screen{position:absolute;inset:0;background:#0e1116;border-radius:3px;overflow:hidden;}
        .lt3d-screen-glow{position:absolute;inset:0;box-shadow:inset 0 0 60px rgba(87,230,193,.06);pointer-events:none;}
        .lt3d-cam{position:absolute;top:5px;left:50%;width:5px;height:5px;margin-left:-2.5px;border-radius:50%;background:#1a1e24;box-shadow:0 0 3px rgba(87,230,193,.5);}
        .lt3d-editor{position:absolute;inset:0;display:flex;flex-direction:column;background:#12151c;}
        .lt3d-titlebar{height:22px;display:flex;align-items:center;gap:6px;padding:0 10px;background:#0c0f14;border-bottom:1px solid rgba(255,255,255,.04);flex-shrink:0;}
        .lt3d-dot{width:7px;height:7px;border-radius:50%;}
        .lt3d-dot.r{background:#e0605a;}
        .lt3d-dot.y{background:#e0b95a;}
        .lt3d-dot.g{background:#5ac97e;}
        .lt3d-filename{margin-left:8px;font-size:9px;color:#5b6472;letter-spacing:.3px;}
        .lt3d-body-row{flex:1;display:flex;min-height:0;}
        .lt3d-gutter{width:26px;flex-shrink:0;padding-top:10px;text-align:right;padding-right:6px;box-sizing:border-box;font-size:9px;line-height:15px;color:#333844;background:#0e1116;user-select:none;white-space:pre;}
        .lt3d-code-pane{flex:1;position:relative;overflow:hidden;padding:10px 12px;box-sizing:border-box;}
        .lt3d-code-out{font-size:9.5px;line-height:15px;white-space:pre-wrap;word-break:break-word;color:#c7ccd6;}
        .lt3d-kw{color:#6ea8f0;} .lt3d-str{color:#d8a35c;} .lt3d-fn{color:#e0c368;}
        .lt3d-cm{color:#5b6472;font-style:italic;} .lt3d-num{color:#a3d977;}
        .lt3d-vv{color:#7fd0ee;} .lt3d-pn{color:#8890a0;}
        .lt3d-caret{display:inline-block;width:6px;height:12px;background:#57e6c1;vertical-align:-2px;box-shadow:0 0 6px #57e6c1;animation:lt3d-blink 1s step-end infinite;}
        @keyframes lt3d-blink{50%{opacity:0;}}
        .lt3d-hinge{position:absolute;left:50%;bottom:-8px;width:520px;height:16px;margin-left:-260px;background:linear-gradient(180deg,#16181c,#0a0b0d);border-radius:4px;transform:translateZ(-2px) rotateX(90deg);transform-origin:top center;}
        .lt3d-base{position:absolute;left:50%;top:calc(6% + 330px - 2px);width:600px;height:22px;margin-left:-300px;transform-style:preserve-3d;transform:rotateX(90deg);transform-origin:top center;}
        .lt3d-base-top{position:absolute;inset:0;border-radius:10px;background:linear-gradient(90deg,#33383f,#565d6b 50%,#33383f);}
        .lt3d-keys{position:absolute;left:40px;top:3px;right:40px;bottom:8px;display:grid;grid-template-columns:repeat(16,1fr);grid-auto-rows:1fr;gap:2px;}
        .lt3d-keys div{background:#2c2f37;border-radius:1.5px;box-shadow:0 0 3px rgba(87,230,193,.10) inset;}
        .lt3d-trackpad{position:absolute;left:50%;bottom:2px;width:120px;height:8px;margin-left:-60px;background:#23262d;border-radius:3px;}
        .lt3d-base-front{position:absolute;left:50%;top:22px;width:600px;height:10px;margin-left:-300px;background:linear-gradient(180deg,#33383f,#16181c);transform:rotateX(-90deg);transform-origin:top center;border-radius:0 0 8px 8px;}
      `}</style>
      <div className="lt3d-scene">
        <div className="lt3d-rig" ref={rigRef}>
          <div className="lt3d-lid">
            <div className="lt3d-lid-back"></div>
            <div className="lt3d-lid-front">
              <div className="lt3d-cam"></div>
              <div className="lt3d-screen">
                <div className="lt3d-editor">
                  <div className="lt3d-titlebar">
                    <span className="lt3d-dot r"></span>
                    <span className="lt3d-dot y"></span>
                    <span className="lt3d-dot g"></span>
                    <span className="lt3d-filename" ref={fnameRef}>app.js</span>
                  </div>
                  <div className="lt3d-body-row">
                    <div className="lt3d-gutter" ref={gutterRef}></div>
                    <div className="lt3d-code-pane">
                      <div className="lt3d-code-out" ref={codeOutRef}></div>
                    </div>
                  </div>
                </div>
                <div className="lt3d-screen-glow"></div>
              </div>
            </div>
          </div>

          <div className="lt3d-hinge"></div>

          <div className="lt3d-base">
            <div className="lt3d-base-top">
              <div className="lt3d-keys">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div key={i}></div>
                ))}
              </div>
              <div className="lt3d-trackpad"></div>
            </div>
          </div>
          <div className="lt3d-base-front"></div>
        </div>
      </div>
    </div>
  );
}
