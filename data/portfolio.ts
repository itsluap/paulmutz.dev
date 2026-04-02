export interface Project {
  title: string
  year: string
  description: string
  tech: string[]
  codeExample: string
  links?: { label: string; url: string }[]
}

export const codeSnippets: Record<string, string> = {
  victron: `# Victron Energy Systems
def monitor_battery_state():
    data = {
        'voltage': read_victron_voltage(),
        'current': read_victron_current(),
        'soc': calculate_soc(),
        'temp': read_temperature()
    }

    mqtt_client.publish('bess/state', data)
    optimize_charging(data)`,
  react: `// Real-time hook with Firebase
const useRealtimeData = (path) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const ref = database.ref(path)
    ref.on('value', (snapshot) => {
      setData(snapshot.val())
    })
    return () => ref.off()
  }, [path])

  return data
}`,
  lua: `-- FiveM Server Framework
local Framework = {}
Framework.Players = {}

function Framework:RegisterPlayer(source, data)
    self.Players[source] = {
        id = source,
        name = data.name,
        money = data.money or 0,
        inventory = data.inventory or {}
    }
    TriggerClientEvent('framework:playerLoaded', source)
end`
}

export const projects: Project[] = [
  {
    title: 'Victron Energy Systems',
    year: '2024-Present',
    description: 'Systems integration at Alchemy Industrial. Built custom 48V energy systems, BMS bridges, thermal control, and edge monitoring with Grafana dashboards.',
    tech: ['Python', 'Node-RED', 'MQTT', 'Victron', 'Grafana'],
    codeExample: 'victron'
  },
  {
    title: 'Web Applications',
    year: '2020-Present',
    description: 'A mix of everything — built the Alchemy Industrial website and shop, personal projects, tools for friends, and a few business ideas that taught me more than they made. Each one sharpened the stack.',
    tech: ['React', 'Next.js', 'TypeScript', 'Firebase'],
    codeExample: 'react',
    links: [
      { label: 'Alchemy Industrial', url: 'https://alchemyindustrial.com' },
      { label: 'Alchemy Shop', url: 'https://shop.alchemyindustrial.com' }
    ]
  },
  {
    title: 'FiveM Server Framework',
    year: '2021-2023',
    description: 'Built custom multiplayer game server infrastructure. Developed Lua scripting framework, economy systems, and admin tools.',
    tech: ['Lua', 'JavaScript', 'Svelte', 'MySQL'],
    codeExample: 'lua',
    links: [
      { label: 'GitHub', url: 'https://github.com/itsluap/luap-server' },
      { label: 'Live Site', url: 'https://indigorp.net' }
    ]
  }
]

export const siteLinks = {
  github: 'https://github.com/itsluap',
  linkedin: 'https://www.linkedin.com/in/paul-mutz-494859275',
  email: 'paulmutzjr@icloud.com'
}

export const terminalContent = {
  neofetch: `\x1b[36m   ____             _   __  __       _
  |  _ \\ __ _ _   _| | |  \\/  |_   _| |_ ____
  | |_) / _\` | | | | | | |\\/| | | | | __|_  /
  |  __/ (_| | |_| | | | |  | | |_| | |_ / /
  |_|   \\__,_|\\__,_|_| |_|  |_|\\__,_|\\__/___|

\x1b[0m  Host:      Alchemy Industrial
  Role:      Developer & Systems Integrator
  Uptime:    5+ years building things
  Languages: Python, JS/TS, Lua
  Frameworks: React, Next.js, Node.js, Firebase
  Industrial: Node-RED, MQTT, Victron, Grafana
  Next:      CS degree (Fall 2026)
  Coffee:    ████████████████████ 99%`,

  aboutTxt: `Software Developer & Systems Integrator at Alchemy Industrial.
I bridge software and hardware — energy systems, web apps,
and whatever problem needs solving next.

Languages: Python, JavaScript/TypeScript, Lua
Industrial: Node-RED, MQTT, Victron, Grafana
Web: React, Next.js, Firebase, Node.js`,

  educationTxt: `Heading to college this fall for Computer Science.
Everything before that? Google, Stack Overflow, docs,
and a lot of trial and error.

Certification: Victron Energy Recommended Software Integrator`,

  hireResponse: `Permission granted.

...just kidding. But seriously, let's talk.

  Email:    paulmutzjr@icloud.com
  LinkedIn: linkedin.com/in/paul-mutz-494859275`,

  notFound: [
    "command not found. Try 'help' for available commands.",
    "command not found. I'm a portfolio, not a supercomputer.",
    "command not found. But I admire your curiosity.",
    "command not found. Try 'neofetch' for something cool.",
    "command not found. Have you tried Stack Overflow?",
    "command not found. Trust me, I've been there too.",
  ]
}
