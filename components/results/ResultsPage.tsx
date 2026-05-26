'use client'
import DonutChart from './DonutChart'

interface ResponseData {
  id: string
  first_name: string
  email: string
  tier: string
  total_score: number
  total_pct: number
  identity_score: number
  identity_pct: number
  identity_tier: string
  energy_score: number
  energy_pct: number
  energy_tier: string
  desire_score: number
  desire_pct: number
  desire_tier: string
  boundaries_score: number
  boundaries_pct: number
  boundaries_tier: string
  selftrust_score: number
  selftrust_pct: number
  selftrust_tier: string
  research_q36: string[]
  research_q37: string[]
}

interface Props {
  data: ResponseData
}

const TIER_NAMES: Record<string, string> = {
  dimmed: 'The Dimmed Woman',
  stirring: 'The Stirring',
  rising: 'The Rising Warrior',
}

const TIER_LEAD: Record<string, string> = {
  dimmed: "You've been holding it all together. But somewhere along the way, you lost yourself in the process.",
  stirring: "Something is waking up in you. You can feel it — and it's time to stop talking yourself out of it.",
  rising: "You are already reclaiming yourself. This work is the accelerant — not the beginning.",
}

const TIER_BODY: Record<string, string[]> = {
  dimmed: [
    "You are capable. You have always been capable. But capability has cost you something — the woman underneath it all has been running on a dimmed light for a long time. The roles, the responsibilities, the relentless giving — they buried her. Not because you were weak. Because you were so committed to everyone else that you forgot to be committed to yourself.",
    "Here's what I need you to hear: you are exactly the woman this work was built for. The fire is still in you — it's just been waiting for permission to rise. That permission starts here.",
  ],
  stirring: [
    "You are in the most powerful and the most dangerous place on this journey. You can feel something shifting. You know there is more for you. You have started asking the questions — and some of the answers have surprised you. But the old patterns are still pulling. The guilt still shows up. The people around you are still comfortable with the version of you that puts herself last.",
    "This is the moment that defines everything. Not the breakthrough — you've had those before. But what you do with the awareness. Whether you use it, or let it fade back into the daily demand of your life.",
  ],
  rising: [
    "You have done real work on yourself. That is evident. You know who you are beneath the roles. You trust yourself more than you used to. You have boundaries, even if some still bend. You are not starting from scratch — you are building on a foundation that is already solid.",
    "But you're here because you know there's a next level. You can feel the gap between who you are now and who you're becoming. You are not looking to be fixed — you are looking to be unleashed.",
  ],
}

const TIER_CLOSING: Record<string, string> = {
  dimmed: "The Warrior in you is ready. She has been ready for longer than you know. Woman to Warrior is the journey back to her — and the life that was always meant to be yours.",
  stirring: "Woman to Warrior is built for the woman at exactly this crossroads. You don't need more information. You need a container that holds you accountable to the shift you can already feel coming.",
  rising: "Woman to Warrior at this level is about expansion, not survival. You are ready to stop growing in private and start leading out loud. Let's go there.",
}

const CATEGORY_TIER_COPY: Record<string, Record<string, string>> = {
  identity: {
    low: "She has lost the thread back to herself entirely. The identity she's living was built for survival, not truth.",
    medium: "She knows something is off and she's starting to look. The awareness is there — the path forward isn't yet.",
    high: "She has a real sense of who she is underneath. The work now is letting that woman lead.",
  },
  energy: {
    low: "She is running on borrowed power and has been for a long time. Her energy belongs to everyone but herself.",
    medium: "She is aware of the drain and beginning to reclaim herself in places. The leaks are still significant.",
    high: "She has real command of her energy. She knows what fills her and she protects it.",
  },
  desire: {
    low: "Her desires have gone underground. She has been so focused on others' needs that her own have almost disappeared.",
    medium: "She can feel the pull of something more. She wants it — but permission feels hard to give herself.",
    high: "She knows what she wants and is beginning to act on it. Desire is becoming a compass, not a guilty secret.",
  },
  boundaries: {
    low: "She is living for others' comfort at the cost of her own. Resentment is building underneath the surface.",
    medium: "She is waking up to what her boundaries cost her. She is starting to hold them — and finding it harder than expected.",
    high: "She holds her ground. She has separated others' reactions from her own truth — and that is a significant shift.",
  },
  selftrust: {
    low: "She is operating from a foundation of self-doubt. The approval she needs most — her own — feels the hardest to access.",
    medium: "She is building trust with herself but it's fragile. She knows what she needs — following through is still inconsistent.",
    high: "She trusts herself. She is becoming someone she can rely on — and that changes everything.",
  },
}

