import { SectionHead } from '../components/ui/SectionHead';
import { Panel } from '../components/ui/Panel';
import { RadarSvg } from '../components/hero/RadarSvg';
import { DraggableWindow } from '../components/ui/DraggableWindow';
import styles from './About.module.css';

const SKILLS = [
  { name: 'JavaScript', value: 95 },
  { name: 'TypeScript', value: 88 },
  { name: 'React', value: 90 },
  { name: 'Vue', value: 72 },
  { name: 'HTML / CSS', value: 96 },
  { name: 'SCSS / Tailwind', value: 90 },
  { name: 'Canvas / WebGL', value: 78 },
  { name: 'GSAP / Motion', value: 82 },
  { name: 'Node.js', value: 68 },
  { name: 'Git / CI', value: 85 },
  { name: 'Figma', value: 80 },
  { name: 'Three.js', value: 65 },
];

const TOOLS = ['vite', 'vscode', 'neovim', 'zsh', 'docker', 'eslint', 'prettier', 'pnpm', 'storybook', 'playwright', 'figma', 'linear'];

const TIMELINE = [
  { date: '2023—NOW', title: 'FREELANCE // FRONTEND', org: 'ФРИЛАНС · REMOTE', desc: 'Разработка SPA-приложений, корпоративных сайтов и лендингов под ключ. Проектирование архитектуры и UI с нуля, адаптивная и кроссбраузерная вёрстка, интеграция с backend по REST API.' },
  { date: '2025—2026', title: 'FRONTEND-РАЗРАБОТЧИК', org: 'Завод пиломатериалов «Кьярда» · Санкт-Петербург', desc: 'Разработал корпоративный сайт компании с нуля на React. Реализовал формы заявок с интеграцией в CRM через REST API, оптимизировал производительность, поддерживал и дорабатывал проект по обратной связи.' },
  { date: '2024—2025', title: 'FRONTEND-РАЗРАБОТЧИК / ТИМЛИД', org: 'SPA «Обмен навыками» · Москва', desc: 'Настроил проект с нуля (Vite + TypeScript + React, ESLint), выстроил архитектуру по FSD. Руководил командой из 11 разработчиков: распределял задачи, проводил код-ревью, контролировал архитектурные решения. Довёл MVP до публичного запуска за 3 недели (фильтрация, аутентификация, система заявок).' },
  { date: '2024—2025', title: 'ПРОДУКТОВЫЕ ПРОЕКТЫ', org: 'Москва', desc: 'Интернет-магазин (MVP) на чистом Vue: архитектура на паттернах MVP + Event-Driven, каталог, корзина, оформление заказа, интеграция по REST API. Конструктор бургеров: SPA с drag-and-drop, Redux Toolkit, real-time статусами заказов и защищёнными маршрутами.' },
  { date: '2026', title: 'ОБРАЗОВАНИЕ', org: 'МГТУ «СТАНКИН»', desc: 'Выпускник направления «Программная инженерия» профиль «Системный анализ программных комплексов»' },
];

const LOG_LINES = [
  { prefix: '$', text: 'tail -f ./transmission.txt', type: 'cmd' },
  { prefix: '', text: '[2026.04.20 09:12] session started', type: 'out' },
  { prefix: '', text: '[2026.04.20 09:14] scanning subject_034...', type: 'out' },
  { prefix: '', text: '[2026.04.20 09:14] 3 packages shipped this week', type: 'out', highlight: '3 packages' },
  { prefix: '', text: '[2026.04.20 09:15] commit 0x4a21f pushed → main', type: 'out', highlight: '0x4a21f' },
  { prefix: '', text: '[2026.04.20 09:17] coffee level 0x04 // nominal', type: 'out', highlight: '0x04' },
  { prefix: '', text: '[2026.04.20 09:22] lighthouse audit 98/100', type: 'out', highlight: '98/100' },
];

export function About() {
  return (
    <>
      {/* ─── SKILLS ─── */}
      <section className={styles.section} id="skills">
        <SectionHead
          index="04"
          title="STACK / SKILLS"
          jp="技能 / スタック"
          rightTop="LAST CALIBRATION: 2026.03.14"
          rightBottom="CONFIDENCE σ=0.91"
        />

        <div className={styles.skillsGrid}>
          {/* Skill bars */}
          <Panel label="CORE.STACK" className={styles.skillsPanel}>
            <div className={styles.skillsList}>
              {SKILLS.map(s => (
                <div key={s.name} className={styles.skillRow}>
                  <span className={styles.skillName}>{s.name}</span>
                  <span className="pbar" style={{ '--v': `${s.value}%` } as React.CSSProperties} />
                  <span className={styles.skillValue}>{s.value}</span>
                </div>
              ))}
            </div>
          </Panel>

          {/* Radar */}
          <Panel label="RADAR" labelRight="AUX" className={styles.skillsPanel} style={{ textAlign: 'center' }}>
            <RadarSvg />
          </Panel>

          {/* Toolchain */}
          <Panel label="TOOLCHAIN" className={styles.skillsPanel}>
            <h4 className="mono-xs" style={{ marginBottom: 10 }}>РАБОЧИЕ ИНСТРУМЕНТЫ</h4>
            <div className={styles.toolTags}>
              {TOOLS.map(t => (
                <span key={t} className={styles.toolTag}>{t}</span>
              ))}
            </div>
            <div className={styles.investigating}>
              <h4 className="mono-xs" style={{ marginBottom: 8 }}>СЕЙЧАС ИЗУЧАЮ</h4>
              <div className={styles.investList}>
                → шейдеры и SDF-графика<br />
                → связка Rust + WebAssembly<br />
                → процедурный звук (Web Audio)<br />
                → паттерны пространственного UI
              </div>
            </div>
          </Panel>
        </div>
      </section>

      {/* ─── TIMELINE ─── */}
      <section className={styles.section} id="timeline" style={{ position: 'relative' }}>
        <SectionHead
          index="05"
          title="Мой Путь"
          jp="経歴 / タイムライン"
          rightTop="Первый вход: 2023"
          rightBottom="Крайний: 2026"
        />

        <div className={styles.timeline}>
          {TIMELINE.map((entry, i) => (
            <div key={i} className={styles.tlEntry}>
              <div className={styles.tlDate}>{entry.date}</div>
              <div className={styles.tlBody}>
                <h4>{entry.title}</h4>
                <div className={styles.tlOrg}>{entry.org}</div>
                <div className={styles.tlDesc}>{entry.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <DraggableWindow title="~/log/transmission.txt">
          {LOG_LINES.map((ln, i) => (
            <div key={i} className={styles.wLine}>
              {ln.type === 'cmd' ? (
                <><span className={styles.pr}>$</span> <span className={styles.arg}>{ln.text.replace('$ ', '')}</span></>
              ) : (
                <span className={styles.out}>{ln.text}</span>
              )}
            </div>
          ))}
          <div className={styles.wLine}>
            <span className={styles.pr}>$</span> <span className="caret" />
          </div>
        </DraggableWindow>
      </section>
    </>
  );
}
