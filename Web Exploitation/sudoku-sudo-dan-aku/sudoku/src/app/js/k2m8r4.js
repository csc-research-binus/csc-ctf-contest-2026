(function(g){
  let b = [];
  let s = null;
  let nm = false;
  let nt = [];
  let hs = [];
  let mk = 0;
  let sec = 0;
  let tm = null;
  let tc = 0;

  const id = x => document.getElementById(x);
  const clamp = (n, a, z) => Math.max(a, Math.min(z, n));

  function rd(){
    const box = id("board");
    box.innerHTML = "";

    for(let r = 0; r < 9; r++){
      for(let c = 0; c < 9; c++){
        const el = document.createElement("div");
        const gv = PUZZLE[r][c] !== 0;
        const vl = b[r][c];
        const ns = nt[r][c];

        el.className = "cell";
        el.dataset.row = r;
        el.dataset.col = c;

        if(gv) el.classList.add("given");

        if(vl !== 0){
          el.textContent = vl;
          if(!gv) el.style.color = "var(--accent3)";
        } else if(ns.size > 0){
          const wrap = document.createElement("div");
          wrap.style.cssText = "display:grid;grid-template-columns:1fr 1fr 1fr;width:100%;height:100%;padding:2px;";

          for(let n = 1; n <= 9; n++){
            const sp = document.createElement("span");
            sp.style.cssText = "font-size:0.38rem;display:flex;align-items:center;justify-content:center;color:var(--text3);";
            sp.textContent = ns.has(n) ? n : "";
            wrap.appendChild(sp);
          }

          el.appendChild(wrap);
        } else {
          el.style.color = "transparent";
          el.textContent = ".";
        }

        if(s && s[0] === r && s[1] === c){
          el.classList.add("selected");
        } else if(s){
          const rr = s[0];
          const cc = s[1];
          const hit = r === rr || c === cc || (Math.floor(r / 3) === Math.floor(rr / 3) && Math.floor(c / 3) === Math.floor(cc / 3));
          if(hit) el.classList.add("highlight");
        }

        el.addEventListener("click", function(){
          s = [r, c];
          rd();
        });

        box.appendChild(el);
      }
    }
  }

  function up(){
    let fd = 0;

    for(let r = 0; r < 9; r++){
      for(let c = 0; c < 9; c++){
        if(PUZZLE[r][c] === 0 && b[r][c] !== 0) fd++;
      }
    }

    const pc = tc > 0 ? Math.round(fd / tc * 100) : 0;
    id("prog-fill").style.width = pc + "%";
    id("prog-pct").textContent = pc + "%";
  }

  function toast(msg, type){
    const t = id("toast");
    t.textContent = msg;
    t.className = "toast show " + (type || "");

    setTimeout(function(){
      t.className = "toast";
    }, 2200);
  }

  function init(){
    b = PUZZLE.map(function(r){ return r.slice(); });
    s = null;
    nm = false;
    nt = Array.from({ length: 9 }, function(){
      return Array.from({ length: 9 }, function(){ return new Set(); });
    });
    hs = [];
    mk = 0;
    sec = 0;
    tc = 0;

    for(let r = 0; r < 9; r++){
      for(let c = 0; c < 9; c++){
        if(PUZZLE[r][c] === 0) tc++;
      }
    }

    clearInterval(tm);
    tm = setInterval(function(){
      sec++;
      const m = String(Math.floor(sec / 60)).padStart(2, "0");
      const x = String(sec % 60).padStart(2, "0");
      id("timer").textContent = m + ":" + x;
    }, 1000);

    id("mc").textContent = "0/3";
    id("notes-btn").classList.remove("active");
    rd();
    up();
  }

  function put(n){
    if(!s) return;

    const r = s[0];
    const c = s[1];
    if(PUZZLE[r][c] !== 0) return;

    if(nm){
      const bag = nt[r][c];
      bag.has(n) ? bag.delete(n) : bag.add(n);
      rd();
      return;
    }

    hs.push({ r: r, c: c, prev: b[r][c], prevNotes: new Set(nt[r][c]) });

    if(n !== SOLUTION[r][c]){
      mk++;
      id("mc").textContent = mk + "/3";

      if(mk >= 3){
        toast("Too many mistakes!", "bad");
        setTimeout(init, 1500);
        return;
      }

      toast("Incorrect!", "bad");
    }

    b[r][c] = n;
    nt[r][c].clear();
    rd();
    up();
  }

  function del(){
    if(!s) return;

    const r = s[0];
    const c = s[1];
    if(PUZZLE[r][c] !== 0) return;

    hs.push({ r: r, c: c, prev: b[r][c], prevNotes: new Set(nt[r][c]) });
    b[r][c] = 0;
    nt[r][c].clear();
    rd();
    up();
  }

  function undo(){
    if(!hs.length) return;

    const last = hs.pop();
    b[last.r][last.c] = last.prev;
    nt[last.r][last.c] = last.prevNotes;
    rd();
    up();
  }

  function note(){
    nm = !nm;
    id("notes-btn").classList.toggle("active", nm);
  }

  document.addEventListener("keydown", function(e){
    if(e.key >= "1" && e.key <= "9") put(parseInt(e.key, 10));
    if(e.key === "Backspace" || e.key === "Delete") del();
    if(!s) return;

    const dirs = {
      ArrowUp: [-1, 0],
      ArrowDown: [1, 0],
      ArrowLeft: [0, -1],
      ArrowRight: [0, 1]
    };

    if(dirs[e.key]){
      const mv = dirs[e.key];
      s = [clamp(s[0] + mv[0], 0, 8), clamp(s[1] + mv[1], 0, 8)];
      rd();
      e.preventDefault();
    }
  });

  g.initGame = init;
  g.inputNum = put;
  g.eraseCell = del;
  g.undoMove = undo;
  g.toggleNotes = note;

  init();
})(window);
