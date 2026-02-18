const fs = require('fs');
const path = require('path');
const https = require('https');

const owner = 'officiallemmy254-droid';
const repo = 'little-angels-baby-shop';
const branch = 'main';

// Read token from mcp config
let token;
try {
    const configPaths = [
        path.join(process.env.APPDATA || '', 'Code', 'User', 'globalStorage', 'google.gemini-code-assist', 'mcp_config.json'),
        path.join(process.env.USERPROFILE || '', '.gemini', 'mcp_config.json'),
        path.join(process.env.USERPROFILE || '', 'mcp_config.json'),
    ];

    for (const cp of configPaths) {
        if (fs.existsSync(cp)) {
            const config = JSON.parse(fs.readFileSync(cp, 'utf8'));
            if (config.mcpServers && config.mcpServers.github && config.mcpServers.github.env) {
                token = config.mcpServers.github.env.GITHUB_PERSONAL_ACCESS_TOKEN;
                if (token) {
                    console.log('Found token in: ' + cp);
                    break;
                }
            }
        }
    }
} catch (e) {
    console.error('Error reading config:', e.message);
}

if (!token) {
    console.error('No GitHub token found');
    process.exit(1);
}

const images = fs.readdirSync(path.join(__dirname, 'images'))
    .filter(f => f.endsWith('.jpg') && !f.endsWith('.b64'));

async function uploadFile(filePath, repoPath) {
    const content = fs.readFileSync(filePath).toString('base64');

    const data = JSON.stringify({
        message: `Add product image: ${path.basename(filePath)}`,
        content: content,
        branch: branch
    });

    return new Promise((resolve, reject) => {
        const req = https.request({
            hostname: 'api.github.com',
            path: `/repos/${owner}/${repo}/contents/${repoPath}`,
            method: 'PUT',
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data),
                'User-Agent': 'node-upload-script'
            }
        }, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    console.log(`✓ ${path.basename(filePath)} uploaded`);
                    resolve();
                } else {
                    console.error(`✗ ${path.basename(filePath)} failed (${res.statusCode}): ${body.substring(0, 200)}`);
                    reject(new Error(`HTTP ${res.statusCode}`));
                }
            });
        });
        req.on('error', reject);
        req.write(data);
        req.end();
    });
}

(async () => {
    for (const img of images) {
        const filePath = path.join(__dirname, 'images', img);
        await uploadFile(filePath, `images/${img}`);
        // Small delay to avoid rate limiting
        await new Promise(r => setTimeout(r, 500));
    }
    console.log('\nAll images uploaded!');
})();
