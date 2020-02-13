import React, {useEffect} from 'react';

export const AV: React.FC = () => {
  return (
    <svg className="icon av" viewBox="0 0 200 200">
      <rect x="20" y="70" height="60" width="160" rx="5" ry="5" />
      <rect x="40" y="80" height="20" width="80" rx="5" ry="5" />
      <circle r="15" cx="150" cy="100" />
      <path d="M 40,115 h10 m 10,0 h10 m10,0 h10" />
      AV
    </svg>
  );
}


export const AirCon1: React.FC = () => {
  return (
    <svg className="icon aircon1" viewBox="0 0 200 200">
      <rect x="10" y="75" width="180" height="50" rx="5" ry="5" />
      <path d="m 170,115 h10" />
      <path d="M20,125 v5 A5 5 0 0 0 25,135 H175 A5 5 0 0 0 180,130 v-5" />
      AC1
    </svg>
  );
}


export const AirCon2: React.FC = () => {
  return (
    <svg className="icon av" viewBox="0 0 200 200">
      <rect x="20" y="50" height="100" width="160" rx="5" ry="5" />
      <rect x="40" y="85" height="30" width="10" rx="5" ry="5" />
      <circle r="5" cx="45" cy="130" />
      <rect x="60" y="85" height="50" width="100" rx="5" ry="5" />
      <path d="
      M 40,65 h50 m 20,0 h50
      M 60,97.5 h100
      M 60,110 h100
      M 60,122.5 h100
      M 40,150 v10
      M 160,150 v10
      " />
      AC2
    </svg>
  );
}


export const AirPurifier: React.FC = () => {
  return (
    <svg className="icon airpurifier" viewBox="0 0 200 200">
      <rect x="50" y="30" height="140" width="100" rx="10" ry="10" />
      <circle r="10" cx="100" cy="60" />
      <path d="
      M 65,130 h70
      M 65,140 h70
      M 65,150 h70
      " />
      AirPurifier
    </svg>
  );
}


export const Audio: React.FC = () => {
  return (
    <svg className="icon audio" viewBox="0 0 200 200">
      <rect x="60" y="40" height="120" width="80" rx="10" ry="10" />
      <circle r="15" cx="100" cy="70" />
      <circle r="2.5" cx="100" cy="70" />
      <circle r="20" cx="100" cy="125" />
      <circle r="10" cx="100" cy="125" />
      Audio
    </svg>
  );
}


export const Check: React.FC = () => {
  return (
    <svg className="icon fill" viewBox="0 0 200 200">
      <g transform="rotate(45,100,100)">
        <rect x="60" y="140" width="40" height="20" />
        <rect x="100" y="40" width="20" height="120" />
      </g>
      ✅
    </svg>
  )
}


export const Cross: React.FC = () => {
  return (
    <svg className="icon fill" viewBox="0 0 200 200">
      <g transform="rotate(45,100,100)">
        <rect x="90" y="30" width="20" height="140" />
        <rect x="30" y="90" width="140" height="20" />
      </g>
      ❌
    </svg>
  )
}

export const Curtain: React.FC = () => {
  return (
    <svg className="icon curtain" viewBox="0 0 200 200">
      <path d="
      M 10,10 h180 z
      M 10,10 v140 a 20 20 1 1 0 40,0 v-140
      M 50,10 v140 a 20 20 1 1 0 40,0 v-140
      M 90,150 h20
      M 110,10 v140 a 20 20 1 1 0 40,0 v-140
      M 150,10 v140 a 20 20 1 1 0 40,0 v-140
      " />
      Curtain
    </svg>
  );
}

export const EFF: React.FC = () => {
  return (
    <svg className="icon fill" viewBox="0 0 200 200">
      <path d="
      M 40,60 l60,40 l-60,40 z
      M 100,60 l60,40 l-60,40 z
      " />
      <rect x="160" y="60" height="80" width="10" />
      ⏭
    </svg>
  )
}


export const ERewind: React.FC = () => {
  return (
    <svg className="icon fill" viewBox="0 0 200 200">
      <g transform="rotate(180,100,100)">
        <path d="
        M 40,60 l60,40 l-60,40 z
        M 100,60 l60,40 l-60,40 z
        " />
        <rect x="160" y="60" height="80" width="10" />
      </g>
      ⏮
    </svg>
  )
}


export const Etc: React.FC = () => {
  return (
    <svg className="icon etc" viewBox="0 0 200 200">
      <rect x="40" y="70" height="60" width="120" rx="10" ry="10" />
      <rect x="70" y="80" height="40" width="60" rx="10" ry="10" />
      <path d="
      M 90 90 v20
      M 110 90 v20
      "/>
      Etc
    </svg>
  );
}

