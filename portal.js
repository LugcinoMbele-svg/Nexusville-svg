/* Nexusville Portal API layer. Talks to Supabase (auth, orders) and to server-side functions.
   All security decisions (payment verification, download access) happen on the server, never here. */
(function(){
  var cfg = window.NV_CONFIG || {};
  var configured = !!(cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY);
  var client = null, loading = null;
  var SDK = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.min.js';

  function loadSdk(){
    if (window.supabase) return Promise.resolve();
    return new Promise(function(res, rej){
      var s = document.createElement('script'); s.src = SDK; s.onload = res; s.onerror = function(){ rej(new Error('Could not load the sign-in service.')); };
      document.head.appendChild(s);
    });
  }
  function init(){
    if (!configured) return Promise.resolve(null);
    if (client) return Promise.resolve(client);
    if (!loading) loading = loadSdk().then(function(){
      client = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
      return client;
    });
    return loading;
  }
  function safeNext(n){ return (n && /^[a-z0-9-]+\.html(\?[\w=&%-]*)?$/i.test(n)) ? n : 'dashboard.html'; }
  function money(n){ return 'R' + Number(n).toLocaleString('en-ZA', {minimumFractionDigits:0, maximumFractionDigits:2}); }
  function esc(s){ return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
  function product(id){ return (window.NV_PRODUCTS || []).filter(function(p){ return p.id === id; })[0]; }

  var NV = {
    configured: configured,
    paymentsEnabled: configured && cfg.PAYMENTS_ENABLED === true,
    money: money, esc: esc, product: product, safeNext: safeNext, init: init,

    getUser: function(){
      return init().then(function(c){ if (!c) return null; return c.auth.getUser().then(function(r){ return r.data && r.data.user || null; }); });
    },
    register: function(f){
      return init().then(function(c){
        if (!c) throw new Error('Accounts are not connected yet. Please check back soon.');
        return c.auth.signUp({ email: f.email, password: f.password, options: { data: { full_name: f.name, username: f.username }, emailRedirectTo: location.origin + '/login.html' } });
      }).then(function(r){ if (r.error) throw r.error; return r.data; });
    },
    login: function(email, password){
      return init().then(function(c){
        if (!c) throw new Error('Accounts are not connected yet. Please check back soon.');
        return c.auth.signInWithPassword({ email: email, password: password });
      }).then(function(r){ if (r.error) throw r.error; return r.data; });
    },
    reset: function(email){
      return init().then(function(c){
        if (!c) throw new Error('Accounts are not connected yet.');
        return c.auth.resetPasswordForEmail(email, { redirectTo: location.origin + '/account.html' });
      }).then(function(r){ if (r.error) throw r.error; });
    },
    logout: function(){ return init().then(function(c){ return c ? c.auth.signOut() : null; }); },
    changePassword: function(pw){
      return init().then(function(c){ return c.auth.updateUser({ password: pw }); }).then(function(r){ if (r.error) throw r.error; });
    },
    /* Returns {preview, user, orders[]}. In preview mode (not configured) returns clearly-labelled sample data. */
    account: function(){
      if (!configured) {
        return Promise.resolve({ preview: true, user: { email: 'preview@example.com', name: 'Preview User' }, orders: [
          { id: 'sample0001', product_id: 'project-starter-pack', amount_cents: 14900, status: 'paid', created_at: '2026-10-01T09:00:00Z' },
          { id: 'sample0002', product_id: 'pm-ebook', amount_cents: 9900, status: 'paid', created_at: '2026-10-05T14:30:00Z' },
          { id: 'sample0003', product_id: 'quotation-template', amount_cents: 4900, status: 'pending', created_at: '2026-10-09T11:15:00Z' }
        ]});
      }
      return init().then(function(c){
        return c.auth.getUser().then(function(r){
          var u = r.data && r.data.user;
          if (!u) return { preview: false, user: null, orders: [] };
          return c.from('orders').select('id,product_id,amount_cents,status,created_at').order('created_at', { ascending: false }).then(function(o){
            if (o.error) throw o.error;
            var md = u.user_metadata || {};
            return { preview: false, user: { email: u.email, name: md.full_name || '', username: md.username || '' }, orders: o.data || [] };
          });
        });
      });
    },
    startCheckout: function(productId){
      if (!NV.paymentsEnabled) return Promise.reject(new Error('Payments are not live yet.'));
      return init().then(function(c){
        return c.functions.invoke('create-checkout', { body: { product_id: productId } });
      }).then(function(r){
        if (r.error) throw r.error;
        var url = r.data && r.data.authorization_url;
        if (!url || url.indexOf('https://checkout.paystack.com/') !== 0) throw new Error('Could not start checkout.');
        location.href = url;
      });
    },
    download: function(productId){
      return init().then(function(c){
        return c.functions.invoke('get-download', { body: { product_id: productId } });
      }).then(function(r){
        if (r.error) throw r.error;
        if (!r.data || !r.data.url) throw new Error('Download not available.');
        location.href = r.data.url;
      });
    }
  };
  window.NV = NV;
})();
    
