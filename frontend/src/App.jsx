import { useEffect, useMemo, useState } from "react";



const FALLBACK_PLAYERS = [

  { player: "Tyus Jones", team: "PHO", salary: 2.09, fair_value: 9.93, value_gap: 78.98, risk: 0, quality_score: 58.17, rating: "STRONG BUY", position: "G", age: 29 },

  { player: "Alperen Sengun", team: "HOU", salary: 5.42, fair_value: 24.68, value_gap: 78.02, risk: 0, quality_score: 69.23, rating: "STRONG BUY", position: "C", age: 23 },

  { player: "Toumani Camara", team: "POR", salary: 1.89, fair_value: 8.60, value_gap: 78.00, risk: 0, quality_score: 58.83, rating: "STRONG BUY", position: "F", age: 25 },

  { player: "Spencer Dinwiddie", team: "DAL", salary: 2.09, fair_value: 12.75, value_gap: 83.63, risk: 10, quality_score: 55.23, rating: "STRONG BUY", position: "G", age: 32 },

  { player: "Christian Braun", team: "DEN", salary: 3.09, fair_value: 12.11, value_gap: 74.49, risk: 0, quality_score: 63.93, rating: "STRONG BUY", position: "G/F", age: 24 },

  { player: "Devonte' Graham", team: "CHO", salary: 1.42, fair_value: 14.07, value_gap: 89.93, risk: 20, quality_score: 63.31, rating: "STRONG BUY", position: "G", age: 30 },

  { player: "Taurean Prince", team: "MIL", salary: 2.09, fair_value: 9.63, value_gap: 78.32, risk: 10, quality_score: 52.81, rating: "STRONG BUY", position: "F", age: 30 },

  { player: "Guerschon Yabusele", team: "PHI", salary: 2.09, fair_value: 12.84, value_gap: 83.74, risk: 20, quality_score: 54.66, rating: "STRONG BUY", position: "F", age: 30 },

  { player: "Jaylen Wells", team: "MEM", salary: 1.16, fair_value: 3.44, value_gap: 66.36, risk: 0, quality_score: 50.95, rating: "STRONG BUY", position: "F", age: 22 },

  { player: "Jalen Duren", team: "DET", salary: 4.54, fair_value: 13.46, value_gap: 66.29, risk: 0, quality_score: 55.99, rating: "STRONG BUY", position: "C", age: 22 },

  { player: "Keon Johnson", team: "BRK", salary: 2.16, fair_value: 6.38, value_gap: 66.10, risk: 0, quality_score: 52.40, rating: "STRONG BUY", position: "G", age: 24 },

  { player: "Andrew Nembhard", team: "IND", salary: 2.02, fair_value: 11.39, value_gap: 82.27, risk: 20, quality_score: 52.85, rating: "STRONG BUY", position: "G", age: 26 },

  { player: "Quentin Grimes", team: "PHI", salary: 4.30, fair_value: 12.31, value_gap: 65.10, risk: 0, quality_score: 59.20, rating: "STRONG BUY", position: "G", age: 26 },

  { player: "Jalen Williams", team: "OKC", salary: 4.78, fair_value: 24.15, value_gap: 80.22, risk: 20, quality_score: 69.84, rating: "STRONG BUY", position: "F", age: 24 },

  { player: "Mason Plumlee", team: "PHO", salary: 2.09, fair_value: 13.66, value_gap: 84.72, risk: 25, quality_score: 42.08, rating: "STRONG BUY", position: "C", age: 36 },

];



const teamNames = {

  PHO: "Phoenix Suns", HOU: "Houston Rockets", POR: "Portland Trail Blazers",

  DAL: "Dallas Mavericks", DEN: "Denver Nuggets", CHO: "Charlotte Hornets",

  MIL: "Milwaukee Bucks", PHI: "Philadelphia 76ers", MEM: "Memphis Grizzlies",

  DET: "Detroit Pistons", BRK: "Brooklyn Nets", IND: "Indiana Pacers", OKC: "Oklahoma City Thunder",

};



