"use client";

import { useState, useRef, useEffect } from "react";
import Reveal from "./Reveal";

// Natural Earth 50m land boundaries — Mercator projected, Douglas-Peucker simplified
const WORLD_PATHS = ["M808,254L834,273L825,286L816,288L801,287L795,281L792,283L795,279L790,282L778,278L741,282L738,281L739,278L733,271L735,265L753,263L765,256L791,254L789,257L801,260L805,253L808,254Z","M595,81L593,79L598,80L595,81Z","M504,90L512,95L502,97L501,91L504,90Z","M576,75L579,77L572,81L567,80L576,75Z","M813,291L821,293L815,295L813,291Z","M691,74L695,77L693,80L679,79L683,75L691,74Z","M694,81L700,83L699,89L683,85L694,81Z","M707,87L706,89L710,87L713,91L698,94L707,87Z","M800,105L813,106L809,108L806,105L808,109L798,110L793,105L800,105Z","M806,113L809,116L799,115L806,113Z","M883,282L896,286L887,292L884,289L887,285L883,282Z","M883,292L886,292L877,299L866,299L883,292Z","M765,229L764,234L755,232L765,229Z","M753,219L756,220L754,224L760,225L750,223L753,219Z","M784,241L811,244L827,252L797,249L780,243L785,242L778,241L784,241Z","M762,239L750,240L758,241L753,242L757,245L752,243L749,247L747,244L751,239L762,239Z","M691,234L709,240L715,247L691,234Z","M742,232L748,234L743,236L748,239L740,244L726,243L722,239L742,232Z","M619,103L603,107L592,115L584,114L603,103L619,99L622,100L619,103Z","M588,115L591,116L588,121L594,125L579,122L583,116L588,115Z","M807,166L812,177L808,176L809,181L805,181L807,166Z","M810,184L815,185L808,188L800,187L805,182L810,184Z","M803,188L801,197L777,199L796,195L803,188Z","M778,200L776,203L774,200L778,200Z","M753,214L750,212L755,211L753,214Z","M650,229L655,232L650,233L650,229Z","M574,254L576,258L568,269L559,269L561,259L574,254Z","M277,311L287,314L270,314L277,314L274,312L277,311Z","M245,213L265,217L238,215L245,213Z","M502,80L518,82L507,87L496,83L499,79L502,80Z","M492,82L504,90L492,101L485,96L492,94L484,94L492,90L483,92L477,83L484,83L481,85L485,86L487,83L491,88L492,82Z","M270,217L279,219L265,219L270,217Z","M442,158L440,160L446,160L441,163L454,170L454,172L436,174L444,171L437,171L443,167L435,162L442,158Z","M432,165L436,166L434,170L424,171L428,170L425,167L432,165Z","M0,131L15,139L16,136L26,139L18,140L17,144L4,138L0,142L900,142L886,143L894,143L898,149L859,155L855,159L858,163L842,173L840,162L859,152L864,149L861,148L851,153L851,150L843,151L836,155L838,156L807,156L789,165L803,168L801,176L788,185L769,191L773,197L766,199L767,194L761,190L753,192L755,189L745,192L757,194L748,198L755,202L751,204L755,205L749,210L717,216L714,218L724,226L713,230L700,225L698,230L710,239L696,230L694,221L686,222L677,213L651,222L650,228L644,231L633,221L632,214L585,209L573,204L569,205L579,212L591,209L600,214L588,220L559,226L537,205L531,204L556,227L579,228L548,245L552,257L537,263L539,268L531,274L518,280L500,282L479,261L485,253L483,247L472,241L475,240L474,235L459,233L429,235L406,223L410,219L408,214L435,197L474,194L478,195L476,199L497,204L504,200L535,203L540,195L519,195L516,191L554,188L542,183L548,179L535,184L529,179L519,187L522,189L507,190L510,194L506,196L503,194L508,193L483,182L481,184L496,190L490,194L472,184L458,186L445,195L428,195L427,186L449,183L438,177L475,168L471,161L477,159L475,166L487,168L503,165L504,160L511,161L509,156L525,155L504,153L504,147L513,142L506,140L493,149L493,153L498,155L491,158L490,163L482,164L477,155L464,158L468,153L463,155L463,152L469,152L463,149L478,145L474,145L498,128L519,124L527,126L524,128L549,133L553,136L548,139L530,136L544,145L542,142L560,139L559,132L565,132L567,134L562,135L566,137L585,131L599,133L602,128L621,133L617,124L624,117L629,117L632,118L630,122L634,132L629,138L623,137L630,139L638,131L647,135L644,131L634,130L633,122L637,117L639,123L648,124L640,121L646,119L658,122L658,127L659,122L652,119L652,114L667,113L667,116L669,113L665,111L668,111L665,110L668,108L683,103L699,105L697,102L704,102L703,99L711,95L715,97L711,98L719,99L716,101L728,100L735,105L713,117L726,113L733,113L734,118L735,114L757,117L761,114L773,116L773,120L769,119L778,125L782,121L800,122L798,119L802,117L817,119L813,121L824,120L831,125L847,124L852,132L858,128L876,131L876,127L900,131L0,131Z","M411,139L416,142L403,146L393,145L396,143L390,143L395,141L389,141L411,139Z","M595,71L594,74L589,73L595,71Z","M587,74L594,76L587,77L587,74Z","M234,124L238,124L235,120L239,120L238,115L246,114L248,121L261,118L260,121L265,120L262,123L270,122L268,125L273,124L271,127L276,125L279,126L275,127L282,127L277,129L283,130L277,131L297,138L291,142L287,140L289,139L278,139L289,146L287,148L278,145L285,149L279,149L267,143L255,144L266,141L264,139L270,136L263,130L259,132L261,130L256,127L228,126L232,124L225,122L227,116L238,114L233,118L237,123L234,124Z","M276,59L284,59L280,62L291,60L297,64L295,67L278,73L288,72L273,78L272,83L258,85L264,88L254,88L264,90L254,97L245,98L254,101L226,102L233,98L231,95L239,97L243,95L237,96L239,93L231,93L233,89L246,88L239,88L234,80L249,84L243,80L258,76L253,75L258,72L237,78L234,76L242,74L231,77L227,76L238,73L226,75L231,71L221,69L237,67L234,66L238,64L251,69L244,64L253,62L250,59L260,63L257,59L268,61L267,59L276,59Z","M214,121L221,127L218,128L224,129L225,133L229,131L232,136L238,131L236,128L247,131L244,132L246,136L237,137L240,139L221,140L232,142L229,145L216,144L223,147L213,153L218,161L244,165L245,170L252,173L254,170L251,166L259,162L254,158L257,154L255,149L266,149L276,152L273,155L277,159L289,154L299,165L307,166L299,168L306,167L311,171L284,174L264,182L287,176L289,177L283,178L297,182L278,184L272,187L275,188L261,191L260,195L260,191L257,192L261,197L247,203L249,210L240,204L212,205L206,208L207,216L214,219L232,215L228,222L242,223L240,227L246,230L258,231L271,226L271,230L275,226L295,228L303,233L322,235L325,239L318,242L350,243L363,248L353,255L348,266L328,270L328,274L315,282L305,279L308,284L306,287L287,291L291,294L281,299L286,302L272,313L265,310L269,310L262,307L266,307L264,302L267,302L261,300L268,297L266,286L271,279L275,263L247,247L251,243L248,241L257,236L256,231L191,219L167,203L163,204L176,213L163,207L139,190L142,181L138,177L143,179L143,175L131,172L133,169L130,171L129,167L124,168L126,164L120,164L112,156L109,158L80,152L71,156L76,151L64,159L42,165L58,156L45,158L45,153L37,153L41,153L35,150L48,143L30,140L49,138L33,133L59,123L112,132L130,125L136,129L139,127L164,131L162,134L175,134L182,138L181,134L186,132L179,132L206,135L203,133L207,132L211,138L216,129L210,128L209,123L214,121Z","M216,108L209,108L213,106L216,108Z","M187,117L183,115L188,114L187,117Z","M200,113L207,113L204,117L209,118L209,121L202,123L193,118L200,117L196,115L200,113Z","M238,142L249,145L232,146L236,140L238,142Z","M261,133L262,135L257,136L261,133Z","M251,114L260,117L251,118L248,114L251,114Z","M206,102L205,108L193,106L198,105L195,102L200,104L198,101L206,102Z","M191,86L202,94L188,92L192,90L186,86L191,86Z","M220,74L237,86L230,88L228,93L218,92L215,88L222,86L212,86L214,84L208,81L214,81L209,80L215,78L211,76L217,74L215,72L220,74Z","M214,99L227,102L222,103L228,106L245,105L252,109L221,110L217,102L208,100L214,99Z","M210,91L213,93L208,95L204,90L210,91Z","M174,93L175,96L167,96L174,93Z","M161,97L157,103L155,100L150,105L143,103L161,97Z","M179,104L186,104L182,109L168,111L164,110L172,107L156,107L162,106L157,106L163,101L177,106L174,102L178,100L179,104Z","M217,112L224,113L212,120L211,114L217,112Z","M206,129L212,131L201,131L206,129Z","M164,118L175,117L181,122L179,116L183,116L198,128L167,132L157,127L171,126L156,125L162,122L153,121L161,116L165,115L164,118Z","M151,112L162,115L148,122L135,121L141,114L138,111L151,112Z","M311,172L308,175L316,175L317,180L302,178L311,172Z","M338,67L332,62L338,63L338,67Z","M375,59L396,61L375,67L389,70L397,67L392,77L401,70L421,72L400,82L403,87L396,95L404,99L394,101L402,107L394,108L402,111L395,110L398,115L381,116L395,117L394,120L383,118L388,117L396,126L382,122L386,123L377,126L394,127L350,141L342,155L330,153L321,146L325,143L320,144L322,140L317,141L322,137L316,139L319,137L316,135L324,135L317,133L322,132L324,127L314,125L323,124L316,119L311,122L313,117L304,106L279,103L276,102L280,101L272,99L284,96L268,93L285,87L290,81L282,79L296,74L298,68L309,72L303,67L314,64L316,70L317,65L326,68L325,63L338,69L336,61L347,61L335,59L375,59Z"];

