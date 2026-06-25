export function ResumeSection({ title, icon: Icon, children }) {
  return (
    <section className="resume-section">
      <h2><Icon size={20} /> {title}</h2>
      {children}
    </section>
  );
}
