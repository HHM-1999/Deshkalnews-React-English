var express = require('express');
var fs = require('fs');
var path = require("path");

var app = express();

var bodyParser = require('body-parser');

// var mysql = require('mysql');

const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({
    extended: false
}));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.use(cors());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    next();
});


var http = require('http');
// var https = require('https');

// var privateKey = fs.readFileSync('/mnt/volume_sgp1_05/ba4ng5lato5w2er/ssl.key', 'utf8');
// var certificate = fs.readFileSync('/mnt/volume_sgp1_05/ba4ng5lato5w2er/ssl.cert', 'utf8');

// var credentials = { key: privateKey, cert: certificate };

var httpServer = http.createServer(app);
// var httpsServer = https.createServer(credentials, app);

const dbConfig = require("./ssr/dbCon/dbConfig");
const enConfig = dbConfig.enConfig();
// const mediaConfig = dbConfig.mediaConfig();
// const genConfig = dbConfig.genConfig();

var FEndPort = 3600;
var FEndUrl = 'https://www.deshkalnews.com';
var BEndUrl = 'https://backoffice.deshkalnews.com';
var CDNUrl = 'https://assets.deshkalnews.com';

app.enable('trust proxy')

app.use(function (request, response, next) {
    if (request.secure && request.headers.host.slice(0, 4) !== "www.") {
        var newHost = "www." + request.headers.host;
        return response.redirect(301, request.protocol + "://" + newHost + request.originalUrl);
    }
    else if (!request.secure && request.headers.host.slice(0, 4) !== "www.") {
        var newHost = "www." + request.headers.host;
        return response.redirect(301, "https://" + newHost + request.url);
    }
    else if (!request.secure && request.headers.host.slice(0, 4) === "www.") {
        return response.redirect(301, "https://" + request.headers.host + request.url);
    }
    next();
}) // auto redirect to www.


app.get('/', function (request, response) {
    console.log('English Home page visited!');
    const filePath = path.resolve(__dirname, './build', 'index.html');
    fs.readFile(filePath, 'utf8', async function (err, data) {
        if (err) {
            return console.log(err);
        }


        data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
        data = data.replace(/\$OG_TITLE/g, ' Deshkal News | Unbiased & Timely News from Bangladesh');
        data = data.replace(/\$OG_DESCRIPTION/g, " Stay updated with the latest news and analysis from Bangladesh. Get breaking news on politics, economy, sports, and international affairs with Deshkalnews.com.");
        data = data.replace(/\$OG_KEYWORDS/g, " Bangladesh News, Breaking News Bangladesh, Bangladesh Latest News, Dhaka News, Bangladesh economic news update, Business news Bangladesh, Current events in Bangladesh, South Asia news today, International news from Bangladesh perspective");
        data = data.replace(/\$AUTHOR/g, "DeshKalNews :: DeshKalNews.com");
        data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
        // var fullUrl = request.protocol + '://' + request.hostname + request.originalUrl;
        // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
        var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        data = data.replace(/\$OG_URL/g, `${fullUrl}`);
        response.send(data);
    });
});


// ads.txt 
app.get('/ads.txt', function (request, response) {
    response.setHeader('Content-Type', 'text/plain');
    console.log('ads.txt visited!');
    const filePath = path.resolve(__dirname, './', 'ads.txt');

    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        // ✅ Set language for Bangla site
        data = data.replace(/\$HTML_LANG/g, "bn");
        response.send(data);
    });
});
app.get('/google7e2046947495bf19.html', function (request, response) {
    response.setHeader('Content-Type', 'text/html');
    console.log('google7e2046947495bf19.html visited!');
    const filePath = path.resolve(__dirname, './', 'google7e2046947495bf19.html');

    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        // ✅ Set language for Bangla site
        data = data.replace(/\$HTML_LANG/g, "bn");
        response.send(data);
    });
});
app.get('/english-sitemap.xml', function (request, response) {
    response.setHeader('Content-Type', 'application/xml');
    console.log('english-sitemap.xml visited!');
    const filePath = path.resolve(__dirname, './sitemap', 'english-sitemap.xml');

    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        response.send(data);
    });
});

app.get('/robots.txt', function (request, response) {
    response.setHeader('Content-Type', 'text/plain');
    console.log('robots.txt visited!');

    let xml = `User-agent: *\nAllow: /\n\nSitemap: ${FEndUrl}/sitemap.xml\nSitemap: ${FEndUrl}/english-sitemap/.xml\nSitemap: ${FEndUrl}/english-sitemap.xml\n`
    var todate = new Date()
    xml += `Sitemap: ${FEndUrl}/english-sitemap/sitemap-daily-${todate.getFullYear()}-${todate.getMonth() < 9 ? '0' + (todate.getMonth() + 1) : todate.getMonth() + 1}-${todate.getDate() < 10 ? '0' + todate.getDate() : todate.getDate()}.xml\nSitemap: ${FEndUrl}/english-sitemap/sitemap-daily-${todate.getFullYear()}-${todate.getMonth() < 9 ? '0' + (todate.getMonth() + 1) : todate.getMonth() + 1}-${todate.getDate() < 10 ? '0' + todate.getDate() : todate.getDate()}.xml\n`
    todate.setHours(23, 59, 59, 999)
    for (let i = 0; i < 30; i++) {
        todate.setDate(todate.getDate() - 1)
        xml += `Sitemap: ${FEndUrl}/english-sitemap/sitemap-daily-${todate.getFullYear()}-${todate.getMonth() < 9 ? '0' + (todate.getMonth() + 1) : todate.getMonth() + 1}-${todate.getDate() < 10 ? '0' + todate.getDate() : todate.getDate()}.xml\nSitemap: ${FEndUrl}/english-sitemap/sitemap-daily-${todate.getFullYear()}-${todate.getMonth() < 9 ? '0' + (todate.getMonth() + 1) : todate.getMonth() + 1}-${todate.getDate() < 10 ? '0' + todate.getDate() : todate.getDate()}.xml\n`
    }
    // for (let i = 0; i < 70; i++) {
    //     xml += `Sitemap: ${FEndUrl}/sitemap-bn/sitemap-bn-${i + 1}.xml\n`
    // }
    // for (let i = 0; i < 16; i++) {
    //     xml += `Sitemap: ${FEndUrl}/sitemap-en/sitemap-en-${i + 1}.xml\n`
    // }
    xml += `Sitemap: ${FEndUrl}/english-news-sitemap.xml\n`
    response.send(xml);
});

