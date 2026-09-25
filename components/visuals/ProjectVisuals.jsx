// Animated illustrations for each project (pure SVG, no image files needed).
// All colours come from the --viz-* variables in globals.css, so they follow the theme.

const A = "var(--viz-1)";
const A2 = "var(--viz-2)";
const A3 = "var(--viz-3)";
const TEXT = "var(--viz-text)";
const LINE = "var(--viz-line)";
const FAINT = "var(--viz-faint)";
const PANEL = "var(--viz-panel)";
const SOFT = "var(--viz-soft)";

function Dots({ id }) {
  return (
    <>
      <defs>
        <pattern id={`dots-${id}`} width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1" fill={LINE} />
        </pattern>
        <radialGradient id={`glow-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={A} stopOpacity="0.35" />
          <stop offset="100%" stopColor={A} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#dots-${id})`} />
    </>
  );
}

function Label({ x, y, children, anchor = "middle", fill = FAINT, size = 9 }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fill={fill} fontSize={size} fontFamily="var(--font-jetbrains), monospace" letterSpacing="0.5">
      {children}
    </text>
  );
}

/* 1 ─ AI workflow: an LLM routes a task through registered tools */
export function WorkflowVisual() {
  const tools = [
    { y: 70, name: "tool: search" },
    { y: 150, name: "tool: code" },
    { y: 230, name: "tool: database" },
  ];
  const paths = tools.map((t) => `M190,150 C250,150 250,${t.y} 300,${t.y}`);
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-label="Animated diagram of an LLM calling tools">
      <Dots id="wf" />
      <circle cx="170" cy="150" r="90" fill="url(#glow-wf)" />
      {/* task → llm */}
      <path d="M78,150 L140,150" stroke={LINE} strokeWidth="2" />
      <path d="M78,150 L140,150" stroke={A} strokeWidth="2" strokeDasharray="4 8">
        <animate attributeName="stroke-dashoffset" from="24" to="0" dur="0.9s" repeatCount="indefinite" />
      </path>
      {paths.map((d, i) => (
        <g key={i}>
          <path d={d} fill="none" stroke={LINE} strokeWidth="2" />
          <path d={d} fill="none" stroke={i === 2 ? A2 : A} strokeWidth="2" strokeDasharray="5 9" opacity="0.9">
            <animate attributeName="stroke-dashoffset" from="28" to="0" dur={`${1 + i * 0.25}s`} repeatCount="indefinite" />
          </path>
          <circle r="4" fill={TEXT}>
            <animateMotion dur={`${2.2 + i * 0.4}s`} repeatCount="indefinite" path={d} begin={`${i * 0.5}s`} />
          </circle>
        </g>
      ))}
      {/* task node */}
      <rect x="22" y="132" width="56" height="36" rx="10" fill={PANEL} stroke={LINE} />
      <Label x="50" y="154" fill={TEXT}>task</Label>
      {/* llm node */}
      <circle cx="165" cy="150" r="30" fill={PANEL} stroke={A} strokeWidth="2" />
      <circle cx="165" cy="150" r="30" fill="none" stroke={A} strokeWidth="1.5" opacity="0.6">
        <animate attributeName="r" values="30;44" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0" dur="2s" repeatCount="indefinite" />
      </circle>
      <Label x="165" y="154" fill={TEXT} size={11}>LLM</Label>
      {/* tool nodes */}
      {tools.map((t, i) => (
        <g key={t.name}>
          <rect x="300" y={t.y - 17} width="86" height="34" rx="10" fill={PANEL} stroke={i === 2 ? A2 : LINE} />
          <Label x="343" y={t.y + 3} fill={TEXT} size={8.5}>{t.name}</Label>
        </g>
      ))}
      {/* recovery badge */}
      <g>
        <rect x="215" y="246" width="80" height="20" rx="10" fill={PANEL} stroke={A2} strokeWidth="1" />
        <Label x="255" y="259" fill={A2} size={8.5}>↺ retry step</Label>
        <animate attributeName="opacity" values="0;1;1;0" dur="3s" repeatCount="indefinite" />
      </g>
      <Label x="50" y="118">input</Label>
    </svg>
  );
}

