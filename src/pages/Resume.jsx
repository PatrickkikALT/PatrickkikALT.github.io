import { GraduationCap, Languages, Mail, MapPin, Moon, Phone, UserRound } from 'lucide-react';
import { experience, skills } from '../data/resume';
import { useLanguage } from '../context/LanguageContext';
import { ResumeSection } from '../components/ResumeSection';

export function Resume() {
  const { lang, t } = useLanguage();
  const localized = (value) => (typeof value === 'string' ? value : value[lang]);

  return (
    <section className="resume-shell">
      <div className="resume-hero">
        <img src="/assets/avatar.png" alt={t('common.name')} />
        <div>
          <h1>{t('common.name')}</h1>
          <p>{t('resume.subtitle')}</p>
        </div>
      </div>

      <div className="resume-contact">
        <a href="tel:0682798379"><Phone size={17} /> 06 82798379</a>
        <a href="mailto:pa.kikkert@gmail.com"><Mail size={17} /> pa.kikkert@gmail.com</a>
        <span><Moon size={17} /> 17 {t('resume.birthMonth')} 2007</span>
      </div>

      <ResumeSection title={t('resume.aboutMe')} icon={UserRound}>
        <p>{t('resume.aboutP1')}</p>
        <p>{t('resume.aboutP2')}</p>
      </ResumeSection>

      <ResumeSection title={t('resume.skills')} icon={Languages}>
        <div className="skills-grid">
          {skills.map((skill) => (
            <article className="skill-card" key={localized(skill.title)}>
              <h3>{localized(skill.title)}</h3>
              <p>{skill[lang]}</p>
            </article>
          ))}
        </div>
      </ResumeSection>

      <ResumeSection title={t('resume.workEducation')} icon={GraduationCap}>
        <div className="timeline">
          {experience.map((item) => (
            <article key={localized(item.title)}>
              <h3>{localized(item.title)}</h3>
              <p><strong>{localized(item.label)}:</strong> {item.place}</p>
              <p>{item[lang]}</p>
            </article>
          ))}
        </div>
      </ResumeSection>

      <ResumeSection title={t('resume.hobbies')} icon={MapPin}>
        <p>{t('resume.hobbiesP1')}</p>
        <p>{t('resume.hobbiesP2')}</p>
        <p>{t('resume.hobbiesP3')}</p>
      </ResumeSection>
    </section>
  );
}
