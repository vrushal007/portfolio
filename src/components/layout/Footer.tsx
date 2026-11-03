export default function Footer() {
  return (
    <footer
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "0.5rem",
        padding: "1.5rem 1.5rem 2rem",
        opacity: 0.5,
        fontSize: "0.85rem",
      }}
    >
      <span>© {new Date().getFullYear()} Vrushal Patel</span>
      <span>Built with Next.js + GSAP</span>
    </footer>
  );
}
