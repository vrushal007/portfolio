export default function Section({
    id,
    title,
    children,
  }: {
    id: string;
    title: string;
    children: React.ReactNode;
  }) {
    return (
      <section id={id} className="section" style={{ padding: '4rem 1rem', minHeight: '100vh' }}>
        <h2 style={{ color: 'var(--primary)', textAlign: 'center' }}>{title}</h2>
        <div>{children}</div>
      </section>
    );
  }
  