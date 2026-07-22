# robw0ng.com

My personal site. React + TypeScript on Vite, deployed to GitHub Pages.

The front page is a draggable cube holding the personal stuff (hobbies, games, tech
stack, collecting), with the work below it: bio, projects, resume. The cube is
hand-rolled 3D, no library. Orientation is tracked as a rotation matrix and each drag
is applied in screen space, so every face drags the same way rather than gimballing
once you're 90 degrees over. On release it snaps to whichever face points most at the
viewer; the back has no content so it isn't a snap target.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
```

## Deploying

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes
`dist/` to Pages. `public/CNAME` carries the custom domain into the artifact.

## legacy/

The original NameCube, a GameCube BIOS recreation in plain HTML, CSS, and JavaScript.
It held this domain until the current site replaced it, and the deploy copies it into
`dist/legacy` so it stays reachable at [robw0ng.com/legacy](https://robw0ng.com/legacy/).
Frozen, not maintained.