const YOUTUBE_URLS: Record<string, string> = {
  dimmed: 'https://www.youtube.com/embed/QyrFYwjHF8E',
  stirring: 'https://www.youtube.com/embed/g8p3Yf8UBXE',
  rising: 'https://www.youtube.com/embed/4b8UwB5Yvhc',
}

function TierBadge({ tier }: { tier: string }) {
  const config = {
    low: { bg: '#FDECEA', color: '#C0392B', label: 'Low' },
    medium: { bg: '#FDF0EB', color: '#E8956D', label: 'Medium' },
    high: { bg: '#EAF7EE', color: '#27AE60', label: 'High' },
  }[tier] || { bg: '#F0EAE0', color: '#4A3F32', label: tier }

  return (
    <span style={{
      background: config.bg,
      color: config.color,
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '11px',
      fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      whiteSpace: 'nowrap',
    }}>
      {config.label}
    </span>
  )
}

function CategoryCard({ name, score, pct, tier, tierCopy }: {
  name: string; score: number; pct: number; tier: string; tierCopy: string
}) {
  return (
    <div style={{ background: 'white', border: '1px solid #F0EAE0', borderRadius: '6px', padding: '28px' }}>
      <h4 style={{ margin: '0 0 14px', fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)', fontSize: '12px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', color: '#181410' }}>
        {name}
      </h4>
      <p style={{ margin: '0 0 22px', fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '17px', lineHeight: '1.6', color: '#4A3F32' }}>
        {tierCopy}
      </p>
      <div style={{ height: '5px', background: '#F0EAE0', borderRadius: '3px', marginBottom: '12px' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: '#C0392B', borderRadius: '3px' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)', fontSize: '15px', fontWeight: '700', color: '#C0392B' }}>{pct}%</span>
        <TierBadge tier={tier} />
      </div>
    </div>
  )
}

const LETTERS: Record<string, (firstName: string) => React.ReactNode> = {
  dimmed: (firstName) => (
    <div style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '19px', fontStyle: 'italic', lineHeight: '1.9', color: '#2C2318' }}>
      <p>Hi {firstName},</p>
      <p>I know where you are right now.</p>
      <p>You're sitting with this result and part of you recognises it — and part of you wishes you didn't. Because seeing it clearly means you can no longer pretend you haven't felt it. The quiet ache. The distance between the woman you show the world and the one you meet in the stillness when everything goes quiet.</p>
      <p>You've been holding it together for so long that holding it together became your whole identity. Capable. Reliable. Strong. The one who manages, who gives, who shows up for everyone — even when there is nothing left to show up with.</p>
      <p>I know. Because I was her too.</p>
      <p>I want to tell you something that no one has probably said to you in a very long time — maybe ever.</p>
      <p style={{ fontStyle: 'normal' }}><strong>You are not too much. You are not too late.</strong></p>
      <p>You are a woman who has been running on borrowed power — giving from a well that was never being refilled — and the fact that you are still standing is not a testament to how little you need. It is a testament to how extraordinarily strong you already are.</p>
      <p>But strength was never supposed to cost you yourself.</p>
      <p>The woman you have become — the one who says yes when she means no, who shrinks so others can be comfortable, who has forgotten what it feels like to want something just for herself — she was built for survival. And she served you. For a long time, she kept you safe.</p>
      <p>But she was never meant to be permanent.</p>
      <p>The fire in you has not gone out. I know it feels like it has. She is not gone. She has been waiting. Patiently. Faithfully. With a kind of quiet certainty that one day you would stop long enough to remember her.</p>
      <p>Today is that day.</p>
      <p>You took this assessment because something in you said enough. Not enough of the life you have — enough of living it at half voltage.</p>
      <p style={{ fontStyle: 'normal' }}><strong>That voice? That's me. That's always been me.</strong></p>
      <p>Choose yourself. Today. Not when things settle. Not when the kids are older or the business is steadier or you finally feel ready. Now. In this moment. With this one small, enormous act of choosing your own life over the comfortable smallness of staying the same.</p>
      <p>That decision is the door. Everything else is what's waiting on the other side.</p>
      <p style={{ fontStyle: 'normal' }}><strong>It is worth it. You are worth it.</strong></p>
      <p>Before you close this and let the moment pass — I want you to do something for me.</p>
      <p style={{ color: '#C9962B', fontStyle: 'normal', fontWeight: 'bold' }}>
        What is the one thing you could do today — just today — that will allow you to become one step closer to meeting me, to being me — your future self?
      </p>
      <p>One step. No matter how small. That you can take today to show up for us.</p>
      <p>Write it down. Say it out loud. Then don't let today pass without doing it.</p>
      <p style={{ marginTop: '36px' }}>
        With love and absolute certainty in you,<br />
        <span style={{ fontStyle: 'normal', fontWeight: 'bold' }}>Your Warrior</span><br />
        <span style={{ color: '#C9962B' }}>Live with Fierce Grace</span>
      </p>
    </div>
  ),
  stirring: (firstName) => (
    <div style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '19px', fontStyle: 'italic', lineHeight: '1.9', color: '#2C2318' }}>
      <p>Hi {firstName},</p>
      <p>I see you.</p>
      <p>Not the version of you that's been showing up lately — the one who's managing and functioning and holding the line. I see the one underneath her. The one who took this quiz because something has been stirring and she is tired of talking herself out of it.</p>
      <p>You are not at the beginning of this journey. You are further along than you know.</p>
      <p>Something has already cracked open in you — and that crack is not a flaw. It is the light finding its way in.</p>
      <p style={{ fontStyle: 'normal' }}><strong>That terror? It is not a warning sign. It is a green light.</strong></p>
      <p>You have done the hardest part already — you woke up. Most women never do. You felt the stirring and instead of pushing it back down — you followed it here.</p>
      <p>That took courage. More than you are giving yourself credit for.</p>
      <p style={{ fontStyle: 'normal' }}><strong>She is not the truth. She is just the last line of defence of a life you have already outgrown.</strong></p>
      <p>You are so close. Closer than you have ever been. The gap between where you are and where I am is not a canyon — it is a step. One deliberate, courageous, non-negotiable step toward the woman you already know you are becoming.</p>
      <p>Don't stop now.</p>
      <p>Before you close this and let the moment pass — I want you to do something for me.</p>
      <p style={{ color: '#C9962B', fontStyle: 'normal', fontWeight: 'bold' }}>
        What is the one thing you could do today — just today — that will allow you to become one step closer to meeting me, to being me — your future self?
      </p>
      <p>One step. No matter how small. That you can take today to show up for us.</p>
      <p>Write it down. Say it out loud. Then don't let today pass without doing it.</p>
      <p style={{ marginTop: '36px' }}>
        With love and absolute certainty in you,<br />
        <span style={{ fontStyle: 'normal', fontWeight: 'bold' }}>Your Warrior</span><br />
        <span style={{ color: '#C9962B' }}>Live with Fierce Grace</span>
      </p>
    </div>
  ),
  rising: (firstName) => (
    <div style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '19px', fontStyle: 'italic', lineHeight: '1.9', color: '#2C2318' }}>
      <p>Hi {firstName},</p>
      <p>You already know me.</p>
      <p>Not as a distant dream or a woman you are hoping to become someday — you have met me. In the moments when you held your ground and surprised yourself. In the decisions you made that the old version of you never would have. In the mornings you woke up and felt — even briefly — like the ground beneath you was yours.</p>
      <p>That was me. That has always been me.</p>
      <p>And I need you to stop treating me like I am fragile.</p>
      <p>You have done real work to get here. You have looked at the parts of yourself that most women never look at. You have built something genuine — a foundation of self-knowing that is solid beneath your feet even when life tries to shake it.</p>
      <p style={{ fontStyle: 'normal' }}><strong>You are still playing smaller than you are capable of.</strong></p>
      <p>Not in the obvious ways. But in the quiet ones. The moments you hold back a truth because the timing feels wrong. The dreams you are still keeping private because you are not quite sure the world is ready for them.</p>
      <p>That gap is where I live. And I am calling you across it.</p>
      <p style={{ fontStyle: 'normal' }}><strong>It is about letting me lead.</strong></p>
      <p>Not the managed, careful, strategic version of me you have been practising. The real one. The one who trusts herself completely. Who speaks before she has permission. Who takes up space not because she has earned it but because she knows it was always hers.</p>
      <p>She is you — right now — with the last layer of hesitation finally released.</p>
      <p>Before you close this and let the moment pass — I want you to do something for me.</p>
      <p style={{ color: '#C9962B', fontStyle: 'normal', fontWeight: 'bold' }}>
        What is the one thing you could do today — just today — that will allow you to become one step closer to meeting me, to being me — your future self?
      </p>
      <p>One step. No matter how small. That you can take today to show up for us.</p>
      <p>Write it down. Say it out loud. Then don't let today pass without doing it.</p>
      <p style={{ marginTop: '36px' }}>
        With love and absolute certainty in you,<br />
        <span style={{ fontStyle: 'normal', fontWeight: 'bold' }}>Your Warrior</span><br />
        <span style={{ color: '#C9962B' }}>Live with Fierce Grace</span>
      </p>
    </div>
  ),
}