/* 2 ─ Ambulance: SOS pin with live location, ambulance auto-dispatched */
export function AmbulanceVisual() {
  const route = "M70,236 L70,186 L170,186 L170,120 L262,120 L262,92 L296,92";
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-label="Animated map with SOS pin and ambulance route">
      <Dots id="amb" />
      {/* city blocks */}
      {[[20, 20, 130, 70], [190, 20, 90, 50], [300, 130, 80, 80], [190, 140, 60, 70], [20, 110, 130, 50], [95, 210, 140, 60], [270, 230, 110, 50]].map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx="8" fill={SOFT} stroke={LINE} />
      ))}
      {/* streets */}
      <path d="M0,100 H400 M0,186 H400 M170,0 V300 M262,0 V300 M70,0 V300" stroke={SOFT} strokeWidth="10" />
      {/* route */}
      <path d={route} fill="none" stroke={A} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 7" opacity="0.9">
        <animate attributeName="stroke-dashoffset" from="26" to="0" dur="0.8s" repeatCount="indefinite" />
      </path>
      {/* base */}
      <rect x="52" y="236" width="36" height="36" rx="9" fill={PANEL} stroke={TEXT} strokeOpacity="0.4" />
      <path d="M70,246 v16 M62,254 h16" stroke={A} strokeWidth="3" strokeLinecap="round" />
      {/* ambulance */}
      <g>
        <animateMotion dur="4.5s" repeatCount="indefinite" path={route} rotate="0" keyPoints="0;1;1" keyTimes="0;0.8;1" calcMode="linear" />
        <rect x="-11" y="-7" width="22" height="14" rx="4" fill={TEXT} />
        <rect x="-3" y="-5" width="6" height="10" rx="1" fill={A} />
        <circle r="3" cx="0" cy="-10" fill={A}>
          <animate attributeName="opacity" values="1;0.2;1" dur="0.5s" repeatCount="indefinite" />
        </circle>
      </g>
      {/* SOS pin */}
      <g transform="translate(310,92)">
        <circle r="8" fill="none" stroke={A} strokeWidth="2">
          <animate attributeName="r" values="8;34" dur="1.8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.9;0" dur="1.8s" repeatCount="indefinite" />
        </circle>
        <circle r="8" fill="none" stroke={A} strokeWidth="2">
          <animate attributeName="r" values="8;34" dur="1.8s" begin="0.9s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.9;0" dur="1.8s" begin="0.9s" repeatCount="indefinite" />
        </circle>
        <path d="M0,10 C-14,-4 -12,-24 0,-24 C12,-24 14,-4 0,10 Z" fill={A} transform="translate(0,-6)" />
        <circle cy="-24" r="4.5" fill="var(--viz-bg)" />
      </g>
      <rect x="266" y="38" width="118" height="22" rx="11" fill={PANEL} stroke={A} strokeOpacity="0.6" />
      <Label x="325" y="52" fill={TEXT} size={8.5}>SOS · live location</Label>
      <rect x="93" y="250" width="98" height="22" rx="11" fill={PANEL} stroke={LINE} />
      <Label x="142" y="264" fill={A2} size={8.5}>auto-dispatched</Label>
    </svg>
  );
}

/* 3 ─ Smart crop: field data turns into advice */
export function CropVisual() {
  const bars = [
    { x: 40, label: "moisture", vals: "70;40;90;70", c: A },
    { x: 92, label: "temp", vals: "50;85;60;50", c: A2 },
    { x: 144, label: "humidity", vals: "80;60;45;80", c: TEXT },
  ];
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-label="Animated sensor readings turning into crop advice">
      <Dots id="crop" />
      <circle cx="300" cy="170" r="110" fill="url(#glow-crop)" />
      {/* field rows */}
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} d={`M${200 + i * 10},300 Q300,${210 + i * 8} ${400 - i * 6},${230 + i * 14}`} stroke={A3} strokeOpacity="0.3" strokeWidth="2" fill="none" />
      ))}
      {/* sensor bars */}
      <rect x="24" y="40" width="168" height="170" rx="16" fill={PANEL} stroke={LINE} />
      <Label x="108" y="62" fill={TEXT} size={9}>field data · live</Label>
      {bars.map((b) => (
        <g key={b.label}>
          <rect x={b.x} y="80" width="30" height="100" rx="6" fill={SOFT} />
          <rect x={b.x} width="30" rx="6" fill={b.c} opacity="0.9">
            <animate attributeName="height" values={b.vals} dur="4s" repeatCount="indefinite" />
            <animate attributeName="y" values={b.vals.split(";").map((v) => 180 - v).join(";")} dur="4s" repeatCount="indefinite" />
          </rect>
          <Label x={b.x + 15} y="198" size={7.5}>{b.label}</Label>
        </g>
      ))}
      {/* arrow */}
      <path d="M200,125 H236" stroke={A} strokeWidth="2" strokeDasharray="4 6">
        <animate attributeName="stroke-dashoffset" from="20" to="0" dur="0.8s" repeatCount="indefinite" />
      </path>
      <path d="M232,119 L240,125 L232,131" fill="none" stroke={A} strokeWidth="2" />
      {/* sprout */}
      <g transform="translate(300,150)">
        <path d="M0,60 V0" stroke="var(--viz-leaf)" strokeWidth="3" strokeLinecap="round" />
        <path d="M0,20 C-30,14 -34,-12 -30,-18 C-12,-16 0,0 0,20 Z" fill="var(--viz-leaf)">
          <animateTransform attributeName="transform" type="scale" values="0.85;1;0.85" dur="3s" repeatCount="indefinite" additive="sum" />
        </path>
        <path d="M0,8 C28,4 34,-22 30,-30 C12,-28 0,-12 0,8 Z" fill="var(--viz-leaf-2)">
          <animateTransform attributeName="transform" type="scale" values="1;0.85;1" dur="3s" repeatCount="indefinite" additive="sum" />
        </path>
      </g>
      <rect x="241" y="228" width="120" height="24" rx="12" fill={PANEL} stroke={A} strokeOpacity="0.6" />
      <Label x="301" y="243" fill={TEXT} size={8.5}>✓ crop advice ready</Label>
    </svg>
  );
}

