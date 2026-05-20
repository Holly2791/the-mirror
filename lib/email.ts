import type { ScoreResults } from './scoring'

export interface EmailData {
  firstName: string
  email: string
  scores: ScoreResults
  tierName: string
  responseId: string
  answers?: Record<number, string | string[]>
}

const CALENDLY_URL = 'https://calendly.com/hollylittlecoaching/woman-to-warrior-alignment-call'

async function sendEmail({ to, toName, subject, html, replyTo }: {
  to: string
  toName: string
  subject: string
  html: string
  replyTo?: string
}) {
  const response = await fetch('https://api.sender.net/v2/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SENDER_API_KEY}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      from: {
        email: process.env.SENDER_FROM_EMAIL,
        name: 'Holly Little | Woman to Warrior'
      },
      to: [{ email: to, name: toName }],
      subject,
      html,
      ...(replyTo && { reply_to: replyTo })
    })
  })
  return response.json()
}

const TIER_LEAD: Record<string, string> = {
  dimmed: "You've been holding it all together. But somewhere along the way, you lost yourself in the process.",
  stirring: "Something is waking up in you. You can feel it — and it's time to stop talking yourself out of it.",
  rising: "You are already reclaiming yourself. This work is the accelerant — not the beginning.",
}

const TIER_CLOSING: Record<string, string> = {
  dimmed: "The Warrior in you is ready. She has been ready for longer than you know. Woman to Warrior is the journey back to her — and the life that was always meant to be yours.",
  stirring: "Woman to Warrior is built for the woman at exactly this crossroads. You don't need more information. You need a container that holds you accountable to the shift you can already feel coming.",
  rising: "Woman to Warrior at this level is about expansion, not survival. You are ready to stop growing in private and start leading out loud. Let's go there.",
}

const TIER_BODY: Record<string, string> = {
  dimmed: `You are capable. You have always been capable. But capability has cost you something — the woman underneath it all has been running on a dimmed light for a long time. The roles, the responsibilities, the relentless giving — they buried her. Not because you were weak. Because you were so committed to everyone else that you forgot to be committed to yourself.<br><br>Here's what I need you to hear: you are exactly the woman this work was built for. The fire is still in you — it's just been waiting for permission to rise. That permission starts here.`,
  stirring: `You are in the most powerful and the most dangerous place on this journey. You can feel something shifting. You know there is more for you. You have started asking the questions — and some of the answers have surprised you. But the old patterns are still pulling. The guilt still shows up. The people around you are still comfortable with the version of you that puts herself last.<br><br>This is the moment that defines everything. Not the breakthrough — you've had those before. But what you do with the awareness. Whether you use it, or let it fade back into the daily demand of your life.`,
  rising: `You have done real work on yourself. That is evident. You know who you are beneath the roles. You trust yourself more than you used to. You have boundaries, even if some still bend. You are not starting from scratch — you are building on a foundation that is already solid.<br><br>But you're here because you know there's a next level. You can feel the gap between who you are now and who you're becoming. You are not looking to be fixed — you are looking to be unleashed.`,
}

