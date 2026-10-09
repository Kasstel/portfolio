import { Panel } from '../components/ui/Panel';
import { TermButton } from '../components/ui/TermButton';
import { Typewriter } from '../components/ui/Typewriter';
import { PortraitCanvas } from '../components/hero/PortraitCanvas';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section className={styles.section} id="hero">
      <div className={styles.hero}>

        {/* ─── PORTRAIT (left column) ─── */}
        <Panel label="SUBJECT.PORTRAIT" labelRight="A-034" className={styles.portrait}>
          {/* Drop your photo at /public/portrait.jpg */}
          <PortraitCanvas className={styles.canvas} src="/portrait.jpg" />
          <img
            src="/portrait.jpg"
            alt=""
            className={styles.portraitPhoto}
            draggable={false}
          />
          <div className={styles.portraitMeta}>
            <div className={styles.metaRow}>
              <span>ASCII-SCAN/v2</span>
              <span>REC ●</span>
            </div>
            <div className={styles.metaRow}>
              <span>LOCK: <span className="hi">ACQUIRED</span></span>
              <span>85.2%</span>
            </div>
          </div>
        </Panel>

        {/* ─── MAIN (center column) ─── */}
        <Panel label="IDENT / 001" labelRight="CLASSIFIED" className={styles.main}>
          <div className={styles.hId}>
            <Typewriter text="// DOSSIER — FRONTEND OPERATIVE" delay={0} />
          </div>

          <h1 className={styles.h1}>
            <span className="glitchable">Лунев</span>
            <br />
            <span className="glitchable">Никита</span>
            <span className={styles.jp}>FRONTEND-РАЗРАБОТЧИК</span>
          </h1>

          <p className={styles.sub}>
            <Typewriter
              text="Я — frontend-разработчик, который смотрит на задачу с трёх сторон — бизнеса, кода и пользователя. Быстро вникаю в новый проект и чужой код, легко подстраиваюсь под стек и процессы команды, с вниманием к деталям интерфейса и чувством стиля. За плечами — коммерческий опыт, руководство командой из 11 человек и собственный продукт, который веду от идеи до запуска."
              delay={1200}
            />
          </p>

          <div className={styles.stats}>
            <div><span className={styles.k}>TG</span></div>
            <div className={styles.v}>@kasstel03</div>

            <div><span className={styles.k}>ROLE</span></div>
            <div className={styles.v}>FRONTEND · DEVELOPER</div>

            <div><span className={styles.k}>STATUS</span></div>
            <div className={styles.v}>
              <span style={{ color: 'var(--green)' }}>● AVAILABLE FOR CONTRACT</span>
            </div>

            <div><span className={styles.k}>LOCATION</span></div>
            <div className={styles.v}>55.7543°N / 37.6191°E (г.Москва)</div>
          </div>

          <div className={styles.cta}>
            <TermButton href="#works">Посмотреть работы</TermButton>
            <TermButton href="#contact">Перейти к контактам</TermButton>
            <TermButton href="https://github.com/Kasstel" external>Открыть профиль github↗</TermButton>
          </div>
        </Panel>

        {/* ─── SIDE (right column) ─── */}
        <div className={styles.side}>
          <Panel label="VITALS" className={styles.sideBlock}>
            <h4 className={styles.sideTitle}>SYS // VITALS</h4>
            <div className={styles.row}><span>Время работы</span><b>03y 142d</b></div>
            <div className={styles.row}><span>Проекты</span><b>42</b></div>
            <div className={styles.row}><span>Коммиты</span><b>1,248</b></div>
            <div className={styles.row}><span>Кофе</span><b>Значительное количество</b></div>
            <div className={styles.row}><span>Вероятность багов</span><b>LOW</b></div>
          </Panel>

          <Panel label="SIGNAL" className={styles.sideBlock}>
            <h4 className={styles.sideTitle}>BROADCAST</h4>
            <pre className={styles.ascii}>{`  ▓░▓░▓░▓░▓░▓░▓░
  ░▓░▓░▓░▓░▓░▓░▓
  ▓░  > listening >
  ░▓  > for signal >
  ▓░▓░▓░▓░▓░▓░▓░▓`}</pre>
            <div className={styles.freq}>FREQ 88.1 / CH.03</div>
          </Panel>
        </div>

      </div>
    </section>
  );
}
