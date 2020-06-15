import React, {useEffect} from 'react';
import styles from './Icons.module.scss';

export const AV: React.FC = () => {
  return (
    <svg className={`${styles.icon} ${styles.av}`} viewBox="0 0 200 200">
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
    <svg className={`${styles.icon} ${styles.aircon1}`} viewBox="0 0 200 200">
      <rect x="10" y="75" width="180" height="50" rx="5" ry="5" />
      <path d="m 170,115 h10" />
      <path d="M20,125 v5 A5 5 0 0 0 25,135 H175 A5 5 0 0 0 180,130 v-5" />
      AC1
    </svg>
  );
}

export const AirCon2: React.FC = () => {
  return (
    <svg className={`${styles.icon} ${styles.av}`} viewBox="0 0 200 200">
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
    <svg className={`${styles.icon} ${styles.airpurifier}`} viewBox="0 0 200 200">
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
    <svg className={`${styles.icon} ${styles.audio}`} viewBox="0 0 200 200">
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
    <svg className={`${styles.icon} ${styles.fill}`} viewBox="0 0 200 200">
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
    <svg className={`${styles.icon} ${styles.fill}`} viewBox="0 0 200 200">
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
    <svg className={`${styles.icon} ${styles.curtain}`} viewBox="0 0 200 200">
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
    <svg className={`${styles.icon} ${styles.fill}`} viewBox="0 0 200 200">
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
    <svg className={`${styles.icon} ${styles.fill}`} viewBox="0 0 200 200">
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
    <svg className={`${styles.icon} ${styles.etc}`} viewBox="0 0 200 200">
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
    <svg className={`${styles.icon} ${styles.fill}`} viewBox="0 0 200 200">
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
    <svg className={`${styles.icon} ${styles.fan}`} viewBox="0 0 200 200">
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
      Fan
    </svg>
  );
}

export const Light: React.FC = () => {
  return (
    <svg className={`${styles.icon} ${styles.light}`} viewBox="0 0 200 200">
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
    <svg className={`${styles.icon} ${styles.fill}`} viewBox="0 0 200 200">
      <rect x="30" y="90" width="140" height="20" />
      -
    </svg>
  )
}

export const Pause: React.FC = () => {
  return (
    <svg className={`${styles.icon} ${styles.fill}`} viewBox="0 0 200 200">
      <rect x="60" y="40" height="120" width="20" />
      <rect x="120" y="40" height="120" width="20" />
      ⏸
    </svg>
  )
}

export const Play: React.FC = () => {
  return (
    <svg className={`${styles.icon} ${styles.fill}`} viewBox="0 0 200 200">
        <path d="
        M 40,40 L160,100 L40,160 z
        " />
      ▶
    </svg>
  )
}


export const Plus: React.FC = () => {
  return (
    <svg className={`${styles.icon} ${styles.fill}`} viewBox="0 0 200 200">
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
    <svg className={[styles.icon, styles.power, styles[props!.power as string]].join(' ')} viewBox="0 0 50 50">
      <path d="
      M 25,8 25,28
      M 20,16 A12 12 0 1 0 30,16
      " />
      Power
    </svg >
  )
})

export const Record: React.FC = () => {
  return (
    <svg className={`${styles.icon} ${styles.fill}`} viewBox="0 0 200 200">
      <circle r="60" cx="100" cy="100" />
      ⏺
    </svg>
  )
}

export const Rewind: React.FC = () => {
  return (
    <svg className={`${styles.icon} ${styles.fill}`} viewBox="0 0 200 200">
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
    <svg className={`${styles.icon} ${styles.fill}`} viewBox="0 0 200 200">
      <rect x="40" y="40" height="120" width="120" />
      ⏹
    </svg>
  )
}

export const TV: React.FC = () => {
  return (
    <svg className={`${styles.icon} ${styles.tv}`} viewBox="0 0 200 200">
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
    const el = ref.current!;
    const t = el.querySelector("text")!;
    t.style.fontSize = el.clientWidth / 6 + 'px';
  })
  return (
    <svg className={`${styles.icon} ${styles.text}`} viewBox="0 0 50 50" ref={ref}>
      <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle">{props.value}</text>
      {props.value}
    </svg >
  )
})

export const Robot: React.FC = () => {
  return (
    <svg className={`${styles.icon} ${styles.robot}`} viewBox="0 0 200 200">
      <circle r="80" cx="100" cy="100" />
      <path d="M35,100 A60 60 1 0 1 165,100" />
      <circle r="50" cx="100" cy="100" />
      <circle r="25" cx="100" cy="100" />
      Robot
    </svg>
  );
}

