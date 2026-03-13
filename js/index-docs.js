/* ═══════════════════════════════════════
   FIELD DEFINITIONS
═══════════════════════════════════════ */
window.DOCS = {

  business: {
    label: 'Business Profile',
    icon: '🏢',
    sub: 'Core identity, what you do, who you serve, and how your business operates.',
    sections: [
      {
        label: 'Core Identity',
        fields: [
          { key:'biz_name',        name:'Business Name',         ghl:'Authority - Business Name',        desc:'Your primary brand name', placeholder:'e.g. GHL University', rows:1 },
          { key:'biz_role',        name:'Your Role / Title',     ghl:'Authority - Founder Role',         desc:'How you position yourself', placeholder:'e.g. Authority Engineer & Systems Architect', rows:1 },
          { key:'biz_what',        name:'What You Do',           ghl:'Authority - What You Do',          desc:'One clear sentence on what the business does', placeholder:'e.g. We help coaches turn their messy GHL into a clean Authority Operating System', rows:2 },
          { key:'biz_who',         name:'Who You Serve',         ghl:'Authority - Who You Serve',        desc:'Your core target market', placeholder:'e.g. Already-monetized coaches and consultants doing $10k–$100k+/mo using GHL', rows:2 },
          { key:'biz_mantra',      name:'Brand Mantra',          ghl:'Authority - Brand Mantra',         desc:'Your core operating principle', placeholder:'e.g. Structure over chaos. Authority installed.', rows:1 },
        ]
      },
      {
        label: 'Positioning',
        fields: [
          { key:'biz_positioning', name:'Primary Positioning Line', ghl:'Authority - Positioning Line', desc:'Your main external-facing statement', placeholder:'e.g. Turn GHL into a simple system that actually runs your business', rows:2 },
          { key:'biz_clarifier',   name:'Clarifier',              ghl:'Authority - Clarifier',          desc:'A supporting sentence that expands on the positioning line', placeholder:'e.g. We install a clean Authority Operating System in Go High Level...', rows:2 },
          { key:'biz_category',    name:'Category Label',         ghl:'Authority - Category',           desc:'How you define the category you compete in', placeholder:'e.g. Authority Systems & GHL Implementation Partner for Coaches', rows:1 },
        ]
      },
      {
        label: 'Ideal Buyer',
        fields: [
          { key:'biz_buyer_stage', name:'Buyer Stage / Revenue',  ghl:'Authority - Buyer Stage',        desc:'Where your ideal buyer is in their journey', placeholder:'e.g. Already monetized at $10k–$100k+/month with a proven offer', rows:1 },
          { key:'biz_buyer_pain',  name:'Primary Pain Point',     ghl:'Authority - Primary Pain',       desc:'The #1 problem your ideal client is experiencing', placeholder:'e.g. Messy GHL, founder bottleneck, every launch feels like a rebuild', rows:2 },
          { key:'biz_buyer_want',  name:'Desired Outcome',        ghl:'Authority - Desired Outcome',    desc:'What they ultimately want to achieve', placeholder:'e.g. One clean system that runs their business without them being the bottleneck', rows:2 },
          { key:'biz_repels',      name:'Who You Repel',          ghl:'Authority - Who You Repel',      desc:'Who this is NOT for — be specific', placeholder:'e.g. Beginners without offers, hack hunters, anti-structure personalities', rows:2 },
        ]
      },
    ]
  },

  brand: {
    label: 'Brand Guidelines',
    icon: '🎨',
    sub: 'Voice, tone, visual identity, and communication standards.',
    sections: [
      {
        label: 'Voice & Tone',
        fields: [
          { key:'brand_voice',      name:'Voice Attributes',      ghl:'Authority - Brand Voice',         desc:'Core adjectives that define how you communicate', placeholder:'e.g. Direct, Calm, Structured, Insightful, No-hype', rows:1 },
          { key:'brand_tone',       name:'Tone Description',      ghl:'Authority - Brand Tone',          desc:'How the tone feels in practice', placeholder:'e.g. Operator-to-operator. Friendly but not chummy. Smart but not academic.', rows:2 },
          { key:'brand_avoid',      name:'What To Avoid',         ghl:'Authority - Brand Avoid',         desc:'Language, phrases, and styles to never use', placeholder:'e.g. Hype income claims, bro-marketing, hustle culture, emoji spam', rows:2 },
        ]
      },
      {
        label: 'Messaging',
        fields: [
          { key:'brand_tagline',    name:'Primary Tagline',        ghl:'Authority - Tagline',             desc:'Your most repeatable short phrase', placeholder:'e.g. Authority · Systems · Scale', rows:1 },
          { key:'brand_promise',    name:'Core Promise',           ghl:'Authority - Core Promise',        desc:'What you guarantee to deliver (not revenue)', placeholder:'e.g. A clean, documented Authority OS in GHL. Working systems guaranteed.', rows:2 },
          { key:'brand_pillars',    name:'Messaging Pillars',      ghl:'Authority - Messaging Pillars',   desc:'The 3–5 recurring themes across all content', placeholder:'e.g. Authority-first · Simple scalable GHL builds · Virtual events as growth engine', rows:2 },
          { key:'brand_enemy',      name:'The Enemy (The Old Way)', ghl:'Authority - Brand Enemy',        desc:'What you stand against — the chaos you replace', placeholder:'e.g. Duct-taped tools, random snapshots, personality-dependent businesses, heroic launches', rows:2 },
        ]
      },
      {
        label: 'Visual Identity',
        fields: [
          { key:'brand_colors',     name:'Brand Colors',           ghl:'Authority - Brand Colors',        desc:'Your official color palette with hex codes', placeholder:'e.g. Navy #01243D · Yellow #FFBB00 · Green #37CA37 · Blue #158AF6', rows:1 },
          { key:'brand_fonts',      name:'Fonts',                  ghl:'Authority - Brand Fonts',         desc:'Typography choices for headings and body', placeholder:'e.g. Montserrat (headings/UI) · Century Gothic (logo only)', rows:1 },
          { key:'brand_vibe',       name:'Design Vibe',            ghl:'Authority - Design Vibe',         desc:'How the visual aesthetic feels overall', placeholder:'e.g. Clean dashboard meets private equity deck. Dark navy, gold accents, generous whitespace.', rows:2 },
        ]
      },
    ]
  },

  audience: {
    label: 'Audience Profile',
    icon: '👥',
    sub: 'Detailed profiles of your four priority market segments.',
    sections: [
      {
        label: 'Priority Segment 1 — Core Client (Messy GHL)',
        fields: [
          { key:'aud1_situation',   name:'Current Situation',      ghl:'Authority - Seg1 Situation',      desc:'Where they are right now', placeholder:'e.g. Monetized coach with messy GHL, layered snapshots, founder bottleneck', rows:2 },
          { key:'aud1_triggers',    name:'Buying Triggers',        ghl:'Authority - Seg1 Triggers',       desc:'What makes them reach out and buy', placeholder:'e.g. Launch breaks, missed leads, VA touches something and it breaks, fear during events', rows:2 },
          { key:'aud1_pains',       name:'Core Pains (VOC)',       ghl:'Authority - Seg1 Pains',          desc:'Exact language your client uses to describe their pain', placeholder:'e.g. "I can\'t scale if my backend keeps breaking." "Nobody else understands the system."', rows:3 },
          { key:'aud1_outcomes',    name:'Desired Outcomes',       ghl:'Authority - Seg1 Outcomes',       desc:'What success looks like for them in 90 days', placeholder:'e.g. Clean pipelines, repeatable event engine, founder out of day-to-day tech', rows:2 },
        ]
      },
      {
        label: 'Priority Segment 2 — Migrating Expert',
        fields: [
          { key:'aud2_situation',   name:'Current Situation',      ghl:'Authority - Seg2 Situation',      desc:'Where they are right now', placeholder:'e.g. On Kajabi/ClickFunnels + Zapier, wants to consolidate into GHL', rows:2 },
          { key:'aud2_triggers',    name:'Buying Triggers',        ghl:'Authority - Seg2 Triggers',       desc:'What pushes them to make a move', placeholder:'e.g. Integrations break, rising costs, peer running clean GHL, pre-launch desire to fix foundation', rows:2 },
          { key:'aud2_objections',  name:'Key Objections',         ghl:'Authority - Seg2 Objections',     desc:'What holds them back from buying', placeholder:'e.g. Migration risk, losing data, "we can\'t pause launches", fear of downtime', rows:2 },
        ]
      },
      {
        label: 'Priority Segment 3 & 4 — Agency + DIY',
        fields: [
          { key:'aud3_agency',      name:'GHL Agency Profile',     ghl:'Authority - Seg3 Agency',         desc:'Who the GHL agency/implementer is and what they need', placeholder:'e.g. Builds for clients, inconsistent architecture, wants standardized launchpads and delivery', rows:2 },
          { key:'aud4_diy',         name:'DIY Operator Profile',   ghl:'Authority - Seg4 DIY',            desc:'Who the self-directed learner is and what they need', placeholder:'e.g. Earlier stage, learning via YouTube/Skool, wants structured path, may upgrade later', rows:2 },
        ]
      },
    ]
  },

  offers: {
    label: 'Offers Portfolio',
    icon: '💼',
    sub: 'Your complete offer ladder, pricing, and delivery model.',
    sections: [
      {
        label: 'Core Offers',
        fields: [
          { key:'offer_free',       name:'Free / DIY Offer',       ghl:'Authority - Offer Free',          desc:'Your free entry point and what it includes', placeholder:'e.g. GHL University (Free Skool) — level-gated classroom, community, occasional trainings', rows:2 },
          { key:'offer_premium',    name:'Premium / Low-Ticket',   ghl:'Authority - Offer Premium',       desc:'Your paid entry offer with price and inclusions', placeholder:'e.g. GHL University Premium — $97/mo · Bi-weekly live sessions, replays, templates', rows:2 },
          { key:'offer_standard',   name:'Standard Tier',          ghl:'Authority - Offer Standard',      desc:'Your core implementation offer', placeholder:'e.g. Authority Accelerator — $997/mo · Foundation build, Authority OS, Private WhatsApp + Basecamp', rows:2 },
          { key:'offer_premium2',   name:'Premium Tier',           ghl:'Authority - Offer Premium Tier',  desc:'Your mid-level implementation offer', placeholder:'e.g. Authority Presence — $2,497/mo · Audience + authority build layer on top of Standard', rows:2 },
          { key:'offer_vip',        name:'VIP / Partnership Tier', ghl:'Authority - Offer VIP',           desc:'Your highest-touch offer', placeholder:'e.g. Authority Mastery — $25k PIF or 6×$4,997 · 6-month partnership, weekly Zoom calls', rows:2 },
        ]
      },
      {
        label: 'Supporting Offers',
        fields: [
          { key:'offer_1on1',       name:'1:1 Session Offers',     ghl:'Authority - Offer 1on1',          desc:'Your standalone session offerings', placeholder:'e.g. Tech Support $347/45min · Deep Dive $697/90min · Bundle 4-pack $1,997', rows:2 },
          { key:'offer_platform',   name:'Platform / Tool',        ghl:'Authority - Offer Platform',      desc:'Your implementation platform', placeholder:'e.g. AI Profit Launchpad — white-label GHL, included with any paid tier', rows:1 },
        ]
      },
      {
        label: 'Delivery & Guarantee',
        fields: [
          { key:'offer_promise',    name:'Core Promise',           ghl:'Authority - Offer Promise',       desc:'What you guarantee to deliver', placeholder:'e.g. We install a clean Authority OS in GHL so your programs fill without tech chaos', rows:2 },
          { key:'offer_guarantee',  name:'Guarantee Language',     ghl:'Authority - Guarantee',           desc:'Your official guarantee statement (not revenue)', placeholder:'e.g. We guarantee implementation and working systems. We do not guarantee specific revenue or results.', rows:2 },
          { key:'offer_exclusions', name:'What\'s Out of Scope',   ghl:'Authority - Exclusions',          desc:'What you explicitly do not provide', placeholder:'e.g. Ads management, full DFY copywriting, social management, beginner offer creation', rows:2 },
        ]
      },
    ]
  },
};
