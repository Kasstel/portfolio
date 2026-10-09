import { SectionHead } from '../components/ui/SectionHead';
import { Panel } from '../components/ui/Panel';
import { ReelCanvas } from '../components/hero/ReelCanvas';
import { WorkCard } from '../components/works/WorkCard';
import styles from './Projects.module.css';

export function Projects() {
  return (
    <>
      {/* ─── REEL ─── */}
      <section className={styles.section} id="reel-section">
        <SectionHead
          index="02"
          title="My Mind"
          jp="リール / デモ映像"
          rightTop="DURATION 00:00:42 · HEVC 4K"
          rightBottom="TAKE № 017 of 024"
        />

        <Panel label="CH_01 / MAIN_FEED" labelRight="LIVE" className={styles.reel}>
          {/* Video slot — replace canvas with <video> when ready */}
          <ReelCanvas />

          <div className={styles.cornerBrackets}><i /></div>

          <div className={styles.reelOverlay}>
            <div className={styles.rTop}>
              <span className={styles.rec}>REC · 00:00:42</span>
              <span>TC 01:14:22:08 · 24p</span>
            </div>
            <div>
              <div className={styles.rBig}>ПОТОК МЫСЛЕЙ</div>
              <div className={styles.rSub}>42 СЕКУНДЫ // 6 ПРОЕКТОВ // ОДИН ПОТОК</div>
            </div>
            <div className={styles.rBot}>
              <span>LENS 35mm · f/1.4</span>
              <span>ISO 1600 · WB 3200K</span>
              <span>GPS +54.71, +55.94</span>
            </div>
          </div>
        </Panel>
      </section>

      {/* ─── WORKS ─── */}
      <section className={styles.section} id="works">
        <SectionHead
          index="03"
          title="WORKS.DB"
          jp="作品 / 事例集"
          rightTop="QUERY: ALL · 3 RESULTS"
          rightBottom="SORT: REVERSE-CHRONOLOGICAL"
        />

        <div className={styles.works}>
          <WorkCard index={0} size="md" number="№ 001" year="2025" caseLabel="CASE-A"
            title="KYARDA"
            description="Коммерческий сайт для производителя пиломатериалов «Кьярда»"
            tags={['REACT', 'REST API', 'CRM', 'LIVE ↗']}
            videoSrc="/works/kyarda.mp4"
            href="https://kasstel.github.io/Kyarda/"
          />
          <WorkCard index={1} size="md" number="№ 002" caseLabel="CASE-B"
            title="LOVE MAP"
            description="Интерактивная карта совместных воспоминаний для пары: метки с фото и категориями, счётчик дней вместе и два связанных аккаунта по инвайт-коду."
            tags={['MAP', 'PHOTO', 'INVITE-CODE']}
            videoSrc="/works/loveMap.mp4"
            href="https://kasstel.github.io/LoveMap/"
          />
          <WorkCard index={2} size="md" number="№ 003" year="2024" caseLabel="CASE-C"
            title="SKILLSWAP"
            description="SPA-платформа для обмена навыками: фильтрация, аутентификация, система заявок. Тимлид команды из 11 разработчиков, MVP за 3 недели."
            tags={['REACT', 'TS', 'FSD']}
            videoSrc="/works/skillswap.mp4"
            href="https://kasstel.github.io/SkillSwap/"
          />
        </div>
      </section>
    </>
  );
}
