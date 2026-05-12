# Legal Content Guide

MCAT Forge supports legal concept ingestion, not copying question banks.

## Allowed

- Original questions written by you.
- User-created notes and explanations.
- Open-license content where the license allows reuse.
- Public-domain educational text.
- Concept extraction from lawful educational content.
- Attribution-preserving imports.
- Source metadata and citation records.
- Original question drafts generated from concepts rather than copied wording.

## Not Allowed

- AAMC prep products.
- UWorld questions.
- Kaplan, Princeton Review, Blueprint, Jack Westin, or other proprietary question-bank items unless you have explicit permission.
- Leaked exam repositories.
- Copyrighted PDF dumps.
- Reddit question dumps.
- CourseHero, Chegg, or copied homework/test material.
- Paywalled, login-gated, robots-restricted, anti-bot-protected, or rate-limited sources accessed without permission.
- Lightly rephrased copyrighted questions.

## Ingestion Workflow

1. Paste legal source text, public-domain material, open-license content, or user notes.
2. Enter title, URL when available, author, license, attribution, source type, and access date.
3. Run concept extraction.
4. Review extracted terms, formulas, objectives, and MCAT topic mapping.
5. Inspect generated draft questions.
6. Rewrite drafts as needed so they test the concept in a fresh scenario.
7. Approve only after human review.
8. Export drafts separately from approved questions.

## Similarity Safety

The app compares generated stems, choices, and explanations against the source text using word-shingle overlap. High-overlap items are blocked from publishing. Elevated-overlap items require careful rewriting.

This is a safety aid, not a legal guarantee. Human review remains required.

## Optional Local Scraper Blueprint

A future local Node.js scraper should only fetch sources you have permission to use. It should:

- Respect robots.txt and site terms.
- Use clear user-agent identification.
- Avoid paywalls, logins, anti-bot systems, access controls, and rate-limit bypasses.
- Store URL, title, author, license, attribution, and date accessed.
- Prefer open educational resources, public-domain texts, and explicit open-license APIs.
- Extract concepts and metadata, not proprietary questions.
- Send extracted text into the same draft-generation and human-review workflow used by this app.

The scraper should never target proprietary MCAT question banks or leaked/copyrighted test material.