const LETTERS: Record<string, (firstName: string) => string> = {
  dimmed: (firstName) => `<p>Hi ${firstName},</p>
<p>I know where you are right now.</p>
<p>You're sitting with this result and part of you recognises it — and part of you wishes you didn't. Because seeing it clearly means you can no longer pretend you haven't felt it. The quiet ache. The distance between the woman you show the world and the one you meet in the stillness when everything goes quiet.</p>
<p>You've been holding it together for so long that holding it together became your whole identity. Capable. Reliable. Strong. The one who manages, who gives, who shows up for everyone — even when there is nothing left to show up with.</p>
<p>I know. Because I was her too.</p>
<p>I want to tell you something that no one has probably said to you in a very long time — maybe ever.</p>
<p><strong>You are not too much. You are not too late.</strong></p>
<p>You are a woman who has been running on borrowed power — giving from a well that was never being refilled — and the fact that you are still standing is not a testament to how little you need. It is a testament to how extraordinarily strong you already are.</p>
<p>But strength was never supposed to cost you yourself.</p>
<p>The woman you have become — the one who says yes when she means no, who shrinks so others can be comfortable, who has forgotten what it feels like to want something just for herself — she was built for survival. And she served you. For a long time, she kept you safe.</p>
<p>But she was never meant to be permanent.</p>
<p>The fire in you has not gone out. I know it feels like it has. She is not gone. She has been waiting. Patiently. Faithfully. With a kind of quiet certainty that one day you would stop long enough to remember her.</p>
<p>Today is that day.</p>
<p><strong>That voice? That's me. That's always been me.</strong></p>
<p>Choose yourself. Today. Not when things settle. Not when the kids are older or the business is steadier or you finally feel ready. Now.</p>
<p><strong>It is worth it. You are worth it.</strong></p>
<p>Before you close this and let the moment pass — I want you to do something for me.</p>
<p style="color: #C9962B; font-weight: bold;">What is the one thing you could do today — just today — that will allow you to become one step closer to meeting me, to being me — your future self?</p>
<p>One step. No matter how small. That you can take today to show up for us.</p>
<p>Write it down. Say it out loud. Then don't let today pass without doing it.</p>
<p><em>With love and absolute certainty in you,</em><br><strong>Your Warrior</strong><br><em style="color: #C9962B;">Live with Fierce Grace</em></p>`,

  stirring: (firstName) => `<p>Hi ${firstName},</p>
<p>I see you.</p>
<p>Not the version of you that's been showing up lately — the one who's managing and functioning and holding the line. I see the one underneath her. The one who took this quiz because something has been stirring and she is tired of talking herself out of it.</p>
<p>You are not at the beginning of this journey. You are further along than you know.</p>
<p>Something has already cracked open in you — and that crack is not a flaw. It is the light finding its way in.</p>
<p><strong>That terror? It is not a warning sign. It is a green light.</strong></p>
<p>You have done the hardest part already — you woke up. Most women never do. You felt the stirring and instead of pushing it back down — you followed it here.</p>
<p>That took courage. More than you are giving yourself credit for.</p>
<p><strong>She is not the truth. She is just the last line of defence of a life you have already outgrown.</strong></p>
<p>You are so close. Closer than you have ever been. The gap between where you are and where I am is not a canyon — it is a step.</p>
<p>Don't stop now.</p>
<p>Before you close this and let the moment pass — I want you to do something for me.</p>
<p style="color: #C9962B; font-weight: bold;">What is the one thing you could do today — just today — that will allow you to become one step closer to meeting me, to being me — your future self?</p>
<p>One step. No matter how small. That you can take today to show up for us.</p>
<p>Write it down. Say it out loud. Then don't let today pass without doing it.</p>
<p><em>With love and absolute certainty in you,</em><br><strong>Your Warrior</strong><br><em style="color: #C9962B;">Live with Fierce Grace</em></p>`,

  rising: (firstName) => `<p>Hi ${firstName},</p>
<p>You already know me.</p>
<p>Not as a distant dream or a woman you are hoping to become someday — you have met me. In the moments when you held your ground and surprised yourself. In the decisions you made that the old version of you never would have.</p>
<p>That was me. That has always been me.</p>
<p>And I need you to stop treating me like I am fragile.</p>
<p>You have done real work to get here. You have built something genuine — a foundation of self-knowing that is solid beneath your feet even when life tries to shake it.</p>
<p><strong>You are still playing smaller than you are capable of.</strong></p>
<p>Not in the obvious ways. But in the quiet ones. The moments you hold back a truth because the timing feels wrong. The dreams you are still keeping private.</p>
<p><strong>It is about letting me lead.</strong></p>
<p>She is not far away. She is not even a future version of you. She is you — right now — with the last layer of hesitation finally released.</p>
<p>Before you close this and let the moment pass — I want you to do something for me.</p>
<p style="color: #C9962B; font-weight: bold;">What is the one thing you could do today — just today — that will allow you to become one step closer to meeting me, to being me — your future self?</p>
<p>One step. No matter how small. That you can take today to show up for us.</p>
<p>Write it down. Say it out loud. Then don't let today pass without doing it.</p>
<p><em>With love and absolute certainty in you,</em><br><strong>Your Warrior</strong><br><em style="color: #C9962B;">Live with Fierce Grace</em></p>`,
}

