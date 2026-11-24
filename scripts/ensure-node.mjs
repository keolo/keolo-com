import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const [major, minor] = process.versions.node.split('.').map(Number);
if (major < 22 || (major === 22 && minor < 23)) {
  const nvmDir = path.join(os.homedir(), '.nvm', 'versions', 'node');
  if (fs.existsSync(nvmDir)) {
    const candidates = fs
      .readdirSync(nvmDir)
      .filter((d) => d.startsWith('v22.23') || d.startsWith('v23') || d.startsWith('v24'))
      .sort();
    const latest = candidates.pop();
    if (latest) {
      const nodeBin = path.join(nvmDir, latest, 'bin', 'node');
      if (fs.existsSync(nodeBin)) {
        const localBin = path.join(process.cwd(), 'node_modules', '.bin');
        fs.mkdirSync(localBin, { recursive: true });
        const symlinkPath = path.join(localBin, 'node');
        try {
          fs.unlinkSync(symlinkPath);
        } catch {
          // ignore if symlink does not exist
        }
        try {
          fs.symlinkSync(nodeBin, symlinkPath);
        } catch {
          // ignore if symlink cannot be created
        }
      }
    }
  }
}
