import "dotenv/config";
import * as ftp from "basic-ftp";
import { execSync } from "node:child_process";

async function attemptUpload(attempt = 1, maxAttempts = 3) {
    const client = new ftp.Client();
    client.ftp.verbose = true;
    client.ftp.timeout = 300000; // 5 minutes timeout for large brochures

    try {
        const host = process.env.FTP_HOST;
        const user = process.env.FTP_USER;
        const password = process.env.FTP_PASSWORD;
        const remoteDir = process.env.FTP_REMOTE_DIR || "public_html";

        if (!host || !user || !password) {
            throw new Error("FTP credentials missing. Check your .env file.");
        }

        console.log(`Connecting to Hostinger using FTPS (Attempt ${attempt}/${maxAttempts})...`);

        await client.access({
            host,
            user,
            password,
            port: 21,
            secure: true,
            secureOptions: {
                rejectUnauthorized: false,
            },
        });

        await client.ensureDir(remoteDir);

        console.log("Syncing dist files to Hostinger...");

        // Recursive smart uploader that skips identical files
        const fs = await import("fs");
        const path = await import("path");

        async function syncDir(localDir, remotePath) {
            await client.ensureDir(remotePath);
            const remoteList = await client.list(remotePath);
            const remoteMap = new Map();
            remoteList.forEach((item) => remoteMap.set(item.name, item.size));

            const localItems = fs.readdirSync(localDir);
            for (const item of localItems) {
                const localItemPath = path.join(localDir, item);
                const stat = fs.statSync(localItemPath);
                const itemRemotePath = remotePath + "/" + item;

                if (stat.isDirectory()) {
                    await syncDir(localItemPath, itemRemotePath);
                    await client.ensureDir(remotePath); // return to parent remote dir
                } else {
                    // The entry HTML can change its asset references without changing size.
                    if (item !== "index.html" && remoteMap.has(item) && remoteMap.get(item) === stat.size) {
                        continue;
                    }
                    console.log(`Uploading: ${itemRemotePath} (${(stat.size / 1024).toFixed(1)} KB)...`);
                    await client.uploadFrom(localItemPath, item);
                }
            }
        }

        await syncDir("release-dist", remoteDir);

        console.log("\n=========================================");
        console.log(" Deployment completed successfully!");
        console.log(" Website: https://nextfurnoverseas.com");
        console.log("=========================================\n");
        return true;
    } catch (error) {
        console.error(`Attempt ${attempt} failed:`, error.message);
        if (attempt < maxAttempts) {
            console.log(`Retrying in 5 seconds...`);
            await new Promise((r) => setTimeout(r, 5000));
            return attemptUpload(attempt + 1, maxAttempts);
        }
        throw error;
    } finally {
        client.close();
    }
}

async function deploy() {
    try {
        console.log("Building React + Vite project...");
        execSync("npm run build", { stdio: "inherit" });
        await attemptUpload();
    } catch (error) {
        console.error("Deployment failed:", error.message);
        process.exitCode = 1;
    }
}

deploy();
