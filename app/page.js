import { createClient } from "@supabase/supabase-js";
import WriteupViewer from "./components/WriteupViewer";
import CertificationViewer from "./components/CertificationViewer";
import GitHubProjectPreview from "./components/GitHubProjectPreview";
import ProjectDocumentViewer from "./components/ProjectDocumentViewer";
import SkillPalette from "./components/SkillPalette";


export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

async function getProjectDocuments() {
  const { data, error } = await supabase
    .from("project_documents")
    .select("id, title, file_path, sort_order")
    .eq("is_visible", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Gagal mengambil project document:", error.message);
    return [];
  }

  return data.map((item) => ({
    ...item,
    fileUrl: supabase.storage
      .from("portofolio-assets")
      .getPublicUrl(item.file_path).data.publicUrl,
  }));
}

async function getWriteups() {
  const { data, error } = await supabase
    .from("writeups")
    .select("id, title, slug, published_at, file_path")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Gagal mengambil write-up:", error.message);
    return [];
  }

  return data.map((item) => ({
    ...item,
    fileUrl: supabase.storage
      .from("portofolio-assets")
      .getPublicUrl(item.file_path).data.publicUrl,
  }));
}

const skills = [
  "Reverse Engineering",
  "Threat Modelling",
  "Python",
  "C",
  "Assembly Analysis",
  "CTF Challenge Design",
  "Database Querying",
  "CSS",
];



const experiences = [
  {
    period: "2026 - sekarang",
    role: "Apprentice",
    organization: "PETIR BINUS",
    logo: "/logos/petir-binus.jpg",
    points: [
      "Merancang dan mengembangkan challenge Capture the Flag (CTF) BeeCTF untuk kategori reverse engineering tingkat menengah.",
      "Mengikuti kompetisi CTF nasional, termasuk COMPFEST (UI), IT Fest (IPB), Hology (UB), dan kompetisi lainnya.",
    ],
  },
  {
    period: "2025 - 2026",
    role: "Human Capital Activist",
    organization: "Cyber Security Community",
    logo: "/logos/cyber_security_community_logo.jpg",
    points: [
      "Mendukung komunikasi internal, keterlibatan anggota, dan alur kerja divisi Human Capital.",
      "Menjadi Quality Control Event pada Welcoming Party dan mengoordinasikan kebutuhan perlengkapan Cyber Awareness Day.",
      "Berkontribusi dalam National Cyber Week, Expo Organisasi, serta berbagai kegiatan internal komunitas.",
    ],
  },
];

async function getCertifications() {
  const { data, error } = await supabase
    .from("certifications")
    .select("id, title, issuer, issued_at, file_path, status")
    .eq("is_visible", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Gagal mengambil sertifikasi:", error.message);
    return [];
  }

  return data.map((item) => ({
    ...item,
    fileUrl: item.file_path
      ? supabase.storage
          .from("portofolio-assets")
          .getPublicUrl(item.file_path).data.publicUrl
      : null,
  }));
}

