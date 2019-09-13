module.exports = (options) => {
    return (req, res, next) => {
      // Implement the middleware function based on the options object
      let select = {}, filter = {}, sort = {}, page = 0, skip = 0, limit = 0, lmt = 0;
  
      if (req.query.select != undefined && req.query.select != "undefined") {
        select = JSON.parse(req.query.select) || undefined;
      }
      if (req.query.filter != undefined && req.query.filter != "undefined") {
        filter = JSON.parse(req.query.filter) || undefined;
      } else if(req.query != undefined && req.query != "undefined") {
        filter = req.query || undefined;
      }
      
      if (req.query.sort != undefined && req.query.sort != "undefined") {
        sort = JSON.parse(req.query.sort) || undefined;
      }
      if (req.query.page != undefined && req.query.page != "undefined") {
        page = JSON.parse(req.query.page) || 0;
      }
      if (req.query.limit != undefined && req.query.limit != "undefined") {
        limit = JSON.parse(req.query.limit) || 0;
      } else {
        limit = 500;
      }
      
      if (page > 0) {
        if (page == 1)
          skip = limit;
        else
          skip = page * limit;
      }
      
      req.dao_obj = { select: select, filter: filter, sort: sort, skip: skip, limit: limit, page: page, lmt: lmt };
      next()
    }
  };
  
  