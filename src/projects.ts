import phreddit from './assets/images/phreddit-screenshot.png';
import recap from './assets/images/recap-screenshot.png';
import namecube from './assets/images/namecube-screenshot.png';

export type Project = {
  name: string;
  tagline: string;
  period: string;
  stack: string[];
  blurb: string;
  links?: { label: string; href: string }[];
  image?: string;
};

// Newest first.
export const projects: Project[] = [
  {
    name: 'Vetty',
    tagline: 'Code review for the agent era',
    period: 'Jul 2026 — Present',
    stack: ['JavaScript', 'Node.js', 'Kotlin', 'GraphQL', 'VS Code API'],
    blurb:
      "An open-source code review tool for VS Code, Cursor, and JetBrains that shows only what changed since your last review pass. Built for the re-review loop AI-assisted editing creates: when an agent rewrites thirty files, you need to know what it touched, what you've already checked, and what moved since. Reviewed state is tracked by content hash so files re-flag when edited, inline comments re-anchor by content so they survive rewrites, and snapshots live in git's own object store rather than a side cache.",
    links: [{ label: 'GitHub', href: 'https://github.com/robw0ng/vetty' }],
  },
  {
    name: 'DroneGurus R&D',
    tagline: 'Thermal detection and multi-band radar',
    period: 'Mar 2026 — Present',
    stack: ['Python', 'YOLOv8', 'OpenCV', 'NumPy', 'mmWave Radar', 'UWB'],
    blurb:
      'Two research prototypes for a drone company. The first is a thermal building-damage detector trained on a custom 27K-image dataset with 8× colormap augmentation to generalize across thermal camera palettes, reaching 91.9% mAP@50 and demoed at a trade show. The second is a through-wall human detection rig for search-and-rescue: 60GHz and 24GHz radars confirming each other across bands to kill ghost targets, positioned by a self-calibrating four-anchor UWB array, with an AR overlay that holds targets in a fixed world frame and projects them onto a live camera feed.',
  },
  {
    name: 'Discord Clone',
    tagline: 'Distributed chat across a 12-node cloud',
    period: 'Jan 2026 — May 2026',
    stack: ['TypeScript', 'Node.js', 'React', 'PostgreSQL', 'Cassandra', 'Redis', 'Elasticsearch'],
    blurb:
      'A Discord clone running on a 12-node Linode cloud with 8 Node.js microservices coordinated through Redis pub/sub, supporting real-time chat, DMs, full-text search, file attachments, and OAuth. Event fan-out works across multiple WebSocket instances with no sticky sessions, keeping presence state per-instance in Redis hashes. Message history lives in a 3-node Cassandra cluster partitioned by channel with timeuuid cursor pagination, deployed by GitHub Actions into Ansible playbooks across every VM.',
  },
  {
    name: 'Lifetime Financial Planner',
    tagline: 'Monte Carlo simulation over a lifetime',
    period: 'Jan 2025 — May 2025',
    stack: ['React', 'Express', 'PostgreSQL', 'Node.js', 'd3.js'],
    blurb:
      'A full-stack financial planning app that models investment portfolio performance across a lifetime using Markov processes with geometric Brownian motion. A parallel simulation engine built on worker threads runs 100 concurrent simulations, with automated IRS tax data scraping, Roth conversion optimization, and RMD calculations. Designed in Figma, with d3.js shaded-line, stacked-bar, surface, and contour charts for exploring results across multi-dimensional scenarios.',
    links: [
      { label: 'GitHub', href: 'https://github.com/robw0ng/Lifetime-Financial-Planner-FSA' },
    ],
  },
  {
    name: 'Phreddit',
    tagline: 'A Reddit clone on the MERN stack',
    period: 'Aug 2024 — Dec 2024',
    stack: ['MongoDB', 'Express', 'React', 'Node.js'],
    blurb:
      'A clone of Reddit with a user database, posts, communities, threaded comments, voting, and karma. Built on the MERN stack to get properly familiar with the tooling that shows up everywhere in industry.',
    image: phreddit,
  },
  {
    name: 'RECAP',
    tagline: 'Evidence categorization for the NYPD',
    period: 'Jul 2024 — Aug 2024',
    stack: ['Python', 'Flask', 'SQLite', 'JavaScript', 'Bootstrap'],
    blurb:
      'A centralized database application for the NYPD Compliance Section to categorize TRI records. Flask, Python, and SQLite behind a Bootstrap interface, built to replace a manual process with something auditable, with exportable reports for further analysis.',
    image: recap,
  },
  {
    name: 'NameCube',
    tagline: 'The original — a GameCube BIOS recreation',
    period: 'May 2024 — Jun 2024',
    stack: ['HTML', 'CSS', 'JavaScript'],
    blurb:
      "The original NameCube, and the reason this site has a cube on it at all. A recreation of the Nintendo GameCube BIOS screen: an interactive cube floating in space that you can grab, spin, and bounce around. No libraries, no frameworks, just HTML, CSS, and JavaScript doing the 3D math by hand. I built it to challenge myself, then turned it into a mini-portfolio and pointed robw0ng.com at it. This site took over the domain, but the original is still running.",
    links: [{ label: 'Try the original', href: 'https://robw0ng.com/legacy/' }],
    image: namecube,
  },
];
