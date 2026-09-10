(function(){
  "use strict";

  /* ---------- welcome curtain + page reveal (every load) ---------- */
  (function intro(){
    var root = document.documentElement;
    var el = document.getElementById("intro");
    var revealed = false;
    function reveal(){
      if(revealed) return;
      revealed = true;
      root.classList.add("ready");
    }
    var reduce = false;
    try{ reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches; }catch(e){}

    // plays on every page open and every refresh; skipped only for the
    // admin route and for visitors who asked for reduced motion
    if(!el || reduce || location.hash === "#admin"){
      if(el){ el.classList.add("done"); }
      reveal();
      return;
    }

    requestAnimationFrame(function(){
      requestAnimationFrame(function(){ el.classList.add("in"); });
    });
    setTimeout(function(){ el.classList.remove("in"); el.classList.add("out"); }, 1500);
    setTimeout(function(){ el.classList.add("hide"); reveal(); }, 2050);
    setTimeout(function(){ el.classList.add("done"); }, 2600);
    window.addEventListener("load", function(){ setTimeout(reveal, 2800); });
  })();

  var ADMIN_PASSWORD = "fermi2024";
  var LS_PROJECTS = "jb_portfolio_projects_v1";
  var LS_MESSAGES = "jb_portfolio_messages_v1";
  var LS_SETTINGS = "jb_portfolio_settings_v1";
  var LS_SESSION = "jb_portfolio_admin_session";

  var DEFAULT_PROJECTS = [
    {
      id: "fermi",
      name: "Fermi.uz",
      category: "website",
      url: "https://fermi.uz",
      status: "live",
      desc: "Asosiy korporativ platforma — tezkor, mobilga moslashgan va qidiruv tizimlari uchun optimallashtirilgan veb-sayt."
    },
    {
      id: "fermiclinic",
      name: "FermiClinic.uz",
      category: "website",
      url: "https://fermiclinic.uz",
      status: "live",
      desc: "Tibbiyot klinikasi uchun onlayn ro'yxatga olish va xizmatlar ko'rsatuvchi veb-sayt."
    },
    {
      id: "testkorea",
      name: "@testkoreabotbot",
      category: "bot",
      url: "https://t.me/testkoreabotbot",
      status: "live",
      desc: "Telegram orqali test topshirish va natijalarni avtomatik hisoblab beruvchi bot."
    }
  ];

  var DEFAULT_SETTINGS = { phone: "+998 95 483 03 18", telegram: "@madamin0318", email: "berdullayev@gmail.com" };

  function loadProjects(){
    try{
      var raw = localStorage.getItem(LS_PROJECTS);
      if(raw) return JSON.parse(raw);
    }catch(e){}
    return DEFAULT_PROJECTS.slice();
  }
  function saveProjects(list){
    try{ localStorage.setItem(LS_PROJECTS, JSON.stringify(list)); }catch(e){}
  }
  function loadMessages(){
    try{
      var raw = localStorage.getItem(LS_MESSAGES);
      if(raw) return JSON.parse(raw);
    }catch(e){}
    return [];
  }
  function saveMessages(list){
    try{ localStorage.setItem(LS_MESSAGES, JSON.stringify(list)); }catch(e){}
  }
  function loadSettings(){
    try{
      var raw = localStorage.getItem(LS_SETTINGS);
      if(raw) return Object.assign({}, DEFAULT_SETTINGS, JSON.parse(raw));
    }catch(e){}
    return Object.assign({}, DEFAULT_SETTINGS);
  }
  function saveSettings(s){
    try{ localStorage.setItem(LS_SETTINGS, JSON.stringify(s)); }catch(e){}
  }

  var CATEGORY_LABEL = { website: "Website", mobile: "Mobil ilova", bot: "Telegram bot" };

  function escapeHtml(str){
    return String(str).replace(/[&<>"']/g, function(c){
      return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];
    });
  }

  var currentFilter = "all";

  function renderProjects(){
    var list = loadProjects();
    var grid = document.getElementById("projectsGrid");
    var filtered = currentFilter === "all" ? list : list.filter(function(p){ return p.category === currentFilter; });
    if(filtered.length === 0){
      grid.innerHTML = '<p class="empty-note">Bu toifada hozircha loyiha yo\'q.</p>';
      return;
    }
    grid.innerHTML = filtered.map(function(p, i){
      var host;
      try{ host = new URL(p.url).hostname.replace(/^www\./,""); }catch(e){ host = p.url; }
      var featured = i === 0 && filtered.length > 1;
      var statusLabel = p.status === "dev" ? "Ishlab chiqilmoqda" : "Faol";
      return '' +
        '<article class="proj-card' + (featured ? " proj-card--featured" : "") + '">' +
          '<div class="proj-preview">' +
            '<div class="pp-window">' +
              '<div class="pp-bar"><span></span><span></span><span></span></div>' +
              '<div class="pp-shot pp-shot--' + escapeHtml(p.category) + '">' +
                '<div class="pp-ui" aria-hidden="true"><span class="pp-ui-row"></span><span class="pp-ui-row"></span></div>' +
                '<span class="pp-host mono">' + escapeHtml(host) + '</span>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="proj-body">' +
            '<div class="proj-meta">' +
              '<span class="proj-cat">' + escapeHtml(CATEGORY_LABEL[p.category] || p.category) + '</span>' +
              '<span class="proj-status"><span class="status-dot' + (p.status === "dev" ? " dev" : "") + '"></span>' + statusLabel + '</span>' +
            '</div>' +
            '<h3>' + escapeHtml(p.name) + '</h3>' +
            '<p>' + escapeHtml(p.desc || "") + '</p>' +
            '<a class="proj-link" href="' + escapeHtml(p.url) + '" target="_blank" rel="noopener">Ko\'rish</a>' +
          '</div>' +
        '</article>';
    }).join("");
  }

  document.getElementById("filterRow").addEventListener("click", function(e){
    var btn = e.target.closest(".filter-btn");
    if(!btn) return;
    currentFilter = btn.getAttribute("data-filter");
    Array.prototype.forEach.call(document.querySelectorAll(".filter-btn"), function(b){
      b.setAttribute("aria-pressed", b === btn ? "true" : "false");
    });
    renderProjects();
  });

  function renderContactInfo(){
    var s = loadSettings();
    var items =
      '<li><a href="tel:' + escapeHtml(s.phone.replace(/\s+/g,"")) + '"><span class="ico">☎</span>' + escapeHtml(s.phone) + '</a></li>' +
      '<li><a href="https://t.me/' + escapeHtml(s.telegram.replace(/^@/,"")) + '" target="_blank" rel="noopener"><span class="ico">✈</span>' + escapeHtml(s.telegram) + '</a></li>' +
      '<li><a href="mailto:' + escapeHtml(s.email) + '"><span class="ico">✉</span>' + escapeHtml(s.email) + '</a></li>';
    var elList = document.getElementById("contactInfoList");
    if(elList) elList.innerHTML = items;
    var footList = document.getElementById("footerContactList");
    if(footList) footList.innerHTML = items;
  }

  document.getElementById("contactForm").addEventListener("submit", function(e){
    e.preventDefault();
    var form = e.target;
    var msg = {
      id: "m" + Date.now(),
      name: form.name.value.trim(),
      contact: form.contact.value.trim(),
      service: form.service.value,
      message: form.message.value.trim(),
      date: new Date().toISOString()
    };
    var list = loadMessages();
    list.unshift(msg);
    saveMessages(list);
    document.getElementById("cfToast").textContent = "Xabaringiz uchun rahmat! Tez orada bog'lanaman.";
    form.reset();
  });

  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- admin ---------- */
  var publicView = document.getElementById("public-view");
  var adminView = document.getElementById("admin-view");
  var loginScreen = document.getElementById("adminLoginScreen");
  var dashboard = document.getElementById("adminDashboard");

  function isAdminRoute(){ return location.hash === "#admin"; }

  function isAuthed(){
    try{ return sessionStorage.getItem(LS_SESSION) === "1"; }catch(e){ return false; }
  }

  function routeChanged(){
    if(isAdminRoute()){
      publicView.classList.add("hidden");
      adminView.classList.add("active");
      if(isAuthed()){
        loginScreen.style.display = "none";
        dashboard.style.display = "block";
        renderAdminProjects();
        renderAdminMessages();
        fillSettingsForm();
      } else {
        loginScreen.style.display = "flex";
        dashboard.style.display = "none";
      }
    } else {
      publicView.classList.remove("hidden");
      adminView.classList.remove("active");
    }
  }
  window.addEventListener("hashchange", routeChanged);

  document.getElementById("admLoginBtn").addEventListener("click", function(){
    var val = document.getElementById("admPass").value;
    if(val === ADMIN_PASSWORD){
      try{ sessionStorage.setItem(LS_SESSION, "1"); }catch(e){}
      document.getElementById("admErr").textContent = "";
      routeChanged();
    } else {
      document.getElementById("admErr").textContent = "Noto'g'ri parol.";
    }
  });
  document.getElementById("admPass").addEventListener("keydown", function(e){
    if(e.key === "Enter") document.getElementById("admLoginBtn").click();
  });
  document.getElementById("admLogoutBtn").addEventListener("click", function(){
    try{ sessionStorage.removeItem(LS_SESSION); }catch(e){}
    location.hash = "#top";
  });

  Array.prototype.forEach.call(document.querySelectorAll(".tab-btn"), function(btn){
    btn.addEventListener("click", function(){
      Array.prototype.forEach.call(document.querySelectorAll(".tab-btn"), function(b){ b.setAttribute("aria-selected","false"); });
      btn.setAttribute("aria-selected","true");
      Array.prototype.forEach.call(document.querySelectorAll(".admin-panel"), function(p){ p.classList.remove("active"); });
      document.getElementById("panel-" + btn.getAttribute("data-tab")).classList.add("active");
    });
  });

  function renderAdminProjects(){
    var list = loadProjects();
    var wrap = document.getElementById("adminProjectsList");
    if(list.length === 0){
      wrap.innerHTML = '<p class="empty-note">Loyihalar yo\'q.</p>';
      return;
    }
    wrap.innerHTML = list.map(function(p){
      return '' +
        '<div class="admin-item" data-id="' + escapeHtml(p.id) + '">' +
          '<div>' +
            '<span class="meta">' + escapeHtml(CATEGORY_LABEL[p.category] || p.category) + ' · ' + (p.status === "dev" ? "Ishlab chiqilmoqda" : "Faol") + '</span>' +
            '<h4>' + escapeHtml(p.name) + '</h4>' +
            '<p>' + escapeHtml(p.desc || "") + '</p>' +
          '</div>' +
          '<div class="row-actions">' +
            '<button class="icon-btn" data-action="edit">Tahrirlash</button>' +
            '<button class="icon-btn danger" data-action="delete">O\'chirish</button>' +
          '</div>' +
        '</div>';
    }).join("");
  }

  document.getElementById("adminProjectsList").addEventListener("click", function(e){
    var btn = e.target.closest(".icon-btn");
    if(!btn) return;
    var item = e.target.closest(".admin-item");
    var id = item.getAttribute("data-id");
    var list = loadProjects();
    if(btn.getAttribute("data-action") === "delete"){
      if(confirm("Ushbu loyihani o'chirishni tasdiqlaysizmi?")){
        list = list.filter(function(p){ return p.id !== id; });
        saveProjects(list);
        renderAdminProjects();
        renderProjects();
      }
    } else {
      var proj = list.filter(function(p){ return p.id === id; })[0];
      if(proj) openProjectForm(proj);
    }
  });

  document.getElementById("newProjectBtn").addEventListener("click", function(){
    openProjectForm(null);
  });

  function openProjectForm(proj){
    var wrap = document.getElementById("projectFormWrap");
    var isEdit = !!proj;
    proj = proj || { id: "", name: "", category: "website", url: "", status: "live", desc: "" };
    wrap.innerHTML = '' +
      '<div class="admin-form">' +
        '<div class="field"><label>Nomi</label><input id="pf-name" type="text" value="' + escapeHtml(proj.name) + '"></div>' +
        '<div class="field"><label>Havola (URL)</label><input id="pf-url" type="text" value="' + escapeHtml(proj.url) + '"></div>' +
        '<div class="field"><label>Toifa</label>' +
          '<select id="pf-category">' +
            '<option value="website"' + (proj.category === "website" ? " selected" : "") + '>Website</option>' +
            '<option value="mobile"' + (proj.category === "mobile" ? " selected" : "") + '>Mobil ilova</option>' +
            '<option value="bot"' + (proj.category === "bot" ? " selected" : "") + '>Telegram bot</option>' +
          '</select>' +
        '</div>' +
        '<div class="field"><label>Holati</label>' +
          '<select id="pf-status">' +
            '<option value="live"' + (proj.status === "live" ? " selected" : "") + '>Faol</option>' +
            '<option value="dev"' + (proj.status === "dev" ? " selected" : "") + '>Ishlab chiqilmoqda</option>' +
          '</select>' +
        '</div>' +
        '<div class="field full"><label>Tavsif</label><textarea id="pf-desc" rows="2">' + escapeHtml(proj.desc) + '</textarea></div>' +
        '<div class="full" style="display:flex; gap:10px;">' +
          '<button class="btn btn-primary" id="pf-save">Saqlash</button>' +
          '<button class="btn btn-ghost" id="pf-cancel">Bekor qilish</button>' +
        '</div>' +
      '</div>';
    document.getElementById("pf-cancel").addEventListener("click", function(){ wrap.innerHTML = ""; });
    document.getElementById("pf-save").addEventListener("click", function(){
      var name = document.getElementById("pf-name").value.trim();
      var url = document.getElementById("pf-url").value.trim();
      if(!name || !url){ alert("Nomi va havola majburiy."); return; }
      var list = loadProjects();
      if(isEdit){
        list = list.map(function(p){
          if(p.id !== proj.id) return p;
          return Object.assign({}, p, {
            name: name, url: url,
            category: document.getElementById("pf-category").value,
            status: document.getElementById("pf-status").value,
            desc: document.getElementById("pf-desc").value.trim()
          });
        });
      } else {
        list.push({
          id: "p" + Date.now(),
          name: name, url: url,
          category: document.getElementById("pf-category").value,
          status: document.getElementById("pf-status").value,
          desc: document.getElementById("pf-desc").value.trim()
        });
      }
      saveProjects(list);
      wrap.innerHTML = "";
      renderAdminProjects();
      renderProjects();
    });
  }

  function renderAdminMessages(){
    var list = loadMessages();
    var wrap = document.getElementById("adminMessagesList");
    if(list.length === 0){
      wrap.innerHTML = '<p class="empty-note">Hozircha xabarlar yo\'q.</p>';
      return;
    }
    wrap.innerHTML = list.map(function(m){
      var d = new Date(m.date);
      return '' +
        '<div class="admin-item" data-id="' + escapeHtml(m.id) + '">' +
          '<div>' +
            '<span class="meta">' + escapeHtml(CATEGORY_LABEL[m.service] || m.service || "boshqa") + ' · ' + d.toLocaleString("uz-UZ") + '</span>' +
            '<h4>' + escapeHtml(m.name) + ' — ' + escapeHtml(m.contact) + '</h4>' +
            '<p>' + escapeHtml(m.message) + '</p>' +
          '</div>' +
          '<div class="row-actions"><button class="icon-btn danger" data-action="delete-msg">O\'chirish</button></div>' +
        '</div>';
    }).join("");
  }

  document.getElementById("adminMessagesList").addEventListener("click", function(e){
    var btn = e.target.closest(".icon-btn");
    if(!btn) return;
    var item = e.target.closest(".admin-item");
    var id = item.getAttribute("data-id");
    var list = loadMessages().filter(function(m){ return m.id !== id; });
    saveMessages(list);
    renderAdminMessages();
  });

  function fillSettingsForm(){
    var s = loadSettings();
    document.getElementById("s-phone").value = s.phone;
    document.getElementById("s-telegram").value = s.telegram;
    document.getElementById("s-email").value = s.email;
  }
  document.getElementById("saveSettingsBtn").addEventListener("click", function(){
    var s = {
      phone: document.getElementById("s-phone").value.trim() || DEFAULT_SETTINGS.phone,
      telegram: document.getElementById("s-telegram").value.trim() || DEFAULT_SETTINGS.telegram,
      email: document.getElementById("s-email").value.trim() || DEFAULT_SETTINGS.email
    };
    saveSettings(s);
    renderContactInfo();
    document.getElementById("settingsToast").textContent = "Saqlandi.";
    setTimeout(function(){ document.getElementById("settingsToast").textContent = ""; }, 2000);
  });

  /* ---------- UI polish: header, mobile nav, scrollspy, reveal ---------- */
  var header = document.getElementById("siteHeader");
  var navToggle = document.getElementById("navToggle");
  var navRight = document.getElementById("navRight");
  var navAnchors = Array.prototype.slice.call(document.querySelectorAll(".nav-links a"));

  if(header){
    var onScroll = function(){ header.classList.toggle("scrolled", window.scrollY > 8); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  if(navToggle && navRight){
    var closeMenu = function(){
      navRight.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    };
    navToggle.addEventListener("click", function(){
      var open = navRight.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    navRight.addEventListener("click", function(e){
      if(e.target.closest("a")) closeMenu();
    });
    window.addEventListener("resize", function(){ if(window.innerWidth > 820) closeMenu(); });
  }

  /* theme toggle (light / dark) */
  (function themeToggle(){
    var KEY = "jb_theme";
    var root = document.documentElement;
    var btn = document.getElementById("themeToggle");
    if(!btn) return;
    function current(){ return root.getAttribute("data-theme") === "light" ? "light" : "dark"; }
    btn.addEventListener("click", function(){
      var next = current() === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      btn.setAttribute("aria-pressed", next === "light" ? "true" : "false");
      try{ localStorage.setItem(KEY, next); }catch(e){}
    });
    btn.setAttribute("aria-pressed", current() === "light" ? "true" : "false");
  })();

  var sections = navAnchors
    .map(function(a){ return document.getElementById(a.getAttribute("href").slice(1)); })
    .filter(Boolean);

  if(sections.length && "IntersectionObserver" in window){
    var spy = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(!en.isIntersecting) return;
        navAnchors.forEach(function(a){
          a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function(s){ spy.observe(s); });
  }

  if("IntersectionObserver" in window){
    var revealer = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){
          en.target.classList.add("in");
          revealer.unobserve(en.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.08 });
    Array.prototype.forEach.call(document.querySelectorAll(".reveal"), function(el){ revealer.observe(el); });
  } else {
    Array.prototype.forEach.call(document.querySelectorAll(".reveal"), function(el){ el.classList.add("in"); });
  }

  /* ---------- hero code: typewriter effect ---------- */
  (function typeHeroCode(){
    var codeEl = document.querySelector(".hv-code code");
    if(!codeEl) return;
    var box = codeEl.parentElement;
    var prefersReduced = false;
    try{ prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches; }catch(e){}
    if(prefersReduced) return;

    var finalHTML = codeEl.innerHTML;
    var full = codeEl.textContent;
    codeEl.textContent = "";
    box.classList.add("typing");

    var i = 0;
    var step = function(){
      i += Math.random() < 0.15 ? 2 : 1;
      if(i >= full.length){
        codeEl.innerHTML = finalHTML;
        box.classList.remove("typing");
        box.classList.add("typed");
        return;
      }
      codeEl.textContent = full.slice(0, i);
      setTimeout(step, 16);
    };
    // start typing only once the page has been revealed after the intro
    var begin = function(){ setTimeout(step, 260); };
    if(document.documentElement.classList.contains("ready")){
      begin();
    } else {
      var iv = setInterval(function(){
        if(document.documentElement.classList.contains("ready")){ clearInterval(iv); begin(); }
      }, 100);
    }
  })();

  renderProjects();
  renderContactInfo();
  routeChanged();
})();