export const FF: React.FC = () => {
  return (
    <svg className="icon fill" viewBox="0 0 200 200">
      <path d="
      M 40,60 l60,40 l-60,40 z
      M 100,60 l60,40 l-60,40 z
      " />
      ⏩
    </svg>
  )
}

export const Fan: React.FC = () => {
  return (
    <svg className="icon fan" viewBox="0 0 200 200">
      <circle r="40" cx="100" cy="80" />
      <circle r="5" cx="100" cy="80" />
      <path d="
      M 105,77 a 17 17 1 0 0 -5,-29
      M 95,77 a 17 17 1 0 0 -19,25
      M 100,85 a 17 17 1 0 0 28,12
      M 90,120 v30
      M 110,120 v30
      M 80,160 h40 v-5 a5 5 1 0 0 -5,-5 h-30 a 5 5 1 0 0 -5,5 v5 z
      " />
      ➡
    </svg>
  );
}

export const Light: React.FC = () => {
  return (
    <svg className="icon light" viewBox="0 0 200 200">
      <path d="
      M 70,35 h60 v10 a5 5 1 0 1 -5,5 h-50 a5 5 1 0 1 -5,-5 v-10 z
      M 80,50 a20 20 1 0 0 40,0
      M 100,70 v90
      M 80,170 h40 v-5 a5 5 1 0 0 -5,-5 h-30 a 5 5 1 0 0 -5,5 v5 z
      " />
      Light
    </svg>
  );
}

export const Minus: React.FC = () => {
  return (
    <svg className="icon fill" viewBox="0 0 200 200">
      <rect x="30" y="90" width="140" height="20" />
      -
    </svg>
  )
}

export const Pause: React.FC = () => {
  return (
    <svg className="icon fill" viewBox="0 0 200 200">
      <rect x="60" y="40" height="120" width="20" />
      <rect x="120" y="40" height="120" width="20" />
      ⏸
    </svg>
  )
}

export const Play: React.FC = () => {
  return (
    <svg className="icon fill" viewBox="0 0 200 200">
        <path d="
        M 40,40 L160,100 L40,160 z
        " />
      ▶
    </svg>
  )
}


export const Plus: React.FC = () => {
  return (
    <svg className="icon fill" viewBox="0 0 200 200">
      <rect x="90" y="30" width="20" height="140" />
      <rect x="30" y="90" width="140" height="20" />
      +
    </svg>
  )
}

interface PowerProps {
  power?: 'on' | 'off',
}

export const Power: React.FC<PowerProps> = React.memo((props) => {
  return (
    <svg className={['icon', 'power', props.power].join(' ')} viewBox="0 0 50 50">
      <path d="
      M 25,10 25,30
      M 20,18 A12 12 0 1 0 30,18
      " />
      Power
    </svg >
  )
})

export const Record: React.FC = () => {
  return (
    <svg className="icon fill" viewBox="0 0 200 200">
      <circle r="60" cx="100" cy="100" />
      ⏺
    </svg>
  )
}

export const Rewind: React.FC = () => {
  return (
    <svg className="icon fill" viewBox="0 0 200 200">
      <g transform="rotate(180, 100, 100)">
        <path d="
        M 40,60 l60,40 l-60,40 z
        M 100,60 l60,40 l-60,40 z
        " />
      </g>
      ⏪
    </svg>
  )
}

export const Stop: React.FC = () => {
  return (
    <svg className="icon fill" viewBox="0 0 200 200">
      <rect x="40" y="40" height="120" width="120" />
      ⏹
    </svg>
  )
}

export const TV: React.FC = () => {
  return (
    <svg className="icon tv" viewBox="0 0 200 200">
      <rect x="20" y="55" width="160" height="90" rx="5" ry="5" />
      <path d="M 40,160 h120" />
      TV
    </svg>
  )
}

interface TextProps {
  value: string,
}

export const Text: React.FC<TextProps> = React.memo((props) => {
  const ref = React.createRef<SVGSVGElement>();
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const isNum = isNaN(parseInt(props.value));
    const el = ref.current!;
    const t = el.querySelector("text")!;
    t.style.fontSize = el.clientWidth / (isNum ? 6: 2) + 'px';
  })
  return (
    <svg className="icon num1" viewBox="0 0 50 50" ref={ref}>
      <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle">{props.value}</text>
      {props.value}
    </svg >
  )
})

export const Vacuum: React.FC = () => {
  return (
    <svg className="icon vacuum" viewBox="0 0 200 200">
      <circle r="80" cx="100" cy="100" />
      <path d="M35,100 A60 60 1 0 1 165,100" />
      <circle r="50" cx="100" cy="100" />
      <circle r="25" cx="100" cy="100" />
    </svg>
  );
}

