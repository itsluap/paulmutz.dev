import Section from './Section'
import styles from './WorkClean.module.css'

const work = [
  {
    title: 'Victron Energy Systems',
    period: '2024 - Present',
    description: 'Systems integration at Alchemy Industrial. Built custom 48V energy systems, BMS bridges, thermal control, and edge monitoring with Grafana dashboards.',
    tech: ['Python', 'Node-RED', 'MQTT', 'Victron', 'Grafana', 'Raspberry Pi']
  },
  {
    title: 'Web Applications',
    period: '2020 - Present',
    description: 'Full-stack applications using React, Next.js, and Firebase. Real-time features, authentication, databases, and deployment.',
    tech: ['React', 'Next.js', 'Firebase', 'TypeScript', 'Node.js']
  },
  {
    title: 'FiveM Server Framework',
    period: '2021 - 2023',
    description: 'Built a complete multiplayer game server from scratch. Custom framework, Lua scripts, economy systems, admin tools. Handles 100+ concurrent players.',
    tech: ['Lua', 'Svelte', 'MySQL', 'JavaScript']
  }
]

export default function WorkClean() {
  return (
    <Section id="work" title="Work">
      <div className={styles.timeline}>
        {work.map((item, index) => (
          <div key={index} className={styles.item}>
            <div className={styles.header}>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <span className={styles.period}>{item.period}</span>
            </div>
            <p className={styles.description}>{item.description}</p>
            <div className={styles.tech}>
              {item.tech.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