app.get('/sitemap.xml', function (request, response) {
    response.setHeader('Content-Type', 'application/xml');
    console.log('sitemap.xml visited!');

    let xml = `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <sitemap>
            <loc>${FEndUrl}/english-sitemap.xml</loc>
        </sitemap>`
    var todate = new Date()
    xml += `
    <sitemap>
        <loc>${FEndUrl}/english-sitemap/sitemap-daily-${todate.getFullYear()}-${todate.getMonth() < 9 ? '0' + (todate.getMonth() + 1) : todate.getMonth() + 1}-${todate.getDate() < 10 ? '0' + todate.getDate() : todate.getDate()}.xml</loc>
        <lastmod>${todate.toISOString()}</lastmod>
    </sitemap>`
    todate.setHours(23, 59, 59, 999)
    for (let i = 0; i < 30; i++) {
        todate.setDate(todate.getDate() - 1)
        xml += `
        <sitemap>
            <loc>${FEndUrl}/english-sitemap/sitemap-daily-${todate.getFullYear()}-${todate.getMonth() < 9 ? '0' + (todate.getMonth() + 1) : todate.getMonth() + 1}-${todate.getDate() < 10 ? '0' + todate.getDate() : todate.getDate()}.xml</loc>
            <lastmod>${todate.toISOString()}</lastmod>
        </sitemap>`
    }
    // for (let i = 0; i < 70; i++) {
    //     xml += `<sitemap>
    //         <loc>${FEndUrl}/sitemap-bn/sitemap-bn-${i + 1}.xml</loc>
    //         <lastmod>${todate.toISOString()}</lastmod>
    //     </sitemap>`
    // }
    for (let i = 0; i < 16; i++) {
        xml += `<sitemap>
            <loc>${FEndUrl}/sitemap-en/sitemap-en-${i + 1}.xml</loc>
            <lastmod>${todate.toISOString()}</lastmod>
        </sitemap>`
    }
    xml += `</sitemapindex>`;
    response.send(xml);
});
app.get('/english-news-sitemap.xml', async function (request, response) {
    console.log('english-news-sitemap visited!');
    response.setHeader('Content-Type', 'application/xml');

    const sql = `
        SELECT en_contents.ContentID, 
               en_contents.DetailsHeading, 
               en_contents.URLAlies, 
               en_contents.ImageBgPath, 
               en_contents.ImageBgPathCaption, 
               DATE_FORMAT(en_contents.created_at, "%Y-%m-%d") as fcreated_at,
               DATE_FORMAT(en_contents.updated_at, "%Y-%m-%d") as fupdated_at,
               (SELECT en_bas_categories.Slug 
                FROM en_bas_categories 
                JOIN en_category_contents ON en_category_contents.CategoryID = en_bas_categories.CategoryID 
                WHERE en_category_contents.ContentID = en_contents.ContentID 
                LIMIT 1) AS CategorySlug
        FROM en_contents PARTITION (p5)
        JOIN en_category_contents ON en_contents.ContentID = en_category_contents.ContentID 
        JOIN en_bas_categories ON en_category_contents.CategoryID = en_bas_categories.CategoryID
        WHERE en_contents.Deletable = 1 AND en_contents.ShowContent = 1
        ORDER BY ContentID DESC LIMIT 500`;

    const escapeXml = (unsafe) => {
        return unsafe.replace(/[<>&'"]/g, function (c) {
            switch (c) {
                case '<': return '&lt;';
                case '>': return '&gt;';
                case '&': return '&amp;';
                case '\'': return '&apos;';
                case '"': return '&quot;';
            }
        });
    };

    try {
        const result = await enConfig.query(sql);

        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
                        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
                        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
                        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">`;

        if (result && result.length > 0) {
            for (let i = 0; i < result.length; i++) {
                const date = (result[i].fupdated_at && result[i].fupdated_at !== '0000-00-00')
                    ? result[i].fupdated_at
                    : result[i].fcreated_at;

                xml += `<url>
                    <loc>${FEndUrl}/details/${result[i].CategorySlug}/${result[i].ContentID}</loc>
                    <news:news>
                        <news:publication>
                            <news:name>DeshkalNews.com</news:name>
                            <news:language>en</news:language>
                        </news:publication>
                        <news:publication_date>${date}</news:publication_date>
                        <news:title>${escapeXml(result[i].DetailsHeading)}</news:title>
                    </news:news>
                </url>`;
            }
        }

        xml += `</urlset>`;
        response.send(xml);

    } catch (error) {
        console.error("Error while executing the query:", error.message || error);
        console.error("Error stack:", error.stack);

        response.status(500).send({
            error: true,
            message: 'Internal Server Error',
            details: error.message || 'Unknown error'
        });
    }
});
app.get('/archives', function (request, response) {
    console.log('English archive page visited!');
    const filePath = path.resolve(__dirname, './build', 'index.html');
    fs.readFile(filePath, 'utf8', async function (err, data) {
        if (err) {
            return console.log(err);
        }

        data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
        data = data.replace(/\$OG_TITLE/g, 'Archive | All important old news and records');
        data = data.replace(/\$OG_DESCRIPTION/g, "All the archived old reports of Deshkal News in one place");
        data = data.replace(/\$OG_KEYWORDS/g, "Archive, Old News, Preservation, News Archive");
        data = data.replace(/\$AUTHOR/g, "DeshKalNews :: DeshKalNews.com");
        data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
        // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
        var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        data = data.replace(/\$OG_URL/g, `${fullUrl}`);
        response.send(data);
    });
});

