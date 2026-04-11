const createUrl = async (db, { shortCode, longUrl, shortUrl }) => {
  const query = `
    INSERT INTO urls (shortCode, originalUrl, shortUrl)
    VALUES (?, ?, ?)
  `;

  await db.run(query, [shortCode, longUrl, shortUrl]);
};

const getUrlCode = async (db, shortCode) => {
  const query = `
    SELECT * FROM urls WHERE shortCode = ?
  `;
  const row = await db.get(query, [shortCode]);
  return row;
};

module.exports = {
  createUrl,
  getUrlCode
};
