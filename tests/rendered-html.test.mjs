import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Chapa Azul experience", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html[^>]*lang="pt-BR"/i);
  assert.match(html, /<title>Chapa Azul \| A escola em movimento<\/title>/i);
  assert.match(html, /A voz é de todo mundo/);
  assert.match(html, /CENTRO DE MÍDIA/);
  assert.match(html, /O placar da participação/);
  assert.doesNotMatch(html, /Your site is taking shape/i);
});

test("keeps the finished site metadata", async () => {
  const [page, layout, packageJson, hero, events, participation] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../app/components/HeroSection.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/EventsSection.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/ParticipationSection.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(hero, /CHAPA AZUL/);
  assert.match(events, /id="eventos"/);
  assert.match(participation, /id="participacao"/);
  assert.match(layout, /lang="pt-BR"/);
  assert.match(layout, /const title = "Chapa Azul \| A escola em movimento"/);
  assert.doesNotMatch(page, /SkeletonPreview/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await assert.rejects(access(new URL("../app/_sites-preview/", import.meta.url)));
});

test("keeps every interactive area connected", async () => {
  const [page, interactions, header, voice, events, media, participation, modal] =
    await Promise.all([
      readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
      readFile(new URL("../app/site-interactions.ts", import.meta.url), "utf8"),
      readFile(new URL("../app/components/SiteHeader.tsx", import.meta.url), "utf8"),
      readFile(new URL("../app/components/VoiceSection.tsx", import.meta.url), "utf8"),
      readFile(new URL("../app/components/EventsSection.tsx", import.meta.url), "utf8"),
      readFile(new URL("../app/components/MediaSection.tsx", import.meta.url), "utf8"),
      readFile(new URL("../app/components/ParticipationSection.tsx", import.meta.url), "utf8"),
      readFile(new URL("../app/components/MediaModal.tsx", import.meta.url), "utf8"),
    ]);

  assert.match(page, /useSiteChrome\(\)/);
  assert.match(header, /onMenuOpenChange/);
  assert.match(voice, /onSubmit=\{onSuggestionSubmit\}/);
  assert.match(events, /changeCalendarMonth/);
  assert.match(media, /onMediaFilterChange/);
  assert.match(participation, /onRankingViewChange/);
  assert.match(modal, /role="dialog"/);
  assert.match(interactions, /IntersectionObserver/);
  assert.match(interactions, /event\.key === "Escape"/);
  assert.match(interactions, /--tilt-y/);
});