app.get('/latest', function (request, response) {
    console.log('English latest page visited!');
    const filePath = path.resolve(__dirname, './build', 'index.html');
    fs.readFile(filePath, 'utf8', async function (err, data) {
        if (err) {
            return console.log(err);
        }

        data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
        data = data.replace(/\$OG_TITLE/g, 'Latest news, Breaking news | DeshkalNews.com');
        data = data.replace(/\$OG_DESCRIPTION/g, "Read today's breaking news of Bangladesh on politics, sports, business, entertainment, weather, lifestyle, education, tourism, and latest bd news leading Bangla News portal Deshkal News");
        data = data.replace(/\$OG_KEYWORDS/g, "All news, today's news, today's news, breaking news, Bengali, Deshkalnews.com");
        data = data.replace(/\$AUTHOR/g, "DeshKalNews :: DeshKalNews.com");
        data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
        // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
        var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        data = data.replace(/\$OG_URL/g, `${fullUrl}`);
        response.send(data);
    });
});

app.get('/photo', function (request, response) {
    console.log('english photo gallery visited!');
    const filePath = path.resolve(__dirname, './build', 'index.html');
    fs.readFile(filePath, 'utf8', async function (err, data) {
        if (err) {
            return console.log(err);
        }

        data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
        data = data.replace(/\$OG_TITLE/g, 'News in Pictures | Photojournalism and Photo Reporting');
        data = data.replace(/\$OG_DESCRIPTION/g, "Our photos brought the news to life");
        data = data.replace(/\$OG_KEYWORDS/g, "News pictures, photo reports, news in pictures");
        data = data.replace(/\$AUTHOR/g, "DeshKalNews :: DeshKalNews.com");
        data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
        // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
        var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        data = data.replace(/\$OG_URL/g, `${fullUrl}`);
        response.send(data);
    });
});

app.get('/tags', function (request, response) {
    console.log('English tags page visited!');
    const filePath = path.resolve(__dirname, './build', 'index.html');
    fs.readFile(filePath, 'utf8', async function (err, data) {
        if (err) {
            return console.log(err);
        }

        data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
        data = data.replace(/\$OG_TITLE/g, 'DeshKalNews.com :: Tags');
        data = data.replace(/\$OG_DESCRIPTION/g, "DeshKalNews.com :: Tags");
        data = data.replace(/\$OG_KEYWORDS/g, "DeshKalNews.com, DeshkalNews, Newspaper, Bangladesh, Newspaper, Newspaper, National, Country, Kolkata, Dhaka, Dhaka, Rajshahi, Sylhet, Rangpur, Mymensingh, Capital, International Politics, Entertainment, Domestic, Foreign, Sports Cricket, Cricket Cricket, Special Column, Economy, Religion, Lifestyle, Fashion, Recipe, Seven Colors, Seven Colors, Telescope, Hour, Book Fair, Information Technology, Educational Institution, Law Court, Law Law, Art Literature, Literature, Health and Medicine, Health Treatment, Fee, Science, Liberation, Life, Job Corner, Job, Interesting News, Cartoon, Social Media, Cyberspace, Archive, Literary Travel, Computer, Mobile Phone, Games, Government, Law and Justice, Environment, Health, Parliament, Panjal, Stock Market, Clothing Clothing, Football, Morning, Afternoon");
        data = data.replace(/\$AUTHOR/g, "DeshKalNews :: DeshKalNews.com");
        data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
        // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
        var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        data = data.replace(/\$OG_URL/g, `${fullUrl}`);
        response.send(data);
    });
});

app.get('/writers', function (request, response) {
    console.log('English writers page visited!');
    const filePath = path.resolve(__dirname, './build', 'index.html');
    fs.readFile(filePath, 'utf8', async function (err, data) {
        if (err) {
            return console.log(err);
        }

        data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
        data = data.replace(/\$OG_TITLE/g, 'DeshKalNews.com:: Writers');
        data = data.replace(/\$OG_DESCRIPTION/g, "DeshKalNews.com:: Writers");
        data = data.replace(/\$OG_KEYWORDS/g, "DeshKalNews.com, newspaper, Bangladesh, today's newspaper, national, nationwide, Barisal, Chittagong, Dhaka, Khulna, Rajshahi, Sylhet, Rangpur, Mymensingh, capital, international, politics, entertainment, domestic, foreign, sports, cricket, World Cup cricket, special columns, economy, religion, lifestyle, fashion, recipes, seven colors, seven colors, telescope, first hour, book fair, information technology, educational institutions, law courts, law courts, art and literature, art literature, health and medicine, health medicine, features, science, travel, open talk, face to face, expatriate life, job corner, job, interesting news, cartoons, social media, cyberspace, archive, literature, computer, mobile phone, games, government, crime, law and justice, environment, accident, parliament, capital, stock market, trade, garment industry, football, morning, afternoon");
        data = data.replace(/\$AUTHOR/g, "DeshKalNews :: DeshKalNews.com");
        data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
        // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
        var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        data = data.replace(/\$OG_URL/g, `${fullUrl}`);
        response.send(data);
    });
});


app.get('/privacy-policy', function (request, response) {
    console.log('English privacy-policy page visited!');
    const filePath = path.resolve(__dirname, './build', 'index.html')
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }

        data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
        data = data.replace(/\$OG_TITLE/g, 'DeshKalNews.com :: Privacy Policy');
        data = data.replace(/\$OG_DESCRIPTION/g, "DeshKalNews.com :: Privacy Policy");
        data = data.replace(/\$OG_KEYWORDS/g, "DeshkalNews.com, newspaper, Bangladesh, today's newspaper, national, nationwide, Barisal, Chittagong, Dhaka, Khulna, Rajshahi, Sylhet, Rangpur, Mymensingh, capital, international, politics, entertainment, domestic, foreign, sports, cricket, World Cup cricket, special columns, economy, religion, lifestyle, fashion, recipes, seven colors, seven colors, telescope, first hour, book fair, information technology, educational institutions, law courts, law courts, art and literature, art literature, health and medicine, health medicine, features, science, travel, open talk, face to face, expatriate life, job corner, job, interesting news, cartoons, social media, cyberspace, archive, literature, computer, mobile phone, games, government, crime, law and justice, environment, accident, parliament, capital, stock market, trade, garment industry, football, morning, afternoon");
        data = data.replace(/\$AUTHOR/g, "DeshKalNews :: DeshKalNews.com");
        data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
        // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
        var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        data = data.replace(/\$OG_URL/g, `${fullUrl}`);
        response.send(data);
    });
});

