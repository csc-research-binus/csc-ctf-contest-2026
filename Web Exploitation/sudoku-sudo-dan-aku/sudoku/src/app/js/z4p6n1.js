(function(g){
  const id = function(x){ return document.getElementById(x); };

  function run(){
    const q = id("sinput").value;
    const box = id("sresults");
    const key = q.toLowerCase().trim();
    const hit = TECHNIQUES[key];

    if(!q.trim()){
      box.innerHTML = '<span class="res-empty">Search for a solving technique above</span>';
      return;
    }

    if(hit){
      box.innerHTML = [
        '<div style="font-size:0.7rem">',
        "<strong>" + q + "</strong><br>",
        '<span style="color:var(--text2)">' + hit + "</span>",
        "</div>"
      ].join("");
      return;
    }

    box.innerHTML = [
      '<span class="res-empty">',
      'No results for "<span style="color:var(--text2)">' + q + "</span>\"",
      "</span>"
    ].join("");
  }

  g.fillSearch = function(v){
    id("sinput").value = v;
    run();
  };

  g.doSearch = run;
})(window);
