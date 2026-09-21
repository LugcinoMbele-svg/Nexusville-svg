import React, { useState } from 'react'
import { Link, NavLink, Route, Routes } from 'react-router-dom'

const pillars = [
  ['01','Infrastructure Development','Building the essential systems that keep communities connected, resilient and ready for growth.'],
  ['02','Property Development','Creating considered places to live, work and thrive through sustainable, inclusive development.'],
  ['03','Renewable Energy','Developing practical clean-energy concepts that support efficient, future-ready communities.'],
  ['04','Technology & Innovation','Using digital tools, GIS and smart systems to make development more informed and effective.'],
  ['05','Environmental Solutions','Embedding resource stewardship, water resilience and environmental thinking into every opportunity.'],
  ['06','Transportation & Connectivity','Exploring movement, access and digital connectivity as foundations for opportunity.'],
  ['07','Community & Economic Development','Connecting projects to skills, enterprise and lasting local value.']
]

const services = [
  ['Infrastructure Development',['Roads and paving','Water infrastructure','Sanitation infrastructure','Buildings and civil infrastructure','Public infrastructure','Infrastructure upgrades']],
  ['Property Development',['Residential developments','Affordable housing','Commercial developments','Student accommodation','Mixed-use developments','Sustainable communities']],
  ['Renewable Energy',['Solar infrastructure','Solar street lighting','Renewable energy projects','Energy-efficient development','Community energy solutions']],
  ['Construction & Development Solutions',['Construction development','Precast concrete solutions','Interlocking paving','Concrete products','Modular development solutions','Security fencing and water tanks']],
  ['Technology & Innovation',['ICT solutions','GIS mapping','Digital project systems','AI-assisted infrastructure planning','Smart-city concepts','Digital development tools']],
  ['Environmental Solutions',['Sustainable development','Environmental planning','Waste-management concepts','Water conservation','Rainwater harvesting','Environmental sustainability']]
]

const programs = [
  ['01','Nexusville Green Village','CONCEPT','An integrated sustainable development concept combining housing, renewable energy, water infrastructure, roads, community facilities, digital connectivity and economic opportunity.'],
  ['02','Sustainable Infrastructure Development','PIPELINE','Developing infrastructure that supports long-term economic and community development, with resilience and responsible resource use at its core.'],
  ['03','Digital & Smart Infrastructure','FUTURE PROGRAMME','Using technology, GIS, AI and digital systems to improve infrastructure planning, monitoring and development.'],
  ['04','Youth & Enterprise Development','FUTURE PROGRAMME','Creating pathways through skills development, entrepreneurship, digital skills, creative industries, employment and enterprise development.'],
  ['05','Renewable Energy Development','PIPELINE','Showcasing future solar infrastructure and energy-efficient developments designed for a cleaner, more resilient future.']
]

const heroStats = [
  ['01','Infrastructure','Systems designed for resilience and long-term growth.'],
  ['02','Innovation','Technology-led planning and development thinking.'],
  ['03','Opportunity','Projects shaped for people, place and progress.']
]

