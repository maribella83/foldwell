# FOLDWELL — App Build Blueprint

*A parent-first app where families trade real words, on paper or by voice, inside a container that grows with the child and turns into a keepsake you can hold.*

CircleRootTech LLC | Maribel, Founder | October 2026 | Confidential
**Status:** Building has started (Maribel's decision, October 2026). The paper test (Section 11) runs in parallel, and later phases wait for its results. See Kickoff-Plan.md.

---

## 0. NAME STATUS: Foldwell

**Decided October 2026:** the app is named **Foldwell**, chosen after a USPTO search and domain check. iOS bundle ID and Android package: `com.circleroottech.foldwell`. Still to do: check the App Store, Google Play, and social handles by hand, and ask an attorney before filing a trademark.

History: the earlier working name "Passing Notes" turned out to be taken and widely used. Earlier search findings (October 2026, web search only):
- No iPhone app with this exact name turned up.
- A Substack newsletter called "Passing Notes" exists (passingnotes.online). Different category, but it affects the domain.
- "Passing notes" is a common phrase, so it is harder to protect and stand out in search.
- Ruled out: Dearly (taken, including a close competitor), Say It Again (crowded), Gold Ribbon (international symbol of childhood cancer awareness), Accolades for Life (awards framing; hard for kids), Note Jar (crowded with "jar" apps).
- Still unchecked: Words Worth Keeping, Worth Saying, Proud of You, Folded, Tuck, Pass It Back.

Consider an App Store subtitle such as "Foldwell: Family Keepsakes."

## 1. MISSION

Earlier generations got love in writing: a lunchbox note, a card under the pillow, a message on the fridge. Today's kids get most communication through screens, and much of it is generic.

Foldwell helps parents and kids trade **their own real words** and turns them into something **physical and lasting**: printed cards and a bound keepsake book.

## 2. THE SPINE: PAPER-FIRST, VOICE-FIRST FOR LITTLE KIDS, APP-ASSISTED

The app does the parts paper can't:
1. **Capture:** photograph handwritten pages, type notes, or record the parent's voice.
2. **Collect:** gather everything into a private container per child.
3. **Print:** turn it into printable cards and a keepsake book.

Exchange with tweens and teens can happen on real paper. That keeps the app from feeling like one more screen to a teen, and is how we test first (Section 11).

## 3. MARKET FINDINGS (October 2026; not exhaustive)

- **Conversation-starter apps are crowded** (Deeper Kids, Closer, Chatter Matters, Unpack). Do not compete there.
- **Kid affirmation apps** exist (e.g., Slumberkins) with generic content.
- **Co-parenting apps** (OurFamilyWizard, TalkingParents) are a different market.
- **Paper pass-back journals** for parents and teens are a large book category (e.g., Katie Clemons' series, "Just Between Us," "Tell Me Everything").
- **Closest digital competitors found:**
  - *Dearly: Letters & Journal*: parent journal with sealed future letters. One-way. Covers the time capsule idea.
  - *Qeepsake*: texted prompts turned into a printed book. Parent-only; includes a book credit.
  - *Tell Me Your Story*: parent's life story in their own voice, made into a book.
  - *Baby Notebook*: memory-book app that prints a hardbound book.
  - *Family Widget*: shared family note on the lock screen.
- **What looks unclaimed (needs checking):** a two-way, paper-first exchange between a parent and a child that grows from a voice-first box for little kids to a notebook for tweens and teens, where the young person controls what is kept, ending in a printed keepsake.

## 4. USERS AND AGE BANDS

**The account holder and customer is the PARENT (or caregiver).** Children never create accounts.

| Band | Ages | Container | Experience |
|---|---|---|---|
| Little | 4–8 | Note Box | Voice-first. Parent's recorded voice and a picture carry the note; text is support. Child taps stickers and can draw. |
| Tween and younger teen | 9–13 (default) | Notebook, Soft Collage look (B) | Can read and write on paper. Stickers and doodles; replies optional. |
| Older teen | 14+ (default) | Notebook, Oat and Ink look (A) | Most sensitive band. Optional, low-cringe; teen decides what is kept or printed. |

Store only a **nickname and age band** per child. When a child ages up, their box becomes a notebook and old notes move across. The keepsake book gets a chapter for each stage.

## 5. FEATURES BY VERSION

### v1: Core
1. Parent setup: family, child nicknames, age bands.
2. **Note Box (ages 4–8):** box of envelopes; tap to open; picture + big text.
3. **Parent audio notes (recommended in v1 for ages 4–8):** record your voice (about 2 minutes max); big play button. Microphone permission screen; storage check.
4. Write a note (typed) or photograph a handwritten note.
5. **Stickers (ages 4–8):** about 12 big, simple feeling stickers. Tap to choose, tap to stamp onto the reply. Original art.
6. **Doodle canvas (ages 4–8):** big finger drawing, 6–8 colors, 2 brush sizes, undo, a confirm before clearing. Also "Draw back" on paper (a grown-up photographs it).
7. Share (phone's Share button) or export a print-ready PDF card.
8. Daily question library by age band.
9. Print-ready PDF keepsake export.

### v1.5: Notebook for ages 9+
10. Notebook per child with post-it notes and folded notes.
11. Tween/teen sticker set (smaller, cooler, includes word stickers such as "same," "thank you," "me too," "not now," "can we talk later?").
12. Doodle tools for 9+ (pen, highlighter, more colors).

### v2: Exchange, moving stickers, ordering
13. Exchange track: parent-first prompts that deepen gradually; capture the young person's written replies by photo.
14. **Consent gate:** nothing from a tween or teen goes into a printed book without their yes.
15. Drag, resize, and rotate stickers; sticker on top of a photographed note.
16. Order a printed book through a print-on-demand partner (evaluate quality, cost, data handling).
17. Parent-controlled backup (after legal review).
18. Video notes, time capsule, fold animations, Spanish support.

**Deliberately NOT built early:** accounts for kids, text entry by children, child voice/photo/video recording, in-app chat between parent and child, read receipts or "seen" markers, streaks or points, earned or unlockable stickers, selling sticker packs to children, AI that reads or analyzes a young person's writing or drawings, push notifications to a child.

## 6. DESIGN DIRECTION BY AGE

### Ages 4–8: The Note Box
- A cardboard-style box holds envelopes in soft colors. Tap an envelope to open it.
- A note shows a big picture, large friendly text, and a **large play button** to hear the parent's voice. No reading required.
- Reply: tap a feeling sticker, draw on screen, or "Draw back" on paper.
- Co-use design: built for a child and a parent looking at one screen together (bedtime, after school).
- Targets at least 56 points, no wrong taps, no timers, no typing, no counts or empty-box guilt. A hold-to-leave "Grown-ups" gate protects settings.
- Reduced-motion setting respected; all buttons labelled for screen readers.
- Mockup built in chat on October 4, 2026.

### Ages 9+: The Notebook (one idea, two looks)
- Black-and-white marbled composition-notebook cover with a label ("Foldwell" + the child's name).
- Notes appear as sticky notes, folded notes, and Polaroid-style photos of handwritten notes. Replies are stickers, doodles, or another note. Replies are always optional.
- **Look B, Soft Collage (tweens and younger teens, about 9–13):** pastel sticky notes, tape, Polaroid photos, floating pill toolbar. Warm and a little playful.
- **Look A, Oat and Ink (older teens, about 14+):** oat paper, dot grid, ink borders, monospace labels, muted sage and clay, small icon toolbar. Calm and grown-up.
- The look is a **theme**. Default is chosen by age band, and the young person can switch looks (and turn on an optional dark mode). Build one flexible theme system, not separate apps. Privacy rules stay keyed to the legal age bands (under 13 and 13+), not to the look.
- Bottom bar in the thumb zone: Write, Voice, Sticker, Doodle (and Print for the parent).
- What you see in the app is what gets printed.
- Drafts live in the Mockups folder. Test with real tweens and teens before locking either look.

### Palette (starting point)
| Element | Value |
|---|---|
| Paper | #FBFAF6, light blue lines, soft red margin |
| Parent note (yellow) | #FAEEDA, dark brown text |
| Folded note (mint) | #E1F5EE, dark teal text |
| Reply (pink) | #FBEAF0, dark rose text |
| Kid screen background | #FFF7EC |
| Box | Kraft #C9A06B |
| Buttons | Charcoal #2C2C2A |

## 7. STICKERS AND DOODLES

**Why stickers:** they let a child (or a teen who can't find the words) answer with no writing. For teens, a sticker like "not now" or "can we talk later" is a safe, non-confrontational reply and makes skipping normal.

| | Ages 4–8 | Ages 9+ |
|---|---|---|
| Stickers | About 12 big feeling stickers; tap to choose, tap to stamp | Smaller, cooler set plus word stickers; drag/resize/rotate in v2 |
| Doodle | Big finger drawing, 6–8 colors, 2 brush sizes, undo | Pen, highlighter, more colors |

Rules:
- **All sticker art is original or properly licensed.** No characters, brands, or images from the internet.
- **Vector art** (so it prints crisply in the keepsake book).
- **Stickers are never earned, unlocked, counted, or sold to children.** All packs are part of the parent's one-time unlock.
- Drawings and stickers stay on the device. The app never reads, analyzes, or sends a child's drawing anywhere except when the parent exports or prints it.
- Doodle colors chosen to be distinguishable for color-blind users.

## 8. DESIGN PRINCIPLES

- Warm, calm, paper-like. Large readable text.
- **Parent goes first** with tweens and teens; the young person is in control of what they share, answer, skip, or include in a keepsake.
- No ads, no data selling, no third-party tracking, no game mechanics.
- Parent flow under 30 seconds to write and send a note.
- Bilingual-ready content design (English/Spanish).

## 9. TECH STACK

| Piece | Choice | Plain-language meaning |
|---|---|---|
| App framework | Expo (React Native) + TypeScript | One codebase for iPhone and Android |
| Navigation | Expo Router | Moves between screens |
| Storage (v1) | Expo SQLite, on-device only | Data stays on the phone |
| Photos/scans | expo-image-picker | Photograph handwritten pages and drawings |
| Shapes and drawing | react-native-svg | Draws the box, notebook, stickers, and doodle lines |
| Touch gestures | react-native-gesture-handler | Reads finger movement for doodles (and later dragging stickers) |
| Saving a doodle as a picture | react-native-view-shot | Turns a screen area into an image for printing |
| Alternative drawing engine | @shopify/react-native-skia | More powerful drawing; heavier. Consider only if svg is too slow. Check Expo compatibility first |
| PDF/printing | expo-print + expo-sharing | Builds print-ready PDFs |
| Parent PIN / gate | expo-secure-store | Stores a PIN safely |
| Audio | expo-audio | Records and plays the parent's voice |
| Animation (v2) | react-native-reanimated | Smooth fold and page motion |
| Video (v2) | expo-camera + expo-video | Large files; later |
| Printing partner (v2) | TBD | Prints and ships a bound book |

Store a doodle as a small list of line points (text), then draw it back; export an image only for printing.

## 10. BUILD PHASES (Phases 1-2 start now; later phases wait for paper-test and prototype feedback)

| Phase | Goal |
|---|---|
| 0 | Paper test with real families (no code) |
| 1 | Foundation: Expo project, navigation, family setup, local database |
| 2 | Note Box screens: box, envelopes, note view |
| 3 | Write/photograph notes and parent audio notes |
| 4 | Stickers: choose and stamp (ages 4–8) |
| 5 | Doodle canvas (ages 4–8) |
| 6 | Share and print-ready PDF cards |
| 7 | Daily question library |
| 8 | Keepsake PDF export |
| 9 | Notebook for 9+, tween/teen stickers, doodle tools (v1.5) |
| 10 | Exchange track, consent gate, drag/resize stickers, print-on-demand ordering (v2) |

## 11. VALIDATE FIRST: THE PAPER TEST (1–3 weeks)

Materials created: Part 1 (30 parent-first prompts), Part 2 (30 daily questions), Part 3 (printable pack), tester invitation drafts.

1. Recruit **5–8 parents**: include parents of little kids, tweens, and teens, and include dads and caregivers.
2. Run 7–14 days. The young person is never required to answer.
3. Use the weekly check-in. Ask whether they would rather record their voice than write, and whether a printed keepsake is worth paying for.
4. Show the Note Box and notebook mockups to a few real children and tweens/teens and ask what feels fun or babyish. Stickers stay digital for now; no printed sticker sheet in the paper test.
5. **Build only if:** most parents keep going past day 3, a meaningful share of tweens/teens reply, and parents respond to the printed keepsake idea.

## 12. REVENUE IDEAS (not final)

- Free: basic notes, one child, limited question library, simple card exports.
- One-time unlock (test $9.99–$14.99): more children, full library, all sticker packs, extra covers, full keepsake PDF export.
- Printed keepsake book: paid per book through a print partner. Calculate real printing, shipping, and fee costs first.
- **Later idea: physical sticker sheets** sold with the keepsake journal, using the same original art as the digital stickers (see Section 14).
- No subscription at launch. No ads. No purchases reachable by a child.

## 13. LEGAL, SAFETY AND PRIVACY (not legal advice; confirm with an attorney)

- **COPPA (US law on children under 13):** our design avoids collecting information from children by keeping the parent as account holder, data on-device, and no child text, voice, photo, or video. Stickers and doodles are the child's only input and stay on-device. Have an attorney review this, including whether a drawing that contains a name matters.
- **Apple Kids Category:** restricts analytics, ads, and purchases without a parental gate. Decide on purpose whether to enter it.
- **Teens:** nothing is printed or shared without the teen's consent.
- **Printing partner:** photos, drawings, and text go to a third party to print. Review their privacy practices and disclose plainly.
- **Safety:** the app does not read or analyze a young person's writing or drawings. It includes a clear static parent page on how to respond and when to get help (in the US, the 988 Suicide and Crisis Lifeline). Have a counselor or child therapist review it.
- **Art and content licensing:** all stickers, covers, prompts, and questions are original or licensed.
- **Trademark:** see Section 0.
- **Do not store:** child photos, full names, birthdates, schools, locations.

## 14. OTHER ANGLES (later)

- Printable card packs on a website or Etsy (early test and income).
- **Physical sticker sheets** sold with the keepsake journal. Stickers stay digital for now. When ready, Maribel plans to design them in Canva and print them. Before selling, check: (1) Canva's content license terms for selling products (use only original art you draw or commission, or confirm any Canva element is allowed for resale; be careful with Canva stock elements and AI-generated images); (2) print quality: export vector or high-resolution art; (3) children's product rules (in the US, products made mainly for children 12 and under may need a Children's Product Certificate, and printers can often supply compliance paperwork); (4) shipping, inventory, and sales tax; (5) use the same art as the digital stickers so it feels like one family of stickers.
- Grandparent or long-distance-relative notes.
- School counselor or classroom kits.
- QR code in the printed book linking to a parent's audio message (needs hosting, so a backup decision first).

## 15. OPEN QUESTIONS

1. Name decided: Foldwell (Section 0). Remaining: attorney review before a trademark filing.
2. Should parent audio move into v1 for ages 4–8 (recommended)?
3. Will teens engage, or is the true audience ages 4–12 plus tweens?
4. Does the printed book feel valuable enough to pay for, and at what price?
5. Who will make the original vector sticker art (Maribel in Canva or another tool, or a hired illustrator)? Confirm the art can legally be sold as physical stickers later.
6. Which print partner offers good quality, fair cost, and acceptable data handling?
7. Does the notebook look appeal to tweens and teens, or feel babyish?
8. How and when to add backup for irreplaceable recordings?

---

*Next step: run the paper test.*
