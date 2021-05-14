const verifyAuth = (handler) => {
  return async (req, res) => {
    let key;

    const authorization = req.headers.authorization;
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      key = authorization.substring(7);
    } else {
      key = null;
    }

    if (!key || key !== process.env.API_KEY) {
      return res.status(401).json({ error: 'Invalid API key' });
    }

    return handler(req, res);
  };
};

export default verifyAuth;
