const Footer = () => (
  <footer className="border-t border-border py-12">
    <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="text-xl font-bold">
        web<span className="text-gradient">craft</span>
      </div>
      <div className="flex gap-6 text-sm text-muted-foreground">
        <a href="#layanan" className="hover:text-foreground transition-colors">Layanan</a>
        <a href="#portfolio" className="hover:text-foreground transition-colors">Portfolio</a>
        <a href="#proses" className="hover:text-foreground transition-colors">Proses</a>
        <a href="#testimoni" className="hover:text-foreground transition-colors">Testimoni</a>
      </div>
      <p className="text-xs text-muted-foreground">© 2026 webcraft. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
