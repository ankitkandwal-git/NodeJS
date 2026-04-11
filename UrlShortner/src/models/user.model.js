const createUrl = async (db, { shortCode, longUrl, shortUrl }) => {
  const query = `
    INSERT INTO urls (shortCode, originalUrl, shortUrl)
    VALUES (?, ?, ?)
  `;

  await db.run(query, [shortCode, longUrl, shortUrl]);
};

const getUrlCode = async (db, shortCode) => {
  const query = `SELECT * FROM urls WHERE shortCode = ?`;
  return await db.get(query, [shortCode]);
};

const incrementClicks = async(db,shortCode) =>{
    const query = `
       UPDATE urls SET clicks = clicks +1 WHERE shortCode = ?`;
    await db.run(query,[shortCode])
}

module.exports = {
  createUrl,
  getUrlCode,
  incrementClicks
};