export const Gear: React.FC = () => {
  return (
    <svg className={[styles.icon, styles.gear].join(" ")} viewBox="0 0 200 200">
      <g strokeWidth="30">
        <circle r="40" cx="100" cy="100" />
        <path d="
          M100,60 v-30
          M100,140 v30
          M60,100 h-30
          M140,100 h30
        " />
        <g transform="rotate(45, 100, 100)">
          <path d="
            M100,60 v-30
            M100,140 v30
            M60,100 h-30
            M140,100 h30
          " />
        </g>
      </g>
      Gear
    </svg>
  );
};

export const Timer: React.FC = () => {
  return (
    <svg className={`${styles.icon} ${styles.robot}`} viewBox="0 0 200 200">
      <circle r="60" cx="100" cy="110" />
      <path d="
        M70,30 h60
        M100,100 v-30
      " />
      <g transform="rotate(45, 100, 110)">
        <path d="
        M 100,50 v-20
        " />
      </g>
      Timer
    </svg>
  );
}

const Arrow: React.FC = () => {
  return (
    <path
    d="
      M 40,130 h120
      Q 165 130 161.6 124.5
      L 102,50
      Q 100 47.5 98 50
      L 38,125
      Q 35 130 40 130
    " />
  );
};

export const ArrowTop: React.FC = () => {
  return (
    <svg className={[styles.icon, styles.arrowtop, styles.fill].join(" ")} viewBox="0 0 200 200">
      <Arrow />
      ArrowTop
    </svg>
  );
};

export const ArrowBottom: React.FC = () => {
  return (
    <svg className={[styles.icon, styles.arrowbottom, styles.fill].join(" ")} viewBox="0 0 200 200">
      <g transform="rotate(180, 100, 100)">
        <Arrow />
      </g>
      ArrowBottom
    </svg>
  );
};

export const ArrowRight: React.FC = () => {
  return (
    <svg className={[styles.icon, styles.arrowright, styles.fill].join(" ")} viewBox="0 0 200 200">
      <g transform="rotate(90, 100, 100)">
        <Arrow />
      </g>
      ArrowRight
    </svg>
  );
};

export const ArrowLeft: React.FC = () => {
  return (
    <svg className={[styles.icon, styles.arrowleft, styles.fill].join(" ")} viewBox="0 0 200 200">
      <g transform="rotate(270, 100, 100)">
        <Arrow/>
      </g>
      ArrowLeft
    </svg>
  );
};

export const LightUp: React.FC = () => {
  return (
    <svg className={[styles.icon, styles.lightup].join(" ")} viewBox="0 0 200 200">
      <circle r="30" cx="100" cy="100"/>
      <path d="
        M 100,50
        v-30
        M 100,150
        v30
      " />
      <g transform="rotate(45, 100, 100)">
        <path d="
          M 100,50
          v-30
          M 100,150
          v30
        " />
      </g>
      <g transform="rotate(90, 100, 100)">
        <path d="
          M 100,50
          v-30
          M 100,150
          v30
        " />
      </g>
      <g transform="rotate(135, 100, 100)">
        <path d="
          M 100,50
          v-30
          M 100,150
          v30
        " />
      </g>
      LightUp
    </svg>
  );
};

export const LightDown: React.FC = () => {
  return (
    <svg className={[styles.icon, styles.lightdown].join(" ")} viewBox="0 0 200 200">
      <circle r="30" cx="100" cy="100"/>
      <path d="
        M 100,50
        v-10
        M 100,150
        v10
      " />
      <g transform="rotate(45, 100, 100)">
        <path d="
          M 100,50
          v-10
          M 100,150
          v10
        " />
      </g>
      <g transform="rotate(90, 100, 100)">
        <path d="
          M 100,50
          v-10
          M 100,150
          v10
        " />
      </g>
      <g transform="rotate(135, 100, 100)">
        <path d="
          M 100,50
          v-10
          M 100,150
          v10
        " />
      </g>
      LightDown
    </svg>
  );
};

export const Blast: React.FC = () => {
  return (
    <svg className={[styles.icon, styles.blast].join(" ")} viewBox="0 0 200 200">
      <path d="
        M 50,80 h50 a 15 15 1 1 0 -15,-15
        M 50,100 h90 a 15 15 1 1 0 -15,-15
        M 50,120 h75 a 15 15 1 1 1 -15,15
      " />
      Blast
    </svg>
  );
};

export const ModeAuto: React.FC = () => {
  return (
    <svg className={[styles.icon, styles.modeauto, styles.fill].join(" ")} viewBox="0 0 200 200">
      <path d="
        M45 45 v100 h-10 v-70 h-10 z
        M45 155 h100 v10 h-70 v10 z
        M155 155 v-100 h10 v70 h10 z
        M155 45 h-100 v-10 h70 v-10 z
      " />
      ModeAuto
    </svg>
  );
};