app.get('/terms-service', function (request, response) {
    console.log('English terms-conditions page visited!');
    const filePath = path.resolve(__dirname, './build', 'index.html')
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }

        data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
        data = data.replace(/\$OG_TITLE/g, 'DeshKalNews.com :: Terms & Conditions');
        data = data.replace(/\$OG_DESCRIPTION/g, "DeshKalNews.com :: Terms & Conditions");
        data = data.replace(/\$OG_KEYWORDS/g, "DeshKalNews.com, newspaper, Bangladesh, today's newspaper, national, nationwide, Barisal, Chittagong, Dhaka, Khulna, Rajshahi, Sylhet, Rangpur, Mymensingh, capital, international, politics, entertainment, domestic, foreign, sports, cricket, World Cup cricket, special columns, economy, religion, lifestyle, fashion, recipes, seven colors, seven colors, telescope, first hour, book fair, information technology, educational institutions, law courts, law courts, art and literature, art literature, health and medicine, health medicine, features, science, travel, open talk, face to face, expatriate life, job corner, job, interesting news, cartoons, social media, cyberspace, archive, literature, computer, mobile phone, games, government, crime, law and justice, environment, accident, parliament, capital, stock market, trade, garment industry, football, morning, afternoon");
        data = data.replace(/\$AUTHOR/g, "DeshKalNews :: DeshKalNews.com");
        data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
        // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
        var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        data = data.replace(/\$OG_URL/g, `${fullUrl}`);
        response.send(data);
    });
});

// english contact page 
app.get('/contact-us', function (request, response) {
    console.log('English Contact page visited!');
    const filePath = path.resolve(__dirname, './build', 'index.html')
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }

        data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
        data = data.replace(/\$OG_TITLE/g, 'DeshKalNews :: Contact');
        data = data.replace(/\$OG_DESCRIPTION/g, "DeshKalNews :: Contact");
        data = data.replace(/\$OG_KEYWORDS/g, "DeshKalNews.com, newspaper, Bangladesh, today's newspaper, national, nationwide, Barisal, Chittagong, Dhaka, Khulna, Rajshahi, Sylhet, Rangpur, Mymensingh, capital, international, politics, entertainment, domestic, foreign, sports, cricket, World Cup cricket, special columns, economy, religion, lifestyle, fashion, recipes, seven colors, seven colors, telescope, first hour, book fair, information technology, educational institutions, law courts, law courts, art and literature, art literature, health and medicine, health medicine, features, science, travel, open talk, face to face, expatriate life, job corner, job, interesting news, cartoons, social media, cyberspace, archive, literature, computer, mobile phone, games, government, crime, law and justice, environment, accident, parliament, capital, stock market, trade, garment industry, football, morning, afternoon");
        data = data.replace(/\$AUTHOR/g, "DeshKalNews :: DeshKalNews.com");
        data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
        // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
        var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        data = data.replace(/\$OG_URL/g, `${fullUrl}`);
        response.send(data);
    });
});

// english advertise page 
app.get('/advertise', function (request, response) {
    console.log('English advertise page visited!');
    const filePath = path.resolve(__dirname, './build', 'index.html')
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }

        data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
        data = data.replace(/\$OG_TITLE/g, 'DeshKalNews :: Advertisement');
        data = data.replace(/\$OG_DESCRIPTION/g, "DeshKalNews :: Advertisement");
        data = data.replace(/\$OG_KEYWORDS/g, "DeshKalNews.com, newspaper, Bangladesh, today's newspaper, national, nationwide, Barisal, Chittagong, Dhaka, Khulna, Rajshahi, Sylhet, Rangpur, Mymensingh, capital, international, politics, entertainment, domestic, foreign, sports, cricket, World Cup cricket, special columns, economy, religion, lifestyle, fashion, recipes, seven colors, seven colors, telescope, first hour, book fair, information technology, educational institutions, law courts, law courts, art and literature, art literature, health and medicine, health medicine, features, science, travel, open talk, face to face, expatriate life, job corner, job, interesting news, cartoons, social media, cyberspace, archive, literature, computer, mobile phone, games, government, crime, law and justice, environment, accident, parliament, capital, stock market, trade, garment industry, football, morning, afternoon");
        data = data.replace(/\$AUTHOR/g, "DeshKalNews :: DeshKalNews.com");
        data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
        // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
        var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        data = data.replace(/\$OG_URL/g, `${fullUrl}`);
        response.send(data);
    });
});

// english About page 
app.get('/about', function (request, response) {
    console.log('English about page visited!');
    const filePath = path.resolve(__dirname, './build', 'index.html')
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }

        data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
        data = data.replace(/\$OG_TITLE/g, 'DeshKalNews :: about');
        data = data.replace(/\$OG_DESCRIPTION/g, "DeshKalNews :: about");
        data = data.replace(/\$OG_KEYWORDS/g, "DeshKalNews.com, newspaper, Bangladesh, today's newspaper, national, nationwide, Barisal, Chittagong, Dhaka, Khulna, Rajshahi, Sylhet, Rangpur, Mymensingh, capital, international, politics, entertainment, domestic, foreign, sports, cricket, World Cup cricket, special columns, economy, religion, lifestyle, fashion, recipes, seven colors, seven colors, telescope, first hour, book fair, information technology, educational institutions, law courts, law courts, art and literature, art literature, health and medicine, health medicine, features, science, travel, open talk, face to face, expatriate life, job corner, job, interesting news, cartoons, social media, cyberspace, archive, literature, computer, mobile phone, games, government, crime, law and justice, environment, accident, parliament, capital, stock market, trade, garment industry, football, morning, afternoon");
        data = data.replace(/\$AUTHOR/g, "DeshKalNews :: DeshKalNews.com");
        data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
        // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
        var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        data = data.replace(/\$OG_URL/g, `${fullUrl}`);
        response.send(data);
    });
});

