// Hidden SVG filter used for Chromium-only glass refraction, plus a tiny
// script that turns it on (html.supports-refraction) only in Chromium.
const detect = `try{var b=navigator.userAgentData&&navigator.userAgentData.brands;if(b&&b.some(function(x){return x.brand==="Chromium"}))document.documentElement.classList.add("supports-refraction")}catch(e){}`;

export default function GlassDefs() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: detect }} />
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
        <filter id="liquid-glass" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.012" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="18" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        {/* Gentler version for thin surfaces like the navbar */}
        <filter id="liquid-glass-soft" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.012" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        {/* Clean outline for big text: grow the letters, cut out the original shape.
            (-webkit-text-stroke shows overlapping contours of the variable font.) */}
        <filter id="text-outline" x="-5%" y="-10%" width="110%" height="120%">
          <feMorphology in="SourceAlpha" operator="dilate" radius="1" result="grown" />
          <feComposite in="grown" in2="SourceAlpha" operator="out" result="ring" />
          <feFlood style={{ floodColor: "var(--outline-accent)" }} />
          <feComposite in2="ring" operator="in" />
        </filter>
      </svg>
    </>
  );
}