/* 4 ─ Sound-controlled switch: sound → Arduino → relay → light */
export function SoundVisual() {
  const bars = Array.from({ length: 13 }, (_, i) => i);
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-label="Animated sound wave switching on a light bulb">
      <Dots id="snd" />
      {/* sound wave */}
      {bars.map((i) => {
        const h = 20 + ((i * 37) % 60);
        return (
          <rect key={i} x={28 + i * 9} width="5" rx="2.5" fill={i % 3 === 0 ? A2 : A}>
            <animate attributeName="height" values={`${h};${12};${h + 20};${h}`} dur={`${0.9 + (i % 4) * 0.2}s`} repeatCount="indefinite" />
            <animate attributeName="y" values={`${150 - h / 2};${144};${150 - (h + 20) / 2};${150 - h / 2}`} dur={`${0.9 + (i % 4) * 0.2}s`} repeatCount="indefinite" />
          </rect>
        );
      })}
      <Label x="85" y="212">sound in</Label>
      {/* arduino board */}
      <path d="M150,150 H176" stroke={A} strokeWidth="2" strokeDasharray="4 6">
        <animate attributeName="stroke-dashoffset" from="20" to="0" dur="0.8s" repeatCount="indefinite" />
      </path>
      <rect x="178" y="112" width="72" height="76" rx="10" fill={PANEL} stroke={LINE} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={186 + i * 10} y="104" width="5" height="8" rx="1" fill={FAINT} />
      ))}
      <rect x="198" y="136" width="32" height="26" rx="4" fill={LINE} />
      <Label x="214" y="203" size={8}>arduino</Label>
      <circle cx="240" cy="124" r="3" fill={A}>
        <animate attributeName="opacity" values="0.2;1;0.2" dur="1s" repeatCount="indefinite" />
      </circle>
      {/* relay */}
      <path d="M250,150 H276" stroke={A} strokeWidth="2" strokeDasharray="4 6">
        <animate attributeName="stroke-dashoffset" from="20" to="0" dur="0.8s" repeatCount="indefinite" />
      </path>
      <rect x="276" y="134" width="32" height="32" rx="6" fill={PANEL} stroke={LINE} />
      <path d="M284,156 L300,146" stroke={TEXT} strokeWidth="2" strokeLinecap="round">
        <animateTransform attributeName="transform" type="rotate" values="0 284 156;-18 284 156;-18 284 156;0 284 156" keyTimes="0;0.1;0.6;0.7" dur="3s" repeatCount="indefinite" />
      </path>
      <Label x="292" y="182" size={8}>relay</Label>
      {/* bulb */}
      <path d="M308,150 H330" stroke={LINE} strokeWidth="2" />
      <g transform="translate(352,140)">
        <circle r="34" fill="var(--viz-bulb-on)" opacity="0">
          <animate attributeName="opacity" values="0;0.35;0.35;0" keyTimes="0;0.1;0.6;0.7" dur="3s" repeatCount="indefinite" />
        </circle>
        <path d="M-14,4 C-22,-14 -10,-30 0,-30 C10,-30 22,-14 14,4 C10,10 8,14 8,18 H-8 C-8,14 -10,10 -14,4 Z" fill="var(--viz-bulb-off)" stroke={TEXT} strokeOpacity="0.5" />
        {/* lit bulb fades in on top (SMIL can't animate between CSS variables) */}
        <path d="M-14,4 C-22,-14 -10,-30 0,-30 C10,-30 22,-14 14,4 C10,10 8,14 8,18 H-8 C-8,14 -10,10 -14,4 Z" fill="var(--viz-bulb-on)" opacity="0">
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.6;0.7" dur="3s" repeatCount="indefinite" />
        </path>
        <rect x="-8" y="20" width="16" height="10" rx="2" fill={FAINT} />
      </g>
      <Label x="352" y="200" size={8}>appliance</Label>
    </svg>
  );
}

export const visuals = {
  workflow: WorkflowVisual,
  ambulance: AmbulanceVisual,
  crop: CropVisual,
  sound: SoundVisual,
};
