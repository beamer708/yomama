#!/usr/bin/env node
/**
 * Quick check: DNS and HTTPS for unityvault.space.
 * Run: npm run check:production
 * After pointing DNS to Vercel, root should resolve to 76.76.21.21 and HTTPS should return 200.
 */

const { execSync } = require('child_process');

const ROOT = 'unityvault.space';
const WWW = 'www.unityvault.space';
const VERCEL_IP = '76.76.21.21';
const NAMECHEAP_IP = '198.54.117.242';

function run(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf8', timeout: 10000 }).trim();
  } catch (e) {
    return null;
  }
}

console.log('--- DNS ---');
const rootDns = run(`dig +short ${ROOT} A`);
const wwwDns = run(`dig +short ${WWW}`);
console.log(`${ROOT}     -> ${rootDns || '(no result)'}`);
console.log(`${WWW} -> ${wwwDns || '(no result)'}`);

if (rootDns && rootDns.includes(NAMECHEAP_IP)) {
  console.log('\n⚠️  Root still points to Namecheap (198.54.117.242). HTTPS will fail until you point DNS to Vercel.');
  console.log('   See DEPLOY_NOW.md: add A record @ -> 76.76.21.21 and CNAME www -> cname.vercel-dns.com');
}

if (rootDns && rootDns.includes(VERCEL_IP)) {
  console.log('\n✓ Root points to Vercel (76.76.21.21).');
}

console.log('\n--- HTTPS ---');
const curlRoot = run(`curl -sI -o /dev/null -w "%{http_code}" --connect-timeout 8 https://${ROOT}`);
const curlWww = run(`curl -sI -o /dev/null -w "%{http_code}" --connect-timeout 8 https://${WWW}`);
console.log(`https://${ROOT}     -> ${!curlRoot || curlRoot === '' ? 'connection failed' : 'HTTP ' + curlRoot}`);
console.log(`https://${WWW} -> ${!curlWww || curlWww === '' ? 'connection failed' : 'HTTP ' + curlWww}`);

if (curlRoot === '200' && (curlWww === '200' || curlWww === '301' || curlWww === '308')) {
  console.log('\n✓ Site is reachable over HTTPS.');
} else if (!curlRoot || curlRoot === '000') {
  console.log('\n⚠️  HTTPS connection failed. Ensure DNS points to Vercel and SSL is active (see DEPLOY_NOW.md).');
}