export default async function Home() {
  const [writeups, certifications, projectDocuments] = await Promise.all([
    getWriteups(),
    getCertifications(),
    getProjectDocuments(),
  ]);

  return (
    <main>
      <header className="nav container">
          <a className="logo" href="#top">
            MO<span>.</span>
          </a>

          <nav className="nav-links" aria-label="Main navigation">
            <a href="#about">About Me</a>
            <a href="#capabilities">Skills</a>
            <a href="#experience">Experience</a>
            <a href="#writeups">Write-ups</a>
            <a href="#certifications">Certification</a>
            <a href="#projects">Projects</a>
          </nav>

          <a className="nav-contact" href="#contact">
            Hubungi saya
          </a>
        </header>

      <section id="top" className="hero container">
        <p className="terminal-copy">
          <span className="terminal-prompt">~/Michael $</span>
          <span className="typing-line">
            tracing binaries, mapping threats, securing what matters.
          </span>
        </p>
        <p className="eyebrow"><span className="signal" /> Open to internship opportunities</p>
        <div className="hero-heading">
          <h1>
            Deconstruct.<br />
            Analyze.<br />
            Secure<span>.</span>
          </h1>
        </div>
        <p className="hero-copy">Cyber Security student specializing in <strong>reverse engineering, threat analysis</strong>, and building proactive detection workflows for modern <strong>SOC</strong> environments.</p>
        <div className="hero-actions">
          <a className="button primary" href="#writeups">Lihat write-ups <span>↗</span></a>
          <a className="button secondary" href="https://github.com/cosmicus0" target="_blank" rel="noreferrer">GitHub <span>↗</span></a>
        </div>
        <div className="nameplate">
          <span className="nameplate-label">IDENTITY</span>
          <strong>Michael Ernst Jeremy Octama</strong>
        </div>
        <div className="hero-meta">
          <div><span>BASED IN</span><strong>Indonesia</strong></div>
          <div><span>STUDYING AT</span><strong>BINUS University</strong></div>
          <div><span>FOCUS</span><strong>Defensive Security & SOC</strong></div>
        </div>
      </section>

      <section id="about" className="section container split-section">
        <div><p className="section-label">01 / ABOUT</p></div>
        <div>
          <h2>Deconstructing systems to strengthen security from the inside out.</h2>
          <p className="body-copy">I am a 6th-semester Cyber Security student at BINUS University with a strong focus on defensive security, reverse engineering, and SOC operations. I leverage structured threat modeling and low-level analysis to investigate anomalies, analyze telemetry, and work with SIEM platforms to detect threats early.</p>
          <p className="body-copy">I enjoy tackling CTF challenges, analyzing malicious behavior, and building automation tools using Python and C. Always eager to bring this analytical mindset to an internship role where I can contribute to real-world defensive operations.</p>
          <div className="education"><span>EDUCATION</span><p><strong>Universitas Bina Nusantara</strong><br />School of Computer Science, Cyber Security<br /><small>2024 - Present · GPA 3.42 / 4.00</small></p></div>
        </div>
      </section>

      <section id="capabilities" className="section container split-section">
        <div>
          <p className="section-label">02 / CAPABILITIES</p>
        </div>

        <div>
          <h2>My Skills</h2>
          <SkillPalette />
        </div>
      </section>

      <section id="experience" className="section container split-section">
        <div><p className="section-label">03 / EXPERIENCE</p></div>
        <div className="experience-list">
          <h2>Organization and Experience</h2>
          {experiences.map((item) => (
            <article className="experience" key={item.organization}>
              <div className="experience-header">
              <div>
                <p className="period">{item.period}</p>
                <h3 className="organization">{item.organization}</h3>
                  <p className="role">{item.role}</p>
              </div>

              {item.logo && (
                <div className="experience-logo">
                  <img src={item.logo} alt={`Logo ${item.organization}`} />
                </div>
              )}
            </div>
              <ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section id="writeups" className="section container split-section">
        <div><p className="section-label">04 / WRITE-UPS</p></div>
        <div>
          <h2>c0smic CTF Journey</h2>
          <WriteupViewer writeups={writeups} />
        </div>
      </section>

      <section id="certifications" className="section container split-section">
      <div>
        <p className="section-label">05 / CERTIFICATIONS</p>
      </div>

      <div>
        <h2>My Certification</h2>
        <CertificationViewer certifications={certifications} />
      </div>
    </section>

    <section id="projects" className="section container split-section">
  <div>
    <p className="section-label">06 / PROJECTS</p>
  </div>

  <div>
    <h2>Projects and Experiments.</h2>

    <GitHubProjectPreview />
    <ProjectDocumentViewer documents={projectDocuments} />
  </div>
</section>

    <section id="contact" className="contact container">
        <p className="section-label">07 / CONTACT</p>
        <h2>Let's Talk!</h2>

        <a href="mailto:michaeloctama1@gmail.com">
          michaeloctama1@gmail.com <span>↗</span>
        </a>

        <div className="contact-links">
          <a href="https://github.com/cosmicus0" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/michael-octama-8ab656370"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </section>

      <footer className="container"><span>© 2026 Michael Octama</span><span>Thanks for stopping by! Let's stay in touch.</span></footer>
    </main>
  );
}
