/**
 * scrapeContent.mjs
 * Fetches open-licensed content from Wikipedia and PubMed for use as
 * authentic MCAT-style passages. Run once; output committed to git.
 *
 * Sources:
 *   Wikipedia REST API   — CC BY-SA 4.0
 *   PubMed Entrez API    — open access (NIH, free for all use)
 */

import { writeFileSync, mkdirSync } from "node:fs";

const DELAY_MS = 400;
const UA = "Project528MCATPrepBot/1.0 (educational; github.com/mbaffour/mcat-prep)";

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function fetchRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": UA } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res;
    } catch (err) {
      if (i === retries - 1) throw err;
      await sleep(1500 * (i + 1));
    }
  }
}

// ── Wikipedia ────────────────────────────────────────────────────────────────

const WIKIPEDIA_TOPICS = [
  // CARS — ethics, society, history of science, philosophy
  { title: "Bioethics",                       hint: "CARS", section: 1 },
  { title: "Informed consent",                hint: "CARS", section: 1 },
  { title: "Placebo",                         hint: "CARS", section: 1 },
  { title: "Scientific method",               hint: "CARS", section: 1 },
  { title: "Evidence-based medicine",         hint: "CARS", section: 1 },
  { title: "Medical ethics",                  hint: "CARS", section: 1 },
  { title: "Health equity",                   hint: "CARS", section: 1 },
  { title: "Social determinants of health",   hint: "CARS", section: 3 },
  { title: "Tuskegee Syphilis Study",         hint: "CARS", section: 1 },
  { title: "Human Genome Project",            hint: "CARS", section: 1 },
  { title: "Gene therapy",                    hint: "CARS", section: 1 },
  { title: "Epigenetics",                     hint: "CARS", section: 1 },
  { title: "Philosophy of mind",              hint: "CARS", section: 1 },
  { title: "Cognitive science",               hint: "CARS", section: 1 },
  { title: "Vaccination",                     hint: "CARS", section: 1 },
  { title: "Eugenics",                        hint: "CARS", section: 1 },
  { title: "Cognitive bias",                  hint: "CARS", section: 1 },
  { title: "Reductionism",                    hint: "CARS", section: 1 },
  { title: "Health disparities",              hint: "CARS", section: 3 },
  { title: "Environmental justice",           hint: "CARS", section: 1 },
  { title: "Reproductive rights",             hint: "CARS", section: 1 },
  { title: "History of medicine",             hint: "CARS", section: 1 },
  { title: "Telemedicine",                    hint: "CARS", section: 1 },
  { title: "Stem cell controversy",           hint: "CARS", section: 1 },
  { title: "Euthanasia",                      hint: "CARS", section: 1 },
  // Science — for concept enrichment and passage text
  { title: "Enzyme kinetics",                 hint: "Bio",  section: 2 },
  { title: "Osmosis",                         hint: "Bio",  section: 2 },
  { title: "Action potential",                hint: "Bio",  section: 2 },
  { title: "Hardy–Weinberg principle",        hint: "Bio",  section: 2 },
  { title: "Citric acid cycle",               hint: "Bio",  section: 2 },
  { title: "Glycolysis",                      hint: "Bio",  section: 2 },
  { title: "Signal transduction",             hint: "Bio",  section: 2 },
  { title: "Apoptosis",                       hint: "Bio",  section: 2 },
  { title: "Renal physiology",                hint: "Bio",  section: 2 },
  { title: "Hemoglobin",                      hint: "Bio",  section: 2 },
  { title: "Immune system",                   hint: "Bio",  section: 2 },
  { title: "DNA replication",                 hint: "Bio",  section: 2 },
  { title: "Classical conditioning",          hint: "Psych",section: 3 },
  { title: "Operant conditioning",            hint: "Psych",section: 3 },
  { title: "Memory",                          hint: "Psych",section: 3 },
  { title: "Cognitive dissonance",            hint: "Psych",section: 3 },
  { title: "Social stratification",           hint: "Soc",  section: 3 },
];

async function fetchWikipedia(title) {
  const enc = encodeURIComponent(title.replace(/ /g, "_"));
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${enc}`;
  const res = await fetchRetry(url);
  const d = await res.json();
  return {
    title: d.title || title,
    extract: (d.extract || "").slice(0, 900).trim(),
    url: d.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${enc}`,
    license: "CC BY-SA 4.0",
  };
}

// ── PubMed ───────────────────────────────────────────────────────────────────

