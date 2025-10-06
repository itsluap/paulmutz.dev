import Section from './Section'
import styles from './WorkClean.module.css'

const work = [
  {
    title: 'FiveM Server Framework',
    period: '2021 - Present',
    description: 'Built a complete multiplayer game server from scratch. Custom framework, Lua scripts, economy systems, admin tools. Handles 100+ concurrent players.',
    tech: ['Lua', 'Svelte', 'MySQL', 'JavaScript']
  },
  {
    title: 'Web Applications',
    period: '2020 - Present',
    description: 'Full-stack applications using React, Next.js, and Firebase. Real-time features, authentication, databases, deployment.',
    tech: ['React', 'Next.js', 'Firebase', 'TypeScript', 'Node.js']
  },
  {
    title: 'Mobile Development',
    period: '2022',
    description: 'Experimented with cross-platform mobile development. Built a Tinder clone to learn Flutter and Dart.',
    tech: ['Flutter', 'Dart', 'Firebase']
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
