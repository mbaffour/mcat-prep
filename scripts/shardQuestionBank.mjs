import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const inputPath = "data/sample_questions.json";
const outputDir = "data/questions";
const shardSize = Number(process.argv[2] || 2500);
const questions = JSON.parse(await BunLikeRead(inputPath));

rmSync(outputDir, { recursive: true, force: true });
mkdirSync(outputDir, { recursive: true });

const shards = [];
for (let index = 0; index < questions.length; index += shardSize) {
  const chunk = questions.slice(index, index + shardSize);
  const shardIndex = Math.floor(index / shardSize) + 1;
  const file = `questions-${String(shardIndex).padStart(3, "0")}.json`;
  writeFileSync(`${outputDir}/${file}`, `${JSON.stringify(chunk)}\n`);
  shards.push({
    file,
    count: chunk.length,
    first_id: chunk[0]?.id || "",
    last_id: chunk.at(-1)?.id || ""
  });
}

const manifest = {
  generated_at: new Date().toISOString(),
  total_questions: questions.length,
  shard_size: shardSize,
  shards
};

writeFileSync(`${outputDir}/manifest.json`, `${JSON.stringify(manifest, null, 2)}\n`);
writeFileSync("data/sample_questions.json", `${JSON.stringify({
  note: "The deployable question bank is sharded in data/questions/. This placeholder keeps each repository file below GitHub's normal file-size limit.",
  manifest: "data/questions/manifest.json",
  total_questions: questions.length,
  generated_at: manifest.generated_at
}, null, 2)}\n`);
writeFileSync("js/generatedQuestionBank.js", "export const GENERATED_QUESTIONS = [];\n");

async function BunLikeRead(path) {
  const { readFile } = await import("node:fs/promises");
  return readFile(path, "utf8");
}