export const Option: React.FC = () => {
  return (
    <svg className={[styles.icon, styles.option, styles.fill].join(" ")} viewBox="0 0 200 200">
      <circle r="10" cx="70" cy="100" />
      <circle r="10" cx="100" cy="100" />
      <circle r="10" cx="130" cy="100" />
      Options
    </svg>
  );
};

export const Home: React.FC = () => {
  return (
    <svg className={[styles.icon, styles.home].join(" ")} viewBox="0 0 200 200">
      <path d="
        M50 60 v100 h100 v-100 L100,40 z
      " />
      <path d="
        M90,160 v-40 h20 v40 z
      " fillOpacity="1"/>
      Home
    </svg>
  );
};

export const Subtitle: React.FC = () => {
  return (
    <svg className={[styles.icon, styles.home].join(" ")} viewBox="0 0 200 200">
      <rect x="30" y="50" width="140" height="100" rx="5" ry="5" />
      <circle r="7" cx="70" cy="120" fillOpacity="1" />
      <circle r="7" cx="100" cy="120" fillOpacity="1" />
      <circle r="7" cx="130" cy="120" fillOpacity="1" />
      Subtitle
    </svg>
  );
};

const Color: React.FC = () => {
  return (
    <rect x="50" y="50" width="100" height="100" rx="10" ry="10" />
  );
};

export const ColorBlue: React.FC = () => {
  return (
    <svg className={[styles.icon, styles.blue, styles.fill].join(" ")} viewBox="0 0 200 200">
      <Color />
      ColorBlue
    </svg>
  );
};

export const ColorYellow: React.FC = () => {
  return (
    <svg className={[styles.icon, styles.yellow, styles.fill].join(" ")} viewBox="0 0 200 200">
      <Color />
      ColorYellow
    </svg>
  );
};

export const ColorRed: React.FC = () => {
  return (
    <svg className={[styles.icon, styles.red, styles.fill].join(" ")} viewBox="0 0 200 200">
      <Color />
      ColorRed
    </svg>
  );
};

export const ColorGreen: React.FC = () => {
  return (
    <svg className={[styles.icon, styles.green, styles.fill].join(" ")} viewBox="0 0 200 200">
      <Color />
      ColorGreen
    </svg>
  );
};

export const Mute: React.FC = () => {
  return (
    <svg className={[styles.icon, styles.mute].join(" ")} viewBox="0 0 200 200">
      <path d="
      M40,80 h30 l30,-30 v100 l-30,-30 h-30 z
      " fillOpacity="1" />
      <path d="
      M130,80 l40,40
      M130,120 l40,-40
      " />
      Mute
    </svg>
  );
};

export const Schedule: React.FC = () => {
  return (
    <svg className={[styles.icon, styles.schedule].join(" ")} viewBox="0 0 200 200">
      <rect x="25" y="50" width="150" height="100" />
      <path d="
      M75,50 v100
      M125,50 v100
      M25,117 h50
      M75,88 h50
      M125,117 h50
      " />
      Schedule
    </svg>
  );
};

export const Input: React.FC = () => {
  return (
    <svg className={[styles.icon, styles.input].join(" ")} viewBox="0 0 200 200">
      <path d="
      M30,80
      v-30
      a 10 10 0 0 1 10 -10
      h120
      a 10 10 0 0 1 10 10
      v100
      a 10 10 0 0 1 -10 10
      h-120
      a 10 10 0 0 1 -10 -10
      v-30
      " />
      <path d="
        M30,97.5 h80 v-10 L140,100 L110,112.5 v-10 h-80 z
      " fillOpacity="1"/>
      Input
    </svg>
  );
};

export const SelectAudio: React.FC = () => {
  return (
    <svg className={[styles.icon, styles.selectaudio].join(" ")} viewBox="0 0 200 200">
      <path d="
      M 80,150
      L 100,170 L120,150
      M 80,150
      h -30
      a 10 10 0 0 1 -10 -10
      v -80
      a 10 10 0 0 1 10 -10
      h 100
      a 10 10 0 0 1 10 10
      v 80
      a 10 10 0 0 1 -10 10
      h -30
      M 60,90 h80
      M 60,110 h50
      " />
      SelectAudio
    </svg>
  );
};

export const Return: React.FC = () => {
  return (
    <svg className={[styles.icon, styles.return, styles.fill].join(" ")} viewBox="0 0 200 200">
      <path d="
        M70,90 v15 l-30,-20 l30,-20 v15 h60
        a 30 30 0 1 1 0 60
        h-60 v-10 h60
        a 20 20 0 1 0 0 -40 z
      " />
      Return
    </svg>
  );
};