// english rss
app.get('/rss/rss.xml', async function (request, response) {
    response.setHeader("Content-Type", "application/xml; charset=utf-8");
    console.log('rss.xml visited!');

    try {
        const now = new Date();
        const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const curdate = `${weekdayNames[now.getDay()]}, ${now.getDate()} ${monthNames[now.getMonth()]} ${now.getFullYear()}`;

        // sitemap-style joins + CategorySlug subquery
        const sql = `
        SELECT 
          en_contents.ContentID,
          en_contents.ContentHeading,
          en_contents.ContentBrief,
          en_contents.ImageBgPath,
          en_contents.URLAlies,
          en_contents.created_at,
          en_contents.updated_at,
          (
            SELECT en_bas_categories.Slug
            FROM en_bas_categories
            JOIN en_category_contents 
              ON en_category_contents.CategoryID = en_bas_categories.CategoryID
            WHERE en_category_contents.ContentID = en_contents.ContentID
            LIMIT 1
          ) AS CategorySlug
        FROM en_contents
        JOIN en_category_contents 
          ON en_contents.ContentID = en_category_contents.ContentID
        JOIN en_bas_categories 
          ON en_category_contents.CategoryID = en_bas_categories.CategoryID
        WHERE en_contents.Deletable = 1
          AND en_contents.ShowContent = 1
        ORDER BY en_contents.ContentID DESC
        LIMIT 120
      `;

        const result = await enConfig.query(sql); // same style as your sitemap

        if (result && result.length > 0) {
            let xml = `<rss xmlns:dc="http://purl.org/dc/elements/1.1/"
                         xmlns:content="http://purl.org/rss/1.0/modules/content/"
                         xmlns:atom="http://www.w3.org/2005/Atom"
                         xmlns:media="http://search.yahoo.com/mrss/"
                         xml:base="${FEndUrl}/"
                         version="2.0">
          <channel>
            <title><![CDATA[ Deshkalnews.com ]]></title>
            <description><![CDATA[ DeshKalNews.com :: Deshkalnews.com ]]></description>
            <link>${FEndUrl}</link>
            <image>
              <url>${BEndUrl}/media/common/thumb.jpg</url>
              <title>DeshKalNews.com - RSS</title>
              <link>${FEndUrl}</link>
            </image>
            <generator>RSS by DeshkalNews.com</generator>
            <lastBuildDate>${curdate}</lastBuildDate>
            <copyright><![CDATA[ Copyright: (C) Deshkalnews.com ]]></copyright>
            <language><![CDATA[ en ]]></language>
            <ttl>15</ttl>
            <atom:link href="${FEndUrl}/rss/rss.xml" rel="self" type="application/rss+xml"/>`;

            for (let i = 0; i < result.length; i++) {
                const row = result[i];
                const lastmod = row.updated_at || row.created_at;
                const pubDate = new Date(lastmod).toUTCString(); // RFC 822

                const title = row.ContentHeading ? row.ContentHeading.replace(/&/g, "&amp;") : "";
                const desc = row.ContentBrief ? row.ContentBrief.replace(/&/g, "&amp;") : "";

                xml += `<item>
            <title><![CDATA[ ${title} ]]></title>
            <description><![CDATA[ ${desc} ]]></description>
            <link>${FEndUrl}/${row.CategorySlug}/${row.ContentID}</link>
            <guid isPermaLink="true">${FEndUrl}/${row.CategorySlug}/${row.ContentID}</guid>
            <pubDate>${pubDate}</pubDate>
            <media:content medium="image" width="800" height="450" url="${CDNUrl}/media/${row.ImageBgPath}"/>
          </item>`;
            }

            xml += `</channel></rss>`;
            return response.send(xml);
        }

        return response.send('');
    } catch (error) {
        console.error("Error in RSS generation:", error);
        return response.status(500).send({
            error: true,
            message: 'Internal Server Error',
            details: error?.message || 'Unknown error'
        });
    }
}); // <— only ONE closer for the route