const PUBMED_QUERIES = [
  { q: "competitive enzyme inhibition mechanism drug", topic: "Biochemistry" },
  { q: "randomized controlled trial pharmacology clinical outcome", topic: "Research methods" },
  { q: "cell signaling pathway receptor cancer biology", topic: "Biology" },
  { q: "neurotransmitter dopamine reward behavior", topic: "Psychology" },
  { q: "metabolic acidosis bicarbonate acid base disorder", topic: "Physiology" },
  { q: "osmotic pressure membrane transport cell physiology", topic: "Biology" },
  { q: "genetic mutation phenotype disease mendelian", topic: "Genetics" },
  { q: "cardiovascular risk blood pressure hypertension intervention", topic: "Physiology" },
  { q: "stress cortisol HPA axis immune response", topic: "Psychology" },
  { q: "social determinants health disparity race socioeconomic", topic: "Sociology" },
  { q: "placebo effect clinical trial blinded randomized", topic: "Research methods" },
  { q: "DNA repair mutation carcinogenesis cancer mechanism", topic: "Biology" },
  { q: "insulin resistance glucose metabolism diabetes type 2", topic: "Biochemistry" },
  { q: "memory consolidation sleep hippocampus learning", topic: "Psychology" },
  { q: "renal clearance GFR tubular secretion drug", topic: "Physiology" },
];

function parseXmlAbstracts(xml) {
  const results = [];
  const articleBlocks = xml.split("<PubmedArticle>").slice(1);
  for (const block of articleBlocks) {
    const titleMatch = block.match(/<ArticleTitle>([^<]+)<\/ArticleTitle>/);
    // AbstractText may appear multiple times (structured abstracts)
    const abstractParts = [...block.matchAll(/<AbstractText[^>]*>([^<]+)<\/AbstractText>/g)];
    const pmidMatch = block.match(/<PMID[^>]*>(\d+)<\/PMID>/);
    if (!titleMatch || !abstractParts.length) continue;
    const abstract = abstractParts.map(m => m[1]).join(" ").trim().slice(0, 700);
    if (abstract.length < 80) continue;
    results.push({
      pmid: pmidMatch?.[1] || "",
      title: titleMatch[1].trim(),
      abstract,
      url: pmidMatch ? `https://pubmed.ncbi.nlm.nih.gov/${pmidMatch[1]}/` : "",
      license: "open access",
    });
  }
  return results;
}

async function fetchPubMed(query) {
  const searchUrl =
    `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi` +
    `?db=pubmed&term=${encodeURIComponent(query)}&retmax=3&retmode=json&sort=relevance`;
  const searchRes = await fetchRetry(searchUrl);
  const searchData = await searchRes.json();
  const ids = (searchData.esearchresult?.idlist || []).slice(0, 3);
  if (!ids.length) return [];

  await sleep(400);

  const fetchUrl =
    `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi` +
    `?db=pubmed&id=${ids.join(",")}&rettype=abstract&retmode=xml`;
  const fetchRes = await fetchRetry(fetchUrl);
  const xml = await fetchRes.text();
  return parseXmlAbstracts(xml);
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const result = {
    scraped_at: new Date().toISOString(),
    wikipedia: [],
    pubmed: [],
  };

  console.log(`\nFetching ${WIKIPEDIA_TOPICS.length} Wikipedia articles…`);
  for (const topic of WIKIPEDIA_TOPICS) {
    try {
      await sleep(DELAY_MS);
      const data = await fetchWikipedia(topic.title);
      if (data.extract.length > 80) {
        result.wikipedia.push({ ...data, topic_hint: topic.hint, section: topic.section });
        console.log(`  ✓  ${topic.title} (${data.extract.length} chars)`);
      } else {
        console.log(`  —  ${topic.title} (extract too short, skipped)`);
      }
    } catch (err) {
      console.error(`  ✗  ${topic.title}: ${err.message}`);
    }
  }

  console.log(`\nFetching PubMed abstracts for ${PUBMED_QUERIES.length} queries…`);
  for (const { q, topic } of PUBMED_QUERIES) {
    try {
      await sleep(DELAY_MS);
      const abstracts = await fetchPubMed(q);
      for (const a of abstracts) result.pubmed.push({ ...a, topic });
      console.log(`  ✓  "${q}" → ${abstracts.length} abstracts`);
    } catch (err) {
      console.error(`  ✗  "${q}": ${err.message}`);
    }
  }

  mkdirSync("data", { recursive: true });
  writeFileSync("data/scraped_content.json", JSON.stringify(result, null, 2) + "\n");

  console.log(`
Done.
  Wikipedia articles : ${result.wikipedia.length}
  PubMed abstracts   : ${result.pubmed.length}
  Saved to           : data/scraped_content.json
`);
}

main().catch(err => { console.error(err); process.exit(1); });
