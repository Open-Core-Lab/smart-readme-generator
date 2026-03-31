import type { GitHubUser, GitHubRepo } from '../types';

function topLanguages(repos: GitHubRepo[]): string {
  const counts: Record<string, number> = {};
  for (const r of repos) {
    if (r.language) counts[r.language] = (counts[r.language] ?? 0) + 1;
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([lang]) => `\`${lang}\``)
    .join(' · ');
}

function topRepos(repos: GitHubRepo[]): string {
  return repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5)
    .map(
      (r) =>
        `- **[${r.name}](${r.html_url})** — ${r.description ?? 'No description'} ⭐ ${r.stargazers_count}`
    )
    .join('\n');
}

export function generateLocalReadme(
  user: GitHubUser,
  repos: GitHubRepo[],
  templateId?: string
): string {
  const name = user.name ?? user.login;
  const bio =
    user.bio ?? `I'm ${name}, a developer sharing projects on GitHub.`;
  const langs = topLanguages(repos);
  const projects = topRepos(repos);
  const location = user.location ?? '';
  const blog = user.blog ?? `https://github.com/${user.login}`;
  const email = user.email ?? '';

  // ── Profile (rich — template3 style) ───────────────────────────────────────
  if (templateId === 'profile') {
    return `<!-- typing text section start -->
<p align="center" width="100%">
  <a href="https://github.com/DenverCoder1/readme-typing-svg" width="100%">
    <img src="https://readme-typing-svg.herokuapp.com/?lines=Hello%20World!;I'm%20${encodeURIComponent(name)};${encodeURIComponent(bio.slice(0, 60))}&font=Fira%20Code&center=true&width=440&height=45&color=ff4130&vCenter=true&size=28" width="100%" />
  </a>
</p>
<!-- typing text section end -->

<!-- myself section start -->
<p align="justify"><b>${bio}</b></p>
<!-- myself section end -->

<!-- about me section start -->
#### 🙋‍♂️ About Me
${location ? `\n- 📍 ${location}` : ''}${blog ? `\n- 🌐 [${blog}](${blog})` : ''}
- 📦 **${user.public_repos}** public repositories
- 👥 **${user.followers}** followers · **${user.following}** following${email ? `\n- 📫 How to reach me **${email}**` : ''}

<!-- Social icons section start -->
<p align="center">
  <a href="https://github.com/${user.login}" target="_blank">
    <img align="center" alt="GitHub" width="24px" src="https://img.icons8.com/ios-glyphs/30/github.png" />
  </a> &nbsp;&nbsp;
  <a href="https://linkedin.com/in/${user.login}" target="_blank">
    <img align="center" alt="LinkedIn" width="24px" src="https://img.icons8.com/?size=100&id=MR3dZdlA53te&format=png&color=000000" />
  </a> &nbsp;&nbsp;
  <a href="https://twitter.com/${user.login}" target="_blank">
    <img align="center" alt="X" width="24px" src="https://cdn3d.iconscout.com/3d/premium/thumb/x-3d-icon-download-in-png-blend-fbx-gltf-file-formats--social-media-logo-application-pack-stickers-icons-9863308.png?f=webp" />
  </a>
</p>
<!-- Social icons section end -->

<!-- Badges section start -->
<p align="center" width="100%">
  <a href="https://github.com/${user.login}?tab=followers" target="_blank">
    <img align="center" alt="Profile Views" width="120px" src="https://komarev.com/ghpvc/?username=${user.login}&style=plastic" />
  </a> &nbsp;&nbsp;
  <a href="https://github.com/${user.login}?tab=followers" target="_blank">
    <img align="center" alt="Followers" src="https://img.shields.io/github/followers/${user.login}?label=Followers&style=social" />
  </a>
</p>
<!-- Badges section end -->
<!-- about me section end -->

---

<!-- Github status section start -->
#### 📊 GitHub Stats

<p align="center">
<table align="center">
<tr border="none">
<td width="60%" align="center">
  <img alt="GitHub Stats" src="https://github-readme-stats.vercel.app/api?username=${user.login}&show_icons=true&count_private=true&theme=react&hide_border=true&bg_color=000000" />
</td>
<td width="40%" align="center">
  <img alt="Top Languages" src="https://github-readme-stats.vercel.app/api/top-langs/?username=${user.login}&langs_count=20&count_private=true&layout=compact&theme=react&hide_border=true&bg_color=000000" />
</td>
</tr>
</table>
</p>
<!-- Github status section end -->

---

<!-- Tech stack section start -->
#### 🛠️ Tech Stack

${langs || 'Various technologies'}
<!-- Tech stack section end -->

---

<!-- Featured projects section start -->
#### 📌 Featured Projects

${projects}
<!-- Featured projects section end -->

---

<!-- Blog posts section start -->
#### ✍️ Blog Posts

<!-- BLOG-POST-LIST:START -->
_Latest posts will appear here via GitHub Actions._
<!-- BLOG-POST-LIST:END -->
<!-- Blog posts section end -->

---

#### 🐍 Snake eating my contributions

<p width="95%" align="center">
  <a href="https://github.com/${user.login}/${user.login}/blob/output/github-contribution-grid-snake.gif">
    <img title="snake gif" alt="contribution snake" src="https://github.com/${user.login}/${user.login}/blob/output/github-contribution-grid-snake.gif" />
  </a>
</p>
`;
  }

  // ── Detailed (with stats, social icons, typing SVG) ────────────────────────
  if (templateId === 'detailed') {
    return `<h1 align="center">Hi there, I'm ${name} 👋</h1>

<p align="center">
  <a href="https://github.com/DenverCoder1/readme-typing-svg">
    <img src="https://readme-typing-svg.herokuapp.com/?lines=${encodeURIComponent(bio.slice(0, 50))}&font=Fira+Code&center=true&width=440&height=45&color=f75c7e&vCenter=true&size=22" />
  </a>
</p>

<p align="justify">${bio}</p>

---

### 🙋‍♂️ About Me
${location ? `\n- 📍 Based in **${location}**` : ''}${user.company ? `\n- 🏢 Working at **${user.company}**` : ''}${blog ? `\n- 🌐 [Portfolio](${blog})` : ''}${email ? `\n- 📫 **${email}**` : ''}
- 📦 **${user.public_repos}** public repos · 👥 **${user.followers}** followers · **${user.following}** following

<!-- Social icons section -->
<p align="center">
  <a href="https://github.com/${user.login}" target="_blank">
    <img align="center" alt="GitHub" width="24px" src="https://img.icons8.com/ios-glyphs/30/github.png" />
  </a> &nbsp;&nbsp;
  <a href="https://linkedin.com/in/${user.login}" target="_blank">
    <img align="center" alt="LinkedIn" width="24px" src="https://img.icons8.com/?size=100&id=MR3dZdlA53te&format=png&color=000000" />
  </a> &nbsp;&nbsp;
  <a href="https://twitter.com/${user.login}" target="_blank">
    <img align="center" alt="X / Twitter" width="24px" src="https://img.icons8.com/color/48/twitter--v1.png" />
  </a>
</p>

---

### 🛠️ Tech Stack

${langs || 'Various technologies'}

---

### 📊 GitHub Stats

<p align="center">
  <img alt="GitHub Stats" src="https://github-readme-stats.vercel.app/api?username=${user.login}&show_icons=true&count_private=true&theme=react&hide_border=true&bg_color=0d1117" />
  <img alt="Top Languages" src="https://github-readme-stats.vercel.app/api/top-langs/?username=${user.login}&langs_count=10&layout=compact&theme=react&hide_border=true&bg_color=0d1117" />
</p>

---

### 📌 Featured Projects

${projects}

---

### 🤝 Let's Connect

<p align="center">
  <a href="https://github.com/${user.login}">
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" />
  </a>
  &nbsp;
  <a href="https://linkedin.com/in/${user.login}">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" />
  </a>
</p>
`;
  }

  // ── Minimal (default) ──────────────────────────────────────────────────────
  return `<h1 align="center">Hi there, I'm ${name} 👋</h1>

<p align="center">
  <em>${bio}</em>
</p>

<p align="center">
  <a href="https://github.com/${user.login}">
    <img src="https://img.shields.io/github/followers/${user.login}?label=Followers&style=social" alt="followers" />
  </a>
  &nbsp;&nbsp;
  <img src="https://komarev.com/ghpvc/?username=${user.login}&style=flat" alt="profile views" />
</p>

---

### 🙋‍♂️ About Me

${bio}
${location ? `\n- 📍 **${location}**` : ''}${blog ? `\n- 🌐 [Portfolio](${blog})` : ''}${email ? `\n- 📫 **${email}**` : ''}
- 📦 **${user.public_repos}** public repositories · 👥 **${user.followers}** followers

---

### 🛠️ Tech Stack

${langs || 'Various technologies'}

---

### 📌 Featured Projects

${projects}

---

### 🤝 Let's Connect

<p align="center">
  <a href="https://github.com/${user.login}">
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" />
  </a>
</p>
`;
}