function buildRespondentEmailHTML(data: EmailData): string {
  const { firstName, scores, tierName } = data
  const letter = LETTERS[scores.overallTier]?.(firstName) || ''

  const categories = [
    { name: 'Identity', result: scores.identity },
    { name: 'Energy', result: scores.energy },
    { name: 'Desire', result: scores.desire },
    { name: 'Boundaries', result: scores.boundaries },
    { name: 'Self-Trust', result: scores.selftrust },
  ]

  const categoryRows = categories.map(cat => {
    const tierColor = cat.result.tier === 'low' ? '#C0392B' : cat.result.tier === 'medium' ? '#E8956D' : '#27AE60'
    const tierBg = cat.result.tier === 'low' ? '#FDECEA' : cat.result.tier === 'medium' ? '#FDF0EB' : '#EAF7EE'
    const tierLabel = cat.result.tier === 'low' ? 'Low' : cat.result.tier === 'medium' ? 'Medium' : 'High'
    return `<tr>
      <td style="padding:10px 12px;border-bottom:1px solid #F0EAE0;font-family:Arial,sans-serif;font-size:14px;color:#2C2318;">${cat.name}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #F0EAE0;font-size:14px;color:#2C2318;">${cat.result.score}/18</td>
      <td style="padding:10px 12px;border-bottom:1px solid #F0EAE0;font-size:14px;color:#2C2318;">${cat.result.pct}%</td>
      <td style="padding:10px 12px;border-bottom:1px solid #F0EAE0;">
        <span style="background:${tierBg};color:${tierColor};padding:3px 10px;border-radius:12px;font-size:12px;font-family:Arial,sans-serif;font-weight:600;">${tierLabel}</span>
      </td>
    </tr>`
  }).join('')

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#FAF7F2;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF7F2;">
<tr><td align="center" style="padding:40px 20px;">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;">

<!-- Header -->
<tr><td style="background:#181410;padding:40px;text-align:center;">
  <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;color:#C9962B;text-transform:uppercase;">Woman to Warrior</p>
  <h1 style="margin:0;font-family:Georgia,serif;font-size:36px;color:#FAF7F2;font-weight:400;">The Mirror</h1>
</td></tr>

<!-- Tier -->
<tr><td style="padding:40px;background:#F5EDD8;text-align:center;">
  <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:11px;letter-spacing:2px;color:#4A3F32;text-transform:uppercase;">Your Assessment Shows You To Be:</p>
  <h2 style="margin:0 0 16px;font-family:Georgia,serif;font-size:32px;color:#C9962B;font-style:italic;text-decoration:underline;">${tierName}</h2>
  <p style="margin:0;font-size:18px;font-style:italic;color:#2C2318;line-height:1.6;">${TIER_LEAD[scores.overallTier]}</p>
</td></tr>

<!-- Score -->
<tr><td style="padding:32px 40px;text-align:center;border-bottom:1px solid #F0EAE0;">
  <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:11px;letter-spacing:2px;color:#4A3F32;text-transform:uppercase;">Your Overall Score</p>
  <p style="margin:0;font-family:Georgia,serif;font-size:48px;color:#C9962B;font-weight:700;">${scores.totalScore}<span style="font-size:24px;color:#4A3F32;">/90</span></p>
  <p style="margin:8px 0 0;font-size:18px;color:#4A3F32;">${scores.totalPct}%</p>
</td></tr>

<!-- Category breakdown -->
<tr><td style="padding:32px 40px;">
  <h3 style="margin:0 0 20px;font-family:Arial,sans-serif;font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#181410;">Your Category Breakdown</h3>
  <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #F0EAE0;border-radius:8px;">
    <tr style="background:#F5EDD8;">
      <th style="padding:10px 12px;text-align:left;font-family:Arial,sans-serif;font-size:11px;color:#4A3F32;text-transform:uppercase;letter-spacing:1px;">Category</th>
      <th style="padding:10px 12px;text-align:left;font-family:Arial,sans-serif;font-size:11px;color:#4A3F32;text-transform:uppercase;letter-spacing:1px;">Score</th>
      <th style="padding:10px 12px;text-align:left;font-family:Arial,sans-serif;font-size:11px;color:#4A3F32;text-transform:uppercase;letter-spacing:1px;">%</th>
      <th style="padding:10px 12px;text-align:left;font-family:Arial,sans-serif;font-size:11px;color:#4A3F32;text-transform:uppercase;letter-spacing:1px;">Tier</th>
    </tr>
    ${categoryRows}
  </table>
</td></tr>

<!-- Tier copy -->
<tr><td style="padding:0 40px 32px;">
  <p style="margin:0 0 16px;font-size:17px;line-height:1.7;color:#2C2318;">${TIER_BODY[scores.overallTier]}</p>
  <p style="margin:0;font-size:16px;font-style:italic;color:#4A3F32;">${TIER_CLOSING[scores.overallTier]}</p>
</td></tr>

<!-- Divider -->
<tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #C9962B;"></td></tr>

<!-- Letter -->
<tr><td style="padding:40px;">
  <h3 style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#181410;">Your First Step Forward</h3>
  <p style="margin:0 0 24px;font-family:Georgia,serif;font-size:18px;font-style:italic;color:#C9962B;text-decoration:underline;">A Letter From Your Warrior Self</p>
  <div style="font-family:Georgia,serif;font-style:italic;color:#2C2318;font-size:16px;line-height:1.8;">
    ${letter}
  </div>
</td></tr>

<!-- CTA -->
<tr><td style="background:#C9962B;padding:40px;text-align:center;">
  <h2 style="margin:0 0 16px;font-family:Arial,sans-serif;font-size:22px;color:white;letter-spacing:2px;text-transform:uppercase;">READY FOR MORE?</h2>
  <p style="margin:0 0 24px;font-size:16px;color:white;line-height:1.6;">If you are seriously ready to reclaim the Woman you were always meant to be, click below and make a time to see if the Woman to Warrior program is the right fit for you.</p>
  <a href="${CALENDLY_URL}" style="display:inline-block;background:#2D5A1B;color:white;padding:16px 40px;font-family:Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:1px;text-decoration:none;border-radius:4px;">Book Your Alignment Call</a>
</td></tr>

<!-- Footer -->
<tr><td style="background:#FAF7F2;padding:24px 40px;text-align:center;border-top:1px solid #F0EAE0;">
  <p style="margin:0;font-family:Arial,sans-serif;font-size:11px;color:#4A3F32;letter-spacing:2px;text-transform:uppercase;">Woman to Warrior | Holly Little Coaching</p>
  <p style="margin:8px 0 0;font-size:11px;color:#4A3F32;">© Copyright Holly Little Coaching</p>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`
}

function buildHollyEmailHTML(data: EmailData): string {
  const { firstName, email, scores, tierName, answers } = data

  const categories = [
    { name: 'Identity', result: scores.identity },
    { name: 'Energy', result: scores.energy },
    { name: 'Desire', result: scores.desire },
    { name: 'Boundaries', result: scores.boundaries },
    { name: 'Self-Trust', result: scores.selftrust },
  ]

  const categoryRows = categories.map(cat => {
    const tierLabel = cat.result.tier === 'low' ? 'LOW' : cat.result.tier === 'medium' ? 'MEDIUM' : 'HIGH'
    return `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;">${cat.name}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${cat.result.score}/18</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${cat.result.pct}%</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${tierLabel}</td></tr>`
  }).join('')

  const q36 = (answers?.[36] as string[] | undefined) || []
  const q37 = (answers?.[37] as string[] | undefined) || []
  const q36List = q36.length > 0 ? q36.map(a => `<li>${a}</li>`).join('') : '<li>None selected</li>'
  const q37List = q37.length > 0 ? q37.map(a => `<li>${a}</li>`).join('') : '<li>None selected</li>'

  return `<!DOCTYPE html>
<html>
<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#333;">
  <h2 style="color:#C9962B;border-bottom:2px solid #C9962B;padding-bottom:12px;">New Mirror Submission</h2>
  <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
    <tr><td style="padding:8px;background:#f9f9f9;font-weight:bold;width:140px;">Name</td><td style="padding:8px;">${firstName}</td></tr>
    <tr><td style="padding:8px;background:#f9f9f9;font-weight:bold;">Email</td><td style="padding:8px;"><a href="mailto:${email}">${email}</a></td></tr>
    <tr><td style="padding:8px;background:#f9f9f9;font-weight:bold;">Submitted</td><td style="padding:8px;">${new Date().toLocaleString()}</td></tr>
    <tr><td style="padding:8px;background:#f9f9f9;font-weight:bold;">Overall Score</td><td style="padding:8px;font-size:18px;font-weight:bold;">${scores.totalScore}/90 (${scores.totalPct}%)</td></tr>
    <tr><td style="padding:8px;background:#f9f9f9;font-weight:bold;">Tier</td><td style="padding:8px;color:#C9962B;font-weight:bold;font-size:16px;">${tierName}</td></tr>
  </table>

  <h3>Category Breakdown</h3>
  <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
    <tr style="background:#f0f0f0;">
      <th style="padding:8px 12px;text-align:left;">Category</th>
      <th style="padding:8px 12px;text-align:left;">Score</th>
      <th style="padding:8px 12px;text-align:left;">%</th>
      <th style="padding:8px 12px;text-align:left;">Tier</th>
    </tr>
    ${categoryRows}
  </table>

  <h3>Research Q36: Which of these sounds most like you?</h3>
  <ul>${q36List}</ul>

  <h3>Research Q37: Have you tried to make changes before?</h3>
  <ul>${q37List}</ul>

  <p style="color:#666;font-style:italic;border-top:1px solid #eee;padding-top:16px;">Reply to this email to contact ${firstName} directly.</p>
</body>
</html>`
}

export async function sendRespondentEmail(data: EmailData) {
  const { firstName, email, tierName } = data
  const subject = `Your Mirror Results — ${tierName} | Woman to Warrior`
  const html = buildRespondentEmailHTML(data)
  return sendEmail({ to: email, toName: firstName, subject, html })
}

export async function sendHollyEmail(data: EmailData) {
  const { firstName, email, scores, tierName } = data
  const hollyEmail = process.env.HOLLY_NOTIFICATION_EMAIL || process.env.SENDER_FROM_EMAIL || ''
  const subject = `New Mirror Submission — ${firstName} | ${tierName} | ${scores.totalScore}/90`
  const html = buildHollyEmailHTML(data)
  return sendEmail({ to: hollyEmail, toName: 'Holly Little', subject, html, replyTo: email })
}