const HEADSHOTS = {

  "Tyus Jones": "https ://cdn.nba.com/headshots/nba/latest/1040x760/1626145.png",

  "Alperen Sengun": "https ://cdn.nba.com/headshots/nba/latest/1040x760/1630578.png",

  "Toumani Camara": "https ://cdn.nba.com/headshots/nba/latest/1040x760/1641710.png",

  "Spencer Dinwiddie": "https ://cdn.nba.com/headshots/nba/latest/1040x760/1627736.png",

  "Christian Braun": "https ://cdn.nba.com/headshots/nba/latest/1040x760/1631128.png",

  "Devonte' Graham": "https ://cdn.nba.com/headshots/nba/latest/1040x760/1628989.png",

  "Taurean Prince": "https ://cdn.nba.com/headshots/nba/latest/1040x760/1627752.png",

  "Guerschon Yabusele": "https ://cdn.nba.com/headshots/nba/latest/1040x760/1627824.png",

  "Jaylen Wells": "https ://cdn.nba.com/headshots/nba/latest/1040x760/1642377.png",

  "Jalen Duren": "https ://cdn.nba.com/headshots/nba/latest/1040x760/1631105.png",

  "Keon Johnson": "https ://cdn.nba.com/headshots/nba/latest/1040x760/1629661.png",

  "Andrew Nembhard": "https ://cdn.nba.com/headshots/nba/latest/1040x760/1629614.png",

  "Quentin Grimes": "https ://cdn.nba.com/headshots/nba/latest/1040x760/1629656.png",

  "Jalen Williams": "https ://cdn.nba.com/headshots/nba/latest/1040x760/1631114.png",

  "Mason Plumlee": "https ://cdn.nba.com/headshots/nba/latest/1040x760/203486.png",

};



const TEAM_IDS = {

  PHO: 1610612756, HOU: 1610612745, POR: 1610612757, DAL: 1610612742,

  DEN: 1610612743, CHO: 1610612766, MIL: 1610612749, PHI: 1610612755,

  MEM: 1610612763, DET: 1610612765, BRK: 1610612751, IND: 1610612754, OKC: 1610612760,

};



const JERSEYS = {

  "Jalen Williams": "#8", "Alperen Sengun": "#28", "Tyus Jones": "#21", "Toumani Camara": "#33",

  "Spencer Dinwiddie": "#26", "Christian Braun": "#0", "Devonte' Graham": "#4", "Taurean Prince": "#12",

  "Guerschon Yabusele": "#28", "Jaylen Wells": "#0", "Jalen Duren": "#0", "Keon Johnson": "#0",

  "Andrew Nembhard": "#2", "Quentin Grimes": "#5", "Mason Plumlee": "#22",

};



const POSITION_LABELS = { G: "Guard", F: "Forward", C: "Center", "G/F": "Guard / Forward", "F/C": "Forward / Center" };



function TeamLogo({ team }) {

  const [failed, setFailed] = useState(false);

  const id = TEAM_IDS[team];

  if (!id || failed) return <span className="team-logo-fallback">{team}</span>;

  return <img className="team-logo" src={`https ://cdn.nba.com/logos/nba/${id}/primary/L/logo.svg`} alt="" onError={() => setFailed(true)} />;

}



function PlayerHeadshot({ name, large = false, photoMap = {} }) {

  const [failed, setFailed] = useState(false);

  const src = photoMap[name] || HEADSHOTS[name];

  return (

    <span className={`headshot ${large ? "headshot-large" : ""}`} style={{ background: playerImage(name) }}>

      {src && !failed ? <img src={src} alt="" onError={() => setFailed(true)} /> : <span>{initials(name)}</span>}

    </span>

  );

}



function initials(name) {

  return name.split(" ").map((x) => x[0]).join("").slice(0, 2).toUpperCase();

}



function money(v) {

  return `$${Number(v || 0).toFixed(1)}M`;

}



function playerImage(name) {

  const colors = ["#1e293b", "#172554", "#312e81", "#164e63", "#14532d", "#3f1d2e"];

  const idx = [...name].reduce((a, c) => a + c.charCodeAt(0), 0) % colors.length;

  return colors[idx];

}