function LogoMark(){
  return (
    <div className="brand-mark" aria-label="Nexusville logo">
      <svg viewBox="0 0 360 360" role="img" aria-label="Nexusville emblem">
        <defs>
          <linearGradient id="goldGrad" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#f5d88d"/>
            <stop offset="35%" stopColor="#d9aa47"/>
            <stop offset="70%" stopColor="#f3d37e"/>
            <stop offset="100%" stopColor="#c58f2d"/>
          </linearGradient>
        </defs>
        <circle cx="180" cy="180" r="146" fill="#0f2d3f" stroke="url(#goldGrad)" strokeWidth="14"/>
        <circle cx="180" cy="180" r="122" fill="none" stroke="url(#goldGrad)" strokeWidth="8" opacity="0.9"/>
        <path d="M121 118 L121 245 L159 182 L202 245 L202 118" fill="none" stroke="url(#goldGrad)" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M90 246 C 155 208, 205 208, 270 246" fill="none" stroke="url(#goldGrad)" strokeWidth="10" strokeLinecap="round" opacity="0.88"/>
        <path d="M60 106 C 90 80, 125 72, 150 78 C 128 96, 118 119, 110 145" fill="none" stroke="url(#goldGrad)" strokeWidth="9" strokeLinecap="round" opacity="0.85"/>
        <path d="M300 106 C 270 80, 235 72, 210 78 C 232 96, 242 119, 250 145" fill="none" stroke="url(#goldGrad)" strokeWidth="9" strokeLinecap="round" opacity="0.85"/>
        <path d="M72 232 C 118 282, 147 294, 180 298 C 213 294, 242 282, 288 232" fill="none" stroke="url(#goldGrad)" strokeWidth="9" strokeLinecap="round" opacity="0.9"/>
        <circle cx="180" cy="180" r="18" fill="url(#goldGrad)" opacity="0.92"/>
        <circle cx="180" cy="180" r="6" fill="#0f2d3f"/>
      </svg>
    </div>
  )
}

function BrandWordmark(){
  return (
    <div className="brand-wordmark" aria-label="Nexusville wordmark">
      <div className="brand-title">NEXUSVILLE</div>
      <div className="brand-subtitle">PTY LTD</div>
    </div>
  )
}

function Logo(){
  return (
    <Link className="logo" to="/">
      <LogoMark/>
      <div className="logo-text-wrap">
        <span className="logo-text">NEXUSVILLE</span>
        <small>(PTY) LTD</small>
      </div>
    </Link>
  )
}

function Arrow(){ return <span className="arrow">↗</span> }
function Button({children,to='/contact',secondary=false}){ return <Link className={secondary?'btn btn-outline':'btn'} to={to}>{children}<Arrow/></Link> }

function Header(){
  const [open,setOpen]=useState(false)
  const nav=[['Home','/'],['About','/about'],['Services','/services'],['Programs','/programs'],['Partners','/partners'],['Store','/store'],['Contact','/contact']]

  return <header className="header"><div className="container nav-wrap"><Logo/><button className="menu" onClick={()=>setOpen(!open)} aria-label="Toggle menu">☰</button><nav className={open?'nav open':'nav'}>{nav.map(([label,path])=><NavLink end={path==='/' ? true : undefined} onClick={()=>setOpen(false)} key={path} to={path}>{label}</NavLink>)}<Button to="/contact">Partner With Us</Button></nav></div></header>
}

function Footer(){
  return <footer>
    <div className="container footer-grid">
      <div>
        <Logo/>
        <p className="footer-intro">Building Sustainable Futures.</p>
        <p className="muted">A South African multi-industry development company connecting infrastructure, innovation and opportunity.</p>
      </div>
      <div>
        <h4>Explore</h4>
        <Link to="/about">About</Link>
        <Link to="/services">Services</Link>
        <Link to="/programs">Programs</Link>
        <Link to="/partners">Partners</Link>
      </div>
      <div>
        <h4>Connect</h4>
        <Link to="/contact">Contact Nexusville</Link>
        <Link to="/store">Nexusville Literature</Link>
        <a href="https://nomduva.org.za">Nomduva Community Empowerment Project</a>
        <span>National Youth Arts & Development Foundation</span>
      </div>
      <div>
        <h4>Legal</h4>
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/terms">Terms & Conditions</Link>
        <Link to="/disclaimer">Website Disclaimer</Link>
      </div>
    </div>
    <div className="container footer-bottom"><span>© 2026 Nexusville (Pty) Ltd. All Rights Reserved.</span><span>CIPC Registration No.: 2026/260391/07</span></div>
  </footer>
}

function Layout({children}){return <><Header/><main>{children}</main><Footer/></>}
function PageHero({eyebrow,title,copy}){return <section className="page-hero"><div className="container"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1>{copy&&<p>{copy}</p>}</div></section>}

function CTA(){return <section className="cta"><div className="container cta-inner"><div><span className="eyebrow">The next chapter</span><h2>LET’S BUILD WHAT<br/><em>COMES NEXT.</em></h2></div><div><p>Have an idea, capability or opportunity to explore? Let’s connect the right people and move it forward.</p><Button to="/partners">Partner With Us</Button> <Button to="/contact" secondary>Contact Nexusville</Button></div></div></section>}

function Home(){
  return <>
    <section className="hero">
      <div className="hero-image"/>
      <div className="container hero-content">
        <div className="hero-brand-lockup">
          <LogoMark/>
          <BrandWordmark/>
        </div>
        <span className="eyebrow">South Africa · Development · Innovation</span>
        <h1>BUILDING<br/><em>SUSTAINABLE</em><br/>FUTURES</h1>
        <p>Infrastructure. Innovation. Opportunity.</p>
        <div className="hero-copy">Nexusville (Pty) Ltd is a South African development company focused on creating sustainable infrastructure, innovative solutions and opportunities that contribute to stronger communities and a more connected economy.</div>
        <div className="actions"><Button to="/about">Explore Nexusville</Button><Button to="/services" secondary>Our Services</Button></div>
        <div className="hero-stats">
          {heroStats.map(([n,label,text]) => (
            <article className="stat-card" key={label}><strong>{n}</strong><span>{label}</span><small>{text}</small></article>
          ))}
        </div>
      </div>
      <div className="hero-scroll">SCROLL TO EXPLORE <span>↓</span></div>
    </section>

    <section className="section">
      <div className="container split">
        <div>
          <span className="eyebrow">Who we are</span>
          <h2>DEVELOPMENT WITH<br/><em>LONG-TERM VALUE.</em></h2>
        </div>
        <div>
          <p className="lead">Nexusville (Pty) Ltd is a South African multi-industry development company established to identify, develop and support projects that create long-term economic, social and infrastructure value.</p>
          <p>Our development approach connects infrastructure, technology, renewable energy, property, construction, environmental solutions, transportation and community development.</p>
          <Button to="/about" secondary>Discover our story</Button>
        </div>
      </div>
    </section>

    <section className="vision">
      <div className="container">
        <span className="eyebrow">Our vision</span>
        <blockquote>“To contribute to a sustainable, connected and economically empowered future through innovative development.”</blockquote>
      </div>
    </section>

    <section className="section pillars">
      <div className="container">
        <div className="section-heading">
          <div><span className="eyebrow">Our development pillars</span><h2>THE SYSTEMS THAT<br/><em>MOVE US FORWARD.</em></h2></div>
          <p>Seven connected areas of focus help us see the bigger picture and build with intention.</p>
        </div>
        <div className="card-grid">{pillars.map(([n,t,d])=><article className="pillar-card" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p><Arrow/></article>)}</div>
      </div>
    </section>

    <section className="section dark-section">
      <div className="container">
        <div className="section-heading">
          <div><span className="eyebrow">Featured initiatives</span><h2>IDEAS WITH<br/><em>REAL POTENTIAL.</em></h2></div>
          <p>Our portfolio is being shaped with ambition. The initiatives below are concepts and pipeline opportunities for future development.</p>
        </div>
        <div className="initiative-grid">
          <article><span className="tag">CONCEPT</span><h3>Nexusville<br/>Green Village</h3><p>Integrated sustainable development concept incorporating housing, renewable energy, infrastructure, community facilities and economic opportunities.</p><Link to="/programs">View programme <Arrow/></Link></article>
          <article><span className="tag">INNOVATION</span><h3>Smart<br/>Infrastructure</h3><p>Technology-enabled infrastructure planning, mapping, monitoring and development.</p><Link to="/programs">View programme <Arrow/></Link></article>
          <article><span className="tag">PIPELINE</span><h3>Sustainable<br/>Solutions</h3><p>Renewable energy, water systems, paving, construction materials, public infrastructure and related opportunities.</p><Link to="/services">Explore services <Arrow/></Link></article>
        </div>
      </div>
    </section>

    <CTA/>
  </>
}

function About(){
  return <>
    <PageHero eyebrow="Our story" title={<><span>ABOUT</span><br/><em>NEXUSVILLE</em></>} copy="A forward-looking development company connecting infrastructure, technology, investment and community opportunity."/>
    <section className="section">
      <div className="container split">
        <div><span className="eyebrow">The Nexusville approach</span><h2>BUILDING THE<br/><em>CONNECTED FUTURE.</em></h2></div>
        <div><p className="lead">Nexusville has a long-term vision of developing sustainable projects and creating value across the places and systems that shape everyday life.</p><p>We identify opportunities, convene capabilities and support development thinking across infrastructure, property, energy, technology and enterprise.</p></div>
      </div>
    </section>

    <section className="section light">
      <div className="container">
        <span className="eyebrow">Company focus</span>
        <div className="focus-list">{['Infrastructure Development','Property Development','Renewable Energy','Construction','ICT & Digital Solutions','Environmental Development','Transportation & Connectivity','Project Development','Economic Development'].map((x,i)=><div key={x}><span>0{i+1}</span>{x}<Arrow/></div>)}</div>
      </div>
    </section>

    <section className="section founder">
      <div className="container founder-grid">
        <div className="portrait"><span>LN</span><small>Founder profile<br/>photograph placeholder</small></div>
        <div>
          <span className="eyebrow">Founder & visionary</span>
          <h2>LUGCINO<br/><em>NTSUZI</em></h2>
          <p className="lead">An entrepreneur, writer and development-focused business builder who established Nexusville with a vision of developing sustainable projects and creating opportunities through infrastructure, innovation and enterprise.</p>
          <div className="quote">“Nexusville was created from a simple vision: to build sustainable futures by connecting ideas, infrastructure, technology and opportunity.”</div>
          <p className="muted">Founder message · LugCino Ntsuzi</p>
        </div>
      </div>
    </section>

    <CTA/>
  </>
}

function Services(){
  return <>
    <PageHero eyebrow="What we do" title={<><span>OUR</span><br/><em>SERVICES</em></>} copy="Multidisciplinary capabilities for projects that are practical, resilient and built for lasting value."/>
    <section className="section">
      <div className="container service-list">{services.map(([title,items],i)=><article className="service-row" key={title}><div className="service-number">0{i+1}</div><div><h2>{title}</h2><p>Development thinking and practical solutions shaped around the needs of communities, partners and future projects.</p></div><ul>{items.map(x=><li key={x}>{x}</li>)}</ul></article>)}</div>
    </section>
    <CTA/>
  </>
}

function Programs(){
  return <>
    <PageHero eyebrow="Our portfolio" title={<><span>PROGRAMS &</span><br/><em>INITIATIVES</em></>} copy="A growing pipeline of concepts and programmes designed to translate ambition into meaningful development."/>
    <section className="section">
      <div className="container program-list">{programs.map(([n,title,status,desc])=><article className="program-card" key={title}><div className="program-top"><span>{n}</span><b>{status}</b></div><h2>{title}</h2><p>{desc}</p><Link to="/contact">Learn More <Arrow/></Link></article>)}</div>
    </section>
    <section className="section light">
      <div className="container">
        <span className="eyebrow">Project pipeline</span>
        <h2>THE WORK AHEAD.</h2>
        <p className="lead narrow">Future project cards will be added here as opportunities move from concept into development.</p>
        <div className="pipeline"><span>PROJECT NAME</span><span>LOCATION</span><span>STATUS</span><span>CATEGORY</span><span>UPDATES</span><strong>More projects coming soon</strong></div>
      </div>
    </section>
    <CTA/>
  </>
}

function Partners(){
  return <>
    <PageHero eyebrow="Collaboration network" title={<><span>OUR PARTNERS &</span><br/><em>COLLABORATION</em></>} copy="Progress happens when the right perspectives, capabilities and communities come together."/>
    <section className="section">
      <div className="container">
        <span className="eyebrow">In partnership with</span>
        <div className="partner-grid">
          <article className="partner-card featured">
            <div className="partner-logo">NCEP</div>
            <h2>Nomduva Community<br/>Empowerment Project</h2>
            <p>A community empowerment organisation working in youth empowerment, skills development, creative arts, entrepreneurship, community development and social support.</p>
            <a className="btn btn-outline" href="https://nomduva.org.za">Visit NCEP <Arrow/></a>
          </article>
          <article className="partner-card">
            <div className="partner-logo placeholder">NYADF</div>
            <h2>National Youth Arts & Development Foundation</h2>
            <p>A youth-focused development organisation supporting youth empowerment, arts and culture, business development, children and family support, disability support, skills and community development.</p>
            <span className="tag">PARTNER PROFILE</span>
          </article>
        </div>
      </div>
    </section>

    <section className="section light">
      <div className="container">
        <div className="section-heading">
          <div><span className="eyebrow">Strategic opportunities</span><h2>BRING YOUR<br/><em>CAPABILITY.</em></h2></div>
          <p>Nexusville seeks meaningful collaboration with investors, institutions and people who share a commitment to sustainable development.</p>
        </div>
        <div className="opportunity-grid">{['Investors','Development Partners','Construction Partners','Technology Partners','Community Organisations','Government & Public Sector','Professional Service Providers'].map(x=><div key={x}>{x}<Arrow/></div>)}</div>
        <Button to="/contact">Become a Nexusville Partner</Button>
      </div>
    </section>
  </>
}

function Contact(){
  return <>
    <PageHero eyebrow="Start a conversation" title={<><span>LET’S BUILD THE</span><br/><em>FUTURE TOGETHER.</em></>} copy="Tell us what you are working on, what you can contribute or where you see an opportunity."/>
    <section className="section">
      <div className="container contact-grid">
        <form onSubmit={e=>e.preventDefault()}>
          <div className="form-row">
            <label>Full Name<input required placeholder="Your full name"/></label>
            <label>Organisation<input placeholder="Organisation name"/></label>
          </div>
          <div className="form-row">
            <label>Email<input type="email" required placeholder="you@example.com"/></label>
            <label>Phone<input placeholder="Phone number"/></label>
          </div>
          <label>Enquiry Type<select defaultValue=""><option value="" disabled>Select an enquiry type</option>{['General Enquiry','Partnership','Investment','Project Development','Supplier','Business Opportunity','Media','Other'].map(x=><option key={x}>{x}</option>)}</select></label>
          <label>Message<textarea rows="6" placeholder="How can we help?"></textarea></label>
          <button className="btn" type="submit">Submit Enquiry <Arrow/></button>
        </form>
        <aside className="contact-aside">
          <span className="eyebrow">Contact details</span>
          <h2>LET’S CONNECT.</h2>
          <p>Our contact details will be published here as Nexusville’s official communication channels are finalised.</p>
          <div className="detail"><b>Email</b><span>To be updated</span></div>
          <div className="detail"><b>Phone</b><span>To be updated</span></div>
          <div className="detail"><b>Location</b><span>South Africa<br/>Business address to be updated</span></div>
          <div className="detail"><b>Social</b><span>Links to be updated</span></div>
        </aside>
      </div>
    </section>
  </>
}

function Store(){
  return <>
    <PageHero eyebrow="Nexusville store / literature" title={<><span>NEXUSVILLE</span><br/><em>LITERATURE</em></>} copy="Ideas. Stories. Imagination."/>
    <section className="section">
      <div className="container">
        <div className="store-intro">
          <div><span className="eyebrow">Author</span><h2>LUGCINO<br/><em>NTSUZI</em></h2></div>
          <p className="lead">A South African writer and founder whose creative work explores themes of hope, resilience, relationships, imagination and self-discovery.</p>
        </div>
        <div className="category-row">{['All','Fiction','Romance','Fantasy','Self-Discovery','Drama','Poetry','Creative Writing','Future Publications'].map((x,i)=><span className={i===0?'active':''} key={x}>{x}</span>)}</div>
        <div className="book-grid">{['Future publication','Digital publication','Creative writing'].map((x,i)=><article className="book-card" key={x}><div className="book-cover"><span>{i===0?'01':'+'}</span><b>{x}</b><small>Lugcino Ntsuzi</small></div><span className="tag">COMING SOON</span><h3>{i===0?'A new Nexusville literary release':x}</h3><p>Book details, description and genre will be added when the publication is ready.</p><button className="text-link" disabled>Amazon link to be added <Arrow/></button></article>)}</div>
      </div>
    </section>
  </>
}

function Legal({type}){
  let data={
    privacy:['Privacy Policy','Nexusville respects your privacy. This page will be updated with the company’s detailed privacy practices before the website collects personal information.'],
    terms:['Terms & Conditions','These terms will outline the rules for using the Nexusville website, its content and future digital services.'],
    disclaimer:['Website Disclaimer','The information on this website is provided for general information and development communication purposes. Proposed, concept and pipeline initiatives are not guarantees of completed projects, funding or delivery.']
  }[type]

  return <>
    <PageHero eyebrow="Legal" title={<><span>{data[0].toUpperCase()}</span></>} copy="Clear information for everyone who visits Nexusville online."/>
    <section className="section legal">
      <div className="container narrow">
        <h2>{data[0]}</h2>
        <p>{data[1]}</p>
        <p>Questions about this notice can be directed to Nexusville through the Contact page. Official contact details and any future updates will be published here when available.</p>
      </div>
    </section>
  </>
}

export default function App(){return <Layout><Routes><Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/><Route path="/services" element={<Services/>}/><Route path="/programs" element={<Programs/>}/><Route path="/partners" element={<Partners/>}/><Route path="/contact" element={<Contact/>}/><Route path="/store" element={<Store/>}/><Route path="/privacy" element={<Legal type="privacy"/>}/><Route path="/terms" element={<Legal type="terms"/>}/><Route path="/disclaimer" element={<Legal type="disclaimer"/>}/></Routes></Layout>}
