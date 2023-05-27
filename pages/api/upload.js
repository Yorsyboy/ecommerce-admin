import multiparty from 'multiparty';

export default async function upload(req, res) {
    const form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
        if (err) throw new Error(err);
        console.log(fields, files);

        res.status(200).json({ message: 'File uploaded successfully' });
    });
}

export const config = {
    api: {
        bodyParser: false
    }
}