function Sparkline() {

  const values = [98, 101, 100, 104, 107, 105, 110, 112];

  const max = Math.max(...values), min = Math.min(...values);

  const points = values.map((v, i) => `${(i / (values.length - 1)) * 100},${30 - ((v - min) / (max - min || 1)) * 22}`).join(" ");

  const area = `0,32 ${points} 100,32`;

  return <svg className="spark" viewBox="0 0 100 32" preserveAspectRatio="none">

    <defs><linearGradient id="sparkFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#39a9ff" stopOpacity=".28"/><stop offset="100%" stopColor="#39a9ff" stopOpacity="0"/></linearGradient></defs>

    <polygon points={area} fill="url(#sparkFill)" />

    <polyline points={points} fill="none" stroke="#4ade80" strokeWidth="2" />

  </svg>;

}



function ValueChart({ player }) {

  const values = [player.fair_value * .45, player.fair_value * .52, player.fair_value * .58, player.fair_value * .63, player.fair_value * .67, player.fair_value * .73, player.fair_value * .78, player.fair_value * .84, player.fair_value * .91, player.fair_value];

  const contract = Array.from({ length: 10 }, (_, i) => player.salary * (0.78 + i * .025));

  const x = (i) => 35 + i * 34;

  const y = (v) => 124 - (Math.min(v, 40) / 40) * 92;

  const path = values.map((v, i) => `${i ? "L" : "M"} ${x(i)} ${y(v)}`).join(" ");

  const contractPath = contract.map((v, i) => `${i ? "L" : "M"} ${x(i)} ${y(v)}`).join(" ");

  const area = `M ${x(0)} 124 ${values.map((v, i) => `L ${x(i)} ${y(v)}`).join(" ")} L ${x(values.length - 1)} 124 Z`;

  return (

    <svg viewBox="0 0 365 158" className="value-chart" role="img" aria-label="Estimated market value from 2021 to 2025">

      <defs><linearGradient id="valueArea" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#238fe0" stopOpacity=".34"/><stop offset="100%" stopColor="#238fe0" stopOpacity="0"/></linearGradient></defs>

      {[32, 55, 78, 101, 124].map((yy, i) => <g key={yy}><line x1="35" x2="350" y1={yy} y2={yy} stroke="#203143" strokeWidth="1" /><text x="0" y={yy + 3} className="axis-label">${40 - i * 10}M</text></g>)}

      <path d={area} fill="url(#valueArea)" />

      <path d={path} fill="none" stroke="#42a5ff" strokeWidth="2.5" />

      <path d={contractPath} fill="none" stroke="#9aa9bb" strokeWidth="1.2" strokeDasharray="3 3" />

      {values.map((v, i) => <circle key={i} cx={x(i)} cy={y(v)} r="2.5" fill="#42a5ff" />)}

      {["2021", "2022", "2023", "2024", "2025"].map((label, i) => <text key={label} x={x(i * 2) - 9} y="149" className="axis-label">{label}</text>)}

    </svg>

  );

}