app.get('/english-sitemap/:dailysitemap', async function (request, response) {
    console.log('english-sitemap/dailysitemap visited!');

    let dailysitemap = request.params.dailysitemap;

    if (!dailysitemap || !dailysitemap.includes("sitemap-daily-")) {
        return response.status(400).send({ error: true, message: 'Invalid Sitemap Request' });
    }

    let date = dailysitemap.replace('sitemap-daily-', '').replace('.xml', '');
    let datearr = date.split("-");
    let date_ob = new Date(date);

    // Validate the date
    if (!isNaN(date_ob) && datearr.length === 3 && datearr[0].length === 4 && datearr[1].length === 2 && datearr[2].length === 2) {
        response.setHeader('Content-Type', 'application/xml');

        let sql = `
            SELECT en_contents.ContentID, 
       en_contents.DetailsHeading, 
       en_contents.URLAlies, 
       en_contents.ImageBgPath, 
       en_contents.ImageBgPathCaption, 
       en_contents.created_at, 
       en_contents.updated_at,
       ( SELECT en_bas_categories.Slug FROM en_bas_categories JOIN en_category_contents ON en_category_contents.CategoryID = en_bas_categories.CategoryID WHERE en_category_contents.ContentID = en_contents.ContentID LIMIT 1 ) AS CategorySlug
       FROM en_contents JOIN en_category_contents ON en_contents.ContentID = en_category_contents.ContentID JOIN en_bas_categories ON en_category_contents.CategoryID = en_bas_categories.CategoryID
       WHERE en_contents.Deletable=1 AND en_contents.ShowContent=1 AND DATE(en_contents.created_at) = ?`;

        try {
            // Execute query using the connection pool
            const result = await enConfig.query(sql, [date]);

            // Construct XML response
            let xml = `<urlset xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" 
                            xmlns:video="http://www.google.com/schemas/sitemap-video/1.1" 
                            xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

            if (result && result.length > 0) {
                for (let i = 0; i < result.length; i++) {
                    let lastmoddate = result[i].updated_at || result[i].created_at;
                    let moddate = new Date(lastmoddate);

                    xml += `<url>
    <loc>${FEndUrl}/${result[i].CategorySlug}/${result[i].ContentID}</loc>
    <image:image>
        <image:loc>${CDNUrl}/${result[i].ImageBgPath}</image:loc>
        <image:caption>
            <![CDATA[ ${(result[i].ImageBgPathCaption ? result[i].ImageBgPathCaption.replace("&", "&amp;") : "")} ]]>
        </image:caption>
    </image:image>
    <changefreq>hourly</changefreq>
    <lastmod>${moddate.toISOString()}</lastmod>
</url>`;
                }
            }

            xml += `</urlset>`;

            // Send the XML response
            response.send(xml);
        } catch (error) {
            // Log the exact error to understand why it's failing
            console.error("Error while executing the query:", error.message || error);
            console.error("Error stack:", error.stack);

            response.status(500).send({
                error: true,
                message: 'Internal Server Error',
                details: error.message || 'Unknown error'
            });
        }
    } else {
        return response.status(400).send({ error: true, message: 'Invalid Date Format' });
    }
});


app.get('/:catSlugEn', async function (request, response) {
    let catSlug = request.params.catSlugEn;
    console.log('English Category page visited!' + catSlug);
    const filePath = path.resolve(__dirname, './build', 'index.html');

    let sql = `SELECT CategoryID, CategoryName, Remarks, DisplayCatName, Keywords FROM en_bas_categories WHERE Slug=?`;
    try {
        const queryData = await enConfig.query(sql, [catSlug]);
        if (queryData && queryData.length > 0) {
            let title = queryData[0].CategoryName;
            let displayTitle = queryData[0].DisplayCatName || title;
            let description = queryData[0].Remarks || title;
            let keyword = queryData[0].Keywords || title.split(" ").toString();


            fs.readFile(filePath, 'utf8', async function (err, data) {
                if (err) {
                    return console.log(err);
                }
                data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
                data = data.replace(/\$OG_TITLE/g, `${displayTitle}`);
                data = data.replace(/\$OG_DESCRIPTION/g, `${description}`);
                data = data.replace(/\$OG_KEYWORDS/g, `${keyword}`);
                data = data.replace(/\$AUTHOR/g, "DeshKalNews :: DeshKalNews.com");
                data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
                // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
                var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);
                response.send(data);
            });
        } else {
            fs.readFile(filePath, 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }
                data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
                data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found`);
                data = data.replace(/\$AUTHOR/g, "DeshKalNews :: DeshKalNews.com");
                data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
                // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
                var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);
                response.send(data);
            });
        }
    }
    catch (err) {
        console.log('contentDetails error');
        console.log(err);
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }

            data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
            data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found - Something Went Wrong`);
            data = data.replace(/\$AUTHOR/g, "DeshKalNews :: DeshKalNews.com");
            data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
            // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
            // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
            var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
            data = data.replace(/\$OG_URL/g, `${fullUrl}`);
            response.send(data);
        });
    }
});

///
app.get('/photo/:photoID', async function (request, response) {
    let photoID = request.params.photoID;
    console.log('english Photo Feature Detail page visited!' + photoID);
    const filePath = path.resolve(__dirname, './build', 'index.html');

    // let sql = `SELECT photo_features.PhotoFeatureID, photo_features.PhotoFeatureTitle, photo_features.ShortBrief, ImageBgPath FROM photo_features WHERE photo_features.Deletable=1 AND photo_features.PhotoFeatureID=? LIMIT 1;`;
    let sql = `SELECT en_content_albums.Title, en_content_photo_galleries.ImagePath FROM en_content_albums LEFT JOIN en_content_photo_galleries ON en_content_photo_galleries.AlbumID=en_content_albums.AlbumID WHERE en_content_albums.Deletable!=1 AND en_content_albums.AlbumID=? LIMIT 1;`;
    try {
        const queryData = await enConfig.query(sql, [photoID]);

        if (queryData && queryData.length > 0) {
            let title = queryData[0].Title;
            let description = queryData[0].Title;
            // if (!description) {
            //     description = title
            // } else {
            //     description = (queryData[0].Title).replace(/(<([^>]+)>)/ig, '')
            // }
            let image = '';
            if (queryData[0].ImagePath) {
                image = queryData[0].ImagePath
            } else {
                image = 'common/thumb.jpg'
            }
            let keyword = '';
            keyword = title.split(" ");
            keyword = keyword.toString();
            fs.readFile(filePath, 'utf8', async function (err, data) {
                if (err) {
                    return console.log(err);
                }


                data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
                data = data.replace(/\$OG_TITLE/g, `${title}`);
                data = data.replace(/\$OG_DESCRIPTION/g, `${description}`);
                data = data.replace(/\$OG_KEYWORDS/g, `${keyword}`);
                data = data.replace(/\$AUTHOR/g, "DeshKalNews :: DeshKalNews.com");
                data = data.replace(/\$OG_IMAGE/g, `${CDNUrl}/media/${image}`);
                // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
                var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);
                data = data.replace(/\$AMP_URL/g, '');
                response.send(data);
            });
        } else {
            fs.readFile(filePath, 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }


                data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
                data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found`);
                data = data.replace(/\$AUTHOR/g, "DeshKalNews :: DeshKalNews.com");
                data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
                // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
                var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);
                data = data.replace(/\$AMP_URL/g, '');
                response.send(data);
            });
        }
    } catch (err) {
        console.log('english contentDetails error');
        console.log(err);
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }


            data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
            data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found - Something Went Wrong`);
            data = data.replace(/\$AUTHOR/g, "DeshKalNews :: DeshKalNews.com");
            data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
            // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
            // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
            var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
            data = data.replace(/\$OG_URL/g, `${fullUrl}`);
            data = data.replace(/\$AMP_URL/g, '');
            response.send(data);
        });
    }
});
app.get('/tags/:TagTitle', async function (request, response) {
    let TagTitle = request.params.TagTitle;
    console.log('English Tags page visited!' + TagTitle);
    const filePath = path.resolve(__dirname, './build', 'index.html');

    let sql = `SELECT TagID, TagName FROM en_tags WHERE TagName=?`;
    try {
        const queryData = await enConfig.query(sql, [TagTitle]);

        if (queryData && queryData.length > 0) {
            let title = queryData[0].TagName;
            let keyword = title.split(" ");
            keyword = keyword.toString();
            fs.readFile(filePath, 'utf8', async function (err, data) {
                if (err) {
                    return console.log(err);
                }

                data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
                data = data.replace(/\$OG_TITLE/g, `${title}`);
                data = data.replace(/\$OG_DESCRIPTION/g, `${title}`);
                data = data.replace(/\$OG_KEYWORDS/g, `${keyword}`);
                data = data.replace(/\$AUTHOR/g, "DeshKalNews :: DeshKalNews.com");
                data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
                // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
                var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);
                response.send(data);
            });
        } else {
            fs.readFile(filePath, 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }

                data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
                data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found`);
                data = data.replace(/\$AUTHOR/g, "DeshKalNews :: DeshKalNews.com");
                data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
                // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
                var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);
                response.send(data);
            });
        }
    } catch (err) {
        console.log('contentDetails error');
        console.log(err);
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }

            data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
            data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found - Something Went Wrong`);
            data = data.replace(/\$AUTHOR/g, "DeshKalNews :: DeshKalNews.com");
            data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
            // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
            // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
            var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
            data = data.replace(/\$OG_URL/g, `${fullUrl}`);
            response.send(data);
        });
    }
});
app.get('/writers/:WriterSlug', async function (request, response) {
    let WriterSlug = request.params.WriterSlug;
    console.log('English Writers page visited!' + WriterSlug);
    const filePath = path.resolve(__dirname, './build', 'index.html');

    let sql = `SELECT WriterID, WriterName FROM en_writers WHERE Slug=?`;
    try {
        const queryData = await enConfig.query(sql, [WriterSlug]);

        if (queryData && queryData.length > 0) {
            let title = queryData[0].WriterName;
            let keyword = title.split(" ");
            keyword = keyword.toString();
            fs.readFile(filePath, 'utf8', async function (err, data) {
                if (err) {
                    return console.log(err);
                }

                data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
                data = data.replace(/\$OG_TITLE/g, `${title}`);
                data = data.replace(/\$OG_DESCRIPTION/g, `${title}`);
                data = data.replace(/\$OG_KEYWORDS/g, `${keyword}`);
                data = data.replace(/\$AUTHOR/g, "DeshKalNews :: DeshKalNews.com");
                data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
                // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
                var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);
                response.send(data);
            });
        } else {
            fs.readFile(filePath, 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }

                data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
                data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found`);
                data = data.replace(/\$AUTHOR/g, "DeshKalNews :: DeshKalNews.com");
                data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
                // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
                var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);
                response.send(data);
            });
        }
    }
    catch (err) {
        console.log('contentDetails error');
        console.log(err);
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }

            data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
            data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found - Something Went Wrong`);
            data = data.replace(/\$AUTHOR/g, "DeshKalNews :: DeshKalNews.com");
            data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
            // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
            // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
            var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
            data = data.replace(/\$OG_URL/g, `${fullUrl}`);
            response.send(data);
        });
    }
});
app.get('/search/:searchSlug', function (request, response) {
    console.log('English Search page visited!');
    const filePath = path.resolve(__dirname, './build', 'index.html');
    fs.readFile(filePath, 'utf8', async function (err, data) {
        if (err) {
            return console.log(err);
        }


        data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
        data = data.replace(/\$OG_TITLE/g, 'Search | Search Latest News ::DeshKalNews.com');
        data = data.replace(/\$OG_DESCRIPTION/g, "Search | Search Latest News ::DeshKalNews.com");
        data = data.replace(/\$OG_KEYWORDS/g, "DeshKalNews.com, newspaper, Bangladesh, today's newspaper, national, nationwide, Barisal, Chittagong, Dhaka, Khulna, Rajshahi, Sylhet, Rangpur, Mymensingh, capital, international, politics, entertainment, domestic, foreign, sports, cricket, World Cup cricket, special columns, economy, religion, lifestyle, fashion, recipes, seven colors, seven colors, telescope, first hour, book fair, information technology, educational institutions, law courts, law courts, art and literature, art literature, health and medicine, health medicine, features, science, travel, open talk, face to face, expatriate life, job corner, job, interesting news, cartoons, social media, cyberspace, archive, literature, computer, mobile phone, games, government, crime, law and justice, environment, accident, parliament, capital, stock market, trade, garment industry, football, morning, afternoon");
        data = data.replace(/\$AUTHOR/g, "DeshKalNews :: DeshKalNews.com");
        data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
        // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
        var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        data = data.replace(/\$OG_URL/g, `${fullUrl}`);
        response.send(data);
    });
});
app.get('/:catSlugEn/sub/:subCatSlug', async function (request, response) {
    let catSlug = request.params.catSlugEn;
    let subCatSlug = request.params.subCatSlug;
    console.log('English sub Category page visited! ' + catSlug + '/' + subCatSlug);
    const filePath = path.resolve(__dirname, './build', 'index.html');

    // let sql = `SELECT bn_bas_categories.CategoryID subCatID, bn_bas_categories.CategoryName subCatTitle FROM bn_bas_categories WHERE bn_bas_categories.Slug=? AND bn_bas_categories.ParentID!=0`;
    let sql = `SELECT a.CategoryID subCatID, a.CategoryName subCatTitle FROM en_bas_categories a JOIN en_bas_categories b ON a.ParentID=b.CategoryID WHERE a.Slug=? AND b.Slug=? AND a.ParentID!=0;`;
    try {
        const queryData = await enConfig.query(sql, [subCatSlug, catSlug]);
        if (queryData && queryData.length > 0) {
            let title = queryData[0].subCatTitle;
            let keyword = title.split(" ");
            keyword = keyword.toString();
            fs.readFile(filePath, 'utf8', async function (err, data) {
                if (err) {
                    return console.log(err);
                }


                data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
                data = data.replace(/\$OG_TITLE/g, `${title}`);
                data = data.replace(/\$OG_DESCRIPTION/g, `${title}`);
                data = data.replace(/\$OG_KEYWORDS/g, `${keyword}`);
                data = data.replace(/\$AUTHOR/g, "DeshKalNews :: DeshKalNews.com");
                data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
                // var fullUrl = request.protocol + '://' + request.get('host') + (request.originalUrl).replace(/\/+$/, '');
                // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
                var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);
                response.send(data);
            });
        } else {
            fs.readFile(filePath, 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }


                data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
                data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found`);
                data = data.replace(/\$AUTHOR/g, "DeshKalNews :: DeshKalNews.com");
                data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
                // var fullUrl = request.protocol + '://' + request.get('host') + (request.originalUrl).replace(/\/+$/, '');
                // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
                var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);
                response.send(data);
            });
        }
    } catch (err) {
        console.log('contentDetails error');
        console.log(err);
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }


            data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
            data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found - Something Went Wrong`);
            data = data.replace(/\$AUTHOR/g, "DeshKalNews :: DeshKalNews.com");
            data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
            // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
            // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
            var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
            data = data.replace(/\$OG_URL/g, `${fullUrl}`);
            response.send(data);
        });
    }
});
app.get('/:catSlugEn/:id', async function (request, response) {
    let catSlug = request.params.catSlugEn;
    let id = request.params.id;
    console.log('English Detail page visited!' + catSlug + ' ' + id);
    const filePath = path.resolve(__dirname, './build', 'index.html');

    // let sql = `SELECT bn_contents.ContentID, bn_contents.CategoryIDs, bn_contents.ContentHeading, bn_contents.ContentBrief, bn_contents.ImageBgPath, bn_contents.URLAlies, bn_contents.Keywords, bn_contents.PlateType, bn_contents.ImagePlatePath FROM bn_contents WHERE bn_contents.ContentID=? AND bn_contents.ShowContent=1 AND bn_contents.Deletable=1`;
    let sql = `SELECT en_contents.ContentID, en_bas_categories.CategoryID, en_contents.DetailsHeading, en_contents.ContentBrief, en_contents.ImageBgPath, en_contents.URLAlies, en_contents.Keywords, en_contents.PlateType, en_contents.ImagePlatePath FROM en_contents JOIN en_category_contents ON en_category_contents.ContentID=en_contents.ContentID JOIN en_bas_categories ON en_bas_categories.CategoryID=en_category_contents.CategoryID WHERE en_contents.ContentID=? AND en_bas_categories.Slug=? AND en_contents.ShowContent=1 AND en_contents.Deletable=1;`;

    try {
        const contentDetails = await enConfig.query(sql, [id, catSlug]);
        if (contentDetails && contentDetails.length > 0) {
            let title = contentDetails[0].DetailsHeading;
            let description = contentDetails[0].ContentBrief;
            if (!description) {
                description = title
            } else {
                description = (contentDetails[0].ContentBrief).replace(/(<([^>]+)>)/ig, '')
            }
            let image = '';
            if (contentDetails[0].PlateType > 0) {
                image = contentDetails[0].ImagePlatePath;
            } else {
                image = contentDetails[0].ImageBgPath
            }
            let keyword = '';
            if (contentDetails[0].Keywords) {
                keyword = contentDetails[0].Keywords
            } else {
                keyword = title.split(" ");
                keyword = keyword.toString();
            }
            fs.readFile(filePath, 'utf8', async function (err, data) {
                if (err) {
                    return console.log(err);
                }

                data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
                data = data.replace(/\$OG_TITLE/g, `${title}`);
                data = data.replace(/\$OG_DESCRIPTION/g, `${description}`);
                data = data.replace(/\$OG_KEYWORDS/g, `${keyword}`);
                data = data.replace(/\$AUTHOR/g, "DeshKalNews :: DeshKalNews.com");
                data = data.replace(/\$OG_IMAGE/g, `${CDNUrl}/media/${image}`);
                // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
                var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);
                response.send(data);
            });
        } else {
            fs.readFile(filePath, 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }

                data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
                data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found`);
                data = data.replace(/\$AUTHOR/g, "DeshKalNews :: DeshKalNews.com");
                data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
                // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
                var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);
                response.send(data);
            });
        }
    }
    catch (err) {
        console.log('contentDetails error');
        console.log(err);
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }

            data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
            data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found - Something Went Wrong`);
            data = data.replace(/\$AUTHOR/g, "DeshKalNews :: DeshKalNews.com");
            data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
            // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
            // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
            var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
            data = data.replace(/\$OG_URL/g, `${fullUrl}`);
            response.send(data);
        });
    }
});

app.use(express.static(path.resolve(__dirname, './build')));
// app.use('/amp', express.static(path.resolve(__dirname, './buildAmp')))


app.get('*', function (request, response) {
    const filePath = path.resolve(__dirname, './build', 'index.html');
    // response.sendFile(filePath);

    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }

        data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
        data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found`);
        data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found`);
        data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found`);
        data = data.replace(/\$AUTHOR/g, "DeshKalNews ::Deshkalnews.com");
        data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
        // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
        var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        data = data.replace(/\$OG_URL/g, `${fullUrl}`);
        data = data.replace(/\$AMP_URL/g, '');
        response.send(data);
    });
});

// // =========datebase connection close=======
// dbConn.end();
// dbConnMedia.end();

httpServer.listen(FEndPort, function () {
    console.log('Node app is running on port ' + FEndPort);
});
// httpsServer.listen(3400, function () {
//     console.log('Node app is running on port 3400');
// });

module.exports = app;