const CITIES = [
  { name: "Ann Arbor", lat: 42.28, lng: -83.74, label: "Home base", story: "Where the code gets written. CS at Michigan, late nights at the Dude, and too much bubble tea." },
  { name: "Paris", lat: 48.86, lng: 2.35, label: "Study abroad", story: "A semester that changed how I think about craft. Also where I debugged a production issue from a caf\u00e9 in Le Marais." },
  { name: "New York", lat: 40.71, lng: -74.01, label: "The hotel fire", story: "My hotel caught on fire. I was inside. Made it out fine, the trip less so." },
  { name: "Hong Kong", lat: 22.32, lng: 114.17, label: "The passport incident", story: "My passport went through the washing machine 4 days before this trip. Still made it." },
  { name: "Tokyo", lat: 35.68, lng: 139.69, label: "Japan", story: "Konbini onigiri at 2am might be the peak human experience. Also had my first Michelin meal here, omakase that made me rethink what attention to detail means." },
  { name: "Kyoto", lat: 35.01, lng: 135.77, label: "Temples and quiet", story: "Wrote my first API spec sitting in a garden in Arashiyama. Sometimes the best code comes from the quietest places." },
  { name: "Milan", lat: 45.46, lng: 9.19, label: "Italy", story: "Came for the Duomo, stayed for the aperitivo. Design is everywhere in this city." },
  { name: "Brugge", lat: 51.21, lng: 3.22, label: "Belgium", story: "Took a wrong turn into the backstreets and found the best waffle of my life. No regrets." },
  { name: "Brussels", lat: 50.85, lng: 4.35, label: "Belgium", story: "Grand Place at night is one of those things that actually lives up to the photos." },
  { name: "Luxembourg", lat: 49.61, lng: 6.13, label: "Smallest adventure", story: "An entire country in a day. The Bock Casemates felt like a video game level." },
  { name: "Zurich", lat: 47.37, lng: 8.54, label: "Switzerland", story: "Took the wrong train and ended up with a better view of the Alps than anything on my itinerary." },
  { name: "Loire Valley", lat: 47.35, lng: 0.68, label: "France", story: "Biked through vineyards and castles. France outside of Paris hits different." },
  { name: "Chicago", lat: 41.88, lng: -87.63, label: "Weekend trips", story: "Deep dish pizza and architecture boat tours. The Midwest\u2019s other great city." },
  { name: "Delhi", lat: 28.61, lng: 77.21, label: "Where it started", story: "Home before Michigan. The chaos, the food, the energy, nothing else comes close." },
  { name: "Goa", lat: 15.3, lng: 74.0, label: "India", story: "Wrote some of my best side project code with my feet in the sand. Don\u2019t judge." },
  { name: "Jaipur", lat: 26.92, lng: 75.79, label: "The Pink City", story: "Colors and architecture that make you realize most software UI is painfully boring." },
  { name: "Shimla", lat: 31.1, lng: 77.17, label: "India", story: "The toy train up the mountains is one of those experiences that makes you put your phone away." },
];

