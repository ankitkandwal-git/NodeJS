const createUrl = async (db, { shortCode, longUrl, shortUrl }) => {
  const query = `
    INSERT INTO urls (shortCode, originalUrl, shortUrl)
    VALUES (?, ?, ?)
  `;

  await db.run(query, [shortCode, longUrl, shortUrl]);
};

module.exports = {
  createUrl
};