export default function ResultsPage({ data }: Props) {
  const tierName = TIER_NAMES[data.tier] || data.tier
  const youtubeUrl = YOUTUBE_URLS[data.tier]
  const isPlaceholder = !youtubeUrl || youtubeUrl.startsWith('PLACEHOLDER')
  const CALENDLY_URL = 'https://calendly.com/hollylittlecoaching/woman-to-warrior-alignment-call'

  const categories = [
    { key: 'identity', name: 'Identity', score: data.identity_score, pct: data.identity_pct, tier: data.identity_tier },
    { key: 'energy', name: 'Energy', score: data.energy_score, pct: data.energy_pct, tier: data.energy_tier },
    { key: 'desire', name: 'Desire', score: data.desire_score, pct: data.desire_pct, tier: data.desire_tier },
    { key: 'boundaries', name: 'Boundaries', score: data.boundaries_score, pct: data.boundaries_pct, tier: data.boundaries_tier },
    { key: 'selftrust', name: 'Self-Trust', score: data.selftrust_score, pct: data.selftrust_pct, tier: data.selftrust_tier },
  ]
  const GOLD_DOT_COLORS = ['#C9962B', '#D4A63A', '#E8C87A', '#F0D89A', '#C9962B']

  return (
    <div style={{ background: '#FAF7F2', minHeight: '100vh' }}>

      {/* ─── SECTION 1: Header ─── */}
      <section style={{ background: '#181410', padding: '80px 24px 72px', textAlign: 'center' }}>
        <p style={{ margin: '0 0 14px', fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)', fontSize: '11px', letterSpacing: '4px', color: '#C9962B', textTransform: 'uppercase' }}>
          Thank you for taking the
        </p>
        <h1 style={{ margin: '0 0 10px', fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '56px', color: '#FAF7F2', fontWeight: '700', letterSpacing: '3px' }}>
          The Mirror
        </h1>
        <p style={{ margin: '0 0 48px', fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)', fontSize: '13px', color: '#E8C87A', letterSpacing: '1px' }}>
          Your full report has been emailed to you.
        </p>

        <div style={{ maxWidth: '620px', margin: '0 auto 52px', textAlign: 'left', background: 'rgba(201,150,43,0.08)', border: '1px solid rgba(201,150,43,0.25)', borderRadius: '4px', padding: '28px 32px' }}>
          <p style={{ margin: '0 0 14px', fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)', fontSize: '11px', letterSpacing: '2px', color: '#C9962B', textTransform: 'uppercase' }}>
            Your Results come in 5 parts — don't skip any:
          </p>
          <ol style={{ margin: 0, paddingLeft: '22px', fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '18px', color: '#E8C87A', lineHeight: '1.9' }}>
            <li>Your overall assessment</li>
            <li>Your Results Framework and how you score in the 5 categories</li>
            <li>Your 1st Step Forward — a letter from your future self where she asks something of you</li>
            <li>Your Bonus personal results walk-through video</li>
            
          </ol>
        </div>

        <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)', fontSize: '12px', letterSpacing: '3px', color: '#F5EDD8', textTransform: 'uppercase' }}>
          Your Assessment Shows You To Be:
        </p>
        <h2 style={{ margin: '0 0 24px', fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '52px', color: '#C9962B', fontStyle: 'italic', textDecoration: 'underline', textUnderlineOffset: '6px' }}>
          {tierName}
        </h2>
        <p style={{ margin: '0 auto 28px', fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '21px', fontStyle: 'italic', color: '#E8C87A', maxWidth: '600px', lineHeight: '1.6' }}>
          {TIER_LEAD[data.tier]}
        </p>
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'left' }}>
          {TIER_BODY[data.tier]?.map((para, i) => (
            <p key={i} style={{ margin: '0 0 18px', fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '18px', color: '#FAF7F2', lineHeight: '1.75' }}>{para}</p>
          ))}
          <p style={{ margin: 0, fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '18px', fontStyle: 'italic', color: '#E8C87A', lineHeight: '1.75' }}>
            {TIER_CLOSING[data.tier]}
          </p>
        </div>
      </section>

      {/* ─── SECTION 2: Score Graphic ─── */}
      <section style={{ background: '#F5EDD8', padding: '80px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '48px', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ flexShrink: 0 }}>
              <DonutChart categories={categories} totalPct={data.total_pct} />
            </div>
            <div style={{ flex: '1', minWidth: '260px' }}>
              <h3 style={{ margin: '0 0 20px', fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: '#181410', fontWeight: '700' }}>
                Category Breakdown
              </h3>
              {categories.map((cat, i) => (
                <div key={cat.key} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0', borderBottom: '1px solid #E8DCC8' }}>
                  <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: GOLD_DOT_COLORS[i], flexShrink: 0, border: '1px solid rgba(0,0,0,0.08)' }} />
                  <span style={{ flex: 1, fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)', fontSize: '13px', fontWeight: '600', color: '#181410' }}>{cat.name}</span>
                  <span style={{ fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)', fontSize: '13px', color: '#4A3F32', marginRight: '12px' }}>{cat.pct}%</span>
                  <TierBadge tier={cat.tier} />
                </div>
              ))}
              <div style={{ marginTop: '20px', padding: '16px', background: '#FAF7F2', borderRadius: '4px', textAlign: 'center' }}>
                <p style={{ margin: 0, fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)', fontSize: '11px', color: '#4A3F32', letterSpacing: '1px' }}>
                  Overall Score: <strong style={{ color: '#C9962B', fontSize: '15px' }}>{data.total_score}/90 ({data.total_pct}%)</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: The Five Categories ─── */}
      <section style={{ background: '#FAF7F2', padding: '80px 24px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '42px', color: '#C9962B', marginBottom: '64px', fontWeight: '400' }}>
            The Five Categories
          </h2>

          {/* Row 1 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '52px', marginBottom: '52px' }}>
            <div>
              <p style={{ margin: '0 0 6px', fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '22px', color: '#C9962B' }}>❧</p>
              <h3 style={{ margin: '0 0 20px', fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)', fontSize: '12px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', color: '#181410' }}>Why These Five Categories</h3>
              <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '18px', lineHeight: '1.75', color: '#2C2318' }}>The Mirror does not measure your performance. It does not score how well you are doing at life or how close you are to someone else's idea of success.</p>
              <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '18px', lineHeight: '1.75', color: '#2C2318' }}>It measures the five areas that determine whether you are living from your true self or from the identity you built to survive. Whether you are operating from your own power or giving it away. Whether the life you are living is genuinely yours.</p>
              <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '18px', lineHeight: '1.75', color: '#2C2318' }}>These five categories were chosen because they are the five places where women most consistently lose themselves — and the five places where the Woman to Warrior transformation does its deepest work.</p>
              <p style={{ margin: 0, fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '17px', fontStyle: 'italic', color: '#8B1A1A', lineHeight: '1.7' }}>Read each explanation before you look at your scores. Understanding what is being measured changes everything about how you receive your results.</p>
            </div>
            <div>
              <p style={{ margin: '0 0 6px', fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '22px', color: '#C9962B' }}>❧</p>
              <h3 style={{ margin: '0 0 20px', fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)', fontSize: '12px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', color: '#181410' }}>Identity</h3>
              <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '18px', lineHeight: '1.75', color: '#2C2318' }}>This is the foundation of everything. Identity measures how clearly you know who you are underneath the roles you play — mother, partner, professional, caretaker. When your identity is intact, you make decisions from your own truth. When it has been eroded by years of giving, performing, and adapting to everyone else's needs, you lose the thread back to yourself.</p>
              <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '18px', lineHeight: '1.75', color: '#2C2318' }}>You start living a life that was shaped by everyone else's expectations and call it your own.</p>
              <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '18px', lineHeight: '1.75', color: '#2C2318' }}>This category reveals whether you are living from yourself — or whether you have simply become whoever the room needed you to be. It is not a judgment. It is a starting point. Because you cannot change an identity you cannot see clearly.</p>
              <p style={{ margin: 0, fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '17px', fontStyle: 'italic', fontWeight: 'bold', color: '#2C2318', lineHeight: '1.7' }}>Before anything else can shift, she needs to see who she has become. Identity is where that seeing begins.</p>
            </div>
          </div>

          {/* Row 2 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '52px', marginBottom: '52px' }}>
            <div>
              <p style={{ margin: '0 0 6px', fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '22px', color: '#C9962B' }}>❧</p>
              <h3 style={{ margin: '0 0 20px', fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)', fontSize: '12px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', color: '#181410' }}>Energy</h3>
              <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '18px', lineHeight: '1.75', color: '#2C2318' }}>Energy is not just physical. It is the currency of your life. This category measures where your energy is actually going and whether you are operating from your own reserves or running on empty.</p>
              <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '18px', lineHeight: '1.75', color: '#2C2318' }}>Most women in this work have spent years giving their best to everyone else and functioning on what is left. They call it strength. It is actually depletion. The exhaustion that sleep does not fix. The flatness that sits beneath a perfectly managed life.</p>
              <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '18px', lineHeight: '1.75', color: '#2C2318' }}>When your energy is sovereign — when you know how to fill yourself and protect what fills you — everything changes. Your presence changes. Your decisions change. The way the world responds to you changes.</p>
              <p style={{ margin: 0, fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '17px', fontStyle: 'italic', fontWeight: 'bold', color: '#2C2318', lineHeight: '1.7' }}>Energy is not a wellness conversation. It is a power conversation.</p>
            </div>
            <div>
              <p style={{ margin: '0 0 6px', fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '22px', color: '#C9962B' }}>❧</p>
              <h3 style={{ margin: '0 0 20px', fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)', fontSize: '12px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', color: '#181410' }}>Desire</h3>
              <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '18px', lineHeight: '1.75', color: '#2C2318' }}>Desire is the compass your soul uses to navigate. This category measures how connected you are to what you actually want — not what you think you should want, not what would be convenient for everyone around you, but what is true and alive in you.</p>
              <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '18px', lineHeight: '1.75', color: '#2C2318' }}>Most women have silenced their desires so consistently and for so long that they have genuinely lost access to them. They confuse contentment with aliveness. They mistake obligation for purpose.</p>
              <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '18px', lineHeight: '1.75', color: '#2C2318' }}>Reconnecting with desire is not selfish. It is essential. A woman who knows what she wants moves through the world with a clarity and magnetism that cannot be manufactured.</p>
              <p style={{ margin: 0, fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '17px', fontStyle: 'italic', fontWeight: 'bold', color: '#2C2318', lineHeight: '1.7' }}>Your desires are not a distraction from your life. They are the direction of it.</p>
            </div>
          </div>

          {/* Row 3 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '52px', marginBottom: '64px' }}>
            <div>
              <p style={{ margin: '0 0 6px', fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '22px', color: '#C9962B' }}>❧</p>
              <h3 style={{ margin: '0 0 20px', fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)', fontSize: '12px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', color: '#181410' }}>Boundaries</h3>
              <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '18px', lineHeight: '1.75', color: '#2C2318' }}>Boundaries are not walls. They are the clearest expression of self-respect a woman can have. This category measures whether you are choosing your life — or living in constant reaction to everyone else's needs, moods, and expectations.</p>
              <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '18px', lineHeight: '1.75', color: '#2C2318' }}>Without boundaries, resentment builds quietly beneath the surface. You say yes when you mean no. You shrink to keep the peace. You hand your power away in small, daily acts of accommodation that feel like love but are actually self-abandonment.</p>
              <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '18px', lineHeight: '1.75', color: '#2C2318' }}>A woman with real boundaries is not hard or cold. She is grounded. She knows where she ends and others begin — and she holds that line not with aggression but with clarity and grace.</p>
              <p style={{ margin: 0, fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '17px', fontStyle: 'italic', fontWeight: 'bold', color: '#2C2318', lineHeight: '1.7' }}>A boundary is not a wall that keeps others out. It is the line that keeps you in.</p>
            </div>
            <div>
              <p style={{ margin: '0 0 6px', fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '22px', color: '#C9962B' }}>❧</p>
              <h3 style={{ margin: '0 0 20px', fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)', fontSize: '12px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', color: '#181410' }}>Self-Trust</h3>
              <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '18px', lineHeight: '1.75', color: '#2C2318' }}>This is the one that changes everything. Self-trust measures how deeply you back yourself — whether you act on your own instincts or constantly seek external permission before you move.</p>
              <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '18px', lineHeight: '1.75', color: '#2C2318' }}>A woman who does not trust herself will always be at the mercy of other people's opinions, other people's approval, other people's version of who she should be. She will second-guess her decisions, abandon her commitments to herself, and hand her authority to anyone who seems more certain than she feels.</p>
              <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '18px', lineHeight: '1.75', color: '#2C2318' }}>When self-trust is restored — when you become a woman you can genuinely rely on — the need for external validation quietly dissolves. You stop asking for permission. You stop waiting to feel ready. You simply move.</p>
              <p style={{ margin: 0, fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '17px', fontStyle: 'italic', fontWeight: 'bold', color: '#2C2318', lineHeight: '1.7' }}>Self-trust is not confidence. It is something deeper. It is the unshakeable knowing that whatever comes, you will handle it.</p>
            </div>
          </div>

          {/* Closing */}
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto', padding: '52px', background: '#F5EDD8', borderRadius: '4px' }}>
            <h3 style={{ margin: '0 0 24px', fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)', fontSize: '13px', letterSpacing: '3px', textTransform: 'uppercase', color: '#181410', fontWeight: '700' }}>Now Look At Your Scores</h3>
            <p style={{ margin: '0 0 18px', fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '18px', lineHeight: '1.75', color: '#2C2318' }}>With these five categories in mind, go back to your results. You are not looking for where you failed. You are looking for where you have been living at less than your full voltage — and where the work is already beginning.</p>
            <p style={{ margin: '0 0 18px', fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '18px', lineHeight: '1.75', color: '#2C2318' }}>Every low score is not a verdict. It is an invitation. Every high score is not a finish line. It is a foundation to build from.</p>
            <p style={{ margin: 0, fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '18px', lineHeight: '1.75', color: '#2C2318' }}>The woman you are becoming does not need to be perfect across all five. She needs to be honest about where she actually is. Because honest is where the real work begins.</p>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: Results Framework ─── */}
      <section style={{ background: '#F0EAE0', padding: '80px 24px' }}>
        <div style={{ maxWidth: '920px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)', fontSize: '20px', fontWeight: '700', color: '#181410', letterSpacing: '1px', marginBottom: '48px', textTransform: 'uppercase' }}>
            Your Results Framework:
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '20px' }}>
            {categories.slice(0, 4).map(cat => (
              <CategoryCard
                key={cat.key}
                name={cat.name}
                score={cat.score}
                pct={cat.pct}
                tier={cat.tier}
                tierCopy={CATEGORY_TIER_COPY[cat.key]?.[cat.tier] || ''}
              />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ maxWidth: '460px', width: '100%' }}>
              <CategoryCard
                name={categories[4].name}
                score={categories[4].score}
                pct={categories[4].pct}
                tier={categories[4].tier}
                tierCopy={CATEGORY_TIER_COPY[categories[4].key]?.[categories[4].tier] || ''}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: Letter ─── */}
      <section style={{ background: '#FAF7F2', padding: '80px 24px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <h2 style={{ margin: '0 0 10px', fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)', fontSize: '16px', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', color: '#181410' }}>
              Your First Step Forward
            </h2>
            <p style={{ margin: 0, fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '24px', fontStyle: 'italic', color: '#C9962B', textDecoration: 'underline', textUnderlineOffset: '5px' }}>
              A Letter From Your Warrior Self
            </p>
          </div>
          {LETTERS[data.tier]?.(data.first_name)}
        </div>
      </section>

      {/* ─── SECTION 6: Video ─── */}
      <section style={{ background: '#2D5A1B', padding: '80px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ margin: '0 0 40px', fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)', fontSize: '16px', fontWeight: '700', letterSpacing: '3px', color: 'white', textTransform: 'uppercase' }}>
            HERE'S YOUR VIDEO WALKTHROUGH OF YOUR SCORE
          </h2>
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '4px', background: 'rgba(0,0,0,0.3)' }}>
            {!isPlaceholder ? (
              <iframe
                src={youtubeUrl}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="22" height="26" viewBox="0 0 22 26" fill="none"><path d="M2 2L20 13L2 24V2Z" fill="rgba(255,255,255,0.4)" /></svg>
                </div>
                <p style={{ margin: 0, fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)', fontSize: '13px', color: 'rgba(255,255,255,0.5)', letterSpacing: '1px' }}>
                  Your personalised video walkthrough will appear here.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

 {/* ─── SECTION 6B: Unbecoming Bonus ─── */}
      <section style={{ background: '#181410', padding: '80px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ margin: '0 0 12px', fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)', fontSize: '11px', letterSpacing: '4px', color: '#C9962B', textTransform: 'uppercase', fontWeight: '700' }}>
            ★ BONUS TRAINING ★
          </p>
          <h2 style={{ margin: '0 0 24px', fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '42px', color: '#FAF7F2', fontWeight: '400', fontStyle: 'italic' }}>
            The Unbecoming
          </h2>
          <p style={{ margin: '0 auto 40px', fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '19px', color: '#E8C87A', maxWidth: '640px', lineHeight: '1.8', fontStyle: 'italic' }}>
            Seeing yourself clearly is the first step. The Unbecoming is the second.
          </p>
          <p style={{ margin: '0 auto 48px', fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '18px', color: '#FAF7F2', maxWidth: '640px', lineHeight: '1.8' }}>
            This specially created training takes you into the next stage of the journey — the moment the old identity begins to lose its hold. The patterns you inherited. The stories you were handed. The version of yourself you built for survival rather than truth.
            <br /><br />
            In 20 minutes you will understand exactly what has been keeping you stuck — not as a concept, but as a felt, lived recognition that creates the opening for everything to shift.
          </p>
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '4px', background: 'rgba(0,0,0,0.3)' }}>
            <iframe
              src="https://www.youtube.com/embed/rWsxl6yELJE"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>
      
      {/* ─── SECTION 7: CTA ─── */}
      <section style={{ background: '#C9962B', padding: '80px 24px', textAlign: 'center' }}>
        <h2 style={{ margin: '0 0 20px', fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)', fontSize: '30px', fontWeight: '700', color: 'white', letterSpacing: '4px', textTransform: 'uppercase' }}>
          READY FOR MORE?
        </h2>
        <p style={{ margin: '0 auto 40px', fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '20px', color: 'white', maxWidth: '580px', lineHeight: '1.7' }}>
          If you are seriously ready to reclaim the Woman you were always meant to be then click on the link below and make a time to see if the Woman to Warrior program is the right fit for you.
        </p>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            background: '#2D5A1B',
            color: 'white',
            padding: '20px 56px',
            fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)',
            fontSize: '13px',
            fontWeight: '700',
            letterSpacing: '2px',
            textDecoration: 'none',
            borderRadius: '2px',
            textTransform: 'uppercase',
          }}
        >
          Contact Holly Today
        </a>
      </section>

      {/* Footer */}
      <footer style={{ background: '#FAF7F2', padding: '36px 24px', borderTop: '1px solid #F0EAE0' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ margin: 0, fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)', fontSize: '13px', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', color: '#181410' }}>
            WOMAN TO WARRIOR
          </p>
          <p style={{ margin: 0, fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)', fontSize: '11px', color: '#4A3F32' }}>
            © Copyright Holly Little Coaching
          </p>
        </div>
      </footer>
    </div>
  )
}
