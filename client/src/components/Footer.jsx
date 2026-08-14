export default function Footer() {
  return (
    <footer>
      <div className="wrap footer-inner">
        <span className="fmuted">© {new Date().getFullYear()} Umar Iftikhar Abbasi. Built module by module.</span>
        <div className="footer-social">
          <a href="https://github.com/Umar-abbasi" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/umar-abbasi-f21605025" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="mailto:umarabbasi11811@gmail.com">Email</a>
        </div>
      </div>
    </footer>
  );
}
