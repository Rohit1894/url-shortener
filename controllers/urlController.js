import URL from '../models/urlModel.js';
import generateShortCode from '../utils/generateShortCode.js';
import validUrl from 'valid-url';

// POST /api/shorten
export const createShortUrl = async (req, res) => {
  const { original_url } = req.body;

  if (!validUrl.isUri(original_url)) {
    return res.status(400).json({ message: 'Invalid URL' });
  }

  const shortCode = generateShortCode();

  const newUrl = await URL.create({
    originalUrl: original_url,
    shortCode,
  });

  res.status(201).json({
    short_url: `${process.env.BASE_URL}/${shortCode}`,
  });
};

// GET /:shortCode
export const redirectUrl = async (req, res) => {
  const { shortCode } = req.params;

  const url = await URL.findOne({ shortCode });

  if (!url) {
    return res.status(404).json({ message: 'URL not found' });
  }

  url.clickCount += 1;
  await url.save();

  res.redirect(302, url.originalUrl);
};

// GET /api/stats/:shortCode
export const getStats = async (req, res) => {
  const { shortCode } = req.params;

  const url = await URL.findOne({ shortCode });

  if (!url) {
    return res.status(404).json({ message: 'URL not found' });
  }

  res.json({
    original_url: url.originalUrl,
    shortCode: url.shortCode,
    createdAt: url.createdAt,
    click_count: url.clickCount,
  });
};