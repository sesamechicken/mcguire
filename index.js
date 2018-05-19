const request = require('request');
const http = require('http');
const app = require('express')();

// res.setHeader("Access-Control-Allow-Origin", "*");
app.get('*', (req, res) => {
  req.headers['Host'] = 'mfr.mlsmatrix.com';
  req.headers['Origin'] = 'http://mfr.mlsmatrix.com';
  let mls = '';
  request('http://mfr.mlsmatrix.com/Matrix/public/IDX.aspx?idx=2c6f1a9a', (error, response, body) => {
    mls = body;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Host', 'mfr.mlsmatrix.com');
    res.setHeader('Origin', 'http://mfr.mlsmatrix.com');
    let clean = mls.replace(/src='\/Matrix/ig, "src=\'http://mfr.mlsmatrix.com/Matrix");
    clean = clean.replace(/="\/Matrix/ig, "=\"http://mfr.mlsmatrix.com/Matrix");
    clean = clean.replace(/action="http:\/\/mfr.mlsmatrix.com\//ig, 'action="');
    res.send(clean);
  });
  
});
app.post('*', (req, res) => {
  const query = req.query;
  console.log('query :', query);
  let mls = '';

  req.headers['Host'] = 'mfr.mlsmatrix.com';
  req.headers['Origin'] = 'http://mfr.mlsmatrix.com';

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Host', 'mfr.mlsmatrix.com');
  res.setHeader('Origin', 'http://mfr.mlsmatrix.com');
  request.post({ 
    url: 'http://mfr.mlsmatrix.com' + req.url, 
    query, 
    followAllRedirects: true,
    headers: {
      'Origin': 'http://mfr.mlsmatrix.com',
      'Host': 'mfr.mlsmatrix.com'
    }
  }, (error, response, body) => {
    mls = body;

    let clean = mls.replace(/src='\/Matrix/ig, "src=\'http://mfr.mlsmatrix.com/Matrix");
    clean = clean.replace(/="\/Matrix/ig, "=\"http://mfr.mlsmatrix.com/Matrix");
    clean = clean.replace(/action="http:\/\/mfr.mlsmatrix.com/ig, 'action="');    
    res.send(clean);
  });

});

app.listen(process.env.PORT || 8081);
console.log('Magic happens on port 8081');
