(function(g){

  const $ = [

    "Mi40LjE=",

    "U3Vkb2t1IFN1ZG8gZGFuIEFrdQ==",

    "c3RhYmxl",

    "bmFrZWQgc2luZ2xl",

    "aGlkZGVuIHNpbmdsZQ==",

    "eC13aW5n",

    "Ym94IGxpbmU=",

    "bmFrZWQgcGFpcg==",

    "QSBjZWxsIGhhcyBvbmx5IG9uZSBwb3NzaWJsZSBjYW5kaWRhdGUuIEZpbGwgaXQgaW4gZGlyZWN0bHku",

    "QSBkaWdpdCBhcHBlYXJzIGFzIGEgY2FuZGlkYXRlIGluIG9ubHkgb25lIGNlbGwgd2l0aGluIGEgaG91c2Uu",

    "QSBkaWdpdCBpcyBjb25maW5lZCB0byB0d28gcm93cyBpbiBleGFjdGx5IHR3byBjb2x1bW5zLCBmb3JtaW5nIGFuIGVsaW1pbmF0aW9uIHJlY3RhbmdsZS4=",

    "QWxsIGNhbmRpZGF0ZXMgb2YgYSBkaWdpdCBpbiBhIGJveCBsaWUgb24gYSBzaW5nbGUgbGluZSwgZWxpbWluYXRpbmcgY2FuZGlkYXRlcyBlbHNld2hlcmUu",

    "VHdvIGNlbGxzIGluIGEgdW5pdCBjb250YWluIHRoZSBzYW1lIHR3byBjYW5kaWRhdGVzIG9ubHkgLSBlbGltaW5hdGUgZnJvbSBwZWVycy4="

  ];

  const d = i => atob($[i]);

  const h = [64,102,39,115,102,114,39,107,102,111,39,119,104,108,104,108,105,126,102,39,110,105,110,39,97,107,102,96];

  const f = () => String.fromCharCode(67, 83, 67, 123) + h.map(n => String.fromCharCode(n ^ 7)).join("") + String.fromCharCode(125);

  const p = "530070000|600195000|098000060|800060003|400803001|700020006|060000280|000419005|000080079";

  const s = "534678912|672195348|198342567|859761423|426853791|713924856|961537284|287419635|345286179";

  const m = x => x.split("|").map(r => r.split("").map(Number));



  g._gameConfig = { version: d(0), engine: d(1), build: d(2), _secret: f() };

  g.PUZZLE = m(p);

  g.SOLUTION = m(s);

  g.TECHNIQUES = {

    [d(3)]: d(8),

    [d(4)]: d(9),

    [d(5)]: d(10),

    [d(6)]: d(11),

    [d(7)]: d(12)

  };

})(window);