export default function App() {

  const [players, setPlayers] = useState([]);

  const [selected, setSelected] = useState(null);

  const [search, setSearch] = useState("");

  const [position, setPosition] = useState("All Positions");

  const [team, setTeam] = useState("All Teams");

  const [rating, setRating] = useState("All Ratings");

  const [sort, setSort] = useState({ key: "value_gap", dir: "desc" });

  const [watchlist, setWatchlist] = useState([]);

  const [comparison, setComparison] = useState([]);

  const [tab, setTab] = useState("Overview");

  const [showThesis, setShowThesis] = useState(false);

  const [thesis, setThesis] = useState("");

  const [photoMap, setPhotoMap] = useState({});



  useEffect(() => {



    fetch("http://localhost:8000/player-headshots")



      .then((r) => r.ok ? r.json() : {})



      .then((data) => setPhotoMap(data || {}))



      .catch(() => setPhotoMap({}));

    fetch("http://localhost:8000/market")

      .then((r) => r.ok ? r.json() : Promise.reject())

      .then((data) => {

        const normalized = (data.players || []).map((p) => ({

          ...p,

          position: p.position || p.pos || "—",

          age: p.age || 0,

        }));

        setPlayers(normalized);

        setSelected(normalized.find((p) => p.player === "Jalen Williams") || normalized[0] || null);

      })

      .catch(() => {

        setPlayers(FALLBACK_PLAYERS);

        setSelected(FALLBACK_PLAYERS.find((p) => p.player === "Jalen Williams"));

      });

  }, []);



  const filtered = useMemo(() => {

    const result = players.filter((p) => {

      const q = search.toLowerCase();

      return (!q || p.player.toLowerCase().includes(q) || p.team.toLowerCase().includes(q))

        && (position === "All Positions" || p.position === position)

        && (team === "All Teams" || p.team === team)

        && (rating === "All Ratings" || p.rating === rating);

    });

    result.sort((a, b) => {

      const av = Number(a[sort.key] ?? 0), bv = Number(b[sort.key] ?? 0);

      return sort.dir === "desc" ? bv - av : av - bv;

    });

    return result;

  }, [players, search, position, team, rating, sort]);



  const teams = [...new Set(players.map((p) => p.team).filter(Boolean))].sort();

  const positions = [...new Set(players.map((p) => p.position).filter(Boolean))].sort();

  const strongBuys = players.filter((p) => p.rating === "STRONG BUY").length;

  const holds = players.filter((p) => p.rating === "HOLD").length;

  const sells = players.filter((p) => p.rating === "SELL").length;

  const avgGap = players.length ? players.reduce((s, p) => s + Number(p.value_gap || 0), 0) / players.length : 0;



  const chooseSort = (key) => setSort((s) => s.key === key ? { key, dir: s.dir === "desc" ? "asc" : "desc" } : { key, dir: "desc" });



  const toggleWatch = (name) => setWatchlist((w) => w.includes(name) ? w.filter((x) => x !== name) : [...w, name]);

  const toggleCompare = (p) => setComparison((c) => c.some((x) => x.player === p.player) ? c.filter((x) => x.player !== p.player) : c.length < 2 ? [...c, p] : [c[1], p]);



  if (!players.length) return <div className="loading">Loading market...</div>;



  return (

    <div className="app-shell">

      <aside className="sidebar">

        <div className="nba-mark">NBA</div>

        <div className="brand-mini">FRONT<br/>OFFICE</div>

        {[

          ["▥", "Market", true],

          ["♙", "Players"], ["▥", "Analytics"], ["☆", "Watchlist"], ["▤", "Methodology"]

        ].map(([icon, label, active]) => (

          <button key={label} className={`nav-item ${active ? "active" : ""}`} type="button">

            <span>{icon}</span><small>{label}</small>

          </button>

        ))}

      </aside>



      <main className="main">

        <header className="topbar">

          <div>

            <h1>NBA MARKET INTELLIGENCE</h1>

            <p>PLAYER VALUATION &amp; CONTRACT ANALYTICS</p>

          </div>

          <nav className="topnav">

            {["Market", "Players", "Analytics", "Watchlist"].map((x) => <button className={x === "Market" ? "selected-nav" : ""} key={x}>{x}</button>)}

          </nav>

          <div className="season"><span className="status-dot" /> <b>2025–26 Season</b><small>Last updated: Oct 7, 2026</small></div>

        </header>



        <section className="kpis">

          <div className="kpi wide"><span>NBA PLAYER VALUE INDEX</span><strong>112.4 <em>▲ +4.8%</em></strong><Sparkline /></div>

          <div className="kpi"><span>AVG. VALUE GAP</span><strong>{avgGap >= 0 ? "+" : ""}{avgGap.toFixed(1)}%</strong></div>

          <div className="kpi"><span>PLAYERS COVERED</span><strong>{players.length}</strong></div>

          <div className="kpi"><span>STRONG BUY SIGNALS</span><strong className="green">{strongBuys}</strong></div>

          <div className="kpi"><span>HOLD SIGNALS</span><strong>{holds}</strong></div>

          <div className="kpi"><span>SELL SIGNALS</span><strong className="red">{sells}</strong></div>

        </section>



        <section className="workspace">

          <div className="market-panel">

            <div className="section-head">

              <div>

                <h2>PLAYER MARKET</h2>

                <p>Find undervalued talent across the league based on performance, contract value, and risk.</p>

              </div>

            </div>



            <div className="filters">

              <label className="search"><span>⌕</span><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search players..." /></label>

              <select value={position} onChange={(e) => setPosition(e.target.value)}><option>All Positions</option>{positions.map((p) => <option key={p}>{p}</option>)}</select>

              <select value={team} onChange={(e) => setTeam(e.target.value)}><option>All Teams</option>{teams.map((t) => <option key={t}>{t}</option>)}</select>

              <select value={rating} onChange={(e) => setRating(e.target.value)}><option>All Ratings</option><option>STRONG BUY</option><option>BUY</option><option>HOLD</option><option>CAUTION</option><option>SELL</option></select>

            </div>



            <div className="table-wrap">

              <table>

                <thead><tr>

                  <th>#</th><th>PLAYER</th><th>TEAM</th>

                  {[

                    ["fair_value", "EST. VALUE"], ["salary", "CONTRACT"], ["value_gap", "VALUE GAP"], ["risk", "RISK"], ["quality_score", "QUALITY"]

                  ].map(([key, label]) => <th key={key}><button className="sort-btn" onClick={() => chooseSort(key)}>{label}{key !== "value_gap" && sort.key === key ? ` ${sort.dir === "desc" ? "↓" : "↑"}` : ""}</button></th>)}

                  <th>SIGNAL</th>

                </tr></thead>

                <tbody>

                  {filtered.slice(0, 30).map((p, i) => (

                    <tr key={`${p.player}-${i}`} className={selected?.player === p.player ? "row-selected" : ""} onClick={() => { setSelected(p); setTab("Overview"); }}>

                      <td>{i + 1}</td>

                      <td><div className="player-cell"><PlayerHeadshot name={p.player} photoMap={photoMap} /><b>{p.player}</b></div></td>

                      <td><span className="team-cell"><TeamLogo team={p.team} /><span className="team-pill">{p.team}</span></span></td>

                      <td>{money(p.fair_value)}</td>

                      <td>{money(p.salary)}</td>

                      <td className={p.value_gap >= 0 ? "green" : "red"}>{p.value_gap >= 0 ? "+" : ""}{Number(p.value_gap).toFixed(1)}%</td>

                      <td>{Number(p.risk).toFixed(0)}</td>

                      <td>{Number(p.quality_score).toFixed(1)}</td>

                      <td><span className={`signal ${p.rating.replace(" ", "-").toLowerCase()}`}>{p.rating}</span></td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>



          {selected && (

            <aside className="detail">

              <div className="profile">

                <PlayerHeadshot name={selected.player} large photoMap={photoMap} />

                <div className="profile-name"><h2>{selected.player}</h2><p>{teamNames[selected.team] || selected.team} <span>|</span> {JERSEYS[selected.player] || ""} <span>|</span> {POSITION_LABELS[selected.position] || selected.position || "Player"}</p></div>

                <span className={`signal large ${selected.rating.replace(" ", "-").toLowerCase()}`}>{selected.rating}</span>

              </div>



              <div className="tabs">{["Overview", "Stats", "Valuation", "Contract", "Comparison"].map((x) => <button key={x} className={tab === x ? "tab-active" : ""} onClick={() => setTab(x)}>{x}</button>)}</div>



              {tab === "Comparison" ? (

                <div className="comparison">

                  <h3>PLAYER COMPARISON</h3>

                  <p>Select a second player from the market using <b>Compare</b> below.</p>

                  <div className="compare-cards">{comparison.map((p) => <div key={p.player}><b>{p.player}</b><span>{money(p.fair_value)}</span><small>Value gap {p.value_gap.toFixed(1)}%</small></div>)}</div>

                </div>

              ) : (

                <>

                  <div className="metric-grid">

                    <div><b>{money(selected.fair_value)}</b><small>Est. Market Value</small></div>

                    <div><b>{money(selected.salary)}</b><small>Current Contract</small></div>

                    <div><b className="green">+{Number(selected.value_gap).toFixed(1)}%</b><small>Value Gap</small></div>

                    <div><b>{Number(selected.risk).toFixed(0)}</b><small>Risk Score</small></div>

                    <div><b>{Number(selected.quality_score).toFixed(1)}</b><small>Quality Score</small></div>

                    <div><b>{((selected.salary / 154.6) * 100).toFixed(1)}%</b><small>Cap Share</small></div>

                  </div>



                  <div className="chart-card">

                    <div className="chart-head"><h3>ESTIMATED MARKET VALUE</h3><span><i className="blue-dot"/> Estimated Value &nbsp; <i className="gray-dot"/> Contract Value</span></div>

                    <ValueChart player={selected} />

                  </div>



                  <div className="lower-grid">

                    <div className="info-card">

                      <h3>VALUATION DRIVERS</h3>

                      {[

                        ["Scoring", Math.min(100, selected.quality_score + 12)],

                        ["Playmaking", Math.min(100, selected.quality_score + 4)],

                        ["Efficiency", Math.min(100, selected.quality_score + 8)],

                        ["Defense", Math.max(20, selected.quality_score - 15)],

                        ["Availability", Math.max(35, 100 - selected.risk)],

                      ].map(([label, val]) => <div className="bar-row" key={label}><span>{label}</span><div><i style={{width: `${val}%`}} /></div><b>{Math.round(val)}</b></div>)}

                    </div>

                    <div className="info-card assessment">

                      <h3>INVESTMENT ASSESSMENT</h3>

                      <p>{selected.player} is {selected.value_gap >= 50 ? "significantly undervalued" : "closely valued"} relative to the model's estimated market value. The current contract represents {selected.value_gap >= 50 ? "a relatively low" : "a meaningful"} financial commitment. The signal is supported by the player's production, efficiency, availability, and overall quality profile, while the risk score provides a counterweight for durability and longer-term uncertainty. Taken together, the model identifies the contract as an attractive asset relative to the player's estimated on-court value.</p>

                    </div>

                  </div>



                  <div className="lower-grid three">

                    <div className="info-card"><h3>KEY STRENGTHS</h3><p className="check">● High value relative to contract cost</p><p className="check">● Strong production profile</p><p className="check">● Model-supported upside</p><p className="check">● Favorable availability profile</p></div>

                    <div className="info-card"><h3>RISK CONSIDERATIONS</h3><p className="warn">▲ {selected.risk > 15 ? "Moderate availability risk" : "Low availability risk"}</p><p>Long-term performance uncertainty</p></div>

                    <div className="info-card model"><h3>MODEL SIGNAL</h3><strong>{selected.rating}</strong><small>Primary driver<br/>High value relative to contract cost<br/><br/><b className="risk-line">Key risk</b><br/>{selected.risk > 15 ? "Availability / long-term performance" : "Long-term performance uncertainty"}</small></div>

                  </div>



                </>

              )}

            </aside>

          )}

        </section>



        {showThesis && selected && (

          <div className="modal-backdrop" onClick={() => setShowThesis(false)}>

            <form className="modal" onSubmit={(e) => { e.preventDefault(); setShowThesis(false); }} onClick={(e) => e.stopPropagation()}>

              <h2>INVESTMENT THESIS</h2><p>{selected.player} · {selected.rating}</p>

              <textarea value={thesis} onChange={(e) => setThesis(e.target.value)} placeholder="Why are you interested in this player?" autoFocus />

              <div className="modal-actions"><button type="button" onClick={() => setShowThesis(false)}>Cancel</button><button className="primary" type="submit">Save Thesis</button></div>

            </form>

          </div>

        )}

      </main>

    </div>

  );

}