function proj(lat: number, lng: number) {
  const W = 900;
  const H = 480;
  const clamped = Math.max(-60, Math.min(83, lat));
  const x = ((lng + 180) / 360) * W;
  const latRad = (clamped * Math.PI) / 180;
  const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
  const y = H / 2 - (mercN / Math.PI) * (H / 2) * 0.85;
  return { x, y };
}

export default function InteractiveMap() {
  const [active, setActive] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [cityImages, setCityImages] = useState<Record<number, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadTarget, setUploadTarget] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentIdx = active !== null ? active : hovered;
  const current = currentIdx !== null ? CITIES[currentIdx] : null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || uploadTarget === null) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setCityImages((prev) => ({ ...prev, [uploadTarget]: ev.target?.result as string }));
      setUploadTarget(null);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const triggerUpload = (idx: number) => {
    setUploadTarget(idx);
    setTimeout(() => fileInputRef.current?.click(), 50);
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {mounted ? (
        <svg viewBox="0 0 900 480" className="w-full h-auto">
          {WORLD_PATHS.map((d, i) => (
            <path
              key={i}
              d={d}
              fill="#1A1917"
              stroke="#5C5650"
              strokeWidth={0.5}
              opacity={0.7}
            />
          ))}

          {CITIES.map((city, i) => {
            const { x, y } = proj(city.lat, city.lng);
            const isActive = active === i || hovered === i;
            return (
              <g
                key={city.name}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setActive(active === i ? null : i)}
                style={{ cursor: "pointer" }}
              >
                {isActive && (
                  <circle cx={x} cy={y} r={14} fill="none" stroke="#B8A88A" strokeWidth={0.8} opacity={0.4}>
                    <animate attributeName="r" from="6" to="20" dur="1.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.4" to="0" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                )}
                <circle
                  cx={x} cy={y}
                  r={isActive ? 7 : 3.5}
                  fill={isActive ? "#D4C5A9" : "#B8A88A"}
                  opacity={isActive ? 0.15 : 0.08}
                  style={{ transition: "all 0.3s" }}
                />
                <circle
                  cx={x} cy={y}
                  r={isActive ? 4 : 2.5}
                  fill={isActive ? "#D4C5A9" : "#B8A88A"}
                  opacity={isActive ? 1 : 0.7}
                  style={{ transition: "all 0.3s" }}
                />
                {isActive && (
                  <text
                    x={x} y={y - 14}
                    textAnchor="middle"
                    style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 600, fill: "#E8E0D0" }}
                  >
                    {city.name}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      ) : (
        <div style={{ height: 480 }} />
      )}

      {/* Story card */}
      <div
        style={{
          overflow: "hidden",
          maxHeight: current ? 240 : 0,
          opacity: current ? 1 : 0,
          transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          marginTop: current ? 20 : 0,
        }}
      >
        {current && currentIdx !== null && (
          <div
            className="rounded-2xl px-[26px] py-[22px] flex gap-5 items-start"
            style={{ background: "#141311", border: "1px solid rgba(228,224,208,0.08)" }}
          >
            <div
              onClick={() => triggerUpload(currentIdx)}
              className="w-[130px] min-h-[95px] rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center cursor-pointer"
              style={{ background: "#1A1917", border: "1px solid rgba(228,224,208,0.08)" }}
            >
              {cityImages[currentIdx] ? (
                <img
                  src={cityImages[currentIdx]}
                  alt={current.name}
                  className="w-full object-cover"
                  style={{ height: 95 }}
                />
              ) : (
                <div className="text-center p-3">
                  <div className="text-xl text-cream-dim mb-1">+</div>
                  <span className="font-body text-[10px] text-cream-dim">Add photo</span>
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-display text-[22px] font-medium text-cream">
                  {current.name}
                </span>
                <span className="font-body text-xs text-cream-dim tracking-wide">
                  {current.label}
                </span>
              </div>
              <p className="font-body text-sm text-cream-muted leading-[1.75] italic">
                {`\u201C${current.story}\u201D`}
              </p>
            </div>
          </div>
        )}
      </div>

      {!current && (
        <p className="text-center mt-4 font-body text-[12.5px] text-cream-dim italic">
          Hover over a city to explore
        </p>
      )}
    </div>
  );
}