export const LightAll: React.FC = () => {
  return (
    <svg className={[styles.icon, styles.lightall].join(" ")} viewBox="0 0 200 200">
      <path d="
        M90,65 h20
        M90,75 h 20 v10 a 25 25 0 1 1 -20 0 z
      " />
      <circle r="2" cx="100" cy="147" fillOpacity="1" />
      <circle r="2" cx="125" cy="140" fillOpacity="1" />
      <circle r="2" cx="135" cy="120" fillOpacity="1" />
      <circle r="2" cx="75" cy="140" fillOpacity="1" />
      <circle r="2" cx="65" cy="120" fillOpacity="1" />
      Return
    </svg>
  );
};

export const LightNight: React.FC = () => {
  return (
    <svg className={[styles.icon, styles.lightnight, styles.fill].join(" ")} viewBox="0 0 200 200">
      <path d="
        M 90,50
        a 50 50 0 1 0 60 60
        a 30 30 0 0 1 -60 -60
      " />
      Return
    </svg>
  );
};

export const LightFavorite: React.FC = () => {
  return (
    <svg className={[styles.icon, styles.lightfavorite, styles.fill].join(" ")} viewBox="0 0 200 200">
      <path d="
        M 100,35
        L 145,160
        L 35,75
        L 165,75
        L 55,160 z
      " />
      Return
    </svg>
  );
};

export const Dry: React.FC = () => {
  return (
    <svg className={[styles.icon, styles.dry, styles.fill].join(" ")} viewBox="0 0 200 200" fillRule="evenodd">
      <path d="
        M 100, 30
        Q 50 70,50 120
        a 50 50 0 1 0 100 0
        Q 150 70,100 30
        z
        M 90,160
        a 40 40 0 0 1 -30 -30
        a 2 2 0 0 1 5 0
        a 35 35 0 0 0 25 25
        a 2 2 0 0 1 0 5
        z
      "/>
      Eco
    </svg>
  );
};

export const Broadcast: React.FC = () => {
  return (
    <svg className={[styles.icon, styles.cool].join(" ")} viewBox="0 0 200 200" >
      <path d="
        M170,100
        v50
        a 10 10 0 0 1 -10 10
        h-120
        a 10 10 0 0 1 -10 -10
        v-100
        a 10 10 0 0 1 10 -10
        h70
        M167.5,37.5
        a 3 3 0 0 0 3 3
        M 147.5,37.5
        a 25 25 0 0 0 25 25
        M 127.5,37.5
        a 45 45 0 0 0 45 45
      " />
      Broadcast
    </svg>
  );
};

export const Cool: React.FC = () => {
  return (
    <svg className={[styles.icon, styles.cool].join(" ")} viewBox="0 0 200 200" >
      <path d="
        M100,50
        v100
        M50,100
        h100
      " />
      <g transform="rotate(45, 100, 100)">
        <path d="
          M 60,85
          h 25 v-25
          M 115,60
          v 25 h 25
          M 115,140
          v -25 h 25
          M 60,115
          h 25 v 25
        " />
      </g>
      Cool
    </svg>
  );
};

export const Warm: React.FC = () => {
  return (
    <svg className={[styles.icon, styles.fan, styles.fill].join(" ")} viewBox="0 0 200 200" fillRule="evenodd">
      <path d="
        M 70,70
        a 60 60 0 1 0 60 0
        M 70,70
        a 40 40 0 0 0 10 50
        A 100 100 0 0 1 110 30
        A 30 30 0 0 0 130 70
        M 58 157
        a 54 54 0 1 0 60 -85
        a 60 60 0 0 1 -20 70
        a 40 40 0 0 0 0 -20
        A 60 60 0 0 1 58 157
      " />
      Warm
    </svg>
  );
};

export const Eco: React.FC = () => {
  return (
    <svg className={[styles.icon, styles.eco, styles.fill].join(" ")} viewBox="0 0 200 200" >
      <path d="
        M 90 70
        Q 133 109,160 160
        Q 60 160, 50 60
        Q 47 48, 40 40
        Q 190 50, 162 159
        Q 110 70, 70 70
      " />
      Eco
    </svg>
  );
};

export const Tool: React.FC = () => {
  return (
    <svg className={[styles.icon, styles.setting].join(" ")} viewBox="0 0 200 200" >
      <path d="
        M 70 150
        a 10 10 0 0 1 -20 -20
        l 50 -50
        a 30 30 0 0 1 45 -35
        l -20 20
        a 5 5 0 1 0 10 10
        l 20 -20
        a 30 30 0 0 1 -35 45
        l -50 50
      " />
      Tool
    </svg>
  );
};

