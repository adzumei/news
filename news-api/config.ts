import path from 'path';

const rootPath = __dirname;

const config = {
    rootPath,
    publicPath: path.join(rootPath, 'public'),
    uploadsDir: 'images',
    defaultImageUrl: 'https://cdn-icons-png.flaticon.com/512/1042/1042731.png',
};

export default config;
