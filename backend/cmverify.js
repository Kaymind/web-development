module.exports = {
  verify1: (req, res, next) => {
    const { a, b } = req.params;
    const { c } = req.query;
    if (a && b && c) {
      req.a = Number(a);
      req.b = Number(b);
      req.c = Number(c);
      next();
    } else {
      res.end("No token - verify1");
    }
  },

  verify2: (req, res, next) => {
    const { a, b, c } = req;
    if (a + b == c + 1) {
      next();
    } else {
      res.end("Invalid token - verify2");
    }
  }
};
