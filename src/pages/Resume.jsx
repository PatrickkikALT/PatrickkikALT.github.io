import { useEffect, useState } from 'react';
import { GraduationCap, Languages, Mail, MapPin, Moon, Phone, UserRound } from 'lucide-react';
import { experience, skills } from '../data/resume';
import { ResumeSection } from '../components/ResumeSection';

export function Resume() {
  const [lang, setLang] = useState(() => localStorage.getItem('site-lang') || 'en');
  const t = (value) => (typeof value === 'string' ? value : value[lang]);

  useEffect(() => {
    localStorage.setItem('site-lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <section className="resume-shell">
      <div className="resume-hero">
        <img src="/assets/avatar.png" alt="Patrick Kikkert" />
        <div>
          <h1>Patrick Kikkert</h1>
          <p>{lang === 'nl' ? 'Programmeur & Creative Developer' : 'Programmer & Creative Developer'}</p>
        </div>
        <div className="language-switch" aria-label="Resume language">
          <button type="button" className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
          <button type="button" className={lang === 'nl' ? 'active' : ''} onClick={() => setLang('nl')}>NL</button>
        </div>
      </div>

      <div className="resume-contact">
        <a href="tel:0682798379"><Phone size={17} /> 06 82798379</a>
        <a href="mailto:pa.kikkert@gmail.com"><Mail size={17} /> pa.kikkert@gmail.com</a>
        <span><Moon size={17} /> 17 {lang === 'nl' ? 'november' : 'November'} 2007</span>
      </div>

      <ResumeSection title={lang === 'nl' ? 'Over mij' : 'About me'} icon={UserRound}>
        <p>{lang === 'nl' ? "Mijn naam is Patrick Kikkert. Ik ben een C# programmeur met veel passie voor het maken van leuke en fijne programma's of games." : 'My name is Patrick Kikkert. I am a C# programmer with a strong passion for creating enjoyable applications and games.'}</p>
        <p>{lang === 'nl' ? 'Ik werk vooral in de backend en vind het belangrijk om dingen zo makkelijk mogelijk te maken voor klant of collega.' : 'I mainly work on backend development and focus on making things as easy as possible for clients and colleagues.'}</p>
      </ResumeSection>

      <ResumeSection title={lang === 'nl' ? 'Vaardigheden' : 'Skills'} icon={Languages}>
        <div className="skills-grid">
          {skills.map((skill) => (
            <article className="skill-card" key={t(skill.title)}>
              <h3>{t(skill.title)}</h3>
              <p>{skill[lang]}</p>
            </article>
          ))}
        </div>
      </ResumeSection>

      <ResumeSection title={lang === 'nl' ? 'Werk en Studie ervaring' : 'Work & Education'} icon={GraduationCap}>
        <div className="timeline">
          {experience.map((item) => (
            <article key={t(item.title)}>
              <h3>{t(item.title)}</h3>
              <p><strong>{t(item.label)}:</strong> {item.place}</p>
              <p>{item[lang]}</p>
            </article>
          ))}
        </div>
      </ResumeSection>

      <ResumeSection title={lang === 'nl' ? "Hobby's" : 'Hobbies'} icon={MapPin}>
        <p>{lang === 'nl' ? 'Mijn grootste hobby is gamen, specifiek Rhythm en Arcade Rhythm Games.' : 'My biggest hobby is gaming, especially rhythm and arcade rhythm games.'}</p>
        <p>{lang === 'nl' ? 'Daarnaast vind ik astrofotografie heel leuk, en ben ik veel bezig met reverse engineering.' : 'I also enjoy astrophotography and spend a lot of time on reverse engineering projects.'}</p>
        <p>{lang === 'nl' ? 'Ik vind het heel rustgevend en fijn om te wandelen, vooral bergwandelingen in mooie omgevingen buiten Nederland, zoals Scandinavië of Duitsland.' : 'I find walking very relaxing, especially mountain hikes in scenic areas outside the Netherlands, like Scandinavia or Germany.'}</p>
      </ResumeSection>
    </section>
  );
}
