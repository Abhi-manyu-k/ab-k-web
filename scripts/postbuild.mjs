// Removes the placeholder page that keeps `output: "export"` happy while no essay is published
// (see generateStaticParams in app/writing/[slug]/page.tsx).
import fs from "node:fs";

for (const f of ["out/writing/_none.html", "out/writing/_none.txt"]) {
  fs.rmSync(f, { force: true });
}
const dir = "out/writing";
if (fs.existsSync(dir) && fs.readdirSync(dir).length === 0) fs.rmdirSync(dir);
