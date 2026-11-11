// Removes the placeholder page that keeps `output: "export"` happy while no essay is published
// (see generateStaticParams in app/writing/[slug]/page.tsx).
import fs from "node:fs";

for (const f of ["out/writing/_none.html", "out/writing/_none.txt"]) {
  fs.rmSync(f, { force: true });
}
const dir = "out/writing";
if (fs.existsSync(dir) && fs.readdirSync(dir).length === 0) fs.rmdirSync(dir);

// Lists every exported page that still shows a placeholder (<Tbd>), so each deploy shows what is open.
// A warning, not a failure.
const open = [];
(function walk(d) {
  if (!fs.existsSync(d)) return;
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = `${d}/${e.name}`;
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".html")) {
      const n = (fs.readFileSync(p, "utf8").match(/data-tbd=""/g) || []).length;
      if (n) open.push([p.slice(4).replace(/(index)?\.html$/, "") || "/", n]);
    }
  }
})("out");
if (open.length) {
  console.warn(`\n⚠ Placeholders still open on ${open.length} page(s):`);
  for (const [page, n] of open.sort()) console.warn(`  /${page.replace(/^\//, "")}  ${n}`);
  console.warn("");
} else {
  console.log("No placeholders left in the export.");
}
