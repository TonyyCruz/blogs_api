module.exports = (err, _req, res, _next) => {
  console.log('======++', Object.keys(err));
  res.status(err.status || 500).json({ message: err.message }
    || { message: 'unknown error' });
};