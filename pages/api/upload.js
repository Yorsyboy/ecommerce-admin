import multiparty from 'multiparty';
import { Storage } from '@google-cloud/storage';
import fs from 'fs';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    const form = new multiparty.Form();
    const storage = new Storage({
        projectId: process.env.GCLOUD_PROJECT_ID,
        keyFilename: './mykey.json'
        // credentials: {
        //     client_email: process.env.GCLOUD_CLIENT_EMAIL,
        //     private_key: process.env.GCLOUD_PRIVATE_KEY,
        // },
    });
    const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error(err);
            res.status(500).end('File upload failed');
            return;
        }

        const file = files.file[0];
        const blob = bucket.file(file.originalFilename);
        const stream = fs.createReadStream(file.path);
        const options = {
            metadata: {
                contentType: file.headers['content-type'],
            },
        };
        await new Promise((resolve, reject) => {
            stream
                .pipe(blob.createWriteStream(options))
                .on('error', reject)
                .on('finish', resolve);
        });
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        res.status(200).json({ publicUrl });
    });
}
